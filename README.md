# Prime Charters 

A full-stack flight management platform for private aviation — built with **Django REST Framework** + **React**.

---

## Services Offered
- Private Jet Charter
- Group Air Charter
- Air Cargo
- Aircraft Leasing (ACMI)
- Flight Support

---

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Backend | Django 5.x + Django REST Framework |
| Frontend | React 18 + Vite |
| Styling | Custom CSS + Bootstrap Icons |
| Auth | JWT (SimpleJWT) |
| DB | SQLite (dev) → PostgreSQL (prod) |

---

## Project Structure

```
primecharters/
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── primecharters/              # Django project config
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py                 # Root URL conf
│   │   └── wsgi.py
│   │
│   └── core/                      # Main application
│       ├── __init__.py
│       ├── models.py               # Aircraft, Booking, Cargo, Route, etc.
│       ├── serializers.py          # DRF serializers
│       ├── views.py                # API ViewSets
│       ├── urls.py                 # App-level URLs
│       ├── admin.py                # Django admin panel
│       ├── permissions.py
│       └── migrations/
│
└── frontend/
    ├── index.html                  # Entry HTML (Bootstrap Icons CDN)
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx                # React entry point
        ├── App.jsx                 # Router + layout
        ├── styles/
        │   └── main.css            # Global styles + CSS vars
        ├── components/
        │   ├── common/
        │   │   ├── Navbar.jsx
        │   │   ├── Footer.jsx
        │   │   ├── Button.jsx
        │   │   └── ServiceCard.jsx
        │   ├── layout/
        │   │   └── PageLayout.jsx
        │   └── sections/
        │       ├── HeroSection.jsx
        │       ├── ServicesSection.jsx
        │       ├── FleetSection.jsx
        │       └── BookingForm.jsx
        └── pages/
            ├── Home.jsx
            ├── PrivateJet.jsx
            ├── GroupCharter.jsx
            ├── AirCargo.jsx
            ├── AircraftLeasing.jsx
            ├── FlightSupport.jsx
            ├── BookingPage.jsx
            ├── BookingConfirmation.jsx
            └── admin/
                ├── AdminLogin.jsx
                ├── AdminDashboard.jsx
                ├── AdminBookings.jsx
                ├── AdminFleet.jsx
                └── AdminUsers.jsx
```

---

## Quick Start

### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### API Base URL
`http://localhost:8000/api/`

### Django Admin
`http://localhost:8000/admin/`

---

## Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/aircraft/` | List all aircraft |
| GET | `/api/routes/` | Available routes |
| POST | `/api/bookings/` | Create booking (no auth required) |
| GET | `/api/bookings/{id}/` | Booking status by reference |
| GET | `/api/admin/bookings/` | All bookings (admin) |
| PATCH | `/api/admin/bookings/{id}/` | Update booking status (admin) |
| POST | `/api/auth/login/` | Admin JWT login |
| POST | `/api/cargo/` | Submit cargo request |
| GET | `/api/fleet/` | Public fleet showcase |