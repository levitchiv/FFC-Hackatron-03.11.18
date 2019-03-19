function initForm() {
    $('form').on('submit', function (e) {
        e.preventDefault();

        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var category = $('#category').val();
        var item_name = $('#item-id').val()
        var subject = $('#subject').val();
        var lat = $('#lat').val();
        var lng = $('#lng').val()

        if(name == "" || email == "" || phone == "" || category == "" || item_name == "") {
          $(".error").css("display","block");
        } else {
          $.ajax({
              type: 'POST',
              url: 'https://vadim-hasura.herokuapp.com/v1alpha1/graphql',
              data: JSON.stringify({
                query: `mutation insert_found_objects {
                    insert_found_objects(
                      objects: [
                        {
                          name: "${name}",
                          email: "${email}",
                          phone: "${phone}",
                          category: "${category}"
                          item_name: "${item_name}",
                          description: "${subject}",
                          lat: "${lat}",
                          lng: "${lng}"
                        }
                      ]
                    ) {
                      returning {
                        id
                      }
                    }
                  }`,
            operationName: "insert_found_objects",
            variables: null}
        ),
              success: function (response) {

                  $('.form')[0].reset();
                  alert("Item succesfully posted!");
                  location.reload();
              },
              error: function (response) {
                alert("Make sure that you mark the place where you found the object on the map!");
              }
          });
        }
    });
}
