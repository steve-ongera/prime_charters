import uuid
from django.db import models
from django.contrib.auth.models import User


# ─────────────────────────────────────────────
# ENUMERATIONS
# ─────────────────────────────────────────────

class ServiceType(models.TextChoices):
    PRIVATE_JET = 'private_jet', 'Private Jet'
    GROUP_CHARTER = 'group_charter', 'Group Air Charter'
    AIR_CARGO = 'air_cargo', 'Air Cargo'
    ACMI_LEASING = 'acmi_leasing', 'ACMI Leasing'
    FLIGHT_SUPPORT = 'flight_support', 'Flight Support'


class BookingStatus(models.TextChoices):
    PENDING = 'pending', 'Pending Review'
    CONFIRMED = 'confirmed', 'Confirmed'
    QUOTED = 'quoted', 'Quote Sent'
    CANCELLED = 'cancelled', 'Cancelled'
    COMPLETED = 'completed', 'Completed'


class AircraftCategory(models.TextChoices):
    LIGHT = 'light', 'Light Jet'
    MIDSIZE = 'midsize', 'Midsize Jet'
    SUPER_MIDSIZE = 'super_midsize', 'Super Midsize'
    HEAVY = 'heavy', 'Heavy Jet'
    ULTRA_LONG = 'ultra_long', 'Ultra Long Range'
    TURBOPROP = 'turboprop', 'Turboprop'
    HELICOPTER = 'helicopter', 'Helicopter'
    AIRLINER = 'airliner', 'Airliner / Group'
    CARGO = 'cargo', 'Cargo Aircraft'


class CargoType(models.TextChoices):
    GENERAL = 'general', 'General Cargo'
    PERISHABLE = 'perishable', 'Perishable / Fresh'
    DANGEROUS = 'dangerous', 'Dangerous Goods'
    OVERSIZED = 'oversized', 'Oversized / Heavy'
    LIVE_ANIMALS = 'live_animals', 'Live Animals'
    PHARMA = 'pharma', 'Pharmaceutical'
    VALUABLES = 'valuables', 'Valuables / Artwork'


# ─────────────────────────────────────────────
# AIRCRAFT
# ─────────────────────────────────────────────

class Aircraft(models.Model):
    name = models.CharField(max_length=120)
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    category = models.CharField(max_length=30, choices=AircraftCategory.choices)
    registration = models.CharField(max_length=20, unique=True)
    year_manufactured = models.PositiveIntegerField()
    passenger_capacity = models.PositiveIntegerField()
    cargo_capacity_kg = models.FloatField(default=0)
    range_km = models.PositiveIntegerField(help_text="Range in kilometres")
    cruise_speed_kmh = models.PositiveIntegerField()
    max_altitude_ft = models.PositiveIntegerField(default=45000)
    cabin_length_m = models.FloatField(null=True, blank=True)
    cabin_height_m = models.FloatField(null=True, blank=True)
    cabin_width_m = models.FloatField(null=True, blank=True)
    # Amenities & features
    wifi = models.BooleanField(default=False)
    sleeping_arrangements = models.BooleanField(default=False)
    galley = models.BooleanField(default=True)
    lavatory = models.BooleanField(default=True)
    entertainment_system = models.BooleanField(default=False)
    features = models.TextField(blank=True, help_text="Comma-separated list of features")
    description = models.TextField(blank=True)
    # Media — URLs to Unsplash / hosted images
    image_url = models.URLField(max_length=500, blank=True)
    interior_image_url = models.URLField(max_length=500, blank=True)
    thumbnail_url = models.URLField(max_length=500, blank=True)
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    base_price_per_hour = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category', 'name']
        verbose_name_plural = 'Aircraft'

    def __str__(self):
        return f"{self.name} ({self.registration})"


# ─────────────────────────────────────────────
# ROUTES / DESTINATIONS
# ─────────────────────────────────────────────

class Airport(models.Model):
    icao = models.CharField(max_length=4, unique=True)
    iata = models.CharField(max_length=3, blank=True)
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    is_private = models.BooleanField(default=False, help_text="Private/FBO terminal")

    class Meta:
        ordering = ['country', 'city']

    def __str__(self):
        return f"{self.iata or self.icao} — {self.name}, {self.city}"


class PopularRoute(models.Model):
    origin = models.ForeignKey(Airport, related_name='departures', on_delete=models.CASCADE)
    destination = models.ForeignKey(Airport, related_name='arrivals', on_delete=models.CASCADE)
    estimated_flight_time_hours = models.FloatField()
    distance_km = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.origin.iata} → {self.destination.iata}"


# ─────────────────────────────────────────────
# BOOKINGS (no account required)
# ─────────────────────────────────────────────

