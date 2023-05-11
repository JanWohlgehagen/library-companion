pipeline {
    agent any
    environment {
        SCREENSHOT_PATH = "screenshots/"
    }
    stages {
        stage("Build image") {
            steps {
                sh "sudo docker build -t lc-img frontend/Dockerfile"
            }
        }
        stage("Reset test environment") {
            steps {
                sh "sudo docker compose down"
                sh "sudo docker stop (docker ps -a -q)" //takes down remaining images
                sh "sudo docker run -d -p 80:8100 lc-img"
                //sh "docker compose up -d --build"
                sh "sudo mkdir -p ${SCREENSHOT_PATH}"
                sh "sudo chmod a=rwx ${SCREENSHOT_PATH}"
            }
        }
        stage("Take down containers") {
            steps {
                sh "sudo docker compose down"
            }
        }
    }
}