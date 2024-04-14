from django import forms
from .models import Event

# forms.py
from django import forms
# forms.py
from django import forms

class ReportForm(forms.Form):
    name = forms.CharField(
        label='Name',
        widget=forms.TextInput(attrs={'placeholder': 'Name', 'id': 'name'}),  # Add 'id' attribute
    )
    incident = forms.ChoiceField(
        label='Type of Incident',
        choices=[
            ('illegal-parking', 'Illegal Parking'),
            ('road-enroachment', 'Road Encroachment'),
            ('pothole', 'Pothole'),
            ('bad-road', 'Bad Road'),
        ],
        widget=forms.Select(attrs={'id': 'incident'}),  # Add 'id' attribute
    )
    license_plate = forms.CharField(
        label='License Plate (optional)',
        required=False,
        widget=forms.TextInput(attrs={'placeholder': 'License Plate Number', 'id': 'license-plate'}),  # Add 'id' attribute
    )
    image = forms.FileField(
        label='Upload Image',
        required=False,
        widget=forms.ClearableFileInput(attrs={'accept': 'image/*', 'id': 'fileInput'}),  # Add 'id' attribute
    )
    report_text = forms.CharField(
        label='Type your Report',
        widget=forms.Textarea(attrs={'cols': 50, 'rows': 7, 'id': 'report-text'}),  # Add 'id' attribute
    )
    assigned_ps = forms.CharField(label='Assigned PS')
    latitude = forms.CharField(label='Latitude',widget=forms.HiddenInput())
    longitude = forms.CharField(label='Longitude',widget=forms.HiddenInput())
    place = forms.CharField(label='Place',widget=forms.HiddenInput())
    
