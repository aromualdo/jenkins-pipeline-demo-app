package mainstreethub.pipelines;
class Dropwizard implements Serializable {
  def steps

  Dropwizard(steps) {
    this.steps = steps
  }

  def doStuff(env) {
      def git = steps.tool("git")
      def mvn = steps.tool("maven") + "/bin/mvn -B"

      steps.sh "${git} config user.email engineering+jenkins2@mainstreethub.com"
      steps.sh "${git} config user.name jenkins"
      steps.withCredentials([[$class: "UsernamePasswordMultiBinding",
                        credentialsId: "github-http",
                        usernameVariable: "GIT_USERNAME",
                        passwordVariable: "GIT_PASSWORD"]]) {
        def username = URLEncoder.encode("${env.GIT_USERNAME}", "UTF-8")
        def password = URLEncoder.encode("${env.GIT_PASSWORD}", "UTF-8")

        steps.writeFile(file: "${env.HOME}/.git-credentials",
                text: "https://${username}:${password}@github.com")
        steps.sh "${git} config credential.helper store --file=${env.HOME}/.git-credentials"
      }

      steps.stage("Compile") {
        steps.sh "${mvn} clean compile test-compile"
      }

      steps.stage("Test") {
        steps.sh "${mvn} verify"
      }

      steps.stage("Package") {
        steps.sh "${mvn} -Dskip.docker.image.build=false -Dmaven.test.skip=true clean package"
      }

      if (env.BRANCH_NAME.startsWith("PR-")) {
        // This is a pull request build, no need to do anything else.
        return
      }

      def newVersion = steps.sh(script: "./get-release-version.sh", returnStdout: true).trim()
      steps.stage("Release") {
        steps.milestone()

        // Tell maven what version we're going to use.
        steps.sh "${mvn} versions:set -DnewVersion=${newVersion} versions:commit"

        // Ask maven to deploy artifacts for this version.
        steps.sh "${mvn} -Pdocker deploy"

        // Tag this revision and push the tag to GitHub.
        steps.sh "${git} tag v${newVersion}"
        steps.sh "${git} push origin v${newVersion}"
      }

      def application = "jenkins-pipeline-demo-app"
      steps.stage("Deploy to test") {
        steps.milestone()

        notify("Starting deploy of ${application}:${newVersion} to TEST", true)

        try {
          // Checkout the ops repo so that we can execute the run-stack script
          steps.checkout(
              $class: "GitSCM",
              branches: [[name: "*/master"]],
              extensions: [
                  [$class: "RelativeTargetDirectory", relativeTargetDir: "ops"]
              ],
              userRemoteConfigs: [
                  [credentialsId: "github-http", url: "https://github.com/mainstreethub/ops"]
              ]
          )

          steps.dir("ops") {
            steps.sh """
              pip install -U pip wheel
              pip install -r requirements.txt

              echo "starting stack update"
              bin/run-stack.py stacks/dropwizard-service.py \
                --application "${application}"              \
                --environment test                          \
                --version ${newVersion}                     \
                --external                                  \
                --instance-count 1
              echo "finished stack update: \$?"
            """
          }

          notify("Completed deploy of ${application}:${newVersion} to TEST", true)
        } catch(e) {
          notify("Failed deploy of ${application}:${newVersion} to TEST", false)
          throw e
        }
      }

      steps.stage("Deploy to prod") {
        steps.milestone()

        steps.echo "Hello from deploy to prod..."
      }
    }

    def notify(String message, boolean success) {
      steps.slackSend(
              channel: "script-test",
              color: success ? "good" : "danger",
              message: "${message} - ${env.BUILD_URL}",
              tokenCredentialId: "slack-integration-token"
      )
    }
}