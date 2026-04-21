// TYPE APPLICATION (candidature) 
// Correspond au modele Prisma : Application
// Lie un SeasonalWorker a une JobListing
// Contrainte Prisma : un saisonnier ne peut candidater qu'une fois par annonce (@@unique)

// ISO 8601 => un format universel pour écrire les dates et heures "2026-06-15T08:30:00Z" au lieu de  "15/06/2026" (format français) ou "06/15/2026" (format americain) 

// import type obligatoire : jobListing et application se referencent mutuellement sans `import type`, le bundler entre dans une boucle : jobListing charge - application qui recharge jobListing... crash au runtime.
import type { JobListing } from './Joblisting'
import type { SeasonalWorker } from './User'
import type { ApplicationStatus } from './Enums'

interface Application {
  id: string
  jobListingId: string
  seasonalWorkerId: string

  // Contenu
  coverLetter: string
  status: ApplicationStatus

  // Relations optionnelles — incluses selon la réponse API
  jobListing?: JobListing
  seasonalWorker?: SeasonalWorker

  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

export type { Application }