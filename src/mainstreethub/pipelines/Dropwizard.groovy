package mainstreethub.pipelines;
class Dropwizard {
  def steps
  Dropwizard() {}
  def notifySlack() {
    def mvn = tool("maven") + "/bin/mvn -B"
    sh "${mvn} clean compile test-compile"
  }
}