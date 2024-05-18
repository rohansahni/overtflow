let isRotating = false
let rotationSpeed = 0.5 
const mapView = map.getViewModel()
function toggleRotation() {
  const rotationButton = document.getElementById('rotationButton')
  

  if (isRotating) {
    // Stop rotation
    isRotating = false
    rotationButton.innerHTML = '<i class="fas fa-play"></i>'
  } else {
    // Start rotation
    isRotating = true
    rotationButton.innerHTML = '<i class="fas fa-stop"></i>'
    rotateMap()
  }
}

function rotateMap() {
  if (isRotating) {
    const currentHeading = mapView.getLookAtData().heading
    const newHeading = (currentHeading + rotationSpeed) % 360

    mapView.setLookAtData({
      heading: newHeading,
    })

    requestAnimationFrame(rotateMap) // Continue rotation
  }
}

document
  .getElementById('rotationButton')
  .addEventListener('click', toggleRotation)
