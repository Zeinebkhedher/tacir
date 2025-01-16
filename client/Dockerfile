# Dockerfile pour le frontend
FROM node:16

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le répertoire frontend dans le conteneur
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
