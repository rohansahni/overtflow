# OVERTFLOW
### Solution for Karnataka State Police Datathon 2024:
![image](https://github.com/rohansahni/overtflow/assets/65642059/76dd0e28-c261-473b-b724-2dce215875cb)

Our solution, Overt Flow is a proactive traffic management 
system, set to revolutionize the way we approach traffic 
management in India, starting from Bangalore. Unlike existing 
platforms like Google Maps and Waze, which focus mainly on 
post-congestion navigation, our system takes a proactive 
approach by addressing potential congestion triggers before 
they escalate into major traffic jams. 
By empowering drivers who are in the vicinity of 100 meters of 
a junction to report issues such as improperly parked vehicles 
and potholes in real-time, we aim to collaborate with 
authorities to swiftly resolve these issues and ensure 
smoother journeys for everyone on the road. </br>

### Instructions:
1. Clone the Repo ```git clone https://github.com/rohansahni/overtflow.git
cd overtflow```
2. Install Dependencies
```pip install -r requirements.txt```
 > for linux uusers remember to run sudo apt-get update && sudo apt-get install ffmpeg libsm6 libxext6 -y
4. Run the code
   ```python manage.py runserver 0.0.0.0:8000```
5. The server will run at http://localhost:8000/
   </br>
   </br>
### Tech Stack Used
 1. HereMaps APIs
> a. Leveraging Geocoding API for precise location services. </br>
> b. Utilizing Directions API for dynamic route optimization. </br>
 > c. Geofencing API for identifying nearby authorities and services.</br>
2. Python:
 > a. Backend development and data processing.</br>
 > b. Seamless integration with Google Maps APIs and SUMO for efficient data retrieval and visualization.</br>
3. Django Framework:
 > a. Backend server development and REST API management.</br>
 > b. Ensuring scalability, security, and rapid development.</br>
4. HTML/CSS/JavaScript:
 > a. Frontend development focusing on intuitive user interface design.
 > b. Harnessing the power of Google Maps</br> JavaScript API for an immersive map visualization experience.</br>


![image](https://github.com/rohansahni/overtflow/assets/65642059/13d7c0a4-11ee-4d77-8d4e-877b746181ce)

### Why our approach is unique?
1. Proactive Incident Reporting: Drivers are empowered via incentive points 
(like in CRED app) to report issues such as improperly parked vehicles and 
potholes in real-time via our intuitive app interface.
2. Automated Priority Assignment: Complaints are prioritized based on the 
number of reports received in a particular area, ensuring timely resolution 
of high-priority issues.
3. Swift Notification to Authorities: Once a complaint reaches the threshold 
of 5 reports, the nearest police personnel are notified immediately for swift 
action.
4. Real-Time Task Tracking: The app tracks the status of reported issues in 
real-time, providing users with updates on the progress of resolution 
efforts.
5. Dynamic Rerouting Suggestions: In cases where potential congestion 
triggers cannot be resolved immediately, drivers are provided with dynamic 
rerouting suggestions to avoid affected areas.

-------------------------------------------------------------
Team Members: Rohan Sahni, Chandan Chakravarty, Hari Subburaman and Suriya Prakash.
