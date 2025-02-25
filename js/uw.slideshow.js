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
    '<a tabIndex="-1" href="#" class="<%= classname %> next"></a>' +
    '<a tabIndex="-1" href="#" class="<%= classname %> previous"></a>'
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
    'click .next' : 'animateOut',
    'click .slider-dots li' : 'dotsAnimate',
    'click .fullscreen' : 'goFullscreen',
    // 'keypress .uw-slideshow .last-previous' : 'keySlide',
    //'keypress .previous' : 'keySlideOut',
   
  },

  // When the view is initialized the controls are added to the dom, the number of slides is gathered,
  // and the z-index of the slides is reversed to keep the first image in the markup on top.
  
  initialize : function( options )
  {
    this.options = _.extend( {}, this.settings, options )
    _.bindAll( this, 'animateIn', 'animateOut', 'addControls', 'zIndex', 'moveDots', 'goFullscreen' )
    this.controls = _.template( this.controls )( { classname: this.options.controlclasses.base } )
    this.numberOfSlides = this.$el.find('.slide').length - 1
    this.photoSlider = this.$el.hasClass('photo-slider')
    this.organizeSlideshow()
    this.addControls()
    this.photoSlideshow()
    this.mobileSizing()
    this.focusControls(this)
  },

  // Set the z-index of each slide appropriately.
  organizeSlideshow : function()
  {
    // this.$( this.$('.slide').get().reverse() ).each( this.zIndex )
    _.each( this.$('.slide').get(), this.zIndex )
    // this.$( '.slide' ).each( this.zIndex )
  },


  // Mobile width and height

  mobileSizing : function() {

    // Check if it's a photo gallery 

    function checkWidth() {
        var   mobileContainer = $('.uw-slideshow'), 
                 mobileHeight = $(".uw-slideshow img:first").height() + 50,
              mobileDotMargin = mobileContainer.find('.slider-dots')  
                   windowsize = $(window).width()
  
       if (windowsize < 768) {
          mobileContainer.css('height', mobileHeight);
          mobileDotMargin.css('marginTop', mobileHeight - 40);
       } 


    }



    if ( this.photoSlider ) {
    
      // Run initially
      checkWidth()

      // Run on resize
      $(window).resize(checkWidth)

    }

  },

  // Make it into simple photos slideshow 

  photoSlideshow : function()
  {


    // Add if photo slider exists
    if ( this.photoSlider ) {
      
      $( "." + this.el.classList[2] ).append('<ul class="slider-dots slider-dots-' + this.el.classList[2] + '"></ul>', '<a tabIndex="-1" class="fullscreen" href="#">Fullscreen</a>') 

      // Add LIs to ul
      for (i = 0; i < this.numberOfSlides + 1; i++) { 
        $( ".slider-dots-" + this.el.classList[2] ).append('<li></li>');
      }
      
      // Add initial dot     
      $(".slider-dots-" + this.el.classList[2] + " li:nth-child(1)").addClass("select-dot")

    }


  },

  // Add fullscreen ability

  goFullscreen : function(e){

 //   var sliderWidth = this.$el.width(),
 //         offsetLeft = this.$el.offset().left,
 //       scaleNumber = ($(window).width()  - 300) / sliderWidth,
 //           scaleIf = scaleNumber > 1 ? scaleNumber : 1,
 //    negativeMargin = sliderWidth * scaleNumber / 2
//
 //   this.$el
 //     .css({
 //       '-webkit-transform' : 'scale(' + scaleIf + ')',
 //       '-moz-transform'    : 'scale(' + scaleIf + ')',
 //       '-ms-transform'     : 'scale(' + scaleIf + ')',
 //       '-o-transform'      : 'scale(' + scaleIf + ')',
 //       'transform'         : 'scale(' + scaleIf + ')',
 //       'margin-left'       :  -negativeMargin
 //     })


    $('body').toggleClass('activeFullscreen');

    event.preventDefault();

  },


  moveDots : function(){

      // Moves the dots around according to this.current

      $(".slider-dots-" + this.el.classList[2] + " li").removeClass('select-dot')
      $(".slider-dots-" + this.el.classList[2] + " li:nth-child(" + (this.current + 1) + ")").addClass("select-dot")


  },

  // Animate the dots

  dotsAnimate : function(e){

        // Store which dot has been click
        var slideNumber = $(".slider-dots-" + this.el.classList[2] + " li").index(e.target)

        this.moveDots()

        // If slide needs to go forward
        if ( slideNumber > this.current ) {
          for (i = this.current + 1; i <= slideNumber; i++) {
            this.animateOut()

          }    

        // If slide needs to go backward
        } else if ( slideNumber < this.current ) { 
          //Set currentSlide variable outside loop (otherwise it gets reset each time the slide changes) 
          var currentSlide = this.current - 1
          for (i = slideNumber; i <= currentSlide; i++) {
            this.animateIn()
          }    
        }

  },

  // Add the previous and next controls to the slideshow.
  addControls : function()
  {
    if(this.numberOfSlides > 0) { 
      this.$el.append( this.controls )
      this.$el.find( this.options.controlclass )
      this.$el.addClass( this.options.controlclasses.lastPrev )
    }
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
      this.moveDots()
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
      this.moveDots()
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

    this.$el.removeClass( this.options.controlclasses.lastNext + ' ' + this.options.controlclasses.lastPrev )

    if ( this.current === 0 || this.current === this.numberOfSlides )
      return this.$el.addClass( this.direction === 'out' ? this.options.controlclasses.lastNext : this.options.controlclasses.lastPrev )

    return
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
    var $this = this.$( slide )
    $this.css({ zIndex : -1 * $this.index() + this.numberOfSlides })
  },

  // set focus controls
  focusControls : function(el) {

      // get slides
      function getSlides(parent){
        var children = parent.context.activeElement.children;
        var kids = [];
        var child;
        for(var i = 0; i < children.length; i++ ) {
          child = children[i];
          if ( child.className.indexOf("slide") === 0 ){
            kids.push(child);
          }
        }
        return kids;
      }

      function getSlide(parent) {
        var slides = getSlides(parent);
        var slide;
        for(var j = 0; j < slides.length; j++) {
          slide = slides[j];
          if( slide.style.left != "100%" ) {
            return slide;
          }
        }
        return false;
      }

      function getUrl(slide) {
        return slide.children[0].href;
        
      }

      // focus controls
      function keyPress(e) {
        if ( e.keyCode == 9 ) {
          return true;
        }
        if( e.keyCode == 39 ) {
          el.animateOut(e);
          return false;
        }
        if( e.keyCode == 37 ){
          el.animateIn(e);
          return false;
        }
        if( e.keyCode == 13 ){
          var slide = getSlide($this);
          if (slide) {
            var url = getUrl(slide);
            window.location.href = url;
          }
        }
        
        return false;
      }

      var $this = $( '.uw-slideshow' );
      $this.keydown(keyPress);

  }
  
  

})
