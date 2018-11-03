var map;

$(document).ready(function(){
  //slideToggle pentru harta
  $("#Togglemap").on("click", function(){
    $("#mapContainer").slideToggle("speed: slow");
  });
  //initializare harta
  getLocation();
  function initMap(position) {
    var defaultOptions = {
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 15
    }
    map = new google.maps.Map(document.getElementById('mapContainer'), defaultOptions);
  }
  //localizare latitudinala si longitudinala pentru initializarea hartii
  var x = $("#mapContainer");
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(initMap);
      } else {
          x.html("Geolocation is not supported by this browser.");
      }
  }
})
