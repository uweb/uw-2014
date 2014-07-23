//     UW.js 0.1
//     uw.edu/marketing/web/
//     A UW JavaScript library that implements various web components to any site
//     Includes hard dependencies jQuery (v2.1.1), Backbone (1.1.2), and Underscore (1.6.0)

;(function () {
;/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */;// Baseline setup
// --------------

// Establish the root object `window`.
var root = this

// Create a safe reference to the UW object which will be used to establish the global UW object.
var UW = function(obj)
{
    if ( obj instanceof UW ) return obj

    if ( ! ( this instanceof UW )) return new UW(obj)

    this._wrapped = obj
};

// Establish the global UW object `window.UW`
root.UW = UW


// Current version
UW.VERSION = '0.1'
;// List out the classes that each component searches for
UW.elements = {

  accordion : '.uw-accordion',
  dropdowns : '#dawgdrops',
  radio     : ':radio',
  search    : '.uw-search',
  select    : '.uw-select',
  quicklinks : '.uw-quicklinks',
  slideshow : '.uw-slideshow',
  social    : '.uw-social',
  vimeo     : '.uw-vimeo'

}
// Initialize all components when the DOM is ready
UW.initialize = function( $ )
{
  UW.$body       = $('body');
  UW.accordion  = _.map( $( UW.elements.accordion ), function( element ) { return new UW.Accordion( { el : element }) } )
  UW.dropdowns  = _.map( $( UW.elements.dropdowns ),     function( element ) { return new UW.Dropdowns({ el : element }) } )
  UW.select     = _.map( $( UW.elements.select ),    function( element ) { return new UW.Select({ el : element }) } )
  UW.players    = new UW.PlayerCollection()
  UW.quicklinks = _.map( $( UW.elements.quicklinks ),    function( element ) { return new UW.QuickLinks( { el : element }) } )
  UW.radio      = _.map( $( UW.elements.radio ),     function( element ) { return new UW.Radio({ el : element }) } )
  UW.search     = _.map( $( UW.elements.search ),    function( element ) { return new UW.Search( { el : element, model : new UW.Search.DirectoryModel() }) } )
  UW.slideshows = _.map( $( UW.elements.slideshow ), function( element ) { return new UW.Slideshow( { el : element }) } )
  UW.social     = _.map( $( UW.elements.social ),    function( element ) { return new UW.Social({ el : element }) } )
  UW.vimeo      = _.map( $( UW.elements.vimeo ),     function( element ) { return new UW.Vimeo({ el : element }) } )
}

jQuery(document).ready( UW.initialize )


// Basic UW Components
// --------------
;// ### UW Search

// This function creates a UW Search
// For usage please refer to the [UW Web Components Search](http://uw.edu/brand/web/#search)

UW.Search = Backbone.View.extend({

  value : '',
  body : 'body',

  searchFeatures : {
    uw        : 'uw',
    site      : 'site',
    directory : 'directory'
  },

  searchbar : '<div class="uw-search-bar-container">'+
               '<div class="container">'+
                  '<div class="center-block uw-search-wrapper">'+
                    '<form class="uw-search" action="<%= Backbone.history.location.pathname %>">'+
                      '<input id="uw-search-bar" type="search" name="s" value="" autocomplete="off" />'+
                    '</form>'+
                    '<a href="#" value="" class="search" />'+

                    '<div class="labels">'+
                      '<label class="radio">'+
                        '<input type="radio" name="search" value="uw" data-toggle="radio">'+
                        'All the UW'+
                      '</label>'+

                    '<label class="radio">'+
                      '<input type="radio" name="search" value="site" data-toggle="radio">'+
                      'Current Site'+
                    '</label>'+

                    '<label class="radio">'+
                      '<input type="radio" name="search" value="directory" data-toggle="radio" checked>'+
                      'People Directory'+
                    '</label>'+


                '</div>'+

                '<div class="uw-results"></div>'+

                  '</div>'+
                '</div>'+
              '</div>',

  result :  '<div class="result">' +
              '<h4 class="commonname"><%= commonname %></h4>'+
              '<a href="#" title="<%= commonname %>" class="more">More</a>'+
              '<div class="information hidden">'+
                '<p class="pull-left"><% if ( title ) { %><span class="title"><%= title %></span><% } %>'+
                '<% if ( postaladdress ) { %><span class="postaladdress"><%= postaladdress %></span><% } %></p>'+
                '<% if ( mail ) { %><span class="mail"><a href="mailto:<%= mail %>" title="Email <%= commonname %>"><%= mail %></a></span><% } %>'+
                '<% if ( telephonenumber ) { %><span class="telephonenumber"><a href="tel:<%= telephonenumber %>"><%= telephonenumber %></a></span><% } %>'+
              '</div>'+
            '</div>',

  defaults :
  {
    limit : 2
  },

  events :
  {
    'keydown input'             : 'searchDirectory',
    'click .result .more'       : 'showPersonInformation',
    'click .result .commonname' : 'showPersonInformation',
    'click input:radio'         : 'toggleSearchFeature',
    'submit form'              : 'submitSearch'
  },

  initialize :function ( options )
  {
    _.bindAll( this, 'toggleSearchBar', 'searchDirectory', 'parse' )

    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )

    this.$searchbar = $( _.template( this.searchbar , this.settings ) )

    this.render()

    this.$results  = this.$( '.uw-results' )

    this.searchFeature = this.$el.find(':radio:checked').val()

    this.model.on( 'change:results', this.parse, this )
  },

  render : function()
  {
    $( this.body ).prepend( this.$searchbar )

    this.$toggle = this.$el;
    this.$toggle.bind( 'click', this.toggleSearchBar )

    this.setElement( this.$searchbar )
  },

  toggleSearchBar: function()
  {
    this.empty()
    this.$searchbar.toggleClass('open')
      .find('#uw-search-bar').focus()
    return false;
  },

  toggleSearchFeature : function( e )
  {
    this.empty()
    this.searchFeature = e.currentTarget.value
  },

  submitSearch : function()
  {
    return this.searchFeature !== this.searchFeatures.directory
  },

  searchDirectory : _.debounce( function( e ) {

    if ( this.value === e.target.value ) return
    if ( e.target.value.length < this.settings.limit ) return this.empty()
    if ( ! e.target.value.length ) return this.empty()

    this.value = e.target.value

    this.model.search( this.value )

  }, 200 ),

  empty : function()
  {
    this.$results.empty()
  },

  parse : function ( response )
  {
    var data = response.attributes.results
      , result   = this.result
      , $results = this.$results


    this.empty()

    _.each(data, function( person, index ) {
      if ( person.commonname )
      {
        var template = _.template( result, person )
        $results.append( template )
      }
    })

  },

  showPersonInformation : function( e )
  {
    this.$( e.currentTarget )
      .closest('.result')
        .toggleClass('open')
      .find('.information')
        .toggleClass( 'hidden' )
    return false;
  }


})

UW.Search.DirectoryModel = Backbone.Model.extend({

  settings : {
    action : 'directory',
    search : ''
  },

  url : '/cms/2014/wp-admin/admin-ajax.php',

  search : function ( value ) {
    this.settings.search = value
    this.fetch( { data : this.settings })
  },

  parse : function( response ) {
    if ( response )
        this.set( 'results', response )
  }

})
;UW.QuickLinks = Backbone.View.extend({

    links: [
        {text: 'Maps', url: 'http://uw.edu/maps', image: false},
        {text: 'Directories', url: 'http://uw.edu/directory', image: false},
        {text: 'Calendar', url: 'http://uw.edu/calendar', image: false},
        {text: 'Libraries', url: 'http://uw.edu/libraries', image: false},
        {text: 'MyUW', url: 'http://myuw.washington.edu', image: false},
        {text: 'UW Today', url: 'http://uw.edu/news', image: false},
       ],

    container: 'div#uw-container',

    //not working
    events: {
      //  'click li.uw-quicklinks': 'animate'
       'click': 'animate'
    },

    initialize: function () {
        this.make_drawer();
        this.add_links();
        // this.bind_click();
    },

    make_drawer: function () {
        this.$container = $(this.container);
        if (this.$container.length === 0) {
            var $adminbar = $('#wpadminbar');
            UW.$body.children().not('#wpadminbar').not('script').wrapAll('<div id="uw-container"></div>');
            this.$container = $(this.container);
        }
        this.$container.prepend("<nav id='quicklinks'><ul></ul></nav>");
        this.$drawer = $('nav#quicklinks');
        //create element (will be nav#quicklinks_drawer)
        //add element to right place.  Will be on the right, 50% off canvas, overflow of body hidden.  Container covering the other half
    },

    add_links: function () {
        this.$list = this.$drawer.find('ul');
        for (var i = 0; i < this.links.length; i++){
            this.$list.append('<li><a href="' + this.links[i].url + '">' + this.links[i].text + '</a></li>');
        }
        //add default links from javascript
        //unless we can get the new menu from ajax
    },

    // bind_click: function () {
    //     var quicklinks_view = this;
    //     $('li.uw-quicklinks a').click(function(e) {
    //         e.preventDefault();
    //         quicklinks_view.animate();
    //     });
    // },

    animate: function () {
        // console.log('animating');
        this.$container.toggleClass('open');
        this.$drawer.toggleClass('open');
        //if not open:
        //slide body/container over amount of width of nav#quicklinks_drawer and dim it
        //slide quicklinks over the proper location (fully revealed)
        //turn the + in the button 45deg
        //else:
        //undo all that
    }
});
;// ### UW Slideshow

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
    _.bindAll( this, 'animateIn', 'animateOut', 'addControls' )
    this.controls = _.template( this.controls, { classname: this.options.controlclasses.base } )
    this.numberOfSlides = this.$el.find('.slide').length - 1
    this.organizeSlideshow()
    this.addControls()
  },

  // Set the z-index of each slide appropriately.
  organizeSlideshow : function()
  {
    this.$('.slide').each( this.zIndex )
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
  zIndex : function()
  {
    var $this = $(this)
    $this.css({ zIndex : -1 * $this.index() })
  }

})
;// This function creates a UW Video Player
// For usage please refer to the [UW Web Components Video Player](http://uw.edu/brand/web/#player)

