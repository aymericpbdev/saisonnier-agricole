# Conventions de développement front — Labor

> Ce document définit les règles de développement à suivre dans le dossier `client/` du projet Labor. Il s'applique uniquement au front. Les conventions Git et back sont documentées ailleurs.
>
> Toute exception à ces règles doit être discutée en équipe et documentée dans le code via un commentaire.

---

## 1. Nommage

### Fichiers

| Type de fichier | Convention | Exemple |
|-----------------|------------|---------|
| Composants React | `PascalCase.tsx` | `Button.tsx`, `AnnonceCard.tsx` |
| Hooks personnalisés | `camelCase.ts` avec préfixe `use` | `useAuth.ts`, `useAnnonces.ts` |
| Types TypeScript | `camelCase.ts` | `user.ts`, `annonce.ts` |
| Services (appels API) | `camelCase.ts` avec suffixe `Service` | `authService.ts`, `annonceService.ts` |
| Utilitaires | `camelCase.ts` | `formatDate.ts`, `validateSiret.ts` |
| Contexts React | `PascalCase.tsx` avec suffixe `Context` | `AuthContext.tsx` |

### Dossiers

Tous les dossiers sont en **camelCase au pluriel** (sauf cas évident comme `ui`).

```
components/
hooks/
services/
layouts/
pages/
```

### CSS

- Variables CSS en kebab-case avec préfixe `--labor-` :
  ```css
  --labor-color-primary
  --labor-spacing-md
  --labor-font-size-lg
  ```
- Classes en BEM (`block__element--modifier`) :
  ```css
  .annonce-card
  .annonce-card__title
  .annonce-card__title--highlighted
  ```

---

## 2. Structure d'un composant

### Ordre des sections dans un fichier `.tsx`

```tsx
// 1. Imports externes (React, librairies)
import { useState } from 'react'

// 2. Imports internes (services, hooks, types, autres composants)
import Button from '../ui/Button'
import { Annonce } from '../../types/annonce'

// 3. Imports CSS
import './AnnonceCard.css'

// 4. Types des props
type AnnonceCardProps = {
  annonce: Annonce
  onClick?: () => void
}

// 5. Le composant
function AnnonceCard({ annonce, onClick }: AnnonceCardProps) {
  // logique du composant
  return (
    <div className="annonce-card">
      {/* JSX */}
    </div>
  )
}

// 6. Export
export default AnnonceCard
```

### Règles

- **Un fichier CSS par composant**, placé à côté du `.tsx` (`Button.tsx` + `Button.css`)
- **Export par défaut** pour les composants React
- **Export nommé** pour le reste : hooks, utils, types, services
- **`function MonComposant() { }`** plutôt que `const MonComposant = () => { }` (plus lisible, meilleures stack traces)
- **Une seule responsabilité par composant** : si un composant fait plus de 200 lignes, il faut le découper

---

## 3. TypeScript

### Règles strictes

- **Strict mode activé** dans `tsconfig.json` (déjà le cas par défaut avec Vite)
- **Toujours typer les props** d'un composant, jamais d'implicite
- **Pas de `any`** sauf justification explicite dans un commentaire
- **`unknown` toléré** quand un type est réellement inconnu (réponses API non typées par exemple)

### `type` vs `interface`

- **`type`** pour les props de composants et les unions
  ```ts
  type ButtonProps = {
    label: string
    variant: 'primary' | 'secondary'
  }
  ```
- **`interface`** pour les modèles de données partagés (entités métier)
  ```ts
  interface Annonce {
    id: string
    titre: string
    statut: AnnonceStatus
  }
  ```

### Inférence

L'inférence du type de retour des fonctions est tolérée pour les fonctions courtes. Pas besoin d'écrire `: void` ou `: string` partout si TypeScript le devine seul.

---

## 4. Imports

### Ordre

1. Imports externes (libs comme React, axios, etc.)
2. Imports internes (composants, services, types, hooks du projet)
3. Imports CSS

Une ligne vide entre chaque groupe.

### Exemple

```tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/ui/Button'
import { authService } from '../services/authService'
import type { User } from '../types/user'

import './LoginPage.css'
```

