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
        stage('Set up frontend with emulators') {
            parallel {
                stage('Start Emulator (this should fail when last stage finishes)') {
                    steps {
                        sh "firebase emulators:start"
                    }
                }
                stage("run tests"){
                    stages{
                        stage("Reset containers") {
                            steps {
                                sh "docker compose down"
                                sh "docker compose up -d --build"
                                echo "Docker composed successfully"
                                sh "mkdir -p ${SCREENSHOT_PATH}"
                                sh "chmod a=rwx ${SCREENSHOT_PATH}"
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