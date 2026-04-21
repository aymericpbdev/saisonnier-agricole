import './mdp-oublie.css';

const mdp =() => {
    return(<body>
  
  <nav>
    <div className="nav-logo">
      Labor
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
        <a href="index.html" className="sidebar-link">Page d'Accueil</a>
        <a href="connexion.html" className="sidebar-link">Connexion</a>
        <a href="mdp-oublie.html" className="sidebar-link active">Mdp oublié</a>
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

      <div className="mdp-wrapper">
        <div className="mdp-card">
          
          <h1 className="mdp-title">Mot de passe oublié</h1>
          <p className="mdp-subtitle">Un lien de réinitialisation sera envoyé par email</p>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="" />
          </div>

          <button className="btn-mdp">Envoyer le lien</button>
          
          <div className="separateur"></div>

         
          <p className="mdp-reset-label">Page de réinitialisation (via lien email) :</p>

          <div className="form-group">
            <label htmlFor="new-password">Nouveau mot de passe</label>
            <input type="password" id="new-password" placeholder="" />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirmer mot de passe</label>
            <input type="password" id="confirm-password" placeholder="" />
          </div>

          <button className="btn-mdp">Réinitialiser</button>

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

export default mdp;