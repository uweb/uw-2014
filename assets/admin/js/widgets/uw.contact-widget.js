jQuery(document).ready(function( $ ) {



  $('body').on('click', '#person-button', function(event) {
    event.preventDefault();
    var $id = $(this).closest('.widget').attr('id');
    var $number = $id.split("_contact-list-").pop();

    $(this).parent().find('#the-people').append(
      _.template( $('#redirect-template').html() ) ( { number : $number } )
    );



  })

  // removes a contact and automatically saves the change
  $('body').on('click', '.uw-contact-card-remove', function(event) {
        this.closest('.peep').remove();
        $("#widget-contact-list-2-savewidget").trigger('click');
  })

})

