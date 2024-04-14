/*
author Alexander Sadovoy
(C) HERE 2022-2023
*/

let mainCodeUrl = [
  window.location.origin,
  '/javascripts',
  window.location.pathname.replace('.', ''),
  '.js',
].join('')
document.getElementById('main-code').href = mainCodeUrl

var map, ui, mapevents, behavior, lastKnownLook, allMapObjects
var selectedEng = 'vector'
// check if the site was loaded via secure connection
var secure = location.protocol === 'https:' ? true : false

// Create a platform object to communicate with the HERE REST APIs

var platform = new H.service.Platform({
  apikey: 'eHuTsKn4xatkmD3xPXrrVJyR5s5lzjSFy40sUfo1Jkg', //eHuTsKn4xatkmD3xPXrrVJyR5s5lzjSFy40sUfo1Jkg 5TmGc1GycaW4Cxahz1tgnj8wKR2I0MvPFGbhEZMu-rU
})
var geocoder = platform.getSearchService()

setEngine(selectedEng)

function setEngine(strEngine) {
  if (map) {
    allMapObjects = map.getObjects()
  }

  let defaultLayer,
    engineType,
    rasterTileLayer,
    rasterNightTileLayer,
    satellTileLayer

  if (strEngine == 'vector') {
    engineType = H.Map.EngineType['HARP']
    var defaultLayers = platform.createDefaultLayers({
      engineType: engineType,
    })
    defaultLayer = defaultLayers.vector.normal.map
  } else {
    //Raster
    engineType = H.Map.EngineType['P2D']
    var defaultLayers = platform.createDefaultLayers({
      engineType: engineType,
    })
    //Base raster
    const rasterTileService = platform.getRasterTileService({
      format: 'png', //or jpg, png8
      queryParams: {
        lang: 'en',
        ppi: getPpi(),
        style: 'explore.day',
        features:
          'pois:all,environmental_zones:all,congestion_zones:all,vehicle_restrictions:active_and_inactive',
      },
    })
    const rasterTileProvider = new H.service.rasterTile.Provider(
      rasterTileService,
      {
        engineType: engineType,
        tileSize: 512,
      }
    )
    rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider)
    defaultLayer = rasterTileLayer
    //rasterTileLayer.addEventListener("update", e => {console.log("update e:", e);});

    //Base raster
    const rasterNightTileService = platform.getRasterTileService({
      format: 'jpeg', //or png, png8
      queryParams: {
        lang: 'en',
        ppi: getPpi(),
        style: 'explore.night',
        features:
          'pois:all,environmental_zones:all,congestion_zones:all,vehicle_restrictions:active_and_inactive',
      },
    })
    const rasterNightTileProvider = new H.service.rasterTile.Provider(
      rasterNightTileService,
      {
        engineType: engineType,
        tileSize: 512,
      }
    )
    rasterNightTileLayer = new H.map.layer.TileLayer(rasterNightTileProvider)

    //Satellite
    const satellTileService = platform.getRasterTileService({
      format: 'jpeg',
      queryParams: {
        lang: 'en',
        ppi: getPpi(),
        style: 'explore.satellite.day',
        features:
          'pois:all,environmental_zones:all,congestion_zones:all,vehicle_restrictions:active_and_inactive',
      },
    })
    const satellTileProvider = new H.service.rasterTile.Provider(
      satellTileService,
      {
        engineType: engineType,
        tileSize: 512,
      }
    )
    satellTileLayer = new H.map.layer.TileLayer(satellTileProvider)

    //Traffic
    let bTraffUrl = new H.service.Url('https', 'traffic.maps.hereapi.com')
    const trafficTileService = platform.getRasterTileService({
      baseUrl: bTraffUrl,
      format: 'png',
      path: 'v3',
      resource: 'flow',
      queryParams: {
        apikey: api_key_rts,
        lang: 'en',
        ppi: getPpi(),
        style: 'explore.day',
      },
    })
    const trafficTileProvider = new H.service.rasterTile.Provider(
      trafficTileService,
      {
        engineType: engineType,
        tileSize: 512,
      }
    )
    trafficTileLayer = new H.map.layer.TileLayer(trafficTileProvider)
  }

  document.getElementById('mapContainer').innerHTML = ''
  // Instantiate a map in the 'map' div, set the base map to normal
  map = new H.Map(document.getElementById('mapContainer'), defaultLayer, {
    engineType: engineType,
    center: center,
    zoom: zoom,
    pixelRatio: window.devicePixelRatio || 1,
  })
  // Create the default UI components
  ui = H.ui.UI.createDefault(map, defaultLayers)

  // Enable the map event system
  mapevents = new H.mapevents.MapEvents(map)

  // Enable map interaction (pan, zoom, pinch-to-zoom)
  behavior = new H.mapevents.Behavior(mapevents)
  behavior.disable(H.mapevents.Behavior.Feature.FRACTIONAL_ZOOM)

  if (strEngine == 'raster') {
    ui.removeControl('mapsettings')
    // create custom one
    var ms = new H.ui.MapSettingsControl({
      baseLayers: [
        {
          label: 'Map view',
          layer: rasterTileLayer,
        },
        {
          label: 'Map view night',
          layer: rasterNightTileLayer,
        },
        {
          label: 'layers.satellite',
          layer: satellTileLayer,
        },
      ],
      layers: [
        {
          label: 'Traffic day',
          layer: trafficTileLayer,
        },
      ],
      alignment: H.ui.LayoutAlignment.RIGHT_BOTTOM,
    })
    ui.addControl('mapsettings', ms)
  }

  window.addEventListener('resize', function () {
    map.getViewPort().resize()
  })

  let menuContainer = ui
    .getControl('mapsettings')
    .getElement()
    .querySelector('.H_rdo_title').parentNode
  menuEngines(menuContainer)
  //console.log("mapsettings:", ui.getControl("mapsettings").getChildren(), ui);

  ui.removeControl('zoom')
  ui.addControl(
    'zoom',
    new H.ui.ZoomControl({
      fractionalZoom: false,
      alignment: H.ui.LayoutAlignment.RIGHT_BOTTOM,
    })
  )

  if (lastKnownLook) {
    map.getViewModel().setLookAtData(lastKnownLook)
  }
  map.addEventListener('mapviewchange', (e) => {
    lastKnownLook = map.getViewModel().getLookAtData()
  })

  if (allMapObjects) {
    map.addObjects(allMapObjects)
  }
}

