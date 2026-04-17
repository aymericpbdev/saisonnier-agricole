import AnnonceCard from '../AnnonceCard/AnnonceCard'
import Badge from '../../ui/Badge/Badge'
import type { CropType, JobListingStatus, PaymentType } from '../../../types'


import './AnnonceCardSaison.css'

// TYPES
type AnnonceCardSaisonProps = {
  titre: string
  cropType: CropType
  ville: string
  departement: string
  dateDebut: string
  dateFin: string
  hebergement: boolean
  payAmount: number
  paymentType: PaymentType
  postesRestants: number
  postesTotal: number
  statut: JobListingStatus
  imgUrl?: string
  onClick?: () => void
}

// Labels français pour les types de paiement
const PAYMENT_LABELS: Record<PaymentType, string> = {
  Hourly: '/h',
  Weekly: '/sem',
  Monthly: '/mois',
}

// COMPOSANT
function AnnonceCardSaison({
  titre,
  cropType,
  ville,
  departement,
  dateDebut,
  dateFin,
  hebergement,
  payAmount,
  paymentType,
  postesRestants,
  postesTotal,
  statut,
  imgUrl,
  onClick,
}: AnnonceCardSaisonProps) {
  return (
    <AnnonceCard
      typeCulture={cropType}
      imgUrl={imgUrl}
      onClick={onClick}
    >
      {/* En-tête : titre + badge */}
      <div className="annonce-saison__header">
        <div>
          <h3 className="annonce-saison__title">{titre}</h3>
          <p className="annonce-saison__subtitle">
            {ville}, {departement}
          </p>
        </div>
        <Badge variant={statut} />
      </div>

      {/* Méta : dates + hébergement */}
      <div className="annonce-saison__meta">
        <span className="annonce-saison__meta-item">
          <svg className="annonce-saison__icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          {dateDebut} → {dateFin}
        </span>
        <span className="annonce-saison__meta-item">
          <svg className="annonce-saison__icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          {hebergement ? 'Hébergement' : 'Pas d\'hébergement'}
        </span>
      </div>

      {/* Footer : rémunération + postes */}
      <div className="annonce-saison__footer">
        <span className="annonce-saison__reward">
          {payAmount} €{PAYMENT_LABELS[paymentType]}
        </span>
        <span className="annonce-saison__postes">
          <strong>{postesRestants}</strong> postes restants sur {postesTotal}
        </span>
      </div>
    </AnnonceCard>
  )
}

export default AnnonceCardSaison