import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'
import Footer from './Footer'

import './Layout.css'

function PublicLayout() {
  return (
    <div className="layout">
      <Navbar role={null} />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout