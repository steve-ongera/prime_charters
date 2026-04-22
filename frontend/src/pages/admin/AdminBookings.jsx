// src/pages/admin/AdminBookings.jsx
import React, { useState, useEffect, useCallback } from 'react'
import AdminLayout from './AdminLayout'
import { fetchBookings, updateBookingStatus } from '../../api'

const STATUS_COLORS = {
  pending:   '#f59e0b',
  confirmed: '#4ade80',
  quoted:    '#60a5fa',
  cancelled: '#f87171',
  completed: '#a78bfa',
}
const ALL_STATUSES = ['pending', 'confirmed', 'quoted', 'cancelled', 'completed']
const SERVICE_LABELS = {
  private_jet: 'Private Jet',
  group_charter: 'Group Charter',
  air_cargo: 'Air Cargo',
  acmi_leasing: 'ACMI',
  flight_support: 'Flight Support',
}

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || '#888'
  return (
    <span style={{
      fontSize: 10, padding: '3px 9px', borderRadius: 20,
      background: color + '18', color, border: `1px solid ${color}33`,
      letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600,
      whiteSpace: 'nowrap',
    }}>{status}</span>
  )
}

function Modal({ booking, onClose, onSave }) {
  const [newStatus, setNewStatus] = useState(booking.status)
  const [adminNotes, setAdminNotes] = useState(booking.admin_notes || '')
  const [quotedPrice, setQuotedPrice] = useState(booking.quoted_price || '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      await onSave(booking.id, { status: newStatus, admin_notes: adminNotes, quoted_price: quotedPrice || null })
      onClose()
    } catch (e) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={m.overlay} onClick={onClose}>
      <div style={m.modal} onClick={e => e.stopPropagation()}>
        <div style={m.header}>
          <div>
            <div style={m.ref}>{booking.reference_short || String(booking.reference).slice(0, 8).toUpperCase()}</div>
            <div style={m.clientName}>{booking.client_name}</div>
          </div>
          <button onClick={onClose} style={m.closeBtn}><i className="bi-x-lg" /></button>
        </div>

        <div style={m.body}>
          <div style={m.infoGrid}>
            <Info label="Email"      value={booking.client_email} />
            <Info label="Phone"      value={booking.client_phone} />
            <Info label="Company"    value={booking.client_company || '—'} />
            <Info label="Nationality" value={booking.client_nationality || '—'} />
            <Info label="Service"    value={SERVICE_LABELS[booking.service_type] || booking.service_type} />
            <Info label="Passengers" value={booking.passenger_count} />
            <Info label="Origin"     value={booking.origin} />
            <Info label="Destination" value={booking.destination} />
            <Info label="Departure"  value={`${booking.departure_date}${booking.departure_time ? ' ' + booking.departure_time : ''}`} />
            {booking.is_return && <Info label="Return" value={booking.return_date} />}
            {booking.quoted_price && <Info label="Current Quote" value={`${booking.currency} ${Number(booking.quoted_price).toLocaleString()}`} />}
          </div>

          {booking.special_requests && (
            <div style={m.reqBox}>
              <div style={m.reqLabel}>Special Requests</div>
              <div style={m.reqText}>{booking.special_requests}</div>
            </div>
          )}

          <div style={m.extras}>
            {booking.catering_required && <span style={m.tag}>🍽 Catering</span>}
            {booking.ground_transport && <span style={m.tag}>🚗 Ground Transport</span>}
            {booking.visa_assistance && <span style={m.tag}>🛂 Visa Assistance</span>}
          </div>

          <div style={m.divider} />

          <div style={m.editSection}>
            <div style={m.fieldRow}>
              <div style={m.field}>
                <label style={m.label}>Update Status</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value)} style={m.select}>
                  {ALL_STATUSES.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div style={m.field}>
                <label style={m.label}>Quote Price (USD)</label>
                <input
                  type="number" value={quotedPrice}
                  onChange={e => setQuotedPrice(e.target.value)}
                  placeholder="e.g. 48000"
                  style={m.input}
                />
              </div>
            </div>
            <div style={m.field}>
              <label style={m.label}>Admin Notes</label>
              <textarea
                value={adminNotes}
                onChange={e => setAdminNotes(e.target.value)}
                rows={3}
                style={{ ...m.input, resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        <div style={m.footer}>
          <button onClick={onClose} style={m.cancelBtn}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={m.saveBtn}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div style={{ marginBottom: 2 }}>
      <div style={{ fontSize: 9, color: '#3a4555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 12, color: '#c0cad8', marginTop: 2 }}>{value}</div>
    </div>
  )
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (statusFilter) params.status = statusFilter
      if (search) params.search = search
      const data = await fetchBookings(params)
      setBookings(Array.isArray(data) ? data : data.results ?? [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search])

  useEffect(() => { load() }, [load])

  async function handleSave(id, patch) {
    await updateBookingStatus(id, patch.status, { admin_notes: patch.admin_notes, quoted_price: patch.quoted_price })
    await load()
  }

  return (
    <AdminLayout title="Bookings">
      {selected && (
        <Modal
          booking={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
        />
      )}

      {/* Filters */}
      <div style={s.filters}>
        <div style={s.searchWrap}>
          <i className="bi-search" style={s.searchIcon} />
          <input
            style={s.searchInput}
            placeholder="Search client, email, route…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={s.filterBtns}>
          {['', ...ALL_STATUSES].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                ...s.filterBtn,
                ...(statusFilter === st ? {
                  background: (STATUS_COLORS[st] || '#c9a84c') + '20',
                  color: STATUS_COLORS[st] || '#c9a84c',
                  border: `1px solid ${STATUS_COLORS[st] || '#c9a84c'}44`,
                } : {}),
              }}
            >
              {st || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={s.tableWrap}>
        <div style={s.tableHead}>
          {['Ref', 'Client', 'Service', 'Route', 'Date', 'Pax', 'Quote', 'Status', ''].map(h => (
            <div key={h} style={s.th}>{h}</div>
          ))}
        </div>

        {loading && (
          <div style={s.loading}>Loading bookings…</div>
        )}

        {!loading && bookings.length === 0 && (
          <div style={s.empty}>No bookings match this filter.</div>
        )}

        {!loading && bookings.map(b => (
          <div key={b.id} style={s.row}>
            <div style={{ ...s.td, color: '#c9a84c', fontFamily: 'monospace', fontSize: 11 }}>
              {b.reference_short || String(b.reference).slice(0, 8).toUpperCase()}
            </div>
            <div style={s.td}>
              <div style={s.name}>{b.client_name}</div>
              <div style={s.email}>{b.client_email}</div>
            </div>
            <div style={s.td}>{SERVICE_LABELS[b.service_type] || b.service_type}</div>
            <div style={s.td}>{b.origin} → {b.destination}</div>
            <div style={s.td}>{b.departure_date}</div>
            <div style={s.td}>{b.passenger_count}</div>
            <div style={s.td}>
              {b.quoted_price ? `${b.currency} ${Number(b.quoted_price).toLocaleString()}` : '—'}
            </div>
            <div style={s.td}><StatusBadge status={b.status} /></div>
            <div style={s.td}>
              <button onClick={() => setSelected(b)} style={s.editBtn}>
                <i className="bi-pencil-square" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={s.count}>{bookings.length} record{bookings.length !== 1 ? 's' : ''}</div>
    </AdminLayout>
  )
}

const s = {
  filters: { display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' },
  searchWrap: { position: 'relative', flex: 1, minWidth: 220 },
  searchIcon: { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#3a4555', fontSize: 13 },
  searchInput: {
    width: '100%', background: '#0e1218', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 3, padding: '9px 12px 9px 34px', color: '#c0cad8', fontSize: 13,
    outline: 'none', fontFamily: "'Georgia', serif", boxSizing: 'border-box',
  },
  filterBtns: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  filterBtn: {
    background: 'none', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '5px 14px', color: '#4a5568',
    cursor: 'pointer', fontSize: 11, letterSpacing: '0.06em',
    textTransform: 'capitalize', transition: 'all 0.15s',
    fontFamily: "'Georgia', serif",
  },
  tableWrap: {
    background: '#0e1218', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 4, overflow: 'hidden',
  },
  tableHead: {
    display: 'grid',
    gridTemplateColumns: '90px 1fr 110px 1.2fr 95px 45px 120px 100px 80px',
    padding: '10px 18px',
    background: 'rgba(255,255,255,0.02)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  th: { fontSize: 9, color: '#3a4555', letterSpacing: '0.12em', textTransform: 'uppercase' },
  row: {
    display: 'grid',
    gridTemplateColumns: '90px 1fr 110px 1.2fr 95px 45px 120px 100px 80px',
    padding: '12px 18px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    alignItems: 'center',
    transition: 'background 0.12s',
    cursor: 'default',
  },
  td: { fontSize: 12, color: '#8a9ab0' },
  name: { fontSize: 12, color: '#c0cad8' },
  email: { fontSize: 10, color: '#3a4555', marginTop: 2 },
  editBtn: {
    background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 3, padding: '5px 10px', color: '#c9a84c',
    cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', gap: 5,
    fontFamily: "'Georgia', serif",
  },
  loading: { padding: '28px 18px', color: '#3a4555', fontSize: 13, textAlign: 'center' },
  empty: { padding: '28px 18px', color: '#3a4555', fontSize: 13, textAlign: 'center' },
  count: { fontSize: 11, color: '#3a4555', marginTop: 10, textAlign: 'right', letterSpacing: '0.06em' },
}

const m = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: 24,
  },
  modal: {
    background: '#0e1218', border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 4, width: '100%', maxWidth: 680,
    maxHeight: '90vh', overflow: 'auto',
    boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
    fontFamily: "'Georgia', serif",
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  ref: { fontSize: 11, color: '#c9a84c', fontFamily: 'monospace', letterSpacing: '0.08em', marginBottom: 4 },
  clientName: { fontSize: 18, color: '#e0e8f0', fontWeight: 400 },
  closeBtn: {
    background: 'none', border: 'none', color: '#4a5568',
    cursor: 'pointer', fontSize: 16, padding: 4,
  },
  body: { padding: '20px 24px' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px', marginBottom: 16 },
  reqBox: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 3, padding: '12px 14px', marginBottom: 14,
  },
  reqLabel: { fontSize: 9, color: '#3a4555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 },
  reqText: { fontSize: 12, color: '#8a9ab0', lineHeight: 1.6 },
  extras: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 4 },
  tag: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '3px 10px', fontSize: 11, color: '#6a7888',
  },
  divider: { borderTop: '1px solid rgba(255,255,255,0.07)', margin: '18px 0' },
  editSection: { display: 'flex', flexDirection: 'column', gap: 14 },
  fieldRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 10, color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase' },
  select: {
    background: '#070a10', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 3, padding: '9px 12px', color: '#c0cad8', fontSize: 13,
    outline: 'none', fontFamily: "'Georgia', serif",
  },
  input: {
    background: '#070a10', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 3, padding: '9px 12px', color: '#c0cad8', fontSize: 13,
    outline: 'none', fontFamily: "'Georgia', serif",
  },
  footer: {
    display: 'flex', justifyContent: 'flex-end', gap: 10,
    padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.07)',
  },
  cancelBtn: {
    background: 'none', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 3, padding: '9px 20px', color: '#5a6878',
    cursor: 'pointer', fontSize: 12, fontFamily: "'Georgia', serif",
  },
  saveBtn: {
    background: 'linear-gradient(135deg, #c9a84c, #a8882e)',
    border: 'none', borderRadius: 3, padding: '9px 24px',
    color: '#07090f', fontWeight: 700, fontSize: 12,
    cursor: 'pointer', letterSpacing: '0.06em',
    fontFamily: "'Georgia', serif",
  },
}