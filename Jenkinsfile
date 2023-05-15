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
                stage('Start Emulator') {
                    steps {
                        sh "firebase emulators:start"
                    }
                }
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
                        echo "Taking down auth..."
                        sh "fuser -k 9099/tcp"
                        echo "Taking down functions..."
                        sh "fuser -k 5001/tcp"
                        echo "Taking down firestore..."
                        sh "fuser -k 8081/tcp"
                        echo "Taking down storage..."
                        sh "fuser -k 9199/tcp"
                    }
                }}
            }
        }
    }
}