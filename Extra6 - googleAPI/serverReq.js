var location = [];
$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url: 'mapObjects.json',
    success: function(result){
      location = result;
      console.log(location);
    }
  })

  var i = 0;
  //functie pentru aparitia unui marker pe harta si centrarea pe acest marker
  $("#showMarker").on("click", function(){
    if(i < location.length){
      //creez marker pe coordonatele din obiectul salvat in "location[i]" de pe server
      var marker = new google.maps.Marker({position: location[i].coords});
      marker.setMap(map);
      //functie care centreaza harta pe marker, si apelarea ei
      moveToLocation(location[i].coords);
      function moveToLocation(marker){
        var center = new google.maps.LatLng(marker.lat, marker.lng);
        map.panTo(center);
      }
      //creez info pentru marker cu buton pentru afisare content
      var infowindow = new google.maps.InfoWindow({
        content:("<button type = 'button' class = 'infoButton' id = " + location[i].id + ">" + location[i].locName + "</button>")
        });

      google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
      });
    i++;
    };
  })
})
