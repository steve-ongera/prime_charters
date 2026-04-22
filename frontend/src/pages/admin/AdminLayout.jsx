// src/pages/admin/AdminLayout.jsx
import React, { useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { isAuthenticated, logout } from '../../api'

const NAV = [
  { path: '/admin',          icon: 'bi-grid-1x2',         label: 'Dashboard' },
  { path: '/admin/bookings', icon: 'bi-calendar2-check',  label: 'Bookings' },
  { path: '/admin/fleet',    icon: 'bi-airplane',         label: 'Fleet' },
  { path: '/admin/cargo',    icon: 'bi-box-seam',         label: 'Cargo' },
  { path: '/admin/leasing',  icon: 'bi-file-earmark-text',label: 'Leasing' },
  { path: '/admin/support',  icon: 'bi-headset',          label: 'Support' },
]

export default function AdminLayout({ children, title }) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated()) navigate('/admin/login')
  }, [])

  return (
    <div style={s.root}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.brand}>
          <div style={s.brandIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="#c9a84c" />
            </svg>
          </div>
          <div>
            <div style={s.brandName}>PRIME CHARTERS</div>
            <div style={s.brandSub}>Operations</div>
          </div>
        </div>

        <nav style={s.nav}>
          {NAV.map(({ path, icon, label }) => {
            const active = location.pathname === path
            return (
              <Link key={path} to={path} style={{ ...s.navItem, ...(active ? s.navActive : {}) }}>
                <i className={icon} style={{ fontSize: 16 }} />
                <span style={s.navLabel}>{label}</span>
                {active && <div style={s.navIndicator} />}
              </Link>
            )
          })}
        </nav>

        <button onClick={logout} style={s.logoutBtn}>
          <i className="bi-box-arrow-left" />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main */}
      <main style={s.main}>
        <header style={s.header}>
          <h1 style={s.headerTitle}>{title}</h1>
          <div style={s.headerRight}>
            <div style={s.headerDot} />
            <span style={s.headerStatus}>Live</span>
          </div>
        </header>
        <div style={s.content}>{children}</div>
      </main>
    </div>
  )
}

const s = {
  root: {
    display: 'flex', minHeight: '100vh',
    background: '#07090f',
    fontFamily: "'Georgia', serif",
    color: '#e0e8f0',
  },
  sidebar: {
    width: 220,
    background: 'linear-gradient(180deg, #0b0e16 0%, #080b12 100%)',
    borderRight: '1px solid rgba(201,168,76,0.12)',
    display: 'flex', flexDirection: 'column',
    padding: '0 0 24px',
    position: 'sticky', top: 0, height: '100vh',
    flexShrink: 0,
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '24px 20px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    marginBottom: 12,
  },
  brandIcon: {
    width: 36, height: 36,
    background: 'rgba(201,168,76,0.12)',
    border: '1px solid rgba(201,168,76,0.25)',
    borderRadius: 2,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  brandName: { fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: '#c9a84c' },
  brandSub: { fontSize: 11, color: '#4a5568', letterSpacing: '0.08em', marginTop: 2 },
  nav: { flex: 1, display: 'flex', flexDirection: 'column', padding: '0 12px', gap: 2 },
  navItem: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 12px',
    borderRadius: 3,
    color: '#5a6878',
    textDecoration: 'none',
    fontSize: 13,
    transition: 'all 0.15s',
    position: 'relative',
  },
  navActive: {
    background: 'rgba(201,168,76,0.08)',
    color: '#c9a84c',
    border: '1px solid rgba(201,168,76,0.15)',
  },
  navLabel: { letterSpacing: '0.04em' },
  navIndicator: {
    position: 'absolute', right: -1, top: '20%', bottom: '20%',
    width: 2, background: '#c9a84c', borderRadius: 2,
  },
  logoutBtn: {
    display: 'flex', alignItems: 'center', gap: 8,
    margin: '0 12px',
    padding: '10px 12px',
    background: 'none', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 3, color: '#4a5568', cursor: 'pointer',
    fontSize: 13, letterSpacing: '0.04em',
    transition: 'color 0.15s, border-color 0.15s',
  },
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 32px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(255,255,255,0.015)',
    position: 'sticky', top: 0, zIndex: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: 400, margin: 0, letterSpacing: '0.04em', color: '#e0e8f0' },
  headerRight: { display: 'flex', alignItems: 'center', gap: 8 },
  headerDot: { width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' },
  headerStatus: { fontSize: 11, color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase' },
  content: { padding: '28px 32px', flex: 1 },
}