# import cv2
# import numpy as np
# import face_recognition as fr

# # Initialize video capture
# video_capture = cv2.VideoCapture(1)

# # Load the image and encode the face
# image = fr.load_image_file(r'C:\Users\rohan\Downloads\Traffic Flow Optiomization and Congestion Management\Problem Statement - 3\overtflow\frontend\boy.jpeg')
# image_face_encoding = fr.face_encodings(image)[0]

# # Create lists for known face encodings and names
# known_face_encodings = [image_face_encoding]
# known_face_names = ["Elvis"]

# while True:
#     # Capture frame-by-frame
#     ret, frame = video_capture.read()

#     # Convert the frame from BGR color to RGB
#     rgb_frame = frame[:, :, ::-1]

#     # Find all face locations and encodings in the current frame
#     fc_locations = fr.face_locations(rgb_frame)
#     fc_encodings = fr.face_encodings(rgb_frame, fc_locations)

#     for (top, right, bottom, left), face_encodings in zip(fc_locations, fc_encodings):
#         # Compare face encodings with known face encodings
#         matches = fr.compare_faces(known_face_encodings, face_encodings)
        
#         name = "Unknown"
        
#         # Calculate face distances
#         fc_distances = fr.face_distance(known_face_encodings, face_encodings)
        
#         # Find the index of the closest match
#         match_index = np.argmin(fc_distances)
        
#         if matches[match_index]:
#             name = known_face_names[match_index]
        
#         # Draw rectangle around the face
#         cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
        
#         # Draw a label with a name below the face
#         cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
#         font = cv2.FONT_HERSHEY_SIMPLEX
#         cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

#     # Display the resulting frame
#     cv2.imshow('Simplilearn Face Detection System', frame)
    
#     # Exit loop if 'q' is pressed
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release video capture and close all windows
# video_capture.release()
# cv2.destroyAllWindows()