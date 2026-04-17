// ===== IMPORTS INTERNES =====
import AnnonceCard from '../AnnonceCard/AnnonceCard'
import Badge from '../../ui/Badge/Badge'
import type { CropType, JobListingStatus } from '../../../types'

// ===== IMPORTS CSS =====
import './AnnonceCardAgri.css'

// ===== TYPES =====
type AnnonceCardAgriProps = {
  titre: string
  cropType: CropType
  dateDebut: string
  dateFin: string
  postesTotal: number
  postesPourvus: number
  statut: JobListingStatus
  candidaturesTotal: number
  candidaturesEnAttente?: number
  imgUrl?: string
  onClick?: () => void
}

// ===== COMPOSANT =====
function AnnonceCardAgri({
  titre,
  cropType,
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
  return (
    <AnnonceCard
      typeCulture={cropType}
      imgUrl={imgUrl}
      onClick={onClick}
    >
      <div className="annonce-agri__layout">

        {/* Gauche : infos */}
        <div className="annonce-agri__left">
          <h3 className="annonce-agri__title">{titre}</h3>
          <p className="annonce-agri__dates">
            {dateDebut} → {dateFin} · {postesTotal} postes ({postesPourvus} pourvu{postesPourvus > 1 ? 's' : ''})
          </p>
          <div className="annonce-agri__badge-row">
            <Badge variant={statut} />
            {candidaturesEnAttente > 0 && (
              <Badge
                variant="Pending"
                label={`${candidaturesEnAttente} en attente`}
                size="s"
              />
            )}
          </div>
        </div>

        {/* Droite : compteur */}
        <div className="annonce-agri__right">
          <div className="annonce-agri__count">{candidaturesTotal}</div>
          <div className="annonce-agri__count-label">
            candidature{candidaturesTotal > 1 ? 's' : ''}
          </div>
        </div>

      </div>
    </AnnonceCard>
  )
}

export default AnnonceCardAgri