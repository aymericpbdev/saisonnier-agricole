# Guide contribution

Ce document définit les règles de commits et de pull requests pour le projet. Chaque personne qui contribue au dépôt est tenue de les respecter.

## Environnement de développement

Cette section explique comment configurer ton poste pour travailler sur le projet. Elle s'applique aux nouveaux arrivants et à toute personne qui change de machine.

### Prérequis

Le projet utilise :

- **Node.js 24.11.1**
- **npm 11.x** (livré avec Node 24)

Pour gérer la version de Node de manière reproductible entre les membres de l'équipe, on utilise **nvm** (Node Version Manager). Le fichier `.nvmrc` à la racine du projet sert de référence à la version attendue.

### Installation de nvm

#### Windows

**Important : désinstaller Node.js d'abord si une version est déjà installée.** Avoir Node installé en parallèle de nvm-windows crée des conflits de PATH et des comportements imprévisibles.

Étapes :

1. Ouvrir le Panneau de configuration et désinstaller toute version de Node.js présente.
2. Redémarrer le poste pour purger le PATH système.
3. Télécharger et installer **nvm-windows** (version 1.2.2 ou plus récente) depuis la page officielle : https://github.com/coreybutler/nvm-windows/releases (fichier `nvm-setup.exe`).
4. Ouvrir un nouveau terminal (Git Bash ou PowerShell) et vérifier avec `nvm version`.

#### macOS et Linux

Installer **nvm** via le script officiel : https://github.com/nvm-sh/nvm#installing-and-updating

Après installation, recharger la configuration du shell (ouvrir un nouveau terminal, ou exécuter `source ~/.zshrc` / `source ~/.bashrc` selon le shell utilisé). Vérifier avec `nvm --version`.

### Mise en place de la version Node du projet

Une fois nvm installé, se placer à la racine du projet (où se trouve `.nvmrc`) et installer la version attendue.

#### Windows (nvm-windows)

nvm-windows ne lit pas automatiquement `.nvmrc`. Il faut spécifier la version manuellement :

```bash
nvm install 24.11.1
nvm use 24.11.1
```

#### macOS et Linux (nvm)

La version est lue depuis `.nvmrc` :

```bash
nvm install
nvm use
```

#### Vérification (tous OS)

```bash
node -v   # doit afficher v24.11.1
npm -v    # doit afficher 11.x.x
```

Si les versions ne correspondent pas, reprendre les étapes précédentes avant de continuer.

### Installation des dépendances

Le projet est organisé en deux packages (`client/` et `server/`). Chacun a ses propres dépendances, à installer séparément.

```bash
cd client
npm install

cd ../server
npm install
```

Si `npm install` échoue avec une erreur du type `EBADENGINE`, cela signifie que ta version de Node ou de npm ne correspond pas à celle attendue par le projet. Vérifier les prérequis ci-dessus.

### Pourquoi `engine-strict=true`

Le fichier `.npmrc` à la racine contient la ligne `engine-strict=true`. Cette option demande à npm de **refuser** l'installation si les versions de Node et npm de ta machine ne correspondent pas à celles déclarées dans le champ `engines` des `package.json`.

Sans cette option, npm afficherait seulement un avertissement et continuerait l'installation, ce qui laisse le projet fonctionner chez certains et casser chez d'autres selon la version locale. Avec `engine-strict=true`, les divergences sont bloquées explicitement, ce qui garantit que toute l'équipe travaille sur la même stack.

## Conventions Git

### Branches

La branche `main` est protégée. Personne ne pousse directement dessus.

Tout développement passe par une branche dédiée, nommée selon le format suivant :

```
type/description-courte
```

Les types possibles sont :

- `feat` pour une nouvelle fonctionnalité
- `fix` pour une correction de bug
- `refactor` pour une réécriture sans changement de comportement
- `docs` pour la documentation
- `style` pour du formatage, de l'indentation, etc.
- `test` pour l'ajout ou la modification de tests
- `chore` pour la maintenance (dépendances, configuration, etc.)

La description est en minuscules, en français, avec des tirets pour séparer les mots.

Exemples :

```
feat/ajout-page-connexion
fix/erreur-formulaire-inscription
docs/mise-a-jour-readme
```

### Commits

Les messages de commit suivent la convention Conventional Commits.

Format :

```
type: description courte
```

Le type est le même que celui utilisé pour les branches. La description commence par une minuscule, ne se termine pas par un point, et reste sous les 72 caractères. Elle est rédigée en français.

Exemples :

```
feat: ajout du formulaire de connexion
fix: correction du calcul de la date de récolte
refactor: simplification du composant calendrier
docs: ajout des conventions git
```

Si un commit nécessite plus de contexte, on peut ajouter un corps après une ligne vide :

```
fix: correction du calcul de la date de récolte

Le décalage de fuseau horaire n'était pas pris en compte,
ce qui décalait les dates d'un jour en hiver.
```

Chaque commit doit correspondre à un changement logique unique. On évite les commits fourre-tout du type "modifications diverses" ou "corrections".

### Pull requests

Toute modification sur `main` passe par une pull request.

Le titre de la PR suit le même format que les commits :

```
type: description courte
```

La description de la PR doit contenir :

- Ce que la PR fait, en quelques phrases
- Le contexte si nécessaire (pourquoi ce changement)
- Les points d'attention pour le relecteur, s'il y en a

Une PR doit rester ciblée. Si elle touche à plusieurs sujets distincts, il vaut mieux la découper en plusieurs PR.

Avant de demander une relecture :

- Le code fonctionne localement
- Les fichiers inutiles ne sont pas inclus (console.log, fichiers temporaires, etc.)
- Les conflits avec `main` sont résolus

Une approbation minimum est requise avant de merger. Le merge se fait via l'interface GitHub.

### Résumé rapide

| Élément | Format | Exemple |
|---------|--------|---------|
| Branche | `type/description-courte` | `feat/ajout-page-connexion` |
| Commit | `type: description courte` | `feat: ajout du formulaire de connexion` |
| Titre de PR | `type: description courte` | `feat: ajout de la page de connexion` |

## Labels GitHub

Chaque issue doit avoir **au minimum** :
- Un label de **type d'issue** (🐛 bug, ✨ feature, 📝 documentation, ♻️ refactor, 🔧 chore)
- Un label de **zone technique** (⚙️ backend, 🎨 frontend, 🗄️ database, 🔌 api)

Et **idéalement** :
- Un label de **domaine fonctionnel** quand c'est pertinent (🔐 auth, 👤 profil, 📋 annonces, 📨 candidatures, 🔍 recherche, 📧 emails)

#### Exemples

- Créer l'endpoint POST /auth/signup → `✨ feature` + `⚙️ backend` + `🔐 auth`
- Corriger un bug d'affichage sur la page de recherche → `🐛 bug` + `🎨 frontend` + `🔍 recherche`
- Ajouter une migration pour un nouveau champ → `✨ feature` + `🗄️ database`
- Documenter l'architecture backend → `📝 documentation` + `⚙️ backend`
- Mettre à jour une dépendance → `🔧 chore`

#### Quelques règles
- Une issue = un seul label de type, un seul label de zone
- Une issue peut avoir plusieurs labels de domaine si elle en touche plusieurs (rare)
- Si tu ne sais pas quel label mettre, mets au minimum le type et la zone, on ajustera à la review