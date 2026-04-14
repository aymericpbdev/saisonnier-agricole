<<<<<<< HEAD
import LandingPage from "./pages/public/landingPage";
function App() {


  return (
    <LandingPage />
    
  )
=======
import { RouterProvider } from 'react-router-dom'
import router from './routes'

function App() {
  return <RouterProvider router={router} />
>>>>>>> 798cd4d54ca47a5ee9e22e3d563b4d7c1502768b
}

export default App