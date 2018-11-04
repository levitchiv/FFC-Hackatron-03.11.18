
$(document).ready(function(){
  var location = [];
  $.ajax({
    type: 'POST',
    url: 'https://vadim-hasura.herokuapp.com/v1alpha1/graphql',
    contentType: "application/json",
    dataType: 'json',
    data: JSON.stringify({query:"query {\n  found_objects {\n    id\n    email\n    name\n    phone\n    category\n    description\n   \titem_name\n    lat\n    lng\n  }\n}",variables:null}),
    success: function(result){
      location = result;
      location = location.data.found_objects;
    }
  })

  //functie care arata obuectele pierdute pe harta
  $("#showMarker").on("click", function(){
    $("#mapContainer").slideDown("speed: slow");
    var i = 0;

    Array.prototype.forEach.call(location, function(){
      var coords = new google.maps.LatLng(location[i].lat, location[i].lng);
      //creez marker pe coordonatele din obiectul salvat in "location[i]" de pe server
      var marker = new google.maps.Marker({position: coords} );
      marker.setMap(map);
      //creez info pentru marker
      var infowindow = new google.maps.InfoWindow({
        content:(location[i].name)
      });

      google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
      });
      i++;
    })

  })
})
