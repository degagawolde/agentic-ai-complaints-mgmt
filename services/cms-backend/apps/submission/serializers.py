from rest_framework import serializers
from .models import Complaint, Resolution


class ResolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resolution
        fields = "__all__"


class ComplaintSerializer(serializers.ModelSerializer):
    resolutions = ResolutionSerializer(many=True, read_only=True)

    class Meta:
        model = Complaint
        fields = "__all__"
        read_only_fields = ("reference_number", "date_received", "last_updated")
