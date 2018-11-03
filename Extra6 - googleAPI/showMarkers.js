
$(document).ready(function(){
  var location = [];
  $.ajax({
    type: 'GET',
    url: 'mapObjects.json',
    success: function(result){
      location = result;
      console.log(location);
    }
  })


  //functie care arata obuectele pierdute pe harta
  $("#showMarker").on("click", function(){
    for(var i = 0; i < location.length; i++){
      //creez marker pe coordonatele din obiectul salvat in "location[i]" de pe server
      var marker = new google.maps.Marker({position: location[i].coords});
      marker.setMap(map);
      //creez info pentru marker cu buton pentru afisare content
      var infowindow = new google.maps.InfoWindow({
        content:("<button type = 'button' class = 'infoButton' id = " + location[i].id + ">" + location[i].locName + "</button>")
        });

      google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
      });
    };
  })
})
