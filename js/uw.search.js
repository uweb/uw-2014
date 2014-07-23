// ### UW Search

// This function creates a UW Search
// For usage please refer to the [UW Web Components Search](http://uw.edu/brand/web/#search)

UW.Search = Backbone.View.extend({

  value : '',
  body : 'body',

  searchFeatures : {
    uw        : 'uw',
    site      : 'site',
    directory : 'directory'
  },

  searchbar : '<div class="uw-search-bar-container">'+
               '<div class="container">'+
                  '<div class="center-block uw-search-wrapper">'+
                    '<form class="uw-search" action="<%= Backbone.history.location.pathname %>">'+
                      '<input id="uw-search-bar" type="search" name="s" value="" autocomplete="off" />'+
                    '</form>'+
                    '<a href="#" value="" class="search" />'+

                    '<div class="labels">'+
                      '<label class="radio">'+
                        '<input type="radio" name="search" value="uw" data-toggle="radio">'+
                        'All the UW'+
                      '</label>'+

                    '<label class="radio">'+
                      '<input type="radio" name="search" value="site" data-toggle="radio">'+
                      'Current Site'+
                    '</label>'+

                    '<label class="radio">'+
                      '<input type="radio" name="search" value="directory" data-toggle="radio" checked>'+
                      'People Directory'+
                    '</label>'+


                '</div>'+

                '<div class="uw-results"></div>'+

                  '</div>'+
                '</div>'+
              '</div>',

  result :  '<div class="result">' +
              '<h4 class="commonname"><%= commonname %></h4>'+
              '<a href="#" title="<%= commonname %>" class="more">More</a>'+
              '<div class="information hidden">'+
                '<p class="pull-left"><% if ( title ) { %><span class="title"><%= title %></span><% } %>'+
                '<% if ( postaladdress ) { %><span class="postaladdress"><%= postaladdress %></span><% } %></p>'+
                '<% if ( mail ) { %><span class="mail"><a href="mailto:<%= mail %>" title="Email <%= commonname %>"><%= mail %></a></span><% } %>'+
                '<% if ( telephonenumber ) { %><span class="telephonenumber"><a href="tel:<%= telephonenumber %>"><%= telephonenumber %></a></span><% } %>'+
              '</div>'+
            '</div>',

  defaults :
  {
    limit : 2
  },

  events :
  {
    'keydown input'             : 'searchDirectory',
    'click .result .more'       : 'showPersonInformation',
    'click .result .commonname' : 'showPersonInformation',
    'click input:radio'         : 'toggleSearchFeature',
    'submit form'              : 'submitSearch'
  },

  initialize :function ( options )
  {
    _.bindAll( this, 'toggleSearchBar', 'searchDirectory', 'parse' )

    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )

    this.$searchbar = $( _.template( this.searchbar , this.settings ) )

    this.render()

    this.$results  = this.$( '.uw-results' )

    this.searchFeature = this.$el.find(':radio:checked').val()

    this.model.on( 'change:results', this.parse, this )
  },

  render : function()
  {
    $( this.body ).prepend( this.$searchbar )

    this.$toggle = this.$el;
    this.$toggle.bind( 'click', this.toggleSearchBar )

    this.setElement( this.$searchbar )
  },

  toggleSearchBar: function()
  {
    this.empty()
    this.$searchbar.toggleClass('open')
      .find('#uw-search-bar').focus()
    return false;
  },

  toggleSearchFeature : function( e )
  {
    this.empty()
    this.searchFeature = e.currentTarget.value
  },

  submitSearch : function()
  {
    return this.searchFeature !== this.searchFeatures.directory
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
    this.$results.empty()
  },

  parse : function ( response )
  {
    var data = response.attributes.results
      , result   = this.result
      , $results = this.$results


    this.empty()

    _.each(data, function( person, index ) {
      if ( person.commonname )
      {
        var template = _.template( result, person )
        $results.append( template )
      }
    })

  },

  showPersonInformation : function( e )
  {
    this.$( e.currentTarget )
      .closest('.result')
        .toggleClass('open')
      .find('.information')
        .toggleClass( 'hidden' )
    return false;
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
