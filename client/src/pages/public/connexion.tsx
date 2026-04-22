import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/connexion.css';

const Connexion = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Identifiants incorrects');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav>
        <div className="nav-logo">
          Labor
          <span>La plateforme des récoltes</span>
        </div>
        <div className="nav-actions">
          <Link to="/connexion" className="btn-outline">Connexion</Link>
          <Link to="/inscription" className="btn-solid">Inscription</Link>
        </div>
      </nav>

      <div className="page-wrapper">
        <aside className="sidebar">
          <div className="sidebar-title">Menu</div>

          <div className="sidebar-group">
            <Link to="/" className="sidebar-link">Page d'Accueil</Link>
            <Link to="/connexion" className="sidebar-link active">Connexion</Link>
            <Link to="/mot-de-passe-oublie" className="sidebar-link">Mdp oublié</Link>
            <Link to="/inscription/agriculteur" className="sidebar-link">Inscription agri</Link>
            <Link to="/inscription/saisonnier" className="sidebar-link">Inscription saison.</Link>
          </div>

          <div className="sidebar-group">
            <div className="sidebar-group-label">Espace Agriculteur</div>
            <Link to="/agriculteur/profil" className="sidebar-link">Mon profil</Link>
            <Link to="/agriculteur/annonces" className="sidebar-link">Mes annonces</Link>
            <Link to="/agriculteur/annonces/creer" className="sidebar-link">Créer annonce</Link>
            <Link to="/agriculteur/annonces/detail" className="sidebar-link">Détail annonce</Link>
            <Link to="/agriculteur/candidatures/detail" className="sidebar-link">Détail candidature</Link>
          </div>

          <div className="sidebar-group">
            <div className="sidebar-group-label">Espace Saisonnier</div>
            <Link to="/saisonnier/profil" className="sidebar-link">Mon profil</Link>
            <Link to="/saisonnier/annonces" className="sidebar-link">Recherche annonces</Link>
            <Link to="/saisonnier/annonces/detail" className="sidebar-link">Détail annonce</Link>
            <Link to="/saisonnier/candidature" className="sidebar-link">Formulaire candid.</Link>
            <Link to="/saisonnier/candidatures" className="sidebar-link">Mes candidatures</Link>
          </div>
        </aside>

        <div className="main-content">
          <div className="connexion-wrapper">
            <div className="connexion-card">
              <h1 className="connexion-title">Connexion</h1>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="test@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  className="btn-connexion"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>

              <div className="form-links">
                <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
                <Link to="/inscription">Pas encore de compte ? S'inscrire</Link>
              </div>

              {error && (
                <div className="error-message">{error}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer>
        <a href="#">Mentions légales</a>
        <a href="#">CGU</a>
        <a href="#">Contact</a>
      </footer>
    </>
  );
};

export default Connexion;