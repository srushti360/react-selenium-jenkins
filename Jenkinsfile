pipeline {
    agent any

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                @echo off
                echo Installing React and Selenium dependencies...
                npm install
                '''
            }
        }

        stage('Start React Application') {
            steps {
                bat '''
                @echo off
                echo Starting React application...
                start "React App" cmd /c "npm start"
                timeout /t 10 /nobreak
                '''
            }
        }

        stage('Execute Selenium Tests') {
            steps {
                bat '''
                @echo off
                echo Running Selenium UI tests...
                node tests/test.js
                '''
            }
        }
    }
}