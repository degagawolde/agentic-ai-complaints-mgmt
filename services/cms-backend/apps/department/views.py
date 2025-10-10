from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.http import HttpResponse, Http404
import os

from .models import *
from .serializers import *


# Create your views here.


class DepartmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing departments.
    """

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class ForwardedComplaintViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing forwarded complaint.
    """

    queryset = ForwardedComplaint.objects.all()
    serializer_class = ForwardedComplaintSerializer
