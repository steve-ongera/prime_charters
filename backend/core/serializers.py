from rest_framework import serializers
from .models import (
    Aircraft, Airport, PopularRoute, Booking,
    CargoRequest, LeasingInquiry, FlightSupportRequest, Testimonial
)


class AircraftSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    features_list = serializers.SerializerMethodField()

    class Meta:
        model = Aircraft
        fields = [
            'id', 'name', 'manufacturer', 'model', 'category', 'category_display',
            'registration', 'year_manufactured', 'passenger_capacity',
            'cargo_capacity_kg', 'range_km', 'cruise_speed_kmh', 'max_altitude_ft',
            'cabin_length_m', 'cabin_height_m', 'cabin_width_m',
            'wifi', 'sleeping_arrangements', 'galley', 'lavatory', 'entertainment_system',
            'features_list', 'description', 'image_url', 'interior_image_url',
            'thumbnail_url', 'is_available', 'is_featured', 'base_price_per_hour',
        ]

    def get_features_list(self, obj):
        if obj.features:
            return [f.strip() for f in obj.features.split(',') if f.strip()]
        return []


class AircraftListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing"""
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Aircraft
        fields = [
            'id', 'name', 'manufacturer', 'model', 'category', 'category_display',
            'passenger_capacity', 'range_km', 'image_url', 'thumbnail_url',
            'is_available', 'is_featured', 'base_price_per_hour',
        ]


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = '__all__'


class PopularRouteSerializer(serializers.ModelSerializer):
    origin = AirportSerializer(read_only=True)
    destination = AirportSerializer(read_only=True)

    class Meta:
        model = PopularRoute
        fields = '__all__'


# ─────────────────────────────────────────────
# BOOKING
# ─────────────────────────────────────────────

class BookingCreateSerializer(serializers.ModelSerializer):
    """Public — no auth needed"""
    class Meta:
        model = Booking
        fields = [
            'service_type', 'client_name', 'client_email', 'client_phone',
            'client_company', 'client_nationality',
            'origin', 'destination', 'departure_date', 'departure_time',
            'return_date', 'is_return', 'passenger_count', 'preferred_aircraft',
            'special_requests', 'catering_required', 'ground_transport', 'visa_assistance',
        ]

    def validate_departure_date(self, value):
        from django.utils import timezone
        if value < timezone.now().date():
            raise serializers.ValidationError("Departure date cannot be in the past.")
        return value


class BookingDetailSerializer(serializers.ModelSerializer):
    """Public — read via reference UUID"""
    service_type_display = serializers.CharField(source='get_service_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    preferred_aircraft = AircraftListSerializer(read_only=True)
    reference_short = serializers.CharField(read_only=True)

    class Meta:
        model = Booking
        fields = [
            'reference', 'reference_short', 'service_type', 'service_type_display',
            'status', 'status_display', 'client_name', 'client_email', 'client_phone',
            'client_company', 'origin', 'destination', 'departure_date', 'departure_time',
            'return_date', 'is_return', 'passenger_count', 'preferred_aircraft',
            'special_requests', 'catering_required', 'ground_transport', 'visa_assistance',
            'quoted_price', 'currency', 'created_at',
        ]


class BookingAdminSerializer(serializers.ModelSerializer):
    """Admin — full detail with write access"""
    service_type_display = serializers.CharField(source='get_service_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    preferred_aircraft_detail = AircraftListSerializer(source='preferred_aircraft', read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['reference', 'created_at', 'updated_at']


# ─────────────────────────────────────────────
# CARGO
# ─────────────────────────────────────────────

class CargoRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CargoRequest
        fields = [
            'client_name', 'client_email', 'client_phone', 'client_company',
            'cargo_type', 'description', 'weight_kg', 'volume_cbm', 'pieces',
            'is_dangerous_goods', 'un_number',
            'origin', 'destination', 'ready_date', 'delivery_deadline',
        ]


class CargoRequestAdminSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    cargo_type_display = serializers.CharField(source='get_cargo_type_display', read_only=True)

    class Meta:
        model = CargoRequest
        fields = '__all__'
        read_only_fields = ['reference', 'created_at', 'updated_at']


# ─────────────────────────────────────────────
# LEASING
# ─────────────────────────────────────────────

class LeasingInquiryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeasingInquiry
        fields = [
            'client_name', 'client_email', 'client_phone', 'client_company',
            'airline_aoc', 'lease_type', 'preferred_aircraft_type', 'required_seats',
            'start_date', 'end_date', 'primary_base', 'planned_routes',
            'monthly_hours', 'additional_requirements',
        ]


class LeasingInquiryAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeasingInquiry
        fields = '__all__'
        read_only_fields = ['reference', 'created_at', 'updated_at']


# ─────────────────────────────────────────────
# FLIGHT SUPPORT
# ─────────────────────────────────────────────

class FlightSupportCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightSupportRequest
        fields = [
            'support_type', 'client_name', 'client_email', 'client_phone',
            'client_company', 'aircraft_registration', 'aircraft_type',
            'origin', 'destination', 'flight_date', 'details',
        ]


class FlightSupportAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightSupportRequest
        fields = '__all__'
        read_only_fields = ['reference', 'created_at', 'updated_at']


# ─────────────────────────────────────────────
# TESTIMONIALS
# ─────────────────────────────────────────────

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_title', 'client_company',
            'content', 'rating', 'avatar_url', 'service_type',
        ]


# ─────────────────────────────────────────────
# DASHBOARD STATS
# ─────────────────────────────────────────────

class DashboardStatsSerializer(serializers.Serializer):
    total_bookings = serializers.IntegerField()
    pending_bookings = serializers.IntegerField()
    confirmed_bookings = serializers.IntegerField()
    total_cargo_requests = serializers.IntegerField()
    total_leasing_inquiries = serializers.IntegerField()
    total_aircraft = serializers.IntegerField()
    bookings_this_month = serializers.IntegerField()