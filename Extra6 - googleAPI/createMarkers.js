$(document).ready(function(){
  $("#createMarker").on("click", function(){
    debugger;

    $('#wrapper').html('<div class="form-main" include-html="form_find.html"></div>');
    includeHTML();


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
    }); } else {   marker.setPosition(location); }
      $("#custId").val(location);
    }
  })
})
