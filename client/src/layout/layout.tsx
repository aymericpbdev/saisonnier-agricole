import '../styles/layout.css'
import logo from '../assets/labor-logo-gradient.svg'

// remplacer par le vrai système d'auth plus tard
type UserRole = 'public' | 'agriculteur' | 'saisonnier'
const userRole: UserRole = 'agriculteur' // teste

function Layout() {
  return (
    <div className="layout">
     {/* HEADER / NAVBAR */}
      <header className="header">
        <nav className="navbar">
          {/* Logo */}
          <div className="navbar__logo">
            <img src={logo} alt="Labor" className="navbar__logo-img" />
          </div>

          {/* Version public */}
          {userRole === 'public' ? (
            <>
              <div className="navbar__links">
                <a href="/" className="navbar__link">Accueil</a>
                <a href="/annonces" className="navbar__link">Annonces</a>
              </div>
              <div className="navbar__auth">
                <a href="/connexion" className="navbar__btn navbar__btn--connexion">Connexion</a>
                <a href="/inscription" className="navbar__btn navbar__btn--inscription">Inscription</a>
              </div>
            </>
          ) : (
            <>
              {/* Version agri/saiso */}
              <div className="navbar__links navbar__links--connected">
                <a href="/" className="navbar__link-icon" aria-label="Accueil">⌂</a>
                {userRole === 'agriculteur' && (
                  <>
                    <a href="/mes-annonces" className="navbar__link">Mes annonces</a>
                    <a href="/creer-annonce" className="navbar__link">Créer une annonce</a>
                  </>
                )}
                {userRole === 'saisonnier' && (
                  <>
                    <a href="/annonces" className="navbar__link">Annonces</a>
                    <a href="/mes-candidatures" className="navbar__link">Mes candidatures</a>
                  </>
                )}
                {/* profil */}
                <div className="navbar__profile">
                  <button className="navbar__profile-btn" onClick={() => {/* dropdown on click a modifier*/}}>
                    <span className="navbar__profile-name">Jean Agri.</span>
                    <span className="navbar__profile-icon">👤</span>
                  </button>
                  {/* Dropdown */}
                  <div className="navbar__dropdown">
                    <a href="/profil" className="navbar__dropdown-item">Mon profil</a>
                    <a href="/parametres" className="navbar__dropdown-item">Paramètre</a>
                    <a href="/deconnexion" className="navbar__dropdown-item navbar__dropdown-item--logout">Déconnexion</a>
                  </div>
                </div>
              </div>
            </>
          )}
        </nav>
        <div className="header__accent-line"></div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="main">
        <p>Contenu de la page</p>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__accent-line"></div>
        <div className="footer__content">
          <div className="footer__brand">
            <div className="footer__brand-logo">
            <div className="navbar__logo">
                <img src={logo} alt="Labor" className="navbar__logo-img" />
            </div>
              <span className="footer__brand-name">LABOR</span>
            </div>
            <p className="footer__baseline">
              <span className="footer__baseline-trouver">Trouver.</span>{' '}
              <span className="footer__baseline-travailler">Travailler.</span>{' '}
              <span className="footer__baseline-recolter">Récolter.</span>
            </p>
            <p className="footer__description">
              La plateforme qui connecte agriculteurs et travailleurs saisonniers.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-icon" aria-label="Facebook">f</a>
              <a href="#" className="footer__social-icon" aria-label="LinkedIn">in</a>
              <a href="#" className="footer__social-icon" aria-label="Instagram">ig</a>
              <a href="#" className="footer__social-icon" aria-label="X">X</a>
            </div>
          </div>
          <div className="footer__info">
            <h4 className="footer__info-title">Informations</h4>
            <nav className="footer__info-links">
              <a href="/mentions-legales">Mentions légales</a>
              <a href="/cgu">CGU</a>
              <a href="/confidentialite">Politique de confidentialité</a>
              <a href="/faq">FAQ</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 Labor — Tous droits réservés</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout