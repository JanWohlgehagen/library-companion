pipeline {
    agent any
    environment {
        SCREENSHOT_PATH = "screenshots/"
    }
    stages {
        stage("install dependencies for emulators") {
            steps {
                sh "cd functions && npm install"
            }
        }
        stage('Set up API and DB emulators') {
            parallel {
                stage('Start Emulator') {
                    steps {
                        script {
                            try {
                                sh "firebase emulators:start"
                            } catch (err) {
                                echo "Caught: ${err}"
                            }
                        }
                    }
                }
                stage("Meta stage,  builds frontend, runs tests and runs a dockerized app"){
                    stages{
                        stage("Sleep to let emulators start (30 sec)"){
                            steps{
                                sleep(time: 30, unit: 'SECONDS')
                            }
                        }
                        stage("Reset containers") {
                            steps {
                                sh "docker compose down"
                                sh "docker compose up -d --force-recreate"
                                echo "Docker composed successfully"
                                sh "mkdir -p ${SCREENSHOT_PATH}"
                                sh "chmod a=rwx ${SCREENSHOT_PATH}"
                            }
                        }
                        stage("Run UI tests"){
                            steps{
                                sh "testcafe chrome:headless frontend/tests/ui-tests/testcafe-registration.js"
                                //sh "testcafe chrome:headless frontend/tests/ui-tests/testcafe-login.js"
                                //sh "testcafe chrome:headless frontend/tests/ui-tests/testcafe-navigation.js"
                            }
                        }
                        stage("Take down containers") {
                            steps {
                                sh "docker compose down"
                            }
                        }
                        stage("Take down emulators"){
                            steps {
                                //Taking down one port takes down all the firebase services
                                echo "Taking down auth..."
                                sh "fuser -k 9099/tcp"
                            }
                        }
                    }
                }
            }
        }
    }
}