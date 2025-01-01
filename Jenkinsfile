pipeline {
    agent any

    environment {
        // Variables d'environnement si nécessaire
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Zeinebkhedher/tacir.git'  // Remplace par l'URL de ton dépôt Git
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Backend Node.js Build
                    dir('api') {
                        sh 'npm install'  // Installe les dépendances pour l'API Node.js
                    }

                    // Frontend ReactJS Build
                    dir('client') {
                        sh 'npm install'  // Installe les dépendances pour l'application React
                        sh 'npm run build'  // Compile le projet ReactJS
                    }
                }
            }
        }
        
        // Ajoute d'autres étapes comme les tests ou l'intégration
    }
}
