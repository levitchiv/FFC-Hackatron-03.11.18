
$(document).ready(function(){
  var location = [];
  $.ajax({
    type: 'GET',
    url: 'mapObjects.json',
    success: function(result){
      location = result;
    }
  })


  //functie care arata obuectele pierdute pe harta
  $("#showMarker").on("click", function(){
    $("#mapContainer").slideDown("speed: slow");
    for(var i = 0; i < location.length; i++){
      //creez marker pe coordonatele din obiectul salvat in "location[i]" de pe server
      var marker = new google.maps.Marker({position: location[i].coords});
      marker.setMap(map);
      //creez info pentru marker cu buton pentru afisare content
      var infowindow = new google.maps.InfoWindow({
        content:("<h2>Object: " + location[i].id + "</h2> <h5> Category: " + location[i].category + "</h5><button type = 'button' class = 'infoButton' id = " + location[i].id + "> Contact </button>")
        });

      google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
      });
    };
  })
})
