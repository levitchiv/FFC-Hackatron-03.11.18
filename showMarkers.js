function showMarkers() {
  $("#mapContainer").slideDown("speed: slow");

  var location = [];

  $.ajax({
    type: 'POST',
    url: 'https://vadim-hasura.herokuapp.com/v1alpha1/graphql',
    contentType: "application/json",
    dataType: 'json',
    data: JSON.stringify({ query: `{
      found_objects {
        id
        email
        name
        phone
        category
        description
        item_name
        lat
        lng
      }
    }`, variables: null }),
    success: function (result) {
      location = result;
      location = location.data.found_objects;
      location.forEach(function (item) {
        var coords = new google.maps.LatLng(item.lat, item.lng);
        //creez marker pe coordonatele din obiectul
        var marker = new google.maps.Marker({ position: coords });
        marker.setMap(map);
        //creez info pentru marker
        var infowindow = new google.maps.InfoWindow({
          content: ("Item: " + item.name + "<br>Category: " + item.category + "<br><button type='button' id='contactBtn'>Contact me</button>")

        });

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map, marker);
        })
      });
    }
  });
loadFormspree();
}

function loadFormspree(){
  $("#contactBtn").on("click", function(){
    $("#wrapper").load("form-formspree.html");
  })
}
