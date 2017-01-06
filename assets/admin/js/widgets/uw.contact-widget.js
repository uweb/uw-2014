jQuery(document).ready(function( $ ) {



  $('body').on('click', '#sidebar #person-button', function(event) {

    // var $number =  ( $(this).siblings('.uw-contact-card-the-people').children('.peep').length > 0 ) ?
    //                 $(this).parent().siblings('input.widget_number').attr('value') : -1;
    var $number =  $(this).parent().siblings('input.widget_number').attr('value');
    var $firstPeep = !( $(this).siblings('.uw-contact-card-the-people').children('.peep').length > 0 );

    //console.log( $(this).siblings('.uw-contact-card-the-people').children('.peep').length )

    $(this).parent().find('.uw-contact-card-contact-group').append(
      _.template( $('#sidebar #redirect-template').html(), { number : parseInt($number) , firstPeep : $firstPeep })
    )



  })


  $('body').on('click', '#sidebar .remove', function(event) {

	var $this = $(this)
        $this.closest('.peep').remove()
 	})


})


