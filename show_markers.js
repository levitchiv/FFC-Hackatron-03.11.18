function showMarkers() {
  $("#mapContainer").slideDown("speed: slow");

  window.lostObjects = [];

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
    }`, variables: null}),
    success: function (result) {
      lostObjects = result.data.found_objects;
      if(screen.width > 730){
        itemList(lostObjects); //initializez lista de obiecte
      }
      for(let i = 0; i < lostObjects.length; i++) {
        var coords = new google.maps.LatLng(lostObjects[i].lat, lostObjects[i].lng);
        //creez marker pe coordonatele din fiecare obiect pierdut
        var marker = new google.maps.Marker({
           position: coords,
           map: map,
           title: lostObjects[i].item_name
         });

        marker.addListener('click', function (coords) {
          //creez infoWindow pentru markere
          var infowindow = new google.maps.InfoWindow();
          infowindow.setPosition(coords.latLng);
          infowindow.setContent(`Item: ${lostObjects[i].item_name}<br>Category: ${lostObjects[i].category} <br><button type='button' onclick='loadFormspree(${i})'>Contact me</button>`);
          infowindow.open(map);
        });
      };
    }
  });
};

function loadFormspree(idx){
    $("#wrapper").html(`<section class="formspree">
          <h2>Lost & Found</h2>
          <p>Did you lose something? Please give us some details about your lost item and get in touch with the person who found it.<br><br> The person that found this item: ${lostObjects[idx].name} <br>Their phone: ${lostObjects[idx].phone} <br>Their email address: ${lostObjects[idx].email} </p>
          <form action="https://formspree.io/${lostObjects[idx].email}" method="POST" target="_blank" >
            <input type="text" id="myName" name="Name" placeholder="Enter your name...">
            <input type="email" id="myEmail" name="Email" placeholder="Enter your email...">
            <input type="number" id="myNumber" name="Phone" placeholder="Enter your phone number...">
            <textarea id="myComment" name="Message" placeholder="Enter your description..." width="600px" height="450px"></textarea>
            <button type="submit" value="send" id="mySubmit" class="submitBtn">Submit</button>
          </form>
        </section>`)
}
