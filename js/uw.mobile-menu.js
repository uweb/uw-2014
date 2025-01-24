// ### UW Dropdowns

// This function creates the UW mobile menu toggle

UW.MobileMenu = Backbone.View.extend({

  events: {
    'click button' : 'toggle',
    'click a' : 'openmenu'
  },

  initialize : function( options )
  {
    _.bindAll(this, 'toggle','reset_li','openmenu','cloneMenuAnchors');
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$mobilemenu_ul = this.$el.find('ul.uw-mobile-menu');
  },

  // Clone the first item in the menu if it has a flyout, as it can't be used as both an anchor and button
  cloneMenuAnchors : _.once( function(){
    this.$el.find('.menu-item-has-children > a').each(function(){
      var $target   = $(this),
          $targetUl = $target.next('ul')

      $target.next('ul').first().prepend('<li>' + $target[0].outerHTML + '</li>');

      // Initial ARIA tags
      $target.attr('aria-expanded', false);
      $targetUl.attr('aria-hidden', true)
    }) 
  }),

  openmenu : function(event){    
    var $target = $(event.target),
        $targeUl = $target.next();

    if( $targeUl.length > 0 ){
      event.preventDefault();  
      // Toggle ARIA tags 
      $targeUl.attr('aria-hidden', function(index, attr){
        return attr === 'true' ? 'false' : 'true';
      });  
      $target.attr('aria-expanded', function(index, attr){
        return attr === 'true' ? 'false' : 'true';
      });
      $target.parent().toggleClass('active-menu');
    }     
  },

  toggle: function(event)
  {
    this.$mobilemenu_ul.toggle();
    this.$el.addClass('active_nav');
    this.cloneMenuAnchors();
  },

  reset_li: function()
  {
    this.$mobilemenu.find('li').removeAttr('style');
  }

})