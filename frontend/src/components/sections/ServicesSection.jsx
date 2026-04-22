import React from 'react'
import ServiceCard from '../common/ServiceCard'
import './ServicesSection.css'

const services = [
  {
    icon: 'bi-airplane',
    title: 'Private Jet Charter',
    description: 'Fly on your terms. Access 500+ aircraft from light jets to ultra-long-range, departing from any airport worldwide.',
    to: '/private-jet',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: 'bi-people-fill',
    title: 'Group Air Charter',
    description: 'Move teams, delegations, or sports groups with dedicated aircraft configured for your group\'s needs.',
    to: '/group-charter',
    image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: 'bi-box-seam',
    title: 'Air Cargo',
    description: 'Time-critical freight solutions for any cargo type — from fresh produce to oversized industrial equipment.',
    to: '/air-cargo',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: 'bi-file-earmark-text',
    title: 'Aircraft Leasing',
    description: 'ACMI, dry, and wet lease solutions for airlines and operators. Flexible terms, full documentation support.',
    to: '/aircraft-leasing',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: 'bi-headset',
    title: 'Flight Support',
    description: 'Permits, ground handling, fuel uplift, catering, and full trip support — wherever your aircraft operates.',
    to: '/flight-support',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80&auto=format&fit=crop',
  },
]

export default function ServicesSection() {
  return (
    <section className="section services-section">
      <div className="container">
        <div className="section__header">
          <p className="eyebrow">What We Offer</p>
          <div className="divider" />
          <h2>Complete Aviation Solutions</h2>
          <p className="services-section__sub">
            From a single seat to an entire fleet — we handle every aspect of your aviation requirement.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}