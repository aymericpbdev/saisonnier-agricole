import type { Skill } from '../../../types'

import './Tag.css'

// TYPES
type TagProps = {
  // La valeur Skill associée au tag
  value: Skill
  // Le label affiché, si non fourni, on utilise un label par défaut
  label?: string
  // Tag sélectionné ou non
  selected?: boolean
  // Mode lecture seule (détail annonce) masque le check, pas de hover
  displayOnly?: boolean
  // Callback au clic (non appelé si displayOnly)
  onClick?: (value: Skill) => void
  className?: string
}

// Labels français pour chaque Skill
const SKILL_LABELS: Record<Skill, string> = {
  Skill_Harvesting: 'Vendange',
  Skill_Planting: 'Plantation',
  Skill_Viticulture: 'Viticulture',
  Skill_Livestock: 'Élevage',
  Skill_MachineOperation: 'Conduite d\'engins',
  Skill_Milking: 'Traite',
  Skill_Arboriculture: 'Arboriculture',
  Skill_MarketGardening: 'Maraîchage',
}

// COMPOSANT
function Tag({
  value,
  label,
  selected = false,
  displayOnly = false,
  onClick,
  className = '',
}: TagProps) {
  const classes = [
    'tag',
    selected ? 'tag--selected' : '',
    displayOnly ? 'tag--display' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  function handleClick() {
    if (!displayOnly && onClick) {
      onClick(value)
    }
  }

  // En display-only on utilise un <span>, sinon un <button>
  if (displayOnly) {
    return (
      <span className={classes}>
        {label || SKILL_LABELS[value]}
      </span>
    )
  }

  return (
    <button type="button" className={classes} onClick={handleClick}>
      <span className="tag__check">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
        >
          <path d="M2 5l2 2 4-4" />
        </svg>
      </span>
      {label || SKILL_LABELS[value]}
    </button>
  )
}

export default Tag