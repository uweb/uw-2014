jQuery(document).ready(function( $ ) {



  $('body').on('click', '#sidebar #person-button', function(event) {

    var $id = $(this).closest('.widget').attr('id');
    var $number = $id.split("_contact-list-").pop();

    $(this).parent().find('.uw-contact-card-contact-group').append(
      _.template( $('#sidebar #redirect-template').html(), { number : $number })
    )



  })


  $('body').on('click', '#sidebar .remove', function(event) {

	var $this = $(this)
        $this.closest('.peep').remove()
 	})


})


