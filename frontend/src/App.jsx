// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Home from './pages/Home'
import PrivateJet from './pages/PrivateJet'
import GroupCharter from './pages/GroupCharter'
import AirCargo from './pages/AirCargo'
import AircraftLeasing from './pages/AircraftLeasing'
import FlightSupport from './pages/FlightSupport'
import BookingPage from './pages/BookingPage'
import BookingConfirmation from './pages/BookingConfirmation'
import Fleet from './pages/Fleet'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBookings from './pages/admin/AdminBookings'
import AdminFleet from './pages/admin/AdminFleet'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public site ── */}
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/private-jet" element={<PrivateJet />} />
          <Route path="/group-charter" element={<GroupCharter />} />
          <Route path="/air-cargo" element={<AirCargo />} />
          <Route path="/aircraft-leasing" element={<AircraftLeasing />} />
          <Route path="/flight-support" element={<FlightSupport />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/book/:service?" element={<BookingPage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        </Route>

        {/* ── Admin panel — no main layout, each page uses AdminLayout ── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/fleet" element={<AdminFleet />} />
      </Routes>
    </BrowserRouter>
  )
}