package mainstreethub.pipelines;

@Library('Dropwizard')
class Dropwizard implements Serializable {
    def notify() {
        echo "I'm notifying";
//        String message = "Hello";
//        boolean success = true;
//        slackSend(
//                channel: "script-test",
//                color: success ? "good" : "danger",
//                message: "${message} - ${env.BUILD_URL}",
//                tokenCredentialId: "slack-integration-token"
//        )
    }
}