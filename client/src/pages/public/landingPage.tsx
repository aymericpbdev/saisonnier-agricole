import "../../styles/landingPage.css";
const landingPage = () => {
    return (
<body>
  
  <nav>
    <div className="nav-logo">
      LABOR
      <span>La plateforme des récoltes</span>
    </div>
    <div className="nav-actions">
      <a href="connexion.html" className="btn-outline">Connexion</a>
      <a href="#" className="btn-solid">Inscription</a>
    </div>
  </nav>
  
  <div className="page-wrapper">
   
    <aside className="sidebar">
      <div className="sidebar-title">Menu</div>

      <div className="sidebar-group">
        <a href="#" className="sidebar-link active">Page d'Accueil</a>
        <a href="connexion.html" className="sidebar-link">Connexion</a>
        <a href="#" className="sidebar-link">Mdp oublié</a>
        <a href="#" className="sidebar-link">Inscription agri</a>
        <a href="#" className="sidebar-link">Inscription saison.</a>
      </div>

      <div className="sidebar-group">
        <div className="sidebar-group-label">Espace Agriculteur</div>
        <a href="#" className="sidebar-link">Mon profil</a>
        <a href="#" className="sidebar-link">Mes annonces</a>
        <a href="#" className="sidebar-link">Créer annonce</a>
        <a href="#" className="sidebar-link">Détail annonce</a>
        <a href="#" className="sidebar-link">Détail candidature</a>
      </div>

      <div className="sidebar-group">
        <div className="sidebar-group-label">Espace Saisonnier</div>
        <a href="#" className="sidebar-link">Mon profil</a>
        <a href="#" className="sidebar-link">Recherche annonces</a>
        <a href="#" className="sidebar-link">Détail annonce</a>
        <a href="#" className="sidebar-link">Formulaire candid.</a>
        <a href="#" className="sidebar-link">Mes candidatures</a>
      </div>
    </aside>
    
    <div className="main-content">
      
      <section className="hero">
        <h1>Trouvez vos saisonniers.<br />Trouvez votre saison.</h1>
        <p>La plateforme qui connecte agriculteurs et travailleurs saisonniers</p>
        <div className="hero-btns">
          <button className="btn-hero btn-hero-dark">Je suis agriculteur</button>
          <button className="btn-hero btn-hero-light">Je suis saisonnier</button>
        </div>
      </section>
      
      <div className="stats">
        <div className="stat-item">
          <strong>124</strong>
          <span>agriculteurs</span>
        </div>
        <div className="stat-item">
          <strong>389</strong>
          <span>saisonniers</span>
        </div>
        <div className="stat-item">
          <strong>67</strong>
          <span>annonces</span>
        </div>
      </div>
            
      <section className="section">
        <h2 className="section-title">Comment ça marche</h2>
        <div className="steps">
          <div className="step-card">
            <div className="step-num">1</div>
            Créez votre profil
          </div>
          <div className="step-card">
            <div className="step-num">2</div>
            Publiez ou cherchez
          </div>
          <div className="step-card">
            <div className="step-num">3</div>
            Connectez-vous
          </div>
        </div>
      </section>
      
      <section className="section">
        <h2 className="section-title">Dernières annonces</h2>
        <div className="annonces-list">
          <div className="annonce-card">
            <div>
              <div className="annonce-title">Cueilleur de pommes</div>
              <div className="annonce-location"> Montauban</div>
            </div>
            <span className="annonce-arrow">→</span>
          </div>
          <div className="annonce-card">
            <div>
              <div className="annonce-title">Vendangeur</div>
              <div className="annonce-location"> Bordeaux</div>
            </div>
            <span className="annonce-arrow">→</span>
          </div>
          <div className="annonce-card">
            <div>
              <div className="annonce-title">Maraîcher</div>
              <div className="annonce-location"> Agen</div>
            </div>
            <span className="annonce-arrow">→</span>
          </div>
        </div>
      </section>
      
      <div className="cta-banner">
        <p>Rejoignez la communauté agricole</p>
        <button className="btn-cta">Rejoignez la plateforme · Inscription</button>
      </div>

    </div>
  </div>
  
  <footer>
    <a href="#">Mentions légales</a>
    <a href="#">CGU</a>
    <a href="#">Contact</a>
  </footer>

</body>
);
};
      
export default landingPage;
