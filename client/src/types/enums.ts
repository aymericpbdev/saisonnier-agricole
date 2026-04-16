// ENUMS PARTAGÉS 
// Alignés avec le schéma Prisma (server/prisma/schema.prisma)

// On utilise des objets `as const` au lieu de `enum` TypeScript car le projet a `erasableSyntaxOnly` activé (config Vite/ESBuild)

// Note sur les préfixes Skill_ et Crop_ :
// Certaines valeurs (Livestock, MarketGardening) existent à la fois dans Skill et CropType. Les préfixes permettent de distinguer au runtime si la valeur renvoyée correspond à une compétence ou à une culture( ajouté a tous pour uniformité).

export const Role = {
  Farmer: 'Farmer',
  SeasonalWorker: 'SeasonalWorker',
} as const

export type Role = (typeof Role)[keyof typeof Role]

export const JobListingStatus = {
  Draft: 'Draft',
  Active: 'Active',
  Closed: 'Closed',
} as const

export type JobListingStatus = (typeof JobListingStatus)[keyof typeof JobListingStatus]

export const ApplicationStatus = {
  Pending: 'Pending',
  UnderReview: 'UnderReview',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
} as const

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]

export const Skill = {
  Harvesting: 'Skill_Harvesting',
  Planting: 'Skill_Planting',
  Viticulture: 'Skill_Viticulture',
  Livestock: 'Skill_Livestock',
  MachineOperation: 'Skill_MachineOperation',
  Milking: 'Skill_Milking',
  Arboriculture: 'Skill_Arboriculture',
  MarketGardening: 'Skill_MarketGardening',
} as const

export type Skill = (typeof Skill)[keyof typeof Skill]

export const CropType = {
  Cereals: 'Crop_Cereals',
  Fruits: 'Crop_Fruits',
  Vegetables: 'Crop_Vegetables',
  Vineyard: 'Crop_Vineyard',
  OliveTrees: 'Crop_OliveTrees',
  Horticulture: 'Crop_Horticulture',
  Livestock: 'Crop_Livestock',
  MarketGardening: 'Crop_MarketGardening',
  FieldCrops: 'Crop_FieldCrops',
} as const

export type CropType = (typeof CropType)[keyof typeof CropType]

export const PaymentType = {
  Hourly: 'Hourly',
  Weekly: 'Weekly',
  Monthly: 'Monthly',
} as const

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType]

export const WorkSchedule = {
  FullTime: 'FullTime',
  PartTime: 'PartTime',
  Day: 'Day',
  Night: 'Night',
  Weekend: 'Weekend',
  Flexible: 'Flexible',
} as const

export type WorkSchedule = (typeof WorkSchedule)[keyof typeof WorkSchedule]