package mainstreethub.pipelines;
class Dropwizard {
  def steps
  Dropwizard() {}
  def notifySlack() {
    slackSend(
            channel: "script-test",
            color: "good",
            message: "Hello",
            tokenCredentialId: "slack-integration-token"
    )
  }
}