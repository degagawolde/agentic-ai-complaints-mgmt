from rest_framework import serializers
from .models import Complaint, Resolution


class ResolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resolution
        fields = "__all__"


class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = "__all__"
        read_only_fields = ["reference_number", "date_received", "last_updated", "user"]

    def create(self, validated_data):
        # Automatically set the user to the logged-in user
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
