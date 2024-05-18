// document.addEventListener('DOMContentLoaded', function () {
//   var hideShowButton = document.querySelector('.hide-show')
//   var modalContainer = document.querySelector('.modal-container')
//   var indicater = document.getElementById('svg-indicater')
//   getLocation();

//   hideShowButton.addEventListener('click', function () {
//     var currentLeft = getComputedStyle(modalContainer).left

//     if (currentLeft === '-320px' || currentLeft === '-320px') {
//       modalContainer.style.left = '0px'
//       indicater.style.rotate = '180deg'
//     } else {
//       modalContainer.style.left = '-320px'
//       indicater.style.rotate = '0deg'
//     }
//   })
// })

let modalShown = false;


var modal = document.getElementById('myModal')
var span = document.getElementsByClassName('close')[0]
const loginmodal = document.getElementById('loginModal')

function showModal() {
  if (!localStorage.getItem('modalShown')) {
    modal.style.display = 'block'
    localStorage.setItem('modalShown', 'true')
  }
}
 function closeModal() {
   modal.style.display = 'none'; // Close the dialog
 }

span.onclick = function () {
  modal.style.display = 'none'
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

showModal();


function showLogin() {
  closeModal();
  // Show the login interface (you can add your logic here)
  console.log('Login clicked')
  loginmodal.style.display = 'block'
}

function closeModal() {
  modal.style.display = 'none' // Close the dialog
}

function performLogin() {
  // Get user input (you can add your login logic here)
  const userID = document.getElementById('userID').value
  const password = document.getElementById('password').value

  // Example: Validate credentials (replace with your actual logic)
  if (userID === 'admin' && password === 'secret') {
    alert('Login successful!')
    loginmodal.style.display = 'none';
  } else {
    alert('Invalid credentials. Please try again.')
  }

}


var mylat = 12.99514
var mylng = 77.75773

const contextElement = document.getElementById('context')
const sideMenuButton = document.getElementById('side-menu')
let contextPosition = 'hidden'


sideMenuButton.addEventListener('click', () => {
  console.log('Clicked')
  if (contextPosition === 'hidden') {
    contextElement.style.left = '0px'
    contextPosition = 'visible'
  } else {
    contextElement.style.left = '-200px'
    contextPosition = 'hidden'
  }
})



function showPosition(position) {
  // const getLat = document.getElementById('getLatVal')
  // const getLog = document.getElementById('getLogVal')
  // getLat.value = position.coords.latitude
  // getLog.value = position.coords.longitude
  var myloc = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  }
  mylat = position.coords.latitude
  mylng = position.coords.longitude
  // console.log(mylat)
  map.setCenter(myloc)
  map.setZoom(20)
  getNearestPSwithAPI(myloc)

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
//
// const marker3 = new H.map.Marker({ lat: 51.49, lng: -0.09 }, { data: { type: 'pothole', text: 'Marker 3' } });

var group = new H.map.Group()
function addMarkerToGroup(group, coordinate, html, drag, icon) {
  var marker = new H.map.Marker(coordinate,
  {
    icon: icon,
  })
  // add custom data to the marker
  marker.setData(html)
  marker.draggable = drag
  
  group.addObject(marker)

  marker.addEventListener('dragend', function (event) {
    const newPosition = event.target.getGeometry() // Get the new position
    const newLat = newPosition.lat
    const newLng = newPosition.lng

    // Call your function with the new location
    getNearestPSwithAPI({ lat: newLat, lng: newLng })
  })
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
          lat: mylat,
          lng: mylng,
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
                <div>Assigned PS: ${event.assigned_ps}</div><br />
                <div>Expected Time: ${event.deadline}</div><br />
                <div>Generated By: ${event.generated_by}</div><br />
                <div>Image: <img src="${event.image}"/></div><br />
                <div><button style="width: 200px; height: 70px;">Cleared</button></div>


              </div>
              `,
              false,
              parkingIcon
            )
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
  style.addEventListener('change', changeListener)
}



// const URLS = {
//   default:
//     'https://gist.githubusercontent.com/OttyLab/f4526ddf444b8f4add296ad337bcc601/raw/2f0ded386fb59b58ef7dcdf6bc735c8ca53c41bc/default.json',
//   custom:
//     'https://raw.githubusercontent.com/rohansahni/overtflow/main/OvertFlow.json',
// }

// const platform = new H.service.Platform({
//   apikey: 'VF3dECM64igOgk6k73EuS1pimnH_fZfGcC4Dh650gvQ',
// })

// const engineType = H.Map.EngineType['HARP']
// const style = new H.map.render.harp.Style(URLS['custom'])

// const layer = platform.getOMVService().createLayer(style, { engineType })

// const map = new H.Map(document.getElementById('map'), layer, {
//   engineType,
//   center: { lat: mylat, lng: mylng },
//   zoom: 16,
// })

// const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

// const selector = document.getElementById('selector')

// const provider = map.getBaseLayer().getProvider()
// provider.setStyle(style)

function setStyle(map) {
  // get the vector provider from the base layer
  var provider = map.getBaseLayer().getProvider()
  console.log(provider.uri)
  var newBl = new H.map.layer.BaseTileLayer(provider)

  // Create the style object from the YAML configuration.
  // First argument is the style path and the second is the base URL to use for
  // resolving relative URLs in the style like textures, fonts.
  // all referenced resources relative to the base path https://js.api.here.com/v3/3.1/styles/omv.
  var style = new H.map.Style(
    'https://heremaps.github.io/maps-api-for-javascript-examples/change-style-at-load/data/dark.yaml',
    'https://js.api.here.com/v3/3.1/styles/omv/'
  )
  // set the style on the existing layer
  provider.setStyle(style)
}

function getDarkStyle(){
	return new H.map.Style('https://heremaps.github.io/maps-api-for-javascript-examples/change-style-at-load/data/dark.yaml',
    'https://js.api.here.com/v3/3.1/styles/omv/');
};



var platform = new H.service.Platform({
  apikey: 'eHuTsKn4xatkmD3xPXrrVJyR5s5lzjSFy40sUfo1Jkg', //eHuTsKn4xatkmD3xPXrrVJyR5s5lzjSFy40sUfo1Jkg 5TmGc1GycaW4Cxahz1tgnj8wKR2I0MvPFGbhEZMu-rU
})
// const rasterTileService = platform.getRasterTileService({
//   format: 'png',
//   queryParams: {
//     lang: 'en',
//     ppi: 400,
//     style: 'explore.day',
//     features:
//       'pois:all,environmental_zones:all,congestion_zones:all,vehicle_restrictions:active_and_inactive',
//   },
// })


// var engineType = H.Map.EngineType['HARP']
// var defaultLayers = platform.createDefaultLayers({
//   engineType: engineType,
//   pois: true,
//   tileSize: devicePixelRatio > 1 ? 512 : 256,
//   ppi: devicePixelRatio > 1 ? 320 : 72,
// })

// const rasterTileService = platform.getRasterTileService({
//   queryParams: {
//     lang: 'th',
//     lang2: 'vi',
//     ppi: 400,
//     style: 'explore.day',
//     features: 'pois:all,environmental_zones:all,congestion_zones:all',
//   },
// })

// const rasterTileProvider = new H.service.rasterTile.Provider(
//   rasterTileService,
//   {
//     engineType: H.Map.EngineType.HARP,
//     tileSize: 512,
//   }
// )
// const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider)


var defaultLayers = platform.createDefaultLayers()
// // const nightTheme = new H.map.layer.TileLayer({
// //   // Specify the night mode style
// //   api: "https://{1}.vector.hereapi.com/v3/{2}/night/{z}/{x}/{y}.tiles",
// //   attribution: 'Map data &copy; HERE'
// // });
// const engineType = H.Map.EngineType['HARP']
// var style = new H.map.render.harp.Style(
//   'https://alexisad.github.io/vector-styles/harp/normal-day.json'
// )

// // Step 4: create a layer with the style object:
// var vectorLayer = platform.getOMVService().createLayer(style, { engineType })

function setStyle(map) {
  // get the vector provider from the base layer
  var provider = map.getBaseLayer().getProvider()
  // Create the style object from the YAML configuration.
  // First argument is the style path and the second is the base URL to use for
  // resolving relative URLs in the style like textures, fonts.
  // all referenced resources relative to the base path https://js.api.here.com/v3/3.1/styles/omv.
  var style = new H.map.Style('https://heremaps.github.io/maps-api-for-javascript-examples/change-style-at-load/data/day.yaml',
    'https://js.api.here.com/v3/3.1/styles/omv/');
  // var style = new H.map.Style('static/asset/OvertFlow.json')
  // var vectorLayer = platform.getOMVService().createLayer(style, { engineType })

  // set the style on the existing layer
  provider.setStyle(style)
}
// // var map = tangram.map({
// //   container: document.getElementById('map'),
// //   scene: scene,
// // })

var map = new H.Map(
  document.getElementById('map'),
  // nightTheme,
  defaultLayers.vector.normal.map,
  // defaultLayers.raster.terrain.map,
  {
    center: { lat: mylat, lng: mylng },
    zoom: 16,
    pixelRatio: window.devicePixelRatio || 1,
  }
)

map.addLayer(defaultLayers.vector.normal.traffic)
map.addLayer(defaultLayers.vector.normal.trafficincidents)
map.getViewModel().setLookAtData({ tilt: 55, heading: 45 })
window.addEventListener('resize', () => map.getViewPort().resize())
// var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers)
window.onload = function () {
  setMapViewBounds(map)
}


var darkBaseLayer = new H.map.layer.TileLayer(
  new H.service.omv.Provider(platform.getOMVService(), getDarkStyle())
)

ui.removeControl('mapsettings')
// create custom one
var ms = new H.ui.MapSettingsControl({
  baseLayers: [
    {
      label: 'normal',
      layer: defaultLayers.raster.normal.map,
    },
    {
      label: 'dark',
      layer: defaultLayers.raster.normal.mapnight,
    },
    {
      label: 'satellite',
      layer: defaultLayers.raster.satellite.map,
    },
    {
      label: 'terrain',
      layer: defaultLayers.raster.terrain.map,
    },
  ],
  layers: [
    {
      label: 'layer.traffic',
      layer: defaultLayers.vector.normal.traffic,
    },
    {
      label: 'layer.incidents',
      layer: defaultLayers.vector.normal.trafficincidents,
    },
  ],
})
ui.addControl('customized', ms)

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize())

//Step 3: make the map interactive
// MapEvents enables the event system
// function moveUiComponents(map, defaultLayers) {
//   // Create the default UI components
//   var ui = H.ui.UI.createDefault(map, defaultLayers)

//   // Obtain references to the standard controls.
//   // var mapSettings = ui.getControl('mapsettings')
//   var zoom = ui.getControl('zoom')
//   var scalebar = ui.getControl('scalebar')

//   // Move the controls to the top-left of the map.
//   mapSettings.setAlignment('top-left')
//   zoom.setAlignment('top-left')
  
// }
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
var scalebar = ui.getControl('scalebar')
scalebar.setAlignment('bottom-center')
// setStyle(map);
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


//On Submit
// </br><p>${findNearestPStoMe(myloc)}</p>
// )


