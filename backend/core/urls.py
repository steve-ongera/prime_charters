from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

# Public (read-only)
router.register(r'aircraft', views.AircraftViewSet, basename='aircraft')
router.register(r'airports', views.AirportViewSet, basename='airports')
router.register(r'routes', views.PopularRouteViewSet, basename='routes')

# Admin CRUD
router.register(r'admin/aircraft', views.AircraftAdminViewSet, basename='admin-aircraft')
router.register(r'admin/bookings', views.BookingAdminViewSet, basename='admin-bookings')
router.register(r'admin/cargo', views.CargoAdminViewSet, basename='admin-cargo')
router.register(r'admin/leasing', views.LeasingAdminViewSet, basename='admin-leasing')
router.register(r'admin/flight-support', views.FlightSupportAdminViewSet, basename='admin-flight-support')

urlpatterns = [
    path('', include(router.urls)),

    # Public booking endpoints
    path('bookings/', views.BookingCreateView.as_view(), name='booking-create'),
    path('bookings/<uuid:reference>/', views.BookingStatusView.as_view(), name='booking-status'),

    # Public service inquiry endpoints
    path('cargo/', views.CargoRequestCreateView.as_view(), name='cargo-create'),
    path('leasing/', views.LeasingInquiryCreateView.as_view(), name='leasing-create'),
    path('flight-support/', views.FlightSupportCreateView.as_view(), name='flight-support-create'),

    # Public content
    path('testimonials/', views.TestimonialListView.as_view(), name='testimonials'),

    # Admin dashboard
    path('admin/dashboard/stats/', views.DashboardStatsView.as_view(), name='dashboard-stats'),
]