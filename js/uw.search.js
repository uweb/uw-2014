// ### UW Search

// This function creates a UW Search
// For usage please refer to the [UW Web Components Search](http://uw.edu/brand/web/#search)

UW.Search = Backbone.View.extend({

  // These are the three search options: the UW, the current site
  searchFeatures : {
    uw        : 'uw',
    site      : 'site'
  },

  // This is the HTML for the search bar that is preprended to the body tag.
  searchbar :
               '<div class="container no-height" role="search">'+
                  '<div class="center-block uw-search-wrapper">'+
                    '<form class="uw-search" action="<%= UW.baseUrl %>">'+
                      '<div class="search-form-wrapper">'+
                        '<label class="screen-reader" for="uw-search-bar">Enter search text</label>' +
                        '<input id="uw-search-bar" type="search" name="s" value="" autocomplete="off" placeholder="Search" />'+
                      '</div>'+

                      '<select id="mobile-search-select" class="visible-xs" aria-label="Search Scope">' +
                        '<option value="uw" selected>All the UW</option>' +
                        '<option value="site">Current site</option>' +
                      '</select>' +

                      '<input type="submit" value="search" class="search" tabindex="0"/>'+

                        '<fieldset style="margin: 0; padding: 0; border: 1px; solid #ffffff;">'+

                        '<div role="radiogroup" id="search-labels" class="labels hidden-xs">'+
                           '<label class="radio">'+
                             '<input role="radio" class="radiobtn" type="radio" name="search" value="uw" data-toggle="radio" checked />'+
                             'All the UW'+
                           '</label>'+
 
                           '<label class="radio">'+
                             '<input role="radio" class="radiobtn" type="radio" name="search" value="site" data-toggle="radio" />'+
                             'Current site'+
                           '</label>'+
 
                         '</form>'+
                       '</div>'+
 
                     '</fieldset>'+
  

                     
                '</div>'+
              '</div>',

  // Default values
  defaults : {},

  // List of events
  // Toggling the radio buttons changes the function of the search bar from searching the UW and searching the current site
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

    this.toggle = new UW.SearchToggle()

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
        this.$el.find( '#uw-search-bar' ).focus();
        this.$el.attr( 'aria-hidden', 'false' ).attr( 'role', 'search' );
    } else {
        this.$el.attr( 'aria-hidden', 'true' ).removeAttr( 'role' );
    }
  },

  handleKeyDown: function(event)
  {
    switch ( event.keyCode )
    {
      case UW.KEYCODES.TAB :
        if ($( event.target)[0] == $('input.search')[0] && ! $(event)[0].shiftKey) $('#search-labels').addClass('focused')
        if (($( event.target)[0] != $('input.search')[0]) && $('#search-labels').hasClass('focused')) $('#search-labels').removeClass('focused')
        if ($( event.target)[0] == $('input.radiobtn')[0] && ! $(event)[0].shiftKey){ this.toggle.$el.focus(); return false }
        return true

      case UW.KEYCODES.ESC :
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

  // Determine if the client wants to search current site or the entire UW
  submitSearch : function( e )
  {
    this.$el.find( 'input.radiobtn' ).attr('disabled', 'disabled')
    switch ( this.searchFeature )
    {
      case this.searchFeatures.uw :
        this.$el.find( '#uw-search-bar' ).attr( 'name', 'q' )
        this.$el.find( 'form' ).attr( 'action', Backbone.history.location.protocol + '//uw.edu/search/' )
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

