import type { JobListingStatus, ApplicationStatus } from '../../../types'

import './Badge.css'

// TYPES 
type BadgeVariant = JobListingStatus | ApplicationStatus
type BadgeSize = 's' | 'm' | 'l'

type BadgeProps = {
  variant: BadgeVariant
  label?: string
  size?: BadgeSize
  className?: string
}

// Labels par défaut en français pour chaque variante
const DEFAULT_LABELS: Record<BadgeVariant, string> = {
  // JobListingStatus
  Active: 'Active',
  Draft: 'Brouillon',
  Closed: 'Clôturée',
  // ApplicationStatus
  Pending: 'En attente',
  UnderReview: 'En évaluation',
  Accepted: 'Acceptée',
  Rejected: 'Refusée',
}

// COMPOSANT 
function Badge({ variant, label, size = 'm', className = '' }: BadgeProps) {
  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes}>
      {label || DEFAULT_LABELS[variant]}
    </span>
  )
}

export default Badge