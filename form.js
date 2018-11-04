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
              debugger;
                //$('form')[0].reset();
                // $("#feedback").text(response);
                if (response == "True") {
                    $('form')[0].reset();
                    $("#feedback").text("Your information has been stored.");
                }
                else
                    $("#feedback").text(" Some Error has occured Errror !!! ID duplicate");
            }
        });

    });
}
