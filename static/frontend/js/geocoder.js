// # Category/Chain search
// # parameters
var nearestPS
var parkingIcon = new H.map.Icon(
  'https://img.icons8.com/color/48/box-important--v1.png'
)
var liveIcon = new H.map.Icon('https://img.icons8.com/color/48/marker--v1.png')
function getNearestPSwithAPI(myloc) {
  console.log("My Lat Long: " + myloc.lat, myloc.lon);
  fetch(
    `https://discover.search.hereapi.com/v1/discover?at=${myloc.lat},${myloc.lng}&q=police+station&apiKey=eHuTsKn4xatkmD3xPXrrVJyR5s5lzjSFy40sUfo1Jkg`
  )
    .then((response) => response.json())
    .then((json) => {
      const items = json.items // Corrected line
      nearestPS = items[0];
      getMyLocationName(myloc)
        .then((locationData) => {
          if (locationData) {
            console.log('Location name:', locationData.title)
            const assignedPsField = document.getElementById('id_assigned_ps')
            assignedPsField.value = nearestPS.address.label
            assignedPsField.readOnly = true
            const latitudeForm = document.getElementById('id_latitude')
            const longitudeForm = document.getElementById('id_longitude')
            const placeNameForm = document.getElementById('id_place')
            latitudeForm.value = myloc.lat;
            longitudeForm.value = myloc.lng;
            placeNameForm.value = locationData.address.label

            // remove prev live markers
            const allObjects = group.getObjects()
            const markers = allObjects.filter(
              (obj) => obj instanceof H.map.Marker
            )
            
            markers.forEach((marker) => {
              console.log('MARKER:', marker.icon, "Wanted:",liveIcon)
              if (marker.icon === liveIcon) {
                group.removeObject(marker)
                
                
                // Listen for dragend event
                marker.addEventListener('dragend', (ev) => {
                  var myloc = {
                    lat: marker.getGeometry().lat,
                    lng: marker.getGeometry().lng,
                  }
                  getNearestPSwithAPI(myloc);

                  // Re-enable map behavior
                  // behavior.enable();

                  // Call your getNearestPSwithAPI function here
                  // getNearestPSwithAPI(marker.getGeometry().lat, marker.getGeometry().lng);
                })
                
              }
            })
            // Use the locationData in your other function
            

            addMarkerToGroup(
              group,
              myloc,
              `<div style="width: 400px; display: flex; height:auto">
              <div style="margin: 5px;"  class='report-header'>
                  <div>
                      <h4>Your Location:</h4>
                      <p>${locationData.address.label}</p>
                  </div>
                  <div>
                    <h4>Nearest PS:</h4>
                    <p>${nearestPS.address.label} at: ${nearestPS.distance} meters away</p>
                  </div>
                  <div>
                  <a onclick="reportWindow.style.display = 'block';" href="#" class="btn">Report an incident here</a>
                  </div>
              </div>
                 
              </div>`,
              true,
              liveIcon
            )
          } else {
            console.log('Location data not available.')
          }
        })
        .catch((error) => {
          console.error('Error fetching location data:', error)
        })


    //   for (let i = 0; i < items.length; i++) {
    //     console.log(items[i])
    //     const address = items[i].address
    //     const distance = items[i].distance
    //     console.log(`Item ${i + 1}:`)
    //     console.log(`Address: ${address.label}`)
    //     console.log(`Distance: ${distance} meters\n`)
    //   }
    })
    
}


async function getMyLocationName(myloc) {
  try {
    const response = await fetch(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${myloc.lat},${myloc.lng}&lang=en-US&apiKey=eHuTsKn4xatkmD3xPXrrVJyR5s5lzjSFy40sUfo1Jkg`
    )
    const json = await response.json()
    return json.items[0]
  } catch (error) {
    console.error('Error fetching location data:', error)
    return null // Return a default value or handle the error as needed
  }
}
