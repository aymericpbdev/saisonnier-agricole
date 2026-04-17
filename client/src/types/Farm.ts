// TYPE FARM (exploitation)
// Correspond au modele Prisma : Farm
// Relation N-1 avec Farmer (un agriculteur peut avoir plusieurs exploitations, post mvp mais prevu mtn)
// Porte les annonces (JobListing)

// import type obligatoire : jobListing et application se referencent mutuellement sans `import type`, le bundler entre dans une boucle : jobListing charge - application qui recharge jobListing... crash au runtime.
import type { Farmer } from './User'
import type { JobListing } from './Joblisting'

interface Farm {
  id: string
  farmerId: string

  farmName: string
  siret: string
  city?: string | null
  postalCode?: string | null
  departement?: string | null 
  proPhoneNumber?: string | null

  // Relations optionnelles — incluses selon la réponse API
  farmer?: Farmer
  jobListings?: JobListing[]

  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

export type { Farm }