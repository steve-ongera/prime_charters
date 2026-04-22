// src/pages/GroupCharter.jsx
import React from 'react'
import { Link } from 'react-router-dom'
// ✅ Correct — matches the actual filename
import { ServicePageHero, ServiceFeatureList, ServiceCTAStrip } from '../components/common/ServicePage'


export default function GroupCharter() {
  return (
    <>
      <ServicePageHero
        eyebrow="Group Charter"
        title="Travel Together, Arrive in Style"
        subtitle="Private group air charter for corporate events, sports teams, incentive travel, and large delegations."
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=85&auto=format&fit=crop"
      >
        <Link to="/book?service=group_charter" className="btn btn--gold btn--lg">
          <i className="bi bi-send" /> Request a Quote
        </Link>
      </ServicePageHero>

      {/* add your sections here */}

      <ServiceCTAStrip service="group_charter" />
    </>
  )
}