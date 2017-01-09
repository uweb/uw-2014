jQuery(document).ready(function( $ ) {



  $('body').on('click', '#sidebar #person-button', function(event) {

    var $number =  $(this).parent().siblings('input.widget_number').attr('value');
    $(this).parent().find('.uw-contact-card-contact-group').append(
      _.template( $('#sidebar #redirect-template').html(), { number : $number })
    )



  })


  $('body').on('click', '#sidebar .remove', function(event) {

	var $this = $(this)
        $this.closest('.peep').remove()
 	})


})


