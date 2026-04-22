import React from 'react'
import { Link } from 'react-router-dom'
import './ServicePage.css'

export function ServicePageHero({ icon, eyebrow, title, subtitle, image, children }) {
  return (
    <div className="service-hero">
      <img src={image} alt={title} className="service-hero__img" />
      <div className="service-hero__overlay" />
      <div className="container service-hero__content">
        <p className="eyebrow" style={{ color: 'rgba(212,172,22,0.9)' }}>{eyebrow}</p>
        <div className="divider" style={{ background: 'var(--clr-gold)' }} />
        <h1 className="service-hero__title">{title}</h1>
        <p className="service-hero__sub">{subtitle}</p>
        {children}
      </div>
    </div>
  )
}

export function ServiceFeatureList({ features }) {
  return (
    <ul className="service-features">
      {features.map((f, i) => (
        <li key={i} className="service-features__item">
          <i className="bi bi-check2-circle" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  )
}

export function ServiceCTAStrip({ service }) {
  return (
    <div className="service-cta-strip">
      <div className="container flex-between">
        <div>
          <p className="service-cta-strip__title">Ready to get started?</p>
          <p className="service-cta-strip__sub">No account needed — get a quote in minutes.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <a href="tel:+18001234567" className="btn btn--outline btn--lg">
            <i className="bi bi-telephone" /> Call Us
          </a>
          <Link to={`/book?service=${service}`} className="btn btn--gold btn--lg">
            <i className="bi bi-send" /> Request Quote
          </Link>
        </div>
      </div>
    </div>
  )
}