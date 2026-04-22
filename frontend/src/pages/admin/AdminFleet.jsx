// src/pages/admin/AdminFleet.jsx
import React, { useState, useEffect, useCallback } from 'react'
import AdminLayout from './AdminLayout'
import { fetchFleet, updateAircraft, createAircraft, deleteAircraft } from '../../api'

const CATEGORIES = [
  { value: 'light',       label: 'Light Jet' },
  { value: 'midsize',     label: 'Midsize Jet' },
  { value: 'super_midsize',label: 'Super Midsize' },
  { value: 'heavy',       label: 'Heavy Jet' },
  { value: 'ultra_long',  label: 'Ultra Long Range' },
  { value: 'turboprop',   label: 'Turboprop' },
  { value: 'helicopter',  label: 'Helicopter' },
  { value: 'airliner',    label: 'Airliner / Group' },
  { value: 'cargo',       label: 'Cargo Aircraft' },
]

const CAT_COLORS = {
  light: '#60a5fa', midsize: '#34d399', super_midsize: '#4ade80',
  heavy: '#c9a84c', ultra_long: '#f59e0b', turboprop: '#a78bfa',
  helicopter: '#f472b6', airliner: '#f87171', cargo: '#94a3b8',
}

const EMPTY_FORM = {
  name: '', manufacturer: '', model: '', category: 'light',
  registration: '', year_manufactured: 2020, passenger_capacity: 8,
  cargo_capacity_kg: 0, range_km: 5000, cruise_speed_kmh: 800,
  max_altitude_ft: 45000, cabin_length_m: '', cabin_height_m: '', cabin_width_m: '',
  wifi: false, sleeping_arrangements: false, galley: true, lavatory: true,
  entertainment_system: false, features: '', description: '',
  image_url: '', interior_image_url: '', thumbnail_url: '',
  is_available: true, is_featured: false, base_price_per_hour: '',
}

function CategoryBadge({ category }) {
  const color = CAT_COLORS[category] || '#888'
  const label = CATEGORIES.find(c => c.value === category)?.label || category
  return (
    <span style={{
      fontSize: 10, padding: '3px 8px', borderRadius: 20,
      background: color + '18', color, border: `1px solid ${color}33`,
      letterSpacing: '0.06em', whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 36, height: 20, borderRadius: 10, position: 'relative',
          background: checked ? '#c9a84c' : 'rgba(255,255,255,0.08)',
          transition: 'background 0.2s', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: 2, left: checked ? 18 : 2,
          width: 16, height: 16, borderRadius: '50%', background: '#fff',
          transition: 'left 0.2s',
        }} />
      </div>
      <span style={{ fontSize: 12, color: '#8a9ab0' }}>{label}</span>
    </label>
  )
}

