//  TYPE JOB LISTING (annonce) 
// Correspond au modele Prisma : JobListing
// Publiee par une Farm (exploitation)

// ISO 8601 => un format universel pour écrire les dates et heures "2026-06-15T08:30:00Z" au lieu de  "15/06/2026" (format français) ou "06/15/2026" (format americain) 

// import type obligatoire : jobListing et application se referencent mutuellement sans `import type`, le bundler entre dans une boucle : jobListing charge - application qui recharge jobListing... crash au runtime.
import type { Application } from './application'
import type { Farm } from './Farm'
import type {
  JobListingStatus,
  Skill,
  CropType,
  PaymentType,
  WorkSchedule,
} from './Enums'

interface JobListing {
  id: string
  farmId: string

  // Contenu
  jobTitle: string
  description: string
  status: JobListingStatus

  // Poste
  numberOfPositions: number
  skills: Skill[]
  cropType: CropType
  workSchedule: WorkSchedule

  // Conditions
  // Le back force la conversion Decimal -> number avant envoi
  payAmount: number
  paymentType: PaymentType
  housingProvided: boolean

  // Periode
  startDate: string // ISO 8601
  endDate: string   // ISO 8601

  // Localisation (indépendante de la Farm, mais pre-remplie depuis celle-ci)
  city: string
  postalCode?: string | null
  departement: string // subdivision administrative francaise

  // Relations optionnelles — incluses selon la réponse API
  farm?: Farm
  applications?: Application[]

  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

export type { JobListing }