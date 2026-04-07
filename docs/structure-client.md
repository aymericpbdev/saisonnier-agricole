# Structure du dossier `client/src/` — Labor

> **Stack** : React · TypeScript · Vite · (Ionic prévu post-MVP)
>
> **Dernière mise à jour** : Avril 2026

Ce document décrit l'organisation du dossier client/src/ du projet Labor. Il sert de référence pour l'équipe front afin de savoir où placer chaque fichier et pourquoi chaque dossier existe. L'objectif est de maintenir une structure cohérente à mesure que le projet grandit.

---

## Arborescence

```
client/src/
│
├── assets/                     # Fichiers statiques importés dans le code
│
├── components/                 # Composants React réutilisables
│   ├── ui/                     # Composants génériques (Button, Input, Badge, Modal…)
│   ├── annonce/                # Composants liés au domaine "annonce"
│   ├── candidature/            # Composants liés au domaine "candidature"
│   └── profil/                 # Composants liés au domaine "profil"
│
├── layouts/                    # Structures de page (header/navbar + footer)
│
├── pages/                      # Écrans complets de l'application
│   ├── public/                 # Pages accessibles sans connexion
│   ├── agriculteur/            # Espace agriculteur (connecté)
│   └── saisonnier/             # Espace saisonnier (connecté)
│
├── routes/                     # Configuration du routing (react-router-dom)
│
├── services/                   # Appels API vers le backend Express
│
├── hooks/                      # Custom hooks React
│
├── contexts/                   # React Contexts (auth, thème…)
│
├── types/                      # Types TypeScript partagés
│
├── utils/                      # Fonctions utilitaires pures (pas de React)
│
├── styles/                     # CSS global, variables, reset
│
├── App.tsx                     # Composant racine
└── main.tsx                    # Point d'entrée de l'application
```

---

## Détail de chaque dossier

### `assets/`

Contient les images, logos, icônes SVG et autres fichiers statiques **importés dans le code** via `import`.

Ces fichiers passent par le bundler Vite : ils sont optimisés et leur nom est hashé pour le cache navigateur.

> **Différence avec `public/`** : les fichiers dans `public/` (à la racine du projet, hors de `src/`) sont servis tels quels sans traitement. Utiliser `public/` uniquement pour le favicon, `robots.txt` ou les fichiers référencés en dur dans `index.html`.

---

### `components/`

Composants React réutilisables sur plusieurs pages.

- **`ui/`** — Bibliothèque interne de composants génériques : `Button`, `Input`, `Badge`, `Modal`, `Select`, etc. Ces composants n'ont aucune logique métier, ils sont purement visuels.
- **`annonce/`** — Composants liés au domaine annonce : `AnnonceCard`, `AnnonceFilters`, etc.
- **`candidature/`** — Composants liés au domaine candidature : `CandidatureCard`, etc.
- **`profil/`** — Composants liés au domaine profil : `ProfilForm`, etc.

Chaque composant a son fichier CSS à côté de lui (ex : `Button.tsx` + `Button.css`).

> **Convention de nommage** : PascalCase pour les fichiers de composants (`AnnonceCard.tsx`).

---

### `layouts/`

Structures de page qui wrappent le contenu : header/navbar + zone de contenu + footer.

D'après les wireframes, 3 variantes de navigation existent :

- **Public** — navbar avec boutons Connexion / Inscription
- **Agriculteur** — navbar avec Dashboard + nom de l'utilisateur
- **Saisonnier** — navbar avec Dashboard + nom de l'utilisateur (liens différents)

Peut être implémenté comme un seul `Layout.tsx` avec logique conditionnelle (MVP) ou séparé en plusieurs fichiers quand le projet grossit.

---

### `pages/`

Chaque fichier = un écran complet de l'application. Ces composants sont branchés au router dans `routes/`.

#### `pages/public/`

| Page                     | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `LandingPage.tsx`        | Page d'accueil avec CTA agriculteur / saisonnier |
| `LoginPage.tsx`          | Formulaire de connexion                          |
| `ForgotPasswordPage.tsx` | Réinitialisation du mot de passe                 |
| `RegisterAgriPage.tsx`   | Inscription agriculteur                          |
| `RegisterSaisonPage.tsx` | Inscription saisonnier                           |

#### `pages/agriculteur/`

