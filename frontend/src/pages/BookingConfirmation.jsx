// src/pages/BookingConfirmation.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function BookingConfirmation() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 600, textAlign: 'center', padding: 'var(--space-xxl) var(--space-md)' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'var(--clr-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-lg)',
          }}
        >
          <i className="bi bi-check-lg" style={{ color: '#fff', fontSize: '2rem' }} />
        </div>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: 'var(--space-md)' }}>
          Enquiry Received
        </h1>
        <p style={{ color: 'var(--clr-grey)', lineHeight: 1.7, marginBottom: 'var(--space-lg)', fontSize: '1.05rem' }}>
          Thank you for your enquiry. A dedicated flight coordinator will review your request and be in touch within <strong>60 minutes</strong>.
        </p>

        <div
          className="card"
          style={{ padding: 'var(--space-lg)', textAlign: 'left', marginBottom: 'var(--space-xl)' }}
        >
          <h4 style={{ marginBottom: 'var(--space-md)' }}>What Happens Next</h4>
          {[
            { icon: 'bi-envelope-check', text: 'You will receive a confirmation email shortly.' },
            { icon: 'bi-headset', text: 'A coordinator will call or email within 60 minutes.' },
            { icon: 'bi-file-earmark-text', text: 'We will send a tailored quote with aircraft options.' },
            { icon: 'bi-calendar-check', text: 'Once approved, we confirm and lock in your booking.' },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: i < 3 ? 'var(--space-md)' : 0 }}>
              <i className={`bi ${step.icon}`} style={{ color: 'var(--clr-gold)', fontSize: '1.2rem', flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: '0.92rem', color: 'var(--clr-grey)', margin: 0 }}>{step.text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn--outline btn--lg">
            <i className="bi bi-house" /> Back to Home
          </Link>
          <a href="tel:+18001234567" className="btn btn--gold btn--lg">
            <i className="bi bi-telephone" /> Call Us Now
          </a>
        </div>
      </div>
    </section>
  )
}