// ### UW Search

// This function creates a UW Search
// For usage please refer to the [UW Web Components Search](http://uw.edu/brand/web/#search)

UW.Search = Backbone.View.extend({

  // This property caches the current value in the search field so the same search doesn't execute multiple times.
  value : '',

  // These are the three search options: the UW, the current site and the directory
  searchFeatures : {
    uw        : 'uw',
    site      : 'site',
    directory : 'directory'
  },

  // This is the HTML for the search bar that is preprended to the body tag.
  searchbar : '<div id="uwsearcharea" class="uw-search-bar-container">'+
               '<div class="container no-height">'+
                  '<div class="center-block uw-search-wrapper">'+
                    '<form class="uw-search" action="<%= UW.baseUrl %>">'+
                      '<input id="uw-search-bar" type="search" name="s" value="" autocomplete="off" tabindex="-1"/>'+
                    '</form>'+

                    '<select id="mobile-search-select" class="visible-xs">' +
                      '<option value="uw" selected>All the UW</option>' +
                      '<option value="site">Current site</option>' +
                    '</select>' +

                    '<button class="search" tabindex="-1"/>'+

                    '<div class="labels hidden-xs">'+
                      '<label class="radio">'+
                        '<input type="radio" name="search" value="uw" data-toggle="radio" checked tabindex="-1">'+
                        'All the UW'+
                      '</label>'+

                      '<label class="radio">'+
                        '<input type="radio" name="search" value="site" data-toggle="radio" tabindex="-1">'+
                        'Current Site'+
                      '</label>'+

                    //   '<label class="radio">'+
                    //     '<input type="radio" name="search" value="directory" data-toggle="radio" tabindex="-1">'+
                    //     'People Directory'+
                    //   '</label>'+
                    // '</div>'+

                '</div>'+
              '</div>'+
              '<div class="uw-results center-block" style="display:none;">' +
                 '<p class="more-results" style="display:none;">Need more results? Try the <a href="http://www.washington.edu/directory/" title="Full directory">full directory</a></p>' +
              '</div>' +
            '</div>',

  // The HTML template for a single search result. Only the information that is available will be shown.
  result :  '<div class="result">' +
              '<h4 class="commonname"><%= commonname %></h4>'+
              '<a href="#" title="<%= commonname %>" class="directory-more">More</a>'+
              '<div class="information hidden">'+
                '<p class="pull-left"><% if ( title ) { %><span class="title"><%= title %></span><% } %>'+
                '<% if ( postaladdress ) { %><span class="postaladdress"><%= postaladdress %></span><% } %></p>'+
                '<% if ( mail ) { %><span class="mail">'+
                    '<% _.each( mail, function( email, index ) { %>' +
                      '<a href="mailto:<%= email %>" title="Email <%= commonname %>"><%= email %></a>'+
                        '<% if ( index != mail.length ) { %>, <% } %>' +
                      '<% }) %>'+
                '</span> <% } %>' +

                '<% if ( telephonenumber ) { %>' +
                    '<span class="telephonenumber">'+
                      '<% _.each( telephonenumber, function( telephone, index ) { %>' +
                        '<a href="tel:<%= telephone %>"><%= telephone %></a>' +
                        '<% if ( index != telephonenumber.length ) { %>, <% } %>' +
                      '<% }) %>'+
                    '</span>'+
                  '<% } %>'+
              '</div>'+
            '</div>',

  // Default values. The `limit` refers to the minimum number characters needed before an ajax search is performed.
  defaults :
  {
    limit : 2
  },

  // List of events
  // A keydown on the input field will trigger an ajax search if more than two characters are present.
  // Clicking on a result's more icon or name unveil more information
  // Toggling the radio buttons changes the function of the search bar from searhing the UW, searching the current site and searching the directory.
  events :
  {
    'keydown'                   : 'keyDownDispatch',
    'click .result .directory-more'       : 'showPersonInformation',
    'click .result .commonname' : 'showPersonInformation',
    'click label.radio'         : 'toggleSearchFeature',
    'click input:radio'         : 'stopProp',
    'change select'             : 'toggleSearchFeature',
    // 'keyup #uw-search-bar'      : 'searchDirectory',
    'click .search'             : 'submitForm',
    'submit form'               : 'submitSearch'
  },

  // Initialize the view and bind events to to the DirectoryModel `results` attribute.
  initialize :function ( options )
  {
    _.bindAll( this, 'toggleSearchBar', 'toggleBlur', 'keyDownDispatch', 'searchDirectory', 'parse' );

    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )

    this.$searchbar = $( _.template( this.searchbar , this.settings ) )

    this.render()

    this.$results  = this.$( '.uw-results' )
    this.$more    = this.$( '.more-results' )

    this.searchFeature = this.$el.find(':radio:checked').val()

    this.model.on( 'change:results', this.parse, this )
  },

  // Render the search bar above the `body` element and set the view element to the search bar HTML
  // since most events take place within that view.
  render : function()
  {
    UW.$body.prepend( this.$searchbar )

    this.$toggle = this.$el.find('button');
    this.$toggle.bind( {
        'click': this.toggleSearchBar,
        'blur': this.toggleBlur
        } );

    this.setElement( this.$searchbar )
  },

  // This shows and hides the search
  toggleSearchBar: function()
  {
    this.hideDirectory()
    this.$searchbar.toggleClass('open')
    UW.$body.toggleClass( 'search-open' )
    this.toggleBlur();
    return false;
  },

  toggleBlur: function()
  {
    if (this.$searchbar.hasClass('open')) {
        this.$searchbar.find('#uw-search-bar').focus();
    }
  },

  keyDownDispatch: function(event)
  {
    if (event.keyCode == 27){
        if (this.$searchbar.hasClass('open')){
            this.toggleSearchBar();
            this.$toggle.focus();
        }
    }
    else{
        var $target = $(event.target);
        if ($target.is(':radio')) {
            if ((event.keyCode == 13) || (event.keyCode == 32)){
                $target.parent('label').trigger('click');
            }
            else if (event.keyCode == 9) {
                event.preventDefault();
                this.$toggle.focus();
                $checked = this.$searchbar.find('input[value=' + this.searchFeature + ']');
                if (!$checked.parent('label').hasClass('checked')){
                    this.$searchbar.find('label').removeClass('checked');
                    $checked.parent('label').addClass('checked');
                }
            }
        }
        else if ($target.is('#uw-search-bar')){
            if (event.keyCode == 9) {
                event.preventDefault();
                if (this.$more.is(':visible')){
                    this.$more.find('a').focus();
                }
                else {
                    this.$searchbar.find('input[value=' + this.searchFeature + ']').focus();
                }
            }
        }
        else if ($target.is(this.$more.find('a')) && event.keyCode == 9){
            event.preventDefault();
            this.$searchbar.find('input[value=' + this.searchFeature + ']').focus();
        }
    }
  },

  stopProp: function(event)
  {
    event.stopPropagation();
  },

  // Set a property to the current radio button indicating which function the search bar is providing.
  toggleSearchFeature : function( e )
  {
    this.hideDirectory()
    var value = e.currentTarget.childNodes[1].value;
    this.searchFeature = value
    _.defer(function($searchbar) { $searchbar.find('#uw-search-bar').focus() }, this.$searchbar);
    if ( this.searchFeature === this.searchFeatures.directory )
      this.showDirectory()
    // this.mirrorSelectAndRadioElements()
  },

  // mirrorSelectAndRadioElements : function()
  // {
  // },

  // If the search bar is not searching the directiory behave like a normal search function and don't cancel
  // the submit event.
  submitSearch : function( e )
  {
    switch ( this.searchFeature )
    {
      case this.searchFeatures.uw :
        this.$searchbar.find('input').attr('name', 'q')
        this.$searchbar.find('form').attr('action', 'http://uw.edu/search/')
        return true;

      case this.searchFeatures.site :
        return true;

      default:
        return false;
    }
  },

  submitForm : function()
  {
    this.$searchbar.find('form').submit()
    return false;
  },


  // Check if a new search is in the searchbar, enough characters are in the searchbar and that there it
  // a term to search for. If all three of these checks pass, cache the search term and perform the search.
  // Note: this functino is debounced by 200ms to limit the number of searches triggered within that time period to one.
  searchDirectory : _.debounce( function( e ) {

    if ( this.value === e.target.value ) return
    if ( e.target.value.length < this.settings.limit ) return this.empty()
    if ( ! e.target.value.length ) return this.empty()

    this.value = e.target.value

    this.model.search( this.value )

  }, 200 ),

  hideDirectory : function()
  {
    this.$results.hide()
  },

  showDirectory : function()
  {
    this.$results.show()
  },

  // Empty the search results.
  empty : function()
  {
    this.$results.empty()
      .append( this.$more )

    if ( ! $('#uw-search-bar').val() ) this.$more.hide()
  },

  // Parse the search results. The LDAP response from the server is first parsed by custom PHP and then
  // the new JSON feed is rendered here in the view.
  parse : function ( response )
  {
    var data = response.attributes.results
      , result   = this.result
      , $results = this.$results

    this.empty()

    _.each(data.Students, function( person, index ) {
      if ( person.commonname )
      {
        var template = _.template( result, person )
        $results.prepend( template )
      }
    })

    _.each(data['Faculty & Staff'], function( person, index ) {
      if ( person.commonname )
      {
        var template = _.template( result, person )
        $results.prepend( template )
      }
    })

    this.$more.show()

  },

  // Reveal or hide the directory more information.
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
    limit    : '-1',
    action : 'directory',
    search : ''
  },

  initialize : function (options) {
    this.url = options.url;
  },

  search : function ( value ) {
    this.settings.search = value
    this.fetch( { data : this.settings })
  },

  parse : function( response ) {
    if ( response )
        this.set( 'results', response )
  }

})
