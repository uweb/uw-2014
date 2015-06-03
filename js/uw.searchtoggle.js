// ### UW Search Toggle

// This works with the search toggle icon and is only used by the UW Search View
UW.SearchToggle = Backbone.View.extend({

  el : 'button.uw-search',

  events: {
    'click' : 'toggleSearchBar'
  },

  settings : {
    isOpen : false
  },

  initialize : function() {},

  toggleSearchBar: function()
  {
    this.settings.isOpen = ! this.settings.isOpen

    this.trigger( 'open' )

    UW.$body.toggleClass( 'search-open' )

    if ( this.settings.isOpen ) {
      this.$el.attr('aria-label', 'close search area');
      this.$el.attr('aria-expanded', 'true' );
    } else {
      this.$el.attr('aria-label', 'open search area');
      this.$el.attr('aria-expanded', 'false' );
    }

    return false;
  },

})
