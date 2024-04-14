document.addEventListener('DOMContentLoaded', function () {
  var hideShowButton = document.querySelector('.hide-show')
  var modalContainer = document.querySelector('.modal-container')
  var indicater = document.getElementById('svg-indicater')

  hideShowButton.addEventListener('click', function () {
    var currentLeft = getComputedStyle(modalContainer).left

    if (currentLeft === '-320px' || currentLeft === '-320px') {
      modalContainer.style.left = '0px'
      indicater.style.rotate = '180deg'
    } else {
      modalContainer.style.left = '-320px'
      indicater.style.rotate = '0deg'
    }
  })
})

document.getElementById('fileInput').onchange = function (event) {
  var preview = document.getElementById('imagePreview')
  var file = event.target.files[0]
  var reader = new FileReader()

  reader.onload = function () {
    var img = new Image()
    img.src = reader.result
    img.style.maxWidth = '100%'
    img.style.maxHeight = '100%'
    preview.innerHTML = ''
    preview.appendChild(img)
  }

  reader.readAsDataURL(file)
}

// const reportButton = document.getElementById('report')
const reportWindow = document.getElementById('report-window')
const reportSubmitButton = document.getElementById('report-submit')


// reportButton.addEventListener('click', () => {
//   reportWindow.style.display = 'block'
// })

reportSubmitButton.addEventListener('click', () => {
  // Process the report (e.g., send it to the server)
  // Then hide the report window
  reportWindow.style.display = 'none'
})

/**
 * The function adds a "change" event listener to the map's style
 * and modifies colors of the map features within that listener.
 * @param {H.Map} map A HERE Map instance within the application
 */
var parkingIcon = new H.map.Icon(
  'https://img.icons8.com/color/48/box-important--v1.png'
)
var liveIcon = new H.map.Icon(
  'https://img.icons8.com/color/48/marker--v1.png'
)
//
var group = new H.map.Group()
function addMarkerToGroup(group, coordinate, html, drag, icon) {
  var marker = new H.map.Marker(coordinate, {
    icon: icon,
  })
  // add custom data to the marker
  marker.setData(html)
  marker.draggable = drag
  group.addObject(marker)
}

