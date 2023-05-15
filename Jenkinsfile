pipeline {
    agent any
    environment {
        SCREENSHOT_PATH = "screenshots/"
    }
    stages {
        stage("Start service emulators") {
            steps {
                sh "cd functions && npm install"
                sh "--tab --title="emulators" --command="firebase emulators:start""
            }
        }
        stage("Reset test environment") {
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
        }
    }
}