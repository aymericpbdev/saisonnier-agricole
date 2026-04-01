# Saisonnier Agricole

<!-- Décris ici le projet en quelques phrases : à quoi il sert, à qui il s'adresse, quel problème il résout. -->

## Prérequis

- Node.js (version 18 ou supérieure)
- npm
- Ionic CLI (`npm install -g @ionic/cli`)
- PostgreSQL (version 15 ou supérieure)

## Installation

Cloner le dépot :

```bash
git clone git@github.com:aymericpbdev/saisonnier-agricole.git
cd saisonnier-agricole
```

Installer les dépendances :

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

Copier les fichiers de variables d'environnement et les compléter avec ses propres valeurs :

```bash
cp .env.example .env
```

Initialiser la base de données :

```bash
npx prisma migrate dev
```

## Lancer le projet en local

Backend :

```bash
cd server
npm run dev
```

Frontend :

```bash
cd client
ionic serve
```

L'application est accessible sur `http://localhost:8100`.

## Stack technique

Frontend : Ionic, React, TypeScript

Backend : Express, Prisma, TypeScript

Base de données : PostgreSQL

## Conventions

Les règles de commits, de branches et de pull requests sont décrites dans le fichier [CONTRIBUTING.md](docs/CONTRIBUTING.md).