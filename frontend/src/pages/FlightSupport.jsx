// src/pages/FlightSupport.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { ServicePageHero, ServiceFeatureList, ServiceCTAStrip } from '../components/common/ServicePage'

const services = [
  {
    icon: 'bi-clipboard2-check',
    title: 'Flight Planning',
    desc: 'Optimised routing, fuel stops, and overflight permits handled end-to-end by our operations team.',
  },
  {
    icon: 'bi-file-earmark-ruled',
    title: 'Permits & Slots',
    desc: 'Landing rights, slot coordination, diplomatic clearances, and overflight permits for 190+ countries.',
  },
  {
    icon: 'bi-fuel-pump',
    title: 'Fuel Management',
    desc: 'Competitive fuel uplifts at 3,000+ airports with into-plane services and fuel release coordination.',
  },
  {
    icon: 'bi-building',
    title: 'FBO & Handling',
    desc: 'VIP passenger handling, ground transport, catering, and crew accommodation arranged at every stop.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Trip Support',
    desc: 'Full-trip monitoring with a dedicated controller on call throughout the operation.',
  },
  {
    icon: 'bi-wrench-adjustable',
    title: 'AOG Support',
    desc: 'Aircraft-on-ground technical support, parts sourcing, and approved maintenance coordination worldwide.',
  },
]

export default function FlightSupport() {
  return (
    <>
      <ServicePageHero
        eyebrow="Flight Support"
        title="Every Detail, Handled"
        subtitle="Global flight support services for private operators, charter companies, and airline crews. From permits to fuel — we've got the ramp covered."
        image="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1600&q=85&auto=format&fit=crop"
      >
        <Link to="/book?service=flight_support" className="btn btn--gold btn--lg">
          <i className="bi bi-send" /> Request Support
        </Link>
      </ServicePageHero>

      {/* Services grid */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <p className="eyebrow">Our Services</p>
            <div className="divider" />
            <h2>End-to-End Trip Support</h2>
            <p style={{ color: 'var(--clr-grey)', marginTop: 'var(--space-sm)' }}>
              One point of contact for every element of your international operation.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
            {services.map(s => (
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
              src="https://images.unsplash.com/photo-1559268950-06a7ce7c97a4?w=800&q=80&auto=format&fit=crop"
              alt="Control tower"
              style={{
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                width: '100%',
                aspectRatio: '4/3',
                objectFit: 'cover',
              }}
            />
            <div>
              <p className="eyebrow">Included With Every Trip</p>
              <div className="divider" />
              <h2>The Prime Support Standard</h2>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <ServiceFeatureList features={[
                  '24/7 ops centre with live trip monitoring',
                  'Dedicated trip controller from planning to wheels-down',
                  'Overflight and landing permits for 190+ countries',
                  'Preferred FBO rates at 3,000+ airports',
                  'Weather briefings and NOTAMs included',
                  'Crew hotel and transport coordination',
                  'Customs and immigration facilitation',
                  'Full post-trip reporting on request',
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceCTAStrip
        service="flight_support"
        heading="Planning an International Operation?"
        sub="Our support team is available 24/7. Send us your trip details and we'll take it from there."
      />
    </>
  )
}