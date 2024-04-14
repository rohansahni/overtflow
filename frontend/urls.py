from . import views
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', views.home, name='home'),
    path('video-results/', views.video_results_view, name= 'video_results'),
    path('video-processing-results/', views.video_processing_view, name='video_processing_results'),
    path('api/events/', views.all_events, name='events'),
    path('reports/', views.all_reports, name='reports'),
    path('records/', views.records_view, name='records'),
    path('dashboard/', views.event_graph_view, name='dashboard'),
    path('poc/', views.point_of_contact, name='poc'),
    path('notification/', views.notification_view, name='notification'),
 
    # path('api/report/', views.send_report, name='send_report'),
]