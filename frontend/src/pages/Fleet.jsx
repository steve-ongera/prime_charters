// src/pages/Fleet.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ServicePageHero, ServiceCTAStrip } from '../components/common/ServicePage'

const fleet = [
  {
    category: 'Light Jet',
    aircraft: [
      {
        name: 'Citation CJ4',
        range: '3,200 km',
        pax: '7',
        speed: '778 km/h',
        img: 'https://images.unsplash.com/photo-1559268950-06a7ce7c97a4?w=700&q=80&auto=format&fit=crop',
        desc: 'The most popular light jet in the world. Perfect for short-haul regional trips with a refined cabin and best-in-class efficiency.',
        tag: 'Most Popular',
      },
      {
        name: 'Phenom 300E',
        range: '3,650 km',
        pax: '8',
        speed: '834 km/h',
        img: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=700&q=80&auto=format&fit=crop',
        desc: 'Award-winning light jet with a stand-up cabin and industry-leading range for its class.',
        tag: null,
      },
    ],
  },
  {
    category: 'Midsize Jet',
    aircraft: [
      {
        name: 'Citation XLS+',
        range: '4,400 km',
        pax: '9',
        speed: '850 km/h',
        img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80&auto=format&fit=crop',
        desc: 'Versatile midsize workhorse with a flat-floor cabin and outstanding short-field performance.',
        tag: null,
      },
      {
        name: 'Hawker 900XP',
        range: '5,000 km',
        pax: '8',
        speed: '830 km/h',
        img: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=700&q=80&auto=format&fit=crop',
        desc: 'Classic transatlantic-capable midsize jet with a wide club-four cabin ideal for business travel.',
        tag: null,
      },
    ],
  },
  {
    category: 'Super Midsize',
    aircraft: [
      {
        name: 'Challenger 350',
        range: '5,926 km',
        pax: '10',
        speed: '870 km/h',
        img: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=700&q=80&auto=format&fit=crop',
        desc: 'Best-selling super midsize jet with a true stand-up cabin, best-in-class baggage space, and coast-to-coast range.',
        tag: 'Best Seller',
      },
      {
        name: 'Citation Longitude',
        range: '6,500 km',
        pax: '12',
        speed: '956 km/h',
        img: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=700&q=80&auto=format&fit=crop',
        desc: 'The quietest, most fuel-efficient super midsize on the market with a full flat-floor cabin.',
        tag: null,
      },
    ],
  },
  {
    category: 'Heavy Jet',
    aircraft: [
      {
        name: 'Gulfstream G550',
        range: '11,112 km',
        pax: '16',
        speed: '956 km/h',
        img: 'https://images.unsplash.com/photo-1559268950-06a7ce7c97a4?w=700&q=80&auto=format&fit=crop',
        desc: 'Proven ultra-long-range heavy jet capable of non-stop intercontinental travel with a fully appointed cabin.',
        tag: null,
      },
      {
        name: 'Falcon 900LX',
        range: '8,800 km',
        pax: '14',
        speed: '927 km/h',
        img: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=700&q=80&auto=format&fit=crop',
        desc: 'Trijet reliability with exceptional fuel efficiency. Accesses more airports than comparable heavy jets.',
        tag: null,
      },
    ],
  },
  {
    category: 'Ultra Long Range',
    aircraft: [
      {
        name: 'Gulfstream G700',
        range: '13,890 km',
        pax: '19',
        speed: '956 km/h',
        img: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=700&q=80&auto=format&fit=crop',
        desc: "The world's largest purpose-built business jet. Five living zones, full-size galley, and Gulfstream's signature Ultragalley.",
        tag: 'Flagship',
      },
      {
        name: 'Bombardier Global 7500',
        range: '14,260 km',
        pax: '19',
        speed: '956 km/h',
        img: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=700&q=80&auto=format&fit=crop',
        desc: 'Longest-range business jet ever built. Four true living spaces including a dedicated crew suite.',
        tag: 'Flagship',
      },
    ],
  },
  {
    category: 'Helicopter',
    aircraft: [
      {
        name: 'AgustaWestland AW139',
        range: '1,250 km',
        pax: '15',
        speed: '306 km/h',
        img: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=700&q=80&auto=format&fit=crop',
        desc: 'Executive VIP helicopter ideal for city transfers, offshore connections, and short-haul luxury travel.',
        tag: null,
      },
    ],
  },
]

