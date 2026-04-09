# Journal : correction des package-lock.json instables

## Contexte

En reviewant la PR #4 d'un membre de l'équipe, j'ai remarqué que le diff contenait des modifications surprenantes sur les deux `package-lock.json` (client et serveur). Ces modifications ne correspondaient à aucun ajout, suppression ou mise à jour de dépendance : il s'agissait uniquement de l'apparition ou de la disparition d'une propriété `"peer": true` sur des packages déjà présents.

Première hypothèse : la personne avait utilisé une version de Node ou de npm différente du reste de l'équipe. Hypothèse rapidement écartée après vérification : nos versions étaient quasi identiques (npm 11.6.2 d'un côté, 11.6.3 de l'autre, même version exacte de Node).

Deuxième hypothèse : un bug propre à npm 11.x. Hypothèse également écartée après qu'une autre personne de l'équipe a confirmé observer le même diff après un simple `git clone` suivi de `npm install`, sans toucher à rien.

Le diagnostic réel : les deux `package-lock.json` qui se trouvaient sur `main` étaient instables. Ils contenaient des métadonnées qui n'étaient plus reproductibles avec notre version actuelle de npm. Du coup, chaque `npm install` les "corrigeait" automatiquement et produisait un diff parasite. Le problème ne venait pas de la PR, il venait de la base sur laquelle elle avait été créée.

## Ce que j'ai mal géré au début

Avant de comprendre tout ça, j'ai tenté de régénérer les locks moi-même sur une nouvelle branche. Ça a failli mal tourner pour une raison qui n'avait rien à voir avec le sujet initial : mon `main` local était dans un état corrompu sans que je le sache.

Quand j'ai créé la branche `chore/regenerate-lockfiles` "depuis main", je l'ai en fait créée depuis un état tronqué qui ne contenait que 2 commits sur les 4 qui existent réellement sur le main distant. Résultat : git voyait tous les fichiers du projet comme des "new file" (nouveaux fichiers à ajouter), et mon premier `git status` affichait une liste démentielle de modifications.

La leçon ici : avant de partir sur une branche, **toujours vérifier que mon main local est bien aligné sur le main distant**. Une seule commande aurait suffi à me l'indiquer dès le début :

```bash
git status
```

Si la sortie contient une ligne du type :

```
Your branch is ahead of 'origin/main' by X commits.
```

ou

```
Your branch and 'origin/main' have diverged
```

c'est un signal d'alerte. Il faut comprendre pourquoi avant de continuer.

Une commande encore plus précise pour vérifier l'alignement :

```bash
git fetch origin
git log main --oneline -10
git log origin/main --oneline -10
```

Si les deux listes de commits ne sont pas identiques, c'est qu'il y a un écart. À régler avant de créer une nouvelle branche.

## La démarche complète, étape par étape

Voici l'enchaînement des opérations qui ont permis de réparer la situation, avec une explication détaillée de chaque commande pour que je puisse la rejouer plus tard sans avoir besoin d'aide.

### Étape 1. Réparer mon main local

Mon main local pointait sur un commit qui n'avait jamais été mergé sur le main distant, et lui manquait 3 commits qui eux étaient bien sur le distant. Pour réaligner :

```bash
git fetch origin
```

Cette commande télécharge l'état actuel du dépôt distant (origin) sans toucher à mes fichiers locaux. C'est une commande sans risque, qu'on peut lancer aussi souvent qu'on veut. Elle met simplement à jour la connaissance que mon git local a du distant.

```bash
git log origin/main --oneline -10
```

Affiche les 10 derniers commits du main distant. `--oneline` condense chaque commit sur une seule ligne (au lieu d'afficher l'auteur, la date et le message complet sur 5 lignes). C'est utile pour vérifier rapidement à quoi ressemble l'historique.

```bash
git checkout main
git reset --hard origin/main
```

`git checkout main` me bascule sur ma branche main locale. `git reset --hard origin/main` est la commande qui répare. Elle dit à git : "oublie l'état actuel de ma branche main, et remplace-la entièrement par l'état de origin/main". Le `--hard` est crucial : sans lui, git ne touche pas aux fichiers du répertoire de travail. Avec lui, il les remplace pour qu'ils correspondent exactement à origin/main.

Attention : `git reset --hard` est une commande **destructive**. Tout ce qui n'est pas committé et poussé est perdu. À utiliser seulement quand on est sûr de ce qu'on veut écraser. Dans mon cas, le commit local que j'allais perdre existait déjà sur le distant sous un autre identifiant (il avait été mergé via une PR), donc aucun risque réel.

