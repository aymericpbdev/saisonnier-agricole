# Saisonnier Agricole

Plateforme de mise en relation entre travailleurs saisonniers et agriculteurs en France.

## Stack technique

Frontend : React, TypeScript, Vite, Ionic *(prévu pour la fin du MVP)*

Backend : Express, TypeScript, Prisma

Base de donnees : PostgreSQL

## Prerequis

Avant de commencer, les outils suivants doivent etre installes sur la machine :

- **Node.js** (version 18 ou superieure) et **npm** (version 9 ou superieure). Node.js execute le code JavaScript/TypeScript en dehors du navigateur. npm est le gestionnaire de paquets qui installe les dependances du projet. Telechargement : https://nodejs.org
- **PostgreSQL** (version 15 ou superieure). C'est la base de donnees relationnelle du projet. Elle stocke les donnees des utilisateurs, des annonces, des candidatures, etc. Telechargement : https://www.postgresql.org/download

Pour verifier que tout est installe :

```bash
node -v       # doit afficher v18.x.x ou superieur
npm -v        # doit afficher 9.x.x ou superieur
psql --version  # doit afficher la version de PostgreSQL
```

Si `psql` n'est pas reconnu alors que PostgreSQL est installe, il faut ajouter le dossier `bin` de PostgreSQL au PATH du systeme. Sur Windows, le chemin par defaut est `C:\Program Files\PostgreSQL\17\bin`. L'ajout se fait via l'editeur de variables d'environnement Windows (et non via `setx` qui tronque les valeurs longues).

## Installation

### 1. Cloner le depot

```bash
git clone git@github.com:aymericpbdev/saisonnier-agricole.git
cd saisonnier-agricole
```

### 2. Installer les dependances

Le projet est organise en monorepo avec deux dossiers independants. Chacun a son propre `package.json` et ses propres dependances. Il faut donc lancer `npm install` dans chaque dossier separement.

```bash
cd client
npm install

cd ../server
npm install
```

Le dossier `node_modules/` est cree dans chaque dossier. Il contient les librairies telechargees. Ce dossier est gitignore : chaque developpeur le regenere localement avec `npm install`.

### 3. Creer la base de donnees

Le projet utilise une base de donnees PostgreSQL nommee `saisonnier_agricole`. Il faut la creer manuellement avant de pouvoir lancer le backend.

Se connecter a PostgreSQL avec l'utilisateur `postgres` (le superutilisateur cree lors de l'installation) :

```bash
psql -U postgres
```

Puis creer la base :

```sql
CREATE DATABASE saisonnier_agricole;
```

Taper `\q` pour quitter.

### 4. Configurer les variables d'environnement

Le backend a besoin de certaines informations pour fonctionner : l'adresse de la base de donnees, le port du serveur, etc. Ces informations sont stockees dans un fichier `.env` qui n'est pas versionne (il est gitignore) parce qu'il contient des donnees sensibles propres a chaque developpeur.

Un fichier modele `.env.example` est fourni. Le copier et le completer avec ses propres valeurs :

```bash
cd server
cp .env.example .env
```

Ouvrir le fichier `.env` et remplacer les valeurs :

```
DATABASE_URL="postgresql://postgres:votre_mot_de_passe@localhost:5432/saisonnier_agricole"
PORT=3000
```

- `postgres` : le nom de l'utilisateur PostgreSQL (par defaut, c'est le superutilisateur cree a l'installation)
- `votre_mot_de_passe` : le mot de passe defini pour cet utilisateur
- `localhost:5432` : l'adresse et le port par defaut de PostgreSQL en local
- `saisonnier_agricole` : le nom de la base de donnees creee a l'etape 3

### 5. Appliquer les migrations de base de donnees

Prisma gere la structure de la base de donnees (les tables, les colonnes, les relations) a travers des fichiers de migration. Cette commande cree les tables definies dans le schema Prisma :

```bash
cd server
npx prisma migrate dev
```

Cette etape n'est necessaire que si le schema Prisma contient des modeles. Si la base est vide et qu'aucune migration n'existe encore, cette commande n'a pas d'effet.

## Lancer le projet en local

Backend :

```bash
cd server
npm run dev
```

Frontend :

```bash
cd client
npm run dev
```

L'application frontend est accessible sur `http://localhost:5173` (port par defaut de Vite).

## Structure du projet

```
saisonnier-agricole/
    client/                --> Frontend (React + TypeScript + Vite)
        src/
            pages/         --> Les ecrans de l'application (un par route)
            components/    --> Les composants reutilisables
            services/      --> Les appels API vers le backend
            hooks/         --> Les hooks React personnalises
            types/         --> Les interfaces et types TypeScript
            utils/         --> Les fonctions utilitaires
    server/                --> Backend (Express + TypeScript + Prisma)
        src/
            routes/        --> Definition des endpoints HTTP
            controllers/   --> Reception des requetes, delegation aux services
            services/      --> Logique metier et appels Prisma
            middlewares/   --> Traitements intermediaires (auth, validation, erreurs)
            types/         --> Les interfaces et types TypeScript
            utils/         --> Les fonctions utilitaires
        prisma/
            schema.prisma  --> Definition des tables de la base de donnees
```
## Charte graphique

Première version de la charte graphique du projet. Vouée à évoluer, elle est néanmoins suffisamment complète pour poser les bases visuelles et servir de référence dans l'élaboration graphique du projet.

[Voir la charte graphique v1 (PDF)](./Charte-graphique-LABOR-v1.pdf)

## Conventions

Les regles de commits, de branches et de pull requests sont decrites dans le fichier [CONTRIBUTING.md](./docs/CONTRIBUTING.md).
