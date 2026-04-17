
import AnnonceCard from '../AnnonceCard/AnnonceCard'
import type { TypeCulture } from '../../../utils/cultureImages'

import './AnnonceCardSaison.css'

// TYPES 
type AnnonceCardSaisonProps = {
  // Infos de l'annonce
  titre: string
  typeCulture: TypeCulture | string
  ville: string
  departement: string
  dateDebut: string
  dateFin: string
  hebergement: boolean
  remuneration: string         // ex: "12 €/h", "110 €/jour"
  postesRestants: number
  postesTotal: number
  statut: 'active' | 'cloturee'

  // Image custom (optionnel, sinon on prend par type de culture)
  imgUrl?: string

  // Callback au clic
  onClick?: () => void
}

// COMPOSANT
function AnnonceCardSaison({
  titre,
  typeCulture,
  ville,
  departement,
  dateDebut,
  dateFin,
  hebergement,
  remuneration,
  postesRestants,
  postesTotal,
  statut,
  imgUrl,
  onClick,
}: AnnonceCardSaisonProps) {
  return (
    <AnnonceCard
      typeCulture={typeCulture}
      imgUrl={imgUrl}
      onClick={onClick}
    >
      {/* EN-TÊTE : titre + badge */}
      <div className="annonce-saison__header">
        <div>
          <h3 className="annonce-saison__title">{titre}</h3>
          <p className="annonce-saison__subtitle">
            {typeCulture} · {ville}, {departement}
          </p>
        </div>
        <span className={`annonce-saison__badge annonce-saison__badge--${statut}`}>
          {statut === 'active' ? 'Active' : 'Clôturée'}
        </span>
      </div>

      {/* MÉTA : dates + hébergement */}
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

      {/* FOOTER : rémunération + postes */}
      <div className="annonce-saison__footer">
        <span className="annonce-saison__reward">{remuneration}</span>
        <span className="annonce-saison__postes">
          <strong>{postesRestants}</strong> postes restants sur {postesTotal}
        </span>
      </div>
    </AnnonceCard>
  )
}

export default AnnonceCardSaison