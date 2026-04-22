//PrivateJet.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { ServicePageHero, ServiceFeatureList, ServiceCTAStrip } from '../components/common/ServicePage'

const categories = [
  { name: 'Light Jet', range: 'Up to 4,000 km', pax: '6–8', example: 'Citation CJ4, Phenom 300', img: 'https://images.unsplash.com/photo-1559268950-06a7ce7c97a4?w=600&q=80&auto=format&fit=crop' },
  { name: 'Midsize Jet', range: 'Up to 5,500 km', pax: '7–9', example: 'Hawker 900XP, Citation XLS+', img: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600&q=80&auto=format&fit=crop' },
  { name: 'Super Midsize', range: 'Up to 7,500 km', pax: '9–12', example: 'Citation Longitude, Challenger 350', img: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=600&q=80&auto=format&fit=crop' },
  { name: 'Heavy Jet', range: 'Up to 11,000 km', pax: '12–16', example: 'Gulfstream G550, Falcon 900', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80&auto=format&fit=crop' },
  { name: 'Ultra Long Range', range: '13,000+ km', pax: '14–19', example: 'G700, Global 7500', img: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=600&q=80&auto=format&fit=crop' },
  { name: 'Helicopter', range: 'Short-haul', pax: '4–8', example: 'AW139, EC145', img: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&q=80&auto=format&fit=crop' },
]

export default function PrivateJet() {
  return (
    <>
      <ServicePageHero
        eyebrow="Private Jet Charter"
        title="Fly Private, Fly Prime"
        subtitle="Bespoke private jet hire from 10,000+ FBOs worldwide. Depart when you want, land where you choose — with full concierge from enquiry to arrival."
        image="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1600&q=85&auto=format&fit=crop"
      >
        <Link to="/book?service=private_jet" className="btn btn--gold btn--lg">
          <i className="bi bi-send" /> Request a Quote
        </Link>
      </ServicePageHero>

      {/* Aircraft categories */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <p className="eyebrow">Choose Your Aircraft</p>
            <div className="divider" />
            <h2>Find the Right Jet</h2>
            <p style={{ color: 'var(--clr-grey)', marginTop: 'var(--space-sm)' }}>
              Select a category that matches your range, group size, and comfort preference.
            </p>
          </div>
          <div className="grid-3" style={{ gap: 'var(--space-md)' }}>
            {categories.map(cat => (
              <div key={cat.name} className="card" style={{ cursor: 'pointer' }}>
                <img src={cat.img} alt={cat.name} style={{ height: 180, width: '100%', objectFit: 'cover' }} loading="lazy" />
                <div style={{ padding: 'var(--space-md)' }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>{cat.name}</h4>
                  <div style={{ display: 'flex', gap: 'var(--space-md)', fontSize: '0.82rem', color: 'var(--clr-grey)', marginBottom: '0.5rem' }}>
                    <span><i className="bi bi-people" style={{ color: 'var(--clr-gold)', marginRight: 4 }} />{cat.pax} pax</span>
                    <span><i className="bi bi-geo-alt" style={{ color: 'var(--clr-gold)', marginRight: 4 }} />{cat.range}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--clr-grey-light)' }}>{cat.example}</p>
                  <Link to="/book?service=private_jet" className="btn btn--outline btn--sm" style={{ marginTop: 'var(--space-md)' }}>
                    Book This Category
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section--cream">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p className="eyebrow">Included With Every Charter</p>
              <div className="divider" />
              <h2>The Prime Experience</h2>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <ServiceFeatureList features={[
                  'Dedicated flight coordinator from enquiry to landing',
                  'Access to 10,000+ private terminals and FBOs',
                  'In-flight catering customised to your preferences',
                  'Ground transportation arrangement on request',
                  'Visa and immigration assistance',
                  'Pet-friendly charter options available',
                  'No hidden fees — transparent all-in pricing',
                  'Empty leg and shared charter options for cost savings',
                ]} />
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&q=80&auto=format&fit=crop"
              alt="Jet interior"
              style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <ServiceCTAStrip service="private_jet" />
    </>
  )
}