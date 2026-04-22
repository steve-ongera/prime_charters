import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/sections/HeroSection'
import ServicesSection from '../components/sections/ServicesSection'
import FleetSection from '../components/sections/FleetSection'
import BookingForm from '../components/sections/BookingForm'
import './Home.css'

const testimonials = [
  {
    quote: "Prime Charters arranged a last-minute flight from Nairobi to Geneva with less than 4 hours notice. Flawless execution.",
    name: "James K.", role: "CEO, Meridian Capital", rating: 5,
  },
  {
    quote: "The cargo team handled our time-sensitive pharmaceutical shipment with absolute precision. Highly recommended.",
    name: "Sarah O.", role: "Logistics Director, PharmaCo", rating: 5,
  },
  {
    quote: "ACMI leasing process was smooth and transparent. Their fleet team found exactly what we needed within 24 hours.",
    name: "Ahmed R.", role: "Fleet Manager, Atlas Air", rating: 5,
  },
]

export default function Home() {
  return (
    <>
      <HeroSection />

      <ServicesSection />

      {/* Why Prime Charters */}
      <section className="section why-section">
        <div className="container">
          <div className="why-section__grid">
            <div className="why-section__left">
              <p className="eyebrow">Why Choose Us</p>
              <div className="divider" />
              <h2>Aviation Expertise<br /><em>You Can Trust</em></h2>
              <p style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-lg)', color: 'var(--clr-grey-dark)' }}>
                With over a decade in private aviation, Prime Charters delivers unmatched service across every touchpoint — from initial enquiry to wheels-down.
              </p>
              <div className="why-section__pillars">
                {[
                  { icon: 'bi-shield-check', title: 'Safety First', desc: 'All operators are IATA, IS-BAO, or ARG/US rated. Safety is non-negotiable.' },
                  { icon: 'bi-clock', title: '24/7 Operations', desc: 'Round-the-clock team across time zones — always reachable, always ready.' },
                  { icon: 'bi-globe2', title: 'Global Network', desc: 'Access to 10,000+ airports across 180 countries, including private FBOs.' },
                  { icon: 'bi-person-check', title: 'No Account Needed', desc: 'Submit a request, get a quote. Simple, fast, and private.' },
                ].map(p => (
                  <div key={p.title} className="why-pillar">
                    <div className="why-pillar__icon">
                      <i className={`bi ${p.icon}`} />
                    </div>
                    <div>
                      <h4 className="why-pillar__title">{p.title}</h4>
                      <p className="why-pillar__desc">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-section__right">
              <div className="why-section__img-stack">
                <img
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=85&auto=format&fit=crop"
                  alt="Private aircraft on tarmac"
                  className="why-section__img-main"
                />
                <img
                  src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=400&q=80&auto=format&fit=crop"
                  alt="Luxury jet interior"
                  className="why-section__img-accent"
                />
                <div className="why-section__badge">
                  <span className="why-section__badge-value">15K+</span>
                  <span className="why-section__badge-label">Flights<br />Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FleetSection />

      {/* Booking CTA section */}
      <section className="section booking-cta-section">
        <div className="container">
          <div className="booking-cta-section__header section__header--center">
            <p className="eyebrow">Request a Quote</p>
            <div className="divider divider--center" />
            <h2>Ready to Fly?</h2>
            <p style={{ color: 'var(--clr-grey)', maxWidth: '480px', margin: '0.75rem auto 0' }}>
              No account required. Fill in your details and our team will respond within 2 hours with a personalised quote.
            </p>
          </div>
          <div className="booking-cta-section__form">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--navy testimonials-section">
        <div className="container">
          <div className="section__header section__header--center">
            <p className="eyebrow" style={{ color: 'rgba(212,172,22,0.8)' }}>Client Testimonials</p>
            <div className="divider divider--center" />
            <h2 style={{ color: 'var(--clr-white)' }}>What Our Clients Say</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <i key={j} className="bi bi-star-fill" />
                  ))}
                </div>
                <p className="testimonial-card__quote">"{t.quote}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container flex-between">
          <div>
            <h3 className="cta-banner__title">Need to fly urgently?</h3>
            <p className="cta-banner__sub">Our 24/7 operations team is standing by.</p>
          </div>
          <div className="cta-banner__actions">
            <a href="tel:+18001234567" className="btn btn--outline-white btn--lg">
              <i className="bi bi-telephone" /> Call Now
            </a>
            <Link to="/book" className="btn btn--gold btn--lg">
              <i className="bi bi-send" /> Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}