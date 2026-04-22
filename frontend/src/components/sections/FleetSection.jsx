import React from 'react'
import { Link } from 'react-router-dom'
import './FleetSection.css'

const featuredAircraft = [
  {
    name: 'Gulfstream G700',
    category: 'Ultra Long Range',
    range: '13,890 km',
    passengers: 19,
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&q=80&auto=format&fit=crop',
    features: ['Wifi', 'Sleeping', 'Full Galley'],
  },
  {
    name: 'Bombardier Global 7500',
    category: 'Ultra Long Range',
    range: '14,260 km',
    passengers: 19,
    image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=800&q=80&auto=format&fit=crop',
    features: ['Wifi', '4 Zones', 'Master Suite'],
  },
  {
    name: 'Cessna Citation Longitude',
    category: 'Super Midsize',
    range: '7,223 km',
    passengers: 12,
    image: 'https://images.unsplash.com/photo-1559268950-06a7ce7c97a4?w=800&q=80&auto=format&fit=crop',
    features: ['Wifi', 'Flat Floor', 'Full Stand'],
  },
  {
    name: 'Airbus A319 Corporate Jet',
    category: 'Airliner / Group',
    range: '11,000 km',
    passengers: 50,
    image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80&auto=format&fit=crop',
    features: ['Conference', 'Wifi', 'Bedroom'],
  },
]

export default function FleetSection() {
  return (
    <section className="section section--cream fleet-section">
      <div className="container">
        <div className="section__header flex-between">
          <div>
            <p className="eyebrow">Our Fleet</p>
            <div className="divider" />
            <h2>World-Class Aircraft</h2>
          </div>
          <Link to="/fleet" className="btn btn--outline">
            View All Aircraft <i className="bi bi-arrow-right" />
          </Link>
        </div>

        <div className="fleet-grid">
          {featuredAircraft.map((ac, i) => (
            <div key={i} className="fleet-card">
              <div className="fleet-card__img-wrap">
                <img src={ac.image} alt={ac.name} loading="lazy" />
                <span className="fleet-card__category">{ac.category}</span>
              </div>
              <div className="fleet-card__body">
                <h4 className="fleet-card__name">{ac.name}</h4>
                <div className="fleet-card__specs">
                  <span><i className="bi bi-people" /> {ac.passengers} pax</span>
                  <span><i className="bi bi-geo-alt" /> {ac.range}</span>
                </div>
                <div className="fleet-card__features">
                  {ac.features.map(f => (
                    <span key={f} className="fleet-card__feature">
                      <i className="bi bi-check2" /> {f}
                    </span>
                  ))}
                </div>
                <Link to="/book?service=private_jet" className="fleet-card__book">
                  Charter This Aircraft <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}