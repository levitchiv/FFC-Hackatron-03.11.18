
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
      console.log(location);
    }
  })
  var infowindow = [];
  var marker  = [];
  //functie care arata obuectele pierdute pe harta
  $("#showMarker").on("click", function(){
    $("#mapContainer").slideDown("speed: slow");
    for(var i = 0; i < location.length; i++){

      //creez marker pe coordonatele din obiectul salvat in "location[i]" de pe server
      marker[i] = new google.maps.Marker({position: {location[i].lat, location[i].lng}} );
      marker[i].setMap(map);
      //creez info pentru marker cu buton pentru afisare content
      infowindow[i] = new google.maps.InfoWindow({
        content:("<h2>Object: " + location[i].id + "</h2> <h5> Category: " + location[i].category + "</h5><button type = 'button' class = 'infoButton' id = " + location[i].id + "> Contact </button>")
      });
      var infoWind = infowindow[i];
      google.maps.event.addListener(marker[i], 'click', function() {
      infoWind.open(map,marker[i]);
      });
    };
  })
})
