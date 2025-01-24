jQuery(document).ready(function($){

  $('input[name=noconfirmation]').closest('tr').hide().end().attr('checked', true);

    if ( $('#uw-documentation').length )
    {

      var converter = new showdown.Converter({}),
        flavor  = converter.setFlavor('github'),
        text  = $('#markdown').text(),
        html  = converter.makeHtml(text);

      $('#uw-documentation').html( html )

      $('a').on('click', function() {
        var href = $(this).attr('href')
        if ( _.first( href )  === '#') {
          $( 'html, body' ).animate( {'scrollTop': $(href).position().top}, 700 )
          return
        }
      })
    }


})
