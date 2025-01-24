// ### UW Dropdowns

// This function creates the UW Dropdowns
// For usage please refer to the [UW Web Components Dropdowns](http://uw.edu/brand/web/#dropdowns)



UW.Dropdowns = Backbone.View.extend({

  chunkSize : 8,
  menuWidth : 1170,
  menuBlock : '<div class="menu-block"></div>',
  menuBlockWidth : 230,

  index : {
    topmenu : 0,
    submenu : 0
  },

  elements : {
    toplevel : '.dawgdrops-item',
    document : document,
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
    'keydown .dawgdrops-menu a' : 'moveFocusInSubMenu',
    // 'keydown .dawgdrops-item > button' : 'toggleSubMenu',
    'keydown .dawgdrops-item > button' : 'toggleSubMenu',
    'click .dawgdrops-item > button' : 'clickSubMenu',
    'focus .dawgdrops-item > button' : 'positionSubmenu',
    'mouseenter .dawgdrops-item' : 'positionSubmenu',
    'mouseleave .dawgdrops-item' : 'removeAria',
    'keydown .dawgdrops-item' : 'currentDawg',
  },


  initialize : function(options)
  {
    _.bindAll( this, 'render', 'chunk', 'wrap', 'wrapChildren', 'positionSubmenu', 'toggleSubMenu')
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$topLevelNav = this.$el.find( this.elements.toplevel )
    this.render()
    $(document).bind( 'keydown', this.keyAction );
  },

  render : function()
  {
    _.each( this.$topLevelNav, this.wrapChildren )
  },

  chunk : function( element, index )
  {
    return Math.floor( index / this.chunkSize );
  },

  wrapChildren : function( element )
  {
    // if ( $(element).find('li').length > this.chunkSize )
        _.each( _.groupBy( $( element ).find('li'), this.chunk ), this.wrap )
    // else
    //   _.each( _.groupBy( $( element ).find('li'), this.chunk ), this.wrap )
  },

  wrap : function( elements )
  {
      $( elements ).wrapAll( this.menuBlock )
  },

  // todo: tidy up the math / variables
  positionSubmenu : function( event )
  {
    $(".dawgdrops-item.current").trigger('mouseleave');
    var $el = $( event.currentTarget )
      , position = $el.position()
      , menublock = $el.find('.menu-block')
      , shift = ( this.menuBlockWidth * ( menublock.length ) ) + position.left
      , left = shift > UW.$window.width() ? $el.outerWidth() + position.left - ( menublock.length * this.menuBlockWidth ) : position.left
      $el.find('a').siblings('ul').removeAttr('style');
      // $el.find('a').siblings('ul').css( { top : position.top + 58, left: left });
      $el.find('button').attr( 'aria-expanded', 'true' );
      $el.addClass('current');
  },

  removeAria : function( event ) {
    var $el = $( event.currentTarget );
    $el.find('button').attr( 'aria-expanded', 'false' );
    $el.removeClass('current');

  },

  currentDawg : function( e )
  {
    $(e.currentTarget).addClass('current');
  },

  clickSubMenu : function( e )
  {
    this.currentSubMenu = $(e.currentTarget).siblings('ul');
    this.currentSubMenuAnchors = this.currentSubMenu.find('a');
    this.currentSubMenu.show();
    this.currentSubMenuAnchors.eq(0).focus();
    $(e.currentTarget).attr('aria-expanded', 'true');
    this.currentSubMenu.css('display', 'flex');
  },

  toggleSubMenu : function( e )
  {
    switch ( e.keyCode )
    {
      case this.keys.spacebar:
      case this.keys.enter :
      // case this.keys.down  :
        $(".dawgdrops-item").trigger('mouseleave');
        this.currentSubMenu = $(e.currentTarget).siblings('ul');
        this.currentSubMenuAnchors = this.currentSubMenu.find('a');
        this.currentSubMenu
            .show()
          .find('a')
            .eq(0)
            .focus()
        $(e.currentTarget).attr('aria-expanded', 'true');
        this.currentSubMenu.css('display', 'flex');

        return false

      case this.keys.left :
        $(e.currentTarget).parent().prev().children('a').first().focus()
        return false


      case this.keys.right :
        $(e.currentTarget).parent().next().children('a').first().focus()
        return false

      // case this.keys.spacebar:
      //   window.location.href = $(e.currentTarget).attr('href')
      //   return false;

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
        this.currentSubMenu.hide().parent().prev().children('button').first().focus()
        this.index.submenu = 0;
        this.currentSubMenu.parent().children('button').attr('aria-expanded', 'false')
        return false;

      case this.keys.right:
        this.currentSubMenu.hide().parent().next().children('button').first().focus()
        this.index.submenu = 0;
        this.currentSubMenu.parent().children('button').attr('aria-expanded', 'false')
        return false;

      case this.keys.spacebar:
      case this.keys.enter:
        window.location.href = $(e.currentTarget).attr('href')
        return false;

      case this.keys.esc:
        this.currentSubMenu.hide();
        this.index.submenu = 0;
        this.currentSubMenu.parent().children('button').attr('aria-expanded', 'false').focus();
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
  },

  keyAction : function(e) {
    switch ( e.keyCode ) {

      case 27:
        this.currentSubMenu = $('.dawgdrops-item.current ul')
        this.currentButton = $('.dawgdrops-item.current button')
        this.currentSubMenu.hide();
        this.currentButton.attr('aria-expanded', 'false').focus();
        return false;
    }
  }
})
