import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

const Layout: React.FC = () => (
  <div className="flex min-h-screen flex-col bg-white">
    <Header />
    <main className="flex flex-1 flex-col">
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default Layout