### Étape 2. Sauvegarder ce qui pourrait être utile

Avant de tout réinitialiser, j'avais déjà régénéré mes deux locks au cours de mes premières tentatives. Pour ne pas les perdre au cas où ils seraient utiles plus tard :

```bash
cp client/package-lock.json /tmp/client-lock-backup.json
cp server/package-lock.json /tmp/server-lock-backup.json
```

`cp` copie un fichier d'un endroit à un autre. Le dossier `/tmp/` existe sur Git Bash sous Windows et sert de zone de stockage temporaire. C'est l'endroit naturel pour mettre des sauvegardes qui n'ont pas besoin de survivre à un redémarrage.

### Étape 3. Recréer la branche de travail proprement

Une fois mon main local réparé, l'ancienne branche `chore/regenerate-lockfiles` était inutilisable (elle pointait sur le mauvais commit de départ). Il faut la supprimer et la recréer depuis le main réparé :

```bash
git branch -D chore/regenerate-lockfiles
git checkout -b chore/regenerate-lockfiles
```

`git branch -D` supprime une branche locale. La majuscule `-D` force la suppression même si la branche contient des commits non mergés. C'est l'équivalent strict de "je sais ce que je fais, supprime quand même". Avec une minuscule `-d`, git refuserait par sécurité.

`git checkout -b` crée une nouvelle branche **et** s'y déplace dans la foulée. C'est l'équivalent condensé de :

```bash
git branch chore/regenerate-lockfiles
git checkout chore/regenerate-lockfiles
```

Petite note de vocabulaire moderne : `git switch -c` fait la même chose et est la commande recommandée par git lui-même depuis quelques années. `checkout -b` reste valide, juste un peu plus ancien.

### Étape 4. Régénérer les lock files depuis zéro

C'est le cœur de la correction. L'idée : supprimer les `node_modules` (le dossier où npm installe les packages) **et** les `package-lock.json` actuels, puis relancer une installation propre.

```bash
cd client
rm -rf node_modules package-lock.json
npm install

cd ../server
rm -rf node_modules package-lock.json
npm install
```

`rm -rf` supprime sans demander confirmation et de manière récursive. C'est une commande puissante qui ne pardonne pas : elle ne met rien dans une corbeille, le contenu disparaît immédiatement. Le drapeau `-r` (récursif) est nécessaire pour supprimer un dossier et tout son contenu. Le drapeau `-f` (force) supprime sans poser de question. Combinés en `-rf`, c'est le combo standard pour vider un dossier d'un coup.

Pourquoi supprimer aussi `node_modules` et pas seulement le lock ? Parce que npm utilise le contenu de `node_modules` comme source de vérité quand il regénère le lock. Si on laisse l'ancien `node_modules` en place, npm risque de reproduire les mêmes métadonnées "sales" qu'avant. Pour avoir un lock vraiment neuf, il faut partir d'une page blanche : ni lock, ni packages installés.

`npm install` lit le `package.json`, calcule l'arbre complet des dépendances (chaque package, ses sous-packages, leurs versions exactes), télécharge tout, et écrit un nouveau `package-lock.json` qui fige cet état précis.

### Étape 5. Le test crucial : la stabilité du lock

C'est l'étape que j'aurais facilement pu sauter, et qui aurait laissé le problème non résolu sans que je m'en rende compte. Comment vérifier qu'un lock est vraiment stable ? En relançant l'installation une seconde fois et en comparant les deux résultats.

```bash
cp client/package-lock.json /tmp/client-lock-v1.json
cp server/package-lock.json /tmp/server-lock-v1.json

cd client
rm -rf node_modules
npm install
cd ..

cd server
rm -rf node_modules
npm install
cd ..

diff client/package-lock.json /tmp/client-lock-v1.json
diff server/package-lock.json /tmp/server-lock-v1.json
```

Décomposition de cette séquence :

1. Je sauvegarde une copie des locks fraîchement générés sous le nom `v1`.
2. Je supprime à nouveau `node_modules` (mais cette fois je garde le lock, pour voir si npm va le modifier ou non).
3. Je relance `npm install`. Si le lock est stable, npm doit le laisser tel quel ou écrire exactement le même contenu.
4. `diff` compare deux fichiers ligne par ligne. **Si les deux fichiers sont identiques, `diff` n'affiche rien.** Une sortie vide est donc le résultat qu'on cherche.

