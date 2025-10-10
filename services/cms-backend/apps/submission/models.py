import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class ComplaintStatus(models.TextChoices):
    RECEIVED = "RECEIVED", "Received"
    IN_PROGRESS = "IN_PROGRESS", "In Progress"
    RESOLVED = "RESOLVED", "Resolved"
    REJECTED = "REJECTED", "Rejected"

class ResolutionStatus(models.TextChoices):
    DRAFTED = "drafted", "Drafted"
    VALIDATED = "validated", "Validated"
    DELIVERED = "delivered", "Delivered"
    REJECTED = "REJECTED", "Rejected"


class ChannelChoices(models.TextChoices):
    EMAIL = "email", "Email"
    SMS =   "sms", "SMS"
    PHONE = "PHONE", "Phone"
    IN_PERSON = "IN_PERSON", "In Person"
    WEB = "WEB", "Website"
    SOCIAL_MEDIA = "SOCIAL_MEDIA", "Social Media"

class StatusChoices(models.TextChoices):
    PENDING = "pending", "Pending"
    SENT = "sent", "Sent"
    FAILED = "failed", "Failed"

class Complaint(models.Model):
    uu_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # --- Customer Information ---
    # --- User Information ---
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="complaints")
    # --- Complaint Details ---
    date_of_incident = models.DateField(blank=True, null=True)
    product_or_service = models.CharField(max_length=255)
    order_or_invoice_number = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField()
    supporting_documents = models.FileField(
        upload_to="complaints/supporting_docs/", blank=True, null=True
    )

    # --- Context ---
    location = models.CharField(max_length=255, blank=True, null=True)
    staff_involved = models.CharField(max_length=255, blank=True, null=True)
    actions_already_taken = models.TextField(blank=True, null=True)

    # --- Desired Outcome ---
    desired_outcome = models.TextField(max_length=255, blank=True, null=True)

    # --- Complaint Handling ---
    complaint_channel = models.CharField(
        null=True,
        max_length=50, choices=ChannelChoices.choices, default=ChannelChoices.WEB
       
    )
    complaint_status = models.CharField(
        max_length=20, choices=ComplaintStatus.choices, default=ComplaintStatus.RECEIVED
    )
    reference_number = models.CharField(max_length=50, unique=True, blank=True)
    date_received = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date_received"]
        verbose_name = "Customer Complaint"
        verbose_name_plural = "Customer Complaints"

    def save(self, *args, **kwargs):
        # Auto-generate reference number if not set
        if not self.reference_number:
            self.reference_number = f"CMP-{timezone.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference_number} - {self.customer.full_name}"


class Resolution(models.Model):
    uu_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    complaint = models.ForeignKey(
        Complaint, on_delete=models.CASCADE, related_name="resolutions"
    )
    resolution_text = models.TextField()
    resolved_by = models.CharField(max_length=100, null=True)  # AI, Department, Hybrid
    validated_by_ai = models.BooleanField(default=False)
    resolved_by_ai = models.BooleanField(default=False)
    solution_status = models.CharField(
        max_length=20,
        choices=ComplaintStatus.choices,
        default=ResolutionStatus.DRAFTED,
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Resolution {self.uu_id} for Complaint {self.created_at}"
