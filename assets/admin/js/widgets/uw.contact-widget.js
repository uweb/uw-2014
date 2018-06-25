jQuery(document).ready(function( $ ) {



  $('body').on('click', '#sidebar #person-button', function(event) {

    var $id = $(this).closest('.widget').attr('id');
    var $number = $id.split("_contact-list-").pop();

    $(this).parent().find('.uw-contact-card-contact-group').append(
      _.template( $('#sidebar #redirect-template').html() ) ( { number : $number } )
    );



  })

  // removes a contact and automatically saves the change 
  $('body').on('click', '#sidebar .remove', function(event) {
        this.closest('.peep').remove();
        $("#widget-contact-list-2-savewidget").trigger('click');
 	})


})
