from django.db import models
from django.utils import timezone

# Create your models here.


class Complaint(models.Model):
    STATUS_CHOICES = [
        ("submitted", "Submitted"),
        ("under_review", "Under Review"),
        ("resolved", "Resolved"),
        ("closed", "Closed"),
    ]
    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("normal", "Normal"),
        ("high", "High"),
        ("critical", "Critical"),
    ]

    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name="complaints"
    )
    subject = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(
        max_length=100, blank=True, null=True
    )  # e.g., Billing, Service, Product
    status = models.CharField(
        max_length=50, choices=STATUS_CHOICES, default="submitted"
    )
    priority = models.CharField(
        max_length=20, choices=PRIORITY_CHOICES, default="normal"
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Complaint {self.id} - {self.subject}"


class Resolution(models.Model):
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("validated", "Validated"),
        ("delivered", "Delivered"),
    ]

    complaint = models.ForeignKey(
        Complaint, on_delete=models.CASCADE, related_name="resolutions"
    )
    resolution_text = models.TextField()
    resolved_by = models.CharField(max_length=100)  # AI, Department, Hybrid
    validated_by_ai = models.BooleanField(default=False)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="draft")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Resolution {self.id} for Complaint {self.complaint_id}"


class Communication(models.Model):
    CHANNEL_CHOICES = [
        ("email", "Email"),
        ("sms", "SMS"),
    ]
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("sent", "Sent"),
        ("failed", "Failed"),
    ]

    complaint = models.ForeignKey(
        Complaint, on_delete=models.CASCADE, related_name="communications"
    )
    channel = models.CharField(max_length=50, choices=CHANNEL_CHOICES)
    message = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="pending")
    sent_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.channel.upper()} for Complaint {self.complaint_id}"
