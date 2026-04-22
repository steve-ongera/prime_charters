// src/api.js
const BASE = 'http://localhost:8000/api'

function getToken() {
  return localStorage.getItem('access_token')
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })

  if (res.status === 401) {
    // Try token refresh
    const refresh = localStorage.getItem('refresh_token')
    if (refresh) {
      const r = await fetch(`${BASE}/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      })
      if (r.ok) {
        const data = await r.json()
        localStorage.setItem('access_token', data.access)
        headers['Authorization'] = `Bearer ${data.access}`
        const retry = await fetch(`${BASE}${path}`, { ...options, headers })
        return retry
      }
    }
    localStorage.clear()
    window.location.href = '/admin/login'
  }

  return res
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export async function login(username, password) {
  const res = await fetch(`${BASE}/auth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('Invalid credentials')
  const data = await res.json()
  localStorage.setItem('access_token', data.access)
  localStorage.setItem('refresh_token', data.refresh)
  return data
}

export function logout() {
  localStorage.clear()
  window.location.href = '/admin/login'
}

export function isAuthenticated() {
  return !!getToken()
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export async function fetchDashboardStats() {
  const res = await request('/admin/stats/')
  if (!res.ok) throw new Error('Failed to load stats')
  return res.json()
}

// ── Bookings ──────────────────────────────────────────────────────────────────
export async function fetchBookings(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await request(`/admin/bookings/${qs ? '?' + qs : ''}`)
  if (!res.ok) throw new Error('Failed to load bookings')
  return res.json()
}

export async function updateBooking(id, data) {
  const res = await request(`/admin/bookings/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update booking')
  return res.json()
}

export async function updateBookingStatus(id, status, extra = {}) {
  const res = await request(`/admin/bookings/${id}/update_status/`, {
    method: 'PATCH',
    body: JSON.stringify({ status, ...extra }),
  })
  if (!res.ok) throw new Error('Failed to update status')
  return res.json()
}

// ── Fleet ─────────────────────────────────────────────────────────────────────
export async function fetchFleet(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await request(`/admin/fleet/${qs ? '?' + qs : ''}`)
  if (!res.ok) throw new Error('Failed to load fleet')
  return res.json()
}

export async function createAircraft(data) {
  const res = await request('/admin/fleet/', { method: 'POST', body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Failed to create aircraft')
  return res.json()
}

export async function updateAircraft(id, data) {
  const res = await request(`/admin/fleet/${id}/`, { method: 'PATCH', body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Failed to update aircraft')
  return res.json()
}

export async function deleteAircraft(id) {
  const res = await request(`/admin/fleet/${id}/`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete aircraft')
}

// ── Cargo ─────────────────────────────────────────────────────────────────────
export async function fetchCargo(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await request(`/admin/cargo/${qs ? '?' + qs : ''}`)
  if (!res.ok) throw new Error('Failed to load cargo')
  return res.json()
}

export async function updateCargo(id, data) {
  const res = await request(`/admin/cargo/${id}/`, { method: 'PATCH', body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Failed to update cargo')
  return res.json()
}

// ── Leasing ───────────────────────────────────────────────────────────────────
export async function fetchLeasing(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await request(`/admin/leasing/${qs ? '?' + qs : ''}`)
  if (!res.ok) throw new Error('Failed to load leasing')
  return res.json()
}

// ── Flight Support ────────────────────────────────────────────────────────────
export async function fetchSupport(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await request(`/admin/support/${qs ? '?' + qs : ''}`)
  if (!res.ok) throw new Error('Failed to load support requests')
  return res.json()
}

export async function updateSupport(id, data) {
  const res = await request(`/admin/support/${id}/`, { method: 'PATCH', body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Failed to update support request')
  return res.json()
}

// ── Testimonials ──────────────────────────────────────────────────────────────
export async function fetchTestimonials() {
  const res = await request('/testimonials/')
  if (!res.ok) throw new Error('Failed to load testimonials')
  return res.json()
}