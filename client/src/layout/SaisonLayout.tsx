import { Outlet } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import Navbar from './Navbar'
import Footer from './Footer'

import './Layout.css'

function SaisonLayout() {
  const { role, currentUser } = useAuth()

  // Construit le nom affiché dans la navbar 
  const displayName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName.charAt(0)}.`
    : ''

  return (
    <div className="layout">
      <Navbar role={role} userName={displayName} />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default SaisonLayout