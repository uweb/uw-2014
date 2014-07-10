// ### UW Search

// This function creates a UW Search
// For usage please refer to the [UW Web Components Search](http://uw.edu/brand/web/#search)

UW.Search = Backbone.View.extend({

  body : 'body',

  searchbar : '<div class="uw-search-bar-container">'+
               '<div class="container">' +
                '<form action="/search/">' +
                  '<input type="search" name="q" value="" class="fui-search" />' +
                  '<input type="submit" value="Search" />' +
                  '</form>'+
                '</div>'+
              '</div>',

  events : {
    'click' : 'toggleSearchBar'
  },

  initialize :function ( options )
  {
    _.bindAll( this, 'toggleSearchBar' )
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$searchbar = $( _.template( this.searchbar , this.settings ) )
    this.render()
  },

  render : function()
  {
    $( this.body ).prepend( this.$searchbar )
  },

  toggleSearchBar: function() {
    this.$searchbar.toggleClass('open')
    return false;
  },

})
