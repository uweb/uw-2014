// ### UW Search

// This function creates a UW Search
// For usage please refer to the [UW Web Components Search](http://uw.edu/brand/web/#search)

UW.Search = Backbone.View.extend({

  // el : '.uw-search-bar-container',

  // template : '<div class="uw-search-bar-container">'+
  //              '<div class="container">' +
  //               '<form action="/search/">' +
  //                 '<input type="search" name="q" value="" class="fui-search" />' +
  //                 '<input type="submit" value="Search" />' +
  //                 '</form>'+
  //               '</div>'+
  //             '</div>',

  events : {
    'click .close' : 'close'
  },

  initialize :function ( options )
  {
    // console.log('here')
    _.bindAll( this, 'open', 'close' )
    this.$searchButton = $('li.uw-search') // todo: is there another view to use so we can bind via backbone?
    this.$searchButton.bind( 'click', this.open )
  },

  open: function() {
    this.$el.toggleClass('open')
  },

  close: function() {
    this.$el.removeClass('open')
  }

})
