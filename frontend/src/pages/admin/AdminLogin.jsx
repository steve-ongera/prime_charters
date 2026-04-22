// src/pages/admin/AdminLogin.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, isAuthenticated } from '../../api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) navigate('/admin')
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
      navigate('/admin')
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.root}>
      {/* Background grid */}
      <div style={s.grid} />
      <div style={s.glow} />

      <div style={s.card}>
        <div style={s.logoRow}>
          <div style={s.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="#c9a84c" />
            </svg>
          </div>
          <span style={s.logoText}>PRIME<span style={s.logoAccent}>CHARTERS</span></span>
        </div>

        <h1 style={s.title}>Operations Portal</h1>
        <p style={s.sub}>Staff access only</p>

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Username</label>
            <input
              style={s.input}
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              required
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input
              style={s.input}
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          {error && <p style={s.error}>{error}</p>}

          <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Authenticating…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

const s = {
  root: {
    minHeight: '100vh',
    background: '#07090f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Georgia', serif",
  },
  grid: {
    position: 'absolute', inset: 0,
    backgroundImage: `
      linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)`,
    backgroundSize: '40px 40px',
  },
  glow: {
    position: 'absolute',
    width: 600, height: 600,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    background: 'linear-gradient(145deg, #0e1218, #111722)',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 4,
    padding: '48px 40px',
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
  },
  logoRow: {
    display: 'flex', alignItems: 'center', gap: 10,
    marginBottom: 32,
  },
  logoIcon: {
    width: 44, height: 44,
    background: 'rgba(201,168,76,0.1)',
    border: '1px solid rgba(201,168,76,0.3)',
    borderRadius: 2,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoText: {
    fontSize: 15, fontWeight: 700, letterSpacing: '0.12em',
    color: '#fff', fontFamily: "'Georgia', serif",
  },
  logoAccent: { color: '#c9a84c' },
  title: {
    fontSize: 26, color: '#fff', margin: '0 0 6px',
    fontWeight: 400, letterSpacing: '0.02em',
  },
  sub: { fontSize: 13, color: '#5a6070', margin: '0 0 32px', letterSpacing: '0.05em', textTransform: 'uppercase' },
  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { fontSize: 11, color: '#8a9ab0', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Georgia', serif" },
  input: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 3,
    padding: '12px 14px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  },
  error: {
    background: 'rgba(220,60,60,0.1)', border: '1px solid rgba(220,60,60,0.3)',
    borderRadius: 3, padding: '10px 14px', color: '#f08080',
    fontSize: 13, margin: 0,
  },
  btn: {
    background: 'linear-gradient(135deg, #c9a84c, #a8882e)',
    border: 'none', borderRadius: 3,
    padding: '14px',
    color: '#07090f', fontWeight: 700,
    fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'opacity 0.2s, transform 0.1s',
    fontFamily: "'Georgia', serif",
  },
}