function interleave(map) {
  var provider = map.getBaseLayer().getProvider()
  var style = provider.getStyle()
  var changeListener = () => {
    if (style.getState() === H.map.Style.State.READY) {
      style.removeEventListener('change', changeListener)
      objectProvider = new H.map.provider.LocalObjectProvider()
      objectLayer = new H.map.layer.ObjectLayer(objectProvider)
      objectProvider.getRootGroup()
      // .addObject(new H.map.Circle(map.getCenter(), 50))
      // optionally - resize a larger SVG image to a specific size
      var svgIcon = new H.map.Icon(
        'https://raw.githubusercontent.com/feathericons/feather/main/icons/alert-circle.svg',
        { size: { w: 32, h: 32 } }
      )
      var marker = new H.map.Marker(
        {
          lat: 12.985534,
          lng: 77.60566,
        },
        {
          icon: svgIcon,
        }
      )

      map.addLayer(objectLayer)
      buildings = new H.map.Style(style.extractConfig('buildings'))
      buildingsLayer = platform.getOMVService().createLayer(buildings)
      map.addLayer(buildingsLayer)
      // Create a traffic layer
      // var trafficLayer = new H.map.layer.TrafficLayer()
      // map.addLayer(trafficLayer)
      // map.addObject(new H.map.Marker(map.getCenter()))
      // map.addObject(new H.map.Marker({ lat: 12.957048, lng: 77.700553 }))
      // map.addObject(new H.map.Circle({ lat: 13.957048, lng: 77.700553 }, 50))
      // map.addObject(new H.map.Marker(map.getCenter()));
      // map.addObject(marker);
      map.addObject(new H.map.Circle({ lat: 12.985534, lng: 77.60566 }, 500)) //uncomment
      

      map.addObject(group) //uncomment

      // add 'tap' event listener, that opens info bubble, to the group
      group.addEventListener(
        'tap',
        function (evt) {
          // event target is the marker itself, group is a parent event target
          // for all objects that it contains
          var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
            // read custom data
            content: evt.target.getData(),
          })
          // show info bubble
          ui.addBubble(bubble)
        },
        false
      )
      // Make a GET request to the API endpoint
      fetch('/api/events/')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((eventData) => {
          // Process the retrieved event data (e.g., create markers on the map)

          console.log(eventData)
          for (var i = 0; i < eventData.length; i++) {
            var event = eventData[i]
            console.log(event.latitude, event.longitude)
            image_src = `data:image/jpeg;base64,${event.image}`
            addMarkerToGroup(
              group,
              { lat: event.latitude, lng: event.longitude },
              `<div style="width: 300px; height: 200px; overflow: auto; ">

              <div><h4>${event.event_type}</h4></div>
                <div>Status: ${event.status}</div><br />
                <div>Created At: ${event.time_created}</div><br />
                <div>Assigned PS: ${findNearestPStoMe({
                  lat: event.latitude,
                  lng: event.longitude,
                })}</div><br />
                <div>Expected Time: ${event.deadline}</div><br />
                <div>Generated By: ${event.generated_by}</div><br />
                <div>Image: <img src="${image_src}"/></div><br />
                <div><button style="width: 200px; height: 70px;">Cleared</button></div>


              </div>
              `
            , false)
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
  style.addEventListener('change', changeListener)
}

var platform = new H.service.Platform({
  apikey: 'eHuTsKn4xatkmD3xPXrrVJyR5s5lzjSFy40sUfo1Jkg', //eHuTsKn4xatkmD3xPXrrVJyR5s5lzjSFy40sUfo1Jkg 5TmGc1GycaW4Cxahz1tgnj8wKR2I0MvPFGbhEZMu-rU
})
let engineType = H.Map.EngineType['HARP']
var defaultLayers = platform.createDefaultLayers({
  engineType: engineType,
})
let defaultLayer = defaultLayers.vector.normal.map
// var defaultLayers = platform.createDefaultLayers()

let map = new H.Map(document.getElementById('mapContainer'), defaultLayer, {
  engineType: engineType,
  center: center,
  zoom: zoom,
  pixelRatio: window.devicePixelRatio || 1,
})


// var map = new H.Map(
//   document.getElementById('map'),
//   defaultLayers.vector.normal.map,
//   // defaultLayers.raster.terrain.map,
//   {
//     center: { lat: 12.985534, lng: 77.60566 },
//     zoom: 16,
//     pixelRatio: window.devicePixelRatio || 1,
//   }
// )
map.getViewModel().setLookAtData({ tilt: 55 })
window.addEventListener('resize', () => map.getViewPort().resize())
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers)
window.onload = function () {
  setMapViewBounds(map)
}

// ui.removeControl('mapsettings')
// var ms = new H.ui.MapSettingsControl({
//   baseLayers: [
//     {
//       label: 'normal',
//       layer: defaultLayers.raster.normal.map,
//     },
//     {
//       label: 'satellite',
//       layer: defaultLayers.raster.satellite.map,
//     },
//     {
//       label: 'terrain',
//       layer: defaultLayers.raster.terrain.map,
//     },
//   ],
//   layers: [
//     {
//       label: 'layer.traffic',
//       layer: defaultLayers.vector.normal.traffic,
//     },
//     {
//       label: 'layer.incidents',
//       layer: defaultLayers.vector.normal.trafficincidents,
//     },
//   ],
// })
// ui.addControl('customized', ms)

function setMapViewBounds(map) {
  var bbox = new H.geo.Rect(12.985534, 77.60566)
  map.getViewModel().setLookAtData({
    bounds: bbox,
  })
}
interleave(map)

const hereTrafficApiUrl = `https://data.traffic.hereapi.com/v7/flow?locationReferencing=shape&in=circle:12.98553,77.60566;r=1000&apiKey=5TmGc1GycaW4Cxahz1tgnj8wKR2I0MvPFGbhEZMu-rU`
fetch(hereTrafficApiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.items.forEach((incident) => {
      const marker = new H.map.Marker({
        lat: incident.latitude,
        lng: incident.longitude,
      })
      // Customize the marker (e.g., icon, color) based on incident type
      // Add the marker to your map
      // map.addObject(marker)          //uncomment
    })
    // Process and visualize the traffic data
  })
  .catch((error) => console.error('Error fetching traffic data:', error))

// const trafficLayer = new H.map.layer.TrafficLayer()
// map.addLayer(trafficLayer)

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.'
    console.log('Geolocation is not supported by this browser.')
  }
}

function findNearestPStoMe(coords) {
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
      //if marker name is police
      markerDist = objects[i].getGeometry().distance(coords)
      if (markerDist < minDist) {
        minDist = markerDist
        nearest_text = objects[i].getData()
      }
    } catch (e) {
      // console.log(e)
    }
  }

  return (
    nearest_text + ' is closest at ' + Math.round(minDist) + ' meters away.'
  )
}

function showPosition(position) {
  // const getLat = document.getElementById('getLatVal')
  // const getLog = document.getElementById('getLogVal')
  // getLat.value = position.coords.latitude
  // getLog.value = position.coords.longitude
  var myloc = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  }
  map.setCenter(myloc)
  map.setZoom(20)
  getNearestPSwithAPI(myloc);
  
  
  // liveMarker = new H.map.Marker(map.getCenter())
  // liveMarker.label = findNearestPStoMe(myloc)
  // liveMarker.setData = `<button id="report">Register your report</button></br><p>${liveMarker.label}</p>`
  // liveMarker.addEventListener(
  //   'tap',
  //   function (evt) {
  //     map.setCenter(evt.target.getGeometry())
  //     openBubble(evt.target.getGeometry(), evt.target.getData())
      
  //   },
  //   false
  // )

  // // set draggable attribute on the marker so it can recieve drag events
  // liveMarker.draggable = true
  // // map.addObject(new H.map.Circle(myloc, 500))
  // map.addObject(liveMarker)
}


//On Submit
// </br><p>${findNearestPStoMe(myloc)}</p>
// )