function findNearestMarker(coords) {
  var minDist = 10000,
    nearest_text = '*None*',
    markerDist,
    // get all objects added to the map
    objects = map.getObjects(),
    len = map.getObjects().length,
    i

  // iterate over objects and calculate distance between them
  for (i = 0; i < len; i += 1) {
    try {
      markerDist = objects[i].getGeometry().distance(coords)
      if (markerDist < minDist) {
        minDist = markerDist
        nearest_text = objects[i].getData()
      }
    } catch (e) {
      console.log(e)
    }
  }

  logEvent('The nearest marker is: ' + nearest_text)
  console.log('The nearest marker is: ' + nearest_text)
}

function addClickEventListenerToMap(map) {
  // add 'tap' listener
  map.addEventListener(
    'tap',
    function (evt) {
      var coords = map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      )
      findNearestMarker(coords)
    },
    false
  )
}

/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey

// Step 4: create custom logging facilities
var logContainer = document.createElement('ul')
logContainer.className = 'log'
logContainer.innerHTML = '<li class="log-entry">Try clicking on the map</li>'
map.getElement().appendChild(logContainer)

// Helper for logging events
function logEvent(str) {
  var entry = document.createElement('li')
  entry.className = 'log-entry'
  entry.textContent = str
  logContainer.insertBefore(entry, logContainer.firstChild)
}

