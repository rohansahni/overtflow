var scene = {
  width: 640,
  height: 480,
  center: [-122.4194, 37.7749], // Coordinates (longitude, latitude)
  zoom: 12,
  sources: {
    here: {
      type: 'xyz',
      url: 'https://{s}.{base}.maps.here.com/terrainbase/{z}/{x}/{y}.{format}',
      attribution:
        '&copy; 2023 HERE, Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      source: 'here',
      render: 'terrain',
    },
  ],
}
