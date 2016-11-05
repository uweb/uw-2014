// ### UAMS Dropdowns

// This function creates the UAMS Dropdowns
// For usage please refer to the [UW Web Components Dropdowns](http://uw.edu/brand/web/#dropdowns)



UAMS.Dropdowns = Backbone.View.extend({

  chunkSize : 8,
  menuWidth : 1170,
  menuBlock : '<div class="menu-block"></div>',
  menuBlockWidth : 230,

  index : {
    topmenu : 0,
    submenu : 0
  },

  elements : {
    toplevel : '.reddiedrops-item',
    megamenu : '.mega-menu'
  },

  keys : {
    enter    :   13,
    esc      :   27,
    tab      :   9,
    left     :   37,
    up       :   38,
    right    :   39,
    down     :   40,
    spacebar :   32
  },


  events : {
    'keydown .reddiedrops-menu a' : 'moveFocusInSubMenu',
    'keydown .reddiedrops-item > a' : 'toggleSubMenu',
    'focus .reddiedrops-item' : 'positionSubmenu',
    'mouseenter .reddiedrops-item' : 'positionSubmenu'
  },


  initialize : function(options)
  {
    _.bindAll( this, 'render', 'chunk', 'wrap', 'wrapChildren', 'wrapMega', 'positionSubmenu', 'toggleSubMenu' )
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$topLevelNav = this.$el.find( this.elements.toplevel ).not(this.elements.megamenu )
    this.$topLevelMega = this.$el.find( this.elements.megamenu )
    this.render()
  },


  render : function()
  {
    _.each( this.$topLevelNav, this.wrapChildren )
    _.each( this.$topLevelMega, this.wrapMega )
  },

  chunk : function( element, index )
  {
    return Math.floor( index / this.chunkSize );
  },

  wrapChildren : function( element )
  {
    if ( $(element).find('li').length > this.chunkSize )
        _.each( _.groupBy( $( element ).find('li'), this.chunk ), this.wrap )
  },

  wrapMega : function( element )
  {
 	//if ( $(element).find('li').not('.sub-menu li') )
    	_.each( $( element ).find('li').not('.sub-menu li'), this.wrap )
  },

  wrap : function( elements )
  {
      $( elements ).wrapAll( this.menuBlock )
  },

  // todo: tidy up the math / variables
  positionSubmenu : function( event )
  {
    var $el = $( event.currentTarget )
      , position = $el.position()
      , menublock = $el.find('.menu-block')
      , shift = ( this.menuBlockWidth * ( menublock.length ) ) + position.left
      , left = shift > UAMS.$window.width() ? $el.outerWidth() + position.left - ( menublock.length * this.menuBlockWidth ) : position.left

      if (left < 0)  // Make sure the left is not negative margin.  If so, center the menu
    	left = ( UAMS.$window.width() - this.menuBlockWidth * ( menublock.length )) * 0.5

    $el.find('ul').css( { top : position.top + 48, left: left })
  },

  toggleSubMenu : function( e )
  {
    switch ( e.keyCode )
    {

      case this.keys.enter :
      case this.keys.down  :

        $(e.currentTarget).attr('aria-expanded', 'true');
        this.currentSubMenu = $(e.currentTarget).siblings('ul')
        this.currentSubMenuAnchors = this.currentSubMenu.find('a')

        this.currentSubMenu
            .attr( 'aria-expanded', 'true' )
            .show()
          .find('a')
            .eq(0)
            .focus()

        return false

      case this.keys.left :
        $(e.currentTarget).parent().prev().children('a').first().focus()
        return false


      case this.keys.right :
        $(e.currentTarget).parent().next().children('a').first().focus()
        return false

      case this.keys.spacebar:
        window.location.href = $(e.currentTarget).attr('href')
        return false;

    }

  },

  moveFocusInSubMenu : function(e)
  {
    switch ( e.keyCode ) {

      case this.keys.tab:
        if ( this.currentSubMenu )
        {
          this.currentSubMenu.hide()
          this.currentSubMenu = null
          this.index.submenu = 0
        }
        break

      case this.keys.down:
        this.index.submenu = this.index.submenu === this.currentSubMenuAnchors.length-1 ? 0 : this.index.submenu + 1
        this.currentSubMenuAnchors.eq( this.index.submenu ).focus()
        return false

      case this.keys.up :
        this.index.submenu = this.index.submenu === 0 ? this.currentSubMenuAnchors.length-1 : this.index.submenu - 1
        this.currentSubMenuAnchors.eq( this.index.submenu ).focus()
        return false

      case this.keys.left:
        this.currentSubMenu.hide().parent().prev().children('a').first().focus()
        this.index.submenu = 0;
        this.currentSubMenu.attr( 'aria-expanded', 'false' )
          .parent().children('a').first().attr('aria-expanded', 'false')
        return false;

      case this.keys.right:
        this.currentSubMenu.hide().parent().next().children('a').first().focus()
        this.index.submenu = 0;
        this.currentSubMenu.attr( 'aria-expanded', 'false' )
          .parent().children('a').first().attr('aria-expanded', 'false')
        return false;

      case this.keys.spacebar:
      case this.keys.enter:
        window.location.href = $(e.currentTarget).attr('href')
        return false;

      case this.keys.esc:
        this.currentSubMenu.attr('aria-expanded', 'false' )
          .hide().parent().children('a').first().attr('aria-expanded', 'false').focus();
        return false;

      default:
        var chr = String.fromCharCode(e.which)
        , exists = false;

        this.currentSubMenuAnchors.filter(function() {
          exists = this.innerHTML.charAt(0) === chr
          return exists;
        }).first().focus();

        return !exists;


    }
  }

})
