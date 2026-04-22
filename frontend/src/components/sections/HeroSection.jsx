import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HeroSection.css'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="hero">
      {/* Background */}
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1800&q=85&auto=format&fit=crop"
          alt="Private jet interior"
          className="hero__bg-img"
        />
        <div className="hero__bg-overlay" />
      </div>

      <div className="container hero__content">
        <div className="hero__text fade-up">
          <p className="eyebrow" style={{ color: 'rgba(212,172,22,0.9)' }}>
            Global Private Aviation
          </p>
          <h1 className="hero__headline fade-up fade-up--d1">
            Your Sky,<br />
            <em>Your Schedule.</em>
          </h1>
          <p className="hero__sub fade-up fade-up--d2">
            Seamless private jet, group charter, cargo, and aircraft leasing solutions — available worldwide, 24 hours a day.
          </p>

          {/* Quick service buttons */}
          <div className="hero__services fade-up fade-up--d3">
            {[
              { icon: 'bi-airplane', label: 'Private Jet', to: '/private-jet' },
              { icon: 'bi-people-fill', label: 'Group Charter', to: '/group-charter' },
              { icon: 'bi-box-seam', label: 'Air Cargo', to: '/air-cargo' },
              { icon: 'bi-file-earmark-text', label: 'Leasing', to: '/aircraft-leasing' },
            ].map(s => (
              <button key={s.to} className="hero__service-pill" onClick={() => navigate(s.to)}>
                <i className={`bi ${s.icon}`} />
                {s.label}
              </button>
            ))}
          </div>

          <div className="hero__ctas fade-up fade-up--d4">
            <button className="btn btn--gold btn--lg" onClick={() => navigate('/book')}>
              <i className="bi bi-send" /> Request a Quote
            </button>
            <button className="btn btn--outline-white btn--lg" onClick={() => navigate('/fleet')}>
              <i className="bi bi-grid-3x3-gap" /> Explore Fleet
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="hero__stats fade-up fade-up--d4">
          {[
            { value: '500+', label: 'Aircraft Available' },
            { value: '180+', label: 'Countries Served' },
            { value: '24/7', label: 'Operations Centre' },
            { value: '15K+', label: 'Flights Completed' },
          ].map(s => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <span />
      </div>
    </section>
  )
}