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

                powershell -NoProfile -ExecutionPolicy Bypass -Command ^
                "$p = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c set BROWSER=none&& npm start' -WindowStyle Hidden -PassThru; Start-Sleep -Seconds 10"

                echo Waiting for React application...

                powershell -NoProfile -ExecutionPolicy Bypass -Command ^
                "$ready=$false; for($i=0;$i -lt 30;$i++){ try { Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 2 | Out-Null; $ready=$true; break } catch { Start-Sleep -Seconds 2 } }; if(-not $ready){ exit 1 }"

                echo React application is running.
                exit /b 0
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