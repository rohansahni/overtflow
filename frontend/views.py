from django.shortcuts import render, redirect
import cv2
from django.views.decorators import gzip
from django.http import StreamingHttpResponse, JsonResponse
from .yolo_processing import VideoCamera, gen
# Create your views here.
from .models import Event 
from django.views.decorators.clickjacking import xframe_options_exempt
from rest_framework.response import Response
from .serializers import EventSerializer
from rest_framework.decorators import api_view
from .forms import ReportForm
from django.utils import timezone

def home(request):
    
    if request.method == 'POST':
        form = ReportForm(request.POST, request.FILES)
        if form.is_valid():
            print(form.cleaned_data)
            
            incident_type =form.cleaned_data['incident']
            time_created = timezone.now()
            deadline = time_created  + timezone.timedelta(weeks=1)
            if incident_type == 'illegal-parking':
                deadline = time_created + timezone.timedelta(minutes=15)
            elif incident_type == 'road-encroachment':
                deadline = time_created + timezone.timedelta(minutes=30)
            elif incident_type == 'potholes':
                deadline = time_created + timezone.timedelta(days=1)
            elif incident_type == 'bad-road-condition':
                deadline = time_created + timezone.timedelta(weeks=1)
            
            

            event = Event(
                latitude=form.cleaned_data['latitude'],
                longitude=form.cleaned_data['longitude'],
                place=form.cleaned_data['place'],
                event_type =incident_type,
                generated_by=form.cleaned_data['name'],
                licence_plate=form.cleaned_data['license_plate'],
                image=form.cleaned_data['image'],
                report_text=form.cleaned_data['report_text'],
                assigned_ps = form.cleaned_data['assigned_ps'],
                time_created = time_created,
                deadline = deadline,
                status = "OPEN"
            )
            event.save()  
            print(f"Event saved with ID: {event.id}")
    else:
        form = ReportForm()

    return render(request, 'frontend/index.html', {'form': form})


def all_reports(request):
    events = Event.objects.all()
    return render(request, 'frontend/reports.html',{'events': events})


def point_of_contact(request):
    return render(request, 'frontend/poc.html')

def notification_view(request):
    events = Event.objects.all()

    for event in events:
        if timezone.now() > event.deadline and event.status == "OPEN":
            # Update the status to "NOT COMPLETED"
            event.status = "NOT COMPLETED"
            event.save()  # Save the updated event

    return render(request, "frontend/notification.html")

def records_view(request):
    # Filter events with status "closed" or "not completed"
    events = Event.objects.filter(status__in=["CLOSED", "NOT COMPLETED"])

    # Other code (if needed)

    return render(request, "frontend/records.html", {"events": events})


from collections import Counter
def event_graph_view(request):
    today = timezone.now()
    one_month_ago = today - timezone.timedelta(days=today.day)  # Go back to the beginning of the current month
    events = Event.objects.filter(time_created__gte=one_month_ago)

    day_wise_counts = Counter(event.time_created.day for event in events)

    context = {
        'events': events,
        'day_wise_counts': day_wise_counts,
    }
    return render(request, 'frontend/dashboard.html', context)


@xframe_options_exempt
@gzip.gzip_page
def video_processing_view(request):
    try:
       cam = VideoCamera()
       return StreamingHttpResponse(gen(cam), content_type = "multipart/x-mixed-replace;boundary=frame")
    except:
        data = {
            'message': 'No IP Camera found',
            'status': 'failed'
        }
        return JsonResponse(data)



def video_results_view(request):
    return render(request, 'frontend/cv_results.html')




@api_view(['GET'])
def all_events(request):
   # Retrieve all events
    all_events = Event.objects.all()

    # Serialize the data
    serializer = EventSerializer(all_events, many=True)

    # Return the serialized data as a JSON response
    return Response(serializer.data)


# import json

# @api_view(['POST'])
# def send_report(request):
#    # Retrieve all events
#     all_events = Event.objects.all()

#     # Serialize the data
#     serializer = EventSerializer(all_events, many=True)

#     if request.method == "POST":
#         form = QueryForm(request.POST)
#         if form.is_valid():
#             print(form.cleaned_data['Name'])
            