# Vierge & Secure

This project uses Harmonia. Harmonia is a framework meant to serve as a foundation for every project following the React-Express-MySQL stack, as learned in Wild Code School.
It's pre-configured with a set of tools which'll help students produce industry-quality and easier-to-maintain code, while staying a pedagogical tool.

## Setup & Use

**Windows users:** be sure to run these commands in a git terminal to avoid [issues with newline formats](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats):

```
git config --global core.eol lf
git config --global core.autocrlf false
```

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- Run command `npm install`
- Create environment files (`.env`) in both `server` and `client`: you can copy `.env.sample` files as starters (**don't** delete them)

### Available Commands

- `db:migrate` : Run the database migration script
- `db:seed` : Run the database seed script
- `dev` : Starts both servers (client + server) in one terminal
- `dev:client` : Starts the React client
- `dev:back` : Starts the Express server
- `lint` : Runs validation tools (will be executed on every _commit_, and refuse unclean code)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS

## Deployment with Traefik

> ⚠️ Prerequisites : You must have installed and configured Traefik on your VPS beforehand.
> https://github.com/WildCodeSchool/vps-traefik-starter-kit/

For deployment, you have to go to `secrets` → app `actions` on the github repo to insert via `New repository secret` :

- SSH_HOST : IP address of your VPS
- SSH_USER : SSH login to your VPS
- SSH_PASSWORD : SSH connection password to your VPS

And a public variable from the tab `/settings/variables/actions` :

- PROJECT_NAME : the name of the project used to create the subdomain.

> ⚠️ Warning : underscores are not allowed. They can cause trouble with the let's encrypt certificate

Use this same tab to add the other environment variables required for the project if any.

Only the server will be accessible. The root path `"/"` will redirect to the dist folder of your client. In order to allow that, please uncomment the line as explained in `server/src/app.js` (Line 102).
Because the server will also serve the client, the global variable VITE_SERVER_URL will be set with an empty string.

Your url will be ` https://${PROJECT-NAME}.${subdomain}.wilders.dev/`.

### About the database

The database is automaticaly deployed with the name of your repo. During the build of the projet (`docker-entry.sh`), the `node migrate.js` command is executed in the server. If you want to seed automaticaly your database using the `seed.js` script, replace the `cd ./server && node ./bin/migrate.js && node index.js` by `cd ./server && node ./bin/migrate.js && node ./bin/seed.js && node index.js`

### About public assets (pictures, fonts...)

Don't use any public folder on your client. This folder won't be accessible online. You may move your public assets in the `server/public` folder. Prefer [static assets](https://vitejs.dev/guide/assets) when possible.

### About Specific Environment Variables (e.g., Email)

Students should use the template provided in the `*.env.sample*` file as `<PROJECT_NAME><SPECIFIC_NAME>=<THE_VARIABLE>`.

> ⚠️ **Warning:** The `PROJECT_NAME` should match the one used in the Git public variable.

To add it during deployment, follow these 2 steps:

- Add the following variable to the `docker-compose.prod.yml` file (as shown in the example: `PROJECT_NAME_SPECIFIC_NAME: ${PROJECT_NAME_SPECIFIC_NAME}`).
- Connect to your server via SSH. Open the global `.env` file in Traefik (`nano ./traefik/data/.env`). Add the variable with the correct value and save the file.
- Afterward, you can initiate automatic deployment. Docker will not refresh during this process.

### About Logs

If you want to access the logs of your online projet (to follow the deployement or to watch any bug error), connect to your VPS (`ssh user@host`).
Then, go on your specific project and run  `docker compose logs -t -f`.




#version française
# Vierge & Sécurisé

Ce projet utilise Harmonia. Harmonia est un framework destiné à servir de base pour tout projet suivant la stack React-Express-MySQL, comme appris à la Wild Code School.
Il est préconfiguré avec un ensemble d'outils qui aideront les étudiants à produire un code de qualité industrielle et plus facile à maintenir, tout en restant un outil pédagogique.

## Installation & Utilisation

**Utilisateurs Windows :** assurez-vous d'exécuter ces commandes dans un terminal git pour éviter [les problèmes avec les formats de nouvelle ligne](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats) :

```
git config --global core.eol lf
git config --global core.autocrlf false
```


- Dans VSCode, installez les plugins **Prettier - Code formatter** et **ESLint** et configurez-les
- Clonez ce dépôt, entrez dedans
- Exécutez la commande `npm install`
- Créez des fichiers d'environnement (`.env`) dans `server` et `client` : vous pouvez copier les fichiers `.env.sample` comme point de départ (**ne** les supprimez pas)

### Commandes Disponibles

- `db:migrate` : Exécute le script de migration de la base de données
- `db:seed` : Exécute le script de peuplement de la base de données
- `dev` : Démarre les deux serveurs (client + serveur) dans un terminal
- `dev:client` : Démarre le client React
- `dev:back` : Démarre le serveur Express
- `lint` : Exécute les outils de validation (sera exécuté à chaque _commit_, et refusera le code non propre)

## FAQ

### Outils

- _Concurrently_ : Permet à plusieurs commandes de s'exécuter simultanément dans le même CLI
- _Husky_ : Permet d'exécuter des commandes spécifiques qui se déclenchent sur des événements _git_
- _Vite_ : Alternative à _Create-React-App_, empaquetant moins d'outils pour une expérience plus fluide
- _ESLint_ : Outil de "qualité du code", assure que les règles choisies seront appliquées
- _Prettier_ : Outil de "qualité du code" également, se concentre sur le style de code
- _Airbnb Standard_ : L'un des "standards" les plus connus, bien qu'il ne soit pas officiellement lié à ES/JS

## Déploiement avec Traefik

> ⚠️ Prérequis : Vous devez avoir installé et configuré Traefik sur votre VPS au préalable.
> https://github.com/WildCodeSchool/vps-traefik-starter-kit/

Pour le déploiement, vous devez aller dans `secrets` → app `actions` sur le dépôt github pour insérer via `New repository secret` :

- SSH_HOST : Adresse IP de votre VPS
- SSH_USER : Login SSH pour votre VPS
- SSH_PASSWORD : Mot de passe de connexion SSH pour votre VPS

Et une variable publique depuis l'onglet `/settings/variables/actions` :

- PROJECT_NAME : le nom du projet utilisé pour créer le sous-domaine.

> ⚠️ Attention : les underscores ne sont pas autorisés. Ils peuvent causer des problèmes avec le certificat let's encrypt

Utilisez cet onglet pour ajouter les autres variables d'environnement requises pour le projet si nécessaire.

Seul le serveur sera accessible. Le chemin racine `"/"` redirigera vers le dossier dist de votre client. Pour permettre cela, veuillez décommenter la ligne comme expliqué dans `server/src/app.js` (Ligne 102).
Parce que le serveur servira également le client, la variable globale VITE_SERVER_URL sera définie avec une chaîne vide.

Votre URL sera `https://${PROJECT-NAME}.${subdomain}.wilders.dev/`.

### À propos de la base de données

La base de données est automatiquement déployée avec le nom de votre dépôt. Pendant la construction du projet (`docker-entry.sh`), la commande `node migrate.js` est exécutée dans le serveur. Si vous souhaitez peupler automatiquement votre base de données en utilisant le script `seed.js`, remplacez `cd ./server && node ./bin/migrate.js && node index.js` par `cd ./server && node ./bin/migrate.js && node ./bin/seed.js && node index.js`

### À propos des ressources publiques (images, polices...)

N'utilisez pas de dossier public sur votre client. Ce dossier ne sera pas accessible en ligne. Vous pouvez déplacer vos ressources publiques dans le dossier `server/public`. Préférez [les ressources statiques](https://vitejs.dev/guide/assets) lorsque c'est possible.

### À propos des Variables d'Environnement Spécifiques (par exemple, Email)

Les étudiants doivent utiliser le modèle fourni dans le fichier `*.env.sample*` comme `<PROJECT_NAME><SPECIFIC_NAME>=<THE_VARIABLE>`.

> ⚠️ **Attention :** Le `PROJECT_NAME` doit correspondre à celui utilisé dans la variable publique Git.

Pour l'ajouter lors du déploiement, suivez ces 2 étapes :

- Ajoutez la variable suivante au fichier `docker-compose.prod.yml` (comme montré dans l'exemple : `PROJECT_NAME_SPECIFIC_NAME: ${PROJECT_NAME_SPECIFIC_NAME}`).
- Connectez-vous à votre serveur via SSH. Ouvrez le fichier `.env` global dans Traefik (`nano ./traefik/data/.env`). Ajoutez la variable avec la valeur correcte et enregistrez le fichier.
- Ensuite, vous pouvez initier le déploiement automatique. Docker ne se rafraîchira pas pendant ce processus.

### À propos des Logs

Si vous souhaitez accéder aux logs de votre projet en ligne (pour suivre le déploiement ou pour observer toute erreur), connectez-vous à votre VPS (`ssh user@host`).
Ensuite, allez sur votre projet spécifique et exécutez `docker compose logs -t -f`.

