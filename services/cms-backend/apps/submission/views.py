from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Complaint, Resolution
from .serializers import ComplaintSerializer, ResolutionSerializer


class ComplaintViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Customer Complaints.
    """

    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer

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


class ResolutionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Resolutions of complaints.
    """

    queryset = Resolution.objects.all()
    serializer_class = ResolutionSerializer
