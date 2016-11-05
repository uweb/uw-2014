jQuery(document).ready(function($){

  $('input[name=noconfirmation]').closest('tr').hide().end().attr('checked', true);

    if ( $('#uams-documentation').length )
    {

      var text = $('#markdown').text()
          , converter = new Showdown.converter()
          , html = converter.makeHtml( text )

      $('#uams-documentation').html( html )

      $('a').on('click', function() {
        var href = $(this).attr('href')
        if ( _.first( href )  === '#') {
          $( 'html, body' ).animate( {'scrollTop': $(href).position().top}, 700 )
          return
        }
      })
    }


})
