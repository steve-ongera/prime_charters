// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react'
import AdminLayout from './AdminLayout'
import { fetchDashboardStats, fetchBookings, fetchCargo } from '../../api'

// ── Tiny bar chart (canvas, no library) ────────────────────────────────────────
function BarChart({ data, color = '#c9a84c', height = 120 }) {
  const ref = useRef()
  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !data.length) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const w = canvas.offsetWidth
    const h = height
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, w, h)

    const max = Math.max(...data.map(d => d.value), 1)
    const pad = 8
    const barW = Math.floor((w - pad * 2) / data.length) - 4

    data.forEach((d, i) => {
      const barH = ((d.value / max) * (h - 28))
      const x = pad + i * ((w - pad * 2) / data.length)
      const y = h - barH - 16

      // bar glow
      const grad = ctx.createLinearGradient(x, y, x, h - 16)
      grad.addColorStop(0, color)
      grad.addColorStop(1, color + '33')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.roundRect(x, y, barW, barH, 2)
      ctx.fill()

      // label
      ctx.fillStyle = '#4a5568'
      ctx.font = '9px Georgia'
      ctx.textAlign = 'center'
      ctx.fillText(d.label, x + barW / 2, h - 3)
    })
  }, [data, color, height])

  return <canvas ref={ref} style={{ width: '100%', height, display: 'block' }} />
}

// ── Donut chart ───────────────────────────────────────────────────────────────
function DonutChart({ segments, size = 140 }) {
  const ref = useRef()
  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !segments.length) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, size, size)

    const cx = size / 2, cy = size / 2, r = size * 0.38, inner = size * 0.24
    const total = segments.reduce((a, s) => a + s.value, 0) || 1
    let angle = -Math.PI / 2

    segments.forEach(seg => {
      const slice = (seg.value / total) * Math.PI * 2
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, angle, angle + slice)
      ctx.closePath()
      ctx.fillStyle = seg.color
      ctx.fill()
      angle += slice
    })

    // inner hole
    ctx.beginPath()
    ctx.arc(cx, cy, inner, 0, Math.PI * 2)
    ctx.fillStyle = '#0b0e16'
    ctx.fill()
  }, [segments, size])

  return <canvas ref={ref} style={{ width: size, height: size, display: 'block' }} />
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, accent = '#c9a84c', trend }) {
  return (
    <div style={s.statCard}>
      <div style={{ ...s.statIcon, background: accent + '18', border: `1px solid ${accent}33` }}>
        <i className={icon} style={{ color: accent, fontSize: 18 }} />
      </div>
      <div style={s.statBody}>
        <div style={s.statLabel}>{label}</div>
        <div style={s.statValue}>{value ?? '—'}</div>
        {sub && <div style={s.statSub}>{sub}</div>}
      </div>
      {trend !== undefined && (
        <div style={{ ...s.trend, color: trend >= 0 ? '#4ade80' : '#f87171' }}>
          <i className={trend >= 0 ? 'bi-arrow-up-right' : 'bi-arrow-down-right'} />
          {Math.abs(trend)}%
        </div>
      )}
    </div>
  )
}

// ── Recent row ────────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  pending:   '#f59e0b',
  confirmed: '#4ade80',
  quoted:    '#60a5fa',
  cancelled: '#f87171',
  completed: '#a78bfa',
}

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || '#888'
  return (
    <span style={{
      fontSize: 10, padding: '3px 8px', borderRadius: 20,
      background: color + '18', color, border: `1px solid ${color}33`,
      letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600,
    }}>{status}</span>
  )
}

