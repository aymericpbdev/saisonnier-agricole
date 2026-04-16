//<<<<<<< HEAD
//import LandingPage from "./pages/public/landingPage";
//function App() {
//
//
  //return (
    //<LandingPage />
  //  
 // )
//=======
//import { RouterProvider } from 'react-router-dom'
//import router from './routes'
//
//function App() {
//  return <RouterProvider router={router} />
//>>>>>>> 798cd4d54ca47a5ee9e22e3d563b4d7c1502768b
//}
//
//export default App

import { useAuth } from './contexts/Authcontext.tsx';

function App() {
  const { currentUser, role, isLoading, login, logout } = useAuth();

  const handleLoginTest = async () => {
    const success = await login('test@example.com', 'password123');
    if (success) {
      alert('✅ Connexion réussie !');
    } else {
      alert('❌ Échec de la connexion');
    }
  };

  if (isLoading) {
    return <div>Chargement de l'utilisateur...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Test AuthContext + MSW</h1>

      <div style={{ margin: '20px 0' }}>
        <strong>Utilisateur actuel :</strong><br />
        {currentUser ? (
          <>
            Nom : {currentUser.name}<br />
            Email : {currentUser.email}<br />
            Rôle : {role}
          </>
        ) : (
          'Aucun utilisateur connecté'
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <button onClick={handleLoginTest} style={{ marginRight: '10px', padding: '10px 15px' }}>
          Tester Login (test@example.com)
        </button>

        <button onClick={logout} style={{ padding: '10px 15px' }}>
          Déconnexion
        </button>
      </div>

      <p style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        Vérifie aussi dans l'onglet Network (DevTools) que les appels à <code>/api/auth/me</code> et <code>/api/auth/login</code> sont bien interceptés par MSW.
      </p>
    </div>
  );
}

export default App;