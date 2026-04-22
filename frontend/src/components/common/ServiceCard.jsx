import React from 'react'
import { Link } from 'react-router-dom'
import './ServiceCard.css'

export default function ServiceCard({ icon, title, description, to, image }) {
  return (
    <Link to={to} className="service-card">
      {image && (
        <div className="service-card__image">
          <img src={image} alt={title} loading="lazy" />
          <div className="service-card__overlay" />
        </div>
      )}
      <div className="service-card__body">
        <div className="service-card__icon">
          <i className={`bi ${icon}`} />
        </div>
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__desc">{description}</p>
        <span className="service-card__cta">
          Learn More <i className="bi bi-arrow-right" />
        </span>
      </div>
    </Link>
  )
}