// ### UW Slideshow

// This function creates a UW Slideshow.
// For usage please refer to the [UW Web Components Slideshow](http://uw.edu/brand/web/#slideshow)

UW.Slideshow = Backbone.View.extend({

  // The classname of the elements that will become slideshows
  el : '.uw-slideshow',

  // The `current` property indicates which slide number to animate in or out
  current : 0,

  // This is the template for the Previous and Next controls.
  // We're using an Undercore template to simplify the slideshow's markup.
  controls : '' +
    '<a href="#" class="<%= classname %> next fui-arrow-right"></a>' +
    '<a href="#" class="<%= classname %> previous fui-arrow-left"></a>'
  ,

  // This is a placeholder that is set to the final animation points for the slides
  // depending if they are animating in or animating out.
  animation : {},

  // These are the basic animation settings and classes used in the slidesshow.
  settings : {
    slideclass : '.slide',
    controlclasses : {
      base : 'uw-slideshow-controls',
      lastNext : 'last-next',
      lastPrev : 'last-previous'
    },
    animationOptions : {
      easing : 'easeOutQuint',
      duration : 1200,
      queue: false
    }
  },

  // The only events necessary are clicking the next and previous control arrows.
  events : {
    'click .previous' : 'animateIn',
    'click .next' : 'animateOut'
  },

  // When the view is initialized the controls are added to the dom, the number of slides is gathered,
  // and the z-index of the slides is reversed to keep the first image in the markup on top.
  initialize : function( options )
  {
    this.options = _.extend( {}, this.settings, options )
    _.bindAll( this, 'animateIn', 'animateOut', 'addControls', 'zIndex' )
    this.controls = _.template( this.controls, { classname: this.options.controlclasses.base } )
    this.numberOfSlides = this.$el.find('.slide').length - 1
    this.organizeSlideshow()
    this.addControls()
  },

  // Set the z-index of each slide appropriately.
  organizeSlideshow : function()
  {
    // this.$( this.$('.slide').get().reverse() ).each( this.zIndex )
    _.each( this.$('.slide').get(), this.zIndex )
    // this.$( '.slide' ).each( this.zIndex )
  },

  // Add the previous and next controls to the slideshow.
  addControls : function()
  {
    this.$el.append( this.controls )
    this.$el.find( this.options.controlclass )
    this.$el.addClass( this.options.controlclasses.lastPrev )
  },

  // When the `previous` control is clicked, this will animate a slide out of view into view.
  // The `current` property is adjusted twice to keep it bound to the number of slides.
  animateIn : function(e)
  {
      this.direction = 'in'
      this.current = this.current < 0 ? -1 : this.current-1
      this.animation.textLeft = 0
      this.animation.imageLeft = 0
      this.animate()
      this.current = this.current < 0 ? 0 : this.current
      this.toggleClasses()
      return false;
  },

  // When the `next` control is clicked, this will animate a slide in view out of view.
  // The `current` property is adjusted after animation to keep it bounded to the number of slides.
  animateOut : function(e)
  {
      this.direction = 'out'
      this.animation.textLeft = '-200%'
      this.animation.imageLeft = '100%'
      this.animate()
      this.current = this.current === this.numberOfSlides ? this.numberOfSlides : this.current+1
      this.toggleClasses()
      return false;
  },

  // This function animates the slides based on the values set by `animateIn` or `animateOut`.
  animate : function()
  {
    if ( this.nextSlideExists() )
    {
      this.$( this.options.slideclass ).eq( this.current ).animate({left: this.animation.imageLeft }, this.options.animationOptions )
        .find('div').animate({left: this.animation.textLeft }, this.options.animationOptions )
    }
  },

  // Toggle a slideshow class that will indicate when there are no more slides in that direction.
  toggleClasses : function()
  {
    if ( this.current === 0 || this.current === this.numberOfSlides )
      return this.$el.addClass( this.direction === 'out' ? this.options.controlclasses.lastNext : this.options.controlclasses.lastPrev )

    return this.$el.removeClass( this.options.controlclasses.lastNext + ' ' + this.options.controlclasses.lastPrev )
  },

  // Check if the next slide exists. If it does animate. Otherwise, do not animate.
  nextSlideExists: function()
  {
    if ( this.current < 0 && this.direction === 'in' ||
         this.current === this.numberOfSlides && this.direction === 'out' )
           return false;


    return true;
  },

  // Set the z-index of the slide based on its index in the DOM.
  zIndex : function( slide )
  {
    // console.log( slide )
    var $this = $( slide )
    $this.css({ zIndex : -1 * $this.index() + this.numberOfSlides })
  }

})
