import type { ReactNode} from 'react'

import { getImageForCulture } from '../../../utils/cultureImages'
import type { TypeCulture } from '../../../utils/cultureImages'

import './AnnonceCard.css'

type AnnonceCardProps = {
    imgUrl?: string 
    typeCulture?: TypeCulture | string | null 
    children: ReactNode
    onClick?: () => void
    className?: string
}

function AnnonceCard({
    imgUrl,
    typeCulture,
    children,
    onClick,
    className = '',
  }: AnnonceCardProps) {
    const backgroundImage = imgUrl || getImageForCulture(typeCulture)

  const classes = [
    'annonce-card',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    //on pourra utiliser ce composant, plus du code en dur dans la page pour les 3, 4 annonce de la landing page qui auront moins d'info (à voir)
    return (
        <article className={classes} onClick={onClick}>
          {/* Zone photo avec fondu vers le contenu */}
          <div
            className="annonce-card__photo"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
    
          {/* Zone contenu — remplie par les enfants (saison ou agri) */}
          <div className="annonce-card__content">
            {children}
          </div>
        </article>
      )
  }

  export default AnnonceCard