| Page                        | Description                                    |
| --------------------------- | ---------------------------------------------- |
| `ProfilPage.tsx`            | Profil agriculteur (nom, exploitation, SIRET…) |
| `MesAnnoncesPage.tsx`       | Liste des annonces publiées                    |
| `CreerAnnoncePage.tsx`      | Formulaire de création d'annonce               |
| `DetailAnnoncePage.tsx`     | Détail d'une annonce + liste des candidatures  |
| `DetailCandidaturePage.tsx` | Détail d'une candidature reçue                 |

#### `pages/saisonnier/`

| Page                        | Description                             |
| --------------------------- | --------------------------------------- |
| `ProfilPage.tsx`            | Profil saisonnier (compétences, dispo…) |
| `RechercheAnnoncesPage.tsx` | Recherche et filtrage des annonces      |
| `DetailAnnoncePage.tsx`     | Détail d'une annonce + bouton candidater |
| `CandidatureFormPage.tsx`   | Formulaire de candidature               |
| `MesCandidaturesPage.tsx`   | Suivi de ses candidatures               |

> **Pas de routing automatique** : contrairement à Next.js, ces fichiers n'ont aucun pouvoir magique. Chaque page doit être déclarée manuellement dans `routes/`.

---

### `routes/`

Configuration centralisée du routing avec `react-router-dom`.

- **`index.tsx`** — Déclaration de toutes les routes (URL → composant page)
- **`PrivateRoute.tsx`** — Composant wrapper qui protège les routes nécessitant une authentification. Redirige vers `/connexion` si l'utilisateur n'est pas connecté.

---

### `services/`

Couche de communication avec le backend Express. Centralise tous les appels API pour ne pas les éparpiller dans les composants.

| Fichier                  | Responsabilité                          |
| ------------------------ | --------------------------------------- |
| `api.ts`                 | Instance fetch/axios configurée (base URL, headers, interceptors) |
| `authService.ts`         | Login, register, logout, forgot password |
| `annonceService.ts`      | CRUD annonces                           |
| `candidatureService.ts`  | CRUD candidatures                       |
| `profilService.ts`       | Get / update profil                     |

---

### `hooks/`

Custom hooks React pour la logique réutilisable.

Exemples : `useAuth()`, `useAnnonces()`, `useForm()`, etc.

---

### `contexts/`

React Contexts pour l'état global partagé entre composants.

Principalement `AuthContext.tsx` pour gérer :
- L'état connecté / déconnecté
- Le rôle de l'utilisateur (agriculteur vs saisonnier)
- Les infos du profil courant

---

### `types/`

Types et interfaces TypeScript partagés à travers l'application.

| Fichier            | Contenu                                      |
| ------------------ | -------------------------------------------- |
| `user.ts`          | `User`, `Agriculteur`, `Saisonnier`          |
| `annonce.ts`       | `Annonce`, `AnnonceStatus`, `AnnonceFilters` |
| `candidature.ts`   | `Candidature`, `CandidatureStatus`           |

> Ces types doivent rester alignés avec le schéma Prisma côté backend.

---

### `utils/`

Fonctions utilitaires pures, sans aucune dépendance à React.

Exemples : formatage de dates, validation de SIRET, helpers de formatage de prix, etc.

---

### `styles/`

Fichiers CSS globaux.

- **`global.css`** — Reset CSS, import des Google Fonts (Atkinson Hyperlegible + Outfit), variables CSS avec les couleurs de la charte graphique Labor.

Les styles spécifiques à un composant ne vont **pas** ici — ils restent à côté de leur composant.

---

## Rappel des couleurs (charte Labor)

| Nom            | Hex       | Usage                  |
| -------------- | --------- | ---------------------- |
| Charcoal Brown | `#2C2A1E` | Texte, fonds sombres   |
| Fern           | `#5A7A3A` | Accent vert foncé      |
| Sage Green     | `#7A9E50` | Accent vert clair      |
| Golden Orange  | `#F4A226` | CTA, accents           |
| Vanilla Cream  | `#EDE8D0` | Fonds clairs, cartes   |
| Gradient soleil | `#FAD961 → #F76B1C` | Éléments décoratifs |

## Typographie

- **Desktop** : Atkinson Hyperlegible — H1: 26px, H2: 22px, H3: 20px, H4: 18px, body: 16px, small: 14px
- **Mobile** : Outfit — H1: 24px, H2: 20px, H3: 18px, H4: 16px, body: 16px, small: 14px