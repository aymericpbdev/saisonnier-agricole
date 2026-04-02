# Journal de mise en place de l'environnement

Date : 1-2 avril 2026

Ce document retrace l'ensemble des étapes de mise en place de l'environnement du projet Saisonnier Agricole : commandes exécutées, décisions prises, problèmes rencontrés et solutions appliquées.

---

## 1. Verification des prérequis

Commandes executees :

```bash
node -v       # v24.11.1
npm -v        # 11.6.3
psql --version  # command not found
```

Node.js et npm etaient déja installés. PostgreSQL n'était pas present sur la machine.

## 2. Installation de PostgreSQL

### Choix : installation directe (sans Docker)

Le projet n'a pas de pipeline CI/CD ni de deploiement automatisé. Docker aurait ajouté une couche de complexité inutile à ce stade. L'installation directe sur Windows est suffisante pour le développement local.

### Installation via winget

La premiere tentative a échoué :

```bash
winget install PostgreSQL.PostgreSQL
# "Aucun package ne correspond aux criteres selectionnes."
```

Le nom du package n'était pas exact. Une recherche a permis de trouver le bon identifiant :

```bash
winget search postgresql
# Le bon ID : PostgreSQL.PostgreSQL.17

winget install PostgreSQL.PostgreSQL.17
```

L'installation s'est terminée correctement.

### Probleme : psql introuvable apres installation

```bash
psql --version
# bash: psql: command not found
```

PostgreSQL etait installé mais son dossier `bin` n'etait pas dans le PATH. Le binaire existait bien :

```bash
ls "/c/Program Files/PostgreSQL/17/bin/psql.exe"
# Fichier present
```

### Probleme : PATH tronqué par setx

La commande `setx` a été utilisée pour ajouter PostgreSQL au PATH :

```bash
setx PATH "$PATH;C:\Program Files\PostgreSQL\17\bin"
```

Cette commande a provoqué un problème : `setx` a une limite de 1024 caracteres. Elle a copié l'ensemble du PATH systeme dans le PATH utilisateur, puis a tronque le resultat. Le message d'avertissement était :

```
Avertissement : les donnees en cours d'enregistrement sont tronquees a 1024 caracteres.
```

Conséquence : le PATH utilisateur contenait des dizaines d'entrees système en double, et l'entrée PostgreSQL était tronquée en `D:\` (inutilisable).

### Correction du PATH

Ouverture de l'éditeur de variables d'environnement Windows :

```bash
rundll32 sysdm.cpl,EditEnvironmentVariables
```

Actions effectuées dans les variables utilisateur (Path) :

- Suppression de toutes les entrées système dupliquées (Intel, NVIDIA, Windows, OpenSSH, etc.)
- Suppression des doublons Git
- Suppression de l'entree tronquee `D:\`
- Ajout manuel de `C:\Program Files\PostgreSQL\17\bin`

Entrées conservées dans le PATH utilisateur :

```
C:\Users\Aymeric PB\bin
D:\Git\mingw64\bin
D:\Git\usr\local\bin
D:\Git\usr\bin
C:\Users\Aymeric PB\AppData\Local\Programs\Microsoft VS Code
C:\Python314\Scripts
C:\Python314
C:\Program Files\PostgreSQL\17\bin
```

Apres modification, Git Bash et PowerShell ne détectaient toujours pas `psql`. Un redémarrage complet de la machine a été nécessaire pour que les changements de PATH prennent effet.

```bash
psql --version
# psql (PostgreSQL) 17.9
```

Leçon retenue : ne jamais utiliser `setx PATH` avec `$PATH` sur Windows. La limite de 1024 caracteres tronque les données et peut corrompre le PATH. Toujours passer par l'editeur graphique de variables d'environnement.

## 3. Configuration de PostgreSQL

### Probleme : mot de passe oublie

Le mot de passe superutilisateur defini lors de l'installation n'a pas été note. Procédure de réinitialisation :

1. Ouverture de `C:\Program Files\PostgreSQL\17\data\pg_hba.conf` dans Notepad (en administrateur)
2. Modification des trois lignes principales : remplacement de `scram-sha-256` par `trust` pour autoriser la connexion sans mot de passe

```
local   all   all                     trust
host    all   all   127.0.0.1/32      trust
host    all   all   ::1/128           trust
```

3. Redémarrage du service PostgreSQL dans PowerShell (en administrateur) :

```powershell
Restart-Service postgresql-x64-17
```

### Problème : le service ne démarre pas

Le redémarrage du service a échoué. Le log PostgreSQL ne montrait pas d'erreur récente. Apres vérification du fichier `pg_hba.conf`, l'erreur était une faute de frappe : `true` avait été écrit au lieu de `trust`. PostgreSQL ne reconnait pas `true` comme méthode d'authentification valide.

Correction : remplacement de `true` par `trust`, puis :

```powershell
Start-Service postgresql-x64-17
```

### Réinitialisation du mot de passe

Connexion sans mot de passe (grace au mode `trust`) :

```bash
psql -U postgres
```

Changement du mot de passe :

```sql
ALTER USER postgres PASSWORD 'nouveau_mot_de_passe';
```

Puis revert de `pg_hba.conf` : remplacement de `trust` par `scram-sha-256` sur les trois lignes, et redemarrage du service (PowerShell en administrateur) :

```powershell
Restart-Service postgresql-x64-17
```

Note : la commande `Restart-Service` nécessite que PowerShell soit lancé en tant qu'administrateur. Sans élévation de privilèges, l'erreur "Impossible d'ouvrir le service" apparait.

### Création de la base de données

```bash
psql -U postgres
```

```sql
CREATE DATABASE saisonnier_agricole;
```

## 4. Initialisation du frontend

### Choix : React + TypeScript avec Vite (sans Ionic)

Ionic ne sera intégré qu'à la fin du MVP. Pour le MVP, un projet React + TypeScript classique via Vite est suffisant et plus léger.

Create React App est officiellement déprécié depuis 2023. Vite est le standard actuel : plus rapide, plus leger, mieux maintenu.

```bash
cd /d/saisonnier-agricole
npm create vite@latest client -- --template react-ts
```

### Création de la structure de dossiers

```bash
cd client/src
mkdir pages components services hooks types utils
```

Structure obtenue dans `client/src/` :

```
App.css
App.tsx
assets/
components/
hooks/
index.css
main.tsx
pages/
services/
types/
utils/
```

## 5. Initialisation du backend

### Initialisation du projet et installation des dépendances

```bash
cd /d/saisonnier-agricole
mkdir server
cd server
npm init -y
```

Dépendances de production :

```bash
npm install express @prisma/client cors dotenv
```

- `express` : framework HTTP pour gérer les routes et les requetes
- `@prisma/client` : client généré par Prisma pour interroger la base de données
- `cors` : middleware pour autoriser les requetes cross-origin (le frontend et le backend tournent sur des ports différents en local)
- `dotenv` : chargement des variables d'environnement depuis le fichier `.env`

Dépendances de développement :

```bash
npm install -D typescript ts-node @types/express @types/node @types/cors prisma
```

- `typescript` : compilateur TypeScript
- `ts-node` : exécution directe de fichiers TypeScript sans compilation préalable (utile en dev)
- `@types/express`, `@types/node`, `@types/cors` : définitions de types TypeScript pour les librairies JavaScript
- `prisma` : CLI Prisma pour gérer les migrations et le schema

### Initialisation de TypeScript et Prisma

```bash
npx tsc --init       # cree tsconfig.json
npx prisma init      # cree prisma/schema.prisma et .env
```

### Création de la structure de dossiers

```bash
mkdir -p src/routes src/controllers src/services src/middlewares src/types src/utils
touch src/app.ts src/server.ts
```

Structure obtenue dans `server/` :

```
.env
.env.example
.gitignore
package.json
package-lock.json
prisma/
    schema.prisma