Important à comprendre : `git status` ne suffit pas pour ce test. `git status` compare l'état actuel à ce qui est committé, pas à l'état précédent. Il peut très bien afficher "modifié" à chaque install sans que ça veuille dire qu'il y a une instabilité (juste que le lock du dernier commit est différent du lock régénéré). Pour prouver la stabilité, il faut comparer **deux installs successifs entre eux**, pas l'install au commit. C'est le rôle de `diff` avec les sauvegardes manuelles.

Dans mon cas, les deux `diff` n'ont produit aucune sortie. Les locks étaient parfaitement reproductibles. J'ai pu commit en confiance.

### Étape 6. Le commit

```bash
git add client/package-lock.json server/package-lock.json
git commit -m "chore: regenerate package-lock.json files

Les lock files initiaux contenaient des metadonnees instables
qui produisaient un diff sans changement reel a chaque npm install.
Regeneres depuis zero avec npm 11.6.3 pour obtenir une base stable
et reproductible."
```

`git add` ajoute les fichiers spécifiés à la zone d'index (staging area). Cette zone est une étape intermédiaire entre "fichier modifié dans mon dossier" et "fichier inclus dans le prochain commit". Elle permet de choisir précisément ce qu'on commit, sans être obligé de tout prendre.

`git commit` enregistre les fichiers de l'index dans un nouveau commit. Le `-m` permet de passer le message en ligne de commande. Sans `-m`, git ouvrirait un éditeur de texte (souvent vim, ce qui peut surprendre la première fois). Le message d'un commit chore (maintenance) suit la même convention que les autres : un titre court à l'impératif suivi d'un paragraphe explicatif optionnel.

### Étape 7. Le push

```bash
git push -u origin chore/regenerate-lockfiles
```

`git push` envoie les commits locaux vers le dépôt distant. Le `-u` (raccourci de `--set-upstream`) crée un lien permanent entre ma branche locale et la branche distante du même nom. Ce lien permet, lors des push et pull suivants, de ne pas avoir à préciser à chaque fois "vers quelle branche distante envoyer". Une fois fait, un simple `git push` ou `git pull` suffit.

C'est le genre de petit détail qui n'a l'air de rien mais qui simplifie énormément le travail au quotidien.

## Ce que cette PR ne règle pas

La PR corrige le problème **immédiat** : les locks sont maintenant stables avec ma version actuelle de npm. Mais elle ne garantit pas qu'un membre de l'équipe arrivant avec une version différente ne va pas réintroduire le même type d'instabilité.

Pour empêcher ça à la racine, il faudra une autre PR qui ajoute :

- Un fichier `.nvmrc` à la racine de chaque dossier (`client/` et `server/`) contenant la version exacte de Node attendue. C'est lu par nvm (le gestionnaire de versions de Node) pour basculer automatiquement sur la bonne version quand on entre dans le dossier.
- Un champ `engines` dans chaque `package.json` qui déclare la version de Node et de npm requises. npm émet alors un warning si quelqu'un installe avec une version non conforme.
- Une mise à jour du README pour documenter ces prérequis et expliquer comment installer nvm.

Cette PR séparée n'est pas urgente, mais elle est importante. Sans elle, le problème reviendra tôt ou tard.

## Action requise pour les autres membres de l'équipe après le merge

Une fois la PR mergée sur main, chaque personne devra synchroniser son environnement local. Un simple `git pull` ne suffit pas : il faut aussi reconstruire les `node_modules`, sinon l'install locale va recréer un état divergent et le problème va se réintroduire pour cette personne.

La séquence à suivre :

```bash
git checkout main
git pull
cd client && rm -rf node_modules && npm install
cd ../server && rm -rf node_modules && npm install
```

C'est à communiquer clairement à l'équipe au moment du merge.

## Ce que j'ai appris

### Sur git

Plusieurs concepts qui étaient flous pour moi sont devenus plus clairs :

**`git status` est mon meilleur ami**. Il me dit dans quel état est ma branche par rapport au distant. Je dois prendre l'habitude de le lancer souvent, surtout avant de créer une nouvelle branche ou de commencer un nouveau travail.

**Une branche n'est pas un dossier, c'est un pointeur**. Quand je fais `git checkout -b ma-branche`, je ne crée pas une copie du projet dans un coin. Je crée juste une nouvelle étiquette qui pointe sur le même commit que celui où j'étais. Toutes les branches partagent le même historique de commits. C'est cette compréhension qui permet de comprendre pourquoi mon `main` local pouvait être désaligné du distant : ce n'était qu'un pointeur mal placé, pas un projet "endommagé".

