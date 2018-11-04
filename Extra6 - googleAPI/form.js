$(function () {
debugger;
    $('form').on('submit', function (e) {
        debugger;

        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'https://vadim-hasura.herokuapp.com/v1alpha1/graphql',
            data: $('form').serialize(),
            success: function (response) {
                //$('form')[0].reset();
               // $("#feedback").text(response);
                if(response=="True") {
                    $('form')[0].reset();
                    $("#feedback").text("Your information has been stored.");
                }
                else
                    $("#feedback").text(" Some Error has occured Errror !!! ID duplicate");
            }
        });

    });

});