// ── Main dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [cargoRecent, setCargoRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchDashboardStats(),
      fetchBookings({ limit: 6 }),
      fetchCargo({ limit: 4 }),
    ]).then(([st, bk, cg]) => {
      setStats(st)
      setRecent(Array.isArray(bk) ? bk : bk.results ?? [])
      setCargoRecent(Array.isArray(cg) ? cg : cg.results ?? [])
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  // Mock chart data (replace with real time-series from API if available)
  const bookingsByMonth = [
    { label: 'Jan', value: 4 }, { label: 'Feb', value: 7 },
    { label: 'Mar', value: 5 }, { label: 'Apr', value: 9 },
    { label: 'May', value: 12 }, { label: 'Jun', value: 8 },
    { label: 'Jul', value: stats?.bookings_this_month ?? 6 },
  ]

  const statusSegments = [
    { label: 'Pending',   value: stats?.pending_bookings   ?? 0, color: '#f59e0b' },
    { label: 'Confirmed', value: stats?.confirmed_bookings ?? 0, color: '#4ade80' },
    { label: 'Other',
      value: Math.max(0, (stats?.total_bookings ?? 0) - (stats?.pending_bookings ?? 0) - (stats?.confirmed_bookings ?? 0)),
      color: '#60a5fa' },
  ]

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div style={s.loader}>
          <div style={s.spinner} />
          <span style={{ color: '#4a5568', fontSize: 13 }}>Loading data…</span>
        </div>
      ) : (
        <div style={s.page}>

          {/* ── KPI Cards ── */}
          <section style={s.kpiGrid}>
            <StatCard icon="bi-calendar2-check" label="Total Bookings"    value={stats?.total_bookings}         sub="All time"            accent="#c9a84c" trend={12} />
            <StatCard icon="bi-hourglass-split" label="Pending Review"    value={stats?.pending_bookings}       sub="Awaiting action"     accent="#f59e0b" />
            <StatCard icon="bi-check2-circle"   label="Confirmed"         value={stats?.confirmed_bookings}     sub="Active bookings"     accent="#4ade80" />
            <StatCard icon="bi-box-seam"         label="Cargo Requests"   value={stats?.total_cargo_requests}   sub="All time"            accent="#60a5fa" />
            <StatCard icon="bi-file-earmark-text"label="Leasing Inquiries"value={stats?.total_leasing_inquiries}sub="All time"            accent="#a78bfa" />
            <StatCard icon="bi-airplane"         label="Active Aircraft"  value={stats?.total_aircraft}         sub="Fleet available"     accent="#34d399" />
            <StatCard icon="bi-graph-up-arrow"   label="This Month"       value={stats?.bookings_this_month}    sub="New bookings"        accent="#f472b6" trend={8} />
          </section>

          {/* ── Charts Row ── */}
          <section style={s.chartsRow}>
            <div style={s.chartCard}>
              <div style={s.chartHeader}>
                <span style={s.chartTitle}>Booking Volume</span>
                <span style={s.chartSub}>Last 7 months</span>
              </div>
              <BarChart data={bookingsByMonth} color="#c9a84c" height={140} />
            </div>

            <div style={s.chartCard}>
              <div style={s.chartHeader}>
                <span style={s.chartTitle}>Booking Status</span>
                <span style={s.chartSub}>Current breakdown</span>
              </div>
              <div style={s.donutWrap}>
                <DonutChart segments={statusSegments} size={150} />
                <div style={s.legend}>
                  {statusSegments.map(seg => (
                    <div key={seg.label} style={s.legendRow}>
                      <span style={{ ...s.legendDot, background: seg.color }} />
                      <span style={s.legendLabel}>{seg.label}</span>
                      <span style={s.legendVal}>{seg.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={s.chartCard}>
              <div style={s.chartHeader}>
                <span style={s.chartTitle}>Revenue Mix</span>
                <span style={s.chartSub}>By service type</span>
              </div>
              <BarChart
                data={[
                  { label: 'Jet',     value: 48 },
                  { label: 'Charter', value: 22 },
                  { label: 'Cargo',   value: 14 },
                  { label: 'ACMI',    value: 10 },
                  { label: 'Support', value: 6  },
                ]}
                color="#60a5fa"
                height={140}
              />
            </div>
          </section>

          {/* ── Recent Bookings ── */}
          <section style={s.tableSection}>
            <div style={s.tableHeader}>
              <span style={s.tableTitle}>Recent Bookings</span>
              <a href="/admin/bookings" style={s.viewAll}>View all <i className="bi-arrow-right" /></a>
            </div>
            <div style={s.table}>
              <div style={s.tableHead}>
                {['Reference', 'Client', 'Route', 'Service', 'Date', 'Status'].map(h => (
                  <div key={h} style={s.th}>{h}</div>
                ))}
              </div>
              {recent.length === 0 && (
                <div style={s.empty}>No bookings yet</div>
              )}
              {recent.map(b => (
                <div key={b.id} style={s.tableRow}>
                  <div style={{ ...s.td, color: '#c9a84c', fontFamily: 'monospace', fontSize: 11 }}>
                    {b.reference_short || String(b.reference).slice(0, 8).toUpperCase()}
                  </div>
                  <div style={s.td}>
                    <div style={s.clientName}>{b.client_name}</div>
                    <div style={s.clientEmail}>{b.client_email}</div>
                  </div>
                  <div style={s.td}>{b.origin} → {b.destination}</div>
                  <div style={s.td}>{(b.service_type || '').replace('_', ' ')}</div>
                  <div style={s.td}>{b.departure_date}</div>
                  <div style={s.td}><StatusBadge status={b.status} /></div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Recent Cargo ── */}
          <section style={s.tableSection}>
            <div style={s.tableHeader}>
              <span style={s.tableTitle}>Recent Cargo Requests</span>
              <a href="/admin/cargo" style={s.viewAll}>View all <i className="bi-arrow-right" /></a>
            </div>
            <div style={s.table}>
              <div style={s.tableHead}>
                {['Ref', 'Client', 'Route', 'Type', 'Weight', 'Status'].map(h => (
                  <div key={h} style={s.th}>{h}</div>
                ))}
              </div>
              {cargoRecent.length === 0 && <div style={s.empty}>No cargo requests yet</div>}
              {cargoRecent.map(c => (
                <div key={c.id} style={s.tableRow}>
                  <div style={{ ...s.td, color: '#60a5fa', fontFamily: 'monospace', fontSize: 11 }}>
                    {String(c.reference).slice(0, 8).toUpperCase()}
                  </div>
                  <div style={s.td}>{c.client_name}</div>
                  <div style={s.td}>{c.origin} → {c.destination}</div>
                  <div style={s.td}>{(c.cargo_type || '').replace('_', ' ')}</div>
                  <div style={s.td}>{c.weight_kg} kg</div>
                  <div style={s.td}><StatusBadge status={c.status} /></div>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}
    </AdminLayout>
  )
}

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: 28 },
  loader: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 80 },
  spinner: {
    width: 36, height: 36, borderRadius: '50%',
    border: '3px solid rgba(201,168,76,0.15)',
    borderTopColor: '#c9a84c',
    animation: 'spin 0.8s linear infinite',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 14,
  },
  statCard: {
    background: 'linear-gradient(145deg, #0e1218, #0b0f16)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 4,
    padding: '18px 20px',
    display: 'flex', alignItems: 'flex-start', gap: 14,
    position: 'relative', overflow: 'hidden',
  },
  statIcon: {
    width: 42, height: 42, borderRadius: 3,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  statBody: { flex: 1 },
  statLabel: { fontSize: 10, color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 },
  statValue: { fontSize: 28, color: '#e0e8f0', fontWeight: 300, lineHeight: 1 },
  statSub: { fontSize: 11, color: '#3a4555', marginTop: 4 },
  trend: { fontSize: 11, display: 'flex', alignItems: 'center', gap: 2, alignSelf: 'flex-start', paddingTop: 2 },
  chartsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
  },
  chartCard: {
    background: 'linear-gradient(145deg, #0e1218, #0b0f16)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 4, padding: '20px 20px 12px',
  },
  chartHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 },
  chartTitle: { fontSize: 13, color: '#c0cad8', letterSpacing: '0.04em' },
  chartSub: { fontSize: 10, color: '#3a4555', letterSpacing: '0.06em', textTransform: 'uppercase' },
  donutWrap: { display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center' },
  legend: { display: 'flex', flexDirection: 'column', gap: 10 },
  legendRow: { display: 'flex', alignItems: 'center', gap: 8 },
  legendDot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  legendLabel: { fontSize: 11, color: '#5a6878', flex: 1 },
  legendVal: { fontSize: 12, color: '#c0cad8', fontWeight: 600 },
  tableSection: {
    background: 'linear-gradient(145deg, #0e1218, #0b0f16)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 4, overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  tableTitle: { fontSize: 13, color: '#c0cad8', letterSpacing: '0.04em' },
  viewAll: { fontSize: 11, color: '#c9a84c', textDecoration: 'none', letterSpacing: '0.06em' },
  table: { width: '100%' },
  tableHead: {
    display: 'grid', gridTemplateColumns: '110px 1fr 1.4fr 120px 100px 100px',
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.02)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  th: { fontSize: 9, color: '#3a4555', letterSpacing: '0.12em', textTransform: 'uppercase' },
  tableRow: {
    display: 'grid', gridTemplateColumns: '110px 1fr 1.4fr 120px 100px 100px',
    padding: '12px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    transition: 'background 0.15s',
  },
  td: { fontSize: 12, color: '#8a9ab0', display: 'flex', alignItems: 'center' },
  clientName: { fontSize: 12, color: '#c0cad8' },
  clientEmail: { fontSize: 10, color: '#3a4555', marginTop: 2 },
  empty: { padding: '24px 20px', color: '#3a4555', fontSize: 12, textAlign: 'center' },
}