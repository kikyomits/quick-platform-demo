// Jenkinsfile

import groovy.json.JsonOutput

pipeline {
    agent none
    options {
        skipDefaultCheckout true
    }

    environment {
        APP_NAME = 'demo-backend'
        PJ_NAME = 'demo'
    }

    stages {
        stage('Build'){
            agent {
                docker {
                    image 'mkikyotani/jenkins-shared:alpine-3.8'
                }
            }
            
            steps {
                checkout scm
                script {
                    println("### Build Start")
                    errorMessage = "None"
                    
                    try {
                        openshift.withCluster('sandbox') {
                            openshift.withProject( env.PJ_NAME ) {
                                openshift.apply(readFile('openshift/build.yaml'))
                                openshift.selector("buildConfig/${env.APP_NAME}").startBuild(
                                    '--follow --wait'
                                )
                                openshift.tag("${env.PJ_NAME}/${env.APP_NAME}:latest", "${env.APP_NAME}:${BUILD_ID}")
                            }
                        }
                    } catch(error) {
                        currentBuild.result = "FAILURE"
                        errorMessage =  error.toString()
                        println(errorMessage)
                    }
                }
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'mkikyotani/jenkins-shared:alpine-3.8'
                }
            }

            steps {
                script {
                    println("### Deploy Start")
                    // Store stage name to send to Slack
                    jobStage = "${STAGE_NAME}"

                    // Run commands of `oc tag`, `oc apply`, `oc rollout`
                    try {
                        openshift.withCluster('sandbox') {
                            openshift.withProject( env.PJ_NAME ) {
                                openshift.apply(readFile('openshift/deploy.yaml'))
                                def rollout = openshift.selector('deploymentConfig/demo').rollout()
                                rollout.latest()
                                rollout.status()
                            }
                        }
                    } catch(error) {
                        currentBuild.result = "FAILURE"
                        errorMessage =  error.toString()
                        println(errorMessage)
                    }                            
                }
            }
        }
    }
    post {
        always {
            echo errorMessage
        }
    }
}