$(document).ready(function(){

  $("#mapContainer").hide();
  $("#showMap").on("click", function(){
    $("#mapContainer").slideToggle("speed: slow");
  });
  //initializare harta
  getLocation();

  function initMap(position) {
    var defaultOptions = {
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 6
    }
    window.map = new google.maps.Map(document.getElementById('mapContainer'), defaultOptions);
  }
  //localizare latitudinala si longitudinala pentru initializarea hartii
  var mapContainer = $("#mapContainer");

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(initMap, showError);
      } else {
          mapContainer.html("Geolocation is not supported by this browser.");
      }
  }

  function showError(error) {
    if(error.code === error.PERMISSION_DENIED){
      alert("Permision to access the device location denied.\nYou need to have the location sevices active");
      mapContainer.html("<span>Permision to access the device location denied.<br>You need to have the location sevices active</span>");
    }
  }
})
