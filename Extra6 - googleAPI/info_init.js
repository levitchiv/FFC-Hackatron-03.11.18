$(function () {
    $("#wrapper").load("info.html", initEvents);
    function initEvents() {
        $("#createMarker").on("click", function () {

            $('#wrapper').load("form_find.html", initForm);

            $("#mapContainer").slideDown("speed: slow");
            var marker;

            google.maps.event.addListener(map, 'click', function (event) {
                placeMarker(event.latLng);
            });

            function placeMarker(location) {
                if (marker == null) {
                    marker = new google.maps.Marker({
                        position: location,
                        map: map
                    });
                } else { marker.setPosition(location); }

                $("#custId").val(location);
            }
        });
        $("#showMarker").on("click", showMarkers);
    }

});