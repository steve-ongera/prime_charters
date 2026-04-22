from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date, time
from decimal import Decimal
from core.models import (
    Aircraft, Airport, PopularRoute,
    Booking, CargoRequest, LeasingInquiry,
    FlightSupportRequest, Testimonial,
    AircraftCategory, ServiceType, BookingStatus,
    CargoType,
)


class Command(BaseCommand):
    help = "Seed the database with realistic sample data for all models."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete existing records before seeding.",
        )

    def handle(self, *args, **options):
        if options["clear"]:
            self.stdout.write(self.style.WARNING("Clearing existing data…"))
            FlightSupportRequest.objects.all().delete()
            LeasingInquiry.objects.all().delete()
            CargoRequest.objects.all().delete()
            Booking.objects.all().delete()
            PopularRoute.objects.all().delete()
            Airport.objects.all().delete()
            Aircraft.objects.all().delete()
            Testimonial.objects.all().delete()
            self.stdout.write(self.style.SUCCESS("Done.\n"))

        self.seed_aircraft()
        self.seed_airports()
        self.seed_routes()
        self.seed_bookings()
        self.seed_cargo()
        self.seed_leasing()
        self.seed_support()
        self.seed_testimonials()

        self.stdout.write(self.style.SUCCESS("\n✅  Seeding complete."))

    # ------------------------------------------------------------------ #
    # AIRCRAFT
    # ------------------------------------------------------------------ #

    def seed_aircraft(self):
        aircraft = [
            dict(
                name="Gulfstream G700",
                manufacturer="Gulfstream",
                model="G700",
                category=AircraftCategory.ULTRA_LONG,
                registration="N700GS",
                year_manufactured=2022,
                passenger_capacity=19,
                cargo_capacity_kg=680,
                range_km=13890,
                cruise_speed_kmh=956,
                max_altitude_ft=51000,
                cabin_length_m=16.07,
                cabin_height_m=1.96,
                cabin_width_m=2.49,
                wifi=True,
                sleeping_arrangements=True,
                galley=True,
                lavatory=True,
                entertainment_system=True,
                features="Sat-phone, Full-flat beds, Burl wood finishes, 20 windows",
                description="The flagship ultra-long-range business jet offering unmatched range and cabin comfort.",
                base_price_per_hour=Decimal("12500.00"),
                is_available=True,
                is_featured=True,
            ),
            dict(
                name="Bombardier Global 7500",
                manufacturer="Bombardier",
                model="Global 7500",
                category=AircraftCategory.ULTRA_LONG,
                registration="C-FGLB",
                year_manufactured=2021,
                passenger_capacity=19,
                cargo_capacity_kg=600,
                range_km=14260,
                cruise_speed_kmh=956,
                max_altitude_ft=51000,
                cabin_length_m=15.62,
                cabin_height_m=1.93,
                cabin_width_m=2.44,
                wifi=True,
                sleeping_arrangements=True,
                galley=True,
                lavatory=True,
                entertainment_system=True,
                features="Four living spaces, True north seats, Full-flat beds",
                description="World's longest-range purpose-built business jet with four distinct living spaces.",
                base_price_per_hour=Decimal("13000.00"),
                is_available=True,
                is_featured=True,
            ),
            dict(
                name="Dassault Falcon 8X",
                manufacturer="Dassault",
                model="Falcon 8X",
                category=AircraftCategory.ULTRA_LONG,
                registration="F-HFAL",
                year_manufactured=2020,
                passenger_capacity=16,
                cargo_capacity_kg=510,
                range_km=11945,
                cruise_speed_kmh=900,
                max_altitude_ft=51000,
                cabin_length_m=13.10,
                cabin_height_m=1.88,
                cabin_width_m=2.34,
                wifi=True,
                sleeping_arrangements=True,
                galley=True,
                lavatory=True,
                entertainment_system=True,
                features="Tri-engine safety, Whisper-quiet cabin, 30 panoramic windows",
                description="Exceptional fuel efficiency and flexibility with tri-engine reliability.",
                base_price_per_hour=Decimal("11000.00"),
                is_available=True,
                is_featured=False,
            ),
            dict(
                name="Gulfstream G550",
                manufacturer="Gulfstream",
                model="G550",
                category=AircraftCategory.HEAVY,
                registration="N550GS",
                year_manufactured=2018,
                passenger_capacity=16,
                cargo_capacity_kg=590,
                range_km=12500,
                cruise_speed_kmh=941,
                max_altitude_ft=51000,
                cabin_length_m=13.39,
                cabin_height_m=1.88,
                cabin_width_m=2.24,
                wifi=True,
                sleeping_arrangements=True,
                galley=True,
                lavatory=True,
                entertainment_system=True,
                features="Enhanced Vision System, Bose speakers, Crew rest area",
                description="Proven long-range workhorse trusted by heads of state and Fortune 500 executives.",
                base_price_per_hour=Decimal("9500.00"),
                is_available=True,
                is_featured=True,
            ),
            dict(
                name="Bombardier Challenger 650",
                manufacturer="Bombardier",
                model="Challenger 650",
                category=AircraftCategory.HEAVY,
                registration="C-GCHB",
                year_manufactured=2019,
                passenger_capacity=12,
                cargo_capacity_kg=435,
                range_km=7408,
                cruise_speed_kmh=850,
                max_altitude_ft=41000,
                cabin_length_m=8.61,
                cabin_height_m=1.83,
                cabin_width_m=2.49,
                wifi=True,
                sleeping_arrangements=False,
                galley=True,
                lavatory=True,
                entertainment_system=True,
                features="Widest cabin in class, Lie-flat seats optional, HD monitors",
                description="The widest cabin in its class delivering comfort on transatlantic routes.",
                base_price_per_hour=Decimal("7800.00"),
                is_available=True,
                is_featured=False,
            ),
            dict(
                name="Citation Longitude",
                manufacturer="Cessna",
                model="Citation Longitude",
                category=AircraftCategory.SUPER_MIDSIZE,
                registration="N700CL",
                year_manufactured=2021,
                passenger_capacity=12,
                cargo_capacity_kg=300,
                range_km=6482,
                cruise_speed_kmh=883,
                max_altitude_ft=45000,
                cabin_length_m=7.62,
                cabin_height_m=1.83,
                cabin_width_m=1.96,
                wifi=True,
                sleeping_arrangements=False,
                galley=True,
                lavatory=True,
                entertainment_system=True,
                features="Best-in-class cabin altitude, LED lighting, Quiet cabin",
                description="Best-in-class cabin altitude and range make this the ideal super-midsize choice.",
                base_price_per_hour=Decimal("5800.00"),
                is_available=True,
                is_featured=False,
            ),
            dict(
                name="Embraer Praetor 600",
                manufacturer="Embraer",
                model="Praetor 600",
                category=AircraftCategory.SUPER_MIDSIZE,
                registration="PT-EPR",
                year_manufactured=2020,
                passenger_capacity=12,
                cargo_capacity_kg=290,
                range_km=7223,
                cruise_speed_kmh=863,
                max_altitude_ft=45000,
                cabin_length_m=7.08,
                cabin_height_m=1.83,
                cabin_width_m=2.10,
                wifi=True,
                sleeping_arrangements=False,
                galley=True,
                lavatory=True,
                entertainment_system=True,
                features="Bose noise-cancelling audio, Full fly-by-wire, Ergonomic seats",
                description="Disruptive super-midsize with transatlantic range and class-leading technology.",
                base_price_per_hour=Decimal("5500.00"),
                is_available=True,
                is_featured=True,
            ),
            dict(
                name="Hawker 900XP",
                manufacturer="Hawker Beechcraft",
                model="900XP",
                category=AircraftCategory.MIDSIZE,
                registration="G-HWKR",
                year_manufactured=2016,
                passenger_capacity=9,
                cargo_capacity_kg=200,
                range_km=5092,
                cruise_speed_kmh=830,
                max_altitude_ft=41000,
                cabin_length_m=6.50,
                cabin_height_m=1.75,
                cabin_width_m=1.83,
                wifi=True,
                sleeping_arrangements=False,
                galley=True,
                lavatory=True,
                entertainment_system=False,
                features="Club seating, External baggage, Refreshment centre",
                description="Reliable midsize jet ideal for regional European and African routes.",
                base_price_per_hour=Decimal("3800.00"),
                is_available=True,
                is_featured=False,
            ),
            dict(
                name="Phenom 300E",
                manufacturer="Embraer",
                model="Phenom 300E",
                category=AircraftCategory.LIGHT,
                registration="PT-300",
                year_manufactured=2022,
                passenger_capacity=7,
                cargo_capacity_kg=130,
                range_km=3650,
                cruise_speed_kmh=834,
                max_altitude_ft=45000,
                cabin_length_m=4.73,
                cabin_height_m=1.50,
                cabin_width_m=1.55,
                wifi=True,
                sleeping_arrangements=False,
                galley=False,
                lavatory=True,
                entertainment_system=True,
                features="Best-selling light jet, Single-pilot certified, Oval windows",
                description="World's best-selling light jet for 12 consecutive years.",
                base_price_per_hour=Decimal("2800.00"),
                is_available=True,
                is_featured=False,
            ),
            dict(
                name="King Air 350",
                manufacturer="Beechcraft",
                model="King Air 350",
                category=AircraftCategory.TURBOPROP,
                registration="N350KA",
                year_manufactured=2019,
                passenger_capacity=11,
                cargo_capacity_kg=375,
                range_km=2885,
                cruise_speed_kmh=578,
                max_altitude_ft=35000,
                cabin_length_m=5.94,
                cabin_height_m=1.45,
                cabin_width_m=1.37,
                wifi=False,
                sleeping_arrangements=False,
                galley=False,
                lavatory=True,
                entertainment_system=False,
                features="Short-strip capable, Low operating cost, Regional workhorse",
                description="The world's most versatile turboprop, perfect for East African bush strips.",
                base_price_per_hour=Decimal("1800.00"),
                is_available=True,
                is_featured=False,
            ),
            dict(
                name="AW139 VIP",
                manufacturer="Leonardo",
                model="AW139",
                category=AircraftCategory.HELICOPTER,
                registration="5Y-AW1",
                year_manufactured=2020,
                passenger_capacity=8,
                cargo_capacity_kg=200,
                range_km=1061,
                cruise_speed_kmh=306,
                max_altitude_ft=20000,
                cabin_length_m=4.89,
                cabin_height_m=1.45,
                cabin_width_m=2.00,
                wifi=False,
                sleeping_arrangements=False,
                galley=False,
                lavatory=False,
                entertainment_system=False,
                features="Offshore capable, Night vision compatible, VIP interior",
                description="Premier VIP helicopter for city transfers and offshore platform access.",
                base_price_per_hour=Decimal("2200.00"),
                is_available=True,
                is_featured=False,
            ),
            dict(
                name="Boeing 737-800 BBJ",
                manufacturer="Boeing",
                model="737-800 BBJ",
                category=AircraftCategory.AIRLINER,
                registration="VP-BBJ",
                year_manufactured=2017,
                passenger_capacity=50,
                cargo_capacity_kg=5000,
                range_km=10200,
                cruise_speed_kmh=842,
                max_altitude_ft=41000,
                cabin_length_m=28.60,
                cabin_height_m=2.20,
                cabin_width_m=3.53,
                wifi=True,
                sleeping_arrangements=True,
                galley=True,
                lavatory=True,
                entertainment_system=True,
                features="Conference room, Private stateroom, Full galley, Boardroom",
                description="VIP-configured airliner for large group charters and heads-of-state travel.",
                base_price_per_hour=Decimal("18000.00"),
                is_available=True,
                is_featured=True,
            ),
            dict(
                name="ATR 72-600F",
                manufacturer="ATR",
                model="72-600F",
                category=AircraftCategory.CARGO,
                registration="5H-ATR",
                year_manufactured=2018,
                passenger_capacity=0,
                cargo_capacity_kg=7500,
                range_km=1528,
                cruise_speed_kmh=510,
                max_altitude_ft=25000,
                cabin_length_m=19.58,
                cabin_height_m=1.91,
                cabin_width_m=2.57,
                wifi=False,
                sleeping_arrangements=False,
                galley=False,
                lavatory=False,
                entertainment_system=False,
                features="Large cargo door, Pallet loader compatible, Cold-chain capable",
                description="Dedicated freighter for intra-African cargo routes with short-strip performance.",
                base_price_per_hour=Decimal("3200.00"),
                is_available=True,
                is_featured=False,
            ),
        ]

        count = 0
        for data in aircraft:
            _, created = Aircraft.objects.get_or_create(registration=data["registration"], defaults=data)
            if created:
                count += 1
        self.stdout.write(self.style.SUCCESS(f"  ✓ Aircraft:      {count} created"))

    # ------------------------------------------------------------------ #
    # AIRPORTS
    # ------------------------------------------------------------------ #

    def seed_airports(self):
        airports = [
            dict(icao="HJJJ", iata="ADD", name="Addis Ababa Bole International Airport",   city="Addis Ababa",  country="Ethiopia",      latitude=8.9779,   longitude=38.7993, is_private=False),
            dict(icao="HKJK", iata="NBO", name="Jomo Kenyatta International Airport",        city="Nairobi",      country="Kenya",         latitude=-1.3192,  longitude=36.9275, is_private=False),
            dict(icao="HKWL", iata="WIL", name="Wilson Airport",                             city="Nairobi",      country="Kenya",         latitude=-1.3212,  longitude=36.8148, is_private=True),
            dict(icao="HAAB", iata="",    name="Addis Ababa Lideta Airport",                 city="Addis Ababa",  country="Ethiopia",      latitude=9.0236,   longitude=38.7197, is_private=True),
            dict(icao="HTDA", iata="DAR", name="Julius Nyerere International Airport",       city="Dar es Salaam",country="Tanzania",      latitude=-6.8781,  longitude=39.2026, is_private=False),
            dict(icao="HUEN", iata="EBB", name="Entebbe International Airport",              city="Entebbe",      country="Uganda",        latitude=0.0424,   longitude=32.4435, is_private=False),
            dict(icao="FALA", iata="",    name="Lanseria International Airport",             city="Johannesburg", country="South Africa",  latitude=-25.9385, longitude=27.9261, is_private=True),
            dict(icao="FACT", iata="CPT", name="Cape Town International Airport",            city="Cape Town",    country="South Africa",  latitude=-33.9649, longitude=18.6017, is_private=False),
            dict(icao="FAOR", iata="JNB", name="O.R. Tambo International Airport",           city="Johannesburg", country="South Africa",  latitude=-26.1392, longitude=28.2460, is_private=False),
            dict(icao="DNMM", iata="LOS", name="Murtala Muhammed International Airport",     city="Lagos",        country="Nigeria",       latitude=6.5774,   longitude=3.3213,  is_private=False),
            dict(icao="DTTA", iata="TUN", name="Tunis-Carthage International Airport",       city="Tunis",        country="Tunisia",       latitude=36.8510,  longitude=10.2272, is_private=False),
            dict(icao="HECA", iata="CAI", name="Cairo International Airport",                city="Cairo",        country="Egypt",         latitude=30.1219,  longitude=31.4056, is_private=False),
            dict(icao="OMDB", iata="DXB", name="Dubai International Airport",                city="Dubai",        country="UAE",           latitude=25.2532,  longitude=55.3657, is_private=False),
            dict(icao="EGLL", iata="LHR", name="London Heathrow Airport",                    city="London",       country="United Kingdom", latitude=51.4775, longitude=-0.4614, is_private=False),
            dict(icao="LFPB", iata="LBG", name="Paris Le Bourget Airport",                   city="Paris",        country="France",        latitude=48.9694,  longitude=2.4414,  is_private=True),
            dict(icao="KJFK", iata="JFK", name="John F. Kennedy International Airport",      city="New York",     country="USA",           latitude=40.6413,  longitude=-73.7781,is_private=False),
            dict(icao="VHHH", iata="HKG", name="Hong Kong International Airport",            city="Hong Kong",    country="China",         latitude=22.3080,  longitude=113.9185,is_private=False),
            dict(icao="WSSS", iata="SIN", name="Singapore Changi Airport",                   city="Singapore",    country="Singapore",     latitude=1.3644,   longitude=103.9915,is_private=False),
            dict(icao="HBBA", iata="BJM", name="Bujumbura International Airport",            city="Bujumbura",    country="Burundi",       latitude=-3.3240,  longitude=29.3185, is_private=False),
            dict(icao="HRYR", iata="KGL", name="Kigali International Airport",               city="Kigali",       country="Rwanda",        latitude=-1.9686,  longitude=30.1395, is_private=False),
        ]

        count = 0
        for data in airports:
            _, created = Airport.objects.get_or_create(icao=data["icao"], defaults=data)
            if created:
                count += 1
        self.stdout.write(self.style.SUCCESS(f"  ✓ Airports:      {count} created"))

    # ------------------------------------------------------------------ #
    # POPULAR ROUTES
    # ------------------------------------------------------------------ #

    def seed_routes(self):
        def ap(icao):
            return Airport.objects.get(icao=icao)

        routes = [
            dict(origin=ap("HKJK"), destination=ap("OMDB"), estimated_flight_time_hours=4.5,  distance_km=3600),
            dict(origin=ap("HKJK"), destination=ap("EGLL"), estimated_flight_time_hours=9.0,  distance_km=6800),
            dict(origin=ap("HKJK"), destination=ap("FAOR"), estimated_flight_time_hours=5.0,  distance_km=3800),
            dict(origin=ap("HKJK"), destination=ap("DNMM"), estimated_flight_time_hours=6.5,  distance_km=4600),
            dict(origin=ap("HKJK"), destination=ap("HKWL"), estimated_flight_time_hours=0.1,  distance_km=12),
            dict(origin=ap("HKJK"), destination=ap("HTDA"), estimated_flight_time_hours=1.5,  distance_km=840),
            dict(origin=ap("HKJK"), destination=ap("HUEN"), estimated_flight_time_hours=1.0,  distance_km=560),
            dict(origin=ap("HKJK"), destination=ap("HRYR"), estimated_flight_time_hours=1.2,  distance_km=730),
            dict(origin=ap("OMDB"), destination=ap("EGLL"), estimated_flight_time_hours=7.0,  distance_km=5500),
            dict(origin=ap("FAOR"), destination=ap("LFPB"), estimated_flight_time_hours=10.5, distance_km=9000),
            dict(origin=ap("HJJJ"), destination=ap("OMDB"), estimated_flight_time_hours=3.5,  distance_km=2800),
            dict(origin=ap("HECA"), destination=ap("EGLL"), estimated_flight_time_hours=5.0,  distance_km=3500),
            dict(origin=ap("HKJK"), destination=ap("KJFK"), estimated_flight_time_hours=15.5, distance_km=12500),
            dict(origin=ap("HKJK"), destination=ap("VHHH"), estimated_flight_time_hours=10.0, distance_km=8200),
            dict(origin=ap("FALA"), destination=ap("DNMM"), estimated_flight_time_hours=4.0,  distance_km=2800),
        ]

        count = 0
        for data in routes:
            _, created = PopularRoute.objects.get_or_create(
                origin=data["origin"], destination=data["destination"], defaults=data
            )
            if created:
                count += 1
        self.stdout.write(self.style.SUCCESS(f"  ✓ Routes:        {count} created"))

    # ------------------------------------------------------------------ #
    # BOOKINGS
    # ------------------------------------------------------------------ #

    def seed_bookings(self):
        admin, _ = User.objects.get_or_create(username="admin", defaults={"is_staff": True, "is_superuser": True})
        g700 = Aircraft.objects.filter(registration="N700GS").first()
        g550 = Aircraft.objects.filter(registration="N550GS").first()
        b737 = Aircraft.objects.filter(registration="VP-BBJ").first()
        ph3  = Aircraft.objects.filter(registration="PT-300").first()

        bookings = [
            dict(
                service_type=ServiceType.PRIVATE_JET, status=BookingStatus.CONFIRMED,
                client_name="James Okafor", client_email="james.okafor@capitaloneng.com",
                client_phone="+234 803 555 0101", client_company="Capital One Energy",
                client_nationality="Nigerian",
                origin="Lagos (LOS)", destination="Dubai (DXB)",
                departure_date=date(2025, 7, 15), departure_time=time(9, 0),
                passenger_count=4, preferred_aircraft=g550,
                catering_required=True, ground_transport=True,
                quoted_price=Decimal("48000.00"), currency="USD",
                assigned_to=admin,
                special_requests="Halal catering, airport meet-and-greet required.",
            ),
            dict(
                service_type=ServiceType.PRIVATE_JET, status=BookingStatus.PENDING,
                client_name="Amara Diallo", client_email="amara.diallo@privatemail.net",
                client_phone="+254 700 112 233", client_company="",
                client_nationality="Kenyan",
                origin="Nairobi (NBO)", destination="London Heathrow (LHR)",
                departure_date=date(2025, 8, 2), departure_time=time(23, 30),
                is_return=True, return_date=date(2025, 8, 10),
                passenger_count=2, preferred_aircraft=g700,
                catering_required=True, visa_assistance=True,
                quoted_price=None, currency="USD",
                special_requests="Anniversary trip — flowers and champagne on board.",
            ),
            dict(
                service_type=ServiceType.GROUP_CHARTER, status=BookingStatus.QUOTED,
                client_name="Fatima Al-Rashid", client_email="f.alrashid@gulfholdings.ae",
                client_phone="+971 50 888 9900", client_company="Gulf Holdings",
                client_nationality="Emirati",
                origin="Dubai (DXB)", destination="Nairobi (NBO)",
                departure_date=date(2025, 9, 10), departure_time=time(14, 0),
                passenger_count=38, preferred_aircraft=b737,
                catering_required=True, ground_transport=True,
                quoted_price=Decimal("95000.00"), currency="USD",
                assigned_to=admin,
                special_requests="Safari group — 38 pax, need ground transport to Maasai Mara.",
            ),
            dict(
                service_type=ServiceType.PRIVATE_JET, status=BookingStatus.COMPLETED,
                client_name="David Kimani", client_email="dkimani@techstartke.co.ke",
                client_phone="+254 722 334 556", client_company="TechStart Kenya",
                client_nationality="Kenyan",
                origin="Nairobi Wilson (WIL)", destination="Kigali (KGL)",
                departure_date=date(2025, 5, 20), departure_time=time(7, 30),
                passenger_count=3, preferred_aircraft=ph3,
                catering_required=False, ground_transport=False,
                quoted_price=Decimal("9500.00"), currency="USD",
                assigned_to=admin,
            ),
            dict(
                service_type=ServiceType.PRIVATE_JET, status=BookingStatus.CANCELLED,
                client_name="Sophie Müller", client_email="s.muller@germantrade.de",
                client_phone="+49 89 12345678", client_company="German Trade GmbH",
                client_nationality="German",
                origin="Johannesburg (JNB)", destination="Cape Town (CPT)",
                departure_date=date(2025, 6, 5),
                passenger_count=2,
                quoted_price=Decimal("6200.00"), currency="USD",
                admin_notes="Client cancelled due to schedule change. Refund processed.",
            ),
            dict(
                service_type=ServiceType.PRIVATE_JET, status=BookingStatus.PENDING,
                client_name="Emmanuel Osei", client_email="e.osei@oilghana.com",
                client_phone="+233 24 700 8899", client_company="OilGhana Ltd",
                client_nationality="Ghanaian",
                origin="Accra (ACC)", destination="Paris Le Bourget (LBG)",
                departure_date=date(2025, 10, 3), departure_time=time(22, 0),
                passenger_count=6,
                catering_required=True,
                special_requests="Overnight flight — need full lie-flat seats and breakfast service.",
            ),
        ]

        count = 0
        for data in bookings:
            _, created = Booking.objects.get_or_create(
                client_email=data["client_email"],
                departure_date=data["departure_date"],
                defaults=data,
            )
            if created:
                count += 1
        self.stdout.write(self.style.SUCCESS(f"  ✓ Bookings:      {count} created"))

    # ------------------------------------------------------------------ #
    # CARGO REQUESTS
    # ------------------------------------------------------------------ #

    def seed_cargo(self):
        requests = [
            dict(
                status=BookingStatus.CONFIRMED,
                client_name="Ahmed Suleiman", client_email="ahmed@transsahara.com",
                client_phone="+216 71 234 567", client_company="TransSahara Logistics",
                cargo_type=CargoType.PERISHABLE,
                description="Fresh cut flowers — roses and orchids from Nairobi farms destined for Tunis wholesale market.",
                weight_kg=2400.0, volume_cbm=12.0, pieces=80,
                is_dangerous_goods=False,
                origin="Nairobi (NBO)", destination="Tunis (TUN)",
                ready_date=date(2025, 7, 8), delivery_deadline=date(2025, 7, 9),
                quoted_price=Decimal("14500.00"), currency="USD",
            ),
            dict(
                status=BookingStatus.PENDING,
                client_name="Lena Schwartz", client_email="lena@medpharma.de",
                client_phone="+49 30 9876 5432", client_company="MedPharma GmbH",
                cargo_type=CargoType.PHARMA,
                description="Temperature-controlled vaccines (2-8°C) for WHO humanitarian programme.",
                weight_kg=650.0, volume_cbm=3.2, pieces=12,
                is_dangerous_goods=False,
                origin="Frankfurt (FRA)", destination="Nairobi (NBO)",
                ready_date=date(2025, 8, 1),
                quoted_price=None, currency="USD",
            ),
            dict(
                status=BookingStatus.QUOTED,
                client_name="Ibrahim Al-Hassan", client_email="ihassan@gulfoil.ae",
                client_phone="+971 4 555 1234", client_company="Gulf Oil Supplies",
                cargo_type=CargoType.DANGEROUS,
                description="Drilling chemicals — classified as Class 3 flammable liquids.",
                weight_kg=3200.0, volume_cbm=8.0, pieces=40,
                is_dangerous_goods=True, un_number="UN1993",
                origin="Dubai (DXB)", destination="Dar es Salaam (DAR)",
                ready_date=date(2025, 9, 15),
                quoted_price=Decimal("22000.00"), currency="USD",
            ),
            dict(
                status=BookingStatus.PENDING,
                client_name="Grace Otieno", client_email="grace@afroeventz.co.ke",
                client_phone="+254 733 445 566", client_company="AfroEventz",
                cargo_type=CargoType.OVERSIZED,
                description="Stage trusses and concert equipment for regional music festival.",
                weight_kg=5800.0, volume_cbm=42.0, pieces=6,
                is_dangerous_goods=False,
                origin="Nairobi (NBO)", destination="Lagos (LOS)",
                ready_date=date(2025, 11, 1), delivery_deadline=date(2025, 11, 3),
                quoted_price=None, currency="USD",
            ),
            dict(
                status=BookingStatus.COMPLETED,
                client_name="Pierre Dubois", client_email="p.dubois@luxart.fr",
                client_phone="+33 1 42 60 73 00", client_company="LuxArt Paris",
                cargo_type=CargoType.VALUABLES,
                description="Three museum-grade paintings transported with armed escort documentation.",
                weight_kg=180.0, volume_cbm=1.5, pieces=3,
                is_dangerous_goods=False,
                origin="Paris (LBG)", destination="Johannesburg (JNB)",
                ready_date=date(2025, 4, 10),
                quoted_price=Decimal("31000.00"), currency="USD",
            ),
        ]

        count = 0
        for data in requests:
            _, created = CargoRequest.objects.get_or_create(
                client_email=data["client_email"],
                ready_date=data["ready_date"],
                defaults=data,
            )
            if created:
                count += 1
        self.stdout.write(self.style.SUCCESS(f"  ✓ Cargo:         {count} created"))

    # ------------------------------------------------------------------ #
    # LEASING INQUIRIES
    # ------------------------------------------------------------------ #

    def seed_leasing(self):
        inquiries = [
            dict(
                status=BookingStatus.CONFIRMED,
                client_name="Captain Musa Baraka", client_email="m.baraka@afriwings.co.tz",
                client_phone="+255 22 280 5050", client_company="AfriWings Airlines",
                airline_aoc="TZ-AOC-2019-045",
                lease_type="acmi",
                preferred_aircraft_type="Boeing 737-800",
                required_seats=162, monthly_hours=300,
                start_date=date(2025, 8, 1), end_date=date(2025, 11, 30),
                primary_base="Dar es Salaam (DAR)",
                planned_routes="DAR-NBO, DAR-JNB, DAR-ADD",
                additional_requirements="Crew must hold EASA or KCAA licences.",
                quoted_price=Decimal("420000.00"), currency="USD",
            ),
            dict(
                status=BookingStatus.PENDING,
                client_name="Dr. Kwame Asante", client_email="kwame@aspireair.gh",
                client_phone="+233 30 277 1122", client_company="Aspire Air Ghana",
                airline_aoc="",
                lease_type="wet",
                preferred_aircraft_type="ATR 72-600",
                required_seats=68, monthly_hours=200,
                start_date=date(2025, 10, 1), end_date=date(2026, 3, 31),
                primary_base="Accra (ACC)",
                planned_routes="ACC-ABJ, ACC-LOS, ACC-BJL",
                additional_requirements="Wet lease with full crew and maintenance.",
                quoted_price=None, currency="USD",
            ),
            dict(
                status=BookingStatus.QUOTED,
                client_name="Maria Santos", client_email="m.santos@iberocharter.es",
                client_phone="+34 91 555 7890", client_company="IberoCharter",
                airline_aoc="ES-AOC-BIZ-2020",
                lease_type="dry",
                preferred_aircraft_type="Airbus A319CJ",
                required_seats=None, monthly_hours=None,
                start_date=date(2025, 12, 1), end_date=date(2026, 5, 31),
                primary_base="Madrid (MAD)",
                planned_routes="European and North African VIP routes",
                quoted_price=Decimal("180000.00"), currency="USD",
            ),
        ]

        count = 0
        for data in inquiries:
            _, created = LeasingInquiry.objects.get_or_create(
                client_email=data["client_email"],
                start_date=data["start_date"],
                defaults=data,
            )
            if created:
                count += 1
        self.stdout.write(self.style.SUCCESS(f"  ✓ Leasing:       {count} created"))

    # ------------------------------------------------------------------ #
    # FLIGHT SUPPORT
    # ------------------------------------------------------------------ #

    def seed_support(self):
        requests = [
            dict(
                status=BookingStatus.CONFIRMED,
                support_type="full",
                client_name="Capt. Aleksei Volkov", client_email="a.volkov@privateops.ru",
                client_phone="+7 495 123 4567", client_company="PrivateOps Aviation",
                aircraft_registration="RA-10001", aircraft_type="Gulfstream G650ER",
                origin="Moscow (VKO)", destination="Nairobi (NBO)",
                flight_date=date(2025, 7, 22),
                details="Full trip support required: overflight permits for Egypt and Ethiopia, fuel uplift at NBO, FBO handling, crew transport and accommodation for 2 nights.",
            ),
            dict(
                status=BookingStatus.PENDING,
                support_type="permits",
                client_name="Christoph Bauer", client_email="c.bauer@execflights.de",
                client_phone="+49 69 2100 3456", client_company="ExecFlights GmbH",
                aircraft_registration="D-EXEC1", aircraft_type="Dassault Falcon 7X",
                origin="Frankfurt (FRA)", destination="Kigali (KGL)",
                flight_date=date(2025, 8, 14),
                details="Overflight and landing permits needed for Sudan and Uganda. Diplomatic clearance may be required.",
            ),
            dict(
                status=BookingStatus.CONFIRMED,
                support_type="fuel",
                client_name="Omar Farouk", client_email="o.farouk@nileaviation.eg",
                client_phone="+20 2 2265 8800", client_company="Nile Aviation",
                aircraft_registration="SU-NIL", aircraft_type="Cessna Citation XLS+",
                origin="Cairo (CAI)", destination="Addis Ababa (ADD)",
                flight_date=date(2025, 7, 30),
                details="Jet A-1 fuel uplift at ADD. Quantity approx 3,200 litres. Bonded fuel preferred.",
            ),
            dict(
                status=BookingStatus.PENDING,
                support_type="handling",
                client_name="Yvonne Nakato", client_email="y.nakato@pearlcharter.ug",
                client_phone="+256 41 423 5566", client_company="Pearl Charter Uganda",
                aircraft_registration="5X-PCU", aircraft_type="Beechcraft King Air 350",
                origin="Entebbe (EBB)", destination="Bujumbura (BJM)",
                flight_date=date(2025, 9, 5),
                details="Ground handling at BJM including aircraft parking, crew catering and passenger lounge access.",
            ),
            dict(
                status=BookingStatus.COMPLETED,
                support_type="slots",
                client_name="Liu Wei", client_email="l.wei@dragonflight.cn",
                client_phone="+86 10 6500 8888", client_company="Dragon Flight",
                aircraft_registration="B-8888", aircraft_type="Bombardier Global 6000",
                origin="Hong Kong (HKG)", destination="Nairobi (NBO)",
                flight_date=date(2025, 3, 18),
                details="Slot coordination at NBO for 06:30 local arrival. Coordination with Kenya Civil Aviation Authority completed.",
            ),
        ]

        count = 0
        for data in requests:
            _, created = FlightSupportRequest.objects.get_or_create(
                client_email=data["client_email"],
                flight_date=data["flight_date"],
                defaults=data,
            )
            if created:
                count += 1
        self.stdout.write(self.style.SUCCESS(f"  ✓ Support:       {count} created"))

    # ------------------------------------------------------------------ #
    # TESTIMONIALS
    # ------------------------------------------------------------------ #

    def seed_testimonials(self):
        testimonials = [
            dict(
                client_name="James Okafor", client_title="CEO", client_company="Capital One Energy",
                service_type=ServiceType.PRIVATE_JET, rating=5, is_featured=True,
                content="Outstanding service from start to finish. The Gulfstream G550 was immaculate and the crew were professional and attentive throughout the Lagos–Dubai sector. Will not fly any other way.",
            ),
            dict(
                client_name="Fatima Al-Rashid", client_title="Director of Operations", client_company="Gulf Holdings",
                service_type=ServiceType.GROUP_CHARTER, rating=5, is_featured=True,
                content="Coordinating a 38-person safari group charter seemed daunting, but the team handled every detail flawlessly — from the BBJ configuration to ground transport at Nairobi. Truly world-class.",
            ),
            dict(
                client_name="Pierre Dubois", client_title="Managing Director", client_company="LuxArt Paris",
                service_type=ServiceType.AIR_CARGO, rating=5, is_featured=True,
                content="Transporting irreplaceable paintings across continents requires absolute trust. Our artwork arrived in perfect condition with full chain-of-custody documentation. Exceptional.",
            ),
            dict(
                client_name="Captain Musa Baraka", client_title="CEO", client_company="AfriWings Airlines",
                service_type=ServiceType.ACMI_LEASING, rating=4, is_featured=False,
                content="The ACMI arrangement for our peak season was exactly what we needed. Aircraft availability was excellent and the crew were well-briefed on our SOPs from day one.",
            ),
            dict(
                client_name="Capt. Aleksei Volkov", client_title="Director of Flight Operations", client_company="PrivateOps Aviation",
                service_type=ServiceType.FLIGHT_SUPPORT, rating=5, is_featured=True,
                content="Organising overflight permits, fuel and FBO handling across multiple African states in 48 hours is no small feat. The support team delivered without a single hitch.",
            ),
            dict(
                client_name="David Kimani", client_title="Founder", client_company="TechStart Kenya",
                service_type=ServiceType.PRIVATE_JET, rating=5, is_featured=False,
                content="Quick turnaround booking for a Nairobi–Kigali investor meeting. The Phenom 300E was ready on time and the team even sorted airport formalities at both ends. Highly recommend.",
            ),
            dict(
                client_name="Grace Otieno", client_title="Head of Logistics", client_company="AfroEventz",
                service_type=ServiceType.AIR_CARGO, rating=4, is_featured=False,
                content="Moving concert equipment across West Africa is always a challenge, but the cargo team took care of everything. Looking forward to working together again for our December tour.",
            ),
        ]

        count = 0
        for data in testimonials:
            _, created = Testimonial.objects.get_or_create(
                client_name=data["client_name"], client_company=data["client_company"],
                defaults=data,
            )
            if created:
                count += 1
        self.stdout.write(self.style.SUCCESS(f"  ✓ Testimonials:  {count} created"))