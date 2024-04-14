import cv2
from ultralytics import YOLO
import json
import onnxruntime as ort
from PIL import Image
import numpy as np
import threading
from collections import defaultdict
# Initialize YOLOv8 and background subtractor
model = YOLO('yolov8n.pt')
# model.export(format="onnx")
# model = ort.InferenceSession("yolov8n.onnx", providers=['CPUExecutionProvider'])

back_sub = cv2.createBackgroundSubtractorMOG2(history=500, varThreshold=100, detectShadows=True)
from .models import Event
from django.utils import timezone
from django.core.files.base import ContentFile

# Load the JSON file
f = open("incidents.json",'w')
    
incident_stats = {}
# https://dev.to/andreygermanov/how-to-create-yolov8-based-object-detection-web-service-using-python-julia-nodejs-javascript-go-and-rust-4o8e
# Process video
class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(r'C:\Users\rohan\Downloads\Traffic Flow Optiomization and Congestion Management\Problem Statement - 3\Nr_ABVMCRI_Gate_FIX_1.mp4')
        (self.grabbed, self.frame) = self.video.read()
        threading.Thread(target=self.update, args=()).start()
    
    def __del__(self):
        self.video.release()


    def get_frame(self):
        image = self.frame
        _, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()
    
    def update(self):
        # Store the track history
        # track_history = defaultdict(lambda: [])
        detected_objects = {}
        while True:
                (self.grabbed, self.frame) = self.video.read()
                height, width = self.frame.shape[0], self.frame.shape[1]
                self.frame = self.frame[200:height, 0:width]
                fg_mask = back_sub.apply(self.frame)
                results = model.track(self.frame, persist=True, classes=[2,3,5,7])
                
                
                boxes = results[0].boxes.xyxy.cpu()
                track_ids = results[0].boxes.id.int().cpu().tolist()
                
                for box, track_id in zip(boxes, track_ids):
                    
                            x1, y1, x2, y2 = box
                            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                            # track = track_history[track_id]
                            # object has motion
                            if 0< fg_mask[y1:y2, x1:x2].mean() < 20:  
                                # stationary_objects.append((x1, y1, x2, y2))
                                cv2.rectangle(self.frame, (x1,y1),(x2,y2),(0,255,0),2)
                                cv2.putText(self.frame, "Stationary: "+str(track_id), (x1,y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0),2)
                                self.lat = 12.985534+0.000034
                                self.lon = 77.605660+0.000023

                                if track_id not in detected_objects:
                                    print(track_id)
                                    detected_objects[track_id] = {
                                                "lat": 17.456334,
                                                "lon": 12.345345,
                                                "incident_type": "illegal_parking",  
                                                "incident_stats": "Open",
                                            }

                                    
                                    # incident_key = f"{lat},{lon}"
                                    # if incident_key not in incident_stats:
                                    #     incident_stats[incident_key] = {"type": [], "count": 0}

                                   
                                    self.incident_type = "illegal_parking"  
                                    self.incident_stats = "Open"
                                    self.generated_by = 'IP Camera'
                                    self.assigned_ps = 'IP Camera'
                                    self.report_text = 'Auto causing problems'
                                    self.place = 'IP Camera'
                                    self.time_created = timezone.now()
                                   
                                    if self.incident_type == 'illegal_parking':
                                        self.deadline = self.time_created + timezone.timedelta(minutes=15)
                                    elif self.incident_type == 'road_encroachment':
                                        self.deadline = self.time_created + timezone.timedelta(minutes=30)
                                    elif self.incident_type == 'potholes':
                                        self.deadline = self.time_created + timezone.timedelta(days=1)
                                    elif self.incident_type == 'bad_road_condition':
                                        self.deadline = self.time_created + timezone.timedelta(weeks=1)
                                    cropped_image = self.frame[y1:y2, x1:x2]
                                    ret, buf = cv2.imencode('.jpg', cropped_image) # cropped_image: cv2 / np array
                                    content = ContentFile(buf.tobytes())

                                    
                                    # incident_stats[incident_key]["count"] += 1
                                    
                                    event_model = Event(latitude = self.lat,
                                        longitude = self.lon,
                                        event_type = self.incident_type,
                                        time_created = self.time_created,
                                        deadline = self.deadline,
                                        status = self.incident_stats,
                                        generated_by = self.generated_by,
                                        assigned_ps = self.assigned_ps,
                                        place = self.place,
                                        report_text = self.report_text,
                                        image = content)
                                    event_model.image.save(f'output{track_id}.jpg', content)
                                    event_model.save()
            
            

def gen(camera):
    while True:
        frame= camera.get_frame()
        yield b"--frame\r\nContent-Type: image/jpeg\r\n\r\n" + frame + b"\r\n\r\n"



# def process_video(video_path):

#     cap = cv2.VideoCapture('Russel_Market_Entrance_PTZ_1.mp4')
#     threading.Thread().start()
#     while cap.isOpened():
#         ret, frame = cap.read()
#         # print(frame.shape)
#         height, width = frame.shape[0], frame.shape[1]
#         frame = frame[200:height, 0:width]
#         if not ret:
#             break

#         # Apply background subtraction
#         fg_mask = back_sub.apply(frame)

#         # Detect objects with YOLOv8
#         results = model(frame)
#         print()
#         # Filter out static objects
#         stationary_objects = []
#         for result in results:
#             for i in result.boxes:
#                 for box in i.xyxy.cpu().numpy():
#                     # print(box) #only vehicles and umbrellas
#                     x1, y1, x2, y2 = map(int, box)
#                     # Check if the detected object has motion
#                     if 0< fg_mask[y1:y2, x1:x2].mean() < 20:  # Adjust the threshold value as needed
#                         stationary_objects.append((x1, y1, x2, y2))
#                         cv2.rectangle(frame, (x1,y1),(x2,y2),(0,255,0),2)
#                         lat = frame.get(cv2.CAP_PROP_POS_LAT)
#                         lon = frame.get(cv2.CAP_PROP_POS_LONG)

#                         # Add the latitude and longitude to the incident dictionary
#                         incident_key = f"{lat},{lon}"
#                         if incident_key not in incident_stats:
#                             incident_stats[incident_key] = {"type": [], "count": 0}

#                         # Add the type of incident to the incident dictionary
#                         incident_type = "vehicle"  # or "umbrella" based on the detected object
#                         incident_stats[incident_key]["type"].append(incident_type)

#                         # Increment the count of incidents for the current location
#                         incident_stats[incident_key]["count"] += 1


#         cv2.imshow('result', frame)
#         cv2.imshow('fg_mask', fg_mask)
#         cv2.waitKey(1)
        
#         # Yield results as a dictionary
#         yield {
#             "frame": frame,
#             "stationary_objects": stationary_objects,
#             "incident_stats": incident_stats
#         }
                
#         # Now `moving_objects` contains only moving objects
#         # You can further process `moving_objects` as needed
#     cap.release()


# print(next(process_video(r'C:\Users\rohan\Downloads\Traffic Flow Optiomization and Congestion Management\Problem Statement - 3\Nr_ABVMCRI_Gate_FIX_1.mp4')))