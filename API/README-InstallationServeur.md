# Installation des utilitaires
---
## Installation de node et npm
### Sous linux :
1. Ouvrir un terminal
2. `curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`
3. `sudo apt install nodejs`
4. On peut vérifier notre installation avec `node --version` et `npm --version`
### Sous Windows :
1. Aller à `https://nodejs.org/en/download/` et télécharger l'installer Windows
2. Installer les dépendances souhaitées autremement faire suivant par défaut.
3. Vérifier dans un terminal avec `node -v` et `npm -v`
### Sous MacOS :
1. Aller à `https://nodejs.org/en/download/` et télécharger l'installer MacOS
2. Installer les dépendances souhaitées autremement faire suivant par défaut.
3. Vérifier dans un terminal avec `node -v` et `npm -v`
## Installation de Docker
### Sous Debian : `https://docs.docker.com/engine/install/debian/`

1. Ouvrir un terminal
2. Enlever les version précédentes : `sudo apt-get remove docker docker-engine docker.io containerd runc`
3. `sudo apt-get update`
4. `sudo apt-get install \ apt-transport-https \ ca-certificates \ curl \ gnupg \ lsb-release`
5. `curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`
6. `echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`
7. `sudo apt-get update`
8. `sudo apt-get install docker-ce docker-ce-cli containerd.io`
9. Choisir la version du Docker Engine `apt-cache madison docker-ce`
10. `sudo apt-get install docker-ce=<VERSION_CHOISIE> docker-ce-cli=<VERSION_CHOISIE> containerd.io`
11. Tester l'installation `sudo docker run hello-world`
### Sous Ubuntu : `https://docs.docker.com/engine/install/ubuntu/`
### Sous Fedora : `https://docs.docker.com/engine/install/fedora/`
### Sous MacOS : `https://docs.docker.com/docker-for-mac/install/`
1. Télécharger l'installer correspondant au CPU (Intel/Apple) : `https://www.docker.com/get-started`
2. Pour les CPU Apple (pas besoin pour les Intel) lancer la commande `softwareupdate --install-rosetta`
3. Executer l'installer.
4. Lancer l'application
### Sous Windows : `https://docs.docker.com/docker-for-windows/install/`
1. Mettre à jour Windows
2. Lancer le PowerShell en admin puis `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`
3. `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`
4. Télécharger la mise à jour de WSL2 puis l'exécuter `https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi`
5. `wsl --set-default-version 2`
6. Télécharger l'installer Docker `https://desktop.docker.com/win/stable/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&amp;utm_medium=webreferral&amp;utm_campaign=dd-smartbutton&amp;utm_location=module`
7. L'exécuter
8. Lancer Docker Desktop
# Installation du serveur
---
1. Cloner le projet depuis le répertoire github : https://gitlab.univ-lr.fr/stage2021_aladenise_elie/seriousgame
2. Se placer dans la branche `test-api`(ou `master`) puis aller dans le répertoire API
3. Installer les dépendances avec `yarn install` ou `npm install`
4. Créer le conteneur docker de la base de donnée `docker-compose up -d` ou  `docker compose up -d`
5. Créer la base de données `npx sequelize-cli db:create`
6. Réaliser les migrations `npx sequelize-cli db:migrate`
7. Lancer l'API `yarn run start` ou `npm run start`
8. (facultatif) Ajouter les données avec `node insert-data.js`
9. Adminer est sur http://localhost:8080 (db-user | db-user)
10. Playground est sur http://localhost:3301/api 
