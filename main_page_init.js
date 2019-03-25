$(function () {
    $("#wrapper").load("main_page.html", function(){
      initEvents();
    });
    $("#homeBtn").on("click", function(){
      location.reload();
    })
    function initEvents() {
        $("#createMarker").on("click", function () {

            $('#wrapper').load("add_object_form.html", function(){
              initForm();
            });

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
                    });
                } else {
                  marker.setPosition(location);
                }

                $("#lat").val(location.lat);
                $("#lng").val(location.lng);
            }
        });

        $("#showMarker").on("click", function(){
          showMarkers();
        });
    }
});