// Set up five markers.
// var coords = policeLocations;
var coords = [
  {
    lat: 12.99514,
    lng: 77.75773,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 13.09531,
    lng: 77.59441,
  },
  {
    lat: 12.94179,
    lng: 77.5739,
  },
  {
    lat: 12.95021,
    lng: 77.59619,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 12.9421,
    lng: 77.57233,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 13.09531,
    lng: 77.59441,
  },
  {
    lat: 12.95977,
    lng: 77.65617,
  },
  {
    lat: 17.26188,
    lng: 78.38807,
  },
  {
    lat: 12.95486,
    lng: 77.66334,
  },
  {
    lat: 12.955,
    lng: 77.68281,
  },
  {
    lat: 9.00587,
    lng: 7.27973,
  },
  {
    lat: 12.97597,
    lng: 77.59868,
  },
  {
    lat: 12.92792,
    lng: 77.63045,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 12.92838,
    lng: 77.59057,
  },
  {
    lat: 13.02473,
    lng: 77.5932,
  },
  {
    lat: 12.96049,
    lng: 77.564,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 12.95886,
    lng: 77.5284,
  },
  {
    lat: 13.03344,
    lng: 77.57584,
  },
  {
    lat: 13.02249,
    lng: 77.51786,
  },
  {
    lat: 12.93626,
    lng: 77.56133,
  },
  {
    lat: 13.02131,
    lng: 77.6202,
  },
  {
    lat: 13.01451,
    lng: 77.63606,
  },
  {
    lat: 12.94179,
    lng: 77.5739,
  },
  {
    lat: 12.90516,
    lng: 77.56283,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 13.0196,
    lng: 77.64022,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 13.09531,
    lng: 77.59441,
  },
  {
    lat: 12.94252,
    lng: 77.57398,
  },
  {
    lat: 13.03344,
    lng: 77.57584,
  },
  {
    lat: 12.93922,
    lng: 77.61012,
  },
  {
    lat: 12.93017,
    lng: 77.56062,
  },
  {
    lat: 12.93644,
    lng: 77.57936,
  },
  {
    lat: 12.94179,
    lng: 77.5739,
  },
  {
    lat: 13.17246,
    lng: 77.63275,
  },
  {
    lat: 12.96026,
    lng: 77.57201,
  },
  {
    lat: 13.01237,
    lng: 77.53671,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 28.64577,
    lng: 77.20893,
  },
  {
    lat: 13.01251,
    lng: 77.53676,
  },
  {
    lat: 12.90863,
    lng: 77.61064,
  },
  {
    lat: 12.95138,
    lng: 77.5402,
  },
  {
    lat: 13.06298,
    lng: 77.58567,
  },
  {
    lat: 12.95131,
    lng: 77.5371,
  },
  {
    lat: 12.86045,
    lng: 77.78332,
  },
  {
    lat: 12.94179,
    lng: 77.5739,
  },
  {
    lat: 13.00419,
    lng: 77.66589,
  },
  {
    lat: 12.96814,
    lng: 77.57873,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 13.09531,
    lng: 77.59441,
  },
  {
    lat: 12.97439,
    lng: 77.57507,
  },
  {
    lat: 12.94215,
    lng: 77.57289,
  },
  {
    lat: 12.97079,
    lng: 77.57379,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 12.90863,
    lng: 77.61064,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 13.0104,
    lng: 77.53645,
  },
  {
    lat: 12.83995,
    lng: 77.66125,
  },
  {
    lat: 12.9748,
    lng: 77.6253,
  },
  {
    lat: 12.97597,
    lng: 77.59868,
  },
  {
    lat: 12.83998,
    lng: 77.66305,
  },
  {
    lat: 13.19912,
    lng: 77.70572,
  },
  {
    lat: 12.99932,
    lng: 77.61963,
  },
  {
    lat: 12.96686,
    lng: 77.58718,
  },
  {
    lat: 12.9748,
    lng: 77.6253,
  },
  {
    lat: 12.96645,
    lng: 77.5872,
  },
  {
    lat: 12.9559,
    lng: 77.64305,
  },
  {
    lat: 12.95021,
    lng: 77.59619,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 12.96049,
    lng: 77.564,
  },
  {
    lat: 12.92015,
    lng: 77.6514,
  },
  {
    lat: 12.96773,
    lng: 77.65574,
  },
  {
    lat: 13.00419,
    lng: 77.66589,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 13.09531,
    lng: 77.59441,
  },
  {
    lat: 12.9748,
    lng: 77.6253,
  },
  {
    lat: 12.96686,
    lng: 77.58718,
  },
  {
    lat: 12.92104,
    lng: 77.62068,
  },
  {
    lat: 12.94179,
    lng: 77.5739,
  },
  {
    lat: 12.96773,
    lng: 77.65574,
  },
  {
    lat: 12.86045,
    lng: 77.78332,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 13.09531,
    lng: 77.59441,
  },
  {
    lat: 12.96049,
    lng: 77.564,
  },
  {
    lat: 12.92015,
    lng: 77.6514,
  },
  {
    lat: 12.90863,
    lng: 77.61064,
  },
  {
    lat: 12.93798,
    lng: 77.74686,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 12.99682,
    lng: 77.57133,
  },
  {
    lat: 13.00937,
    lng: 77.66751,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 12.92015,
    lng: 77.6514,
  },
  {
    lat: 12.98976,
    lng: 77.59298,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 13.04625,
    lng: 77.59474,
  },
  {
    lat: 12.87662,
    lng: 77.60005,
  },
  {
    lat: 12.98303,
    lng: 77.63834,
  },
  {
    lat: 12.97402,
    lng: 77.64133,
  },
  {
    lat: 13.04887,
    lng: 77.54959,
  },
  {
    lat: 13.00158,
    lng: 77.57839,
  },
  {
    lat: 12.94179,
    lng: 77.5739,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 13.09531,
    lng: 77.59441,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 12.92015,
    lng: 77.6514,
  },
  {
    lat: 12.9748,
    lng: 77.6253,
  },
  {
    lat: 12.92824,
    lng: 77.58157,
  },
  {
    lat: 12.94319,
    lng: 77.58571,
  },
  {
    lat: 12.90516,
    lng: 77.56283,
  },
  {
    lat: 12.98216,
    lng: 77.53194,
  },
  {
    lat: 12.91055,
    lng: 77.48259,
  },
  {
    lat: 12.92104,
    lng: 77.62068,
  },
  {
    lat: 12.98687,
    lng: 77.49127,
  },
  {
    lat: 12.99682,
    lng: 77.57133,
  },
  {
    lat: 13.00055,
    lng: 77.56385,
  },
  {
    lat: 12.90863,
    lng: 77.61064,
  },
  {
    lat: 13.00897,
    lng: 77.69308,
  },
  {
    lat: 12.93798,
    lng: 77.74686,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 12.96049,
    lng: 77.564,
  },
  {
    lat: 13.02904,
    lng: 77.62086,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 13.01152,
    lng: 77.61299,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 12.99151,
    lng: 77.65725,
  },
  {
    lat: 12.91058,
    lng: 77.62503,
  },
  {
    lat: 12.955,
    lng: 77.68281,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 13.01162,
    lng: 77.61361,
  },
  {
    lat: 13.06879,
    lng: 77.60347,
  },
  {
    lat: 12.92104,
    lng: 77.62068,
  },
  {
    lat: 12.92015,
    lng: 77.6514,
  },
  {
    lat: 13.0104,
    lng: 77.53645,
  },
  {
    lat: 12.99159,
    lng: 77.65729,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 12.90863,
    lng: 77.61064,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 13.09531,
    lng: 77.59441,
  },
  {
    lat: 12.96049,
    lng: 77.564,
  },
  {
    lat: 12.9748,
    lng: 77.6253,
  },
  {
    lat: 12.99456,
    lng: 77.55446,
  },
  {
    lat: 12.98268,
    lng: 77.60705,
  },
  {
    lat: 13.01572,
    lng: 77.57291,
  },
  {
    lat: 13.01469,
    lng: 77.57293,
  },
  {
    lat: 12.97439,
    lng: 77.57507,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 13.09531,
    lng: 77.59441,
  },
  {
    lat: 12.97439,
    lng: 77.57507,
  },
  {
    lat: 12.90863,
    lng: 77.61064,
  },
  {
    lat: 12.92015,
    lng: 77.6514,
  },
  {
    lat: 12.86045,
    lng: 77.78332,
  },
  {
    lat: 13.02473,
    lng: 77.5932,
  },
  {
    lat: 12.96065,
    lng: 77.54086,
  },
  {
    lat: 12.9731,
    lng: 77.72719,
  },
  {
    lat: 12.95021,
    lng: 77.59619,
  },
  {
    lat: 12.95148,
    lng: 77.59521,
  },
  {
    lat: 12.9748,
    lng: 77.6253,
  },
  {
    lat: 12.93798,
    lng: 77.74686,
  },
  {
    lat: 12.98821,
    lng: 77.57423,
  },
  {
    lat: 12.96049,
    lng: 77.564,
  },
  {
    lat: 12.94179,
    lng: 77.5739,
  },
  {
    lat: 12.86045,
    lng: 77.78332,
  },
  {
    lat: 12.9892,
    lng: 77.56512,
  },
  {
    lat: 12.94217,
    lng: 77.57206,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 13.09531,
    lng: 77.59441,
  },
  {
    lat: 12.90863,
    lng: 77.61064,
  },
  {
    lat: 13.03834,
    lng: 77.58964,
  },
  {
    lat: 12.99682,
    lng: 77.57133,
  },
  {
    lat: 12.99368,
    lng: 77.53924,
  },
  {
    lat: 12.92015,
    lng: 77.6514,
  },
  {
    lat: 13.03337,
    lng: 77.52073,
  },
  {
    lat: 13.0104,
    lng: 77.53645,
  },
  {
    lat: 13.10458,
    lng: 77.60631,
  },
  {
    lat: 13.10009,
    lng: 77.58387,
  },
]
console.log("Number fo PS:",coords.length)

