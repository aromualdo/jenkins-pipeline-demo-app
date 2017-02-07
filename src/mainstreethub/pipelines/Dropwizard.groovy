package mainstreethub.pipelines;
class Dropwizard implements Serializable {
  def steps
  def mvn

  Dropwizard(steps, mvn) {
    this.steps = steps
    this.mvn = mvn
  }

  def compile() {
    steps.sh "${mvn} clean compile test-compile"
  }
}