package mainstreethub.pipelines;
class Dropwizard implements Serializable {
  def steps
  Dropwizard(steps) { this.steps = steps}
  def compile(args) {
    steps.sh "${steps.tool 'Maven'}/bin/mvn -o ${args}"
  }
}