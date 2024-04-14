const dataPoints = [

  // Add more data points as needed
    {
      lat: 13.99514,
      lng: 77.75773,
    },
    {
      lat: 13.99368,
      lng: 77.53924,
    },
    {
      lat: 13.9892,
      lng: 77.56512,
    }
]

// var clusterLocs = [];

// // Get the existing markers from the map
// const existingObjects = map.getObjects();

// // Create an array of data points from the existing markers of a specific type (e.g., 'pothole')
// const potholeDataPoints = existingObjects.filter(obj => obj instanceof H.map.Marker && obj.getData().type === 'illegal-parking')
//                                          .map(marker => new H.clustering.DataPoint(marker.getPosition().lat, marker.getPosition().lng));

// console.log(potholeDataPoints);

// Create a clustering provider with custom options
const clusteredDataProvider = new H.clustering.Provider(
    dataPoints.map(point => new H.clustering.DataPoint(point.lat, point.lng)),
    {
        clusteringOptions: {
            eps: 32, // The maximum radius for clustering
            minWt: 3, // The minimum weight for clustering
            minWeight: 3 // Same as minWt, but should be used instead
        }
    }
);

// Create a layer for the clustering provider
const clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);

// Add the clustering layer to the map
map.addLayer(clusteringLayer);

// Create a style for the clustered markers
const clusterStyle = {
    fillColor: 'rgb(51, 204, 51)',
    strokeColor: 'rgb(51, 204, 51)',
    textColor: '#fff',
    font: 'bold 14px Arial',
    ratio: 0.5
};

// Set the styles for the clusters
// clusteredDataProvider.setStyle(clusterStyle);

// function startClustering(map, data) {
//   // First we need to create an array of DataPoint objects,
//   // for the ClusterProvider
//   var dataPoints = data.map(function (item) {
//     return new H.clustering.DataPoint(item.latitude, item.longitude)
//   })

//   console.log(dataPoints)
//   // Create a clustering provider with custom options for clusterizing the input
//   var clusteredDataProvider = new H.clustering.Provider(dataPoints, {
//     clusteringOptions: {
//       // Maximum radius of the neighbourhood
//       eps: 10000,
//       // minimum weight of points required to form a cluster
//       minWeight: 2,
//     },
//   })

//   // Create a layer tha will consume objects from our clustering provider
//   var clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider)

//   // To make objects from clustering provder visible,
//   // we need to add our layer to the map
//   map.addLayer(clusteringLayer)
// }

// var clusterLocs = []

// k = map.getObjects()
// // iterate over objects and calculate distance between them
// for (i = 0; i < k.length; i++) {
//   clusterLocs.push({ latitude: k[i]['a']['lat'], longitude: k[i]['a']['lng'] })
// }
// console.log('hit cluster locations')
// // console.log('clusterLocs',clusterLocs);
// startClustering(map, clusterLocs)
