# Schéma Prisma — notes

Ce document accompagne `server/prisma/schema.prisma`. Il sert à retrouver le vocabulaire métier français dans le code anglais et à expliquer quelques choix qui pourraient surprendre.

## Glossaire FR → EN

### Modèles

| Français | Anglais |
|---|---|
| Agriculteur | `Farmer` |
| Saisonnier | `SeasonalWorker` |
| Exploitation | `Farm` |
| Annonce | `JobListing` |
| Candidature | `Application` |

### Enums

| Français | Anglais |
|---|---|
| `Role.Agriculteur` | `Role.Farmer` |
| `Role.Saisonnier` | `Role.SeasonalWorker` |
| `StatutAnnonce` | `JobListingStatus` |
| `Brouillon` / `Active` / `Cloturee` | `Draft` / `Active` / `Closed` |
| `StatutCandidature` | `ApplicationStatus` |
| `EnAttente` / `EnCoursEvaluation` / `Acceptee` / `Refusee` | `Pending` / `UnderReview` / `Accepted` / `Rejected` |
| `Competences` | `Skill` |
| `Recolte` / `Plantation` / `Viticulture` / `Elevage` | `Harvesting` / `Planting` / `Viticulture` / `Livestock` |
| `ConduiteEngins` / `Traite` / `Arboriculture` / `Maraichage` | `MachineOperation` / `Milking` / `Arboriculture` / `MarketGardening` |
| `TypeCulture` | `CropType` |
| `Cereales` / `Fruits` / `Legumes` / `Vigne` / `Oliviers` | `Cereals` / `Fruits` / `Vegetables` / `Vineyard` / `OliveTrees` |
| `Horticulture` / `Elevage` / `Maraichage` / `GrandesCultures` | `Horticulture` / `Livestock` / `MarketGardening` / `FieldCrops` |
| `TypeRemuneration` | `PaymentType` |
| `ParHeure` / `ParSemaine` / `ParMois` | `Hourly` / `Weekly` / `Monthly` |
| `TypeHoraire` | `WorkSchedule` |
| `TempsPlein` / `TempsPartiel` / `Journee` / `Nuit` / `WeekEnd` / `Flexible` | `FullTime` / `PartTime` / `Day` / `Night` / `Weekend` / `Flexible` |

### Champs principaux

| Français | Anglais |
|---|---|
| `prenom` / `nom` | `firstName` / `lastName` |
| `telephone` | `phoneNumber` |
| `telephonePro` | `proPhoneNumber` |
| `password` | `passwordHash` |
| `nomExploitation` | `farmName` |
| `ville` | `city` |
| `codePostal` | `postalCode` |
| `departement` | `departement` (inchangé, voir plus bas) |
| `titre` | `jobTitle` |
| `nombreDePostes` | `numberOfPositions` |
| `competences` | `skills` |
| `typeCulture` | `cropType` |
| `typeHoraire` | `workSchedule` |
| `remuneration` | `payAmount` |
| `typeRemuneration` | `paymentType` |
| `hebergement` | `housingProvided` |
| `dateDebut` / `dateFin` | `startDate` / `endDate` |
| `disponibiliteDebut` / `disponibiliteFin` | `availabilityStart` / `availabilityEnd` |
| `messageMotivation` | `coverLetter` |
| `statut` | `status` |
| `annonces` | `jobListings` |
| `candidatures` | `applications` |

## Q/R sur les choix non évidents

### Pourquoi `departement` est resté en français ?

Aucun mot anglais ne désigne correctement le département français. `county` évoque les comtés US/UK qui n'ont ni la même taille ni le même rôle, `region` est déjà pris (les régions françaises sont au-dessus des départements), `state` n'a pas de sens en France. On garde donc le mot français, sans accent, avec un commentaire de doc Prisma (`///`) pour expliciter.

### Pourquoi un modèle `Farmer` qui ne porte aucun champ propre ?

Parce qu'un agriculteur (la personne) et une exploitation (l'entité juridique avec SIRET) sont deux choses différentes. `User` porte la personne, `Farm` porte l'entité, et `Farmer` matérialise le rôle qui les lie. Toutes les infos restent à leur bonne place : pas de duplication, pas de mélange.

C'est aussi ce qui rend possible le 1-N entre `Farmer` et `Farm` (voir question suivante).

### Pourquoi pas de modèle équivalent côté saisonnier ?

Asymétrie volontaire et justifiée : un saisonnier n'a pas d'entité juridique sous-jacente. Il n'y a rien à séparer entre "la personne" et "autre chose". `SeasonalWorker` rattaché directement à `User` suffit.

### Pourquoi la relation `Farmer` → `Farm` est en 1-N alors que le MVP n'utilise qu'une exploitation par agriculteur ?

Anticipation. La fonctionnalité "multi-exploitation" est dans le post-MVP. Le coût de préparer le 1-N maintenant (juste ne pas mettre `@unique` sur `farmerId` dans `Farm`) est nul, alors que le coût de migrer plus tard serait élevé : il faudrait chasser tous les endroits du code qui assument `farmer.farm` (singulier) et les passer en `farmer.farms` (pluriel).

En MVP, on crée une seule `Farm` par défaut au signup, et on masque toute notion de choix d'exploitation côté front. Le modèle est prêt, l'UI ne l'expose pas encore.