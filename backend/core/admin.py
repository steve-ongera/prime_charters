from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Aircraft, Airport, PopularRoute, Booking,
    CargoRequest, LeasingInquiry, FlightSupportRequest, Testimonial
)


@admin.register(Aircraft)
class AircraftAdmin(admin.ModelAdmin):
    list_display = ['name', 'registration', 'category', 'passenger_capacity', 'range_km', 'is_available', 'is_featured', 'preview_image']
    list_filter = ['category', 'is_available', 'is_featured', 'wifi']
    search_fields = ['name', 'registration', 'manufacturer', 'model']
    list_editable = ['is_available', 'is_featured']
    readonly_fields = ['preview_image']

    def preview_image(self, obj):
        if obj.thumbnail_url:
            return format_html('<img src="{}" style="height:50px;border-radius:4px;" />', obj.thumbnail_url)
        return '—'
    preview_image.short_description = 'Preview'


@admin.register(Airport)
class AirportAdmin(admin.ModelAdmin):
    list_display = ['icao', 'iata', 'name', 'city', 'country', 'is_private']
    list_filter = ['country', 'is_private']
    search_fields = ['name', 'city', 'icao', 'iata']


@admin.register(PopularRoute)
class PopularRouteAdmin(admin.ModelAdmin):
    list_display = ['origin', 'destination', 'estimated_flight_time_hours', 'distance_km', 'is_active']
    list_filter = ['is_active']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = [
        'reference_short', 'client_name', 'client_email', 'service_type',
        'origin', 'destination', 'departure_date', 'passenger_count',
        'status_badge', 'created_at'
    ]
    list_filter = ['status', 'service_type', 'departure_date', 'catering_required']
    search_fields = ['client_name', 'client_email', 'origin', 'destination']
    readonly_fields = ['reference', 'reference_short', 'created_at', 'updated_at']
    list_editable = []
    ordering = ['-created_at']
    fieldsets = (
        ('Booking Reference', {'fields': ('reference', 'reference_short', 'status')}),
        ('Client Information', {'fields': (
            'client_name', 'client_email', 'client_phone',
            'client_company', 'client_nationality'
        )}),
        ('Flight Details', {'fields': (
            'service_type', 'origin', 'destination',
            'departure_date', 'departure_time', 'return_date', 'is_return',
            'passenger_count', 'preferred_aircraft'
        )}),
        ('Extras', {'fields': (
            'special_requests', 'catering_required',
            'ground_transport', 'visa_assistance'
        )}),
        ('Admin', {'fields': (
            'admin_notes', 'quoted_price', 'currency', 'assigned_to'
        )}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

    def reference_short(self, obj):
        return obj.reference_short
    reference_short.short_description = 'Ref'

    def status_badge(self, obj):
        colors = {
            'pending': '#f59e0b',
            'confirmed': '#10b981',
            'quoted': '#3b82f6',
            'cancelled': '#ef4444',
            'completed': '#6b7280',
        }
        color = colors.get(obj.status, '#6b7280')
        return format_html(
            '<span style="background:{};color:white;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600">{}</span>',
            color, obj.get_status_display()
        )
    status_badge.short_description = 'Status'


@admin.register(CargoRequest)
class CargoRequestAdmin(admin.ModelAdmin):
    list_display = ['reference', 'client_name', 'cargo_type', 'weight_kg', 'origin', 'destination', 'ready_date', 'status']
    list_filter = ['status', 'cargo_type', 'is_dangerous_goods']
    search_fields = ['client_name', 'client_email', 'origin', 'destination']
    readonly_fields = ['reference', 'created_at', 'updated_at']


@admin.register(LeasingInquiry)
class LeasingInquiryAdmin(admin.ModelAdmin):
    list_display = ['reference', 'client_company', 'lease_type', 'preferred_aircraft_type', 'start_date', 'end_date', 'status']
    list_filter = ['status', 'lease_type']
    search_fields = ['client_name', 'client_company', 'client_email']
    readonly_fields = ['reference', 'created_at', 'updated_at']


@admin.register(FlightSupportRequest)
class FlightSupportAdmin(admin.ModelAdmin):
    list_display = ['reference', 'client_name', 'support_type', 'origin', 'destination', 'flight_date', 'status']
    list_filter = ['status', 'support_type']
    search_fields = ['client_name', 'client_email', 'aircraft_registration']
    readonly_fields = ['reference', 'created_at', 'updated_at']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'client_company', 'rating', 'service_type', 'is_featured']
    list_filter = ['is_featured', 'service_type', 'rating']
    list_editable = ['is_featured']