// ### UW Dropdowns

// This function creates the UW mobile menu toggle

UW.MobileMenu = Backbone.View.extend({

  events: {
    'click' : 'toggle'
  },

  initialize : function( options )
  {
    _.bindAll(this, 'toggle','reset_li');
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$mobilemenu = this.$el.parent('nav');
    this.$mobilemenu_ul = this.$mobilemenu.find('ul.uw-mobile-menu');
  },

  toggle: function()
  {
    this.$mobilemenu.find('li').width(this.$mobilemenu.width());
    this.$mobilemenu_ul.toggle({'duration': 400, 'easing':'easeInOutQuart', 'done': this.reset_li });
  },

  reset_li: function()
  {
    this.$mobilemenu.find('li').removeAttr('style');
  }

})
