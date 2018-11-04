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
          loadFormspree(item);
        })

      });

    }
  });

}

function loadFormspree(item){
  $("#contactBtn").click(function(){
    $("#mapContainer").slideUp("speed: slow");
    $("#wrapper").html(`'<section class="formspree">
          <h2>Lost & Found</h2>
          <p>Did you lose something? Please give us some details about your lost item and get in touch with the person who found it.</p>
          <form action="https://formspree.io/'`+ item.email +`'" method="POST">
            <input type="text" id="myName" placeholder="Enter your name...">
            <input type="email" id="myEmail" placeholder="Enter your email...">
            <input type="number" id="myNumber" placeholder="Enter your phone number...">
            <textarea id="myComment" placeholder="Enter your description..." width="600px" height="300px"></textarea>
            <a href="tel:+496170961709" class="Blondie">
    Call me, call me any, anytime
      <b>Call me (call me) I'll arrive</b>
        When you're ready we can share the wine!
</a>          
            </form>
        </section>'`)
  })
}
