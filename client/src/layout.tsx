import './layout.css'

function Layout() {
  return (
    <div className="layout">
      {/* HEADER / NAVBAR */}
      <header className="header">
        <nav className="navbar">
          {/* Logo */}
          <div className="navbar__logo"></div>

          {/* Liens de navigation */}
          <div className="navbar__links">
            {/*  à remplacer par link quand react rooter  */}
            <a href="/" className="navbar__link">Accueil</a>
            <a href="/annonces" className="navbar__link">Annonces</a>
          </div>

          {/* Boutons auth */}
          <div className="navbar__auth">
            <a href="/connexion" className="navbar__btn navbar__btn--connexion">Connexion</a>
            <a href="/inscription" className="navbar__btn navbar__btn--inscription">Inscription</a>
          </div>
        </nav>
      </header>

      {/*CONTENU PRINCIPAL*/}
      <main className="main">
        <p>Contenu de la page</p>
      </main>

      {/*FOOTER */}
      <footer className="footer">
        {/* ligne orange deco*/}
        <div className="footer__accent-line"></div>

        <div className="footer__content">
          {/* Colonne gauche : logo + baseline + description + réseaux */}
          <div className="footer__brand">
            <div className="footer__brand-logo">
              {/* logo */}
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

            {/* Réseaux sociaux */}
            <div className="footer__socials">
              {/* mettre vrai reseaux */}
              <a href="#" className="footer__social-icon" aria-label="Facebook">f</a>
              <a href="#" className="footer__social-icon" aria-label="LinkedIn">in</a>
              <a href="#" className="footer__social-icon" aria-label="Instagram">ig</a>
              <a href="#" className="footer__social-icon" aria-label="X">X</a>
            </div>
          </div>

          {/* Colonne droite : liens légaux */}
          <div className="footer__info">
            <h4 className="footer__info-title">Informations</h4>
            <nav className="footer__info-links">
              {/* à remplacer par link quand react rooter */}
              <a href="/mentions-legales">Mentions légales</a>
              <a href="/cgu">CGU</a>
              <a href="/confidentialite">Politique de confidentialité</a>
              <a href="/faq">FAQ</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </div>

        {/* Séparateur + copyright */}
        <div className="footer__bottom">
          <p>© 2026 Labor — Tous droits réservés</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout