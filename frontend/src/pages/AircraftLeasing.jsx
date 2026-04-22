// src/pages/AircraftLeasing.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { ServicePageHero, ServiceFeatureList, ServiceCTAStrip } from '../components/common/ServicePage'

const leasingTypes = [
  {
    icon: 'bi-calendar-range',
    title: 'Dry Lease',
    desc: 'Aircraft only — you provide the crew, maintenance, and insurance. Ideal for airlines and operators with existing AOC authority.',
  },
  {
    icon: 'bi-people',
    title: 'Wet Lease (ACMI)',
    desc: 'Aircraft, crew, maintenance, and insurance included. Fly under your own designator from day one.',
  },
  {
    icon: 'bi-clock-history',
    title: 'Short-Term Lease',
    desc: 'Flexible terms from 1 to 12 months. Perfect for seasonal capacity, fleet gaps, or sudden demand spikes.',
  },
  {
    icon: 'bi-file-earmark-text',
    title: 'Long-Term Lease',
    desc: 'Multi-year agreements with fixed monthly rates and full maintenance programmes. Plan your fleet with confidence.',
  },
  {
    icon: 'bi-arrow-left-right',
    title: 'Leaseback',
    desc: 'Sell your aircraft to us and lease it back immediately. Release capital while retaining full operational access.',
  },
  {
    icon: 'bi-graph-up-arrow',
    title: 'Fleet Expansion',
    desc: 'Rapidly scale your fleet without capital expenditure. We source, vet, and deliver airworthy aircraft on your timeline.',
  },
]

export default function AircraftLeasing() {
  return (
    <>
      <ServicePageHero
        eyebrow="Aircraft Leasing"
        title="Flexible Fleet Solutions"
        subtitle="Dry lease, wet lease, and ACMI solutions for airlines, operators, and charter companies. Scale your fleet on your terms."
        image="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1600&q=85&auto=format&fit=crop"
      >
        <Link to="/book?service=aircraft_leasing" className="btn btn--gold btn--lg">
          <i className="bi bi-send" /> Enquire Now
        </Link>
      </ServicePageHero>

      {/* Leasing types */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <p className="eyebrow">Leasing Options</p>
            <div className="divider" />
            <h2>A Structure for Every Need</h2>
            <p style={{ color: 'var(--clr-grey)', marginTop: 'var(--space-sm)' }}>
              From short-term ACMI to multi-year dry lease — we structure the deal around your operation.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
            {leasingTypes.map(t => (
              <div key={t.title} className="card" style={{ padding: 'var(--space-lg)' }}>
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
                  <i className={`bi ${t.icon}`} style={{ color: '#fff', fontSize: '1.3rem' }} />
                </div>
                <h4 style={{ marginBottom: '0.5rem' }}>{t.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--clr-grey)', lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section--cream">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-xl)' }}>
            <div>
              <p className="eyebrow">Why Lease With Prime</p>
              <div className="divider" />
              <h2>Built for Operators</h2>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <ServiceFeatureList features={[
                  'Access to 300+ owned and managed aircraft globally',
                  'Lease terms from 30 days to 10 years',
                  'Full airworthiness and maintenance oversight',
                  'AOC and regulatory compliance support',
                  'Crew sourcing and training coordination',
                  'Flexible return conditions and lease extensions',
                  'Dedicated account manager throughout the lease',
                  'Purchase options available on select aircraft',
                ]} />
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop"
              alt="Aircraft on apron"
              style={{
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                width: '100%',
                aspectRatio: '4/3',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </section>

      <ServiceCTAStrip
        service="aircraft_leasing"
        heading="Ready to Grow Your Fleet?"
        sub="Speak with a leasing specialist and receive a tailored proposal within 24 hours."
      />
    </>
  )
}