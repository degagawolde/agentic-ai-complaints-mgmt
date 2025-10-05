import uuid
from django.db import models

# Create your models here.
class Department(models.Model):
    uu_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
