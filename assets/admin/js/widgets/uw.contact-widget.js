jQuery(document).ready(function( $ ) {



  $('body').on('click', '#sidebar #person-button', function(event) {

    var $list = $('#sidebar #the-people > p > input')
      , $last = $list.length 
    $('#sidebar #contact-group').append(
      _.template( $('#sidebar #redirect-template').html(), { count : $last + 1 || 0, to:null, the_class:'person_name' })
    )



  })


  $('body').on('click', '#sidebar .remove', function(event) {

	var $this = $(this)
        $this.closest('.peep').remove()
 	})


})


