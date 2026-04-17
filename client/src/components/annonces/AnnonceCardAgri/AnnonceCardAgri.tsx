import AnnonceCard from '../AnnonceCard/AnnonceCard'
import type { TypeCulture } from '../../../utils/cultureImages'

import './AnnonceCardAgri.css'

type AnnonceCardAgriProps = {
  titre: string
  typeCulture: TypeCulture | string
  dateDebut: string
  dateFin: string
  postesTotal: number
  postesPourvus: number
  statut: 'active' | 'brouillon' | 'cloturee'
  candidaturesTotal: number
  candidaturesEnAttente?: number

  imgUrl?: string
  onClick?: () => void
}

// ===== COMPOSANT =====
function AnnonceCardAgri({
  titre,
  typeCulture,
  dateDebut,
  dateFin,
  postesTotal,
  postesPourvus,
  statut,
  candidaturesTotal,
  candidaturesEnAttente = 0,
  imgUrl,
  onClick,
}: AnnonceCardAgriProps) {
  // Label du badge selon le statut
  const statutLabels = {
    active: 'Active',
    brouillon: 'Brouillon',
    cloturee: 'Clôturée',
  }

  return (
    <AnnonceCard
      typeCulture={typeCulture}
      imgUrl={imgUrl}
      onClick={onClick}
    >
      {/* ===== LAYOUT EN DEUX COLONNES ===== */}
      <div className="annonce-agri__layout">

        {/* Colonne gauche : infos de l'annonce */}
        <div className="annonce-agri__left">
          <h3 className="annonce-agri__title">{titre}</h3>
          <p className="annonce-agri__dates">
            {dateDebut} → {dateFin} · {postesTotal} postes ({postesPourvus} pourvu{postesPourvus > 1 ? 's' : ''})
          </p>
          <div className="annonce-agri__badge-row">
            <span className={`annonce-saison__badge annonce-saison__badge--${statut}`}>
              {statutLabels[statut]}
            </span>
            {candidaturesEnAttente > 0 && (
              <span className="annonce-agri__pending">
                {candidaturesEnAttente} en attente
              </span>
            )}
          </div>
        </div>

        {/* Colonne droite : compteur de candidatures */}
        <div className="annonce-agri__right">
          <div className="annonce-agri__count">{candidaturesTotal}</div>
          <div className="annonce-agri__count-label">candidature{candidaturesTotal > 1 ? 's' : ''}</div>
        </div>

      </div>
    </AnnonceCard>
  )
}

export default AnnonceCardAgri