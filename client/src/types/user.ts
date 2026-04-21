export const Role = {
  Farmer: 'Farmer',
  SeasonalWorker: 'SeasonalWorker',
  Admin: 'Admin',
} as const
export type Role = (typeof Role)[keyof typeof Role]

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}