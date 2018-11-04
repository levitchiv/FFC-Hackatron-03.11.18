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
      itemList(location);
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

    $("#wrapper").html(`'<section class="formspree">
          <h2>Lost & Found</h2>
          <p>Did you lose something? Please give us some details about your lost item and get in touch with the person who found it.<br><br> The person that found this item: `+ item.name +`<br>Their phone: `+ item.phone +`<br>Their email address: `+item.email +`</p>
          <form action="https://formspree.io/`+ item.email +`" method="POST">
            <input type="text" id="myName" name="Name" placeholder="Enter your name...">
            <input type="email" id="myEmail" name="Email" placeholder="Enter your email...">
            <input type="number" id="myNumber" name="Phone" placeholder="Enter your phone number...">
            <textarea id="myComment" name="Message" placeholder="Enter your description..." width="600px" height="450px"></textarea>
            <button type="submit" value="send" id="mySubmit" class="submitBtn">Submit</button>
          </form>
        </section>'`)
  })

}