prisma.config.ts
src/
    app.ts
    server.ts
    controllers/
    middlewares/
    routes/
    services/
    types/
    utils/
tsconfig.json
```

## 6. Fichiers de configuration

### .gitignore

Trois fichiers `.gitignore` coexistent dans le projet :

- `client/.gitignore` : généré par Vite, couvre node_modules, dist, logs, fichiers IDE
- `server/.gitignore` : complété manuellement pour couvrir node_modules, .env, dist, Prisma generated, logs, fichiers IDE
- `.gitignore` (racine) : couvre les fichiers OS (`.DS_Store`, `Thumbs.db`)

Le `.gitignore` du client et celui du server sont independants car chaque dossier est un projet npm autonome avec ses propres specificites.

### .env.example

Créé dans `server/` pour que les coéquipiers sachent quelles variables d'environnement definir :

```
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/saisonnier_agricole"
PORT=3000
```

Le fichier `.env` réel est gitignore. Chaque développeur copie `.env.example` en `.env` et remplit ses propres valeurs.

### Vérification de la connexion Prisma

```bash
cd /d/saisonnier-agricole/server
npx prisma db pull
```

Résultat : "The introspected database was empty." C'est le comportement attendu : la base de donnees existe et Prisma s'y connecte, mais il n'y a pas encore de tables.

## 7. Structure finale du projet

```
saisonnier-agricole/
    .gitignore
    README.md
    LICENSE
    docs/
        CONTRIBUTING.md
    client/
        .gitignore
        package.json
        package-lock.json
        tsconfig.json
        vite.config.ts
        eslint.config.js
        index.html
        public/
        src/
            App.tsx
            App.css
            main.tsx
            index.css
            assets/
            pages/
            components/
            services/
            hooks/
            types/
            utils/
    server/
        .gitignore
        .env
        .env.example
        package.json
        package-lock.json
        tsconfig.json
        prisma.config.ts
        prisma/
            schema.prisma
        src/
            app.ts
            server.ts
            routes/
            controllers/
            services/
            middlewares/
            types/
            utils/
```

## 8. Procédure pour un nouveau developpeur

1. Cloner le depot
2. `cd client && npm install`
3. `cd ../server && npm install`
4. Installer PostgreSQL et créer la base de donnees `saisonnier_agricole`
5. Copier `server/.env.example` en `server/.env` et remplir ses identifiants PostgreSQL
6. `npx prisma migrate dev` (une fois le schéma défini)