const allCategories = ['All', ...fleet.map(f => f.category)]

export default function Fleet() {
  const [active, setActive] = useState('All')

  const visible = active === 'All'
    ? fleet
    : fleet.filter(f => f.category === active)

  return (
    <>
      <ServicePageHero
        eyebrow="Our Fleet"
        title="Aircraft for Every Mission"
        subtitle="Browse our curated selection of light jets, heavy jets, ultra-long-range flagships, and executive helicopters available for private charter worldwide."
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=85&auto=format&fit=crop"
      >
        <Link to="/book?service=private_jet" className="btn btn--gold btn--lg">
          <i className="bi bi-send" /> Request a Quote
        </Link>
      </ServicePageHero>

      {/* Filter bar */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              borderBottom: '1px solid var(--clr-border, #e5e5e5)',
              paddingBottom: 'var(--space-md)',
            }}
          >
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: 'var(--radius-full, 999px)',
                  border: '1.5px solid',
                  borderColor: active === cat ? 'var(--clr-gold)' : 'var(--clr-border, #e5e5e5)',
                  background: active === cat ? 'var(--clr-gold)' : 'transparent',
                  color: active === cat ? '#fff' : 'var(--clr-body, #333)',
                  fontWeight: active === cat ? 700 : 400,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Aircraft listings */}
      <section className="section">
        <div className="container">
          {visible.map(group => (
            <div key={group.category} style={{ marginBottom: 'var(--space-xxl)' }}>
              {/* Category heading */}
              <div style={{ marginBottom: 'var(--space-lg)' }}>
                <p className="eyebrow">{group.category}</p>
                <div className="divider" />
              </div>

              <div className="grid-2" style={{ gap: 'var(--space-md)' }}>
                {group.aircraft.map(ac => (
                  <div
                    key={ac.name}
                    className="card"
                    style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative' }}>
                      <img
                        src={ac.img}
                        alt={ac.name}
                        loading="lazy"
                        style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
                      />
                      {ac.tag && (
                        <span
                          style={{
                            position: 'absolute',
                            top: 'var(--space-sm)',
                            left: 'var(--space-sm)',
                            background: 'var(--clr-gold)',
                            color: '#fff',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            padding: '0.25rem 0.65rem',
                            borderRadius: 'var(--radius-sm, 4px)',
                          }}
                        >
                          {ac.tag}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div
                      style={{
                        padding: 'var(--space-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                      }}
                    >
                      <h4 style={{ marginBottom: '0.5rem' }}>{ac.name}</h4>

                      {/* Stats row */}
                      <div
                        style={{
                          display: 'flex',
                          gap: 'var(--space-md)',
                          fontSize: '0.82rem',
                          color: 'var(--clr-grey)',
                          marginBottom: 'var(--space-sm)',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span>
                          <i className="bi bi-people" style={{ color: 'var(--clr-gold)', marginRight: 4 }} />
                          {ac.pax} pax
                        </span>
                        <span>
                          <i className="bi bi-geo-alt" style={{ color: 'var(--clr-gold)', marginRight: 4 }} />
                          {ac.range}
                        </span>
                        <span>
                          <i className="bi bi-speedometer2" style={{ color: 'var(--clr-gold)', marginRight: 4 }} />
                          {ac.speed}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.88rem', color: 'var(--clr-grey-light)', lineHeight: 1.55, flex: 1 }}>
                        {ac.desc}
                      </p>

                      <Link
                        to="/book?service=private_jet"
                        className="btn btn--outline btn--sm"
                        style={{ marginTop: 'var(--space-md)', alignSelf: 'flex-start' }}
                      >
                        Charter This Aircraft
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ServiceCTAStrip
        service="private_jet"
        heading="Don't See What You Need?"
        sub="We source from a global network of 10,000+ aircraft. Tell us your mission and we'll match the perfect jet."
      />
    </>
  )
}

