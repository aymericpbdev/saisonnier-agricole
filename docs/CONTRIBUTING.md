# Conventions Git

Ce document définit les règles de commits et de pull requests pour le projet. Chaque personne qui contribue au dépot est tenue de les respecter.

## Branches

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

## Commits

Les messages de commit suivent la convention Conventional Commits.

Format :

```
type: description courte
```

Le type est le meme que celui utilisé pour les branches. La description commence par une minuscule, ne se termine pas par un point, et reste sous les 72 caractères. Elle est rédigée en français.

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

## Pull requests

Toute modification sur `main` passe par une pull request.

Le titre de la PR suit le meme format que les commits :

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

## Résumé rapide

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

### Exemples

- Créer l'endpoint POST /auth/signup → `✨ feature` + `⚙️ backend` + `🔐 auth`
- Corriger un bug d'affichage sur la page de recherche → `🐛 bug` + `🎨 frontend` + `🔍 recherche`
- Ajouter une migration pour un nouveau champ → `✨ feature` + `🗄️ database`
- Documenter l'architecture backend → `📝 documentation` + `⚙️ backend`
- Mettre à jour une dépendance → `🔧 chore`

### Quelques règles
- Une issue = un seul label de type, un seul label de zone
- Une issue peut avoir plusieurs labels de domaine si elle en touche plusieurs (rare)
- Si tu ne sais pas quel label mettre, mets au minimum le type et la zone, on ajustera à la review