// console.log(coords)
// Loop through each location

var stationNames = [
  'ADUGODI Police Station Bangalore',
  'AIRPORT (HAL) Police Station Bangalore',
  'ASHOK NAGAR Police Station Bangalore',
  'BANASAWADI Police Station Bangalore',
  'BANASHANKARI Police Station Bangalore',
  'BASAVANAGUDI Police Station Bangalore',
  'BYATARAYANAPURA Police Station Bangalore',
  'CHAMRAJPET (CENTRAL) Police Station Bangalore',
  'CHIKKAJALA Police Station Bangalore',
  'CHICKPET Police Station Bangalore',
  'CITY MARKET Police Station Bangalore',
  'CUBBON PARK Police Station Bangalore',
  'DEVANAHALLY Police Station Bangalore',
  'ELECTRONIC CITY Police Station Bangalore',
  'PULIKESHI NAGAR Police Station Bangalore',
  'HALASUR Police Station Bangalore',
  'HALASOOR GATE Police Station Bangalore',
  'HEBBAL Police Station Bangalore',
  'HIGH GROUNDS Police Station Bangalore',
  'HSR LAYOUT Police Station Bangalore',
  'HULIMAVU Police Station Bangalore',
  'INDIRANAGAR Police Station Bangalore',
  'JALAHALLY Police Station Bangalore',
  'JAYANAGAR Police Station Bangalore',
  'KAMARASWAMY LAYOUT Police Station Bangalore',
  'KAMAKSHI PALYA Police Station Bangalore',
  'KENGERI Police Station Bangalore',
  'KG HALLY Police Station Bangalore',
  'KR PURAM Police Station Bangalore',
  'MADIVALA Police Station Bangalore',
  'MAGADI ROAD Police Station Bangalore',
  'MALLESHWARAM Police Station Bangalore',
  'MICO LAYOUT Police Station Bangalore',
  'PEENYA Police Station Bangalore',
  'RT NAGAR Police Station Bangalore',
  'RAJAJINAGAR Police Station Bangalore',
  'SADASHIVA NAGAR Police Station Bangalore',
  'SHIVAJI NAGAR Police Station Bangalore',
  'UPPARPET Police Station Bangalore',
  'VIJAYA NAGAR Police Station Bangalore',
  'WHITE FIELD Police Station Bangalore',
  'WILSON GARDEN Police Station Bangalore',
  'YASHWANTHAPURA Police Station Bangalore',
  'YELAHANKA Police Station Bangalore',
]
//Create the svg mark-up
var svgMarkup =
  '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" height="22" />' +
  '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
  'text-anchor="middle" fill="white">${REPLACE}</text></svg>'