//       <div class="uw-youtube" data-uw-youtube="PL16B6B9F5C0C7C9E5" data-uw-player-type="playlist"> puts in playlist
//       <div class="uw-youtube" data-uw-youtube="z6kgvhG3AkI" data-uw-player-type="single"> puts in single video
//       Both have the same controls.  A unique id for each div is required


//this is the model for individual players, either video or playlist
UW.PlayerModel = Backbone.Model.extend({

    initialize: function() {
        this.make_view();
        //if we've got a playlist, we need to get all videos in it
        if (this.get('type') == 'playlist'){
            this.urlRoot = '//gdata.youtube.com/feeds/api/playlists/' + this.get('v_id') + '/?v=2&alt=json&callback=?';
            this.fetch();
        }
        //otherwise, we can assume its a single video and get the player ready right now
        else {
            this.view.prep_player();
        }
    },

    //There's only a json to fetch if its a playlist
    parse: function(response) {
        this.set('videos', response.feed.entry);
        this.view.prep_player();
    },

    //Creates the view, and sets the view's model attribute back here for easy reference
    make_view: function() {
        this.view = new UW.PlayerView({model: this});
    }

});


//this is the collection of player objects. It is acutally initialized first and creates its models based on info from the dom
UW.PlayerCollection = Backbone.Collection.extend({ 
    
    initialize: function() {
        //all of these divs become youtube players
        this.divs = $('.uw-youtube');
        this.make_models();
        //don't bother loading the api if we don't have any target div
        if (this.divs.length > 0) {
            this.load_api();
        }
    },

    make_models: function() {
        for (var i = 0, length = this.divs.length; i < length; i++) {
            //all divs need their own model, and through the model they get thier own view (key!)
            this.create_model(this.divs[i]);
        }
    },
        
    create_model: function(element) {                                                       
        var element_id = element.id, $element = $(element), v_id = $element.data('uw-youtube'), type = $element.data('uw-player-type');
        //instantiate the models here, so we only need to instantiate the collection in document.ready
        var player_model = new UW.PlayerModel({el_id: element_id, $element: $element, type: type, v_id: v_id});
        //make sure all models are accessible through the UW.player collection
        this.models.push(player_model);
    },

    load_api: function() {
        //we need to get the youtube api script
        $('head').append('<script src="//www.youtube.com/player_api" type="text/javascript"></script>');
        //this avoids scope issues
        var player_models = this.models;
        //attach the onYouTubeIframeAPIReady function to the window, making it global
        window.onYouTubeIframeAPIReady = function() {
            for (var i = 0, length = player_models.length; i < length; i++){
                var player_model = player_models[i];
                //attach the YT.player to the relevant view, each view gets one
                player_model.view.uwplayer = new YT.Player(player_model.get('el_id'), {
                    videoId: '',
                    events: {
                        //these events will call functions in the relevant view
                        'onReady': player_model.view.onReady,
                        'onStateChange': player_model.view.onStateChange
                    }
                });
            }
        };
    }

});     


