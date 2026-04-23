import { createBrowserRouter } from 'react-router-dom'

// Layouts
import PublicLayout from '../layout/PublicLayout'
import AgriLayout from '../layout/AgriLayout'
import SaisonLayout from '../layout/SaisonLayout'

// Pages publiques
import LandingPage from '../pages/public/landingPage'
import Connexion from '../pages/public/connexion'

// Pages de test
import TestPage from '../pages/test/TestPage'
import NotFoundPage from '../pages/test/NotFoundPage'
import HomePage from '../pages/test/HomePage'

const router = createBrowserRouter([
  // Routes publiques (non connecté)
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/connexion', element: <Connexion /> },
    ],
  },

  // Routes agriculteur 
  {
    element: <AgriLayout />,
    children: [
      // TODO: ajouter les vraies pages agri ici
      // { path: '/mes-annonces', element: <MesAnnoncesPage /> },
      // { path: '/creer-annonce', element: <CreerAnnoncePage /> },
      // { path: '/profil', element: <ProfilAgriPage /> },
    ],
  },

  // Routes saisonnier 
  {
    element: <SaisonLayout />,
    children: [
      // TODO: ajouter les vraies pages saisonnier ici
      // { path: '/annonces', element: <RecherchePage /> },
      // { path: '/mes-candidatures', element: <MesCandidaturesPage /> },
      // { path: '/profil', element: <ProfilSaisonPage /> },
    ],
  },

  // Routes de test / fallback 
  { path: '/homepage', element: <HomePage /> },
  { path: '/_test-auth', element: <TestPage /> },
  { path: '*', element: <NotFoundPage /> },
])

export default router