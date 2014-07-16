// ### UW Search

// This function creates a UW Search
// For usage please refer to the [UW Web Components Search](http://uw.edu/brand/web/#search)

// todo: separate search into different views
UW.Search = Backbone.View.extend({

  value : '',
  body : 'body',

  searchbar : '<div class="uw-search-bar-container">'+
               '<div class="container">'+
                  '<div class="center-block uw-search-wrapper">'+
                    '<form class="uw-search" action="/search/">'+
                      '<input type="search" name="q" value="" autocomplete="off" />'+
                    '</form>'+
                    '<a href="#" value="" class="search" />'+

                    '<div class="labels">'+
                      '<label class="radio">'+
                        '<input type="radio" name="group1" value="1" data-toggle="radio">'+
                        'All the UW'+
                      '</label>'+

                    '<label class="radio">'+
                      '<input type="radio" name="group1" value="2" data-toggle="radio">'+
                      'Current Site'+
                    '</label>'+

                    '<label class="radio">'+
                      '<input type="radio" name="group1" value="2" data-toggle="radio" checked>'+
                      'People Directory'+
                    '</label>'+


                '</div>'+

                '<div class="uw-results"></div>'+

                  '</div>'+
                '</div>'+
              '</div>',

  result :  '<div class="result">' +
              '<h4><%= cn[0] %></h4>'+
            '</div>',

  defaults :
  {
    limit : 2
  },

  events :
  {
    'click' : 'toggleSearchBar',
    // 'keydown input' : 'searchDirectory'

  },

  initialize :function ( options )
  {
    _.bindAll( this, 'toggleSearchBar', 'searchDirectory', 'parse' )
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$searchbar = $( _.template( this.searchbar , this.settings ) )
    this.render()
    this.model.on( 'change:results', this.parse, this )
  },

  render : function()
  {
    $( this.body ).prepend( this.$searchbar )
    this.$searchbar.find('input').bind('keydown', this.searchDirectory )
  },

  toggleSearchBar: function()
  {
    this.empty()
    this.$searchbar.toggleClass('open')
    return false;
  },

  searchDirectory : _.debounce( function( e ) {

    if ( this.value === e.target.value ) return
    if ( e.target.value.length < this.settings.limit ) return this.empty()
    if ( ! e.target.value.length ) return this.empty()

    this.value = e.target.value

    this.model.search( this.value )

  }, 200 ),

  empty : function()
  {
    $('.uw-results').empty()
  },

  parse : function ( response )
  {
    var data = response.attributes.results
      , result   = this.result
      , $results = $('.uw-results')


    this.empty()

    _.each(data, function( person, index ) {
      if ( person.cn )
      {
        var template = _.template( result, person )
        $results.append( template )
      }
    })

  }


})

UW.Search.DirectoryModel = Backbone.Model.extend({

  settings : {
    action : 'directory',
    search : ''
  },

  url : '/cms/2014/wp-admin/admin-ajax.php',

  search : function ( value ) {
    this.settings.search = value
    this.fetch( { data : this.settings })
  },

  parse : function( response ) {
    if ( response )
        this.set( 'results', response )
  }

})
