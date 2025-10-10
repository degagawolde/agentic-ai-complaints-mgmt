from rest_framework import serializers
from .models import *


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


class ForwardedComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForwardedComplaint
        fields = "__all__"