function getPpi() {
  return window.devicePixelRatio >= 1.7 ? 400 : 100
}
let txtForGeoSearchEl = document.getElementById('txtForGeoSearch')
let onPressButton = (e) => {
  //console.log("e: tap", e);
  if (e.type == 'keypress' && e.key !== 'Enter') {
    return
  }
  let txtForGeoSearch = txtForGeoSearchEl.value
  geocoder.geocode(
    {
      q: txtForGeoSearch,
    },
    (r) => {
      if (!r.items[0]) {
        alert(`Address '${txtForGeoSearch}' was not found`)
        return
      }
      let loc = r.items[0]
      //console.log("loc:", loc);
      map.setCenter(loc.position)
      let zLevel = 10
      if (loc.resultType) {
        zLevel = 12
        if (loc.resultType == 'houseNumber') {
          zLevel = 18
        } else if (loc.resultType == 'street') {
          zLevel = 16
        } else if (
          loc.resultType == 'locality' &&
          loc.localityType &&
          loc.localityType == 'postalCode'
        ) {
          zLevel = 15
        }
      }
      map.setZoom(zLevel)
    },
    (e) => {
      console.log('error:', e)
    }
  )
}

document.getElementById('runGeo').addEventListener('click', onPressButton)
txtForGeoSearchEl.addEventListener('keypress', onPressButton)

function menuEngines(container) {
  let radio1 = document.createElement('input')
  let radio2 = document.createElement('input')

  radio1.type = 'radio'
  radio1.name = 'enRadioGroup'
  radio1.value = 'vector'
  radio1.id = 'radio1'

  radio2.type = 'radio'
  radio2.name = 'enRadioGroup'
  radio2.value = 'raster'
  radio2.id = 'radio2'
  radio2.classList.add('raster')

  let label1 = document.createElement('label')
  label1.htmlFor = 'radio1'
  label1.textContent = 'Vector'
  label1.classList.add('vector-label')

  let label2 = document.createElement('label')
  label2.htmlFor = 'radio2'
  label2.textContent = 'Raster'

  radio1.checked = false
  radio2.checked = false
  if (selectedEng == 'vector') {
    radio1.checked = true
  } else {
    radio2.checked = true
  }

  let containSet = document.createElement('div')
  containSet.classList.add('engines')
  let captionEl = document.createElement('span')
  captionEl.textContent = 'Map engines:'

  containSet.appendChild(captionEl)
  containSet.appendChild(document.createElement('br'))
  containSet.appendChild(radio1)
  containSet.appendChild(label1)
  containSet.appendChild(radio2)
  containSet.appendChild(label2)

  container.insertBefore(containSet, container.firstElementChild)

  let radios = container.querySelectorAll('input[name="enRadioGroup"]')
  radios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (this.checked) {
        console.log('Выбрана радио-кнопка:', this.value)
        selectedEng = this.value
        setEngine(selectedEng)
      }
    })
  })
}
