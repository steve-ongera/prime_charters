import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'

export default function PageLayout() {
  const { pathname } = useLocation()
  // Pages with a hero image get a transparent navbar initially
  const heroPages = ['/', '/private-jet', '/group-charter', '/air-cargo', '/aircraft-leasing', '/flight-support']
  const hasHero = heroPages.includes(pathname)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar forceScrolled={!hasHero} />
      <main style={{ flex: 1, paddingTop: hasHero ? 0 : 'var(--nav-height)' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}