function AircraftModal({ aircraft, onClose, onSave }) {
  const [form, setForm] = useState(aircraft ? { ...aircraft } : { ...EMPTY_FORM })
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState('basic')

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSave() {
    setSaving(true)
    try {
      await onSave(form)
      onClose()
    } catch (e) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  const tabs = ['basic', 'specs', 'amenities', 'media']

  return (
    <div style={m.overlay} onClick={onClose}>
      <div style={m.modal} onClick={e => e.stopPropagation()}>
        <div style={m.header}>
          <div>
            <div style={m.modalSub}>{aircraft ? 'Edit Aircraft' : 'Add Aircraft'}</div>
            <div style={m.modalTitle}>{form.name || 'New Aircraft'}</div>
          </div>
          <button onClick={onClose} style={m.closeBtn}><i className="bi-x-lg" /></button>
        </div>

        {/* Tabs */}
        <div style={m.tabs}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ ...m.tab, ...(tab === t ? m.tabActive : {}) }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div style={m.body}>
          {tab === 'basic' && (
            <div style={m.grid2}>
              <Field label="Aircraft Name" value={form.name} onChange={v => set('name', v)} />
              <Field label="Registration" value={form.registration} onChange={v => set('registration', v)} />
              <Field label="Manufacturer" value={form.manufacturer} onChange={v => set('manufacturer', v)} />
              <Field label="Model" value={form.model} onChange={v => set('model', v)} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={m.label}>Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)} style={m.input}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <Field label="Year Manufactured" type="number" value={form.year_manufactured} onChange={v => set('year_manufactured', +v)} />
              <Field label="Price per Hour (USD)" type="number" value={form.base_price_per_hour} onChange={v => set('base_price_per_hour', v)} />
              <div style={m.span2}>
                <label style={m.label}>Description</label>
                <textarea
                  value={form.description} onChange={e => set('description', e.target.value)}
                  rows={3} style={{ ...m.input, resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div style={m.toggleRow}>
                <Toggle checked={form.is_available} onChange={v => set('is_available', v)} label="Available" />
                <Toggle checked={form.is_featured} onChange={v => set('is_featured', v)} label="Featured" />
              </div>
            </div>
          )}

          {tab === 'specs' && (
            <div style={m.grid2}>
              <Field label="Passenger Capacity" type="number" value={form.passenger_capacity} onChange={v => set('passenger_capacity', +v)} />
              <Field label="Cargo Capacity (kg)" type="number" value={form.cargo_capacity_kg} onChange={v => set('cargo_capacity_kg', +v)} />
              <Field label="Range (km)" type="number" value={form.range_km} onChange={v => set('range_km', +v)} />
              <Field label="Cruise Speed (km/h)" type="number" value={form.cruise_speed_kmh} onChange={v => set('cruise_speed_kmh', +v)} />
              <Field label="Max Altitude (ft)" type="number" value={form.max_altitude_ft} onChange={v => set('max_altitude_ft', +v)} />
              <Field label="Cabin Length (m)" type="number" value={form.cabin_length_m} onChange={v => set('cabin_length_m', v)} />
              <Field label="Cabin Height (m)" type="number" value={form.cabin_height_m} onChange={v => set('cabin_height_m', v)} />
              <Field label="Cabin Width (m)" type="number" value={form.cabin_width_m} onChange={v => set('cabin_width_m', v)} />
            </div>
          )}

          {tab === 'amenities' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={m.toggleGrid}>
                <Toggle checked={form.wifi} onChange={v => set('wifi', v)} label="Wi-Fi" />
                <Toggle checked={form.sleeping_arrangements} onChange={v => set('sleeping_arrangements', v)} label="Sleeping Arrangements" />
                <Toggle checked={form.galley} onChange={v => set('galley', v)} label="Galley" />
                <Toggle checked={form.lavatory} onChange={v => set('lavatory', v)} label="Lavatory" />
                <Toggle checked={form.entertainment_system} onChange={v => set('entertainment_system', v)} label="Entertainment System" />
              </div>
              <div>
                <label style={m.label}>Features (comma-separated)</label>
                <textarea
                  value={form.features} onChange={e => set('features', e.target.value)}
                  rows={3} style={{ ...m.input, resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
                  placeholder="Full-flat beds, Burl wood finishes, Sat-phone…"
                />
              </div>
            </div>
          )}

          {tab === 'media' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="Main Image URL" value={form.image_url} onChange={v => set('image_url', v)} />
              <Field label="Interior Image URL" value={form.interior_image_url} onChange={v => set('interior_image_url', v)} />
              <Field label="Thumbnail URL" value={form.thumbnail_url} onChange={v => set('thumbnail_url', v)} />
              {form.thumbnail_url && (
                <img src={form.thumbnail_url} alt="preview"
                  style={{ maxWidth: 200, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', marginTop: 4 }}
                  onError={e => { e.target.style.display = 'none' }}
                />
              )}
            </div>
          )}
        </div>

        <div style={m.footer}>
          <button onClick={onClose} style={m.cancelBtn}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={m.saveBtn}>
            {saving ? 'Saving…' : aircraft ? 'Update Aircraft' : 'Add to Fleet'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={m.label}>{label}</label>
      <input
        type={type} value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        style={m.input}
      />
    </div>
  )
}

export default function AdminFleet() {
  const [fleet, setFleet] = useState([])
  const [loading, setLoading] = useState(true)
  const [catFilter, setCatFilter] = useState('')
  const [selected, setSelected] = useState(null)   // edit
  const [adding, setAdding] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (catFilter) params.category = catFilter
      const data = await fetchFleet(params)
      setFleet(Array.isArray(data) ? data : data.results ?? [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [catFilter])

  useEffect(() => { load() }, [load])

  async function handleSave(form) {
    if (form.id) {
      await updateAircraft(form.id, form)
    } else {
      await createAircraft(form)
    }
    await load()
  }

  async function handleDelete(id) {
    if (!confirm('Remove this aircraft from the fleet?')) return
    await deleteAircraft(id)
    await load()
  }

  return (
    <AdminLayout title="Fleet Management">
      {(selected || adding) && (
        <AircraftModal
          aircraft={adding ? null : selected}
          onClose={() => { setSelected(null); setAdding(false) }}
          onSave={handleSave}
        />
      )}

      {/* Top bar */}
      <div style={s.topBar}>
        <div style={s.filterBtns}>
          <button onClick={() => setCatFilter('')} style={{ ...s.filterBtn, ...(catFilter === '' ? s.filterActive : {}) }}>All</button>
          {CATEGORIES.map(c => (
            <button key={c.value} onClick={() => setCatFilter(c.value)}
              style={{ ...s.filterBtn, ...(catFilter === c.value ? s.filterActive : {}) }}>
              {c.label}
            </button>
          ))}
        </div>
        <button onClick={() => setAdding(true)} style={s.addBtn}>
          <i className="bi-plus-lg" /> Add Aircraft
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={s.loading}>Loading fleet…</div>
      ) : (
        <div style={s.grid}>
          {fleet.map(a => (
            <div key={a.id} style={s.card}>
              {/* Image */}
              <div style={s.imageWrap}>
                {a.thumbnail_url || a.image_url ? (
                  <img src={a.thumbnail_url || a.image_url} alt={a.name} style={s.image} />
                ) : (
                  <div style={s.imagePlaceholder}>
                    <i className="bi-airplane" style={{ fontSize: 28, color: '#3a4555' }} />
                  </div>
                )}
                <div style={s.availBadge}>
                  <div style={{ ...s.availDot, background: a.is_available ? '#4ade80' : '#f87171' }} />
                  {a.is_available ? 'Available' : 'Unavailable'}
                </div>
                {a.is_featured && <div style={s.featuredTag}>★ Featured</div>}
              </div>

              {/* Info */}
              <div style={s.cardBody}>
                <div style={s.cardTop}>
                  <div>
                    <div style={s.cardName}>{a.name}</div>
                    <div style={s.cardReg}>{a.registration}</div>
                  </div>
                  <CategoryBadge category={a.category} />
                </div>

                <div style={s.specs}>
                  <Spec icon="bi-people" val={`${a.passenger_capacity} pax`} />
                  <Spec icon="bi-geo-alt" val={`${(a.range_km || 0).toLocaleString()} km`} />
                  <Spec icon="bi-speedometer2" val={`${a.cruise_speed_kmh} km/h`} />
                  {a.base_price_per_hour && (
                    <Spec icon="bi-currency-dollar" val={`$${Number(a.base_price_per_hour).toLocaleString()}/hr`} />
                  )}
                </div>

                <div style={s.amenities}>
                  {a.wifi && <AmenityDot label="Wi-Fi" />}
                  {a.sleeping_arrangements && <AmenityDot label="Beds" />}
                  {a.galley && <AmenityDot label="Galley" />}
                  {a.lavatory && <AmenityDot label="Lav." />}
                  {a.entertainment_system && <AmenityDot label="IFE" />}
                </div>

                <div style={s.cardActions}>
                  <button onClick={() => setSelected(a)} style={s.editBtn}>
                    <i className="bi-pencil" /> Edit
                  </button>
                  <button onClick={() => handleDelete(a.id)} style={s.deleteBtn}>
                    <i className="bi-trash" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={s.count}>{fleet.length} aircraft in fleet</div>
    </AdminLayout>
  )
}

function Spec({ icon, val }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#6a7888' }}>
      <i className={icon} style={{ fontSize: 11, color: '#4a5568' }} />
      {val}
    </div>
  )
}

function AmenityDot({ label }) {
  return (
    <span style={{
      fontSize: 10, padding: '2px 7px', borderRadius: 20,
      background: 'rgba(201,168,76,0.08)', color: '#c9a84c',
      border: '1px solid rgba(201,168,76,0.18)',
    }}>{label}</span>
  )
}

const s = {
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, flexWrap: 'wrap', gap: 12 },
  filterBtns: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  filterBtn: {
    background: 'none', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '5px 13px', color: '#4a5568',
    cursor: 'pointer', fontSize: 11, letterSpacing: '0.04em',
    transition: 'all 0.15s', fontFamily: "'Georgia', serif",
  },
  filterActive: {
    background: 'rgba(201,168,76,0.1)', color: '#c9a84c',
    border: '1px solid rgba(201,168,76,0.3)',
  },
  addBtn: {
    background: 'linear-gradient(135deg, #c9a84c, #a8882e)',
    border: 'none', borderRadius: 3, padding: '9px 18px',
    color: '#07090f', fontWeight: 700, fontSize: 12,
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
    letterSpacing: '0.06em', fontFamily: "'Georgia', serif",
  },
  loading: { color: '#3a4555', fontSize: 13, textAlign: 'center', paddingTop: 60 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
  },
  card: {
    background: '#0e1218', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 4, overflow: 'hidden',
    transition: 'border-color 0.2s',
  },
  imageWrap: { position: 'relative', height: 160, background: '#090c13', overflow: 'hidden' },
  image: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 },
  imagePlaceholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  availBadge: {
    position: 'absolute', bottom: 8, left: 10,
    display: 'flex', alignItems: 'center', gap: 5,
    background: 'rgba(7,9,15,0.8)', borderRadius: 20,
    padding: '3px 10px', fontSize: 10, color: '#8a9ab0',
  },
  availDot: { width: 6, height: 6, borderRadius: '50%' },
  featuredTag: {
    position: 'absolute', top: 8, right: 8,
    background: 'rgba(201,168,76,0.9)', color: '#07090f',
    fontSize: 9, padding: '3px 8px', borderRadius: 20,
    fontWeight: 700, letterSpacing: '0.06em',
  },
  cardBody: { padding: '14px 16px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  cardName: { fontSize: 15, color: '#e0e8f0', marginBottom: 2 },
  cardReg: { fontSize: 10, color: '#3a4555', fontFamily: 'monospace', letterSpacing: '0.08em' },
  specs: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', marginBottom: 10 },
  amenities: { display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 },
  cardActions: { display: 'flex', gap: 8, justifyContent: 'flex-end' },
  editBtn: {
    background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 3, padding: '6px 14px', color: '#c9a84c',
    cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', gap: 5,
    fontFamily: "'Georgia', serif",
  },
  deleteBtn: {
    background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)',
    borderRadius: 3, padding: '6px 10px', color: '#f87171',
    cursor: 'pointer', fontSize: 12, fontFamily: "'Georgia', serif",
  },
  count: { fontSize: 11, color: '#3a4555', marginTop: 12, textAlign: 'right', letterSpacing: '0.06em' },
}

const m = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: 24,
  },
  modal: {
    background: '#0e1218', border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 4, width: '100%', maxWidth: 680,
    maxHeight: '90vh', overflow: 'auto',
    boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
    fontFamily: "'Georgia', serif",
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  modalSub: { fontSize: 10, color: '#3a4555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 },
  modalTitle: { fontSize: 18, color: '#e0e8f0', fontWeight: 400 },
  closeBtn: { background: 'none', border: 'none', color: '#4a5568', cursor: 'pointer', fontSize: 16, padding: 4 },
  tabs: {
    display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)',
    padding: '0 24px',
  },
  tab: {
    background: 'none', border: 'none', borderBottom: '2px solid transparent',
    padding: '10px 16px', color: '#4a5568', cursor: 'pointer',
    fontSize: 12, letterSpacing: '0.04em', fontFamily: "'Georgia', serif",
    transition: 'all 0.15s',
  },
  tabActive: { color: '#c9a84c', borderBottomColor: '#c9a84c' },
  body: { padding: '20px 24px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  span2: { gridColumn: '1 / -1' },
  label: { fontSize: 10, color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase' },
  input: {
    background: '#070a10', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 3, padding: '9px 12px', color: '#c0cad8', fontSize: 13,
    outline: 'none', fontFamily: "'Georgia', serif", width: '100%',
    boxSizing: 'border-box',
  },
  toggleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px' },
  toggleRow: { display: 'flex', gap: 24, alignItems: 'center', gridColumn: '1 / -1' },
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
    cursor: 'pointer', letterSpacing: '0.06em', fontFamily: "'Georgia', serif",
  },
}