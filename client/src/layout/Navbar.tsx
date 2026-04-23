import { useState } from 'react'
import { Role } from '../types/enums'

import './Navbar.css'

type NavbarProps = {
  role: Role | null
  userName?: string
}

function Navbar({ role, userName }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // L'utilisateur est connecté si un rôle existe
  const isConnected = role !== null

  return (
    <header className="header">
      <nav className="navbar">
        {/* Logo commun à toutes les variantes */}
        <div className="navbar__logo">
          {/* TODO: remplacer par le vrai composant logo */}
          <span className="navbar__logo-text">LABOR</span>
        </div>

        {/* VERSION PUBLIQUE (non connecté)*/}
        {!isConnected && (
          <>
            {/* Liens de navigation */}
            <div className="navbar__links">
              {/* TODO: remplacer par des <Link> quand le router sera branché aux layouts */}
              <a href="/" className="navbar__link">Accueil</a>
              <a href="/annonces" className="navbar__link">Annonces</a>
            </div>

            {/* Boutons auth dans une pilule */}
            <div className="navbar__auth">
              <a href="/connexion" className="navbar__btn">Connexion</a>
              <a href="/inscription" className="navbar__btn">Inscription</a>
            </div>
          </>
        )}

        {/* VERSION CONNECTÉE (agriculteur ou saisonnier)*/}
        {isConnected && (
          <>
            {/* Liens de navigation dans une pilule */}
            <div className="navbar__links navbar__links--connected">
              <a href="/" className="navbar__link navbar__link--icon" aria-label="Accueil">⌂</a>

              {/* Liens spécifiques agriculteur */}
              {role === Role.Farmer && (
                <>
                  <a href="/mes-annonces" className="navbar__link">Mes annonces</a>
                  <a href="/creer-annonce" className="navbar__link">Créer une annonce</a>
                </>
              )}

              {/* Liens spécifiques saisonnier */}
              {role === Role.SeasonalWorker && (
                <>
                  <a href="/annonces" className="navbar__link">Annonces</a>
                  <a href="/mes-candidatures" className="navbar__link">Mes candidatures</a>
                </>
              )}
            </div>

            {/* Profil avec dropdown */}
            <div className="navbar__profile">
              <button
                className="navbar__profile-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="navbar__profile-name">{userName}</span>
                {/* TODO: remplacer par une vraie icône */}
                <span className="navbar__profile-icon">👤</span>
              </button>

              {/* Menu dropdown affiché/masqué via le state */}
              {dropdownOpen && (
                <div className="navbar__dropdown">
                  <a href="/profil" className="navbar__dropdown-item">Mon profil</a>
                  <a href="/parametres" className="navbar__dropdown-item">Paramètres</a>
                  <button
                    className="navbar__dropdown-item navbar__dropdown-item--logout"
                    onClick={() => {/* TODO: brancher logout via useAuth */}}
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar