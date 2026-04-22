// src/pages/AirCargo.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { ServicePageHero, ServiceFeatureList, ServiceCTAStrip } from '../components/common/ServicePage'

const solutions = [
  {
    icon: 'bi-box-seam',
    title: 'Express Freight',
    desc: 'Time-critical shipments delivered door-to-door within hours, not days. 24/7 handling and priority loading.',
  },
  {
    icon: 'bi-thermometer-half',
    title: 'Temperature-Controlled',
    desc: 'Pharmaceuticals, perishables, and biologics transported in certified cold-chain conditions throughout.',
  },
  {
    icon: 'bi-shield-lock',
    title: 'High-Value & Secure',
    desc: 'Art, jewellery, cash, and sensitive documents moved with armed escort and full chain-of-custody documentation.',
  },
  {
    icon: 'bi-truck',
    title: 'Oversized & Heavy Lift',
    desc: 'Industrial equipment, machinery, and outsized cargo on freighters with nose-loading or main-deck capacity.',
  },
  {
    icon: 'bi-heart-pulse',
    title: 'Medical & AOG',
    desc: 'Aircraft-on-ground parts and medical supplies dispatched within 2 hours to minimise downtime and save lives.',
  },
  {
    icon: 'bi-globe',
    title: 'Charter Consolidation',
    desc: 'Part-charter and shared freighter options to optimise cost on lower-density routes.',
  },
]

export default function AirCargo() {
  return (
    <>
      <ServicePageHero
        eyebrow="Air Cargo Charter"
        title="Freight That Can't Wait"
        subtitle="Dedicated air cargo charters for time-critical, high-value, and oversized shipments. Global reach, 24/7 operations, zero compromises."
        image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=85&auto=format&fit=crop"
      >
        <Link to="/book?service=air_cargo" className="btn btn--gold btn--lg">
          <i className="bi bi-send" /> Request a Quote
        </Link>
      </ServicePageHero>

      {/* Solutions grid */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <p className="eyebrow">Cargo Solutions</p>
            <div className="divider" />
            <h2>What We Move</h2>
            <p style={{ color: 'var(--clr-grey)', marginTop: 'var(--space-sm)' }}>
              From critical spare parts to fine art — if it needs to fly, we make it happen.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
            {solutions.map(s => (
              <div key={s.title} className="card" style={{ padding: 'var(--space-lg)' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md, 8px)',
                    background: 'var(--clr-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  <i className={`bi ${s.icon}`} style={{ color: '#fff', fontSize: '1.3rem' }} />
                </div>
                <h4 style={{ marginBottom: '0.5rem' }}>{s.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--clr-grey)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section--cream">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-xl)' }}>
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80&auto=format&fit=crop"
              alt="Cargo loading"
              style={{
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                width: '100%',
                aspectRatio: '4/3',
                objectFit: 'cover',
              }}
            />
            <div>
              <p className="eyebrow">Every Shipment Includes</p>
              <div className="divider" />
              <h2>The Prime Cargo Standard</h2>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <ServiceFeatureList features={[
                  'Dedicated cargo coordinator from booking to delivery',
                  'Real-time shipment tracking and status updates',
                  'IATA-certified dangerous goods handling',
                  'Full customs brokerage and documentation support',
                  'Insurance arranged on request',
                  'Ground transport and last-mile coordination',
                  'Access to 500+ freighter aircraft worldwide',
                  'Transparent all-in pricing with no hidden surcharges',
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceCTAStrip
        service="air_cargo"
        heading="Need to Ship Urgently?"
        sub="Our cargo team is available around the clock. Get a freight quote within 30 minutes."
      />
    </>
  )
}