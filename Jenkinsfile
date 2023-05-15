pipeline {
    agent any
    environment {
        SCREENSHOT_PATH = "screenshots/"
    }
    stages {
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
    }
}