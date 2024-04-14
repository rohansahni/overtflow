//Initalize Leaflet Map
document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map', {
        center: [47.606209, -122.332069],
        zoom: 13
        
    })
});

// HERE base map layer and authorization using the new Map Tile API
const here = { apiKey: '5TmGc1GycaW4Cxahz1tgnj8wKR2I0MvPFGbhEZMu-rU' }
const style = 'lite.day';

const hereTileUrl = `https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/png8?style=your_style&apiKey=5TmGc1GycaW4Cxahz1tgnj8wKR2I0MvPFGbhEZMu-rU`
L.tileLayer(hereTileUrl).addTo(map)
const hereTrafficApiUrl = `https://data.traffic.hereapi.com/v7/flow?locationReferencing=shape&in=circle:12.98553,77.60566;r=1000&apiKey=5TmGc1GycaW4Cxahz1tgnj8wKR2I0MvPFGbhEZMu-rU`

fetch(hereTrafficApiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Process and visualize the traffic data
    data.results.forEach((item) => {
      const links = item.location.shape.links
      links.forEach((link) => {
        // Process each road segment
      })
    })
  })
  .catch((error) => console.error('Error fetching traffic data:', error))

function getLineColor(jamFactor) {
  if (jamFactor <= 3) {
    return '#2ECC40' // Green for low congestion
  } else if (jamFactor <= 7) {
    return '#FF851B' // Orange for moderate congestion
  } else {
    return '#FF4136' // Red for high congestion
  }
}

data.results.forEach((item) => {
  item.location.shape.links.forEach((link) => {
    const points = link.points.map(
      (point) => new L.LatLng(point.lat, point.lng)
    )
    const lineColor = getLineColor(link.currentFlow.jamFactor)
    L.polyline(points, { color: lineColor, weight: 5 }).addTo(trafficLayerGroup)
  })
})


var legend = L.control({ position: 'bottomright' })

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    jamFactorClasses = [
      { range: '0 - 3', description: 'Low Congestion', color: '#2ECC40' },
      { range: '4 - 7', description: 'Moderate Congestion', color: '#FF851B' },
      { range: '8 - 10', description: 'High Congestion', color: '#FF4136' },
    ],
    labels = []

  // Add the title
  labels.push('<h4>Jam Factor</h4>')

  jamFactorClasses.forEach(function (jfClass) {
    labels.push(
      '<div class="label">' +
        '<i style="background:' +
        jfClass.color +
        '"></i> ' +
        jfClass.range +
        ': ' +
        jfClass.description +
        '</div>'
    )
  })

  div.innerHTML = labels.join('')
  return div
}

legend.addTo(map)