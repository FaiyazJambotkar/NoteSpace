pipeline {
    agent any

    tools {
    dockerTool 'docker-latest'
    nodejs 'nodejs-19.8'
    terraform 'terraform-11'
    }

    stages {

        stage('git checkout') {
            steps {
                git branch: 'dockerized', url: 'https://github.com/FaiyazJambotkar/NoteSpace.git'
            }
        }


        stage('container-build') {
            steps {
                sh 'docker start && docker build . -t notespace'
            }
        }

        stage('container-run') {
            steps {
                sh 'docker run -p 49160:3000 notespace'
            }
        }

        stage('container-list') {
            steps {
                sh 'docker ps'
            }
        }

        // }, 
        
        // secondBranch: {
            
        // },
        // failFast: true
    }
}
