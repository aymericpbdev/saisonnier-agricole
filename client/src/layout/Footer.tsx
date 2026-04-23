
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      {/* Ligne orange en haut du footer */}
      <div className="footer__accent-line"></div>

      {/* Contenu principal, deux colonnes : marque à gauche, liens à droite */}
      <div className="footer__content">

        {/* Colonne gauche : logo + baseline + description + réseaux sociaux */}
        <div className="footer__brand">
          <div className="footer__brand-logo">
            {/* TODO: remplacer par le vrai composant logo quand il sera prêt */}
            <span className="footer__brand-name">LABOR</span>
          </div>

          <p className="footer__baseline">
            <span className="footer__baseline--trouver">Trouver.</span>{' '}
            <span className="footer__baseline--travailler">Travailler.</span>{' '}
            <span className="footer__baseline--recolter">Récolter.</span>
          </p>

          <p className="footer__description">
            La plateforme qui connecte agriculteurs et travailleurs saisonniers.
          </p>

          {/* Réseaux sociaux TODO: remplacer par de vraies icônes + vrais liens */}
          <div className="footer__socials">
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
            {/* TODO: remplacer par des <Link> quand react-router sera installé */}
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
  )
}

export default Footer