pipeline {
    agent any
    environment {
        SCREENSHOT_PATH = "screenshots/"
    }
    stages {
        stage("Build image") {
            steps {
                sh "docker build -t lc-img Dockerfile"
            }
        }
        stage("Reset test environment") {
            steps {
                sh "docker compose down"
                sh "docker stop (docker ps -a -q)" //takes down remaining images
                sh "docker run -d -p 80:8100 lc-img"
                //sh "docker compose up -d --build"
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