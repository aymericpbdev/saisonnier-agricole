import './connexion.css';

const connexion = () => {
    return(<body>
 
  <nav>
    <div className="nav-logo">
      Labor
      <span>La plateforme des récoltes</span>
    </div>
    <div className="nav-actions">
      <a href="index.html" className="btn-outline">Connexion</a>
      <a href="#" className="btn-solid">Inscription</a>
    </div>
  </nav>
  
  <div className="page-wrapper">
   
    <aside className="sidebar">
      <div className="sidebar-title">Menu</div>

      <div className="sidebar-group">
        <a href="index.html" className="sidebar-link">Page d'Accueil</a>
        <a href="connexion.html" className="sidebar-link active">Connexion</a>
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

      <div className="connexion-wrapper">
        <div className="connexion-card">

          <h1 className="connexion-title">Connexion</h1>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder="" />
          </div>

          <button className="btn-connexion">Se connecter</button>

          <div className="form-links">
            <a href="#">Mot de passe oublié ?</a>
            <a href="#">Pas encore de compte ? S'inscrire</a>
          </div>
          
          <div className="error-message">
            Identifiants incorrects
          </div>

        </div>
      </div>

    </div>
  </div>
  
  <footer>
    <a href="#">Mentions légales</a>
    <a href="#">CGU</a>
    <a href="#">Contact</a>
  </footer>

</body>);
};

export default connexion;