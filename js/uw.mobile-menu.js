// ### UW Dropdowns

// This function creates the UW mobile menu toggle

UW.MobileMenu = Backbone.View.extend({

  events: {
    'click' : 'toggle'
  },

  initialize : function( options )
  {
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$mobilemenu = this.$el.siblings().first()
  },

  toggle: function()
  {
    this.$mobilemenu.toggle()
  }


})
