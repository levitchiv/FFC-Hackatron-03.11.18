
  $("#createMarker").on("click", function(){
    // function getLocation() {
    //   if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(createMarker);
    //   } else {
    //       x.html("Geolocation is not supported by this browser.");
    //   }
    // };
    function createMarker(){
      marker = new google.maps.Marker({
        position: {lat: 44.4268, lng: 26.1025}
      });
      marker.setMap(map);
    }

  })
