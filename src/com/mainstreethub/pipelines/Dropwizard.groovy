package com.mainstreethub.pipelines;

class Dropwizard implements Serializable{
  def steps
  Dropwizard(steps) { this.steps = steps }

  def notifySlack() {
    println "I'm notifying";
  }
}