**`git reset --hard` est une commande chirurgicale, pas une commande nucléaire**. Elle déplace le pointeur de la branche actuelle et synchronise les fichiers du dossier. Elle est destructive pour les modifications non committées, mais elle ne supprime pas vraiment les commits : ils restent accessibles tant qu'ils sont référencés ailleurs (par une autre branche, par origin, ou par un tag).

**`git fetch` et `git pull` ne sont pas la même chose**. `fetch` récupère les informations du distant sans rien modifier en local. `pull` fait un fetch suivi d'un merge dans la branche actuelle. Quand j'ai un doute sur l'état de mon dépôt, faire un `fetch` seul est toujours sans risque, et me donne l'information dont j'ai besoin pour décider de la suite.

### Sur npm et les lock files

**Le `package-lock.json` n'est pas un fichier "à part"**. C'est la photographie exacte de l'arbre de dépendances à un instant T. Il garantit que deux personnes qui font `npm install` à partir du même `package.json` et du même lock obtiennent **exactement** les mêmes versions de tous les packages, jusqu'aux sous-dépendances les plus profondes. C'est ce qui permet de reproduire un environnement de manière fiable.

**Si le lock devient instable, c'est tout l'écosystème qui devient incertain**. Un lock qui change à chaque install veut dire que personne dans l'équipe n'installe vraiment la même chose, ce qui peut produire des bugs qui n'apparaissent que sur certaines machines.

**Régénérer un lock n'est pas anodin**. Ça doit se faire sur une branche dédiée, avec un test de stabilité, et une communication à l'équipe pour la phase de re-synchronisation. Ce n'est pas quelque chose à faire en passant.

### Sur la méthode

**Avant de corriger, comprendre**. Mon premier réflexe a été de tenter une correction sans avoir vraiment compris d'où venait le problème. Si j'avais pris 10 minutes de plus pour vérifier l'état de mon main local au tout début, j'aurais évité une grande partie du chemin sinueux qui a suivi.

**Quand quelque chose ne colle pas, s'arrêter et investiguer**. Quand mon premier `git status` a affiché une liste démentielle de fichiers en "new file", j'aurais dû m'arrêter immédiatement au lieu d'essayer de continuer. Le bon réflexe : "ce que je vois est anormal, je ne touche plus à rien tant que je n'ai pas compris".

**Tester les hypothèses, ne pas les supposer**. Mon hypothèse de départ (versions de npm différentes) était plausible mais fausse. Si j'avais directement écrit dans la review "tu n'as pas la même version de npm que moi", j'aurais accusé à tort la personne qui a fait la PR. Vérifier avant d'affirmer.

## Récapitulatif des commandes utiles

| Commande | Ce qu'elle fait |
|---|---|
| `git status` | Affiche l'état actuel de la branche et des fichiers modifiés |
| `git fetch origin` | Récupère les infos du distant sans rien modifier |
| `git log --oneline -10` | Affiche les 10 derniers commits en version condensée |
| `git log origin/main --oneline -10` | Idem pour la branche distante |
| `git checkout main` | Bascule sur la branche main |
| `git reset --hard origin/main` | Réaligne complètement la branche locale sur le distant |
| `git branch -D nom-branche` | Supprime une branche locale (force) |
| `git checkout -b nom-branche` | Crée une nouvelle branche et s'y déplace |
| `git push -u origin nom-branche` | Pousse la branche et la lie au distant |
| `rm -rf dossier` | Supprime un dossier et tout son contenu, sans confirmation |
| `cp source destination` | Copie un fichier |
| `diff fichier1 fichier2` | Compare deux fichiers, sortie vide si identiques |
| `npm install` | Installe les dépendances et met à jour le lock |

## Conclusion

Ce qui ressemblait au départ à une simple anomalie dans une PR s'est révélé être un symptôme d'un problème plus profond, et m'a amené à devoir réparer mon propre environnement git en cours de route. Le résultat final est positif : les locks sont stables, j'ai une PR propre à proposer, et j'ai gagné une compréhension beaucoup plus solide de plusieurs commandes git que j'utilisais sans vraiment savoir ce qu'elles faisaient.

La prochaine fois qu'un diff bizarre apparaît dans une PR, je saurai que la cause peut tout aussi bien être dans la PR elle-même que dans la base sur laquelle elle a été créée. Et avant de toucher quoi que ce soit, je commencerai par vérifier l'état de mon propre dépôt local.
