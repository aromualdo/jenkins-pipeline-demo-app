package mainstreethub.pipelines;
class Dropwizard implements Serializable {
  def steps

  Dropwizard(steps) {
    this.steps = steps
  }

  def compile(mvn) {
    steps.sh "${mvn} clean compile test-compile"
  }
}