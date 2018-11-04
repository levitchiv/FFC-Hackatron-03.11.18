
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
      console.log(location.data);
      location = location.data.found_objects;
    }
  })

  // var infowindow = [];
  var marker  = [];
  //functie care arata obuectele pierdute pe harta
  $("#showMarker").on("click", function(){
    $("#mapContainer").slideDown("speed: slow");
    for(var i = 0; i < location.length; i++){

      var coords = new google.maps.LatLng(location[i].lat, location[i].lng);
      //creez marker pe coordonatele din obiectul salvat in "location[i]" de pe server
      marker[i] = new google.maps.Marker({position: coords} );
      marker[i].setMap(map);
      //creez info pentru marker
      var infowindow = new google.maps.InfoWindow({
        content:("dsada")
      });

      var infoWind = infowindow;
      console.log("dsa" + infowindow);
      // google.maps.event.addListener(marker[i], 'click', function() {
      // infowindow.open(map,marker[i]);
      // });
    };
  })
})
