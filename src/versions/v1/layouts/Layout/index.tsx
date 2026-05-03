import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

const Layout: React.FC = () => (
  <div className="bg-gradient-175deg">
    <Header />
    <div className="flex flex-col min-h-content">
      <Outlet />
    </div>
    <Footer />
  </div>
)

export default Layout