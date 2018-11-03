
$("#createMarker").on("click", function(){
  $("#mapContainer").slideDown("speed: slow");
  var marker;

  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });

  function placeMarker(location) {
    if (marker == null) {
      marker = new google.maps.Marker({
        position: location,
        map: map
    }); } else {   marker.setPosition(location); } }
})
