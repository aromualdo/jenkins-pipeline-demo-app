package mainstreethub.pipelines;

class Dropwizard implements Serializable{
  def steps
  Dropwizard(steps) { this.steps = steps }

  def notify() {
    echo "I'm notifying";
  }
}