//this is the player view.  There is a view instantiated for each model (and thus, each div)
UW.PlayerView = Backbone.View.extend({
    
    is_playlist: false,
    data_ready: false,
    player_ready: false,

    initialize: function () {
        //these functions have 'this' refer to YT.Player natively. We need it to refer to this view
        _.bindAll(this, 'onReady', 'onStateChange');
        if (this.model.get('type') == 'playlist') {
            this.is_playlist = true;
        }
        this.$element = this.model.get('$element');
        this.wrap_player();
    },

    //wrap the player in some useful divs for styling
    wrap_player: function () {
        this.$element.wrap('<div class="nc-video-player"><div class="tube-wrapper"></div></div>');
        this.$wrapper = this.$element.parents('.nc-video-player');
        if(this.is_playlist){
            this.add_playlist_section();
        }
    },

    //add some useful html for the playlist and store some of the DOM objects for later use
    add_playlist_section: function () {
        this.$wrapper.append('<div class="vidSmall"><div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="vidContent overview"></div></div></div>');
        this.$vidSmall = this.$wrapper.find('.vidSmall');
        this.$vidContent = this.$wrapper.find('.vidContent');
    },

    //choose what prep the player needs, called directly by view's model when data is ready
    prep_player: function () {
        if (this.is_playlist) {
            this.prep_playlist();
        }
        else {
            this.prep_video();
        }
        this.data_ready = true;
        this.check_all_ready();
    },

    //create placeholder objects for each item in the playlist and put them in a section below the player
    prep_playlist: function() {
        this.video_ids = [];
        var videos = this.model.get('videos'), length = videos.length;
		this.$vidContent.append('<ul/>');
		this.$vidContent.width(length * 135 + 'px');
		for (var index = 0; index < length; index++) {
            var video = videos[index];
			if (typeof video.app$control === 'undefined'){
				var img = video.media$group.media$thumbnail[0],
					video_id  =  video.media$group.yt$videoid.$t,
					title = video.title.$t,
					dur = video.media$group.yt$duration.seconds,
					minutes = Math.floor(dur/60),
					seconds = String(dur % 60).length === 1 ? '0'+dur%60 : dur % 60;

				var html = '<li><a id="'+ video_id +'" class="video" href="#">'+
					'<img class="playBtn" src="' + '"//cdn.washington.edu/wp-content/img/misc/play.png" />' +
						  '<img src="'+img.url.replace(/http?:\/\//, '//')+'" width="'+img.width+'" height="'+img.height+'" />'+
						  '<div class="text">'+
						  '<p class="title">'+title+'</p>'+
						  '<p class="duration">'+minutes+':'+seconds+'</p>'+
						  '</div>' +
						'</a></li>';
                //add video to the list and append the created html to the ul underneath the player
				this.video_ids.push(video_id);
				this.$vidContent.children('ul').append(html);
			}
            //log why a video is missing if we can't retrieve it.  Skip for IE that can't do console.log
			else if (($('#ie7').length === 0) && ($('#ie8').length === 0)) {
				console.log('Tried add a bad video to the player.  Error="' + video.app$control.yt$state.name + '", Reason="' + video.app$control.yt$state.reasonCode + '", Video=' + video.link[0].href);
			}
		}
		this.$vidSmall.find('.scrollbar').show();
        //prevent scope issues in below function
        var view = this;
        //play video when placeholder is clicked
        this.$vidSmall.delegate('a.video', 'click', function(e) {
            e.preventDefault();
            view.play(this.id, true);
            return false;
        });

    },

    //this prepares single videos.  It just extracts and saves the video id for later
    prep_video: function(){
        this.video_id = this.model.get('v_id');
    },

    //this runs when this.uwplayer is ready to go.  We note that this view's player is ready then go check if everything else is ready in the view
    onReady: function () {
        this.player_ready = true;
        this.check_all_ready();
    },

    //this function checks the state of data/player to prevent a race case. Both the data and the player must be ready to go.  Then we play the correct video
    check_all_ready: function() {
        if (this.data_ready && this.player_ready) {
            if (this.is_playlist) {
                this.play(this.video_ids[0]);
            }
            else {
                this.play(this.video_id);
            }
        }
    },

    //when the player changes state, this is run.  Currently stuff only happens if this is a playlist
    onStateChange: function (event) {
        if (this.is_playlist) { 
            //event.data is 0 when a video finishes playing.  Find out what video we just finished, then play the next one or loop back to the beginning of the playlist
            if (event.data === 0) {
                var video = this.$vidContent.find('.vid-active').attr('id');
                var index = this.video_ids.indexOf(video);
                if (index < this.video_ids.length - 1) {
                    this.play(this.video_ids[index + 1]);
                }
                else {
                    this.play(this.video_ids[0]);
                }
            }
        }
    },

    //play the video id passed.  If 'playnow' not passed, assume false.  If 'playnow' is true play the video, otherwise just cue it up
    play: function (id, playnow){
        playnow = playnow || false;
        if (playnow) {
            this.uwplayer.loadVideoById(id);
        }
        else {
            this.uwplayer.cueVideoById(id);
        }
        //If this is a playlist we must also manipulate the placeholder drawer.  Move the selected video's placeholder to the front if we can, otherwise move the listas far as we can without creating whitespace.  Then visually distinguish the selected video's placeholder
        if (this.is_playlist) {
            var $small = $('#' + id);
            var leftpos = $small.position().left, $viewport = this.$vidSmall.find('.viewport');
            this.$wrapper.find('a.vid-active').removeClass('vid-active');
            if (this.$vidContent.width() - leftpos < $viewport.width()){
                leftpos = this.$vidContent.width() - $viewport.width();
            }
            this.$vidContent.animate({left: -leftpos}, 500);
            //currently not used because tinyscrollbar isn't added: this.$vidSmall.tinyscrollbar_update(leftpos);
            $small.addClass('vid-active');
        }
    }
});
;// ### UW Vimeo

// This function creates the UW Vimeo player
// For usage please refer to the [UW Web Vimeo Player](http://uw.edu/brand/web/#vimeo)
// TODO: Get postMessage to work after iframe has loaded or find the correct API postMessage

//       Single: <div class="uw-vimeo" data-video=76979871 data-width=800 data-height=500></div>
//       Playlist :<div class="uw-vimeo" data-username=uwathleticsmarketing data-width=800 data-height=500></div>


UW.Vimeo = Backbone.View.extend({

  // The classname to look for when embedding Vimeo videos
  el : '.uw-vimeo',

  // List the events in the view.
  // Clicking a preview item will load that video
  events : {
    'click .preview' : 'loadVideo',
  },

  // The two templates necessary for the embed.
  // The first one is the standard Vimeo iFrame which is used for both single and playlist driven embeds.
  // The second one is the playlist and only shows if a playlist is being called.
  templates : {
    video    : '<iframe id="test" src="http://player.vimeo.com/video/<%= video %>/?<%= $.param( defaults ) %>"' +
               ' width=<%= width %> height=<%= height %>'+
               ' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',

    playlist : '' +
      '<div class="playlist">'+
        '<% _.each( videos, function( video ) { %>' +
          '<div class="preview" data-id=<%= video.id %>>' +
            '<img src="<%= video.thumbnail_small %>" height=75 width=100 title="<%= video.title %>"/>'+
          '</div>' +
        '<% }) %>' +
      '</div>'
  },

  // Default settings
  settings : {
    width  : 580,
    height : 350
  },

  // Default video attributes that cannot be overwritten
  defaults : {
    api      : 1,
    title    : 0,
    portrait : 0,
    byline   : 0,
    color    : '4B2E82'
  },

  // Initialize the video embeds.
  // Check to see if the `div.uw-vimeo` is requesting a single video or a playlist.
  // Note: Playlists are currently restricted to usernames.
  initialize : function( options )
  {
    _.bindAll( this, 'single', 'playlist', 'loadVideo' )

    this.options = _.extend( {}, this.settings , this.$el.data(), options )
    this.options.defaults = this.defaults

    this.$el.width( this.options.width )

    if ( this.options.video )
    {
      this.video = new UW.Vimeo.Video( this.options.video )
      this.video.on( 'sync', this.single )
    }

    if ( this.options.username )
    {
      this.videos = new UW.Vimeo.Playlist( { username : this.options.username } )
      this.videos.on( 'sync', this.playlist )
    }

  },

  // This loads the single video template and puts it into the DOM
  single : function()
  {
    this.player = _.template( this.templates.video, this.options )
    this.$el.html( this.player )
  },

  // This loads the playlist template and puts it into the DOM
  playlist : function()
  {

    _.extend( this.options, { video : this.videos.first().get('id') } )
    this.player = _.template( this.templates.video, this.options )

    this.videoList = _.template( this.templates.playlist, { videos : this.videos.toJSON() })

    this.$el.html( this.player )
    this.$el.append( this.videoList )

  },

  // This loads a new video when a preview image is clicked.
  loadVideo : function( e )
  {
    var iframe = this.$el.find('iframe')
      , params = _.last( iframe.attr('src').split('?') )
      , url = 'http://player.vimeo.com/video/' + $(e.currentTarget).data().id + '/?' +params

    iframe.attr('src', url)

    /* iframe.get(0).contentWindow.postMessage({method:'play'}, url) */

  }

})

// This is a model for a Vimeo video.
// It takes its attributes from the Vimeo JSON API.
UW.Vimeo.Video = Backbone.Model.extend({

  url : function()
  {
      return 'http://vimeo.com/api/v2/video/' + this.video +'.json'
  },

  parse : function( data )
  {
    return _.first(data)
  },

  initialize : function( video )
  {
    this.video = video
    this.fetch()
  }

})

// This is a collection for a Vimeo feed
// It takes its attributes from the Vimeo JSON API much like the `UW.Vimeo.Video` model does.
// Only videos with the property of `{ embed_privacy : anywhere }` will be shown.
UW.Vimeo.Playlist = Backbone.Collection.extend({

    url : function()
    {
      return 'http://vimeo.com/api/v2/'+ this.username +'/videos.json'
    },

    initialize : function( options )
    {
      this.username = options.username;
      this.fetch()
    },

    parse : function( data )
    {
      return _.where( data, { embed_privacy : 'anywhere' })
    }

})
;/* RADIO PUBLIC CLASS DEFINITION
 * ============================== */

UW.Radio = Backbone.View.extend({

  states :
  {
    checked  : 'checked',
    disabled : 'disabled'
  },

  events :
  {
    'click .radio' : 'toggle'
  },

  template: '<span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span>',

  initialize : function( options )
  {
    _.bindAll( this, 'toggle' )
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$el.before( this.template )
    this.setState()
    this.$el.closest('label').bind( 'click' , this.toggle )
  },

  setState: function()
  {

    var $parent = this.$el.closest( '.radio' )

    if ( this.$el.prop('disabled') ) $parent.addClass('disabled')
    if ( this.$el.prop('checked') ) $parent.addClass('checked')

  },

  toggle : function()
  {
    var this_ = this;
       var checked = this.$el.prop( this.states.checked )
       , $parent = this.$el.closest('.radio')
       , $parentWrap = this.$el.closest('form').length ? this.$el.closest('form') : this.$el.closest('body')
       , $elemGroup = $parentWrap.find(':radio[name="' + this.$el.attr('name') + '"]')
       , e = $.Event('toggle')

       $elemGroup.not(this.$el).each(function () {

         var $el = $(this)
           , $parent = $el.closest('.radio');

           if ( $el.prop( this_.states.disabled ) === false &&
                $parent.removeClass( this_.states.checked ) )  {
             $el.removeAttr( this_.states.checked ).trigger('change');
           }
       });

       if (this.$el.prop( this.states.disabled ) === false)
       {

        // if (checked === false) $parent.addClass( this.states.checked ) && $el.prop( this.states.checked , true);
          if (checked === false && $parent.addClass( this.states.checked ) ) this.$el.prop( this.states.checked , true);
          this.$el.trigger(e);

          if (checked !== this.$el.prop( this.states.checked )) {
            this.$el.trigger('change');
          }

       }
  },

  // setCheck : function( option )
  // {
  //    var ch = 'checked'
  //      , $el = this.$element
  //      , $parent = $el.closest('.radio')
  //      , checkAction = option == 'check' ? true : false
  //      , checked = $el.prop(ch)
  //      , $parentWrap = $el.closest('form').length ? $el.closest('form') : $el.closest('body')
  //      , $elemGroup = $parentWrap.find(':radio[name="' + $el.attr('name') + '"]')
  //      , e = $.Event(option)
  //
  //    $elemGroup.not($el).each(function () {
  //      var $el = $(this)
  //        , $parent = $(this).closest('.radio');
  //
  //        $parent.removeClass(ch)
  //        $el.removeAttr(ch);
  //
  //    });
  //
  //    $parent[checkAction ? 'addClass' : 'removeClass'](ch)
  //    if ( checkAction ) { $el.prop(ch, ch) } else { $el.removeAttr(ch); }
  //    $el.trigger(e);
  //
  //    if (checked !== $el.prop(ch)) {
  //      $el.trigger('change');
  //    }
  // },

})
;// ### UW Dropdowns

// This function creates the UW Dropdowns
// For usage please refer to the [UW Web Components Dropdowns](http://uw.edu/brand/web/#dropdowns)



UW.Dropdowns = Backbone.View.extend({

  index : {
    topmenu : 0,
    submenu : 0
  },

  elements : {
    toplevel : '.dawgdrops-item'
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
    'keydown .dawgdrops-item > a' : 'toggleSubMenu'
  },


  initialize : function(options)
  {
    _.bindAll( this, 'toggleSubMenu' )
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$topLevelNav = this.$el.find( this.elements.toplevel )
    this.render()
  },

  render : function()
  {
    _.map( this.$topLevelNav, this.positionSubmenu )
  },

  positionSubmenu : function( el )
  {
    var $el = $(el)
    $el.find('ul').css({ left : $el.position().left })
  },

  toggleSubMenu : function( e )
  {
    switch ( e.keyCode )
    {

      case this.keys.enter :
      case this.keys.down  :

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
        this.currentSubMenu.attr( 'aria-expanded', 'false' )
          .hide().parent().prev().children('a').first().focus()
        return false;

      case this.keys.right:
        this.currentSubMenu.attr( 'aria-expanded', 'false' )
          .hide().parent().next().children('a').first().focus()
        return false;

      case this.keys.spacebar:
      case this.keys.enter:
        window.location.href = $(e.currentTarget).attr('href')
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
;// ### UW Accordion

// This creates a UW Accordion
// For usage, refer to the [UW Web Components webpage](http://uw.edu/brand/web#accordion)

UW.Accordion = Backbone.View.extend({

    //what element becomes an accordion
    el: '.uw-accordion',

    events: {
        'click h3' : 'animate'
    },

    initialize: function () {
        _.bindAll(this, 'animate');
        this.$el.find('h3').addClass('inactive');
        this.$el.find('div').addClass('inactive');
    },

    animate: function (e) {
        var $target = $(e.target);
        if ($target.hasClass('inactive')) {
            this.$el.find('h3.active').removeClass('active').addClass('inactive');
            this.$el.find('div.active').animate({height: '0px'}, 500, function () {
                var $this = $(this);
                $this.removeClass('active').addClass('inactive');
                $this.removeAttr('style');
            });
            $target.removeClass('inactive').addClass('active');
            var $next = $target.next('div.inactive');
            $next.removeClass('inactive').addClass('active');
            var $next_height = $next.outerHeight(true);
            $next.removeClass('active');
            $next.animate({height: $next_height}, 500, function() {
                $next.addClass('active');
                $next.removeAttr('style');
            });
        }
        else {
            $target.removeClass('active').addClass('inactive');
            $target.next('div.active').animate({height: '0px'}, 500, function () {
                var $this = $(this);
                $this.removeClass('active').addClass('inactive');
                $this.removeAttr('style');
            });
        }
    },
});
;// ### UW Select

// This function creates the UW select menu
// For usage please refer to the [UW Web Components Select](http://uw.edu/brand/web/#select)
/* TODO: add accessiblity attributes to the html markup */

UW.Select = Backbone.View.extend({

  // The class to look for when rendering UW select menu.
  el : '.uw-select',

  // This property indicates the current index of the selected dropdown.
  current : 0,

  // Listing out the keys necessary for keyboard bindings.
  keyCodes :
  {
    enter: 13,
    spacebar : 32,
    tab : 9,
    up: 38,
    down: 40
  },

  // List the events within the view.
  // The two events needed trigger opening and closing the UW select menu
  events :
  {
    'keydown li'        : 'openMenuOnKeydown',
    'click li.active'   : 'open',
    'click li.inactive' : 'close',
  },

  // This is the template that replaces the standard select menu.
  // It will be placed after the select menu and mimics the values and
  // text for each option tag.
  template : '<div class="uw-select-mask">' +
              '<ul class="uw-select">' +
               '<% _.each( lis, function( title, value ) { %>' +
                 '<li data-value="<%= value %>"><a href="#"><%= title %></a></li>' +
               '<% }) %>'+
               '</ul>' +
               '<span class="uw-select-arrow"></span>' +
             '</div>',

  // Initialize the view, parse the standard select menu and render the UW select menu.
  initialize : function( options )
  {
    _.bindAll( this, 'open', 'close', 'addOpenClass', 'removeOpenClass' )
    this.options = _.extend( {}, this.settings, this.$el.data() , options )
    this.parseSelect()
    this.render()
  },

  // Open the UW select menu.
  open : function()
  {
    this.addOpenClass()
  },

  // Close the UW select menu.
  close : function( e )
  {
    this.clicked = true
    this.$target = $(e.currentTarget)
    this.current = this.$target.index()
    this.animate()
    this.toggleLIClasses()
    this.cloneSelectEvents()
  },

  // Animate the select menu to the proper menu item.
  animate : function()
  {
    this.$el.animate( { marginTop : this.current * - this.$target.outerHeight()}, { queue: false, complete: this.removeOpenClass } )
  },

  // Whenever an item is clicked on the UW select menu make sure the standard
  // select menu is set to that value as well.
  cloneSelectEvents : function()
  {
    this.$select.val( this.$el.find('li').eq( this.current ).data().value )
  },

  // Render the UW select menu HTML and then set the view's element to the newly
  // rendered HTML.
  // This also keeps a cached version of the select menu with the `this.$select` property.
  render : function()
  {
    this.html = _.template( this.template, { lis : this.LIs } )
    this.$el.hide().after( this.html )
    this.$select = this.$el
    this.setElement( this.$el.next().children('ul') )
    this.toggleLIClasses()
  },

  // Parse the standard select element and gather each option tags' values and text
  parseSelect : function()
  {
    var values  = _.map( this.$el.find('option'), this.getValue )
      , titles  = _.map( this.$el.find('option'), this.getText )
    this.current = this.$el.find(':selected').index()
    this.LIs    = _.object( values, titles )
  },

  toggleLIClasses : function()
  {
    this.$el.find('li').removeClass().addClass('inactive')
    this.$el.find('li').eq( this.current ).removeClass().addClass('active')
  },

  addOpenClass : function()
  {
      this.$el.addClass('open')
  },

  removeOpenClass : function( forced )
  {
    if ( this.clicked || forced )
    {
    this.$el.removeClass('open')
      this.clicked = false;
    }
  },

  getText  : function( option )
  {
    return $(option).text()
  },

  getValue : function( option )
  {
    return option.value
  },

  // This makes the dropdown accessible to keyboard bindings.
  // The behavior is the same as the default behavior for a standard select menu.
  openMenuOnKeydown : function ( e )
  {
    // If the user tabs while the menu is not open then continue the focus to
    // the next element on the page.
    if ( e.keyCode == this.keyCodes.tab && ! this.isOpen() )
      return true;

    // If the user clicks a certain set of keys then proceed with the necessary
    // actions.
    if ( _.contains( this.keyCodes, e.keyCode ) )
    {
      if ( ! this.isOpen() ) this.open()
      switch ( e.keyCode )
      {

        case this.keyCodes.down :
          this.down()
          break;

        case this.keyCodes.up :
          this.up()
          break;

        // The spacebar and enter keys need to open the the inital
        case this.keyCodes.enter:
        case this.keyCodes.spacebar :
          if ( this.current != this.$select.val() ) {
            this.removeOpenClass( true )
            this.toggleLIClasses()
            this.cloneSelectEvents()
          }
          break;

      }
      return false;
    }
  },

  // Moves the menu up one when the up arrow is pressed.
  up : function()
  {
    if ( this.atEdge( 'up' ) ) return
    this.current -= 1
    this.move()
  },

  // Moves the menu down one when the down arrow is pressed.
  down : function()
  {
    if ( this.atEdge( 'down' ) ) return
    this.current += 1
    this.move()
  },

  // Aniamtes the select menu when either arrow is pressed in the proper direction.
  move : function()
  {
    this.$target = this.$el.find('li').eq(this.current)
    this.$target.find('a').focus()
    this.animate()
  },

  // This function checks to see if the the first or last item in the list is highlighted.
  atEdge : function( direction )
  {
    return ( this.current === 0 && direction === 'up' ||
             this.current === this.$el.find('li').length - 1 && direction === 'down' )
  },

  // Check to see if the menu is open.
  isOpen : function()
  {
    return this.$el.hasClass('open')
  }

})
;// ### UW Social

// This function creates the UW social media buttons
// For usage please refer to the [UW Web Components Social](http://uw.edu/brand/web/#social)

UW.Social = Backbone.View.extend({

  // The classname of the elements that will become a set of social buttons
  el : '.uw-social',

  // The template that generates the social buttons. Only the chosen buttons are rendered.
  // See the [UW Web Components](http://uw.edu/brand/#social) for instructions on how to choose each button.
  template : '<ul>' +
              '<% if ( _.isString( facebook ) ) { %> <li><a class="uw-social-facebook" href="http://www.facebook.com/sharer.php?u=<%= url %>">Facebook</a></li> <% } %>' +
              '<% if ( _.isString( twitter ) ) { %> <li><a class="uw-social-twitter" href="http://twitter.com/?status=<%= url %>">Twitter</a></li> <% } %>' +
              '<% if ( _.isString( reddit ) ) { %> <li><a class="uw-social-reddit" href="http://reddit.com/submit?url=<%= url %>">Reddit</a></li> <% } %>' +
              '<% if ( _.isString( digg ) ) { %> <li><a class="uw-social-reddit" href="http://digg.com/submit?url=<%= url %>">Digg</a></li> <% } %>' +
              '<% if ( _.isString( stumbleupon ) ) { %> <li><a class="uw-social-reddit" href="http://www.stumbleupon.com/submit?url=<%= url %>">StumbleUpon</a></li> <% } %>' +
             '</ul>',

  // Default list of compatible buttons
  settings : {
    facebook    : false,
    twitter     : false,
    reddit      : false,
    digg        : false,
    stumbleupon : false,
    url         : document.URL
  },

  // Initialize and render the button view. The data attributes of `div.uw-social` will be parsed and used to determine which buttons to render.
  initialize : function( options )
  {
    this.options = _.extend( {}, this.settings, this.$el.data() , options )
    this.buttons = _.template( this.template, this.options )
    this.$el.html( this.buttons )
  },

})
;}).call(this)
