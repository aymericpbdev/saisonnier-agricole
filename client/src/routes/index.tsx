import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/public/landingPage'
import Connexion from '../pages/public/connexion'
import TestPage from '../pages/test/TestPage'
import NotFoundPage from '../pages/test/NotFoundPage'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/connexion', element: <Connexion /> },
  { path: '/test', element: <TestPage /> },
  { path: '*', element: <NotFoundPage /> },
])

export default router