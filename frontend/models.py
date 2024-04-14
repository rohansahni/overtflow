
# Create your models here.
from django.db import models
from django.utils import timezone
import uuid

class Event(models.Model):
    """Model for storing event information."""
    INCIDENT_TYPES = [
        ('illegal_parking', 'Illegal Parking'),
        ('road_encroachment', 'Road Encroachment'),
        ('potholes', 'Potholes'),
        ('bad_road_condition', 'Bad Road Condition'),
    ]

 
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    place = models.CharField(max_length=255)  
    event_type = models.CharField(max_length=255)
    time_created = models.DateTimeField(blank=True, null=True)
    deadline = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=255)
    generated_by = models.CharField(max_length=255)
    licence_plate = models.CharField(max_length=20,null=True)  
    report_text = models.TextField() 
    assigned_ps = models.TextField() 
    image = models.ImageField(upload_to='event_images/',blank=True,null=True)

    def __str__(self):
        return f"Event ID: {self.id}, Type: {self.event_type}"
    

