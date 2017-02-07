package mainstreethub.pipelines;
class Dropwizard implements Serializable {
  def steps

  Dropwizard(steps) {
    this.steps = steps
  }

  def build() {

    steps.stage("Compile") {
       steps.sh "echo Hello"
    }

    steps.stage("test") {
      steps.sh "echo Hello2"
    }
  }
}