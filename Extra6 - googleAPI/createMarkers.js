
  $("#createMarker").on("click", function(){
    google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
    });
    
    function placeMarker(location) {
      var marker = new google.maps.Marker({
          position: location,
          map: map
      });
  }
  })
