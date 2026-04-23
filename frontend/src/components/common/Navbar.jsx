// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const mainLinks = [
  { to: '/',                 label: 'Home',             icon: 'bi-house' },
  { to: '/private-jet',      label: 'Private Jet',      icon: 'bi-airplane' },
  { to: '/group-charter',    label: 'Group Charter',    icon: 'bi-people-fill' },
  { to: '/air-cargo',        label: 'Air Cargo',        icon: 'bi-box-seam' },
  { to: '/aircraft-leasing', label: 'Aircraft Leasing', icon: 'bi-file-earmark-text' },
  { to: '/flight-support',   label: 'Flight Support',   icon: 'bi-headset' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()

  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  return (
    <>
      {/* ── Main navbar ── */}
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <i className="bi bi-airplane-fill navbar__logo-icon" />
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">PRIME</span>
              <span className="navbar__logo-sub">CHARTERS</span>
            </div>
          </Link>

          {/* Desktop links — 6 flat links, no dropdown */}
          <div className="navbar__links">
            {mainLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar__actions">
            <a href="tel:+18001234567" className="navbar__phone">
              <i className="bi bi-telephone" />
              <span>+1 800 123 4567</span>
            </a>
            <button className="btn btn--gold btn--sm navbar__cta" onClick={() => navigate('/book')}>
              Book Now
            </button>
            <button
              className={`navbar__hamburger${sidebarOpen ? ' active' : ''}`}
              onClick={() => setSidebarOpen(v => !v)}
              aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={sidebarOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' sidebar-overlay--visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside className={`sidebar${sidebarOpen ? ' sidebar--open' : ''}`} aria-label="Mobile navigation">

        <div className="sidebar__header">
          <Link to="/" className="sidebar__logo">
            <i className="bi bi-airplane-fill" />
            <div>
              <span className="sidebar__logo-name">PRIME</span>
              <span className="sidebar__logo-sub">CHARTERS</span>
            </div>
          </Link>
          <button className="sidebar__close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav className="sidebar__nav">
          {mainLinks.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className="sidebar__link"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <i className={`bi ${l.icon}`} />
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar__footer">
          <a href="tel:+18001234567" className="sidebar__phone">
            <i className="bi bi-telephone-fill" />
            +1 800 123 4567
          </a>
          <button
            className="btn btn--gold"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => navigate('/book')}
          >
            <i className="bi bi-send" /> Request a Quote
          </button>
        </div>
      </aside>
    </>
  )
}