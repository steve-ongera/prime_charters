from django.utils import timezone
from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from .models import (
    Aircraft, Airport, PopularRoute, Booking,
    CargoRequest, LeasingInquiry, FlightSupportRequest, Testimonial
)
from .serializers import (
    AircraftSerializer, AircraftListSerializer, AirportSerializer,
    PopularRouteSerializer, BookingCreateSerializer, BookingDetailSerializer,
    BookingAdminSerializer, CargoRequestCreateSerializer, CargoRequestAdminSerializer,
    LeasingInquiryCreateSerializer, LeasingInquiryAdminSerializer,
    FlightSupportCreateSerializer, FlightSupportAdminSerializer,
    TestimonialSerializer, DashboardStatsSerializer,
)


# ─────────────────────────────────────────────
# AIRCRAFT (public read)
# ─────────────────────────────────────────────

class AircraftViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'is_available', 'is_featured']

    def get_queryset(self):
        qs = Aircraft.objects.filter(is_available=True)
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        passengers = self.request.query_params.get('min_passengers')
        if passengers:
            qs = qs.filter(passenger_capacity__gte=passengers)
        return qs

    def get_serializer_class(self):
        if self.action == 'list':
            return AircraftListSerializer
        return AircraftSerializer


class AircraftAdminViewSet(viewsets.ModelViewSet):
    """Admin-only full CRUD"""
    queryset = Aircraft.objects.all()
    serializer_class = AircraftSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'is_available', 'is_featured']


# ─────────────────────────────────────────────
# AIRPORTS & ROUTES (public)
# ─────────────────────────────────────────────

class AirportViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        q = self.request.query_params.get('q')
        if q:
            qs = qs.filter(
                Q(name__icontains=q) | Q(city__icontains=q) |
                Q(iata__icontains=q) | Q(icao__icontains=q)
            )
        return qs


class PopularRouteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PopularRoute.objects.filter(is_active=True).select_related('origin', 'destination')
    serializer_class = PopularRouteSerializer
    permission_classes = [AllowAny]


# ─────────────────────────────────────────────
# BOOKINGS — PUBLIC (no auth)
# ─────────────────────────────────────────────

class BookingCreateView(generics.CreateAPIView):
    """Any visitor can submit a booking enquiry"""
    queryset = Booking.objects.all()
    serializer_class = BookingCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()
        return Response(
            {
                'message': 'Your booking enquiry has been submitted. Our team will contact you shortly.',
                'reference': str(booking.reference),
                'reference_short': booking.reference_short,
                'status': booking.status,
            },
            status=status.HTTP_201_CREATED
        )


class BookingStatusView(generics.RetrieveAPIView):
    """Public: check booking by UUID reference"""
    queryset = Booking.objects.all()
    serializer_class = BookingDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'reference'


# ─────────────────────────────────────────────
# BOOKINGS — ADMIN
# ─────────────────────────────────────────────

class BookingAdminViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.select_related('preferred_aircraft', 'assigned_to').all()
    serializer_class = BookingAdminSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'service_type']

    def get_queryset(self):
        qs = super().get_queryset()
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                Q(client_name__icontains=search) |
                Q(client_email__icontains=search) |
                Q(origin__icontains=search) |
                Q(destination__icontains=search)
            )
        return qs

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        booking = self.get_object()
        new_status = request.data.get('status')
        if new_status not in dict(Booking.status.field.choices):
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        booking.status = new_status
        if 'admin_notes' in request.data:
            booking.admin_notes = request.data['admin_notes']
        if 'quoted_price' in request.data:
            booking.quoted_price = request.data['quoted_price']
        booking.save()
        return Response(BookingAdminSerializer(booking).data)


# ─────────────────────────────────────────────
# CARGO — PUBLIC + ADMIN
# ─────────────────────────────────────────────

class CargoRequestCreateView(generics.CreateAPIView):
    queryset = CargoRequest.objects.all()
    serializer_class = CargoRequestCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cargo = serializer.save()
        return Response(
            {
                'message': 'Cargo request submitted. We will contact you with a quote.',
                'reference': str(cargo.reference),
            },
            status=status.HTTP_201_CREATED
        )


class CargoAdminViewSet(viewsets.ModelViewSet):
    queryset = CargoRequest.objects.all()
    serializer_class = CargoRequestAdminSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'cargo_type']


# ─────────────────────────────────────────────
# LEASING — PUBLIC + ADMIN
# ─────────────────────────────────────────────

class LeasingInquiryCreateView(generics.CreateAPIView):
    queryset = LeasingInquiry.objects.all()
    serializer_class = LeasingInquiryCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()
        return Response(
            {
                'message': 'Leasing inquiry submitted. Our fleet team will be in touch.',
                'reference': str(inquiry.reference),
            },
            status=status.HTTP_201_CREATED
        )


class LeasingAdminViewSet(viewsets.ModelViewSet):
    queryset = LeasingInquiry.objects.all()
    serializer_class = LeasingInquiryAdminSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'lease_type']


# ─────────────────────────────────────────────
# FLIGHT SUPPORT — PUBLIC + ADMIN
# ─────────────────────────────────────────────

class FlightSupportCreateView(generics.CreateAPIView):
    queryset = FlightSupportRequest.objects.all()
    serializer_class = FlightSupportCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        support = serializer.save()
        return Response(
            {
                'message': 'Flight support request received. Our team will respond within 2 hours.',
                'reference': str(support.reference),
            },
            status=status.HTTP_201_CREATED
        )


class FlightSupportAdminViewSet(viewsets.ModelViewSet):
    queryset = FlightSupportRequest.objects.all()
    serializer_class = FlightSupportAdminSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'support_type']


# ─────────────────────────────────────────────
# TESTIMONIALS (public)
# ─────────────────────────────────────────────

class TestimonialListView(generics.ListAPIView):
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = Testimonial.objects.all()
        featured = self.request.query_params.get('featured')
        if featured:
            qs = qs.filter(is_featured=True)
        return qs


# ─────────────────────────────────────────────
# ADMIN DASHBOARD STATS
# ─────────────────────────────────────────────

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        now = timezone.now()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

        stats = {
            'total_bookings': Booking.objects.count(),
            'pending_bookings': Booking.objects.filter(status='pending').count(),
            'confirmed_bookings': Booking.objects.filter(status='confirmed').count(),
            'total_cargo_requests': CargoRequest.objects.count(),
            'total_leasing_inquiries': LeasingInquiry.objects.count(),
            'total_aircraft': Aircraft.objects.filter(is_available=True).count(),
            'bookings_this_month': Booking.objects.filter(created_at__gte=month_start).count(),
        }
        serializer = DashboardStatsSerializer(stats)
        return Response(serializer.data)