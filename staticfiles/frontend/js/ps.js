



function geocode(platform, addrs) {
  var geocoder = platform.getSearchService(),
    geocodingParameters = {
      q: addrs,
    }

  geocoder.geocode(geocodingParameters, onSuccess, onError)
}
/**
 * This function will be called once the Geocoder REST API provides a response
 * @param  {Object} result A JSON object representing the location(s) found.
 * See: https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1geocode/get
 */
var policeLocations = []
var latlonglst = [];
function onSuccess(result) {
  var locations = result.items
  /*
   * The styling of the geocoding response on the map is entirely under the developer's control.
   * A representitive styling can be found the full JS + HTML code of this example
   * in the functions below:
   */
  for (i = 0; i < locations.length; i += 1) {
    let location = locations[i]
    policeLocations.push(location.position);
  }
  // console.log(locations)
  
  // addLocationsToMap(locations);  //uncomment

  // ... etc.
}



function onError(error) {
    console.log("Didn't recognize")
//   alert("Can't reach the remote server")
}

// Hold a reference to any infobubble opened
var bubble

function openBubble(position, text) {
  if (!bubble) {
    bubble = new H.ui.InfoBubble(position, { content: text })
    ui.addBubble(bubble)
  } else {
    bubble.setPosition(position)
    bubble.setContent(text)
    bubble.open()
  }
}



// function addLocationsToMap(locations) {
//   var group = new H.map.Group(),
//     position,
//     i

//   // Add a marker for each location found
//   var policeIcon = new H.map.Icon(
//     'https://img.icons8.com/color/48/siren.png'
//   )      
//   //img.icons8.com/bubbles/50/traffic-jam.png

//   for (i = 0; i < locations.length; i += 1) {
//     let location = locations[i]
//     policeLocations.push(location.position);
//     marker = new H.map.Marker(location.position, {
//       icon: policeIcon,
//     })
//     marker.label = location.address.label
//     group.addObject(marker)
//   }

//   group.addEventListener(
//     'tap',
//     function (evt) {
//       map.setCenter(evt.target.getGeometry())
//       openBubble(evt.target.getGeometry(), evt.target.label)
//     },
//     false
//   )

//   // Add the locations group to the map
//   map.addObject(group)
//   //   map.setCenter(group.getBoundingBox().getCenter())
// }

// Now use the map as required...
var stationNames = [];
fetch('https://raw.githubusercontent.com/rohansahni/overtflow/main/ps.json')
  .then((response) => response.json())
  .then((json) => {
    json['KARNATAKA TRAFFIC POLICE STATIONS'].forEach((location) => {
      const address = location['TRAFFIC PS NAME']+' Police Station Bangalore' // Adjust this based on your data structure
      stationNames.push(address);
      geocode(platform, address) //uncomment
    })
  })


