// TYPES USER 
// Correspond aux modèles Prisma : User, Farmer, SeasonalWorker
// Le passwordHash n'est jamais renvoyé par l'API, il est exclu volontairement

// ISO 8601 => un format universel pour écrire les dates et heures "2026-06-15T08:30:00Z" au lieu de  "15/06/2026" (format français) ou "06/15/2026" (format americain) 

// Structure des relations :
// User- Farmer Farm[] (un user agriculteur possede un Farmer qui gere plusieurs Farm)
// User- SeasonalWorker (un user saisonnier possede un profil SeasonalWorker)

// import type obligatoire : jobListing et application se referencent mutuellement sans `import type`, le bundler entre dans une boucle : jobListing charge - application qui recharge jobListing... crash au runtime.
import type { Role, Skill } from './Enums'
import type { Farm } from './Farm'
import type { Application } from './application'

// USER DE BASE 
// Champs communs à tous les utilisateurs (agriculteur et saisonnier)
interface User {
  id: string
  email: string
  role: Role
  firstName: string
  lastName: string
  phoneNumber?: string | null

  // Relations optionnelles — incluses selon la réponse API
  farmer?: Farmer | null
  seasonalWorker?: SeasonalWorker | null

  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

// FARMER (profil agriculteur) 
// Relation 1-à-1 avec User
// Relation 1-à-N avec Farm (préparation multi-exploitation post-MVP)
interface Farmer {
  id: string
  userId: string

  // Relations optionnelles incluses selon la réponse API
  user?: User
  farms?: Farm[]

  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

// SEASONAL WORKER (profil saisonnier)
// Relation 1-à-1 avec User, porte les candidatures
interface SeasonalWorker {
  id: string
  userId: string
  city?: string | null
  postalCode?: string | null
  departement?: string | null
  skills: Skill[]
  availabilityStart?: string | null // ISO 8601
  availabilityEnd?: string | null   // ISO 8601

  // Relations optionnelles incluses selon la réponse API
  user?: User
  applications?: Application[]

  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

export type { User, Farmer, SeasonalWorker }