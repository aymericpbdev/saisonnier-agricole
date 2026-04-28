import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import './LinkText.css'

// TYPES
type LinkTextProps = {
  // Destination du lien (route interne)
  to: string
  children: ReactNode
  // Lien externe (ouvre dans un nouvel onglet)
  external?: boolean
  className?: string
}

// COMPOSANT
function LinkText({
  to,
  children,
  external = false,
  className = '',
}: LinkTextProps) {
  const classes = ['link-text', className].filter(Boolean).join(' ')

  // Lien externe : balise <a> classique avec target="_blank"
  if (external) {
    return (
      <a
        href={to}
        className={classes}
        target="_blank"  // ouverture dans un nouvel onglet 
        rel="noopener noreferrer" // empeche le si externe de pouvoir simuler un retour vers notre site + ne partage pas d'info avec le site externe
      >
        {children}
      </a>
    )
  }

  // Lien interne : composant <Link> de react-router
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  )
}

export default LinkText