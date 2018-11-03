$(document).ready(function(){
  $("#createMarker").on("click", function(){
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition();
        } else {
            x.html("Geolocation is not supported by this browser.");
        }
      };
  })

})
