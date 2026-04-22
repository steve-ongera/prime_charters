import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

const services = [
  { to: '/private-jet', label: 'Private Jet', icon: 'bi-airplane' },
  { to: '/group-charter', label: 'Group Charter', icon: 'bi-people-fill' },
  { to: '/air-cargo', label: 'Air Cargo', icon: 'bi-box-seam' },
  { to: '/aircraft-leasing', label: 'Aircraft Leasing', icon: 'bi-file-earmark-text' },
  { to: '/flight-support', label: 'Flight Support', icon: 'bi-headset' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--open' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <i className="bi bi-airplane-fill navbar__logo-icon" />
          <div>
            <span className="navbar__logo-name">PRIME</span>
            <span className="navbar__logo-sub">CHARTERS</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="navbar__links">
          <div
            className="navbar__dropdown-trigger"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <span className="navbar__link">
              Services <i className="bi bi-chevron-down" style={{ fontSize: '0.65rem' }} />
            </span>
            {servicesOpen && (
              <div className="navbar__dropdown">
                {services.map(s => (
                  <Link key={s.to} to={s.to} className="navbar__dropdown-item">
                    <i className={`bi ${s.icon}`} />
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/fleet" className="navbar__link">Fleet</NavLink>
          <NavLink to="/book" className="navbar__link">Get a Quote</NavLink>
        </div>

        {/* CTA */}
        <div className="navbar__actions">
          <a href="tel:+18001234567" className="navbar__phone">
            <i className="bi bi-telephone" /> +1 800 123 4567
          </a>
          <button className="btn btn--gold btn--sm" onClick={() => navigate('/book')}>
            Book Now
          </button>
          {/* Mobile hamburger */}
          <button
            className={`navbar__hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          <div className="navbar__mobile-inner">
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Services</p>
            {services.map(s => (
              <Link key={s.to} to={s.to} className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                <i className={`bi ${s.icon}`} />
                {s.label}
              </Link>
            ))}
            <div className="navbar__mobile-divider" />
            <Link to="/fleet" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
              <i className="bi bi-grid-3x3-gap" /> Our Fleet
            </Link>
            <Link to="/book" className="btn btn--gold" style={{ marginTop: '1rem', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}