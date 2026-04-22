import React from 'react'
import { Link } from 'react-router-dom'
import { ServicePageHero, ServiceFeatureList, ServiceCTAStrip } from '../components/common/ServicePage'

export function GroupCharter() {
  return (
    <>
      <ServicePageHero
        eyebrow="Group Air Charter"
        title="Move Your Group with Precision"
        subtitle="Whether it's a corporate delegation, sports team, or pilgrimage — we configure the right aircraft for your entire group, on your schedule."
        image="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1600&q=85&auto=format&fit=crop"
      >
        <Link to="/book?service=group_charter" className="btn btn--gold btn--lg">
          <i className="bi bi-send" /> Request Group Quote
        </Link>
      </ServicePageHero>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-2xl)' }}>
            <div>
              <p className="eyebrow">Who We Serve</p>
              <div className="divider" />
              <h2>Every Group, Every Mission</h2>
              <p style={{ color: 'var(--clr-grey-dark)', margin: 'var(--space-md) 0 var(--space-lg)' }}>
                From 20 to 500 passengers, we source the right airliner or multi-aircraft solution for any group movement.
              </p>
              <div className="grid-2" style={{ gap: 'var(--space-md)' }}>
                {['Corporate Groups', 'Sports Teams', 'Government Delegations', 'Religious Pilgrimages', 'Music & Entertainment', 'Emergency Evacuations'].map(g => (
                  <div key={g} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: 'var(--space-md)', background: 'var(--clr-cream)', borderRadius: 'var(--radius-md)' }}>
                    <i className="bi bi-check2-circle" style={{ color: 'var(--clr-gold)' }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{g}</span>
                  </div>
                ))}
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80&auto=format&fit=crop"
              alt="Group charter cabin"
              style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section__header section__header--center">
            <p className="eyebrow">Included</p>
            <div className="divider divider--center" />
            <h2>Full Group Charter Service</h2>
          </div>
          <div className="grid-3" style={{ marginTop: 'var(--space-xl)', gap: 'var(--space-md)' }}>
            {[
              { icon: 'bi-airplane', title: 'Aircraft Selection', desc: 'Turboprops to wide-body airliners sourced from vetted operators globally.' },
              { icon: 'bi-calendar3', title: 'Flexible Scheduling', desc: 'Depart on your preferred date and time — no reliance on airline schedules.' },
              { icon: 'bi-fork-knife', title: 'Group Catering', desc: 'Bulk catering, dietary requirements, and in-flight entertainment arranged.' },
              { icon: 'bi-luggage', title: 'Excess Baggage', desc: 'Equipment, sports gear, and oversized baggage accommodated seamlessly.' },
              { icon: 'bi-geo-alt', title: 'Remote Destinations', desc: 'Access airstrips and destinations that scheduled airlines don\'t serve.' },
              { icon: 'bi-shield-check', title: 'Safety & Compliance', desc: 'Every operator audited — IOSA, IS-BAO, or equivalent certification.' },
            ].map(f => (
              <div key={f.title} style={{ padding: 'var(--space-lg)', background: 'var(--clr-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--clr-border)' }}>
                <i className={`bi ${f.icon}`} style={{ fontSize: '1.5rem', color: 'var(--clr-gold)', display: 'block', marginBottom: 'var(--space-md)' }} />
                <h4 style={{ marginBottom: '0.5rem' }}>{f.title}</h4>
                <p style={{ fontSize: '0.87rem', color: 'var(--clr-grey)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceCTAStrip service="group_charter" />
    </>
  )
}

export function AirCargo() {
  return (
    <>
      <ServicePageHero
        eyebrow="Air Cargo"
        title="Time-Critical Freight, Delivered"
        subtitle="From perishables to industrial equipment, our air cargo solutions reach any corner of the globe — on time, every time."
        image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=85&auto=format&fit=crop"
      >
        <Link to="/book?service=air_cargo" className="btn btn--gold btn--lg">
          <i className="bi bi-send" /> Get Cargo Quote
        </Link>
      </ServicePageHero>

      <section className="section">
        <div className="container">
          <div className="section__header section__header--center">
            <p className="eyebrow">Cargo Types</p>
            <div className="divider divider--center" />
            <h2>We Handle Any Freight</h2>
          </div>
          <div className="grid-4" style={{ marginTop: 'var(--space-xl)' }}>
            {[
              { icon: 'bi-box-seam', label: 'General Cargo', desc: 'Standard freight, palletized goods, machinery parts.' },
              { icon: 'bi-thermometer-snow', label: 'Perishables', desc: 'Fresh produce, flowers, temperature-sensitive goods.' },
              { icon: 'bi-exclamation-triangle', label: 'Dangerous Goods', desc: 'DG-certified handling for chemicals, batteries, hazmat.' },
              { icon: 'bi-gear-wide', label: 'Oversized / OOG', desc: 'Out-of-gauge cargo, industrial equipment, vehicles.' },
              { icon: 'bi-heart-pulse', label: 'Pharmaceutical', desc: 'GDP-compliant cold chain for medical cargo.' },
              { icon: 'bi-gem', label: 'Valuables / Art', desc: 'High-security handling for art, jewellery, cash.' },
              { icon: 'bi-patch-question', label: 'Live Animals', desc: 'IATA-compliant live animal transport.' },
              { icon: 'bi-lightning-charge', label: 'AOG Parts', desc: 'Aircraft-on-ground parts — fastest possible response.' },
            ].map(t => (
              <div key={t.label} style={{ textAlign: 'center', padding: 'var(--space-lg)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)', background: 'var(--clr-white)' }}>
                <i className={`bi ${t.icon}`} style={{ fontSize: '2rem', color: 'var(--clr-gold)', display: 'block', marginBottom: 'var(--space-sm)' }} />
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>{t.label}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--clr-grey)' }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80&auto=format&fit=crop"
              alt="Cargo aircraft"
              style={{ borderRadius: 'var(--radius-xl)', width: '100%', aspectRatio: '4/3', objectFit: 'cover', boxShadow: 'var(--shadow-lg)' }}
            />
            <div>
              <p className="eyebrow">Why Prime Cargo</p>
              <div className="divider" />
              <h2>Speed. Reliability. Compliance.</h2>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <ServiceFeatureList features={[
                  'Global network of freighters and combi aircraft',
                  'Dangerous goods (DG) certified handling',
                  'Real-time shipment tracking',
                  'Full customs documentation support',
                  'Cold chain and temperature-controlled options',
                  'Emergency uplift within hours',
                  'Door-to-door freight management available',
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceCTAStrip service="air_cargo" />
    </>
  )
}

export function AircraftLeasing() {
  return (
    <>
      <ServicePageHero
        eyebrow="Aircraft Leasing"
        title="ACMI & Fleet Leasing Solutions"
        subtitle="Flexible aircraft, crew, maintenance and insurance (ACMI) leasing — plus dry and wet lease arrangements for airlines and charter operators worldwide."
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=85&auto=format&fit=crop"
      >
        <Link to="/book?service=acmi_leasing" className="btn btn--gold btn--lg">
          <i className="bi bi-send" /> Enquire Now
        </Link>
      </ServicePageHero>

      <section className="section">
        <div className="container">
          <div className="section__header section__header--center">
            <p className="eyebrow">Lease Types</p>
            <div className="divider divider--center" />
            <h2>Flexible Arrangements</h2>
          </div>
          <div className="grid-4" style={{ marginTop: 'var(--space-xl)' }}>
            {[
              { type: 'ACMI', full: 'Aircraft, Crew, Maintenance & Insurance', desc: 'The operator provides the aircraft, crew, maintenance, and insurance. You provide fuel and pay commercial fees.', icon: 'bi-airplane-engines' },
              { type: 'Dry Lease', full: 'Aircraft Only', desc: 'You receive the aircraft without crew, maintenance, or insurance. Ideal for established airlines with their own AOC.', icon: 'bi-file-earmark-check' },
              { type: 'Wet Lease', full: 'Full-Service Lease', desc: 'Aircraft, crew, maintenance, insurance, and all additional services — a completely turnkey flying solution.', icon: 'bi-droplet-fill' },
              { type: 'Damp Lease', full: 'Aircraft + Flight Crew', desc: 'Aircraft and pilots provided; the lessee supplies cabin crew and is responsible for fuel.', icon: 'bi-person-workspace' },
            ].map(l => (
              <div key={l.type} style={{ padding: 'var(--space-lg)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)', background: 'var(--clr-white)' }}>
                <i className={`bi ${l.icon}`} style={{ fontSize: '1.8rem', color: 'var(--clr-gold)', display: 'block', marginBottom: 'var(--space-md)' }} />
                <span style={{ display: 'inline-block', background: 'var(--clr-navy)', color: 'var(--clr-white)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', padding: '2px 8px', borderRadius: 'var(--radius-pill)', marginBottom: 'var(--space-sm)' }}>{l.type}</span>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>{l.full}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--clr-grey)' }}>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p className="eyebrow">Fleet Available</p>
              <div className="divider" />
              <h2>Aircraft Types for Lease</h2>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <ServiceFeatureList features={[
                  'Narrowbody: Boeing 737 series, Airbus A320/A321',
                  'Widebody: Boeing 767, 777, Airbus A330, A350',
                  'Regional jets: ERJ-145, CRJ-700, ATR 72',
                  'Business jets and VIP airliner conversions',
                  'Cargo freighters: B737F, B747F, A330F',
                  'Short to long-term lease periods available',
                  'Full regulatory and documentation support',
                  'AOC consultation and permit assistance',
                ]} />
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop"
              alt="Leased aircraft"
              style={{ borderRadius: 'var(--radius-xl)', width: '100%', aspectRatio: '4/3', objectFit: 'cover', boxShadow: 'var(--shadow-lg)' }}
            />
          </div>
        </div>
      </section>

      <ServiceCTAStrip service="acmi_leasing" />
    </>
  )
}

export function FlightSupport() {
  return (
    <>
      <ServicePageHero
        eyebrow="Flight Support"
        title="Ground Operations, Handled"
        subtitle="Comprehensive trip support services — from overflight permits and ground handling to fuel uplift and crew accommodation. We manage the details so you can focus on the flight."
        image="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1600&q=85&auto=format&fit=crop"
      >
        <Link to="/book?service=flight_support" className="btn btn--gold btn--lg">
          <i className="bi bi-send" /> Request Support
        </Link>
      </ServicePageHero>

      <section className="section">
        <div className="container">
          <div className="section__header section__header--center">
            <p className="eyebrow">What We Handle</p>
            <div className="divider divider--center" />
            <h2>Complete Trip Support</h2>
          </div>
          <div className="grid-3" style={{ marginTop: 'var(--space-xl)', gap: 'var(--space-md)' }}>
            {[
              { icon: 'bi-journal-check', title: 'Overflight & Landing Permits', desc: 'Diplomatic clearances and operational permits for any country, any airspace.' },
              { icon: 'bi-truck', title: 'Ground Handling', desc: 'FBO coordination, pushback, marshalling, and ramp services at 1,000+ locations.' },
              { icon: 'bi-fuel-pump', title: 'Fuel Uplift', desc: 'Competitive fuel pricing, tankering analysis, and refuelling coordination globally.' },
              { icon: 'bi-cup-hot', title: 'Catering', desc: 'Gourmet in-flight catering from local or international suppliers, any dietary needs.' },
              { icon: 'bi-building', title: 'Crew Accommodation', desc: 'Hotel bookings and rest period management compliant with FTL regulations.' },
              { icon: 'bi-calendar2-check', title: 'Slot Coordination', desc: 'IATA slot requests, coordination, and confirmation at slot-controlled airports.' },
              { icon: 'bi-passport', title: 'Customs & Immigration', desc: 'Pre-clearance facilitation and documentation for crew and passengers.' },
              { icon: 'bi-headset', title: 'Full Trip Support', desc: '24/7 dedicated trip coordinator for entire journey from departure to return.' },
            ].map(s => (
              <div key={s.title} style={{ padding: 'var(--space-lg)', background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)' }}>
                <i className={`bi ${s.icon}`} style={{ fontSize: '1.5rem', color: 'var(--clr-gold)', display: 'block', marginBottom: 'var(--space-md)' }} />
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>{s.title}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--clr-grey)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceCTAStrip service="flight_support" />
    </>
  )
}