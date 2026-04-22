import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './BookingForm.css'

const API = 'http://localhost:8000/api'

const SERVICE_ENDPOINTS = {
  private_jet: `${API}/bookings/`,
  group_charter: `${API}/bookings/`,
  air_cargo: `${API}/cargo/`,
  acmi_leasing: `${API}/leasing/`,
  flight_support: `${API}/flight-support/`,
}

export default function BookingForm({ defaultService = 'private_jet', compact = false }) {
  const navigate = useNavigate()
  const [service, setService] = useState(defaultService)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    client_name: '', client_email: '', client_phone: '',
    client_company: '', origin: '', destination: '',
    departure_date: '', passenger_count: 1,
    return_date: '', is_return: false,
    special_requests: '', catering_required: false,
    // Cargo-specific
    cargo_type: 'general', description: '', weight_kg: '',
    ready_date: '',
    // Leasing-specific
    lease_type: 'acmi', preferred_aircraft_type: '',
    start_date: '', end_date: '', primary_base: '',
    // Support-specific
    support_type: 'full', flight_date: '', details: '',
    aircraft_registration: '',
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const buildPayload = () => {
    const base = {
      client_name: form.client_name, client_email: form.client_email,
      client_phone: form.client_phone, client_company: form.client_company,
    }
    if (service === 'air_cargo') {
      return { ...base, cargo_type: form.cargo_type, description: form.description,
        weight_kg: parseFloat(form.weight_kg) || 0, origin: form.origin,
        destination: form.destination, ready_date: form.ready_date }
    }
    if (service === 'acmi_leasing') {
      return { ...base, lease_type: form.lease_type,
        preferred_aircraft_type: form.preferred_aircraft_type,
        start_date: form.start_date, end_date: form.end_date,
        primary_base: form.primary_base }
    }
    if (service === 'flight_support') {
      return { ...base, support_type: form.support_type,
        origin: form.origin, destination: form.destination,
        flight_date: form.flight_date, details: form.details,
        aircraft_registration: form.aircraft_registration }
    }
    // Default: booking (private jet / group charter)
    return { ...base, service_type: service, origin: form.origin,
      destination: form.destination, departure_date: form.departure_date,
      passenger_count: parseInt(form.passenger_count),
      is_return: form.is_return, return_date: form.return_date || undefined,
      special_requests: form.special_requests,
      catering_required: form.catering_required }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const endpoint = SERVICE_ENDPOINTS[service]
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      })
      const data = await res.json()
      if (!res.ok) {
        const msgs = Object.values(data).flat().join(' ')
        throw new Error(msgs || 'Submission failed. Please try again.')
      }
      navigate('/booking-confirmation', { state: { reference: data.reference, service } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const isBooking = service === 'private_jet' || service === 'group_charter'
  const isCargo = service === 'air_cargo'
  const isLeasing = service === 'acmi_leasing'
  const isSupport = service === 'flight_support'

  return (
    <form className={`booking-form${compact ? ' booking-form--compact' : ''}`} onSubmit={handleSubmit}>
      {/* Service selector */}
      <div className="booking-form__service-tabs">
        {[
          { val: 'private_jet', icon: 'bi-airplane', label: 'Private Jet' },
          { val: 'group_charter', icon: 'bi-people-fill', label: 'Group Charter' },
          { val: 'air_cargo', icon: 'bi-box-seam', label: 'Air Cargo' },
          { val: 'acmi_leasing', icon: 'bi-file-earmark-text', label: 'Leasing' },
          { val: 'flight_support', icon: 'bi-headset', label: 'Flight Support' },
        ].map(s => (
          <button
            type="button"
            key={s.val}
            className={`booking-form__tab${service === s.val ? ' active' : ''}`}
            onClick={() => setService(s.val)}
          >
            <i className={`bi ${s.icon}`} />
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <div className="booking-form__body">
        {/* Client info — always shown */}
        <div className="booking-form__section">
          <p className="booking-form__section-title">Contact Details</p>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" required value={form.client_name}
                onChange={e => set('client_name', e.target.value)} placeholder="John Smith" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input className="form-input" type="email" required value={form.client_email}
                onChange={e => set('client_email', e.target.value)} placeholder="john@company.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input className="form-input" required value={form.client_phone}
                onChange={e => set('client_phone', e.target.value)} placeholder="+1 212 000 0000" />
            </div>
            <div className="form-group">
              <label className="form-label">Company / Organisation</label>
              <input className="form-input" value={form.client_company}
                onChange={e => set('client_company', e.target.value)} placeholder="Optional" />
            </div>
          </div>
        </div>

        {/* BOOKING fields */}
        {isBooking && (
          <div className="booking-form__section">
            <p className="booking-form__section-title">Flight Details</p>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">From (City / Airport) *</label>
                <input className="form-input" required value={form.origin}
                  onChange={e => set('origin', e.target.value)} placeholder="London Luton (EGGW)" />
              </div>
              <div className="form-group">
                <label className="form-label">To (City / Airport) *</label>
                <input className="form-input" required value={form.destination}
                  onChange={e => set('destination', e.target.value)} placeholder="Nice (LFMN)" />
              </div>
              <div className="form-group">
                <label className="form-label">Departure Date *</label>
                <input className="form-input" type="date" required value={form.departure_date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => set('departure_date', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Passengers *</label>
                <input className="form-input" type="number" min={1} max={500} required
                  value={form.passenger_count}
                  onChange={e => set('passenger_count', e.target.value)} />
              </div>
            </div>
            <div className="booking-form__checkbox-row">
              <label className="booking-form__checkbox">
                <input type="checkbox" checked={form.is_return}
                  onChange={e => set('is_return', e.target.checked)} />
                <span>Return flight</span>
              </label>
              <label className="booking-form__checkbox">
                <input type="checkbox" checked={form.catering_required}
                  onChange={e => set('catering_required', e.target.checked)} />
                <span>Catering required</span>
              </label>
            </div>
            {form.is_return && (
              <div className="form-group" style={{ marginTop: 'var(--space-md)', maxWidth: '280px' }}>
                <label className="form-label">Return Date</label>
                <input className="form-input" type="date"
                  min={form.departure_date || new Date().toISOString().split('T')[0]}
                  value={form.return_date}
                  onChange={e => set('return_date', e.target.value)} />
              </div>
            )}
            <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
              <label className="form-label">Special Requests</label>
              <textarea className="form-textarea" value={form.special_requests}
                onChange={e => set('special_requests', e.target.value)}
                placeholder="Dietary requirements, VIP preferences, ground transport…" />
            </div>
          </div>
        )}

        {/* CARGO fields */}
        {isCargo && (
          <div className="booking-form__section">
            <p className="booking-form__section-title">Cargo Details</p>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Cargo Type *</label>
                <select className="form-select" required value={form.cargo_type}
                  onChange={e => set('cargo_type', e.target.value)}>
                  {[['general','General Cargo'],['perishable','Perishable / Fresh'],['dangerous','Dangerous Goods'],
                    ['oversized','Oversized / Heavy'],['live_animals','Live Animals'],
                    ['pharma','Pharmaceutical'],['valuables','Valuables / Artwork']].map(([v,l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Weight (kg) *</label>
                <input className="form-input" type="number" min={1} required
                  value={form.weight_kg} onChange={e => set('weight_kg', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">From *</label>
                <input className="form-input" required value={form.origin}
                  onChange={e => set('origin', e.target.value)} placeholder="Origin airport/city" />
              </div>
              <div className="form-group">
                <label className="form-label">To *</label>
                <input className="form-input" required value={form.destination}
                  onChange={e => set('destination', e.target.value)} placeholder="Destination airport/city" />
              </div>
              <div className="form-group">
                <label className="form-label">Ready Date *</label>
                <input className="form-input" type="date" required value={form.ready_date}
                  onChange={e => set('ready_date', e.target.value)} />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
              <label className="form-label">Cargo Description *</label>
              <textarea className="form-textarea" required value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Describe the goods, packaging, any special handling requirements…" />
            </div>
          </div>
        )}

        {/* LEASING fields */}
        {isLeasing && (
          <div className="booking-form__section">
            <p className="booking-form__section-title">Leasing Requirements</p>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Lease Type *</label>
                <select className="form-select" required value={form.lease_type}
                  onChange={e => set('lease_type', e.target.value)}>
                  <option value="acmi">ACMI (Aircraft, Crew, Maintenance, Insurance)</option>
                  <option value="dry">Dry Lease (Aircraft Only)</option>
                  <option value="wet">Wet Lease (Full Service)</option>
                  <option value="damp">Damp Lease</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Aircraft Type *</label>
                <input className="form-input" required value={form.preferred_aircraft_type}
                  onChange={e => set('preferred_aircraft_type', e.target.value)}
                  placeholder="e.g. Boeing 737-800, Airbus A320" />
              </div>
              <div className="form-group">
                <label className="form-label">Lease Start Date *</label>
                <input className="form-input" type="date" required value={form.start_date}
                  onChange={e => set('start_date', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Lease End Date *</label>
                <input className="form-input" type="date" required value={form.end_date}
                  onChange={e => set('end_date', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Primary Base Airport *</label>
                <input className="form-input" required value={form.primary_base}
                  onChange={e => set('primary_base', e.target.value)} placeholder="e.g. Nairobi JKIA (HKJK)" />
              </div>
            </div>
          </div>
        )}

        {/* FLIGHT SUPPORT fields */}
        {isSupport && (
          <div className="booking-form__section">
            <p className="booking-form__section-title">Support Requirements</p>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Support Type *</label>
                <select className="form-select" required value={form.support_type}
                  onChange={e => set('support_type', e.target.value)}>
                  {[['full','Full Trip Support'],['permits','Overflight & Landing Permits'],
                    ['handling','Ground Handling'],['fuel','Fuel Uplift'],['catering','Catering'],
                    ['crew','Crew Accommodation'],['slots','Slot Coordination'],
                    ['customs','Customs & Immigration']].map(([v,l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Aircraft Registration</label>
                <input className="form-input" value={form.aircraft_registration}
                  onChange={e => set('aircraft_registration', e.target.value)} placeholder="e.g. 5Y-PCA" />
              </div>
              <div className="form-group">
                <label className="form-label">From *</label>
                <input className="form-input" required value={form.origin}
                  onChange={e => set('origin', e.target.value)} placeholder="Origin airport" />
              </div>
              <div className="form-group">
                <label className="form-label">To *</label>
                <input className="form-input" required value={form.destination}
                  onChange={e => set('destination', e.target.value)} placeholder="Destination airport" />
              </div>
              <div className="form-group">
                <label className="form-label">Flight Date *</label>
                <input className="form-input" type="date" required value={form.flight_date}
                  onChange={e => set('flight_date', e.target.value)} />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
              <label className="form-label">Additional Details *</label>
              <textarea className="form-textarea" required value={form.details}
                onChange={e => set('details', e.target.value)}
                placeholder="Provide any additional context or requirements…" />
            </div>
          </div>
        )}

        {error && (
          <div className="booking-form__error">
            <i className="bi bi-exclamation-triangle" /> {error}
          </div>
        )}

        <div className="booking-form__footer">
          <p className="booking-form__note">
            <i className="bi bi-shield-check" />
            No account required. Our team responds within 2 hours.
          </p>
          <button type="submit" className="btn btn--gold btn--lg" disabled={loading}>
            {loading ? <><span className="spinner" /> Submitting…</> : <><i className="bi bi-send" /> Submit Request</>}
          </button>
        </div>
      </div>
    </form>
  )
}