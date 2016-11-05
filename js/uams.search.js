// ### UAMS Search

// This function creates a UAMS Search
// For usage please refer to the [UAMS Web Components Search](http://uw.edu/brand/web/#search)

UAMS.Search = Backbone.View.extend({

  // These are the three search options: the UAMS, the current site
  searchFeatures : {
    uams        : 'uams',
    site      : 'site'
  },

  // This is the HTML for the search bar that is preprended to the body tag.
  searchbar :
               '<div class="container no-height">'+
                  '<div class="center-block uams-search-wrapper">'+
                    '<form class="uams-search" action="<%= UAMS.baseUrl %>">'+
                      '<label class="screen-reader" for="uams-search-bar">Enter search text</label>' +
                      '<input id="uams-search-bar" type="search" name="s" value="" autocomplete="off" />'+
                    '</form>'+

                    '<select id="mobile-search-select" class="visible-xs">' +
                      '<option value="uams" selected>All the UAMS</option>' +
                      '<option value="site">Current site</option>' +
                    '</select>' +

                    '<input type="submit" value="search" class="search" tabindex="0"/>'+

                    '<div id="search-labels" class="labels hidden-xs">'+
                      '<label class="radio">'+
                        '<input class="radiobtn" type="radio" name="search" value="uams" data-toggle="radio" checked />'+
                        'All the UAMS'+
                      '</label>'+

                      '<label class="radio">'+
                        '<input class="radiobtn" type="radio" name="search" value="site" data-toggle="radio" />'+
                        'Current site'+
                      '</label>'+
                    '</div>'+
                '</div>'+
              '</div>',

  // Default values
  defaults : {},

  // List of events
  // Toggling the radio buttons changes the function of the search bar from searching the UAMS and searching the current site
  events :
  {
    'click label.radio' : 'toggleSearchFeature',
    'change select' : 'toggleSearchFeature',
    'click .search' : 'submitForm',
    'submit form' : 'submitSearch',
    // Accessibility events
    'keydown' : 'handleKeyDown',
    'focus input' : 'skipToContentIfHidden'
  },


  // Initialize the view and bind events
  initialize :function ( options )
  {
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )

    this.render()

    this.toggle = new UAMS.SearchToggle()

    this.toggle.on( 'open', this.toggleBlur, this )

    this.searchFeature = this.$el.find(':radio:checked').val()
  },

  // Render the search bar above the `body` element and set the view element to the search bar HTML
  // since most events take place within that view.
  render : function()
  {
    this.$el.html( _.template( this.searchbar )( this.settings ))
  },

  // todo: cleanup this function
  toggleBlur: function()
  {
    if ( this.toggle.settings.isOpen ) {
        this.$el.find( '#uams-search-bar' ).focus();
        this.$el.attr( 'aria-hidden', 'false' ).attr( 'role', 'search' );
    } else {
        this.$el.attr( 'aria-hidden', 'true' ).removeAttr( 'role' );
    }
  },

  handleKeyDown: function(event)
  {
    switch ( event.keyCode )
    {
      case UAMS.KEYCODES.TAB :
        if ($( event.target)[0] == $('input.search')[0] && ! $(event)[0].shiftKey) $('#search-labels').addClass('focused')
        if (($( event.target)[0] != $('input.search')[0]) && $('#search-labels').hasClass('focused')) $('#search-labels').removeClass('focused')
        if ($( event.target)[0] == $('input.radiobtn')[0] && ! $(event)[0].shiftKey){ this.toggle.$el.focus(); return false }
        return true

      case UAMS.KEYCODES.ESC :
        event.stopPropagation()
        this.toggle.toggleSearchBar()
        this.toggle.$el.focus()
        return false

      default :
        return true

    }
  },

  // Set a property to the current radio button indicating which function the search bar is providing.
  // todo: clean up
  toggleSearchFeature : function( event )
  {
    var value = $( event.currentTarget ).find( 'input' ).val()
    this.searchFeature = value
  },

  // Skip the search if it is hidden when tabbing through
  skipToContentIfHidden: function() {
    if ( ! this.toggle.settings.isOpen ) $('#main-content').focus()
  },

  // Determine if the client wants to search current site or the entire UAMS
  submitSearch : function( e )
  {
    switch ( this.searchFeature )
    {
      case this.searchFeatures.uams :
        this.$el.find( 'input' ).attr( 'name', 'q' )
        this.$el.find( 'form' ).attr( 'action', Backbone.history.location.protocol + '//uams.edu/search/' )
        return true;

      case this.searchFeatures.site :
        return true;

      default:
        return false;
    }
  },

  submitForm : function()
  {
    this.$el.find('form').submit()
    return false;
  }

})

