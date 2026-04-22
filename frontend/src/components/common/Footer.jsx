import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <i className="bi bi-airplane-fill" />
              <div>
                <span>PRIME</span>
                <span className="footer__logo-sub">CHARTERS</span>
              </div>
            </div>
            <p className="footer__tagline">
              Redefining private aviation with precision, discretion, and uncompromising service excellence.
            </p>
            <div className="footer__social">
              {['linkedin', 'twitter-x', 'instagram', 'facebook'].map(s => (
                <a key={s} href="#" className="footer__social-link" aria-label={s}>
                  <i className={`bi bi-${s}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__heading">Services</h4>
            <ul className="footer__links">
              {[
                { to: '/private-jet', label: 'Private Jet Charter' },
                { to: '/group-charter', label: 'Group Air Charter' },
                { to: '/air-cargo', label: 'Air Cargo' },
                { to: '/aircraft-leasing', label: 'Aircraft Leasing (ACMI)' },
                { to: '/flight-support', label: 'Flight Support' },
              ].map(l => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Fleet */}
          <div className="footer__col">
            <h4 className="footer__heading">Fleet</h4>
            <ul className="footer__links">
              {['Light Jets', 'Midsize Jets', 'Heavy Jets', 'Ultra Long Range', 'Turboprops', 'Airliners', 'Cargo Aircraft'].map(f => (
                <li key={f}><Link to="/fleet">{f}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">Contact</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <i className="bi bi-telephone-fill" />
                <a href="tel:+18001234567">+1 800 123 4567</a>
              </div>
              <div className="footer__contact-item">
                <i className="bi bi-envelope-fill" />
                <a href="mailto:charter@primecharters.com">charter@primecharters.com</a>
              </div>
              <div className="footer__contact-item">
                <i className="bi bi-geo-alt-fill" />
                <span>Available 24/7 Worldwide</span>
              </div>
              <div className="footer__contact-item">
                <i className="bi bi-clock-fill" />
                <span>24h Operations Centre</span>
              </div>
            </div>
            <Link to="/book" className="btn btn--gold btn--sm footer__cta">
              Request a Quote <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Prime Charters. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}