package mainstreethub.pipelines;

class Dropwizard implements Serializable{
  Dropwizard() { }

  def notifySlack() {
    println "I'm notifying";
  }
}