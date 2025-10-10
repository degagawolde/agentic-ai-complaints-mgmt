import uuid
from django.db import models
from django.utils import timezone
from apps.submission.models import Complaint
# Create your models here.
class Department(models.Model):
    uu_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    name = models.TextField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)


class ForwardedComplaint(models.Model):
    uu_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    complaint = models.ForeignKey(
        Complaint, on_delete=models.CASCADE, related_name="forwarded_complaints"
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
