// src/pages/BookingPage.jsx
import React, { useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

const serviceLabels = {
  private_jet: 'Private Jet Charter',
  group_charter: 'Group Charter',
  air_cargo: 'Air Cargo',
  aircraft_leasing: 'Aircraft Leasing',
  flight_support: 'Flight Support',
}

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const service = searchParams.get('service') || 'private_jet'

  const [form, setForm] = useState({
    service,
    name: '',
    email: '',
    phone: '',
    from: '',
    to: '',
    date: '',
    returnDate: '',
    passengers: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000))
    navigate('/booking-confirmation')
  }

  const fieldStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1.5px solid var(--clr-border, #e5e5e5)',
    borderRadius: 'var(--radius-md, 8px)',
    fontSize: '0.95rem',
    background: '#fff',
    color: 'var(--clr-body, #222)',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 600,
    marginBottom: '0.4rem',
    color: 'var(--clr-body, #222)',
    letterSpacing: '0.03em',
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <p className="eyebrow">Charter Enquiry</p>
          <div className="divider" />
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>Request a Quote</h1>
          <p style={{ color: 'var(--clr-grey)', marginTop: 'var(--space-sm)' }}>
            Fill in your trip details and a flight coordinator will respond within the hour.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Service selector */}
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <label style={labelStyle}>Service</label>
            <select name="service" value={form.service} onChange={handle} style={fieldStyle} required>
              {Object.entries(serviceLabels).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {/* Personal info */}
          <div className="grid-2" style={{ gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input name="name" value={form.name} onChange={handle} style={fieldStyle} placeholder="Jane Smith" required />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handle} style={fieldStyle} placeholder="jane@example.com" required />
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-md)' }}>
            <label style={labelStyle}>Phone Number</label>
            <input name="phone" type="tel" value={form.phone} onChange={handle} style={fieldStyle} placeholder="+1 800 000 0000" />
          </div>

          {/* Route */}
          <div className="grid-2" style={{ gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
            <div>
              <label style={labelStyle}>Departure Airport / City</label>
              <input name="from" value={form.from} onChange={handle} style={fieldStyle} placeholder="London Luton (LTN)" required />
            </div>
            <div>
              <label style={labelStyle}>Destination Airport / City</label>
              <input name="to" value={form.to} onChange={handle} style={fieldStyle} placeholder="Dubai (DXB)" required />
            </div>
          </div>

          {/* Dates & pax */}
          <div className="grid-3" style={{ gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
            <div>
              <label style={labelStyle}>Departure Date</label>
              <input name="date" type="date" value={form.date} onChange={handle} style={fieldStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Return Date (optional)</label>
              <input name="returnDate" type="date" value={form.returnDate} onChange={handle} style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>Passengers</label>
              <input name="passengers" type="number" min="1" value={form.passengers} onChange={handle} style={fieldStyle} placeholder="4" required />
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <label style={labelStyle}>Additional Requirements</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handle}
              rows={4}
              style={{ ...fieldStyle, resize: 'vertical' }}
              placeholder="Catering preferences, pet travel, cargo requirements, special requests…"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn--gold btn--lg"
            style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
          >
            {submitting
              ? <><i className="bi bi-hourglass-split" /> Submitting…</>
              : <><i className="bi bi-send" /> Submit Enquiry</>}
          </button>

          <p style={{ fontSize: '0.8rem', color: 'var(--clr-grey)', textAlign: 'center', marginTop: 'var(--space-md)' }}>
            No payment required. A coordinator will contact you within 60 minutes.
          </p>
        </form>
      </div>
    </section>
  )
}