coords.forEach(function (value, index) {
  var myIcon = new H.map.Icon(svgMarkup.replace('${REPLACE}', index + 1), {
      anchor: { x: 12, y: 12 },
    }),
    marker = new H.map.Marker(value, {
      icon: myIcon,
      volatility: true,
    })
  // add custom data to the marker
    // console.log(stationNames[index])
    if (stationNames[index] !== undefined) {
      marker.label = stationNames[index]
      marker.setData(stationNames[index])
      marker.addEventListener(
        'tap',
        function (evt) {
          map.setCenter(evt.target.getGeometry())
          openBubble(evt.target.getGeometry(), `${evt.target.label}`)
        },
        false
      )
      // set draggable attribute on the marker so it can recieve drag events
      // marker.draggable = true
      map.addObject(marker)
    }
    

  
})

//test
// var policeIcon = new H.map.Icon('https://img.icons8.com/color/48/siren.png')
// police_marker = new H.map.Marker(
//   { lat: 60.1764, lng: 24.8255 },
//   {
//     icon: policeIcon,
//   }
// )
// police_marker.setData("Police")
// map.addObject(police_marker)

// simple D'n"D implementation for markers"'
map.addEventListener(
  'dragstart',
  function (ev) {
    var target = ev.target
    if (target instanceof H.map.Marker) {
      behavior.disable()
    }
  },
  false
)

map.addEventListener(
  'drag',
  function (ev) {
    var target = ev.target,
      pointer = ev.currentPointer
    if (target instanceof H.map.Marker) {
      target.setGeometry(map.screenToGeo(pointer.viewportX, pointer.viewportY))
    }
  },
  false
)

map.addEventListener(
  'dragend',
  function (ev) {
    var target = ev.target
    if (target instanceof H.map.Marker) {
      behavior.enable()
    }
  },
  false
)

// Add the click event listener.
addClickEventListenerToMap(map)
