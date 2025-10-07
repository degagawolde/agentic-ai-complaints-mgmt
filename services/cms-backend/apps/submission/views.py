from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.http import HttpResponse, Http404
import os

from .models import Complaint, Resolution
from .serializers import ComplaintSerializer, ResolutionSerializer

class ComplaintViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Customer Complaints.
    """
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter complaints by the logged-in user
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """
        Handle file upload properly and create a complaint.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # DRF will handle file fields automatically
            return Response(
                {
                    "message": "Complaint submitted successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "Complaint submission failed", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # --- Download endpoint ---
    @action(detail=True, methods=["get"], url_path="download")
    def download_file(self, request, pk=None):
        complaint = self.get_object()
        file_field = complaint.supporting_documents
        if not file_field:
            raise Http404("No file attached to this complaint.")

        file_path = file_field.path
        if not os.path.exists(file_path):
            raise Http404("File not found on server.")

        with open(file_path, "rb") as f:
            response = HttpResponse(f.read(), content_type="application/octet-stream")
            response["Content-Disposition"] = (
                f'attachment; filename="{os.path.basename(file_path)}"'
            )
            return response


class ResolutionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Resolutions of complaints.
    """
    queryset = Resolution.objects.all()
    serializer_class = ResolutionSerializer
