node("generic:all"){
  def git = tool("git")

  checkout scm

  sh "${git} config user.email engineering+jenkins2@mainstreethub.com"
  sh "${git} config user.name jenkins"
  withCredentials([[$class: "UsernamePasswordMultiBinding",
                    credentialsId: "github-http",
                    usernameVariable: "GIT_USERNAME",
                    passwordVariable: "GIT_PASSWORD"]]) {
    def username = URLEncoder.encode("${env.GIT_USERNAME}", "UTF-8")
    def password = URLEncoder.encode("${env.GIT_PASSWORD}", "UTF-8")

    writeFile(file: "${env.HOME}/.git-credentials",
        text: "https://${username}:${password}@github.com")
    sh "${git} config credential.helper store --file=${env.HOME}/.git-credentials"
  }

  // Write the npmrc to the container
  def npmrc = "; Use the Main Street Hub private registry\n" +
      "registry=http://npm.infrastructure/\n" +
      "\n" +
      "; This token was generated via a \"npm login\" to the private registry, where the\n" +
      "; Jenkins user has a password of \"72f08d1c4a8e1346151428ed111ed80c\".\n" +
      "//npm.infrastructure/:_authToken=Lb4H/YkJoPDCv6wJsYLM5zvWnyUdqtksmnOWoGOHjO+WPkehtGwVrvLY8DUO64tp\n" +
      "\n" +
      "; Force auth on all requests, even GET requests.\n" +
      "always-auth=true"
  writeFile(file: ".npmrc",
      text: npmrc)

  sh "ls -a"


  stage("Compile") {
    sh "npm install"
  }

  stage("Test") {
    sh "npm run build"
  }
//  npm prune
//  npm update --progress false
//
//  npm version $VERSION_TYPE
//  npm publish

}