class Booking(models.Model):
    reference = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    service_type = models.CharField(max_length=30, choices=ServiceType.choices)
    status = models.CharField(max_length=20, choices=BookingStatus.choices, default=BookingStatus.PENDING)

    # Client info (no account needed)
    client_name = models.CharField(max_length=150)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=30)
    client_company = models.CharField(max_length=150, blank=True)
    client_nationality = models.CharField(max_length=80, blank=True)

    # Flight details
    origin = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    departure_date = models.DateField()
    departure_time = models.TimeField(null=True, blank=True)
    return_date = models.DateField(null=True, blank=True)
    is_return = models.BooleanField(default=False)
    passenger_count = models.PositiveIntegerField(default=1)
    preferred_aircraft = models.ForeignKey(Aircraft, null=True, blank=True, on_delete=models.SET_NULL)

    # Special requirements
    special_requests = models.TextField(blank=True)
    catering_required = models.BooleanField(default=False)
    ground_transport = models.BooleanField(default=False)
    visa_assistance = models.BooleanField(default=False)

    # Admin
    admin_notes = models.TextField(blank=True)
    quoted_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=3, default='USD')
    assigned_to = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='assigned_bookings')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.get_status_display()}] {self.client_name} | {self.origin} → {self.destination} ({self.departure_date})"

    @property
    def reference_short(self):
        return str(self.reference).upper()[:8]


# ─────────────────────────────────────────────
# AIR CARGO REQUESTS
# ─────────────────────────────────────────────

class CargoRequest(models.Model):
    reference = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    status = models.CharField(max_length=20, choices=BookingStatus.choices, default=BookingStatus.PENDING)

    # Client
    client_name = models.CharField(max_length=150)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=30)
    client_company = models.CharField(max_length=150, blank=True)

    # Cargo details
    cargo_type = models.CharField(max_length=30, choices=CargoType.choices)
    description = models.TextField()
    weight_kg = models.FloatField()
    volume_cbm = models.FloatField(null=True, blank=True, help_text="Volume in cubic metres")
    pieces = models.PositiveIntegerField(default=1)
    is_dangerous_goods = models.BooleanField(default=False)
    un_number = models.CharField(max_length=20, blank=True, help_text="UN number for dangerous goods")

    # Route & schedule
    origin = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    ready_date = models.DateField()
    delivery_deadline = models.DateField(null=True, blank=True)

    # Admin
    admin_notes = models.TextField(blank=True)
    quoted_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=3, default='USD')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Cargo: {self.cargo_type} | {self.origin} → {self.destination} | {self.weight_kg}kg"


# ─────────────────────────────────────────────
# ACMI / AIRCRAFT LEASING
# ─────────────────────────────────────────────

class LeasingInquiry(models.Model):
    LEASE_TYPE_CHOICES = [
        ('acmi', 'ACMI (Aircraft, Crew, Maintenance, Insurance)'),
        ('dry', 'Dry Lease (Aircraft Only)'),
        ('wet', 'Wet Lease (Full Service)'),
        ('damp', 'Damp Lease'),
    ]
    reference = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    status = models.CharField(max_length=20, choices=BookingStatus.choices, default=BookingStatus.PENDING)

    # Client
    client_name = models.CharField(max_length=150)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=30)
    client_company = models.CharField(max_length=150)
    airline_aoc = models.CharField(max_length=100, blank=True, help_text="AOC number if applicable")

    # Lease details
    lease_type = models.CharField(max_length=20, choices=LEASE_TYPE_CHOICES)
    preferred_aircraft_type = models.CharField(max_length=100)
    required_seats = models.PositiveIntegerField(null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    primary_base = models.CharField(max_length=200)
    planned_routes = models.TextField(blank=True)
    monthly_hours = models.PositiveIntegerField(null=True, blank=True)
    additional_requirements = models.TextField(blank=True)

    # Admin
    admin_notes = models.TextField(blank=True)
    quoted_price = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=3, default='USD')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Leasing Inquiries'

    def __str__(self):
        return f"{self.lease_type.upper()} | {self.client_company} | {self.start_date} - {self.end_date}"


# ─────────────────────────────────────────────
# FLIGHT SUPPORT REQUESTS
# ─────────────────────────────────────────────

class FlightSupportRequest(models.Model):
    SUPPORT_TYPE = [
        ('permits', 'Overflight & Landing Permits'),
        ('handling', 'Ground Handling'),
        ('fuel', 'Fuel Uplift'),
        ('catering', 'Catering'),
        ('crew', 'Crew Accommodation'),
        ('slots', 'Slot Coordination'),
        ('customs', 'Customs & Immigration'),
        ('full', 'Full Trip Support'),
    ]
    reference = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    status = models.CharField(max_length=20, choices=BookingStatus.choices, default=BookingStatus.PENDING)
    support_type = models.CharField(max_length=30, choices=SUPPORT_TYPE)

    client_name = models.CharField(max_length=150)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=30)
    client_company = models.CharField(max_length=150, blank=True)
    aircraft_registration = models.CharField(max_length=20, blank=True)
    aircraft_type = models.CharField(max_length=100, blank=True)

    origin = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    flight_date = models.DateField()
    details = models.TextField()
    admin_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Support: {self.support_type} | {self.client_name} | {self.flight_date}"


# ─────────────────────────────────────────────
# TESTIMONIALS & CONTENT
# ─────────────────────────────────────────────

class Testimonial(models.Model):
    client_name = models.CharField(max_length=120)
    client_title = models.CharField(max_length=150, blank=True)
    client_company = models.CharField(max_length=150, blank=True)
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    avatar_url = models.URLField(blank=True)
    service_type = models.CharField(max_length=30, choices=ServiceType.choices, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client_name} — {self.rating}★"