---

## 5. Gestion des données

### Appels API

- **Tous les appels API passent par `services/`**, jamais directement dans un composant
- Chaque service expose des fonctions claires : `getAnnonces()`, `createAnnonce()`, etc.
- Les composants importent et utilisent ces fonctions, mais ne font jamais de `fetch` direct

### Erreurs

- Les erreurs API sont **gérées dans le composant qui appelle**, via try/catch
- Chaque page concernée maintient un état local `error` pour afficher l'erreur à l'utilisateur

### États de chargement

- États locaux dans chaque composant : `loading`, `error`, `data`
- Pas de gestion globale (Redux, Zustand) pour le MVP — on garde simple

### Custom hooks pour la data

- Optionnels pour le MVP
- À introduire uniquement si on observe une vraie répétition (exemple : `useAnnonces()` réutilisé sur 3 pages)

---

## 6. Commentaires

Les commentaires sont une partie importante du code. Ils permettent à n'importe quel membre de l'équipe de comprendre rapidement ce qu'un fichier fait, pourquoi une décision technique a été prise, et où trouver chaque section.

### Langue

**Tous les commentaires sont écrits en français.**

### Deux usages principaux

#### Usage 1 : Structurer le code

Les commentaires servent à découper visuellement les grandes parties d'un fichier. Ils agissent comme des titres de sections et facilitent la navigation dans un composant ou une page.

```tsx
function CreerAnnoncePage() {
  // ===== ÉTATS LOCAUX =====
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')

  // ===== HANDLERS =====
  const handleSubmit = () => {
    // ...
  }

  const handleReset = () => {
    // ...
  }

  // ===== RENDU =====
  return (
    <div>
      {/* En-tête de la page */}
      <h1>Créer une annonce</h1>

      {/* Formulaire principal */}
      <form>
        {/* ... */}
      </form>
    </div>
  )
}
```

#### Usage 2 : Expliquer une spécificité

Les commentaires servent à indiquer une information utile aux autres devs : un choix technique non évident, une astuce, une limitation, un TODO, un piège à éviter.

```tsx
// On force le re-render via une key pour reset le formulaire après envoi
<Form key={resetCount} />

// TODO: brancher sur le vrai service d'auth quand le back sera prêt
const userRole = 'agriculteur'

// Attention : ce calcul doit rester côté client pour des raisons de perf
const filteredAnnonces = annonces.filter(...)
```

### Règles générales

- **Un commentaire doit apporter de la valeur**. Ne pas commenter ce qui est évident à la lecture du code.
  ```tsx
  // ❌ Inutile
  const titre = 'Mon titre' // assignation de la variable titre

  // ✅ Utile
  // Le titre est limité à 80 caractères côté back, on tronque si besoin
  const titre = rawTitre.slice(0, 80)
  ```
- **Préférer la clarté à la brièveté**. Un commentaire long et clair vaut mieux qu'un commentaire court et cryptique.
- **Tenir les commentaires à jour**. Un commentaire faux est pire qu'un code non commenté. Si tu modifies du code, vérifie les commentaires associés.
- **Marquer les TODO et FIXME** explicitement quand quelque chose reste à faire :
  ```tsx
  // TODO: ajouter la pagination quand le back renverra le total
  // FIXME: bug sur Safari iOS avec les dates < 2020
  ```
- **Pas de format imposé** type JSDoc. On reste libre, l'objectif est la lisibilité, pas la conformité à un standard.

---

## 7. Récapitulatif des règles essentielles

À retenir absolument :

- **Toujours typer les props**, jamais d'`any`
- **Un fichier CSS par composant**, à côté du `.tsx`
- **Tous les appels API dans `services/`**, jamais ailleurs
- **PascalCase pour les composants**, camelCase pour le reste
- **BEM pour les classes CSS**, préfixe `--labor-` pour les variables
- **Export par défaut** pour les composants, **export nommé** pour le reste
- **Commentaires en français**, utiles, à jour, et structurants
- **Pas de sur-ingénierie** : on ajoute des outils et abstractions seulement quand on en a vraiment besoin