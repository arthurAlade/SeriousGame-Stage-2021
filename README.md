# SeriousGame-Stage-2021
Code réalisé durant mon stage de DUT en 2021.

Le but du projet était de réaliser un serveur web de supervision pour un serious game à destination des musées.
L'API est réalisée avec *GraphQl* et l'ORM *Sequelize*.
L'application est elle en *React*.
## Pré-requis
1. Node >18 | <16
2. Docker
3. npm | yarn
## Lancer le serveur
1. `cd API`
2. `yarn install`
3. `docker compose up -d`
4. `yarn run start`
5. `npx sequelize-cli db:create`
6. `npx sequelize-cli db:migrate`
7. Importer les données en executant le fichier : `insert_data_multiples_seances.js`
> Au besoin, *Adminer* est lancé sur `localhost:8080`, l'user et le mdp sont : `db-user`

> *Playground* pour réaliser des requêtes *GraphQl* est sur `localhost:3301/api`

## Lancer l'app
1. `cd APP/supervision`
2. `yarn install`
3. `yarn run start`
> L'app devrait s'ouvrir d'elle même. Autrement elle est disponible à l'adresse `localhost:3000`
