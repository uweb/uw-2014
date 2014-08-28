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
 */;;(function (factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define(['jquery'], factory);
    }
    else if (typeof exports === 'object')
    {
        factory(require('jquery'));
    }
    else
    {
        factory(jQuery);
    }
}
(function ($)
{
    "use strict";

    var pluginName = "tinyscrollbar"
    ,   defaults   =
        {
            axis         : 'y'    // Vertical or horizontal scrollbar? ( x || y ).
        ,   wheel        : true   // Enable or disable the mousewheel;
        ,   wheelSpeed   : 40     // How many pixels must the mouswheel scroll at a time.
        ,   wheelLock    : true   // Lock default scrolling window when there is no more content.
        ,   scrollInvert : false  // Enable invert style scrolling
        ,   trackSize    : false  // Set the size of the scrollbar to auto or a fixed number.
        ,   thumbSize    : false  // Set the size of the thumb to auto or a fixed number
        }
    ;

    function Plugin($container, options)
    {
        this.options   = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name     = pluginName;

        var self        = this
        ,   $viewport   = $container.find(".viewport")
        ,   $overview   = $container.find(".overview")
        ,   $scrollbar  = $container.find(".scrollbar")
        ,   $track      = $scrollbar.find(".track")
        ,   $thumb      = $scrollbar.find(".thumb")

        ,   mousePosition  = 0

        ,   isHorizontal   = this.options.axis === 'x'
        ,   hasTouchEvents = ("ontouchstart" in document.documentElement)
        ,   wheelEvent     = ("onwheel" in document || document.documentMode >= 9) ? "wheel" :
                             (document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll")

        ,   sizeLabel = isHorizontal ? "width" : "height"
        ,   posiLabel = isHorizontal ? "left" : "top"
        ;

        this.contentPosition = 0;
        this.viewportSize    = 0;
        this.contentSize     = 0;
        this.contentRatio    = 0;
        this.trackSize       = 0;
        this.trackRatio      = 0;
        this.thumbSize       = 0;
        this.thumbPosition   = 0;

        function initialize()
        {
            self.update();
            setEvents();

            return self;
        }

        this.update = function(scrollTo)
        {
            var sizeLabelCap  = sizeLabel.charAt(0).toUpperCase() + sizeLabel.slice(1).toLowerCase();
            this.viewportSize = $viewport[0]['offset'+ sizeLabelCap];
            this.contentSize  = $overview[0]['scroll'+ sizeLabelCap];
            this.contentRatio = this.viewportSize / this.contentSize;
            this.trackSize    = this.options.trackSize || this.viewportSize;
            this.thumbSize    = Math.min(this.trackSize, Math.max(0, (this.options.thumbSize || (this.trackSize * this.contentRatio))));
            this.trackRatio   = this.options.thumbSize ? (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize) : (this.contentSize / this.trackSize);
            mousePosition     = $track.offset().top;

            $scrollbar.toggleClass("disable", this.contentRatio >= 1);
            switch (scrollTo)
            {
                case "bottom":
                    this.contentPosition = this.contentSize - this.viewportSize;
                    break;

                case "relative":
                    this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
                    break;

                default:
                    this.contentPosition = parseInt(scrollTo, 10) || 0;
            }

            setSize();

            return self;
        };

        function setSize()
        {
            $thumb.css(posiLabel, self.contentPosition / self.trackRatio);
            $overview.css(posiLabel, -self.contentPosition);
            $scrollbar.css(sizeLabel, self.trackSize);
            $track.css(sizeLabel, self.trackSize);
            $thumb.css(sizeLabel, self.thumbSize);
        }

        function setEvents()
        {
            if(hasTouchEvents)
            {
                $viewport[0].ontouchstart = function(event)
                {
                    if(1 === event.touches.length)
                    {
                        event.stopPropagation();

                        start(event.touches[0]);
                    }
                };
            }
            else
            {
                $thumb.bind("mousedown", start);
                $track.bind("mousedown", drag);
            }

            $(window).resize(function()
            {
                self.update("relative");
            });

            if(self.options.wheel && window.addEventListener)
            {
                $container[0].addEventListener(wheelEvent, wheel, false );
            }
            else if(self.options.wheel)
            {
                $container[0].onmousewheel = wheel;
            }
        }

        function start(event)
        {
            $("body").addClass("noSelect");

            mousePosition      = isHorizontal ? event.pageX : event.pageY;
            self.thumbPosition = parseInt($thumb.css(posiLabel), 10) || 0;

            if(hasTouchEvents)
            {
                document.ontouchmove = function(event)
                {
                    event.preventDefault();
                    drag(event.touches[0]);
                };
                document.ontouchend = end;
            }
            else
            {
                $(document).bind("mousemove", drag);
                $(document).bind("mouseup", end);
                $thumb.bind("mouseup", end);
            }
        }

        function wheel(event)
        {
            if(self.contentRatio < 1)
            {
                var evntObj         = event || window.event
                ,   deltaDir        = "delta" + self.options.axis.toUpperCase()
                ,   wheelSpeedDelta = -(evntObj[deltaDir] || evntObj.detail || (-1 / 3 * evntObj.wheelDelta)) / 40
                ;

                self.contentPosition -= wheelSpeedDelta * self.options.wheelSpeed;
                self.contentPosition = Math.min((self.contentSize - self.viewportSize), Math.max(0, self.contentPosition));

                $container.trigger("move");

                $thumb.css(posiLabel, self.contentPosition / self.trackRatio);
                $overview.css(posiLabel, -self.contentPosition);

                if(self.options.wheelLock || (self.contentPosition !== (self.contentSize - self.viewportSize) && self.contentPosition !== 0))
                {
                    evntObj = $.event.fix(evntObj);
                    evntObj.preventDefault();
                }
            }
        }

        function drag(event)
        {
            if(self.contentRatio < 1)
            {
                var mousePositionNew   = isHorizontal ? event.pageX : event.pageY
                ,   thumbPositionDelta = mousePositionNew - mousePosition
                ;

                if(self.options.scrollInvert && hasTouchEvents)
                {
                    thumbPositionDelta = mousePosition - mousePositionNew;
                }

                var thumbPositionNew = Math.min((self.trackSize - self.thumbSize), Math.max(0, self.thumbPosition + thumbPositionDelta));
                self.contentPosition = thumbPositionNew * self.trackRatio;

                $container.trigger("move");

                $thumb.css(posiLabel, thumbPositionNew);
                $overview.css(posiLabel, -self.contentPosition);
            }
        }

        function end()
        {
            $("body").removeClass("noSelect");
            $(document).unbind("mousemove", drag);
            $(document).unbind("mouseup", end);
            $thumb.unbind("mouseup", end);
            document.ontouchmove = document.ontouchend = null;
        }

        return initialize();
    }

    $.fn[pluginName] = function(options)
    {
        return this.each(function()
        {
            if(!$.data(this, "plugin_" + pluginName))
            {
                $.data(this, "plugin_" + pluginName, new Plugin($(this), options));
            }
        });
    };
}));
;/**
 * @fileoverview Main function src.
 */

// HTML5 Shiv. Must be in <head> to support older browsers.
document.createElement('video');
document.createElement('audio');
document.createElement('track');

/**
 * Doubles as the main function for users to create a player instance and also
 * the main library object.
 *
 * **ALIASES** videojs, _V_ (deprecated)
 *
 * The `vjs` function can be used to initialize or retrieve a player.
 *
 *     var myPlayer = vjs('my_video_id');
 *
 * @param  {String|Element} id      Video element or video element ID
 * @param  {Object=} options        Optional options object for config/settings
 * @param  {Function=} ready        Optional ready callback
 * @return {vjs.Player}             A player instance
 * @namespace
 */
var vjs = function(id, options, ready){
  var tag; // Element of ID

  // Allow for element or ID to be passed in
  // String ID
  if (typeof id === 'string') {

    // Adjust for jQuery ID syntax
    if (id.indexOf('#') === 0) {
      id = id.slice(1);
    }

    // If a player instance has already been created for this ID return it.
    if (vjs.players[id]) {
      return vjs.players[id];

    // Otherwise get element for ID
    } else {
      tag = vjs.el(id);
    }

  // ID is a media element
  } else {
    tag = id;
  }

  // Check for a useable element
  if (!tag || !tag.nodeName) { // re: nodeName, could be a box div also
    throw new TypeError('The element or ID supplied is not valid. (videojs)'); // Returns
  }

  // Element may have a player attr referring to an already created player instance.
  // If not, set up a new player and return the instance.
  return tag['player'] || new vjs.Player(tag, options, ready);
};

// Extended name, also available externally, window.videojs
var videojs = vjs;
window.videojs = window.vjs = vjs;

// CDN Version. Used to target right flash swf.
vjs.CDN_VERSION = '4.6';
vjs.ACCESS_PROTOCOL = ('https:' == document.location.protocol ? 'https://' : 'http://');

/**
 * Global Player instance options, surfaced from vjs.Player.prototype.options_
 * vjs.options = vjs.Player.prototype.options_
 * All options should use string keys so they avoid
 * renaming by closure compiler
 * @type {Object}
 */
vjs.options = {
  // Default order of fallback technology
  'techOrder': ['html5','flash'],
  // techOrder: ['flash','html5'],

  'html5': {},
  'flash': {},

  // Default of web browser is 300x150. Should rely on source width/height.
  'width': 300,
  'height': 150,
  // defaultVolume: 0.85,
  'defaultVolume': 0.00, // The freakin seaguls are driving me crazy!

  // default playback rates
  'playbackRates': [],
  // Add playback rate selection by adding rates
  // 'playbackRates': [0.5, 1, 1.5, 2],

  // Included control sets
  'children': {
    'mediaLoader': {},
    'posterImage': {},
    'textTrackDisplay': {},
    'loadingSpinner': {},
    'bigPlayButton': {},
    'controlBar': {},
    'errorDisplay': {}
  },

  // Default message to show when a video cannot be played.
  'notSupportedMessage': 'No compatible source was found for this video.'
};

// Set CDN Version of swf
// The added (+) blocks the replace from changing this 4.6 string
if (vjs.CDN_VERSION !== 'GENERATED'+'_CDN_VSN') {
  videojs.options['flash']['swf'] = vjs.ACCESS_PROTOCOL + 'vjs.zencdn.net/'+vjs.CDN_VERSION+'/video-js.swf';
}

/**
 * Global player list
 * @type {Object}
 */
vjs.players = {};

/*!
 * Custom Universal Module Definition (UMD)
 *
 * Video.js will never be a non-browser lib so we can simplify UMD a bunch and
 * still support requirejs and browserify. This also needs to be closure
 * compiler compatible, so string keys are used.
 */
if (typeof define === 'function' && define['amd']) {
  define([], function(){ return videojs; });

// checking that module is an object too because of umdjs/umd#35
} else if (typeof exports === 'object' && typeof module === 'object') {
  module['exports'] = videojs;
}
/**
 * Core Object/Class for objects that use inheritance + contstructors
 *
 * To create a class that can be subclassed itself, extend the CoreObject class.
 *
 *     var Animal = CoreObject.extend();
 *     var Horse = Animal.extend();
 *
 * The constructor can be defined through the init property of an object argument.
 *
 *     var Animal = CoreObject.extend({
 *       init: function(name, sound){
 *         this.name = name;
 *       }
 *     });
 *
 * Other methods and properties can be added the same way, or directly to the
 * prototype.
 *
 *    var Animal = CoreObject.extend({
 *       init: function(name){
 *         this.name = name;
 *       },
 *       getName: function(){
 *         return this.name;
 *       },
 *       sound: '...'
 *    });
 *
 *    Animal.prototype.makeSound = function(){
 *      alert(this.sound);
 *    };
 *
 * To create an instance of a class, use the create method.
 *
 *    var fluffy = Animal.create('Fluffy');
 *    fluffy.getName(); // -> Fluffy
 *
 * Methods and properties can be overridden in subclasses.
 *
 *     var Horse = Animal.extend({
 *       sound: 'Neighhhhh!'
 *     });
 *
 *     var horsey = Horse.create('Horsey');
 *     horsey.getName(); // -> Horsey
 *     horsey.makeSound(); // -> Alert: Neighhhhh!
 *
 * @class
 * @constructor
 */
vjs.CoreObject = vjs['CoreObject'] = function(){};
// Manually exporting vjs['CoreObject'] here for Closure Compiler
// because of the use of the extend/create class methods
// If we didn't do this, those functions would get flattend to something like
// `a = ...` and `this.prototype` would refer to the global object instead of
// CoreObject

/**
 * Create a new object that inherits from this Object
 *
 *     var Animal = CoreObject.extend();
 *     var Horse = Animal.extend();
 *
 * @param {Object} props Functions and properties to be applied to the
 *                       new object's prototype
 * @return {vjs.CoreObject} An object that inherits from CoreObject
 * @this {*}
 */
vjs.CoreObject.extend = function(props){
  var init, subObj;

  props = props || {};
  // Set up the constructor using the supplied init method
  // or using the init of the parent object
  // Make sure to check the unobfuscated version for external libs
  init = props['init'] || props.init || this.prototype['init'] || this.prototype.init || function(){};
  // In Resig's simple class inheritance (previously used) the constructor
  //  is a function that calls `this.init.apply(arguments)`
  // However that would prevent us from using `ParentObject.call(this);`
  //  in a Child constuctor because the `this` in `this.init`
  //  would still refer to the Child and cause an inifinite loop.
  // We would instead have to do
  //    `ParentObject.prototype.init.apply(this, argumnents);`
  //  Bleh. We're not creating a _super() function, so it's good to keep
  //  the parent constructor reference simple.
  subObj = function(){
    init.apply(this, arguments);
  };

  // Inherit from this object's prototype
  subObj.prototype = vjs.obj.create(this.prototype);
  // Reset the constructor property for subObj otherwise
  // instances of subObj would have the constructor of the parent Object
  subObj.prototype.constructor = subObj;

  // Make the class extendable
  subObj.extend = vjs.CoreObject.extend;
  // Make a function for creating instances
  subObj.create = vjs.CoreObject.create;

  // Extend subObj's prototype with functions and other properties from props
  for (var name in props) {
    if (props.hasOwnProperty(name)) {
      subObj.prototype[name] = props[name];
    }
  }

  return subObj;
};

/**
 * Create a new instace of this Object class
 *
 *     var myAnimal = Animal.create();
 *
 * @return {vjs.CoreObject} An instance of a CoreObject subclass
 * @this {*}
 */
vjs.CoreObject.create = function(){
  // Create a new object that inherits from this object's prototype
  var inst = vjs.obj.create(this.prototype);

  // Apply this constructor function to the new object
  this.apply(inst, arguments);

  // Return the new object
  return inst;
};
/**
 * @fileoverview Event System (John Resig - Secrets of a JS Ninja http://jsninja.com/)
 * (Original book version wasn't completely usable, so fixed some things and made Closure Compiler compatible)
 * This should work very similarly to jQuery's events, however it's based off the book version which isn't as
 * robust as jquery's, so there's probably some differences.
 */

/**
 * Add an event listener to element
 * It stores the handler function in a separate cache object
 * and adds a generic handler to the element's event,
 * along with a unique id (guid) to the element.
 * @param  {Element|Object}   elem Element or object to bind listeners to
 * @param  {String}   type Type of event to bind to.
 * @param  {Function} fn   Event listener.
 * @private
 */
vjs.on = function(elem, type, fn){
  var data = vjs.getData(elem);

  // We need a place to store all our handler data
  if (!data.handlers) data.handlers = {};

  if (!data.handlers[type]) data.handlers[type] = [];

  if (!fn.guid) fn.guid = vjs.guid++;

  data.handlers[type].push(fn);

  if (!data.dispatcher) {
    data.disabled = false;

    data.dispatcher = function (event){

      if (data.disabled) return;
      event = vjs.fixEvent(event);

      var handlers = data.handlers[event.type];

      if (handlers) {
        // Copy handlers so if handlers are added/removed during the process it doesn't throw everything off.
        var handlersCopy = handlers.slice(0);

        for (var m = 0, n = handlersCopy.length; m < n; m++) {
          if (event.isImmediatePropagationStopped()) {
            break;
          } else {
            handlersCopy[m].call(elem, event);
          }
        }
      }
    };
  }

  if (data.handlers[type].length == 1) {
    if (document.addEventListener) {
      elem.addEventListener(type, data.dispatcher, false);
    } else if (document.attachEvent) {
      elem.attachEvent('on' + type, data.dispatcher);
    }
  }
};

/**
 * Removes event listeners from an element
 * @param  {Element|Object}   elem Object to remove listeners from
 * @param  {String=}   type Type of listener to remove. Don't include to remove all events from element.
 * @param  {Function} fn   Specific listener to remove. Don't incldue to remove listeners for an event type.
 * @private
 */
vjs.off = function(elem, type, fn) {
  // Don't want to add a cache object through getData if not needed
  if (!vjs.hasData(elem)) return;

  var data = vjs.getData(elem);

  // If no events exist, nothing to unbind
  if (!data.handlers) { return; }

  // Utility function
  var removeType = function(t){
     data.handlers[t] = [];
     vjs.cleanUpEvents(elem,t);
  };

  // Are we removing all bound events?
  if (!type) {
    for (var t in data.handlers) removeType(t);
    return;
  }

  var handlers = data.handlers[type];

  // If no handlers exist, nothing to unbind
  if (!handlers) return;

  // If no listener was provided, remove all listeners for type
  if (!fn) {
    removeType(type);
    return;
  }

  // We're only removing a single handler
  if (fn.guid) {
    for (var n = 0; n < handlers.length; n++) {
      if (handlers[n].guid === fn.guid) {
        handlers.splice(n--, 1);
      }
    }
  }

  vjs.cleanUpEvents(elem, type);
};

/**
 * Clean up the listener cache and dispatchers
 * @param  {Element|Object} elem Element to clean up
 * @param  {String} type Type of event to clean up
 * @private
 */
vjs.cleanUpEvents = function(elem, type) {
  var data = vjs.getData(elem);

  // Remove the events of a particular type if there are none left
  if (data.handlers[type].length === 0) {
    delete data.handlers[type];
    // data.handlers[type] = null;
    // Setting to null was causing an error with data.handlers

    // Remove the meta-handler from the element
    if (document.removeEventListener) {
      elem.removeEventListener(type, data.dispatcher, false);
    } else if (document.detachEvent) {
      elem.detachEvent('on' + type, data.dispatcher);
    }
  }

  // Remove the events object if there are no types left
  if (vjs.isEmpty(data.handlers)) {
    delete data.handlers;
    delete data.dispatcher;
    delete data.disabled;

    // data.handlers = null;
    // data.dispatcher = null;
    // data.disabled = null;
  }

  // Finally remove the expando if there is no data left
  if (vjs.isEmpty(data)) {
    vjs.removeData(elem);
  }
};

/**
 * Fix a native event to have standard property values
 * @param  {Object} event Event object to fix
 * @return {Object}
 * @private
 */
vjs.fixEvent = function(event) {

  function returnTrue() { return true; }
  function returnFalse() { return false; }

  // Test if fixing up is needed
  // Used to check if !event.stopPropagation instead of isPropagationStopped
  // But native events return true for stopPropagation, but don't have
  // other expected methods like isPropagationStopped. Seems to be a problem
  // with the Javascript Ninja code. So we're just overriding all events now.
  if (!event || !event.isPropagationStopped) {
    var old = event || window.event;

    event = {};
    // Clone the old object so that we can modify the values event = {};
    // IE8 Doesn't like when you mess with native event properties
    // Firefox returns false for event.hasOwnProperty('type') and other props
    //  which makes copying more difficult.
    // TODO: Probably best to create a whitelist of event props
    for (var key in old) {
      // Safari 6.0.3 warns you if you try to copy deprecated layerX/Y
      // Chrome warns you if you try to copy deprecated keyboardEvent.keyLocation
      if (key !== 'layerX' && key !== 'layerY' && key !== 'keyboardEvent.keyLocation') {
        // Chrome 32+ warns if you try to copy deprecated returnValue, but
        // we still want to if preventDefault isn't supported (IE8).
        if (!(key == 'returnValue' && old.preventDefault)) {
          event[key] = old[key];
        }
      }
    }

    // The event occurred on this element
    if (!event.target) {
      event.target = event.srcElement || document;
    }

    // Handle which other element the event is related to
    event.relatedTarget = event.fromElement === event.target ?
      event.toElement :
      event.fromElement;

    // Stop the default browser action
    event.preventDefault = function () {
      if (old.preventDefault) {
        old.preventDefault();
      }
      event.returnValue = false;
      event.isDefaultPrevented = returnTrue;
      event.defaultPrevented = true;
    };

    event.isDefaultPrevented = returnFalse;
    event.defaultPrevented = false;

    // Stop the event from bubbling
    event.stopPropagation = function () {
      if (old.stopPropagation) {
        old.stopPropagation();
      }
      event.cancelBubble = true;
      event.isPropagationStopped = returnTrue;
    };

    event.isPropagationStopped = returnFalse;

    // Stop the event from bubbling and executing other handlers
    event.stopImmediatePropagation = function () {
      if (old.stopImmediatePropagation) {
        old.stopImmediatePropagation();
      }
      event.isImmediatePropagationStopped = returnTrue;
      event.stopPropagation();
    };

    event.isImmediatePropagationStopped = returnFalse;

    // Handle mouse position
    if (event.clientX != null) {
      var doc = document.documentElement, body = document.body;

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // Handle key presses
    event.which = event.charCode || event.keyCode;

    // Fix button for mouse clicks:
    // 0 == left; 1 == middle; 2 == right
    if (event.button != null) {
      event.button = (event.button & 1 ? 0 :
        (event.button & 4 ? 1 :
          (event.button & 2 ? 2 : 0)));
    }
  }

  // Returns fixed-up instance
  return event;
};

/**
 * Trigger an event for an element
 * @param  {Element|Object} elem  Element to trigger an event on
 * @param  {String} event Type of event to trigger
 * @private
 */
vjs.trigger = function(elem, event) {
  // Fetches element data and a reference to the parent (for bubbling).
  // Don't want to add a data object to cache for every parent,
  // so checking hasData first.
  var elemData = (vjs.hasData(elem)) ? vjs.getData(elem) : {};
  var parent = elem.parentNode || elem.ownerDocument;
      // type = event.type || event,
      // handler;

  // If an event name was passed as a string, creates an event out of it
  if (typeof event === 'string') {
    event = { type:event, target:elem };
  }
  // Normalizes the event properties.
  event = vjs.fixEvent(event);

  // If the passed element has a dispatcher, executes the established handlers.
  if (elemData.dispatcher) {
    elemData.dispatcher.call(elem, event);
  }

  // Unless explicitly stopped or the event does not bubble (e.g. media events)
    // recursively calls this function to bubble the event up the DOM.
    if (parent && !event.isPropagationStopped() && event.bubbles !== false) {
    vjs.trigger(parent, event);

  // If at the top of the DOM, triggers the default action unless disabled.
  } else if (!parent && !event.defaultPrevented) {
    var targetData = vjs.getData(event.target);

    // Checks if the target has a default action for this event.
    if (event.target[event.type]) {
      // Temporarily disables event dispatching on the target as we have already executed the handler.
      targetData.disabled = true;
      // Executes the default action.
      if (typeof event.target[event.type] === 'function') {
        event.target[event.type]();
      }
      // Re-enables event dispatching.
      targetData.disabled = false;
    }
  }

  // Inform the triggerer if the default was prevented by returning false
  return !event.defaultPrevented;
  /* Original version of js ninja events wasn't complete.
   * We've since updated to the latest version, but keeping this around
   * for now just in case.
   */
  // // Added in attion to book. Book code was broke.
  // event = typeof event === 'object' ?
  //   event[vjs.expando] ?
  //     event :
  //     new vjs.Event(type, event) :
  //   new vjs.Event(type);

  // event.type = type;
  // if (handler) {
  //   handler.call(elem, event);
  // }

  // // Clean up the event in case it is being reused
  // event.result = undefined;
  // event.target = elem;
};

/**
 * Trigger a listener only once for an event
 * @param  {Element|Object}   elem Element or object to
 * @param  {String}   type
 * @param  {Function} fn
 * @private
 */
vjs.one = function(elem, type, fn) {
  var func = function(){
    vjs.off(elem, type, func);
    fn.apply(this, arguments);
  };
  func.guid = fn.guid = fn.guid || vjs.guid++;
  vjs.on(elem, type, func);
};
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Creates an element and applies properties.
 * @param  {String=} tagName    Name of tag to be created.
 * @param  {Object=} properties Element properties to be applied.
 * @return {Element}
 * @private
 */
vjs.createEl = function(tagName, properties){
  var el, propName;

  el = document.createElement(tagName || 'div');

  for (propName in properties){
    if (hasOwnProp.call(properties, propName)) {
      //el[propName] = properties[propName];
      // Not remembering why we were checking for dash
      // but using setAttribute means you have to use getAttribute

      // The check for dash checks for the aria-* attributes, like aria-label, aria-valuemin.
      // The additional check for "role" is because the default method for adding attributes does not
      // add the attribute "role". My guess is because it's not a valid attribute in some namespaces, although
      // browsers handle the attribute just fine. The W3C allows for aria-* attributes to be used in pre-HTML5 docs.
      // http://www.w3.org/TR/wai-aria-primer/#ariahtml. Using setAttribute gets around this problem.

       if (propName.indexOf('aria-') !== -1 || propName=='role') {
         el.setAttribute(propName, properties[propName]);
       } else {
         el[propName] = properties[propName];
       }
    }
  }
  return el;
};

/**
 * Uppercase the first letter of a string
 * @param  {String} string String to be uppercased
 * @return {String}
 * @private
 */
vjs.capitalize = function(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Object functions container
 * @type {Object}
 * @private
 */
vjs.obj = {};

/**
 * Object.create shim for prototypal inheritance
 *
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
 *
 * @function
 * @param  {Object}   obj Object to use as prototype
 * @private
 */
vjs.obj.create = Object.create || function(obj){
  //Create a new function called 'F' which is just an empty object.
  function F() {}

  //the prototype of the 'F' function should point to the
  //parameter of the anonymous function.
  F.prototype = obj;

  //create a new constructor function based off of the 'F' function.
  return new F();
};

/**
 * Loop through each property in an object and call a function
 * whose arguments are (key,value)
 * @param  {Object}   obj Object of properties
 * @param  {Function} fn  Function to be called on each property.
 * @this {*}
 * @private
 */
vjs.obj.each = function(obj, fn, context){
  for (var key in obj) {
    if (hasOwnProp.call(obj, key)) {
      fn.call(context || this, key, obj[key]);
    }
  }
};

/**
 * Merge two objects together and return the original.
 * @param  {Object} obj1
 * @param  {Object} obj2
 * @return {Object}
 * @private
 */
vjs.obj.merge = function(obj1, obj2){
  if (!obj2) { return obj1; }
  for (var key in obj2){
    if (hasOwnProp.call(obj2, key)) {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
};

/**
 * Merge two objects, and merge any properties that are objects
 * instead of just overwriting one. Uses to merge options hashes
 * where deeper default settings are important.
 * @param  {Object} obj1 Object to override
 * @param  {Object} obj2 Overriding object
 * @return {Object}      New object. Obj1 and Obj2 will be untouched.
 * @private
 */
vjs.obj.deepMerge = function(obj1, obj2){
  var key, val1, val2;

  // make a copy of obj1 so we're not ovewriting original values.
  // like prototype.options_ and all sub options objects
  obj1 = vjs.obj.copy(obj1);

  for (key in obj2){
    if (hasOwnProp.call(obj2, key)) {
      val1 = obj1[key];
      val2 = obj2[key];

      // Check if both properties are pure objects and do a deep merge if so
      if (vjs.obj.isPlain(val1) && vjs.obj.isPlain(val2)) {
        obj1[key] = vjs.obj.deepMerge(val1, val2);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
};

/**
 * Make a copy of the supplied object
 * @param  {Object} obj Object to copy
 * @return {Object}     Copy of object
 * @private
 */
vjs.obj.copy = function(obj){
  return vjs.obj.merge({}, obj);
};

/**
 * Check if an object is plain, and not a dom node or any object sub-instance
 * @param  {Object} obj Object to check
 * @return {Boolean}     True if plain, false otherwise
 * @private
 */
vjs.obj.isPlain = function(obj){
  return !!obj
    && typeof obj === 'object'
    && obj.toString() === '[object Object]'
    && obj.constructor === Object;
};

/**
 * Bind (a.k.a proxy or Context). A simple method for changing the context of a function
   It also stores a unique id on the function so it can be easily removed from events
 * @param  {*}   context The object to bind as scope
 * @param  {Function} fn      The function to be bound to a scope
 * @param  {Number=}   uid     An optional unique ID for the function to be set
 * @return {Function}
 * @private
 */
vjs.bind = function(context, fn, uid) {
  // Make sure the function has a unique ID
  if (!fn.guid) { fn.guid = vjs.guid++; }

  // Create the new function that changes the context
  var ret = function() {
    return fn.apply(context, arguments);
  };

  // Allow for the ability to individualize this function
  // Needed in the case where multiple objects might share the same prototype
  // IF both items add an event listener with the same function, then you try to remove just one
  // it will remove both because they both have the same guid.
  // when using this, you need to use the bind method when you remove the listener as well.
  // currently used in text tracks
  ret.guid = (uid) ? uid + '_' + fn.guid : fn.guid;

  return ret;
};

/**
 * Element Data Store. Allows for binding data to an element without putting it directly on the element.
 * Ex. Event listneres are stored here.
 * (also from jsninja.com, slightly modified and updated for closure compiler)
 * @type {Object}
 * @private
 */
vjs.cache = {};

/**
 * Unique ID for an element or function
 * @type {Number}
 * @private
 */
vjs.guid = 1;

/**
 * Unique attribute name to store an element's guid in
 * @type {String}
 * @constant
 * @private
 */
vjs.expando = 'vdata' + (new Date()).getTime();

/**
 * Returns the cache object where data for an element is stored
 * @param  {Element} el Element to store data for.
 * @return {Object}
 * @private
 */
vjs.getData = function(el){
  var id = el[vjs.expando];
  if (!id) {
    id = el[vjs.expando] = vjs.guid++;
    vjs.cache[id] = {};
  }
  return vjs.cache[id];
};

/**
 * Returns the cache object where data for an element is stored
 * @param  {Element} el Element to store data for.
 * @return {Object}
 * @private
 */
vjs.hasData = function(el){
  var id = el[vjs.expando];
  return !(!id || vjs.isEmpty(vjs.cache[id]));
};

/**
 * Delete data for the element from the cache and the guid attr from getElementById
 * @param  {Element} el Remove data for an element
 * @private
 */
vjs.removeData = function(el){
  var id = el[vjs.expando];
  if (!id) { return; }
  // Remove all stored data
  // Changed to = null
  // http://coding.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/
  // vjs.cache[id] = null;
  delete vjs.cache[id];

  // Remove the expando property from the DOM node
  try {
    delete el[vjs.expando];
  } catch(e) {
    if (el.removeAttribute) {
      el.removeAttribute(vjs.expando);
    } else {
      // IE doesn't appear to support removeAttribute on the document element
      el[vjs.expando] = null;
    }
  }
};

/**
 * Check if an object is empty
 * @param  {Object}  obj The object to check for emptiness
 * @return {Boolean}
 * @private
 */
vjs.isEmpty = function(obj) {
  for (var prop in obj) {
    // Inlude null properties as empty.
    if (obj[prop] !== null) {
      return false;
    }
  }
  return true;
};

/**
 * Add a CSS class name to an element
 * @param {Element} element    Element to add class name to
 * @param {String} classToAdd Classname to add
 * @private
 */
vjs.addClass = function(element, classToAdd){
  if ((' '+element.className+' ').indexOf(' '+classToAdd+' ') == -1) {
    element.className = element.className === '' ? classToAdd : element.className + ' ' + classToAdd;
  }
};

/**
 * Remove a CSS class name from an element
 * @param {Element} element    Element to remove from class name
 * @param {String} classToAdd Classname to remove
 * @private
 */
vjs.removeClass = function(element, classToRemove){
  var classNames, i;

  if (element.className.indexOf(classToRemove) == -1) { return; }

  classNames = element.className.split(' ');

  // no arr.indexOf in ie8, and we don't want to add a big shim
  for (i = classNames.length - 1; i >= 0; i--) {
    if (classNames[i] === classToRemove) {
      classNames.splice(i,1);
    }
  }

  element.className = classNames.join(' ');
};

/**
 * Element for testing browser HTML5 video capabilities
 * @type {Element}
 * @constant
 * @private
 */
vjs.TEST_VID = vjs.createEl('video');

/**
 * Useragent for browser testing.
 * @type {String}
 * @constant
 * @private
 */
vjs.USER_AGENT = navigator.userAgent;

/**
 * Device is an iPhone
 * @type {Boolean}
 * @constant
 * @private
 */
vjs.IS_IPHONE = (/iPhone/i).test(vjs.USER_AGENT);
vjs.IS_IPAD = (/iPad/i).test(vjs.USER_AGENT);
vjs.IS_IPOD = (/iPod/i).test(vjs.USER_AGENT);
vjs.IS_IOS = vjs.IS_IPHONE || vjs.IS_IPAD || vjs.IS_IPOD;

vjs.IOS_VERSION = (function(){
  var match = vjs.USER_AGENT.match(/OS (\d+)_/i);
  if (match && match[1]) { return match[1]; }
})();

vjs.IS_ANDROID = (/Android/i).test(vjs.USER_AGENT);
vjs.ANDROID_VERSION = (function() {
  // This matches Android Major.Minor.Patch versions
  // ANDROID_VERSION is Major.Minor as a Number, if Minor isn't available, then only Major is returned
  var match = vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
    major,
    minor;

  if (!match) {
    return null;
  }

  major = match[1] && parseFloat(match[1]);
  minor = match[2] && parseFloat(match[2]);

  if (major && minor) {
    return parseFloat(match[1] + '.' + match[2]);
  } else if (major) {
    return major;
  } else {
    return null;
  }
})();
// Old Android is defined as Version older than 2.3, and requiring a webkit version of the android browser
vjs.IS_OLD_ANDROID = vjs.IS_ANDROID && (/webkit/i).test(vjs.USER_AGENT) && vjs.ANDROID_VERSION < 2.3;

vjs.IS_FIREFOX = (/Firefox/i).test(vjs.USER_AGENT);
vjs.IS_CHROME = (/Chrome/i).test(vjs.USER_AGENT);

vjs.TOUCH_ENABLED = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);

/**
 * Get an element's attribute values, as defined on the HTML tag
 * Attributs are not the same as properties. They're defined on the tag
 * or with setAttribute (which shouldn't be used with HTML)
 * This will return true or false for boolean attributes.
 * @param  {Element} tag Element from which to get tag attributes
 * @return {Object}
 * @private
 */
vjs.getAttributeValues = function(tag){
  var obj, knownBooleans, attrs, attrName, attrVal;

  obj = {};

  // known boolean attributes
  // we can check for matching boolean properties, but older browsers
  // won't know about HTML5 boolean attributes that we still read from
  knownBooleans = ','+'autoplay,controls,loop,muted,default'+',';

  if (tag && tag.attributes && tag.attributes.length > 0) {
    attrs = tag.attributes;

    for (var i = attrs.length - 1; i >= 0; i--) {
      attrName = attrs[i].name;
      attrVal = attrs[i].value;

      // check for known booleans
      // the matching element property will return a value for typeof
      if (typeof tag[attrName] === 'boolean' || knownBooleans.indexOf(','+attrName+',') !== -1) {
        // the value of an included boolean attribute is typically an empty
        // string ('') which would equal false if we just check for a false value.
        // we also don't want support bad code like autoplay='false'
        attrVal = (attrVal !== null) ? true : false;
      }

      obj[attrName] = attrVal;
    }
  }

  return obj;
};

/**
 * Get the computed style value for an element
 * From http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
 * @param  {Element} el        Element to get style value for
 * @param  {String} strCssRule Style name
 * @return {String}            Style value
 * @private
 */
vjs.getComputedDimension = function(el, strCssRule){
  var strValue = '';
  if(document.defaultView && document.defaultView.getComputedStyle){
    strValue = document.defaultView.getComputedStyle(el, '').getPropertyValue(strCssRule);

  } else if(el.currentStyle){
    // IE8 Width/Height support
    strValue = el['client'+strCssRule.substr(0,1).toUpperCase() + strCssRule.substr(1)] + 'px';
  }
  return strValue;
};

/**
 * Insert an element as the first child node of another
 * @param  {Element} child   Element to insert
 * @param  {[type]} parent Element to insert child into
 * @private
 */
vjs.insertFirst = function(child, parent){
  if (parent.firstChild) {
    parent.insertBefore(child, parent.firstChild);
  } else {
    parent.appendChild(child);
  }
};

/**
 * Object to hold browser support information
 * @type {Object}
 * @private
 */
vjs.browser = {};

/**
 * Shorthand for document.getElementById()
 * Also allows for CSS (jQuery) ID syntax. But nothing other than IDs.
 * @param  {String} id  Element ID
 * @return {Element}    Element with supplied ID
 * @private
 */
vjs.el = function(id){
  if (id.indexOf('#') === 0) {
    id = id.slice(1);
  }

  return document.getElementById(id);
};

/**
 * Format seconds as a time string, H:MM:SS or M:SS
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide
 * @param  {Number} seconds Number of seconds to be turned into a string
 * @param  {Number} guide   Number (in seconds) to model the string after
 * @return {String}         Time formatted as H:MM:SS or M:SS
 * @private
 */
vjs.formatTime = function(seconds, guide) {
  // Default to using seconds as guide
  guide = guide || seconds;
  var s = Math.floor(seconds % 60),
      m = Math.floor(seconds / 60 % 60),
      h = Math.floor(seconds / 3600),
      gm = Math.floor(guide / 60 % 60),
      gh = Math.floor(guide / 3600);

  // handle invalid times
  if (isNaN(seconds) || seconds === Infinity) {
    // '-' is false for all relational operators (e.g. <, >=) so this setting
    // will add the minimum number of fields specified by the guide
    h = m = s = '-';
  }

  // Check if we need to show hours
  h = (h > 0 || gh > 0) ? h + ':' : '';

  // If hours are showing, we may need to add a leading zero.
  // Always show at least one digit of minutes.
  m = (((h || gm >= 10) && m < 10) ? '0' + m : m) + ':';

  // Check if leading zero is need for seconds
  s = (s < 10) ? '0' + s : s;

  return h + m + s;
};

// Attempt to block the ability to select text while dragging controls
vjs.blockTextSelection = function(){
  document.body.focus();
  document.onselectstart = function () { return false; };
};
// Turn off text selection blocking
vjs.unblockTextSelection = function(){ document.onselectstart = function () { return true; }; };

/**
 * Trim whitespace from the ends of a string.
 * @param  {String} string String to trim
 * @return {String}        Trimmed string
 * @private
 */
vjs.trim = function(str){
  return (str+'').replace(/^\s+|\s+$/g, '');
};

/**
 * Should round off a number to a decimal place
 * @param  {Number} num Number to round
 * @param  {Number} dec Number of decimal places to round to
 * @return {Number}     Rounded number
 * @private
 */
vjs.round = function(num, dec) {
  if (!dec) { dec = 0; }
  return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
};

/**
 * Should create a fake TimeRange object
 * Mimics an HTML5 time range instance, which has functions that
 * return the start and end times for a range
 * TimeRanges are returned by the buffered() method
 * @param  {Number} start Start time in seconds
 * @param  {Number} end   End time in seconds
 * @return {Object}       Fake TimeRange object
 * @private
 */
vjs.createTimeRange = function(start, end){
  return {
    length: 1,
    start: function() { return start; },
    end: function() { return end; }
  };
};

/**
 * Simple http request for retrieving external files (e.g. text tracks)
 * @param  {String}    url             URL of resource
 * @param  {Function} onSuccess       Success callback
 * @param  {Function=} onError         Error callback
 * @param  {Boolean=}   withCredentials Flag which allow credentials
 * @private
 */
vjs.get = function(url, onSuccess, onError, withCredentials){
  var fileUrl, request, urlInfo, winLoc, crossOrigin;

  onError = onError || function(){};

  if (typeof XMLHttpRequest === 'undefined') {
    // Shim XMLHttpRequest for older IEs
    window.XMLHttpRequest = function () {
      try { return new window.ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch (e) {}
      try { return new window.ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch (f) {}
      try { return new window.ActiveXObject('Msxml2.XMLHTTP'); } catch (g) {}
      throw new Error('This browser does not support XMLHttpRequest.');
    };
  }

  request = new XMLHttpRequest();

  urlInfo = vjs.parseUrl(url);
  winLoc = window.location;
  // check if url is for another domain/origin
  // ie8 doesn't know location.origin, so we won't rely on it here
  crossOrigin = (urlInfo.protocol + urlInfo.host) !== (winLoc.protocol + winLoc.host);

  // Use XDomainRequest for IE if XMLHTTPRequest2 isn't available
  // 'withCredentials' is only available in XMLHTTPRequest2
  // Also XDomainRequest has a lot of gotchas, so only use if cross domain
  if(crossOrigin && window.XDomainRequest && !('withCredentials' in request)) {
    request = new window.XDomainRequest();
    request.onload = function() {
      onSuccess(request.responseText);
    };
    request.onerror = onError;
    // these blank handlers need to be set to fix ie9 http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
    request.onprogress = function() {};
    request.ontimeout = onError;

  // XMLHTTPRequest
  } else {
    fileUrl = (urlInfo.protocol == 'file:' || winLoc.protocol == 'file:');

    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200 || fileUrl && request.status === 0) {
          onSuccess(request.responseText);
        } else {
          onError(request.responseText);
        }
      }
    };
  }

  // open the connection
  try {
    // Third arg is async, or ignored by XDomainRequest
    request.open('GET', url, true);
    // withCredentials only supported by XMLHttpRequest2
    if(withCredentials) {
      request.withCredentials = true;
    }
  } catch(e) {
    onError(e);
    return;
  }

  // send the request
  try {
    request.send();
  } catch(e) {
    onError(e);
  }
};

/**
 * Add to local storage (may removeable)
 * @private
 */
vjs.setLocalStorage = function(key, value){
  try {
    // IE was throwing errors referencing the var anywhere without this
    var localStorage = window.localStorage || false;
    if (!localStorage) { return; }
    localStorage[key] = value;
  } catch(e) {
    if (e.code == 22 || e.code == 1014) { // Webkit == 22 / Firefox == 1014
      vjs.log('LocalStorage Full (VideoJS)', e);
    } else {
      if (e.code == 18) {
        vjs.log('LocalStorage not allowed (VideoJS)', e);
      } else {
        vjs.log('LocalStorage Error (VideoJS)', e);
      }
    }
  }
};

/**
 * Get abosolute version of relative URL. Used to tell flash correct URL.
 * http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
 * @param  {String} url URL to make absolute
 * @return {String}     Absolute URL
 * @private
 */
vjs.getAbsoluteURL = function(url){

  // Check if absolute URL
  if (!url.match(/^https?:\/\//)) {
    // Convert to absolute URL. Flash hosted off-site needs an absolute URL.
    url = vjs.createEl('div', {
      innerHTML: '<a href="'+url+'">x</a>'
    }).firstChild.href;
  }

  return url;
};


/**
 * Resolve and parse the elements of a URL
 * @param  {String} url The url to parse
 * @return {Object}     An object of url details
 */
vjs.parseUrl = function(url) {
  var div, a, addToBody, props, details;

  props = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'];

  // add the url to an anchor and let the browser parse the URL
  a = vjs.createEl('a', { href: url });

  // IE8 (and 9?) Fix
  // ie8 doesn't parse the URL correctly until the anchor is actually
  // added to the body, and an innerHTML is needed to trigger the parsing
  addToBody = (a.host === '' && a.protocol !== 'file:');
  if (addToBody) {
    div = vjs.createEl('div');
    div.innerHTML = '<a href="'+url+'"></a>';
    a = div.firstChild;
    // prevent the div from affecting layout
    div.setAttribute('style', 'display:none; position:absolute;');
    document.body.appendChild(div);
  }

  // Copy the specific URL properties to a new object
  // This is also needed for IE8 because the anchor loses its
  // properties when it's removed from the dom
  details = {};
  for (var i = 0; i < props.length; i++) {
    details[props[i]] = a[props[i]];
  }

  if (addToBody) {
    document.body.removeChild(div);
  }

  return details;
};

// if there's no console then don't try to output messages
// they will still be stored in vjs.log.history
var _noop = function(){};
var _console = window['console'] || {
  'log': _noop,
  'warn': _noop,
  'error': _noop
};

/**
 * Log messags to the console and history based on the type of message
 *
 * @param  {String} type The type of message, or `null` for `log`
 * @param  {[type]} args The args to be passed to the log
 * @private
 */
function _logType(type, args){
  // convert args to an array to get array functions
  var argsArray = Array.prototype.slice.call(args);

  if (type) {
    // add the type to the front of the message
    argsArray.unshift(type.toUpperCase()+':');
  } else {
    // default to log with no prefix
    type = 'log';
  }

  // add to history
  vjs.log.history.push(argsArray);

  // add console prefix after adding to history
  argsArray.unshift('VIDEOJS:');

  // call appropriate log function
  if (_console[type].apply) {
    _console[type].apply(_console, argsArray);
  } else {
    // ie8 doesn't allow error.apply, but it will just join() the array anyway
    _console[type](argsArray.join(' '));
  }
}

/**
 * Log plain debug messages
 */
vjs.log = function(){
  _logType(null, arguments);
};

/**
 * Keep a history of log messages
 * @type {Array}
 */
vjs.log.history = [];

/**
 * Log error messages
 */
vjs.log.error = function(){
  _logType('error', arguments);
};

/**
 * Log warning messages
 */
vjs.log.warn = function(){
  _logType('warn', arguments);
};

// Offset Left
// getBoundingClientRect technique from John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
vjs.findPosition = function(el) {
  var box, docEl, body, clientLeft, scrollLeft, left, clientTop, scrollTop, top;

  if (el.getBoundingClientRect && el.parentNode) {
    box = el.getBoundingClientRect();
  }

  if (!box) {
    return {
      left: 0,
      top: 0
    };
  }

  docEl = document.documentElement;
  body = document.body;

  clientLeft = docEl.clientLeft || body.clientLeft || 0;
  scrollLeft = window.pageXOffset || body.scrollLeft;
  left = box.left + scrollLeft - clientLeft;

  clientTop = docEl.clientTop || body.clientTop || 0;
  scrollTop = window.pageYOffset || body.scrollTop;
  top = box.top + scrollTop - clientTop;

  // Android sometimes returns slightly off decimal values, so need to round
  return {
    left: vjs.round(left),
    top: vjs.round(top)
  };
};
/**
 * Utility functions namespace
 * @namespace
 * @type {Object}
 */
vjs.util = {};

/**
 * Merge two options objects, 
 * recursively merging any plain object properties as well.
 * Previously `deepMerge`
 * 
 * @param  {Object} obj1 Object to override values in
 * @param  {Object} obj2 Overriding object
 * @return {Object}      New object -- obj1 and obj2 will be untouched
 */
vjs.util.mergeOptions = function(obj1, obj2){
  var key, val1, val2;

  // make a copy of obj1 so we're not ovewriting original values.
  // like prototype.options_ and all sub options objects
  obj1 = vjs.obj.copy(obj1);

  for (key in obj2){
    if (obj2.hasOwnProperty(key)) {
      val1 = obj1[key];
      val2 = obj2[key];

      // Check if both properties are pure objects and do a deep merge if so
      if (vjs.obj.isPlain(val1) && vjs.obj.isPlain(val2)) {
        obj1[key] = vjs.util.mergeOptions(val1, val2);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
};


/**
 * @fileoverview Player Component - Base class for all UI objects
 *
 */

/**
 * Base UI Component class
 *
 * Components are embeddable UI objects that are represented by both a
 * javascript object and an element in the DOM. They can be children of other
 * components, and can have many children themselves.
 *
 *     // adding a button to the player
 *     var button = player.addChild('button');
 *     button.el(); // -> button element
 *
 *     <div class="video-js">
 *       <div class="vjs-button">Button</div>
 *     </div>
 *
 * Components are also event emitters.
 *
 *     button.on('click', function(){
 *       console.log('Button Clicked!');
 *     });
 *
 *     button.trigger('customevent');
 *
 * @param {Object} player  Main Player
 * @param {Object=} options
 * @class
 * @constructor
 * @extends vjs.CoreObject
 */
vjs.Component = vjs.CoreObject.extend({
  /**
   * the constructor function for the class
   *
   * @constructor
   */
  init: function(player, options, ready){
    this.player_ = player;

    // Make a copy of prototype.options_ to protect against overriding global defaults
    this.options_ = vjs.obj.copy(this.options_);

    // Updated options with supplied options
    options = this.options(options);

    // Get ID from options, element, or create using player ID and unique ID
    this.id_ = options['id'] || ((options['el'] && options['el']['id']) ? options['el']['id'] : player.id() + '_component_' + vjs.guid++ );

    this.name_ = options['name'] || null;

    // Create element if one wasn't provided in options
    this.el_ = options['el'] || this.createEl();

    this.children_ = [];
    this.childIndex_ = {};
    this.childNameIndex_ = {};

    // Add any child components in options
    this.initChildren();

    this.ready(ready);
    // Don't want to trigger ready here or it will before init is actually
    // finished for all children that run this constructor

    if (options.reportTouchActivity !== false) {
      this.enableTouchActivity();
    }
  }
});

/**
 * Dispose of the component and all child components
 */
vjs.Component.prototype.dispose = function(){
  this.trigger({ type: 'dispose', 'bubbles': false });

  // Dispose all children.
  if (this.children_) {
    for (var i = this.children_.length - 1; i >= 0; i--) {
      if (this.children_[i].dispose) {
        this.children_[i].dispose();
      }
    }
  }

  // Delete child references
  this.children_ = null;
  this.childIndex_ = null;
  this.childNameIndex_ = null;

  // Remove all event listeners.
  this.off();

  // Remove element from DOM
  if (this.el_.parentNode) {
    this.el_.parentNode.removeChild(this.el_);
  }

  vjs.removeData(this.el_);
  this.el_ = null;
};

/**
 * Reference to main player instance
 *
 * @type {vjs.Player}
 * @private
 */
vjs.Component.prototype.player_ = true;

/**
 * Return the component's player
 *
 * @return {vjs.Player}
 */
vjs.Component.prototype.player = function(){
  return this.player_;
};

/**
 * The component's options object
 *
 * @type {Object}
 * @private
 */
vjs.Component.prototype.options_;

/**
 * Deep merge of options objects
 *
 * Whenever a property is an object on both options objects
 * the two properties will be merged using vjs.obj.deepMerge.
 *
 * This is used for merging options for child components. We
 * want it to be easy to override individual options on a child
 * component without having to rewrite all the other default options.
 *
 *     Parent.prototype.options_ = {
 *       children: {
 *         'childOne': { 'foo': 'bar', 'asdf': 'fdsa' },
 *         'childTwo': {},
 *         'childThree': {}
 *       }
 *     }
 *     newOptions = {
 *       children: {
 *         'childOne': { 'foo': 'baz', 'abc': '123' }
 *         'childTwo': null,
 *         'childFour': {}
 *       }
 *     }
 *
 *     this.options(newOptions);
 *
 * RESULT
 *
 *     {
 *       children: {
 *         'childOne': { 'foo': 'baz', 'asdf': 'fdsa', 'abc': '123' },
 *         'childTwo': null, // Disabled. Won't be initialized.
 *         'childThree': {},
 *         'childFour': {}
 *       }
 *     }
 *
 * @param  {Object} obj Object of new option values
 * @return {Object}     A NEW object of this.options_ and obj merged
 */
vjs.Component.prototype.options = function(obj){
  if (obj === undefined) return this.options_;

  return this.options_ = vjs.util.mergeOptions(this.options_, obj);
};

/**
 * The DOM element for the component
 *
 * @type {Element}
 * @private
 */
vjs.Component.prototype.el_;

/**
 * Create the component's DOM element
 *
 * @param  {String=} tagName  Element's node type. e.g. 'div'
 * @param  {Object=} attributes An object of element attributes that should be set on the element
 * @return {Element}
 */
vjs.Component.prototype.createEl = function(tagName, attributes){
  return vjs.createEl(tagName, attributes);
};

/**
 * Get the component's DOM element
 *
 *     var domEl = myComponent.el();
 *
 * @return {Element}
 */
vjs.Component.prototype.el = function(){
  return this.el_;
};

/**
 * An optional element where, if defined, children will be inserted instead of
 * directly in `el_`
 *
 * @type {Element}
 * @private
 */
vjs.Component.prototype.contentEl_;

/**
 * Return the component's DOM element for embedding content.
 * Will either be el_ or a new element defined in createEl.
 *
 * @return {Element}
 */
vjs.Component.prototype.contentEl = function(){
  return this.contentEl_ || this.el_;
};

/**
 * The ID for the component
 *
 * @type {String}
 * @private
 */
vjs.Component.prototype.id_;

/**
 * Get the component's ID
 *
 *     var id = myComponent.id();
 *
 * @return {String}
 */
vjs.Component.prototype.id = function(){
  return this.id_;
};

/**
 * The name for the component. Often used to reference the component.
 *
 * @type {String}
 * @private
 */
vjs.Component.prototype.name_;

/**
 * Get the component's name. The name is often used to reference the component.
 *
 *     var name = myComponent.name();
 *
 * @return {String}
 */
vjs.Component.prototype.name = function(){
  return this.name_;
};

/**
 * Array of child components
 *
 * @type {Array}
 * @private
 */
vjs.Component.prototype.children_;

/**
 * Get an array of all child components
 *
 *     var kids = myComponent.children();
 *
 * @return {Array} The children
 */
vjs.Component.prototype.children = function(){
  return this.children_;
};

/**
 * Object of child components by ID
 *
 * @type {Object}
 * @private
 */
vjs.Component.prototype.childIndex_;

/**
 * Returns a child component with the provided ID
 *
 * @return {vjs.Component}
 */
vjs.Component.prototype.getChildById = function(id){
  return this.childIndex_[id];
};

/**
 * Object of child components by name
 *
 * @type {Object}
 * @private
 */
vjs.Component.prototype.childNameIndex_;

/**
 * Returns a child component with the provided name
 *
 * @return {vjs.Component}
 */
vjs.Component.prototype.getChild = function(name){
  return this.childNameIndex_[name];
};

/**
 * Adds a child component inside this component
 *
 *     myComponent.el();
 *     // -> <div class='my-component'></div>
 *     myComonent.children();
 *     // [empty array]
 *
 *     var myButton = myComponent.addChild('MyButton');
 *     // -> <div class='my-component'><div class="my-button">myButton<div></div>
 *     // -> myButton === myComonent.children()[0];
 *
 * Pass in options for child constructors and options for children of the child
 *
 *     var myButton = myComponent.addChild('MyButton', {
 *       text: 'Press Me',
 *       children: {
 *         buttonChildExample: {
 *           buttonChildOption: true
 *         }
 *       }
 *     });
 *
 * @param {String|vjs.Component} child The class name or instance of a child to add
 * @param {Object=} options Options, including options to be passed to children of the child.
 * @return {vjs.Component} The child component (created by this process if a string was used)
 * @suppress {accessControls|checkRegExp|checkTypes|checkVars|const|constantProperty|deprecated|duplicate|es5Strict|fileoverviewTags|globalThis|invalidCasts|missingProperties|nonStandardJsDocs|strictModuleDepCheck|undefinedNames|undefinedVars|unknownDefines|uselessCode|visibility}
 */
vjs.Component.prototype.addChild = function(child, options){
  var component, componentClass, componentName, componentId;

  // If string, create new component with options
  if (typeof child === 'string') {

    componentName = child;

    // Make sure options is at least an empty object to protect against errors
    options = options || {};

    // Assume name of set is a lowercased name of the UI Class (PlayButton, etc.)
    componentClass = options['componentClass'] || vjs.capitalize(componentName);

    // Set name through options
    options['name'] = componentName;

    // Create a new object & element for this controls set
    // If there's no .player_, this is a player
    // Closure Compiler throws an 'incomplete alias' warning if we use the vjs variable directly.
    // Every class should be exported, so this should never be a problem here.
    component = new window['videojs'][componentClass](this.player_ || this, options);

  // child is a component instance
  } else {
    component = child;
  }

  this.children_.push(component);

  if (typeof component.id === 'function') {
    this.childIndex_[component.id()] = component;
  }

  // If a name wasn't used to create the component, check if we can use the
  // name function of the component
  componentName = componentName || (component.name && component.name());

  if (componentName) {
    this.childNameIndex_[componentName] = component;
  }

  // Add the UI object's element to the container div (box)
  // Having an element is not required
  if (typeof component['el'] === 'function' && component['el']()) {
    this.contentEl().appendChild(component['el']());
  }

  // Return so it can stored on parent object if desired.
  return component;
};

/**
 * Remove a child component from this component's list of children, and the
 * child component's element from this component's element
 *
 * @param  {vjs.Component} component Component to remove
 */
vjs.Component.prototype.removeChild = function(component){
  if (typeof component === 'string') {
    component = this.getChild(component);
  }

  if (!component || !this.children_) return;

  var childFound = false;
  for (var i = this.children_.length - 1; i >= 0; i--) {
    if (this.children_[i] === component) {
      childFound = true;
      this.children_.splice(i,1);
      break;
    }
  }

  if (!childFound) return;

  this.childIndex_[component.id] = null;
  this.childNameIndex_[component.name] = null;

  var compEl = component.el();
  if (compEl && compEl.parentNode === this.contentEl()) {
    this.contentEl().removeChild(component.el());
  }
};

/**
 * Add and initialize default child components from options
 *
 *     // when an instance of MyComponent is created, all children in options
 *     // will be added to the instance by their name strings and options
 *     MyComponent.prototype.options_.children = {
 *       myChildComponent: {
 *         myChildOption: true
 *       }
 *     }
 *
 *     // Or when creating the component
 *     var myComp = new MyComponent(player, {
 *       children: {
 *         myChildComponent: {
 *           myChildOption: true
 *         }
 *       }
 *     });
 *
 * The children option can also be an Array of child names or
 * child options objects (that also include a 'name' key).
 *
 *     var myComp = new MyComponent(player, {
 *       children: [
 *         'button',
 *         {
 *           name: 'button',
 *           someOtherOption: true
 *         }
 *       ]
 *     });
 *
 */
vjs.Component.prototype.initChildren = function(){
  var parent, children, child, name, opts;

  parent = this;
  children = this.options()['children'];

  if (children) {
    // Allow for an array of children details to passed in the options
    if (children instanceof Array) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];

        if (typeof child == 'string') {
          name = child;
          opts = {};
        } else {
          name = child.name;
          opts = child;
        }

        parent[name] = parent.addChild(name, opts);
      }
    } else {
      vjs.obj.each(children, function(name, opts){
        // Allow for disabling default components
        // e.g. vjs.options['children']['posterImage'] = false
        if (opts === false) return;

        // Set property name on player. Could cause conflicts with other prop names, but it's worth making refs easy.
        parent[name] = parent.addChild(name, opts);
      });
    }
  }
};

/**
 * Allows sub components to stack CSS class names
 *
 * @return {String} The constructed class name
 */
vjs.Component.prototype.buildCSSClass = function(){
    // Child classes can include a function that does:
    // return 'CLASS NAME' + this._super();
    return '';
};

/* Events
============================================================================= */

/**
 * Add an event listener to this component's element
 *
 *     var myFunc = function(){
 *       var myPlayer = this;
 *       // Do something when the event is fired
 *     };
 *
 *     myPlayer.on("eventName", myFunc);
 *
 * The context will be the component.
 *
 * @param  {String}   type The event type e.g. 'click'
 * @param  {Function} fn   The event listener
 * @return {vjs.Component} self
 */
vjs.Component.prototype.on = function(type, fn){
  vjs.on(this.el_, type, vjs.bind(this, fn));
  return this;
};

/**
 * Remove an event listener from the component's element
 *
 *     myComponent.off("eventName", myFunc);
 *
 * @param  {String=}   type Event type. Without type it will remove all listeners.
 * @param  {Function=} fn   Event listener. Without fn it will remove all listeners for a type.
 * @return {vjs.Component}
 */
vjs.Component.prototype.off = function(type, fn){
  vjs.off(this.el_, type, fn);
  return this;
};

/**
 * Add an event listener to be triggered only once and then removed
 *
 * @param  {String}   type Event type
 * @param  {Function} fn   Event listener
 * @return {vjs.Component}
 */
vjs.Component.prototype.one = function(type, fn) {
  vjs.one(this.el_, type, vjs.bind(this, fn));
  return this;
};

/**
 * Trigger an event on an element
 *
 *     myComponent.trigger('eventName');
 *
 * @param  {String}       type  The event type to trigger, e.g. 'click'
 * @param  {Event|Object} event The event object to be passed to the listener
 * @return {vjs.Component}      self
 */
vjs.Component.prototype.trigger = function(type, event){
  vjs.trigger(this.el_, type, event);
  return this;
};

/* Ready
================================================================================ */
/**
 * Is the component loaded
 * This can mean different things depending on the component.
 *
 * @private
 * @type {Boolean}
 */
vjs.Component.prototype.isReady_;

/**
 * Trigger ready as soon as initialization is finished
 *
 * Allows for delaying ready. Override on a sub class prototype.
 * If you set this.isReadyOnInitFinish_ it will affect all components.
 * Specially used when waiting for the Flash player to asynchrnously load.
 *
 * @type {Boolean}
 * @private
 */
vjs.Component.prototype.isReadyOnInitFinish_ = true;

/**
 * List of ready listeners
 *
 * @type {Array}
 * @private
 */
vjs.Component.prototype.readyQueue_;

/**
 * Bind a listener to the component's ready state
 *
 * Different from event listeners in that if the ready event has already happend
 * it will trigger the function immediately.
 *
 * @param  {Function} fn Ready listener
 * @return {vjs.Component}
 */
vjs.Component.prototype.ready = function(fn){
  if (fn) {
    if (this.isReady_) {
      fn.call(this);
    } else {
      if (this.readyQueue_ === undefined) {
        this.readyQueue_ = [];
      }
      this.readyQueue_.push(fn);
    }
  }
  return this;
};

/**
 * Trigger the ready listeners
 *
 * @return {vjs.Component}
 */
vjs.Component.prototype.triggerReady = function(){
  this.isReady_ = true;

  var readyQueue = this.readyQueue_;

  if (readyQueue && readyQueue.length > 0) {

    for (var i = 0, j = readyQueue.length; i < j; i++) {
      readyQueue[i].call(this);
    }

    // Reset Ready Queue
    this.readyQueue_ = [];

    // Allow for using event listeners also, in case you want to do something everytime a source is ready.
    this.trigger('ready');
  }
};

/* Display
============================================================================= */

/**
 * Add a CSS class name to the component's element
 *
 * @param {String} classToAdd Classname to add
 * @return {vjs.Component}
 */
vjs.Component.prototype.addClass = function(classToAdd){
  vjs.addClass(this.el_, classToAdd);
  return this;
};

/**
 * Remove a CSS class name from the component's element
 *
 * @param {String} classToRemove Classname to remove
 * @return {vjs.Component}
 */
vjs.Component.prototype.removeClass = function(classToRemove){
  vjs.removeClass(this.el_, classToRemove);
  return this;
};

/**
 * Show the component element if hidden
 *
 * @return {vjs.Component}
 */
vjs.Component.prototype.show = function(){
  this.el_.style.display = 'block';
  return this;
};

/**
 * Hide the component element if currently showing
 *
 * @return {vjs.Component}
 */
vjs.Component.prototype.hide = function(){
  this.el_.style.display = 'none';
  return this;
};

/**
 * Lock an item in its visible state
 * To be used with fadeIn/fadeOut.
 *
 * @return {vjs.Component}
 * @private
 */
vjs.Component.prototype.lockShowing = function(){
  this.addClass('vjs-lock-showing');
  return this;
};

/**
 * Unlock an item to be hidden
 * To be used with fadeIn/fadeOut.
 *
 * @return {vjs.Component}
 * @private
 */
vjs.Component.prototype.unlockShowing = function(){
  this.removeClass('vjs-lock-showing');
  return this;
};

/**
 * Disable component by making it unshowable
 *
 * Currently private because we're movign towards more css-based states.
 * @private
 */
vjs.Component.prototype.disable = function(){
  this.hide();
  this.show = function(){};
};

/**
 * Set or get the width of the component (CSS values)
 *
 * Setting the video tag dimension values only works with values in pixels.
 * Percent values will not work.
 * Some percents can be used, but width()/height() will return the number + %,
 * not the actual computed width/height.
 *
 * @param  {Number|String=} num   Optional width number
 * @param  {Boolean} skipListeners Skip the 'resize' event trigger
 * @return {vjs.Component} This component, when setting the width
 * @return {Number|String} The width, when getting
 */
vjs.Component.prototype.width = function(num, skipListeners){
  return this.dimension('width', num, skipListeners);
};

/**
 * Get or set the height of the component (CSS values)
 *
 * Setting the video tag dimension values only works with values in pixels.
 * Percent values will not work.
 * Some percents can be used, but width()/height() will return the number + %,
 * not the actual computed width/height.
 *
 * @param  {Number|String=} num     New component height
 * @param  {Boolean=} skipListeners Skip the resize event trigger
 * @return {vjs.Component} This component, when setting the height
 * @return {Number|String} The height, when getting
 */
vjs.Component.prototype.height = function(num, skipListeners){
  return this.dimension('height', num, skipListeners);
};

/**
 * Set both width and height at the same time
 *
 * @param  {Number|String} width
 * @param  {Number|String} height
 * @return {vjs.Component} The component
 */
vjs.Component.prototype.dimensions = function(width, height){
  // Skip resize listeners on width for optimization
  return this.width(width, true).height(height);
};

/**
 * Get or set width or height
 *
 * This is the shared code for the width() and height() methods.
 * All for an integer, integer + 'px' or integer + '%';
 *
 * Known issue: Hidden elements officially have a width of 0. We're defaulting
 * to the style.width value and falling back to computedStyle which has the
 * hidden element issue. Info, but probably not an efficient fix:
 * http://www.foliotek.com/devblog/getting-the-width-of-a-hidden-element-with-jquery-using-width/
 *
 * @param  {String} widthOrHeight  'width' or 'height'
 * @param  {Number|String=} num     New dimension
 * @param  {Boolean=} skipListeners Skip resize event trigger
 * @return {vjs.Component} The component if a dimension was set
 * @return {Number|String} The dimension if nothing was set
 * @private
 */
vjs.Component.prototype.dimension = function(widthOrHeight, num, skipListeners){
  if (num !== undefined) {

    // Check if using css width/height (% or px) and adjust
    if ((''+num).indexOf('%') !== -1 || (''+num).indexOf('px') !== -1) {
      this.el_.style[widthOrHeight] = num;
    } else if (num === 'auto') {
      this.el_.style[widthOrHeight] = '';
    } else {
      this.el_.style[widthOrHeight] = num+'px';
    }

    // skipListeners allows us to avoid triggering the resize event when setting both width and height
    if (!skipListeners) { this.trigger('resize'); }

    // Return component
    return this;
  }

  // Not setting a value, so getting it
  // Make sure element exists
  if (!this.el_) return 0;

  // Get dimension value from style
  var val = this.el_.style[widthOrHeight];
  var pxIndex = val.indexOf('px');
  if (pxIndex !== -1) {
    // Return the pixel value with no 'px'
    return parseInt(val.slice(0,pxIndex), 10);

  // No px so using % or no style was set, so falling back to offsetWidth/height
  // If component has display:none, offset will return 0
  // TODO: handle display:none and no dimension style using px
  } else {

    return parseInt(this.el_['offset'+vjs.capitalize(widthOrHeight)], 10);

    // ComputedStyle version.
    // Only difference is if the element is hidden it will return
    // the percent value (e.g. '100%'')
    // instead of zero like offsetWidth returns.
    // var val = vjs.getComputedStyleValue(this.el_, widthOrHeight);
    // var pxIndex = val.indexOf('px');

    // if (pxIndex !== -1) {
    //   return val.slice(0, pxIndex);
    // } else {
    //   return val;
    // }
  }
};

/**
 * Fired when the width and/or height of the component changes
 * @event resize
 */
vjs.Component.prototype.onResize;

/**
 * Emit 'tap' events when touch events are supported
 *
 * This is used to support toggling the controls through a tap on the video.
 *
 * We're requireing them to be enabled because otherwise every component would
 * have this extra overhead unnecessarily, on mobile devices where extra
 * overhead is especially bad.
 * @private
 */
vjs.Component.prototype.emitTapEvents = function(){
  var touchStart, firstTouch, touchTime, couldBeTap, noTap,
      xdiff, ydiff, touchDistance, tapMovementThreshold;

  // Track the start time so we can determine how long the touch lasted
  touchStart = 0;
  firstTouch = null;

  // Maximum movement allowed during a touch event to still be considered a tap
  tapMovementThreshold = 22;

  this.on('touchstart', function(event) {
    // If more than one finger, don't consider treating this as a click
    if (event.touches.length === 1) {
      firstTouch = event.touches[0];
      // Record start time so we can detect a tap vs. "touch and hold"
      touchStart = new Date().getTime();
      // Reset couldBeTap tracking
      couldBeTap = true;
    }
  });

  this.on('touchmove', function(event) {
    // If more than one finger, don't consider treating this as a click
    if (event.touches.length > 1) {
      couldBeTap = false;
    } else if (firstTouch) {
      // Some devices will throw touchmoves for all but the slightest of taps.
      // So, if we moved only a small distance, this could still be a tap
      xdiff = event.touches[0].pageX - firstTouch.pageX;
      ydiff = event.touches[0].pageY - firstTouch.pageY;
      touchDistance = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
      if (touchDistance > tapMovementThreshold) {
        couldBeTap = false;
      }
    }
  });

  noTap = function(){
    couldBeTap = false;
  };
  // TODO: Listen to the original target. http://youtu.be/DujfpXOKUp8?t=13m8s
  this.on('touchleave', noTap);
  this.on('touchcancel', noTap);

  // When the touch ends, measure how long it took and trigger the appropriate
  // event
  this.on('touchend', function(event) {
    firstTouch = null;
    // Proceed only if the touchmove/leave/cancel event didn't happen
    if (couldBeTap === true) {
      // Measure how long the touch lasted
      touchTime = new Date().getTime() - touchStart;
      // The touch needs to be quick in order to consider it a tap
      if (touchTime < 250) {
        event.preventDefault(); // Don't let browser turn this into a click
        this.trigger('tap');
        // It may be good to copy the touchend event object and change the
        // type to tap, if the other event properties aren't exact after
        // vjs.fixEvent runs (e.g. event.target)
      }
    }
  });
};

/**
 * Report user touch activity when touch events occur
 *
 * User activity is used to determine when controls should show/hide. It's
 * relatively simple when it comes to mouse events, because any mouse event
 * should show the controls. So we capture mouse events that bubble up to the
 * player and report activity when that happens.
 *
 * With touch events it isn't as easy. We can't rely on touch events at the
 * player level, because a tap (touchstart + touchend) on the video itself on
 * mobile devices is meant to turn controls off (and on). User activity is
 * checked asynchronously, so what could happen is a tap event on the video
 * turns the controls off, then the touchend event bubbles up to the player,
 * which if it reported user activity, would turn the controls right back on.
 * (We also don't want to completely block touch events from bubbling up)
 *
 * Also a touchmove, touch+hold, and anything other than a tap is not supposed
 * to turn the controls back on on a mobile device.
 *
 * Here we're setting the default component behavior to report user activity
 * whenever touch events happen, and this can be turned off by components that
 * want touch events to act differently.
 */
vjs.Component.prototype.enableTouchActivity = function() {
  var report, touchHolding, touchEnd;

  // listener for reporting that the user is active
  report = vjs.bind(this.player(), this.player().reportUserActivity);

  this.on('touchstart', function() {
    report();
    // For as long as the they are touching the device or have their mouse down,
    // we consider them active even if they're not moving their finger or mouse.
    // So we want to continue to update that they are active
    clearInterval(touchHolding);
    // report at the same interval as activityCheck
    touchHolding = setInterval(report, 250);
  });

  touchEnd = function(event) {
    report();
    // stop the interval that maintains activity if the touch is holding
    clearInterval(touchHolding);
  };

  this.on('touchmove', report);
  this.on('touchend', touchEnd);
  this.on('touchcancel', touchEnd);
};

/* Button - Base class for all buttons
================================================================================ */
/**
 * Base class for all buttons
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */
vjs.Button = vjs.Component.extend({
  /**
   * @constructor
   * @inheritDoc
   */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    this.emitTapEvents();

    this.on('tap', this.onClick);
    this.on('click', this.onClick);
    this.on('focus', this.onFocus);
    this.on('blur', this.onBlur);
  }
});

vjs.Button.prototype.createEl = function(type, props){
  var el;

  // Add standard Aria and Tabindex info
  props = vjs.obj.merge({
    className: this.buildCSSClass(),
    'role': 'button',
    'aria-live': 'polite', // let the screen reader user know that the text of the button may change
    tabIndex: 0
  }, props);

  el = vjs.Component.prototype.createEl.call(this, type, props);

  // if innerHTML hasn't been overridden (bigPlayButton), add content elements
  if (!props.innerHTML) {
    this.contentEl_ = vjs.createEl('div', {
      className: 'vjs-control-content'
    });

    this.controlText_ = vjs.createEl('span', {
      className: 'vjs-control-text',
      innerHTML: this.buttonText || 'Need Text'
    });

    this.contentEl_.appendChild(this.controlText_);
    el.appendChild(this.contentEl_);
  }

  return el;
};

vjs.Button.prototype.buildCSSClass = function(){
  // TODO: Change vjs-control to vjs-button?
  return 'vjs-control ' + vjs.Component.prototype.buildCSSClass.call(this);
};

  // Click - Override with specific functionality for button
vjs.Button.prototype.onClick = function(){};

  // Focus - Add keyboard functionality to element
vjs.Button.prototype.onFocus = function(){
  vjs.on(document, 'keyup', vjs.bind(this, this.onKeyPress));
};

  // KeyPress (document level) - Trigger click when keys are pressed
vjs.Button.prototype.onKeyPress = function(event){
  // Check for space bar (32) or enter (13) keys
  if (event.which == 32 || event.which == 13) {
    event.preventDefault();
    this.onClick();
  }
};

// Blur - Remove keyboard triggers
vjs.Button.prototype.onBlur = function(){
  vjs.off(document, 'keyup', vjs.bind(this, this.onKeyPress));
};
/* Slider
================================================================================ */
/**
 * The base functionality for sliders like the volume bar and seek bar
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.Slider = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    // Set property names to bar and handle to match with the child Slider class is looking for
    this.bar = this.getChild(this.options_['barName']);
    this.handle = this.getChild(this.options_['handleName']);

    this.on('mousedown', this.onMouseDown);
    this.on('touchstart', this.onMouseDown);
    this.on('focus', this.onFocus);
    this.on('blur', this.onBlur);
    this.on('click', this.onClick);

    this.player_.on('controlsvisible', vjs.bind(this, this.update));

    player.on(this.playerEvent, vjs.bind(this, this.update));

    this.boundEvents = {};
  }
});

vjs.Slider.prototype.createEl = function(type, props) {
  props = props || {};
  // Add the slider element class to all sub classes
  props.className = props.className + ' vjs-slider';
  props = vjs.obj.merge({
    'role': 'slider',
    'aria-valuenow': 0,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    tabIndex: 0
  }, props);

  return vjs.Component.prototype.createEl.call(this, type, props);
};

vjs.Slider.prototype.onMouseDown = function(event){
  event.preventDefault();
  vjs.blockTextSelection();

  this.boundEvents.move = vjs.bind(this, this.onMouseMove);
  this.boundEvents.end = vjs.bind(this, this.onMouseUp);

  vjs.on(document, 'mousemove', this.boundEvents.move);
  vjs.on(document, 'mouseup', this.boundEvents.end);
  vjs.on(document, 'touchmove', this.boundEvents.move);
  vjs.on(document, 'touchend', this.boundEvents.end);

  this.onMouseMove(event);
};

vjs.Slider.prototype.onMouseUp = function() {
  vjs.unblockTextSelection();
  vjs.off(document, 'mousemove', this.boundEvents.move, false);
  vjs.off(document, 'mouseup', this.boundEvents.end, false);
  vjs.off(document, 'touchmove', this.boundEvents.move, false);
  vjs.off(document, 'touchend', this.boundEvents.end, false);

  this.update();
};

vjs.Slider.prototype.update = function(){
  // In VolumeBar init we have a setTimeout for update that pops and update to the end of the
  // execution stack. The player is destroyed before then update will cause an error
  if (!this.el_) return;

  // If scrubbing, we could use a cached value to make the handle keep up with the user's mouse.
  // On HTML5 browsers scrubbing is really smooth, but some flash players are slow, so we might want to utilize this later.
  // var progress =  (this.player_.scrubbing) ? this.player_.getCache().currentTime / this.player_.duration() : this.player_.currentTime() / this.player_.duration();

  var barProgress,
      progress = this.getPercent(),
      handle = this.handle,
      bar = this.bar;

  // Protect against no duration and other division issues
  if (isNaN(progress)) { progress = 0; }

  barProgress = progress;

  // If there is a handle, we need to account for the handle in our calculation for progress bar
  // so that it doesn't fall short of or extend past the handle.
  if (handle) {

    var box = this.el_,
        boxWidth = box.offsetWidth,

        handleWidth = handle.el().offsetWidth,

        // The width of the handle in percent of the containing box
        // In IE, widths may not be ready yet causing NaN
        handlePercent = (handleWidth) ? handleWidth / boxWidth : 0,

        // Get the adjusted size of the box, considering that the handle's center never touches the left or right side.
        // There is a margin of half the handle's width on both sides.
        boxAdjustedPercent = 1 - handlePercent,

        // Adjust the progress that we'll use to set widths to the new adjusted box width
        adjustedProgress = progress * boxAdjustedPercent;

    // The bar does reach the left side, so we need to account for this in the bar's width
    barProgress = adjustedProgress + (handlePercent / 2);

    // Move the handle from the left based on the adjected progress
    handle.el().style.left = vjs.round(adjustedProgress * 100, 2) + '%';
  }

  // Set the new bar width
  bar.el().style.width = vjs.round(barProgress * 100, 2) + '%';
};

vjs.Slider.prototype.calculateDistance = function(event){
  var el, box, boxX, boxY, boxW, boxH, handle, pageX, pageY;

  el = this.el_;
  box = vjs.findPosition(el);
  boxW = boxH = el.offsetWidth;
  handle = this.handle;

  if (this.options_.vertical) {
    boxY = box.top;

    if (event.changedTouches) {
      pageY = event.changedTouches[0].pageY;
    } else {
      pageY = event.pageY;
    }

    if (handle) {
      var handleH = handle.el().offsetHeight;
      // Adjusted X and Width, so handle doesn't go outside the bar
      boxY = boxY + (handleH / 2);
      boxH = boxH - handleH;
    }

    // Percent that the click is through the adjusted area
    return Math.max(0, Math.min(1, ((boxY - pageY) + boxH) / boxH));

  } else {
    boxX = box.left;

    if (event.changedTouches) {
      pageX = event.changedTouches[0].pageX;
    } else {
      pageX = event.pageX;
    }

    if (handle) {
      var handleW = handle.el().offsetWidth;

      // Adjusted X and Width, so handle doesn't go outside the bar
      boxX = boxX + (handleW / 2);
      boxW = boxW - handleW;
    }

    // Percent that the click is through the adjusted area
    return Math.max(0, Math.min(1, (pageX - boxX) / boxW));
  }
};

vjs.Slider.prototype.onFocus = function(){
  vjs.on(document, 'keyup', vjs.bind(this, this.onKeyPress));
};

vjs.Slider.prototype.onKeyPress = function(event){
  if (event.which == 37) { // Left Arrow
    event.preventDefault();
    this.stepBack();
  } else if (event.which == 39) { // Right Arrow
    event.preventDefault();
    this.stepForward();
  }
};

vjs.Slider.prototype.onBlur = function(){
  vjs.off(document, 'keyup', vjs.bind(this, this.onKeyPress));
};

/**
 * Listener for click events on slider, used to prevent clicks
 *   from bubbling up to parent elements like button menus.
 * @param  {Object} event Event object
 */
vjs.Slider.prototype.onClick = function(event){
  event.stopImmediatePropagation();
  event.preventDefault();
};

/**
 * SeekBar Behavior includes play progress bar, and seek handle
 * Needed so it can determine seek position based on handle position/size
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.SliderHandle = vjs.Component.extend();

/**
 * Default value of the slider
 *
 * @type {Number}
 * @private
 */
vjs.SliderHandle.prototype.defaultValue = 0;

/** @inheritDoc */
vjs.SliderHandle.prototype.createEl = function(type, props) {
  props = props || {};
  // Add the slider element class to all sub classes
  props.className = props.className + ' vjs-slider-handle';
  props = vjs.obj.merge({
    innerHTML: '<span class="vjs-control-text">'+this.defaultValue+'</span>'
  }, props);

  return vjs.Component.prototype.createEl.call(this, 'div', props);
};
/* Menu
================================================================================ */
/**
 * The Menu component is used to build pop up menus, including subtitle and
 * captions selection menus.
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */
vjs.Menu = vjs.Component.extend();

/**
 * Add a menu item to the menu
 * @param {Object|String} component Component or component type to add
 */
vjs.Menu.prototype.addItem = function(component){
  this.addChild(component);
  component.on('click', vjs.bind(this, function(){
    this.unlockShowing();
  }));
};

/** @inheritDoc */
vjs.Menu.prototype.createEl = function(){
  var contentElType = this.options().contentElType || 'ul';
  this.contentEl_ = vjs.createEl(contentElType, {
    className: 'vjs-menu-content'
  });
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    append: this.contentEl_,
    className: 'vjs-menu'
  });
  el.appendChild(this.contentEl_);

  // Prevent clicks from bubbling up. Needed for Menu Buttons,
  // where a click on the parent is significant
  vjs.on(el, 'click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
  });

  return el;
};

/**
 * The component for a menu item. `<li>`
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */
vjs.MenuItem = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);
    this.selected(options['selected']);
  }
});

/** @inheritDoc */
vjs.MenuItem.prototype.createEl = function(type, props){
  return vjs.Button.prototype.createEl.call(this, 'li', vjs.obj.merge({
    className: 'vjs-menu-item',
    innerHTML: this.options_['label']
  }, props));
};

/**
 * Handle a click on the menu item, and set it to selected
 */
vjs.MenuItem.prototype.onClick = function(){
  this.selected(true);
};

/**
 * Set this menu item as selected or not
 * @param  {Boolean} selected
 */
vjs.MenuItem.prototype.selected = function(selected){
  if (selected) {
    this.addClass('vjs-selected');
    this.el_.setAttribute('aria-selected',true);
  } else {
    this.removeClass('vjs-selected');
    this.el_.setAttribute('aria-selected',false);
  }
};


/**
 * A button class with a popup menu
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.MenuButton = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    this.menu = this.createMenu();

    // Add list to element
    this.addChild(this.menu);

    // Automatically hide empty menu buttons
    if (this.items && this.items.length === 0) {
      this.hide();
    }

    this.on('keyup', this.onKeyPress);
    this.el_.setAttribute('aria-haspopup', true);
    this.el_.setAttribute('role', 'button');
  }
});

/**
 * Track the state of the menu button
 * @type {Boolean}
 * @private
 */
vjs.MenuButton.prototype.buttonPressed_ = false;

vjs.MenuButton.prototype.createMenu = function(){
  var menu = new vjs.Menu(this.player_);

  // Add a title list item to the top
  if (this.options().title) {
    menu.contentEl().appendChild(vjs.createEl('li', {
      className: 'vjs-menu-title',
      innerHTML: vjs.capitalize(this.options().title),
      tabindex: -1
    }));
  }

  this.items = this['createItems']();

  if (this.items) {
    // Add menu items to the menu
    for (var i = 0; i < this.items.length; i++) {
      menu.addItem(this.items[i]);
    }
  }

  return menu;
};

/**
 * Create the list of menu items. Specific to each subclass.
 */
vjs.MenuButton.prototype.createItems = function(){};

/** @inheritDoc */
vjs.MenuButton.prototype.buildCSSClass = function(){
  return this.className + ' vjs-menu-button ' + vjs.Button.prototype.buildCSSClass.call(this);
};

// Focus - Add keyboard functionality to element
// This function is not needed anymore. Instead, the keyboard functionality is handled by
// treating the button as triggering a submenu. When the button is pressed, the submenu
// appears. Pressing the button again makes the submenu disappear.
vjs.MenuButton.prototype.onFocus = function(){};
// Can't turn off list display that we turned on with focus, because list would go away.
vjs.MenuButton.prototype.onBlur = function(){};

vjs.MenuButton.prototype.onClick = function(){
  // When you click the button it adds focus, which will show the menu indefinitely.
  // So we'll remove focus when the mouse leaves the button.
  // Focus is needed for tab navigation.
  this.one('mouseout', vjs.bind(this, function(){
    this.menu.unlockShowing();
    this.el_.blur();
  }));
  if (this.buttonPressed_){
    this.unpressButton();
  } else {
    this.pressButton();
  }
};

vjs.MenuButton.prototype.onKeyPress = function(event){
  event.preventDefault();

  // Check for space bar (32) or enter (13) keys
  if (event.which == 32 || event.which == 13) {
    if (this.buttonPressed_){
      this.unpressButton();
    } else {
      this.pressButton();
    }
  // Check for escape (27) key
  } else if (event.which == 27){
    if (this.buttonPressed_){
      this.unpressButton();
    }
  }
};

vjs.MenuButton.prototype.pressButton = function(){
  this.buttonPressed_ = true;
  this.menu.lockShowing();
  this.el_.setAttribute('aria-pressed', true);
  if (this.items && this.items.length > 0) {
    this.items[0].el().focus(); // set the focus to the title of the submenu
  }
};

vjs.MenuButton.prototype.unpressButton = function(){
  this.buttonPressed_ = false;
  this.menu.unlockShowing();
  this.el_.setAttribute('aria-pressed', false);
};

/**
 * Custom MediaError to mimic the HTML5 MediaError
 * @param {Number} code The media error code
 */
vjs.MediaError = function(code){
  if (typeof code === 'number') {
    this.code = code;
  } else if (typeof code === 'string') {
    // default code is zero, so this is a custom error
    this.message = code;
  } else if (typeof code === 'object') { // object
    vjs.obj.merge(this, code);
  }

  if (!this.message) {
    this.message = vjs.MediaError.defaultMessages[this.code] || '';
  }
};

/**
 * The error code that refers two one of the defined
 * MediaError types
 * @type {Number}
 */
vjs.MediaError.prototype.code = 0;

/**
 * An optional message to be shown with the error.
 * Message is not part of the HTML5 video spec
 * but allows for more informative custom errors.
 * @type {String}
 */
vjs.MediaError.prototype.message = '';

/**
 * An optional status code that can be set by plugins
 * to allow even more detail about the error.
 * For example the HLS plugin might provide the specific
 * HTTP status code that was returned when the error
 * occurred, then allowing a custom error overlay
 * to display more information.
 * @type {[type]}
 */
vjs.MediaError.prototype.status = null;

vjs.MediaError.errorTypes = [
  'MEDIA_ERR_CUSTOM',            // = 0
  'MEDIA_ERR_ABORTED',           // = 1
  'MEDIA_ERR_NETWORK',           // = 2
  'MEDIA_ERR_DECODE',            // = 3
  'MEDIA_ERR_SRC_NOT_SUPPORTED', // = 4
  'MEDIA_ERR_ENCRYPTED'          // = 5
];

vjs.MediaError.defaultMessages = {
  1: 'You aborted the video playback',
  2: 'A network error caused the video download to fail part-way.',
  3: 'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.',
  4: 'The video could not be loaded, either because the server or network failed or because the format is not supported.',
  5: 'The video is encrypted and we do not have the keys to decrypt it.'
};

// Add types as properties on MediaError
// e.g. MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
for (var errNum = 0; errNum < vjs.MediaError.errorTypes.length; errNum++) {
  vjs.MediaError[vjs.MediaError.errorTypes[errNum]] = errNum;
  // values should be accessible on both the class and instance
  vjs.MediaError.prototype[vjs.MediaError.errorTypes[errNum]] = errNum;
}
(function(){
  var apiMap, specApi, browserApi, i;

  /**
   * Store the browser-specifc methods for the fullscreen API
   * @type {Object|undefined}
   * @private
   */
  vjs.browser.fullscreenAPI;

  // browser API methods
  // map approach from Screenful.js - https://github.com/sindresorhus/screenfull.js
  apiMap = [
    // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
    [
      'requestFullscreen',
      'exitFullscreen',
      'fullscreenElement',
      'fullscreenEnabled',
      'fullscreenchange',
      'fullscreenerror'
    ],
    // WebKit
    [
      'webkitRequestFullscreen',
      'webkitExitFullscreen',
      'webkitFullscreenElement',
      'webkitFullscreenEnabled',
      'webkitfullscreenchange',
      'webkitfullscreenerror'
    ],
    // Old WebKit (Safari 5.1)
    [
      'webkitRequestFullScreen',
      'webkitCancelFullScreen',
      'webkitCurrentFullScreenElement',
      'webkitCancelFullScreen',
      'webkitfullscreenchange',
      'webkitfullscreenerror'
    ],
    // Mozilla
    [
      'mozRequestFullScreen',
      'mozCancelFullScreen',
      'mozFullScreenElement',
      'mozFullScreenEnabled',
      'mozfullscreenchange',
      'mozfullscreenerror'
    ],
    // Microsoft
    [
      'msRequestFullscreen',
      'msExitFullscreen',
      'msFullscreenElement',
      'msFullscreenEnabled',
      'MSFullscreenChange',
      'MSFullscreenError'
    ]
  ];

  specApi = apiMap[0];

  // determine the supported set of functions
  for (i=0; i<apiMap.length; i++) {
    // check for exitFullscreen function
    if (apiMap[i][1] in document) {
      browserApi = apiMap[i];
      break;
    }
  }

  // map the browser API names to the spec API names
  // or leave vjs.browser.fullscreenAPI undefined
  if (browserApi) {
    vjs.browser.fullscreenAPI = {};

    for (i=0; i<browserApi.length; i++) {
      vjs.browser.fullscreenAPI[specApi[i]] = browserApi[i];
    }
  }

})();
/**
 * An instance of the `vjs.Player` class is created when any of the Video.js setup methods are used to initialize a video.
 *
 * ```js
 * var myPlayer = videojs('example_video_1');
 * ```
 *
 * In the follwing example, the `data-setup` attribute tells the Video.js library to create a player instance when the library is ready.
 *
 * ```html
 * <video id="example_video_1" data-setup='{}' controls>
 *   <source src="my-source.mp4" type="video/mp4">
 * </video>
 * ```
 *
 * After an instance has been created it can be accessed globally using `Video('example_video_1')`.
 *
 * @class
 * @extends vjs.Component
 */
vjs.Player = vjs.Component.extend({

  /**
   * player's constructor function
   *
   * @constructs
   * @method init
   * @param {Element} tag        The original video tag used for configuring options
   * @param {Object=} options    Player options
   * @param {Function=} ready    Ready callback function
   */
  init: function(tag, options, ready){
    this.tag = tag; // Store the original tag used to set options

    // Make sure tag ID exists
    tag.id = tag.id || 'vjs_video_' + vjs.guid++;

    // Set Options
    // The options argument overrides options set in the video tag
    // which overrides globally set options.
    // This latter part coincides with the load order
    // (tag must exist before Player)
    options = vjs.obj.merge(this.getTagSettings(tag), options);

    // Cache for video property values.
    this.cache_ = {};

    // Set poster
    this.poster_ = options['poster'];
    // Set controls
    this.controls_ = options['controls'];
    // Original tag settings stored in options
    // now remove immediately so native controls don't flash.
    // May be turned back on by HTML5 tech if nativeControlsForTouch is true
    tag.controls = false;

    // we don't want the player to report touch activity on itself
    // see enableTouchActivity in Component
    options.reportTouchActivity = false;

    // Run base component initializing with new options.
    // Builds the element through createEl()
    // Inits and embeds any child components in opts
    vjs.Component.call(this, this, options, ready);

    // Update controls className. Can't do this when the controls are initially
    // set because the element doesn't exist yet.
    if (this.controls()) {
      this.addClass('vjs-controls-enabled');
    } else {
      this.addClass('vjs-controls-disabled');
    }

    // TODO: Make this smarter. Toggle user state between touching/mousing
    // using events, since devices can have both touch and mouse events.
    // if (vjs.TOUCH_ENABLED) {
    //   this.addClass('vjs-touch-enabled');
    // }

    // Make player easily findable by ID
    vjs.players[this.id_] = this;

    if (options['plugins']) {
      vjs.obj.each(options['plugins'], function(key, val){
        this[key](val);
      }, this);
    }

    this.listenForUserActivity();
  }
});

/**
 * Player instance options, surfaced using vjs.options
 * vjs.options = vjs.Player.prototype.options_
 * Make changes in vjs.options, not here.
 * All options should use string keys so they avoid
 * renaming by closure compiler
 * @type {Object}
 * @private
 */
vjs.Player.prototype.options_ = vjs.options;

/**
 * Destroys the video player and does any necessary cleanup
 *
 *     myPlayer.dispose();
 *
 * This is especially helpful if you are dynamically adding and removing videos
 * to/from the DOM.
 */
vjs.Player.prototype.dispose = function(){
  this.trigger('dispose');
  // prevent dispose from being called twice
  this.off('dispose');

  // Kill reference to this player
  vjs.players[this.id_] = null;
  if (this.tag && this.tag['player']) { this.tag['player'] = null; }
  if (this.el_ && this.el_['player']) { this.el_['player'] = null; }

  // Ensure that tracking progress and time progress will stop and plater deleted
  this.stopTrackingProgress();
  this.stopTrackingCurrentTime();

  if (this.tech) { this.tech.dispose(); }

  // Component dispose
  vjs.Component.prototype.dispose.call(this);
};

vjs.Player.prototype.getTagSettings = function(tag){
  var options = {
    'sources': [],
    'tracks': []
  };

  vjs.obj.merge(options, vjs.getAttributeValues(tag));

  // Get tag children settings
  if (tag.hasChildNodes()) {
    var children, child, childName, i, j;

    children = tag.childNodes;

    for (i=0,j=children.length; i<j; i++) {
      child = children[i];
      // Change case needed: http://ejohn.org/blog/nodename-case-sensitivity/
      childName = child.nodeName.toLowerCase();
      if (childName === 'source') {
        options['sources'].push(vjs.getAttributeValues(child));
      } else if (childName === 'track') {
        options['tracks'].push(vjs.getAttributeValues(child));
      }
    }
  }

  return options;
};

vjs.Player.prototype.createEl = function(){
  var el = this.el_ = vjs.Component.prototype.createEl.call(this, 'div');
  var tag = this.tag;

  // Remove width/height attrs from tag so CSS can make it 100% width/height
  tag.removeAttribute('width');
  tag.removeAttribute('height');
  // Empty video tag tracks so the built-in player doesn't use them also.
  // This may not be fast enough to stop HTML5 browsers from reading the tags
  // so we'll need to turn off any default tracks if we're manually doing
  // captions and subtitles. videoElement.textTracks
  if (tag.hasChildNodes()) {
    var nodes, nodesLength, i, node, nodeName, removeNodes;

    nodes = tag.childNodes;
    nodesLength = nodes.length;
    removeNodes = [];

    while (nodesLength--) {
      node = nodes[nodesLength];
      nodeName = node.nodeName.toLowerCase();
      if (nodeName === 'track') {
        removeNodes.push(node);
      }
    }

    for (i=0; i<removeNodes.length; i++) {
      tag.removeChild(removeNodes[i]);
    }
  }

  // Give video tag ID and class to player div
  // ID will now reference player box, not the video tag
  el.id = tag.id;
  el.className = tag.className;

  // Update tag id/class for use as HTML5 playback tech
  // Might think we should do this after embedding in container so .vjs-tech class
  // doesn't flash 100% width/height, but class only applies with .video-js parent
  tag.id += '_html5_api';
  tag.className = 'vjs-tech';

  // Make player findable on elements
  tag['player'] = el['player'] = this;
  // Default state of video is paused
  this.addClass('vjs-paused');

  // Make box use width/height of tag, or rely on default implementation
  // Enforce with CSS since width/height attrs don't work on divs
  this.width(this.options_['width'], true); // (true) Skip resize listener on load
  this.height(this.options_['height'], true);

  // Wrap video tag in div (el/box) container
  if (tag.parentNode) {
    tag.parentNode.insertBefore(el, tag);
  }
  vjs.insertFirst(tag, el); // Breaks iPhone, fixed in HTML5 setup.

  // The event listeners need to be added before the children are added
  // in the component init because the tech (loaded with mediaLoader) may
  // fire events, like loadstart, that these events need to capture.
  // Long term it might be better to expose a way to do this in component.init
  // like component.initEventListeners() that runs between el creation and
  // adding children
  this.el_ = el;
  this.on('loadstart', this.onLoadStart);
  this.on('ended', this.onEnded);
  this.on('play', this.onPlay);
  this.on('firstplay', this.onFirstPlay);
  this.on('pause', this.onPause);
  this.on('progress', this.onProgress);
  this.on('durationchange', this.onDurationChange);
  this.on('fullscreenchange', this.onFullscreenChange);

  return el;
};

// /* Media Technology (tech)
// ================================================================================ */
// Load/Create an instance of playback technlogy including element and API methods
// And append playback element in player div.
vjs.Player.prototype.loadTech = function(techName, source){

  // Pause and remove current playback technology
  if (this.tech) {
    this.unloadTech();
  }

  // get rid of the HTML5 video tag as soon as we are using another tech
  if (techName !== 'Html5' && this.tag) {
    vjs.Html5.disposeMediaElement(this.tag);
    this.tag = null;
  }

  this.techName = techName;

  // Turn off API access because we're loading a new tech that might load asynchronously
  this.isReady_ = false;

  var techReady = function(){
    this.player_.triggerReady();

    // Manually track progress in cases where the browser/flash player doesn't report it.
    if (!this.features['progressEvents']) {
      this.player_.manualProgressOn();
    }

    // Manually track timeudpates in cases where the browser/flash player doesn't report it.
    if (!this.features['timeupdateEvents']) {
      this.player_.manualTimeUpdatesOn();
    }
  };

  // Grab tech-specific options from player options and add source and parent element to use.
  var techOptions = vjs.obj.merge({ 'source': source, 'parentEl': this.el_ }, this.options_[techName.toLowerCase()]);

  if (source) {
    if (source.src == this.cache_.src && this.cache_.currentTime > 0) {
      techOptions['startTime'] = this.cache_.currentTime;
    }

    this.cache_.src = source.src;
  }

  // Initialize tech instance
  this.tech = new window['videojs'][techName](this, techOptions);

  this.tech.ready(techReady);
};

vjs.Player.prototype.unloadTech = function(){
  this.isReady_ = false;
  this.tech.dispose();

  // Turn off any manual progress or timeupdate tracking
  if (this.manualProgress) { this.manualProgressOff(); }

  if (this.manualTimeUpdates) { this.manualTimeUpdatesOff(); }

  this.tech = false;
};

// There's many issues around changing the size of a Flash (or other plugin) object.
// First is a plugin reload issue in Firefox that has been around for 11 years: https://bugzilla.mozilla.org/show_bug.cgi?id=90268
// Then with the new fullscreen API, Mozilla and webkit browsers will reload the flash object after going to fullscreen.
// To get around this, we're unloading the tech, caching source and currentTime values, and reloading the tech once the plugin is resized.
// reloadTech: function(betweenFn){
//   vjs.log('unloadingTech')
//   this.unloadTech();
//   vjs.log('unloadedTech')
//   if (betweenFn) { betweenFn.call(); }
//   vjs.log('LoadingTech')
//   this.loadTech(this.techName, { src: this.cache_.src })
//   vjs.log('loadedTech')
// },

/* Fallbacks for unsupported event types
================================================================================ */
// Manually trigger progress events based on changes to the buffered amount
// Many flash players and older HTML5 browsers don't send progress or progress-like events
vjs.Player.prototype.manualProgressOn = function(){
  this.manualProgress = true;

  // Trigger progress watching when a source begins loading
  this.trackProgress();

  // Watch for a native progress event call on the tech element
  // In HTML5, some older versions don't support the progress event
  // So we're assuming they don't, and turning off manual progress if they do.
  // As opposed to doing user agent detection
  if (this.tech) {
    this.tech.one('progress', function(){

      // Update known progress support for this playback technology
      this.features['progressEvents'] = true;

      // Turn off manual progress tracking
      this.player_.manualProgressOff();
    });
  }
};

vjs.Player.prototype.manualProgressOff = function(){
  this.manualProgress = false;
  this.stopTrackingProgress();
};

vjs.Player.prototype.trackProgress = function(){

  this.progressInterval = setInterval(vjs.bind(this, function(){
    // Don't trigger unless buffered amount is greater than last time
    // log(this.cache_.bufferEnd, this.buffered().end(0), this.duration())
    /* TODO: update for multiple buffered regions */
    if (this.cache_.bufferEnd < this.buffered().end(0)) {
      this.trigger('progress');
    } else if (this.bufferedPercent() == 1) {
      this.stopTrackingProgress();
      this.trigger('progress'); // Last update
    }
  }), 500);
};
vjs.Player.prototype.stopTrackingProgress = function(){ clearInterval(this.progressInterval); };

/*! Time Tracking -------------------------------------------------------------- */
vjs.Player.prototype.manualTimeUpdatesOn = function(){
  this.manualTimeUpdates = true;

  this.on('play', this.trackCurrentTime);
  this.on('pause', this.stopTrackingCurrentTime);
  // timeupdate is also called by .currentTime whenever current time is set

  // Watch for native timeupdate event
  if (this.tech) {
    this.tech.one('timeupdate', function(){
      // Update known progress support for this playback technology
      this.features['timeupdateEvents'] = true;
      // Turn off manual progress tracking
      this.player_.manualTimeUpdatesOff();
    });
  }
};

vjs.Player.prototype.manualTimeUpdatesOff = function(){
  this.manualTimeUpdates = false;
  this.stopTrackingCurrentTime();
  this.off('play', this.trackCurrentTime);
  this.off('pause', this.stopTrackingCurrentTime);
};

vjs.Player.prototype.trackCurrentTime = function(){
  if (this.currentTimeInterval) { this.stopTrackingCurrentTime(); }
  this.currentTimeInterval = setInterval(vjs.bind(this, function(){
    this.trigger('timeupdate');
  }), 250); // 42 = 24 fps // 250 is what Webkit uses // FF uses 15
};

// Turn off play progress tracking (when paused or dragging)
vjs.Player.prototype.stopTrackingCurrentTime = function(){
  clearInterval(this.currentTimeInterval);

  // #1002 - if the video ends right before the next timeupdate would happen,
  // the progress bar won't make it all the way to the end
  this.trigger('timeupdate');
};
// /* Player event handlers (how the player reacts to certain events)
// ================================================================================ */

/**
 * Fired when the user agent begins looking for media data
 * @event loadstart
 */
vjs.Player.prototype.onLoadStart = function() {
  // TODO: Update to use `emptied` event instead. See #1277.

  // reset the error state
  this.error(null);

  // If it's already playing we want to trigger a firstplay event now.
  // The firstplay event relies on both the play and loadstart events
  // which can happen in any order for a new source
  if (!this.paused()) {
    this.trigger('firstplay');
  } else {
    // reset the hasStarted state
    this.hasStarted(false);
    this.one('play', function(){
      this.hasStarted(true);
    });
  }
};

vjs.Player.prototype.hasStarted_ = false;

vjs.Player.prototype.hasStarted = function(hasStarted){
  if (hasStarted !== undefined) {
    // only update if this is a new value
    if (this.hasStarted_ !== hasStarted) {
      this.hasStarted_ = hasStarted;
      if (hasStarted) {
        this.addClass('vjs-has-started');
        // trigger the firstplay event if this newly has played
        this.trigger('firstplay');
      } else {
        this.removeClass('vjs-has-started');
      }
    }
    return this;
  }
  return this.hasStarted_;
};

/**
 * Fired when the player has initial duration and dimension information
 * @event loadedmetadata
 */
vjs.Player.prototype.onLoadedMetaData;

/**
 * Fired when the player has downloaded data at the current playback position
 * @event loadeddata
 */
vjs.Player.prototype.onLoadedData;

/**
 * Fired when the player has finished downloading the source data
 * @event loadedalldata
 */
vjs.Player.prototype.onLoadedAllData;

/**
 * Fired whenever the media begins or resumes playback
 * @event play
 */
vjs.Player.prototype.onPlay = function(){
  vjs.removeClass(this.el_, 'vjs-paused');
  vjs.addClass(this.el_, 'vjs-playing');
};

/**
 * Fired the first time a video is played
 *
 * Not part of the HLS spec, and we're not sure if this is the best
 * implementation yet, so use sparingly. If you don't have a reason to
 * prevent playback, use `myPlayer.one('play');` instead.
 *
 * @event firstplay
 */
vjs.Player.prototype.onFirstPlay = function(){
    //If the first starttime attribute is specified
    //then we will start at the given offset in seconds
    if(this.options_['starttime']){
      this.currentTime(this.options_['starttime']);
    }

    this.addClass('vjs-has-started');
};

/**
 * Fired whenever the media has been paused
 * @event pause
 */
vjs.Player.prototype.onPause = function(){
  vjs.removeClass(this.el_, 'vjs-playing');
  vjs.addClass(this.el_, 'vjs-paused');
};

/**
 * Fired when the current playback position has changed
 *
 * During playback this is fired every 15-250 milliseconds, depnding on the
 * playback technology in use.
 * @event timeupdate
 */
vjs.Player.prototype.onTimeUpdate;

/**
 * Fired while the user agent is downloading media data
 * @event progress
 */
vjs.Player.prototype.onProgress = function(){
  // Add custom event for when source is finished downloading.
  if (this.bufferedPercent() == 1) {
    this.trigger('loadedalldata');
  }
};

/**
 * Fired when the end of the media resource is reached (currentTime == duration)
 * @event ended
 */
vjs.Player.prototype.onEnded = function(){
  if (this.options_['loop']) {
    this.currentTime(0);
    this.play();
  }
};

/**
 * Fired when the duration of the media resource is first known or changed
 * @event durationchange
 */
vjs.Player.prototype.onDurationChange = function(){
  // Allows for cacheing value instead of asking player each time.
  // We need to get the techGet response and check for a value so we don't
  // accidentally cause the stack to blow up.
  var duration = this.techGet('duration');
  if (duration) {
    if (duration < 0) {
      duration = Infinity;
    }
    this.duration(duration);
    // Determine if the stream is live and propagate styles down to UI.
    if (duration === Infinity) {
      this.addClass('vjs-live');
    } else {
      this.removeClass('vjs-live');
    }
  }
};

/**
 * Fired when the volume changes
 * @event volumechange
 */
vjs.Player.prototype.onVolumeChange;

/**
 * Fired when the player switches in or out of fullscreen mode
 * @event fullscreenchange
 */
vjs.Player.prototype.onFullscreenChange = function() {
  if (this.isFullscreen()) {
    this.addClass('vjs-fullscreen');
  } else {
    this.removeClass('vjs-fullscreen');
  }
};

// /* Player API
// ================================================================================ */

/**
 * Object for cached values.
 * @private
 */
vjs.Player.prototype.cache_;

vjs.Player.prototype.getCache = function(){
  return this.cache_;
};

// Pass values to the playback tech
vjs.Player.prototype.techCall = function(method, arg){
  // If it's not ready yet, call method when it is
  if (this.tech && !this.tech.isReady_) {
    this.tech.ready(function(){
      this[method](arg);
    });

  // Otherwise call method now
  } else {
    try {
      this.tech[method](arg);
    } catch(e) {
      vjs.log(e);
      throw e;
    }
  }
};

// Get calls can't wait for the tech, and sometimes don't need to.
vjs.Player.prototype.techGet = function(method){
  if (this.tech && this.tech.isReady_) {

    // Flash likes to die and reload when you hide or reposition it.
    // In these cases the object methods go away and we get errors.
    // When that happens we'll catch the errors and inform tech that it's not ready any more.
    try {
      return this.tech[method]();
    } catch(e) {
      // When building additional tech libs, an expected method may not be defined yet
      if (this.tech[method] === undefined) {
        vjs.log('Video.js: ' + method + ' method not defined for '+this.techName+' playback technology.', e);
      } else {
        // When a method isn't available on the object it throws a TypeError
        if (e.name == 'TypeError') {
          vjs.log('Video.js: ' + method + ' unavailable on '+this.techName+' playback technology element.', e);
          this.tech.isReady_ = false;
        } else {
          vjs.log(e);
        }
      }
      throw e;
    }
  }

  return;
};

/**
 * start media playback
 *
 *     myPlayer.play();
 *
 * @return {vjs.Player} self
 */
vjs.Player.prototype.play = function(){
  this.techCall('play');
  return this;
};

/**
 * Pause the video playback
 *
 *     myPlayer.pause();
 *
 * @return {vjs.Player} self
 */
vjs.Player.prototype.pause = function(){
  this.techCall('pause');
  return this;
};

/**
 * Check if the player is paused
 *
 *     var isPaused = myPlayer.paused();
 *     var isPlaying = !myPlayer.paused();
 *
 * @return {Boolean} false if the media is currently playing, or true otherwise
 */
vjs.Player.prototype.paused = function(){
  // The initial state of paused should be true (in Safari it's actually false)
  return (this.techGet('paused') === false) ? false : true;
};

/**
 * Get or set the current time (in seconds)
 *
 *     // get
 *     var whereYouAt = myPlayer.currentTime();
 *
 *     // set
 *     myPlayer.currentTime(120); // 2 minutes into the video
 *
 * @param  {Number|String=} seconds The time to seek to
 * @return {Number}        The time in seconds, when not setting
 * @return {vjs.Player}    self, when the current time is set
 */
vjs.Player.prototype.currentTime = function(seconds){
  if (seconds !== undefined) {

    this.techCall('setCurrentTime', seconds);

    // improve the accuracy of manual timeupdates
    if (this.manualTimeUpdates) { this.trigger('timeupdate'); }

    return this;
  }

  // cache last currentTime and return. default to 0 seconds
  //
  // Caching the currentTime is meant to prevent a massive amount of reads on the tech's
  // currentTime when scrubbing, but may not provide much performace benefit afterall.
  // Should be tested. Also something has to read the actual current time or the cache will
  // never get updated.
  return this.cache_.currentTime = (this.techGet('currentTime') || 0);
};

/**
 * Get the length in time of the video in seconds
 *
 *     var lengthOfVideo = myPlayer.duration();
 *
 * **NOTE**: The video must have started loading before the duration can be
 * known, and in the case of Flash, may not be known until the video starts
 * playing.
 *
 * @return {Number} The duration of the video in seconds
 */
vjs.Player.prototype.duration = function(seconds){
  if (seconds !== undefined) {

    // cache the last set value for optimiized scrubbing (esp. Flash)
    this.cache_.duration = parseFloat(seconds);

    return this;
  }

  if (this.cache_.duration === undefined) {
    this.onDurationChange();
  }

  return this.cache_.duration || 0;
};

// Calculates how much time is left. Not in spec, but useful.
vjs.Player.prototype.remainingTime = function(){
  return this.duration() - this.currentTime();
};

// http://dev.w3.org/html5/spec/video.html#dom-media-buffered
// Buffered returns a timerange object.
// Kind of like an array of portions of the video that have been downloaded.
// So far no browsers return more than one range (portion)

/**
 * Get a TimeRange object with the times of the video that have been downloaded
 *
 * If you just want the percent of the video that's been downloaded,
 * use bufferedPercent.
 *
 *     // Number of different ranges of time have been buffered. Usually 1.
 *     numberOfRanges = bufferedTimeRange.length,
 *
 *     // Time in seconds when the first range starts. Usually 0.
 *     firstRangeStart = bufferedTimeRange.start(0),
 *
 *     // Time in seconds when the first range ends
 *     firstRangeEnd = bufferedTimeRange.end(0),
 *
 *     // Length in seconds of the first time range
 *     firstRangeLength = firstRangeEnd - firstRangeStart;
 *
 * @return {Object} A mock TimeRange object (following HTML spec)
 */
vjs.Player.prototype.buffered = function(){
  var buffered = this.techGet('buffered'),
      start = 0,
      buflast = buffered.length - 1,
      // Default end to 0 and store in values
      end = this.cache_.bufferEnd = this.cache_.bufferEnd || 0;

  if (buffered && buflast >= 0 && buffered.end(buflast) !== end) {
    end = buffered.end(buflast);
    // Storing values allows them be overridden by setBufferedFromProgress
    this.cache_.bufferEnd = end;
  }

  return vjs.createTimeRange(start, end);
};

/**
 * Get the percent (as a decimal) of the video that's been downloaded
 *
 *     var howMuchIsDownloaded = myPlayer.bufferedPercent();
 *
 * 0 means none, 1 means all.
 * (This method isn't in the HTML5 spec, but it's very convenient)
 *
 * @return {Number} A decimal between 0 and 1 representing the percent
 */
vjs.Player.prototype.bufferedPercent = function(){
  return (this.duration()) ? this.buffered().end(0) / this.duration() : 0;
};

/**
 * Get or set the current volume of the media
 *
 *     // get
 *     var howLoudIsIt = myPlayer.volume();
 *
 *     // set
 *     myPlayer.volume(0.5); // Set volume to half
 *
 * 0 is off (muted), 1.0 is all the way up, 0.5 is half way.
 *
 * @param  {Number} percentAsDecimal The new volume as a decimal percent
 * @return {Number}                  The current volume, when getting
 * @return {vjs.Player}              self, when setting
 */
vjs.Player.prototype.volume = function(percentAsDecimal){
  var vol;

  if (percentAsDecimal !== undefined) {
    vol = Math.max(0, Math.min(1, parseFloat(percentAsDecimal))); // Force value to between 0 and 1
    this.cache_.volume = vol;
    this.techCall('setVolume', vol);
    vjs.setLocalStorage('volume', vol);
    return this;
  }

  // Default to 1 when returning current volume.
  vol = parseFloat(this.techGet('volume'));
  return (isNaN(vol)) ? 1 : vol;
};


/**
 * Get the current muted state, or turn mute on or off
 *
 *     // get
 *     var isVolumeMuted = myPlayer.muted();
 *
 *     // set
 *     myPlayer.muted(true); // mute the volume
 *
 * @param  {Boolean=} muted True to mute, false to unmute
 * @return {Boolean} True if mute is on, false if not, when getting
 * @return {vjs.Player} self, when setting mute
 */
vjs.Player.prototype.muted = function(muted){
  if (muted !== undefined) {
    this.techCall('setMuted', muted);
    return this;
  }
  return this.techGet('muted') || false; // Default to false
};

// Check if current tech can support native fullscreen
// (e.g. with built in controls lik iOS, so not our flash swf)
vjs.Player.prototype.supportsFullScreen = function(){
  return this.techGet('supportsFullScreen') || false;
};

/**
 * is the player in fullscreen
 * @type {Boolean}
 * @private
 */
vjs.Player.prototype.isFullscreen_ = false;

/**
 * Check if the player is in fullscreen mode
 *
 *     // get
 *     var fullscreenOrNot = myPlayer.isFullscreen();
 *
 *     // set
 *     myPlayer.isFullscreen(true); // tell the player it's in fullscreen
 *
 * NOTE: As of the latest HTML5 spec, isFullscreen is no longer an official
 * property and instead document.fullscreenElement is used. But isFullscreen is
 * still a valuable property for internal player workings.
 *
 * @param  {Boolean=} isFS Update the player's fullscreen state
 * @return {Boolean} true if fullscreen, false if not
 * @return {vjs.Player} self, when setting
 */
vjs.Player.prototype.isFullscreen = function(isFS){
  if (isFS !== undefined) {
    this.isFullscreen_ = !!isFS;
    return this;
  }
  return this.isFullscreen_;
};

/**
 * Old naming for isFullscreen()
 * @deprecated for lowercase 's' version
 */
vjs.Player.prototype.isFullScreen = function(isFS){
  vjs.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")');
  return this.isFullscreen(isFS);
};

/**
 * Increase the size of the video to full screen
 *
 *     myPlayer.requestFullscreen();
 *
 * In some browsers, full screen is not supported natively, so it enters
 * "full window mode", where the video fills the browser window.
 * In browsers and devices that support native full screen, sometimes the
 * browser's default controls will be shown, and not the Video.js custom skin.
 * This includes most mobile devices (iOS, Android) and older versions of
 * Safari.
 *
 * @return {vjs.Player} self
 */
vjs.Player.prototype.requestFullscreen = function(){
  var fsApi = vjs.browser.fullscreenAPI;

  this.isFullscreen(true);

  if (fsApi) {
    // the browser supports going fullscreen at the element level so we can
    // take the controls fullscreen as well as the video

    // Trigger fullscreenchange event after change
    // We have to specifically add this each time, and remove
    // when cancelling fullscreen. Otherwise if there's multiple
    // players on a page, they would all be reacting to the same fullscreen
    // events
    vjs.on(document, fsApi['fullscreenchange'], vjs.bind(this, function(e){
      this.isFullscreen(document[fsApi.fullscreenElement]);

      // If cancelling fullscreen, remove event listener.
      if (this.isFullscreen() === false) {
        vjs.off(document, fsApi['fullscreenchange'], arguments.callee);
      }

      this.trigger('fullscreenchange');
    }));

    this.el_[fsApi.requestFullscreen]();

  } else if (this.tech.supportsFullScreen()) {
    // we can't take the video.js controls fullscreen but we can go fullscreen
    // with native controls
    this.techCall('enterFullScreen');
  } else {
    // fullscreen isn't supported so we'll just stretch the video element to
    // fill the viewport
    this.enterFullWindow();
    this.trigger('fullscreenchange');
  }

  return this;
};

/**
 * Old naming for requestFullscreen
 * @deprecated for lower case 's' version
 */
vjs.Player.prototype.requestFullScreen = function(){
  vjs.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")');
  return this.requestFullscreen();
};


/**
 * Return the video to its normal size after having been in full screen mode
 *
 *     myPlayer.exitFullscreen();
 *
 * @return {vjs.Player} self
 */
vjs.Player.prototype.exitFullscreen = function(){
  var fsApi = vjs.browser.fullscreenAPI;
  this.isFullscreen(false);

  // Check for browser element fullscreen support
  if (fsApi) {
    document[fsApi.exitFullscreen]();
  } else if (this.tech.supportsFullScreen()) {
   this.techCall('exitFullScreen');
  } else {
   this.exitFullWindow();
   this.trigger('fullscreenchange');
  }

  return this;
};

/**
 * Old naming for exitFullscreen
 * @deprecated for exitFullscreen
 */
vjs.Player.prototype.cancelFullScreen = function(){
  vjs.log.warn('player.cancelFullScreen() has been deprecated, use player.exitFullscreen()');
  return this.exitFullscreen();
};

// When fullscreen isn't supported we can stretch the video container to as wide as the browser will let us.
vjs.Player.prototype.enterFullWindow = function(){
  this.isFullWindow = true;

  // Storing original doc overflow value to return to when fullscreen is off
  this.docOrigOverflow = document.documentElement.style.overflow;

  // Add listener for esc key to exit fullscreen
  vjs.on(document, 'keydown', vjs.bind(this, this.fullWindowOnEscKey));

  // Hide any scroll bars
  document.documentElement.style.overflow = 'hidden';

  // Apply fullscreen styles
  vjs.addClass(document.body, 'vjs-full-window');

  this.trigger('enterFullWindow');
};
vjs.Player.prototype.fullWindowOnEscKey = function(event){
  if (event.keyCode === 27) {
    if (this.isFullscreen() === true) {
      this.exitFullscreen();
    } else {
      this.exitFullWindow();
    }
  }
};

vjs.Player.prototype.exitFullWindow = function(){
  this.isFullWindow = false;
  vjs.off(document, 'keydown', this.fullWindowOnEscKey);

  // Unhide scroll bars.
  document.documentElement.style.overflow = this.docOrigOverflow;

  // Remove fullscreen styles
  vjs.removeClass(document.body, 'vjs-full-window');

  // Resize the box, controller, and poster to original sizes
  // this.positionAll();
  this.trigger('exitFullWindow');
};

vjs.Player.prototype.selectSource = function(sources){

  // Loop through each playback technology in the options order
  for (var i=0,j=this.options_['techOrder'];i<j.length;i++) {
    var techName = vjs.capitalize(j[i]),
        tech = window['videojs'][techName];

    // Check if the current tech is defined before continuing
    if (!tech) {
      vjs.log.error('The "' + techName + '" tech is undefined. Skipped browser support check for that tech.');
      continue;
    }

    // Check if the browser supports this technology
    if (tech.isSupported()) {
      // Loop through each source object
      for (var a=0,b=sources;a<b.length;a++) {
        var source = b[a];

        // Check if source can be played with this technology
        if (tech['canPlaySource'](source)) {
          return { source: source, tech: techName };
        }
      }
    }
  }

  return false;
};

/**
 * The source function updates the video source
 *
 * There are three types of variables you can pass as the argument.
 *
 * **URL String**: A URL to the the video file. Use this method if you are sure
 * the current playback technology (HTML5/Flash) can support the source you
 * provide. Currently only MP4 files can be used in both HTML5 and Flash.
 *
 *     myPlayer.src("http://www.example.com/path/to/video.mp4");
 *
 * **Source Object (or element):** A javascript object containing information
 * about the source file. Use this method if you want the player to determine if
 * it can support the file using the type information.
 *
 *     myPlayer.src({ type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" });
 *
 * **Array of Source Objects:** To provide multiple versions of the source so
 * that it can be played using HTML5 across browsers you can use an array of
 * source objects. Video.js will detect which version is supported and load that
 * file.
 *
 *     myPlayer.src([
 *       { type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" },
 *       { type: "video/webm", src: "http://www.example.com/path/to/video.webm" },
 *       { type: "video/ogg", src: "http://www.example.com/path/to/video.ogv" }
 *     ]);
 *
 * @param  {String|Object|Array=} source The source URL, object, or array of sources
 * @return {String} The current video source when getting
 * @return {String} The player when setting
 */
vjs.Player.prototype.src = function(source){
  if (source === undefined) {
    return this.techGet('src');
  }

  // Case: Array of source objects to choose from and pick the best to play
  if (source instanceof Array) {

    var sourceTech = this.selectSource(source),
        techName;

    if (sourceTech) {
        source = sourceTech.source;
        techName = sourceTech.tech;

      // If this technology is already loaded, set source
      if (techName == this.techName) {
        this.src(source); // Passing the source object
      // Otherwise load this technology with chosen source
      } else {
        this.loadTech(techName, source);
      }
    } else {
      // this.el_.appendChild(vjs.createEl('p', {
      //   innerHTML: this.options()['notSupportedMessage']
      // }));
      this.error({ code: 4, message: this.options()['notSupportedMessage'] });
      this.triggerReady(); // we could not find an appropriate tech, but let's still notify the delegate that this is it
    }

  // Case: Source object { src: '', type: '' ... }
  } else if (source instanceof Object) {

    if (window['videojs'][this.techName]['canPlaySource'](source)) {
      this.src(source.src);
    } else {
      // Send through tech loop to check for a compatible technology.
      this.src([source]);
    }

  // Case: URL String (http://myvideo...)
  } else {
    // Cache for getting last set source
    this.cache_.src = source;

    if (!this.isReady_) {
      this.ready(function(){
        this.src(source);
      });
    } else {
      this.techCall('src', source);
      if (this.options_['preload'] == 'auto') {
        this.load();
      }
      if (this.options_['autoplay']) {
        this.play();
      }
    }
  }

  return this;
};

// Begin loading the src data
// http://dev.w3.org/html5/spec/video.html#dom-media-load
vjs.Player.prototype.load = function(){
  this.techCall('load');
  return this;
};

// http://dev.w3.org/html5/spec/video.html#dom-media-currentsrc
vjs.Player.prototype.currentSrc = function(){
  return this.techGet('currentSrc') || this.cache_.src || '';
};

// Attributes/Options
vjs.Player.prototype.preload = function(value){
  if (value !== undefined) {
    this.techCall('setPreload', value);
    this.options_['preload'] = value;
    return this;
  }
  return this.techGet('preload');
};
vjs.Player.prototype.autoplay = function(value){
  if (value !== undefined) {
    this.techCall('setAutoplay', value);
    this.options_['autoplay'] = value;
    return this;
  }
  return this.techGet('autoplay', value);
};
vjs.Player.prototype.loop = function(value){
  if (value !== undefined) {
    this.techCall('setLoop', value);
    this.options_['loop'] = value;
    return this;
  }
  return this.techGet('loop');
};

/**
 * the url of the poster image source
 * @type {String}
 * @private
 */
vjs.Player.prototype.poster_;

/**
 * get or set the poster image source url
 *
 * ##### EXAMPLE:
 *
 *     // getting
 *     var currentPoster = myPlayer.poster();
 *
 *     // setting
 *     myPlayer.poster('http://example.com/myImage.jpg');
 *
 * @param  {String=} [src] Poster image source URL
 * @return {String} poster URL when getting
 * @return {vjs.Player} self when setting
 */
vjs.Player.prototype.poster = function(src){
  if (src === undefined) {
    return this.poster_;
  }

  // update the internal poster variable
  this.poster_ = src;

  // update the tech's poster
  this.techCall('setPoster', src);

  // alert components that the poster has been set
  this.trigger('posterchange');
};

/**
 * Whether or not the controls are showing
 * @type {Boolean}
 * @private
 */
vjs.Player.prototype.controls_;

/**
 * Get or set whether or not the controls are showing.
 * @param  {Boolean} controls Set controls to showing or not
 * @return {Boolean}    Controls are showing
 */
vjs.Player.prototype.controls = function(bool){
  if (bool !== undefined) {
    bool = !!bool; // force boolean
    // Don't trigger a change event unless it actually changed
    if (this.controls_ !== bool) {
      this.controls_ = bool;
      if (bool) {
        this.removeClass('vjs-controls-disabled');
        this.addClass('vjs-controls-enabled');
        this.trigger('controlsenabled');
      } else {
        this.removeClass('vjs-controls-enabled');
        this.addClass('vjs-controls-disabled');
        this.trigger('controlsdisabled');
      }
    }
    return this;
  }
  return this.controls_;
};

vjs.Player.prototype.usingNativeControls_;

/**
 * Toggle native controls on/off. Native controls are the controls built into
 * devices (e.g. default iPhone controls), Flash, or other techs
 * (e.g. Vimeo Controls)
 *
 * **This should only be set by the current tech, because only the tech knows
 * if it can support native controls**
 *
 * @param  {Boolean} bool    True signals that native controls are on
 * @return {vjs.Player}      Returns the player
 * @private
 */
vjs.Player.prototype.usingNativeControls = function(bool){
  if (bool !== undefined) {
    bool = !!bool; // force boolean
    // Don't trigger a change event unless it actually changed
    if (this.usingNativeControls_ !== bool) {
      this.usingNativeControls_ = bool;
      if (bool) {
        this.addClass('vjs-using-native-controls');

        /**
         * player is using the native device controls
         *
         * @event usingnativecontrols
         * @memberof vjs.Player
         * @instance
         * @private
         */
        this.trigger('usingnativecontrols');
      } else {
        this.removeClass('vjs-using-native-controls');

        /**
         * player is using the custom HTML controls
         *
         * @event usingcustomcontrols
         * @memberof vjs.Player
         * @instance
         * @private
         */
        this.trigger('usingcustomcontrols');
      }
    }
    return this;
  }
  return this.usingNativeControls_;
};

/**
 * Store the current media error
 * @type {Object}
 * @private
 */
vjs.Player.prototype.error_ = null;

/**
 * Set or get the current MediaError
 * @param  {*} err A MediaError or a String/Number to be turned into a MediaError
 * @return {vjs.MediaError|null}     when getting
 * @return {vjs.Player}              when setting
 */
vjs.Player.prototype.error = function(err){
  if (err === undefined) {
    return this.error_;
  }

  // restoring to default
  if (err === null) {
    this.error_ = err;
    this.removeClass('vjs-error');
    return this;
  }

  // error instance
  if (err instanceof vjs.MediaError) {
    this.error_ = err;
  } else {
    this.error_ = new vjs.MediaError(err);
  }

  // fire an error event on the player
  this.trigger('error');

  // add the vjs-error classname to the player
  this.addClass('vjs-error');

  // log the name of the error type and any message
  // ie8 just logs "[object object]" if you just log the error object
  vjs.log.error('(CODE:'+this.error_.code+' '+vjs.MediaError.errorTypes[this.error_.code]+')', this.error_.message, this.error_);

  return this;
};

vjs.Player.prototype.ended = function(){ return this.techGet('ended'); };
vjs.Player.prototype.seeking = function(){ return this.techGet('seeking'); };

// When the player is first initialized, trigger activity so components
// like the control bar show themselves if needed
vjs.Player.prototype.userActivity_ = true;
vjs.Player.prototype.reportUserActivity = function(event){
  this.userActivity_ = true;
};

vjs.Player.prototype.userActive_ = true;
vjs.Player.prototype.userActive = function(bool){
  if (bool !== undefined) {
    bool = !!bool;
    if (bool !== this.userActive_) {
      this.userActive_ = bool;
      if (bool) {
        // If the user was inactive and is now active we want to reset the
        // inactivity timer
        this.userActivity_ = true;
        this.removeClass('vjs-user-inactive');
        this.addClass('vjs-user-active');
        this.trigger('useractive');
      } else {
        // We're switching the state to inactive manually, so erase any other
        // activity
        this.userActivity_ = false;

        // Chrome/Safari/IE have bugs where when you change the cursor it can
        // trigger a mousemove event. This causes an issue when you're hiding
        // the cursor when the user is inactive, and a mousemove signals user
        // activity. Making it impossible to go into inactive mode. Specifically
        // this happens in fullscreen when we really need to hide the cursor.
        //
        // When this gets resolved in ALL browsers it can be removed
        // https://code.google.com/p/chromium/issues/detail?id=103041
        if(this.tech) {
          this.tech.one('mousemove', function(e){
            e.stopPropagation();
            e.preventDefault();
          });
        }

        this.removeClass('vjs-user-active');
        this.addClass('vjs-user-inactive');
        this.trigger('userinactive');
      }
    }
    return this;
  }
  return this.userActive_;
};

vjs.Player.prototype.listenForUserActivity = function(){
  var onActivity, onMouseMove, onMouseDown, mouseInProgress, onMouseUp,
      activityCheck, inactivityTimeout, lastMoveX, lastMoveY;

  onActivity = vjs.bind(this, this.reportUserActivity);

  onMouseMove = function(e) {
    // #1068 - Prevent mousemove spamming
    // Chrome Bug: https://code.google.com/p/chromium/issues/detail?id=366970
    if(e.screenX != lastMoveX || e.screenY != lastMoveY) {
      lastMoveX = e.screenX;
      lastMoveY = e.screenY;
      onActivity();
    }
  };

  onMouseDown = function() {
    onActivity();
    // For as long as the they are touching the device or have their mouse down,
    // we consider them active even if they're not moving their finger or mouse.
    // So we want to continue to update that they are active
    clearInterval(mouseInProgress);
    // Setting userActivity=true now and setting the interval to the same time
    // as the activityCheck interval (250) should ensure we never miss the
    // next activityCheck
    mouseInProgress = setInterval(onActivity, 250);
  };

  onMouseUp = function(event) {
    onActivity();
    // Stop the interval that maintains activity if the mouse/touch is down
    clearInterval(mouseInProgress);
  };

  // Any mouse movement will be considered user activity
  this.on('mousedown', onMouseDown);
  this.on('mousemove', onMouseMove);
  this.on('mouseup', onMouseUp);

  // Listen for keyboard navigation
  // Shouldn't need to use inProgress interval because of key repeat
  this.on('keydown', onActivity);
  this.on('keyup', onActivity);

  // Run an interval every 250 milliseconds instead of stuffing everything into
  // the mousemove/touchmove function itself, to prevent performance degradation.
  // `this.reportUserActivity` simply sets this.userActivity_ to true, which
  // then gets picked up by this loop
  // http://ejohn.org/blog/learning-from-twitter/
  activityCheck = setInterval(vjs.bind(this, function() {
    // Check to see if mouse/touch activity has happened
    if (this.userActivity_) {
      // Reset the activity tracker
      this.userActivity_ = false;

      // If the user state was inactive, set the state to active
      this.userActive(true);

      // Clear any existing inactivity timeout to start the timer over
      clearTimeout(inactivityTimeout);

      // In X seconds, if no more activity has occurred the user will be
      // considered inactive
      inactivityTimeout = setTimeout(vjs.bind(this, function() {
        // Protect against the case where the inactivityTimeout can trigger just
        // before the next user activity is picked up by the activityCheck loop
        // causing a flicker
        if (!this.userActivity_) {
          this.userActive(false);
        }
      }), 2000);
    }
  }), 250);

  // Clean up the intervals when we kill the player
  this.on('dispose', function(){
    clearInterval(activityCheck);
    clearTimeout(inactivityTimeout);
  });
};

vjs.Player.prototype.playbackRate = function(rate) {
  if (rate !== undefined) {
    this.techCall('setPlaybackRate', rate);
    return this;
  }

  if (this.tech && this.tech.features && this.tech.features['playbackRate']) {
    return this.techGet('playbackRate');
  } else {
    return 1.0;
  }

};

// Methods to add support for
// networkState: function(){ return this.techCall('networkState'); },
// readyState: function(){ return this.techCall('readyState'); },
// initialTime: function(){ return this.techCall('initialTime'); },
// startOffsetTime: function(){ return this.techCall('startOffsetTime'); },
// played: function(){ return this.techCall('played'); },
// seekable: function(){ return this.techCall('seekable'); },
// videoTracks: function(){ return this.techCall('videoTracks'); },
// audioTracks: function(){ return this.techCall('audioTracks'); },
// videoWidth: function(){ return this.techCall('videoWidth'); },
// videoHeight: function(){ return this.techCall('videoHeight'); },
// defaultPlaybackRate: function(){ return this.techCall('defaultPlaybackRate'); },
// mediaGroup: function(){ return this.techCall('mediaGroup'); },
// controller: function(){ return this.techCall('controller'); },
// defaultMuted: function(){ return this.techCall('defaultMuted'); }

// TODO
// currentSrcList: the array of sources including other formats and bitrates
// playList: array of source lists in order of playback
/**
 * Container of main controls
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 * @extends vjs.Component
 */
vjs.ControlBar = vjs.Component.extend();

vjs.ControlBar.prototype.options_ = {
  loadEvent: 'play',
  children: {
    'playToggle': {},
    'currentTimeDisplay': {},
    'timeDivider': {},
    'durationDisplay': {},
    'remainingTimeDisplay': {},
    'liveDisplay': {},
    'progressControl': {},
    'fullscreenToggle': {},
    'volumeControl': {},
    'muteToggle': {},
    // 'volumeMenuButton': {},
    'playbackRateMenuButton': {}
  }
};

vjs.ControlBar.prototype.createEl = function(){
  return vjs.createEl('div', {
    className: 'vjs-control-bar'
  });
};
/**
 * Displays the live indicator
 * TODO - Future make it click to snap to live
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.LiveDisplay = vjs.Component.extend({
  init: function(player, options){
    vjs.Component.call(this, player, options);
  }
});

vjs.LiveDisplay.prototype.createEl = function(){
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-live-controls vjs-control'
  });

  this.contentEl_ = vjs.createEl('div', {
    className: 'vjs-live-display',
    innerHTML: '<span class="vjs-control-text">Stream Type </span>LIVE',
    'aria-live': 'off'
  });

  el.appendChild(this.contentEl_);

  return el;
};
/**
 * Button to toggle between play and pause
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */
vjs.PlayToggle = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    player.on('play', vjs.bind(this, this.onPlay));
    player.on('pause', vjs.bind(this, this.onPause));
  }
});

vjs.PlayToggle.prototype.buttonText = 'Play';

vjs.PlayToggle.prototype.buildCSSClass = function(){
  return 'vjs-play-control ' + vjs.Button.prototype.buildCSSClass.call(this);
};

// OnClick - Toggle between play and pause
vjs.PlayToggle.prototype.onClick = function(){
  if (this.player_.paused()) {
    this.player_.play();
  } else {
    this.player_.pause();
  }
};

  // OnPlay - Add the vjs-playing class to the element so it can change appearance
vjs.PlayToggle.prototype.onPlay = function(){
  vjs.removeClass(this.el_, 'vjs-paused');
  vjs.addClass(this.el_, 'vjs-playing');
  this.el_.children[0].children[0].innerHTML = 'Pause'; // change the button text to "Pause"
};

  // OnPause - Add the vjs-paused class to the element so it can change appearance
vjs.PlayToggle.prototype.onPause = function(){
  vjs.removeClass(this.el_, 'vjs-playing');
  vjs.addClass(this.el_, 'vjs-paused');
  this.el_.children[0].children[0].innerHTML = 'Play'; // change the button text to "Play"
};
/**
 * Displays the current time
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.CurrentTimeDisplay = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    player.on('timeupdate', vjs.bind(this, this.updateContent));
  }
});

vjs.CurrentTimeDisplay.prototype.createEl = function(){
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-current-time vjs-time-controls vjs-control'
  });

  this.contentEl_ = vjs.createEl('div', {
    className: 'vjs-current-time-display',
    innerHTML: '<span class="vjs-control-text">Current Time </span>' + '0:00', // label the current time for screen reader users
    'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
  });

  el.appendChild(this.contentEl_);
  return el;
};

vjs.CurrentTimeDisplay.prototype.updateContent = function(){
  // Allows for smooth scrubbing, when player can't keep up.
  var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
  this.contentEl_.innerHTML = '<span class="vjs-control-text">Current Time </span>' + vjs.formatTime(time, this.player_.duration());
};

/**
 * Displays the duration
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.DurationDisplay = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    // this might need to be changed to 'durationchange' instead of 'timeupdate' eventually,
    // however the durationchange event fires before this.player_.duration() is set,
    // so the value cannot be written out using this method.
    // Once the order of durationchange and this.player_.duration() being set is figured out,
    // this can be updated.
    player.on('timeupdate', vjs.bind(this, this.updateContent));
  }
});

vjs.DurationDisplay.prototype.createEl = function(){
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-duration vjs-time-controls vjs-control'
  });

  this.contentEl_ = vjs.createEl('div', {
    className: 'vjs-duration-display',
    innerHTML: '<span class="vjs-control-text">Duration Time </span>' + '0:00', // label the duration time for screen reader users
    'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
  });

  el.appendChild(this.contentEl_);
  return el;
};

vjs.DurationDisplay.prototype.updateContent = function(){
  var duration = this.player_.duration();
  if (duration) {
      this.contentEl_.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + vjs.formatTime(duration); // label the duration time for screen reader users
  }
};

/**
 * The separator between the current time and duration
 *
 * Can be hidden if it's not needed in the design.
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.TimeDivider = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);
  }
});

vjs.TimeDivider.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-time-divider',
    innerHTML: '<div><span>/</span></div>'
  });
};

/**
 * Displays the time left in the video
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.RemainingTimeDisplay = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    player.on('timeupdate', vjs.bind(this, this.updateContent));
  }
});

vjs.RemainingTimeDisplay.prototype.createEl = function(){
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-remaining-time vjs-time-controls vjs-control'
  });

  this.contentEl_ = vjs.createEl('div', {
    className: 'vjs-remaining-time-display',
    innerHTML: '<span class="vjs-control-text">Remaining Time </span>' + '-0:00', // label the remaining time for screen reader users
    'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
  });

  el.appendChild(this.contentEl_);
  return el;
};

vjs.RemainingTimeDisplay.prototype.updateContent = function(){
  if (this.player_.duration()) {
    this.contentEl_.innerHTML = '<span class="vjs-control-text">Remaining Time </span>' + '-'+ vjs.formatTime(this.player_.remainingTime());
  }

  // Allows for smooth scrubbing, when player can't keep up.
  // var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
  // this.contentEl_.innerHTML = vjs.formatTime(time, this.player_.duration());
};
/**
 * Toggle fullscreen video
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @extends vjs.Button
 */
vjs.FullscreenToggle = vjs.Button.extend({
  /**
   * @constructor
   * @memberof vjs.FullscreenToggle
   * @instance
   */
  init: function(player, options){
    vjs.Button.call(this, player, options);
  }
});

vjs.FullscreenToggle.prototype.buttonText = 'Fullscreen';

vjs.FullscreenToggle.prototype.buildCSSClass = function(){
  return 'vjs-fullscreen-control ' + vjs.Button.prototype.buildCSSClass.call(this);
};

vjs.FullscreenToggle.prototype.onClick = function(){
  if (!this.player_.isFullscreen()) {
    this.player_.requestFullscreen();
    this.controlText_.innerHTML = 'Non-Fullscreen';
  } else {
    this.player_.exitFullscreen();
    this.controlText_.innerHTML = 'Fullscreen';
  }
};
/**
 * The Progress Control component contains the seek bar, load progress,
 * and play progress
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.ProgressControl = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);
  }
});

vjs.ProgressControl.prototype.options_ = {
  children: {
    'seekBar': {}
  }
};

vjs.ProgressControl.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-progress-control vjs-control'
  });
};

/**
 * Seek Bar and holder for the progress bars
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.SeekBar = vjs.Slider.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Slider.call(this, player, options);
    player.on('timeupdate', vjs.bind(this, this.updateARIAAttributes));
    player.ready(vjs.bind(this, this.updateARIAAttributes));
  }
});

vjs.SeekBar.prototype.options_ = {
  children: {
    'loadProgressBar': {},
    'playProgressBar': {},
    'seekHandle': {}
  },
  'barName': 'playProgressBar',
  'handleName': 'seekHandle'
};

vjs.SeekBar.prototype.playerEvent = 'timeupdate';

vjs.SeekBar.prototype.createEl = function(){
  return vjs.Slider.prototype.createEl.call(this, 'div', {
    className: 'vjs-progress-holder',
    'aria-label': 'video progress bar'
  });
};

vjs.SeekBar.prototype.updateARIAAttributes = function(){
    // Allows for smooth scrubbing, when player can't keep up.
    var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
    this.el_.setAttribute('aria-valuenow',vjs.round(this.getPercent()*100, 2)); // machine readable value of progress bar (percentage complete)
    this.el_.setAttribute('aria-valuetext',vjs.formatTime(time, this.player_.duration())); // human readable value of progress bar (time complete)
};

vjs.SeekBar.prototype.getPercent = function(){
  return this.player_.currentTime() / this.player_.duration();
};

vjs.SeekBar.prototype.onMouseDown = function(event){
  vjs.Slider.prototype.onMouseDown.call(this, event);

  this.player_.scrubbing = true;

  this.videoWasPlaying = !this.player_.paused();
  this.player_.pause();
};

vjs.SeekBar.prototype.onMouseMove = function(event){
  var newTime = this.calculateDistance(event) * this.player_.duration();

  // Don't let video end while scrubbing.
  if (newTime == this.player_.duration()) { newTime = newTime - 0.1; }

  // Set new time (tell player to seek to new time)
  this.player_.currentTime(newTime);
};

vjs.SeekBar.prototype.onMouseUp = function(event){
  vjs.Slider.prototype.onMouseUp.call(this, event);

  this.player_.scrubbing = false;
  if (this.videoWasPlaying) {
    this.player_.play();
  }
};

vjs.SeekBar.prototype.stepForward = function(){
  this.player_.currentTime(this.player_.currentTime() + 5); // more quickly fast forward for keyboard-only users
};

vjs.SeekBar.prototype.stepBack = function(){
  this.player_.currentTime(this.player_.currentTime() - 5); // more quickly rewind for keyboard-only users
};


/**
 * Shows load progress
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.LoadProgressBar = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);
    player.on('progress', vjs.bind(this, this.update));
  }
});

vjs.LoadProgressBar.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-load-progress',
    innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
  });
};

vjs.LoadProgressBar.prototype.update = function(){
  if (this.el_.style) { this.el_.style.width = vjs.round(this.player_.bufferedPercent() * 100, 2) + '%'; }
};


/**
 * Shows play progress
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.PlayProgressBar = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);
  }
});

vjs.PlayProgressBar.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-play-progress',
    innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
  });
};

/**
 * The Seek Handle shows the current position of the playhead during playback,
 * and can be dragged to adjust the playhead.
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.SeekHandle = vjs.SliderHandle.extend({
  init: function(player, options) {
    vjs.SliderHandle.call(this, player, options);
    player.on('timeupdate', vjs.bind(this, this.updateContent));
  }
});

/**
 * The default value for the handle content, which may be read by screen readers
 *
 * @type {String}
 * @private
 */
vjs.SeekHandle.prototype.defaultValue = '00:00';

/** @inheritDoc */
vjs.SeekHandle.prototype.createEl = function() {
  return vjs.SliderHandle.prototype.createEl.call(this, 'div', {
    className: 'vjs-seek-handle',
    'aria-live': 'off'
  });
};

vjs.SeekHandle.prototype.updateContent = function() {
  var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
  this.el_.innerHTML = '<span class="vjs-control-text">' + vjs.formatTime(time, this.player_.duration()) + '</span>';
};
/**
 * The component for controlling the volume level
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.VolumeControl = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    // hide volume controls when they're not supported by the current tech
    if (player.tech && player.tech.features && player.tech.features['volumeControl'] === false) {
      this.addClass('vjs-hidden');
    }
    player.on('loadstart', vjs.bind(this, function(){
      if (player.tech.features && player.tech.features['volumeControl'] === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    }));
  }
});

vjs.VolumeControl.prototype.options_ = {
  children: {
    'volumeBar': {}
  }
};

vjs.VolumeControl.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-volume-control vjs-control'
  });
};

/**
 * The bar that contains the volume level and can be clicked on to adjust the level
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.VolumeBar = vjs.Slider.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Slider.call(this, player, options);
    player.on('volumechange', vjs.bind(this, this.updateARIAAttributes));
    player.ready(vjs.bind(this, this.updateARIAAttributes));
  }
});

vjs.VolumeBar.prototype.updateARIAAttributes = function(){
  // Current value of volume bar as a percentage
  this.el_.setAttribute('aria-valuenow',vjs.round(this.player_.volume()*100, 2));
  this.el_.setAttribute('aria-valuetext',vjs.round(this.player_.volume()*100, 2)+'%');
};

vjs.VolumeBar.prototype.options_ = {
  children: {
    'volumeLevel': {},
    'volumeHandle': {}
  },
  'barName': 'volumeLevel',
  'handleName': 'volumeHandle'
};

vjs.VolumeBar.prototype.playerEvent = 'volumechange';

vjs.VolumeBar.prototype.createEl = function(){
  return vjs.Slider.prototype.createEl.call(this, 'div', {
    className: 'vjs-volume-bar',
    'aria-label': 'volume level'
  });
};

vjs.VolumeBar.prototype.onMouseMove = function(event) {
  if (this.player_.muted()) {
    this.player_.muted(false);
  }

  this.player_.volume(this.calculateDistance(event));
};

vjs.VolumeBar.prototype.getPercent = function(){
  if (this.player_.muted()) {
    return 0;
  } else {
    return this.player_.volume();
  }
};

vjs.VolumeBar.prototype.stepForward = function(){
  this.player_.volume(this.player_.volume() + 0.1);
};

vjs.VolumeBar.prototype.stepBack = function(){
  this.player_.volume(this.player_.volume() - 0.1);
};

/**
 * Shows volume level
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.VolumeLevel = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);
  }
});

vjs.VolumeLevel.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-volume-level',
    innerHTML: '<span class="vjs-control-text"></span>'
  });
};

/**
 * The volume handle can be dragged to adjust the volume level
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
 vjs.VolumeHandle = vjs.SliderHandle.extend();

 vjs.VolumeHandle.prototype.defaultValue = '00:00';

 /** @inheritDoc */
 vjs.VolumeHandle.prototype.createEl = function(){
   return vjs.SliderHandle.prototype.createEl.call(this, 'div', {
     className: 'vjs-volume-handle'
   });
 };
/**
 * A button component for muting the audio
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.MuteToggle = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    player.on('volumechange', vjs.bind(this, this.update));

    // hide mute toggle if the current tech doesn't support volume control
    if (player.tech && player.tech.features && player.tech.features['volumeControl'] === false) {
      this.addClass('vjs-hidden');
    }
    player.on('loadstart', vjs.bind(this, function(){
      if (player.tech.features && player.tech.features['volumeControl'] === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    }));
  }
});

vjs.MuteToggle.prototype.createEl = function(){
  return vjs.Button.prototype.createEl.call(this, 'div', {
    className: 'vjs-mute-control vjs-control',
    innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
  });
};

vjs.MuteToggle.prototype.onClick = function(){
  this.player_.muted( this.player_.muted() ? false : true );
};

vjs.MuteToggle.prototype.update = function(){
  var vol = this.player_.volume(),
      level = 3;

  if (vol === 0 || this.player_.muted()) {
    level = 0;
  } else if (vol < 0.33) {
    level = 1;
  } else if (vol < 0.67) {
    level = 2;
  }

  // Don't rewrite the button text if the actual text doesn't change.
  // This causes unnecessary and confusing information for screen reader users.
  // This check is needed because this function gets called every time the volume level is changed.
  if(this.player_.muted()){
      if(this.el_.children[0].children[0].innerHTML!='Unmute'){
          this.el_.children[0].children[0].innerHTML = 'Unmute'; // change the button text to "Unmute"
      }
  } else {
      if(this.el_.children[0].children[0].innerHTML!='Mute'){
          this.el_.children[0].children[0].innerHTML = 'Mute'; // change the button text to "Mute"
      }
  }

  /* TODO improve muted icon classes */
  for (var i = 0; i < 4; i++) {
    vjs.removeClass(this.el_, 'vjs-vol-'+i);
  }
  vjs.addClass(this.el_, 'vjs-vol-'+level);
};
/**
 * Menu button with a popup for showing the volume slider.
 * @constructor
 */
vjs.VolumeMenuButton = vjs.MenuButton.extend({
  /** @constructor */
  init: function(player, options){
    vjs.MenuButton.call(this, player, options);

    // Same listeners as MuteToggle
    player.on('volumechange', vjs.bind(this, this.update));

    // hide mute toggle if the current tech doesn't support volume control
    if (player.tech && player.tech.features && player.tech.features.volumeControl === false) {
      this.addClass('vjs-hidden');
    }
    player.on('loadstart', vjs.bind(this, function(){
      if (player.tech.features && player.tech.features.volumeControl === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    }));
    this.addClass('vjs-menu-button');
  }
});

vjs.VolumeMenuButton.prototype.createMenu = function(){
  var menu = new vjs.Menu(this.player_, {
    contentElType: 'div'
  });
  var vc = new vjs.VolumeBar(this.player_, vjs.obj.merge({vertical: true}, this.options_.volumeBar));
  menu.addChild(vc);
  return menu;
};

vjs.VolumeMenuButton.prototype.onClick = function(){
  vjs.MuteToggle.prototype.onClick.call(this);
  vjs.MenuButton.prototype.onClick.call(this);
};

vjs.VolumeMenuButton.prototype.createEl = function(){
  return vjs.Button.prototype.createEl.call(this, 'div', {
    className: 'vjs-volume-menu-button vjs-menu-button vjs-control',
    innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
  });
};
vjs.VolumeMenuButton.prototype.update = vjs.MuteToggle.prototype.update;
/**
 * The component for controlling the playback rate
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.PlaybackRateMenuButton = vjs.MenuButton.extend({
  /** @constructor */
  init: function(player, options){
    vjs.MenuButton.call(this, player, options);

    this.updateVisibility();
    this.updateLabel();

    player.on('loadstart', vjs.bind(this, this.updateVisibility));
    player.on('ratechange', vjs.bind(this, this.updateLabel));
  }
});

vjs.PlaybackRateMenuButton.prototype.createEl = function(){
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-playback-rate vjs-menu-button vjs-control',
    innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">Playback Rate</span></div>'
  });

  this.labelEl_ = vjs.createEl('div', {
    className: 'vjs-playback-rate-value',
    innerHTML: 1.0
  });

  el.appendChild(this.labelEl_);

  return el;
};

// Menu creation
vjs.PlaybackRateMenuButton.prototype.createMenu = function(){
  var menu = new vjs.Menu(this.player());
  var rates = this.player().options()['playbackRates'];

  if (rates) {
    for (var i = rates.length - 1; i >= 0; i--) {
      menu.addChild(
        new vjs.PlaybackRateMenuItem(this.player(), { 'rate': rates[i] + 'x'})
        );
    };
  }

  return menu;
};

vjs.PlaybackRateMenuButton.prototype.updateARIAAttributes = function(){
  // Current playback rate
  this.el().setAttribute('aria-valuenow', this.player().playbackRate());
};

vjs.PlaybackRateMenuButton.prototype.onClick = function(){
  // select next rate option
  var currentRate = this.player().playbackRate();
  var rates = this.player().options()['playbackRates'];
  // this will select first one if the last one currently selected
  var newRate = rates[0];
  for (var i = 0; i <rates.length ; i++) {
    if (rates[i] > currentRate) {
      newRate = rates[i];
      break;
    }
  };
  this.player().playbackRate(newRate);
};

vjs.PlaybackRateMenuButton.prototype.playbackRateSupported = function(){
  return this.player().tech
    && this.player().tech.features['playbackRate']
    && this.player().options()['playbackRates']
    && this.player().options()['playbackRates'].length > 0
  ;
};

/**
 * Hide playback rate controls when they're no playback rate options to select
 */
vjs.PlaybackRateMenuButton.prototype.updateVisibility = function(){
  if (this.playbackRateSupported()) {
    this.removeClass('vjs-hidden');
  } else {
    this.addClass('vjs-hidden');
  }
};

/**
 * Update button label when rate changed
 */
vjs.PlaybackRateMenuButton.prototype.updateLabel = function(){
  if (this.playbackRateSupported()) {
    this.labelEl_.innerHTML = this.player().playbackRate() + 'x';
  }
};

/**
 * The specific menu item type for selecting a playback rate
 *
 * @constructor
 */
vjs.PlaybackRateMenuItem = vjs.MenuItem.extend({
  contentElType: 'button',
  /** @constructor */
  init: function(player, options){
    var label = this.label = options['rate'];
    var rate = this.rate = parseFloat(label, 10);

    // Modify options for parent MenuItem class's init.
    options['label'] = label;
    options['selected'] = rate === 1;
    vjs.MenuItem.call(this, player, options);

    this.player().on('ratechange', vjs.bind(this, this.update));
  }
});

vjs.PlaybackRateMenuItem.prototype.onClick = function(){
  vjs.MenuItem.prototype.onClick.call(this);
  this.player().playbackRate(this.rate);
};

vjs.PlaybackRateMenuItem.prototype.update = function(){
  this.selected(this.player().playbackRate() == this.rate);
};
/* Poster Image
================================================================================ */
/**
 * The component that handles showing the poster image.
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.PosterImage = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    if (player.poster()) {
      this.src(player.poster());
    }

    if (!player.poster() || !player.controls()) {
      this.hide();
    }

    player.on('posterchange', vjs.bind(this, function(){
      this.src(player.poster());
    }));

    player.on('play', vjs.bind(this, this.hide));
  }
});

// use the test el to check for backgroundSize style support
var _backgroundSizeSupported = 'backgroundSize' in vjs.TEST_VID.style;

vjs.PosterImage.prototype.createEl = function(){
  var el = vjs.createEl('div', {
    className: 'vjs-poster',

    // Don't want poster to be tabbable.
    tabIndex: -1
  });

  if (!_backgroundSizeSupported) {
    // setup an img element as a fallback for IE8
    el.appendChild(vjs.createEl('img'));
  }

  return el;
};

vjs.PosterImage.prototype.src = function(url){
  var el = this.el();

  // getter
  // can't think of a need for a getter here
  // see #838 if on is needed in the future
  // still don't want a getter to set src as undefined
  if (url === undefined) {
    return;
  }

  // setter
  // To ensure the poster image resizes while maintaining its original aspect
  // ratio, use a div with `background-size` when available. For browsers that
  // do not support `background-size` (e.g. IE8), fall back on using a regular
  // img element.
  if (_backgroundSizeSupported) {
    el.style.backgroundImage = 'url("' + url + '")';
  } else {
    el.firstChild.src = url;
  }
};

vjs.PosterImage.prototype.onClick = function(){
  // Only accept clicks when controls are enabled
  if (this.player().controls()) {
    this.player_.play();
  }
};
/* Loading Spinner
================================================================================ */
/**
 * Loading spinner for waiting events
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */
vjs.LoadingSpinner = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    player.on('canplay', vjs.bind(this, this.hide));
    player.on('canplaythrough', vjs.bind(this, this.hide));
    player.on('playing', vjs.bind(this, this.hide));
    player.on('seeking', vjs.bind(this, this.show));

    // in some browsers seeking does not trigger the 'playing' event,
    // so we also need to trap 'seeked' if we are going to set a
    // 'seeking' event
    player.on('seeked', vjs.bind(this, this.hide));

    player.on('ended', vjs.bind(this, this.hide));

    // Not showing spinner on stalled any more. Browsers may stall and then not trigger any events that would remove the spinner.
    // Checked in Chrome 16 and Safari 5.1.2. http://help.videojs.com/discussions/problems/883-why-is-the-download-progress-showing
    // player.on('stalled', vjs.bind(this, this.show));

    player.on('waiting', vjs.bind(this, this.show));
  }
});

vjs.LoadingSpinner.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-loading-spinner'
  });
};
/* Big Play Button
================================================================================ */
/**
 * Initial play button. Shows before the video has played. The hiding of the
 * big play button is done via CSS and player states.
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */
vjs.BigPlayButton = vjs.Button.extend();

vjs.BigPlayButton.prototype.createEl = function(){
  return vjs.Button.prototype.createEl.call(this, 'div', {
    className: 'vjs-big-play-button',
    innerHTML: '<span aria-hidden="true"></span>',
    'aria-label': 'play video'
  });
};

vjs.BigPlayButton.prototype.onClick = function(){
  this.player_.play();
};
/**
 * Display that an error has occurred making the video unplayable
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.ErrorDisplay = vjs.Component.extend({
  init: function(player, options){
    vjs.Component.call(this, player, options);

    this.update();
    player.on('error', vjs.bind(this, this.update));
  }
});

vjs.ErrorDisplay.prototype.createEl = function(){
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-error-display'
  });

  this.contentEl_ = vjs.createEl('div');
  el.appendChild(this.contentEl_);

  return el;
};

vjs.ErrorDisplay.prototype.update = function(){
  if (this.player().error()) {
    this.contentEl_.innerHTML = this.player().error().message;
  }
};
/**
 * @fileoverview Media Technology Controller - Base class for media playback
 * technology controllers like Flash and HTML5
 */

/**
 * Base class for media (HTML5 Video, Flash) controllers
 * @param {vjs.Player|Object} player  Central player instance
 * @param {Object=} options Options object
 * @constructor
 */
vjs.MediaTechController = vjs.Component.extend({
  /** @constructor */
  init: function(player, options, ready){
    options = options || {};
    // we don't want the tech to report user activity automatically.
    // This is done manually in addControlsListeners
    options.reportTouchActivity = false;
    vjs.Component.call(this, player, options, ready);

    this.initControlsListeners();
  }
});

/**
 * Set up click and touch listeners for the playback element
 * On desktops, a click on the video itself will toggle playback,
 * on a mobile device a click on the video toggles controls.
 * (toggling controls is done by toggling the user state between active and
 * inactive)
 *
 * A tap can signal that a user has become active, or has become inactive
 * e.g. a quick tap on an iPhone movie should reveal the controls. Another
 * quick tap should hide them again (signaling the user is in an inactive
 * viewing state)
 *
 * In addition to this, we still want the user to be considered inactive after
 * a few seconds of inactivity.
 *
 * Note: the only part of iOS interaction we can't mimic with this setup
 * is a touch and hold on the video element counting as activity in order to
 * keep the controls showing, but that shouldn't be an issue. A touch and hold on
 * any controls will still keep the user active
 */
vjs.MediaTechController.prototype.initControlsListeners = function(){
  var player, tech, activateControls, deactivateControls;

  tech = this;
  player = this.player();

  var activateControls = function(){
    if (player.controls() && !player.usingNativeControls()) {
      tech.addControlsListeners();
    }
  };

  deactivateControls = vjs.bind(tech, tech.removeControlsListeners);

  // Set up event listeners once the tech is ready and has an element to apply
  // listeners to
  this.ready(activateControls);
  player.on('controlsenabled', activateControls);
  player.on('controlsdisabled', deactivateControls);

  // if we're loading the playback object after it has started loading or playing the
  // video (often with autoplay on) then the loadstart event has already fired and we
  // need to fire it manually because many things rely on it.
  // Long term we might consider how we would do this for other events like 'canplay'
  // that may also have fired.
  this.ready(function(){
    if (this.networkState && this.networkState() > 0) {
      this.player().trigger('loadstart');
    }
  });
};

vjs.MediaTechController.prototype.addControlsListeners = function(){
  var userWasActive;

  // Some browsers (Chrome & IE) don't trigger a click on a flash swf, but do
  // trigger mousedown/up.
  // http://stackoverflow.com/questions/1444562/javascript-onclick-event-over-flash-object
  // Any touch events are set to block the mousedown event from happening
  this.on('mousedown', this.onClick);

  // If the controls were hidden we don't want that to change without a tap event
  // so we'll check if the controls were already showing before reporting user
  // activity
  this.on('touchstart', function(event) {
    // Stop the mouse events from also happening
    event.preventDefault();
    userWasActive = this.player_.userActive();
  });

  this.on('touchmove', function(event) {
    if (userWasActive){
      this.player().reportUserActivity();
    }
  });

  // Turn on component tap events
  this.emitTapEvents();

  // The tap listener needs to come after the touchend listener because the tap
  // listener cancels out any reportedUserActivity when setting userActive(false)
  this.on('tap', this.onTap);
};

/**
 * Remove the listeners used for click and tap controls. This is needed for
 * toggling to controls disabled, where a tap/touch should do nothing.
 */
vjs.MediaTechController.prototype.removeControlsListeners = function(){
  // We don't want to just use `this.off()` because there might be other needed
  // listeners added by techs that extend this.
  this.off('tap');
  this.off('touchstart');
  this.off('touchmove');
  this.off('touchleave');
  this.off('touchcancel');
  this.off('touchend');
  this.off('click');
  this.off('mousedown');
};

/**
 * Handle a click on the media element. By default will play/pause the media.
 */
vjs.MediaTechController.prototype.onClick = function(event){
  // We're using mousedown to detect clicks thanks to Flash, but mousedown
  // will also be triggered with right-clicks, so we need to prevent that
  if (event.button !== 0) return;

  // When controls are disabled a click should not toggle playback because
  // the click is considered a control
  if (this.player().controls()) {
    if (this.player().paused()) {
      this.player().play();
    } else {
      this.player().pause();
    }
  }
};

/**
 * Handle a tap on the media element. By default it will toggle the user
 * activity state, which hides and shows the controls.
 */
vjs.MediaTechController.prototype.onTap = function(){
  this.player().userActive(!this.player().userActive());
};

/**
 * Provide a default setPoster method for techs
 *
 * Poster support for techs should be optional, so we don't want techs to
 * break if they don't have a way to set a poster.
 */
vjs.MediaTechController.prototype.setPoster = function(){};

vjs.MediaTechController.prototype.features = {
  'volumeControl': true,

  // Resizing plugins using request fullscreen reloads the plugin
  'fullscreenResize': false,
  'playbackRate': false,

  // Optional events that we can manually mimic with timers
  // currently not triggered by video-js-swf
  'progressEvents': false,
  'timeupdateEvents': false
};

vjs.media = {};
/**
 * @fileoverview HTML5 Media Controller - Wrapper for HTML5 Media API
 */

/**
 * HTML5 Media Controller - Wrapper for HTML5 Media API
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */
vjs.Html5 = vjs.MediaTechController.extend({
  /** @constructor */
  init: function(player, options, ready){
    // volume cannot be changed from 1 on iOS
    this.features['volumeControl'] = vjs.Html5.canControlVolume();

    // just in case; or is it excessively...
    this.features['playbackRate'] = vjs.Html5.canControlPlaybackRate();

    // In iOS, if you move a video element in the DOM, it breaks video playback.
    this.features['movingMediaElementInDOM'] = !vjs.IS_IOS;

    // HTML video is able to automatically resize when going to fullscreen
    this.features['fullscreenResize'] = true;

    vjs.MediaTechController.call(this, player, options, ready);
    this.setupTriggers();

    var source = options['source'];

    // set the source if one was provided
    if (source && this.el_.currentSrc !== source.src) {
      this.el_.src = source.src;
    }

    // Determine if native controls should be used
    // Our goal should be to get the custom controls on mobile solid everywhere
    // so we can remove this all together. Right now this will block custom
    // controls on touch enabled laptops like the Chrome Pixel
    if (vjs.TOUCH_ENABLED && player.options()['nativeControlsForTouch'] !== false) {
      this.useNativeControls();
    }

    // Chrome and Safari both have issues with autoplay.
    // In Safari (5.1.1), when we move the video element into the container div, autoplay doesn't work.
    // In Chrome (15), if you have autoplay + a poster + no controls, the video gets hidden (but audio plays)
    // This fixes both issues. Need to wait for API, so it updates displays correctly
    player.ready(function(){
      if (this.tag && this.options_['autoplay'] && this.paused()) {
        delete this.tag['poster']; // Chrome Fix. Fixed in Chrome v16.
        this.play();
      }
    });

    this.triggerReady();
  }
});

vjs.Html5.prototype.dispose = function(){
  vjs.MediaTechController.prototype.dispose.call(this);
};

vjs.Html5.prototype.createEl = function(){
  var player = this.player_,
      // If possible, reuse original tag for HTML5 playback technology element
      el = player.tag,
      newEl,
      clone;

  // Check if this browser supports moving the element into the box.
  // On the iPhone video will break if you move the element,
  // So we have to create a brand new element.
  if (!el || this.features['movingMediaElementInDOM'] === false) {

    // If the original tag is still there, clone and remove it.
    if (el) {
      clone = el.cloneNode(false);
      vjs.Html5.disposeMediaElement(el);
      el = clone;
      player.tag = null;
    } else {
      el = vjs.createEl('video', {
        id:player.id() + '_html5_api',
        className:'vjs-tech'
      });
    }
    // associate the player with the new tag
    el['player'] = player;

    vjs.insertFirst(el, player.el());
  }

  // Update specific tag settings, in case they were overridden
  var attrs = ['autoplay','preload','loop','muted'];
  for (var i = attrs.length - 1; i >= 0; i--) {
    var attr = attrs[i];
    if (player.options_[attr] !== null) {
      el[attr] = player.options_[attr];
    }
  }

  return el;
  // jenniisawesome = true;
};

// Make video events trigger player events
// May seem verbose here, but makes other APIs possible.
// Triggers removed using this.off when disposed
vjs.Html5.prototype.setupTriggers = function(){
  for (var i = vjs.Html5.Events.length - 1; i >= 0; i--) {
    vjs.on(this.el_, vjs.Html5.Events[i], vjs.bind(this, this.eventHandler));
  }
};

vjs.Html5.prototype.eventHandler = function(evt){
  // In the case of an error, set the error prop on the player
  // and let the player handle triggering the event.
  if (evt.type == 'error') {
    this.player().error(this.error().code);

  // in some cases we pass the event directly to the player
  } else {
    // No need for media events to bubble up.
    evt.bubbles = false;

    this.player().trigger(evt);
  }
};

vjs.Html5.prototype.useNativeControls = function(){
  var tech, player, controlsOn, controlsOff, cleanUp;

  tech = this;
  player = this.player();

  // If the player controls are enabled turn on the native controls
  tech.setControls(player.controls());

  // Update the native controls when player controls state is updated
  controlsOn = function(){
    tech.setControls(true);
  };
  controlsOff = function(){
    tech.setControls(false);
  };
  player.on('controlsenabled', controlsOn);
  player.on('controlsdisabled', controlsOff);

  // Clean up when not using native controls anymore
  cleanUp = function(){
    player.off('controlsenabled', controlsOn);
    player.off('controlsdisabled', controlsOff);
  };
  tech.on('dispose', cleanUp);
  player.on('usingcustomcontrols', cleanUp);

  // Update the state of the player to using native controls
  player.usingNativeControls(true);
};


vjs.Html5.prototype.play = function(){ this.el_.play(); };
vjs.Html5.prototype.pause = function(){ this.el_.pause(); };
vjs.Html5.prototype.paused = function(){ return this.el_.paused; };

vjs.Html5.prototype.currentTime = function(){ return this.el_.currentTime; };
vjs.Html5.prototype.setCurrentTime = function(seconds){
  try {
    this.el_.currentTime = seconds;
  } catch(e) {
    vjs.log(e, 'Video is not ready. (Video.js)');
    // this.warning(VideoJS.warnings.videoNotReady);
  }
};

vjs.Html5.prototype.duration = function(){ return this.el_.duration || 0; };
vjs.Html5.prototype.buffered = function(){ return this.el_.buffered; };

vjs.Html5.prototype.volume = function(){ return this.el_.volume; };
vjs.Html5.prototype.setVolume = function(percentAsDecimal){ this.el_.volume = percentAsDecimal; };
vjs.Html5.prototype.muted = function(){ return this.el_.muted; };
vjs.Html5.prototype.setMuted = function(muted){ this.el_.muted = muted; };

vjs.Html5.prototype.width = function(){ return this.el_.offsetWidth; };
vjs.Html5.prototype.height = function(){ return this.el_.offsetHeight; };

vjs.Html5.prototype.supportsFullScreen = function(){
  if (typeof this.el_.webkitEnterFullScreen == 'function') {

    // Seems to be broken in Chromium/Chrome && Safari in Leopard
    if (/Android/.test(vjs.USER_AGENT) || !/Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT)) {
      return true;
    }
  }
  return false;
};

vjs.Html5.prototype.enterFullScreen = function(){
  var video = this.el_;
  if (video.paused && video.networkState <= video.HAVE_METADATA) {
    // attempt to prime the video element for programmatic access
    // this isn't necessary on the desktop but shouldn't hurt
    this.el_.play();

    // playing and pausing synchronously during the transition to fullscreen
    // can get iOS ~6.1 devices into a play/pause loop
    setTimeout(function(){
      video.pause();
      video.webkitEnterFullScreen();
    }, 0);
  } else {
    video.webkitEnterFullScreen();
  }
};
vjs.Html5.prototype.exitFullScreen = function(){
  this.el_.webkitExitFullScreen();
};
vjs.Html5.prototype.src = function(src){ this.el_.src = src; };
vjs.Html5.prototype.load = function(){ this.el_.load(); };
vjs.Html5.prototype.currentSrc = function(){ return this.el_.currentSrc; };

vjs.Html5.prototype.poster = function(){ return this.el_.poster; };
vjs.Html5.prototype.setPoster = function(val){ this.el_.poster = val; };

vjs.Html5.prototype.preload = function(){ return this.el_.preload; };
vjs.Html5.prototype.setPreload = function(val){ this.el_.preload = val; };

vjs.Html5.prototype.autoplay = function(){ return this.el_.autoplay; };
vjs.Html5.prototype.setAutoplay = function(val){ this.el_.autoplay = val; };

vjs.Html5.prototype.controls = function(){ return this.el_.controls; };
vjs.Html5.prototype.setControls = function(val){ this.el_.controls = !!val; };

vjs.Html5.prototype.loop = function(){ return this.el_.loop; };
vjs.Html5.prototype.setLoop = function(val){ this.el_.loop = val; };

vjs.Html5.prototype.error = function(){ return this.el_.error; };
vjs.Html5.prototype.seeking = function(){ return this.el_.seeking; };
vjs.Html5.prototype.ended = function(){ return this.el_.ended; };
vjs.Html5.prototype.defaultMuted = function(){ return this.el_.defaultMuted; };

vjs.Html5.prototype.playbackRate = function(){ return this.el_.playbackRate; };
vjs.Html5.prototype.setPlaybackRate = function(val){ this.el_.playbackRate = val; };

vjs.Html5.prototype.networkState = function(){ return this.el_.networkState; };

/* HTML5 Support Testing ---------------------------------------------------- */

vjs.Html5.isSupported = function(){
  // ie9 with no Media Player is a LIAR! (#984)
  try {
    vjs.TEST_VID['volume'] = 0.5;
  } catch (e) {
    return false;
  }

  return !!vjs.TEST_VID.canPlayType;
};

vjs.Html5.canPlaySource = function(srcObj){
  // IE9 on Windows 7 without MediaPlayer throws an error here
  // https://github.com/videojs/video.js/issues/519
  try {
    return !!vjs.TEST_VID.canPlayType(srcObj.type);
  } catch(e) {
    return '';
  }
  // TODO: Check Type
  // If no Type, check ext
  // Check Media Type
};

vjs.Html5.canControlVolume = function(){
  var volume =  vjs.TEST_VID.volume;
  vjs.TEST_VID.volume = (volume / 2) + 0.1;
  return volume !== vjs.TEST_VID.volume;
};

vjs.Html5.canControlPlaybackRate = function(){
  var playbackRate =  vjs.TEST_VID.playbackRate;
  vjs.TEST_VID.playbackRate = (playbackRate / 2) + 0.1;
  return playbackRate !== vjs.TEST_VID.playbackRate;
};

// HTML5 Feature detection and Device Fixes --------------------------------- //
(function() {
  var canPlayType,
      mpegurlRE = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
      mp4RE = /^video\/mp4/i;

  vjs.Html5.patchCanPlayType = function() {
    // Android 4.0 and above can play HLS to some extent but it reports being unable to do so
    if (vjs.ANDROID_VERSION >= 4.0) {
      if (!canPlayType) {
        canPlayType = vjs.TEST_VID.constructor.prototype.canPlayType;
      }

      vjs.TEST_VID.constructor.prototype.canPlayType = function(type) {
        if (type && mpegurlRE.test(type)) {
          return 'maybe';
        }
        return canPlayType.call(this, type);
      };
    }

    // Override Android 2.2 and less canPlayType method which is broken
    if (vjs.IS_OLD_ANDROID) {
      if (!canPlayType) {
        canPlayType = vjs.TEST_VID.constructor.prototype.canPlayType;
      }

      vjs.TEST_VID.constructor.prototype.canPlayType = function(type){
        if (type && mp4RE.test(type)) {
          return 'maybe';
        }
        return canPlayType.call(this, type);
      };
    }
  };

  vjs.Html5.unpatchCanPlayType = function() {
    var r = vjs.TEST_VID.constructor.prototype.canPlayType;
    vjs.TEST_VID.constructor.prototype.canPlayType = canPlayType;
    canPlayType = null;
    return r;
  };

  // by default, patch the video element
  vjs.Html5.patchCanPlayType();
})();

// List of all HTML5 events (various uses).
vjs.Html5.Events = 'loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange'.split(',');

vjs.Html5.disposeMediaElement = function(el){
  if (!el) { return; }

  el['player'] = null;

  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }

  // remove any child track or source nodes to prevent their loading
  while(el.hasChildNodes()) {
    el.removeChild(el.firstChild);
  }

  // remove any src reference. not setting `src=''` because that causes a warning
  // in firefox
  el.removeAttribute('src');

  // force the media element to update its loading state by calling load()
  // however IE on Windows 7N has a bug that throws an error so need a try/catch (#793)
  if (typeof el.load === 'function') {
    // wrapping in an iife so it's not deoptimized (#1060#discussion_r10324473)
    (function() {
      try {
        el.load();
      } catch (e) {
        // not supported
      }
    })();
  }
};
/**
 * @fileoverview VideoJS-SWF - Custom Flash Player with HTML5-ish API
 * https://github.com/zencoder/video-js-swf
 * Not using setupTriggers. Using global onEvent func to distribute events
 */

/**
 * Flash Media Controller - Wrapper for fallback SWF API
 *
 * @param {vjs.Player} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */
vjs.Flash = vjs.MediaTechController.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.MediaTechController.call(this, player, options, ready);

    var source = options['source'],

        // Which element to embed in
        parentEl = options['parentEl'],

        // Create a temporary element to be replaced by swf object
        placeHolder = this.el_ = vjs.createEl('div', { id: player.id() + '_temp_flash' }),

        // Generate ID for swf object
        objId = player.id()+'_flash_api',

        // Store player options in local var for optimization
        // TODO: switch to using player methods instead of options
        // e.g. player.autoplay();
        playerOptions = player.options_,

        // Merge default flashvars with ones passed in to init
        flashVars = vjs.obj.merge({

          // SWF Callback Functions
          'readyFunction': 'videojs.Flash.onReady',
          'eventProxyFunction': 'videojs.Flash.onEvent',
          'errorEventProxyFunction': 'videojs.Flash.onError',

          // Player Settings
          'autoplay': playerOptions.autoplay,
          'preload': playerOptions.preload,
          'loop': playerOptions.loop,
          'muted': playerOptions.muted

        }, options['flashVars']),

        // Merge default parames with ones passed in
        params = vjs.obj.merge({
          'wmode': 'opaque', // Opaque is needed to overlay controls, but can affect playback performance
          'bgcolor': '#000000' // Using bgcolor prevents a white flash when the object is loading
        }, options['params']),

        // Merge default attributes with ones passed in
        attributes = vjs.obj.merge({
          'id': objId,
          'name': objId, // Both ID and Name needed or swf to identifty itself
          'class': 'vjs-tech'
        }, options['attributes']),

        lastSeekTarget
    ;

    // If source was supplied pass as a flash var.
    if (source) {
      if (source.type && vjs.Flash.isStreamingType(source.type)) {
        var parts = vjs.Flash.streamToParts(source.src);
        flashVars['rtmpConnection'] = encodeURIComponent(parts.connection);
        flashVars['rtmpStream'] = encodeURIComponent(parts.stream);
      }
      else {
        flashVars['src'] = encodeURIComponent(vjs.getAbsoluteURL(source.src));
      }
    }

    this['setCurrentTime'] = function(time){
      lastSeekTarget = time;
      this.el_.vjs_setProperty('currentTime', time);
    };
    this['currentTime'] = function(time){
      // when seeking make the reported time keep up with the requested time
      // by reading the time we're seeking to
      if (this.seeking()) {
        return lastSeekTarget;
      }
      return this.el_.vjs_getProperty('currentTime');
    };

    // Add placeholder to player div
    vjs.insertFirst(placeHolder, parentEl);

    // Having issues with Flash reloading on certain page actions (hide/resize/fullscreen) in certain browsers
    // This allows resetting the playhead when we catch the reload
    if (options['startTime']) {
      this.ready(function(){
        this.load();
        this.play();
        this.currentTime(options['startTime']);
      });
    }

    // firefox doesn't bubble mousemove events to parent. videojs/video-js-swf#37
    // bugzilla bug: https://bugzilla.mozilla.org/show_bug.cgi?id=836786
    if (vjs.IS_FIREFOX) {
      this.ready(function(){
        vjs.on(this.el(), 'mousemove', vjs.bind(this, function(){
          // since it's a custom event, don't bubble higher than the player
          this.player().trigger({ 'type':'mousemove', 'bubbles': false });
        }));
      });
    }

    // Flash iFrame Mode
    // In web browsers there are multiple instances where changing the parent element or visibility of a plugin causes the plugin to reload.
    // - Firefox just about always. https://bugzilla.mozilla.org/show_bug.cgi?id=90268 (might be fixed by version 13)
    // - Webkit when hiding the plugin
    // - Webkit and Firefox when using requestFullScreen on a parent element
    // Loading the flash plugin into a dynamically generated iFrame gets around most of these issues.
    // Issues that remain include hiding the element and requestFullScreen in Firefox specifically

    // There's on particularly annoying issue with this method which is that Firefox throws a security error on an offsite Flash object loaded into a dynamically created iFrame.
    // Even though the iframe was inserted into a page on the web, Firefox + Flash considers it a local app trying to access an internet file.
    // I tried mulitple ways of setting the iframe src attribute but couldn't find a src that worked well. Tried a real/fake source, in/out of domain.
    // Also tried a method from stackoverflow that caused a security error in all browsers. http://stackoverflow.com/questions/2486901/how-to-set-document-domain-for-a-dynamically-generated-iframe
    // In the end the solution I found to work was setting the iframe window.location.href right before doing a document.write of the Flash object.
    // The only downside of this it seems to trigger another http request to the original page (no matter what's put in the href). Not sure why that is.

    // NOTE (2012-01-29): Cannot get Firefox to load the remote hosted SWF into a dynamically created iFrame
    // Firefox 9 throws a security error, unleess you call location.href right before doc.write.
    //    Not sure why that even works, but it causes the browser to look like it's continuously trying to load the page.
    // Firefox 3.6 keeps calling the iframe onload function anytime I write to it, causing an endless loop.

    if (options['iFrameMode'] === true && !vjs.IS_FIREFOX) {

      // Create iFrame with vjs-tech class so it's 100% width/height
      var iFrm = vjs.createEl('iframe', {
        'id': objId + '_iframe',
        'name': objId + '_iframe',
        'className': 'vjs-tech',
        'scrolling': 'no',
        'marginWidth': 0,
        'marginHeight': 0,
        'frameBorder': 0
      });

      // Update ready function names in flash vars for iframe window
      flashVars['readyFunction'] = 'ready';
      flashVars['eventProxyFunction'] = 'events';
      flashVars['errorEventProxyFunction'] = 'errors';

      // Tried multiple methods to get this to work in all browsers

      // Tried embedding the flash object in the page first, and then adding a place holder to the iframe, then replacing the placeholder with the page object.
      // The goal here was to try to load the swf URL in the parent page first and hope that got around the firefox security error
      // var newObj = vjs.Flash.embed(options['swf'], placeHolder, flashVars, params, attributes);
      // (in onload)
      //  var temp = vjs.createEl('a', { id:'asdf', innerHTML: 'asdf' } );
      //  iDoc.body.appendChild(temp);

      // Tried embedding the flash object through javascript in the iframe source.
      // This works in webkit but still triggers the firefox security error
      // iFrm.src = 'javascript: document.write('"+vjs.Flash.getEmbedCode(options['swf'], flashVars, params, attributes)+"');";

      // Tried an actual local iframe just to make sure that works, but it kills the easiness of the CDN version if you require the user to host an iframe
      // We should add an option to host the iframe locally though, because it could help a lot of issues.
      // iFrm.src = "iframe.html";

      // Wait until iFrame has loaded to write into it.
      vjs.on(iFrm, 'load', vjs.bind(this, function(){

        var iDoc,
            iWin = iFrm.contentWindow;

        // The one working method I found was to use the iframe's document.write() to create the swf object
        // This got around the security issue in all browsers except firefox.
        // I did find a hack where if I call the iframe's window.location.href='', it would get around the security error
        // However, the main page would look like it was loading indefinitely (URL bar loading spinner would never stop)
        // Plus Firefox 3.6 didn't work no matter what I tried.
        // if (vjs.USER_AGENT.match('Firefox')) {
        //   iWin.location.href = '';
        // }

        // Get the iFrame's document depending on what the browser supports
        iDoc = iFrm.contentDocument ? iFrm.contentDocument : iFrm.contentWindow.document;

        // Tried ensuring both document domains were the same, but they already were, so that wasn't the issue.
        // Even tried adding /. that was mentioned in a browser security writeup
        // document.domain = document.domain+'/.';
        // iDoc.domain = document.domain+'/.';

        // Tried adding the object to the iframe doc's innerHTML. Security error in all browsers.
        // iDoc.body.innerHTML = swfObjectHTML;

        // Tried appending the object to the iframe doc's body. Security error in all browsers.
        // iDoc.body.appendChild(swfObject);

        // Using document.write actually got around the security error that browsers were throwing.
        // Again, it's a dynamically generated (same domain) iframe, loading an external Flash swf.
        // Not sure why that's a security issue, but apparently it is.
        iDoc.write(vjs.Flash.getEmbedCode(options['swf'], flashVars, params, attributes));

        // Setting variables on the window needs to come after the doc write because otherwise they can get reset in some browsers
        // So far no issues with swf ready event being called before it's set on the window.
        iWin['player'] = this.player_;

        // Create swf ready function for iFrame window
        iWin['ready'] = vjs.bind(this.player_, function(currSwf){
          var el = iDoc.getElementById(currSwf),
              player = this,
              tech = player.tech;

          // Update reference to playback technology element
          tech.el_ = el;

          // Make sure swf is actually ready. Sometimes the API isn't actually yet.
          vjs.Flash.checkReady(tech);
        });

        // Create event listener for all swf events
        iWin['events'] = vjs.bind(this.player_, function(swfID, eventName){
          var player = this;
          if (player && player.techName === 'flash') {
            player.trigger(eventName);
          }
        });

        // Create error listener for all swf errors
        iWin['errors'] = vjs.bind(this.player_, function(swfID, eventName){
          vjs.log('Flash Error', eventName);
        });

      }));

      // Replace placeholder with iFrame (it will load now)
      placeHolder.parentNode.replaceChild(iFrm, placeHolder);

    // If not using iFrame mode, embed as normal object
    } else {
      vjs.Flash.embed(options['swf'], placeHolder, flashVars, params, attributes);
    }
  }
});

vjs.Flash.prototype.dispose = function(){
  vjs.MediaTechController.prototype.dispose.call(this);
};

vjs.Flash.prototype.play = function(){
  this.el_.vjs_play();
};

vjs.Flash.prototype.pause = function(){
  this.el_.vjs_pause();
};

vjs.Flash.prototype.src = function(src){
  if (src === undefined) {
    return this.currentSrc();
  }

  if (vjs.Flash.isStreamingSrc(src)) {
    src = vjs.Flash.streamToParts(src);
    this.setRtmpConnection(src.connection);
    this.setRtmpStream(src.stream);
  } else {
    // Make sure source URL is abosolute.
    src = vjs.getAbsoluteURL(src);
    this.el_.vjs_src(src);
  }

  // Currently the SWF doesn't autoplay if you load a source later.
  // e.g. Load player w/ no source, wait 2s, set src.
  if (this.player_.autoplay()) {
    var tech = this;
    setTimeout(function(){ tech.play(); }, 0);
  }
};

vjs.Flash.prototype.currentSrc = function(){
  var src = this.el_.vjs_getProperty('currentSrc');
  // no src, check and see if RTMP
  if (src == null) {
    var connection = this['rtmpConnection'](),
        stream = this['rtmpStream']();

    if (connection && stream) {
      src = vjs.Flash.streamFromParts(connection, stream);
    }
  }
  return src;
};

vjs.Flash.prototype.load = function(){
  this.el_.vjs_load();
};

vjs.Flash.prototype.poster = function(){
  this.el_.vjs_getProperty('poster');
};
vjs.Flash.prototype.setPoster = function(){
  // poster images are not handled by the Flash tech so make this a no-op
};

vjs.Flash.prototype.buffered = function(){
  return vjs.createTimeRange(0, this.el_.vjs_getProperty('buffered'));
};

vjs.Flash.prototype.supportsFullScreen = function(){
  return false; // Flash does not allow fullscreen through javascript
};

vjs.Flash.prototype.enterFullScreen = function(){
  return false;
};

// Create setters and getters for attributes
var api = vjs.Flash.prototype,
    readWrite = 'rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted'.split(','),
    readOnly = 'error,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks'.split(',');
    // Overridden: buffered, currentTime, currentSrc

/**
 * @this {*}
 * @private
 */
var createSetter = function(attr){
  var attrUpper = attr.charAt(0).toUpperCase() + attr.slice(1);
  api['set'+attrUpper] = function(val){ return this.el_.vjs_setProperty(attr, val); };
};

/**
 * @this {*}
 * @private
 */
var createGetter = function(attr){
  api[attr] = function(){ return this.el_.vjs_getProperty(attr); };
};

(function(){
  var i;
  // Create getter and setters for all read/write attributes
  for (i = 0; i < readWrite.length; i++) {
    createGetter(readWrite[i]);
    createSetter(readWrite[i]);
  }

  // Create getters for read-only attributes
  for (i = 0; i < readOnly.length; i++) {
    createGetter(readOnly[i]);
  }
})();

/* Flash Support Testing -------------------------------------------------------- */

vjs.Flash.isSupported = function(){
  return vjs.Flash.version()[0] >= 10;
  // return swfobject.hasFlashPlayerVersion('10');
};

vjs.Flash.canPlaySource = function(srcObj){
  var type;

  if (!srcObj.type) {
    return '';
  }

  type = srcObj.type.replace(/;.*/,'').toLowerCase();
  if (type in vjs.Flash.formats || type in vjs.Flash.streamingFormats) {
    return 'maybe';
  }
};

vjs.Flash.formats = {
  'video/flv': 'FLV',
  'video/x-flv': 'FLV',
  'video/mp4': 'MP4',
  'video/m4v': 'MP4'
};

vjs.Flash.streamingFormats = {
  'rtmp/mp4': 'MP4',
  'rtmp/flv': 'FLV'
};

vjs.Flash['onReady'] = function(currSwf){
  var el = vjs.el(currSwf);

  // Get player from box
  // On firefox reloads, el might already have a player
  var player = el['player'] || el.parentNode['player'],
      tech = player.tech;

  // Reference player on tech element
  el['player'] = player;

  // Update reference to playback technology element
  tech.el_ = el;

  vjs.Flash.checkReady(tech);
};

// The SWF isn't alwasy ready when it says it is. Sometimes the API functions still need to be added to the object.
// If it's not ready, we set a timeout to check again shortly.
vjs.Flash.checkReady = function(tech){

  // Check if API property exists
  if (tech.el().vjs_getProperty) {

    // If so, tell tech it's ready
    tech.triggerReady();

  // Otherwise wait longer.
  } else {

    setTimeout(function(){
      vjs.Flash.checkReady(tech);
    }, 50);

  }
};

// Trigger events from the swf on the player
vjs.Flash['onEvent'] = function(swfID, eventName){
  var player = vjs.el(swfID)['player'];
  player.trigger(eventName);
};

// Log errors from the swf
vjs.Flash['onError'] = function(swfID, err){
  var player = vjs.el(swfID)['player'];
  var msg = 'FLASH: '+err;

  if (err == 'srcnotfound') {
    player.error({ code: 4, message: msg });

  // errors we haven't categorized into the media errors
  } else {
    player.error(msg);
  }
};

// Flash Version Check
vjs.Flash.version = function(){
  var version = '0,0,0';

  // IE
  try {
    version = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];

  // other browsers
  } catch(e) {
    try {
      if (navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin){
        version = (navigator.plugins['Shockwave Flash 2.0'] || navigator.plugins['Shockwave Flash']).description.replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
      }
    } catch(err) {}
  }
  return version.split(',');
};

// Flash embedding method. Only used in non-iframe mode
vjs.Flash.embed = function(swf, placeHolder, flashVars, params, attributes){
  var code = vjs.Flash.getEmbedCode(swf, flashVars, params, attributes),

      // Get element by embedding code and retrieving created element
      obj = vjs.createEl('div', { innerHTML: code }).childNodes[0],

      par = placeHolder.parentNode
  ;

  placeHolder.parentNode.replaceChild(obj, placeHolder);

  // IE6 seems to have an issue where it won't initialize the swf object after injecting it.
  // This is a dumb fix
  var newObj = par.childNodes[0];
  setTimeout(function(){
    newObj.style.display = 'block';
  }, 1000);

  return obj;

};

vjs.Flash.getEmbedCode = function(swf, flashVars, params, attributes){

  var objTag = '<object type="application/x-shockwave-flash"',
      flashVarsString = '',
      paramsString = '',
      attrsString = '';

  // Convert flash vars to string
  if (flashVars) {
    vjs.obj.each(flashVars, function(key, val){
      flashVarsString += (key + '=' + val + '&amp;');
    });
  }

  // Add swf, flashVars, and other default params
  params = vjs.obj.merge({
    'movie': swf,
    'flashvars': flashVarsString,
    'allowScriptAccess': 'always', // Required to talk to swf
    'allowNetworking': 'all' // All should be default, but having security issues.
  }, params);

  // Create param tags string
  vjs.obj.each(params, function(key, val){
    paramsString += '<param name="'+key+'" value="'+val+'" />';
  });

  attributes = vjs.obj.merge({
    // Add swf to attributes (need both for IE and Others to work)
    'data': swf,

    // Default to 100% width/height
    'width': '100%',
    'height': '100%'

  }, attributes);

  // Create Attributes string
  vjs.obj.each(attributes, function(key, val){
    attrsString += (key + '="' + val + '" ');
  });

  return objTag + attrsString + '>' + paramsString + '</object>';
};

vjs.Flash.streamFromParts = function(connection, stream) {
  return connection + '&' + stream;
};

vjs.Flash.streamToParts = function(src) {
  var parts = {
    connection: '',
    stream: ''
  };

  if (! src) {
    return parts;
  }

  // Look for the normal URL separator we expect, '&'.
  // If found, we split the URL into two pieces around the
  // first '&'.
  var connEnd = src.indexOf('&');
  var streamBegin;
  if (connEnd !== -1) {
    streamBegin = connEnd + 1;
  }
  else {
    // If there's not a '&', we use the last '/' as the delimiter.
    connEnd = streamBegin = src.lastIndexOf('/') + 1;
    if (connEnd === 0) {
      // really, there's not a '/'?
      connEnd = streamBegin = src.length;
    }
  }
  parts.connection = src.substring(0, connEnd);
  parts.stream = src.substring(streamBegin, src.length);

  return parts;
};

vjs.Flash.isStreamingType = function(srcType) {
  return srcType in vjs.Flash.streamingFormats;
};

// RTMP has four variations, any string starting
// with one of these protocols should be valid
vjs.Flash.RTMP_RE = /^rtmp[set]?:\/\//i;

vjs.Flash.isStreamingSrc = function(src) {
  return vjs.Flash.RTMP_RE.test(src);
};
/**
 * The Media Loader is the component that decides which playback technology to load
 * when the player is initialized.
 *
 * @constructor
 */
vjs.MediaLoader = vjs.Component.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.Component.call(this, player, options, ready);

    // If there are no sources when the player is initialized,
    // load the first supported playback technology.
    if (!player.options_['sources'] || player.options_['sources'].length === 0) {
      for (var i=0,j=player.options_['techOrder']; i<j.length; i++) {
        var techName = vjs.capitalize(j[i]),
            tech = window['videojs'][techName];

        // Check if the browser supports this technology
        if (tech && tech.isSupported()) {
          player.loadTech(techName);
          break;
        }
      }
    } else {
      // // Loop through playback technologies (HTML5, Flash) and check for support.
      // // Then load the best source.
      // // A few assumptions here:
      // //   All playback technologies respect preload false.
      player.src(player.options_['sources']);
    }
  }
});
/**
 * @fileoverview Text Tracks
 * Text tracks are tracks of timed text events.
 * Captions - text displayed over the video for the hearing impared
 * Subtitles - text displayed over the video for those who don't understand langauge in the video
 * Chapters - text displayed in a menu allowing the user to jump to particular points (chapters) in the video
 * Descriptions (not supported yet) - audio descriptions that are read back to the user by a screen reading device
 */

// Player Additions - Functions add to the player object for easier access to tracks

/**
 * List of associated text tracks
 * @type {Array}
 * @private
 */
vjs.Player.prototype.textTracks_;

/**
 * Get an array of associated text tracks. captions, subtitles, chapters, descriptions
 * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-texttracks
 * @return {Array}           Array of track objects
 * @private
 */
vjs.Player.prototype.textTracks = function(){
  this.textTracks_ = this.textTracks_ || [];
  return this.textTracks_;
};

/**
 * Add a text track
 * In addition to the W3C settings we allow adding additional info through options.
 * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-addtexttrack
 * @param {String}  kind        Captions, subtitles, chapters, descriptions, or metadata
 * @param {String=} label       Optional label
 * @param {String=} language    Optional language
 * @param {Object=} options     Additional track options, like src
 * @private
 */
vjs.Player.prototype.addTextTrack = function(kind, label, language, options){
  var tracks = this.textTracks_ = this.textTracks_ || [];
  options = options || {};

  options['kind'] = kind;
  options['label'] = label;
  options['language'] = language;

  // HTML5 Spec says default to subtitles.
  // Uppercase first letter to match class names
  var Kind = vjs.capitalize(kind || 'subtitles');

  // Create correct texttrack class. CaptionsTrack, etc.
  var track = new window['videojs'][Kind + 'Track'](this, options);

  tracks.push(track);

  // If track.dflt() is set, start showing immediately
  // TODO: Add a process to deterime the best track to show for the specific kind
  // Incase there are mulitple defaulted tracks of the same kind
  // Or the user has a set preference of a specific language that should override the default
  // Note: The setTimeout is a workaround because with the html5 tech, the player is 'ready'
 //  before it's child components (including the textTrackDisplay) have finished loading.
  if (track.dflt()) {
    this.ready(function(){
      setTimeout(function(){
        track.show();
      }, 0);
    });
  }

  return track;
};

/**
 * Add an array of text tracks. captions, subtitles, chapters, descriptions
 * Track objects will be stored in the player.textTracks() array
 * @param {Array} trackList Array of track elements or objects (fake track elements)
 * @private
 */
vjs.Player.prototype.addTextTracks = function(trackList){
  var trackObj;

  for (var i = 0; i < trackList.length; i++) {
    trackObj = trackList[i];
    this.addTextTrack(trackObj['kind'], trackObj['label'], trackObj['language'], trackObj);
  }

  return this;
};

// Show a text track
// disableSameKind: disable all other tracks of the same kind. Value should be a track kind (captions, etc.)
vjs.Player.prototype.showTextTrack = function(id, disableSameKind){
  var tracks = this.textTracks_,
      i = 0,
      j = tracks.length,
      track, showTrack, kind;

  // Find Track with same ID
  for (;i<j;i++) {
    track = tracks[i];
    if (track.id() === id) {
      track.show();
      showTrack = track;

    // Disable tracks of the same kind
    } else if (disableSameKind && track.kind() == disableSameKind && track.mode() > 0) {
      track.disable();
    }
  }

  // Get track kind from shown track or disableSameKind
  kind = (showTrack) ? showTrack.kind() : ((disableSameKind) ? disableSameKind : false);

  // Trigger trackchange event, captionstrackchange, subtitlestrackchange, etc.
  if (kind) {
    this.trigger(kind+'trackchange');
  }

  return this;
};

/**
 * The base class for all text tracks
 *
 * Handles the parsing, hiding, and showing of text track cues
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.TextTrack = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    // Apply track info to track object
    // Options will often be a track element

    // Build ID if one doesn't exist
    this.id_ = options['id'] || ('vjs_' + options['kind'] + '_' + options['language'] + '_' + vjs.guid++);
    this.src_ = options['src'];
    // 'default' is a reserved keyword in js so we use an abbreviated version
    this.dflt_ = options['default'] || options['dflt'];
    this.title_ = options['title'];
    this.language_ = options['srclang'];
    this.label_ = options['label'];
    this.cues_ = [];
    this.activeCues_ = [];
    this.readyState_ = 0;
    this.mode_ = 0;

    this.player_.on('fullscreenchange', vjs.bind(this, this.adjustFontSize));
  }
});

/**
 * Track kind value. Captions, subtitles, etc.
 * @private
 */
vjs.TextTrack.prototype.kind_;

/**
 * Get the track kind value
 * @return {String}
 */
vjs.TextTrack.prototype.kind = function(){
  return this.kind_;
};

/**
 * Track src value
 * @private
 */
vjs.TextTrack.prototype.src_;

/**
 * Get the track src value
 * @return {String}
 */
vjs.TextTrack.prototype.src = function(){
  return this.src_;
};

/**
 * Track default value
 * If default is used, subtitles/captions to start showing
 * @private
 */
vjs.TextTrack.prototype.dflt_;

/**
 * Get the track default value. ('default' is a reserved keyword)
 * @return {Boolean}
 */
vjs.TextTrack.prototype.dflt = function(){
  return this.dflt_;
};

/**
 * Track title value
 * @private
 */
vjs.TextTrack.prototype.title_;

/**
 * Get the track title value
 * @return {String}
 */
vjs.TextTrack.prototype.title = function(){
  return this.title_;
};

/**
 * Language - two letter string to represent track language, e.g. 'en' for English
 * Spec def: readonly attribute DOMString language;
 * @private
 */
vjs.TextTrack.prototype.language_;

/**
 * Get the track language value
 * @return {String}
 */
vjs.TextTrack.prototype.language = function(){
  return this.language_;
};

/**
 * Track label e.g. 'English'
 * Spec def: readonly attribute DOMString label;
 * @private
 */
vjs.TextTrack.prototype.label_;

/**
 * Get the track label value
 * @return {String}
 */
vjs.TextTrack.prototype.label = function(){
  return this.label_;
};

/**
 * All cues of the track. Cues have a startTime, endTime, text, and other properties.
 * Spec def: readonly attribute TextTrackCueList cues;
 * @private
 */
vjs.TextTrack.prototype.cues_;

/**
 * Get the track cues
 * @return {Array}
 */
vjs.TextTrack.prototype.cues = function(){
  return this.cues_;
};

/**
 * ActiveCues is all cues that are currently showing
 * Spec def: readonly attribute TextTrackCueList activeCues;
 * @private
 */
vjs.TextTrack.prototype.activeCues_;

/**
 * Get the track active cues
 * @return {Array}
 */
vjs.TextTrack.prototype.activeCues = function(){
  return this.activeCues_;
};

/**
 * ReadyState describes if the text file has been loaded
 * const unsigned short NONE = 0;
 * const unsigned short LOADING = 1;
 * const unsigned short LOADED = 2;
 * const unsigned short ERROR = 3;
 * readonly attribute unsigned short readyState;
 * @private
 */
vjs.TextTrack.prototype.readyState_;

/**
 * Get the track readyState
 * @return {Number}
 */
vjs.TextTrack.prototype.readyState = function(){
  return this.readyState_;
};

/**
 * Mode describes if the track is showing, hidden, or disabled
 * const unsigned short OFF = 0;
 * const unsigned short HIDDEN = 1; (still triggering cuechange events, but not visible)
 * const unsigned short SHOWING = 2;
 * attribute unsigned short mode;
 * @private
 */
vjs.TextTrack.prototype.mode_;

/**
 * Get the track mode
 * @return {Number}
 */
vjs.TextTrack.prototype.mode = function(){
  return this.mode_;
};

/**
 * Change the font size of the text track to make it larger when playing in fullscreen mode
 * and restore it to its normal size when not in fullscreen mode.
 */
vjs.TextTrack.prototype.adjustFontSize = function(){
    if (this.player_.isFullScreen()) {
        // Scale the font by the same factor as increasing the video width to the full screen window width.
        // Additionally, multiply that factor by 1.4, which is the default font size for
        // the caption track (from the CSS)
        this.el_.style.fontSize = screen.width / this.player_.width() * 1.4 * 100 + '%';
    } else {
        // Change the font size of the text track back to its original non-fullscreen size
        this.el_.style.fontSize = '';
    }
};

/**
 * Create basic div to hold cue text
 * @return {Element}
 */
vjs.TextTrack.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-' + this.kind_ + ' vjs-text-track'
  });
};

/**
 * Show: Mode Showing (2)
 * Indicates that the text track is active. If no attempt has yet been made to obtain the track's cues, the user agent will perform such an attempt momentarily.
 * The user agent is maintaining a list of which cues are active, and events are being fired accordingly.
 * In addition, for text tracks whose kind is subtitles or captions, the cues are being displayed over the video as appropriate;
 * for text tracks whose kind is descriptions, the user agent is making the cues available to the user in a non-visual fashion;
 * and for text tracks whose kind is chapters, the user agent is making available to the user a mechanism by which the user can navigate to any point in the media resource by selecting a cue.
 * The showing by default state is used in conjunction with the default attribute on track elements to indicate that the text track was enabled due to that attribute.
 * This allows the user agent to override the state if a later track is discovered that is more appropriate per the user's preferences.
 */
vjs.TextTrack.prototype.show = function(){
  this.activate();

  this.mode_ = 2;

  // Show element.
  vjs.Component.prototype.show.call(this);
};

/**
 * Hide: Mode Hidden (1)
 * Indicates that the text track is active, but that the user agent is not actively displaying the cues.
 * If no attempt has yet been made to obtain the track's cues, the user agent will perform such an attempt momentarily.
 * The user agent is maintaining a list of which cues are active, and events are being fired accordingly.
 */
vjs.TextTrack.prototype.hide = function(){
  // When hidden, cues are still triggered. Disable to stop triggering.
  this.activate();

  this.mode_ = 1;

  // Hide element.
  vjs.Component.prototype.hide.call(this);
};

/**
 * Disable: Mode Off/Disable (0)
 * Indicates that the text track is not active. Other than for the purposes of exposing the track in the DOM, the user agent is ignoring the text track.
 * No cues are active, no events are fired, and the user agent will not attempt to obtain the track's cues.
 */
vjs.TextTrack.prototype.disable = function(){
  // If showing, hide.
  if (this.mode_ == 2) { this.hide(); }

  // Stop triggering cues
  this.deactivate();

  // Switch Mode to Off
  this.mode_ = 0;
};

/**
 * Turn on cue tracking. Tracks that are showing OR hidden are active.
 */
vjs.TextTrack.prototype.activate = function(){
  // Load text file if it hasn't been yet.
  if (this.readyState_ === 0) { this.load(); }

  // Only activate if not already active.
  if (this.mode_ === 0) {
    // Update current cue on timeupdate
    // Using unique ID for bind function so other tracks don't remove listener
    this.player_.on('timeupdate', vjs.bind(this, this.update, this.id_));

    // Reset cue time on media end
    this.player_.on('ended', vjs.bind(this, this.reset, this.id_));

    // Add to display
    if (this.kind_ === 'captions' || this.kind_ === 'subtitles') {
      this.player_.getChild('textTrackDisplay').addChild(this);
    }
  }
};

/**
 * Turn off cue tracking.
 */
vjs.TextTrack.prototype.deactivate = function(){
  // Using unique ID for bind function so other tracks don't remove listener
  this.player_.off('timeupdate', vjs.bind(this, this.update, this.id_));
  this.player_.off('ended', vjs.bind(this, this.reset, this.id_));
  this.reset(); // Reset

  // Remove from display
  this.player_.getChild('textTrackDisplay').removeChild(this);
};

// A readiness state
// One of the following:
//
// Not loaded
// Indicates that the text track is known to exist (e.g. it has been declared with a track element), but its cues have not been obtained.
//
// Loading
// Indicates that the text track is loading and there have been no fatal errors encountered so far. Further cues might still be added to the track.
//
// Loaded
// Indicates that the text track has been loaded with no fatal errors. No new cues will be added to the track except if the text track corresponds to a MutableTextTrack object.
//
// Failed to load
// Indicates that the text track was enabled, but when the user agent attempted to obtain it, this failed in some way (e.g. URL could not be resolved, network error, unknown text track format). Some or all of the cues are likely missing and will not be obtained.
vjs.TextTrack.prototype.load = function(){

  // Only load if not loaded yet.
  if (this.readyState_ === 0) {
    this.readyState_ = 1;
    vjs.get(this.src_, vjs.bind(this, this.parseCues), vjs.bind(this, this.onError));
  }

};

vjs.TextTrack.prototype.onError = function(err){
  this.error = err;
  this.readyState_ = 3;
  this.trigger('error');
};

// Parse the WebVTT text format for cue times.
// TODO: Separate parser into own class so alternative timed text formats can be used. (TTML, DFXP)
vjs.TextTrack.prototype.parseCues = function(srcContent) {
  var cue, time, text,
      lines = srcContent.split('\n'),
      line = '', id;

  for (var i=1, j=lines.length; i<j; i++) {
    // Line 0 should be 'WEBVTT', so skipping i=0

    line = vjs.trim(lines[i]); // Trim whitespace and linebreaks

    if (line) { // Loop until a line with content

      // First line could be an optional cue ID
      // Check if line has the time separator
      if (line.indexOf('-->') == -1) {
        id = line;
        // Advance to next line for timing.
        line = vjs.trim(lines[++i]);
      } else {
        id = this.cues_.length;
      }

      // First line - Number
      cue = {
        id: id, // Cue Number
        index: this.cues_.length // Position in Array
      };

      // Timing line
      time = line.split(' --> ');
      cue.startTime = this.parseCueTime(time[0]);
      cue.endTime = this.parseCueTime(time[1]);

      // Additional lines - Cue Text
      text = [];

      // Loop until a blank line or end of lines
      // Assumeing trim('') returns false for blank lines
      while (lines[++i] && (line = vjs.trim(lines[i]))) {
        text.push(line);
      }

      cue.text = text.join('<br/>');

      // Add this cue
      this.cues_.push(cue);
    }
  }

  this.readyState_ = 2;
  this.trigger('loaded');
};


vjs.TextTrack.prototype.parseCueTime = function(timeText) {
  var parts = timeText.split(':'),
      time = 0,
      hours, minutes, other, seconds, ms;

  // Check if optional hours place is included
  // 00:00:00.000 vs. 00:00.000
  if (parts.length == 3) {
    hours = parts[0];
    minutes = parts[1];
    other = parts[2];
  } else {
    hours = 0;
    minutes = parts[0];
    other = parts[1];
  }

  // Break other (seconds, milliseconds, and flags) by spaces
  // TODO: Make additional cue layout settings work with flags
  other = other.split(/\s+/);
  // Remove seconds. Seconds is the first part before any spaces.
  seconds = other.splice(0,1)[0];
  // Could use either . or , for decimal
  seconds = seconds.split(/\.|,/);
  // Get milliseconds
  ms = parseFloat(seconds[1]);
  seconds = seconds[0];

  // hours => seconds
  time += parseFloat(hours) * 3600;
  // minutes => seconds
  time += parseFloat(minutes) * 60;
  // Add seconds
  time += parseFloat(seconds);
  // Add milliseconds
  if (ms) { time += ms/1000; }

  return time;
};

// Update active cues whenever timeupdate events are triggered on the player.
vjs.TextTrack.prototype.update = function(){
  if (this.cues_.length > 0) {

    // Get current player time, adjust for track offset
    var offset = this.player_.options()['trackTimeOffset'] || 0;
    var time = this.player_.currentTime() + offset;

    // Check if the new time is outside the time box created by the the last update.
    if (this.prevChange === undefined || time < this.prevChange || this.nextChange <= time) {
      var cues = this.cues_,

          // Create a new time box for this state.
          newNextChange = this.player_.duration(), // Start at beginning of the timeline
          newPrevChange = 0, // Start at end

          reverse = false, // Set the direction of the loop through the cues. Optimized the cue check.
          newCues = [], // Store new active cues.

          // Store where in the loop the current active cues are, to provide a smart starting point for the next loop.
          firstActiveIndex, lastActiveIndex,
          cue, i; // Loop vars

      // Check if time is going forwards or backwards (scrubbing/rewinding)
      // If we know the direction we can optimize the starting position and direction of the loop through the cues array.
      if (time >= this.nextChange || this.nextChange === undefined) { // NextChange should happen
        // Forwards, so start at the index of the first active cue and loop forward
        i = (this.firstActiveIndex !== undefined) ? this.firstActiveIndex : 0;
      } else {
        // Backwards, so start at the index of the last active cue and loop backward
        reverse = true;
        i = (this.lastActiveIndex !== undefined) ? this.lastActiveIndex : cues.length - 1;
      }

      while (true) { // Loop until broken
        cue = cues[i];

        // Cue ended at this point
        if (cue.endTime <= time) {
          newPrevChange = Math.max(newPrevChange, cue.endTime);

          if (cue.active) {
            cue.active = false;
          }

          // No earlier cues should have an active start time.
          // Nevermind. Assume first cue could have a duration the same as the video.
          // In that case we need to loop all the way back to the beginning.
          // if (reverse && cue.startTime) { break; }

        // Cue hasn't started
        } else if (time < cue.startTime) {
          newNextChange = Math.min(newNextChange, cue.startTime);

          if (cue.active) {
            cue.active = false;
          }

          // No later cues should have an active start time.
          if (!reverse) { break; }

        // Cue is current
        } else {

          if (reverse) {
            // Add cue to front of array to keep in time order
            newCues.splice(0,0,cue);

            // If in reverse, the first current cue is our lastActiveCue
            if (lastActiveIndex === undefined) { lastActiveIndex = i; }
            firstActiveIndex = i;
          } else {
            // Add cue to end of array
            newCues.push(cue);

            // If forward, the first current cue is our firstActiveIndex
            if (firstActiveIndex === undefined) { firstActiveIndex = i; }
            lastActiveIndex = i;
          }

          newNextChange = Math.min(newNextChange, cue.endTime);
          newPrevChange = Math.max(newPrevChange, cue.startTime);

          cue.active = true;
        }

        if (reverse) {
          // Reverse down the array of cues, break if at first
          if (i === 0) { break; } else { i--; }
        } else {
          // Walk up the array fo cues, break if at last
          if (i === cues.length - 1) { break; } else { i++; }
        }

      }

      this.activeCues_ = newCues;
      this.nextChange = newNextChange;
      this.prevChange = newPrevChange;
      this.firstActiveIndex = firstActiveIndex;
      this.lastActiveIndex = lastActiveIndex;

      this.updateDisplay();

      this.trigger('cuechange');
    }
  }
};

// Add cue HTML to display
vjs.TextTrack.prototype.updateDisplay = function(){
  var cues = this.activeCues_,
      html = '',
      i=0,j=cues.length;

  for (;i<j;i++) {
    html += '<span class="vjs-tt-cue">'+cues[i].text+'</span>';
  }

  this.el_.innerHTML = html;
};

// Set all loop helper values back
vjs.TextTrack.prototype.reset = function(){
  this.nextChange = 0;
  this.prevChange = this.player_.duration();
  this.firstActiveIndex = 0;
  this.lastActiveIndex = 0;
};

// Create specific track types
/**
 * The track component for managing the hiding and showing of captions
 *
 * @constructor
 */
vjs.CaptionsTrack = vjs.TextTrack.extend();
vjs.CaptionsTrack.prototype.kind_ = 'captions';
// Exporting here because Track creation requires the track kind
// to be available on global object. e.g. new window['videojs'][Kind + 'Track']

/**
 * The track component for managing the hiding and showing of subtitles
 *
 * @constructor
 */
vjs.SubtitlesTrack = vjs.TextTrack.extend();
vjs.SubtitlesTrack.prototype.kind_ = 'subtitles';

/**
 * The track component for managing the hiding and showing of chapters
 *
 * @constructor
 */
vjs.ChaptersTrack = vjs.TextTrack.extend();
vjs.ChaptersTrack.prototype.kind_ = 'chapters';


/* Text Track Display
============================================================================= */
// Global container for both subtitle and captions text. Simple div container.

/**
 * The component for displaying text track cues
 *
 * @constructor
 */
vjs.TextTrackDisplay = vjs.Component.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.Component.call(this, player, options, ready);

    // This used to be called during player init, but was causing an error
    // if a track should show by default and the display hadn't loaded yet.
    // Should probably be moved to an external track loader when we support
    // tracks that don't need a display.
    if (player.options_['tracks'] && player.options_['tracks'].length > 0) {
      this.player_.addTextTracks(player.options_['tracks']);
    }
  }
});

vjs.TextTrackDisplay.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-text-track-display'
  });
};


/**
 * The specific menu item type for selecting a language within a text track kind
 *
 * @constructor
 */
vjs.TextTrackMenuItem = vjs.MenuItem.extend({
  /** @constructor */
  init: function(player, options){
    var track = this.track = options['track'];

    // Modify options for parent MenuItem class's init.
    options['label'] = track.label();
    options['selected'] = track.dflt();
    vjs.MenuItem.call(this, player, options);

    this.player_.on(track.kind() + 'trackchange', vjs.bind(this, this.update));
  }
});

vjs.TextTrackMenuItem.prototype.onClick = function(){
  vjs.MenuItem.prototype.onClick.call(this);
  this.player_.showTextTrack(this.track.id_, this.track.kind());
};

vjs.TextTrackMenuItem.prototype.update = function(){
  this.selected(this.track.mode() == 2);
};

/**
 * A special menu item for turning of a specific type of text track
 *
 * @constructor
 */
vjs.OffTextTrackMenuItem = vjs.TextTrackMenuItem.extend({
  /** @constructor */
  init: function(player, options){
    // Create pseudo track info
    // Requires options['kind']
    options['track'] = {
      kind: function() { return options['kind']; },
      player: player,
      label: function(){ return options['kind'] + ' off'; },
      dflt: function(){ return false; },
      mode: function(){ return false; }
    };
    vjs.TextTrackMenuItem.call(this, player, options);
    this.selected(true);
  }
});

vjs.OffTextTrackMenuItem.prototype.onClick = function(){
  vjs.TextTrackMenuItem.prototype.onClick.call(this);
  this.player_.showTextTrack(this.track.id_, this.track.kind());
};

vjs.OffTextTrackMenuItem.prototype.update = function(){
  var tracks = this.player_.textTracks(),
      i=0, j=tracks.length, track,
      off = true;

  for (;i<j;i++) {
    track = tracks[i];
    if (track.kind() == this.track.kind() && track.mode() == 2) {
      off = false;
    }
  }

  this.selected(off);
};

/**
 * The base class for buttons that toggle specific text track types (e.g. subtitles)
 *
 * @constructor
 */
vjs.TextTrackButton = vjs.MenuButton.extend({
  /** @constructor */
  init: function(player, options){
    vjs.MenuButton.call(this, player, options);

    if (this.items.length <= 1) {
      this.hide();
    }
  }
});

// vjs.TextTrackButton.prototype.buttonPressed = false;

// vjs.TextTrackButton.prototype.createMenu = function(){
//   var menu = new vjs.Menu(this.player_);

//   // Add a title list item to the top
//   // menu.el().appendChild(vjs.createEl('li', {
//   //   className: 'vjs-menu-title',
//   //   innerHTML: vjs.capitalize(this.kind_),
//   //   tabindex: -1
//   // }));

//   this.items = this.createItems();

//   // Add menu items to the menu
//   for (var i = 0; i < this.items.length; i++) {
//     menu.addItem(this.items[i]);
//   }

//   // Add list to element
//   this.addChild(menu);

//   return menu;
// };

// Create a menu item for each text track
vjs.TextTrackButton.prototype.createItems = function(){
  var items = [], track;

  // Add an OFF menu item to turn all tracks off
  items.push(new vjs.OffTextTrackMenuItem(this.player_, { 'kind': this.kind_ }));

  for (var i = 0; i < this.player_.textTracks().length; i++) {
    track = this.player_.textTracks()[i];
    if (track.kind() === this.kind_) {
      items.push(new vjs.TextTrackMenuItem(this.player_, {
        'track': track
      }));
    }
  }

  return items;
};

/**
 * The button component for toggling and selecting captions
 *
 * @constructor
 */
vjs.CaptionsButton = vjs.TextTrackButton.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.TextTrackButton.call(this, player, options, ready);
    this.el_.setAttribute('aria-label','Captions Menu');
  }
});
vjs.CaptionsButton.prototype.kind_ = 'captions';
vjs.CaptionsButton.prototype.buttonText = 'Captions';
vjs.CaptionsButton.prototype.className = 'vjs-captions-button';

/**
 * The button component for toggling and selecting subtitles
 *
 * @constructor
 */
vjs.SubtitlesButton = vjs.TextTrackButton.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.TextTrackButton.call(this, player, options, ready);
    this.el_.setAttribute('aria-label','Subtitles Menu');
  }
});
vjs.SubtitlesButton.prototype.kind_ = 'subtitles';
vjs.SubtitlesButton.prototype.buttonText = 'Subtitles';
vjs.SubtitlesButton.prototype.className = 'vjs-subtitles-button';

// Chapters act much differently than other text tracks
// Cues are navigation vs. other tracks of alternative languages
/**
 * The button component for toggling and selecting chapters
 *
 * @constructor
 */
vjs.ChaptersButton = vjs.TextTrackButton.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.TextTrackButton.call(this, player, options, ready);
    this.el_.setAttribute('aria-label','Chapters Menu');
  }
});
vjs.ChaptersButton.prototype.kind_ = 'chapters';
vjs.ChaptersButton.prototype.buttonText = 'Chapters';
vjs.ChaptersButton.prototype.className = 'vjs-chapters-button';

// Create a menu item for each text track
vjs.ChaptersButton.prototype.createItems = function(){
  var items = [], track;

  for (var i = 0; i < this.player_.textTracks().length; i++) {
    track = this.player_.textTracks()[i];
    if (track.kind() === this.kind_) {
      items.push(new vjs.TextTrackMenuItem(this.player_, {
        'track': track
      }));
    }
  }

  return items;
};

vjs.ChaptersButton.prototype.createMenu = function(){
  var tracks = this.player_.textTracks(),
      i = 0,
      j = tracks.length,
      track, chaptersTrack,
      items = this.items = [];

  for (;i<j;i++) {
    track = tracks[i];
    if (track.kind() == this.kind_ && track.dflt()) {
      if (track.readyState() < 2) {
        this.chaptersTrack = track;
        track.on('loaded', vjs.bind(this, this.createMenu));
        return;
      } else {
        chaptersTrack = track;
        break;
      }
    }
  }

  var menu = this.menu = new vjs.Menu(this.player_);

  menu.contentEl().appendChild(vjs.createEl('li', {
    className: 'vjs-menu-title',
    innerHTML: vjs.capitalize(this.kind_),
    tabindex: -1
  }));

  if (chaptersTrack) {
    var cues = chaptersTrack.cues_, cue, mi;
    i = 0;
    j = cues.length;

    for (;i<j;i++) {
      cue = cues[i];

      mi = new vjs.ChaptersTrackMenuItem(this.player_, {
        'track': chaptersTrack,
        'cue': cue
      });

      items.push(mi);

      menu.addChild(mi);
    }
  }

  if (this.items.length > 0) {
    this.show();
  }

  return menu;
};


/**
 * @constructor
 */
vjs.ChaptersTrackMenuItem = vjs.MenuItem.extend({
  /** @constructor */
  init: function(player, options){
    var track = this.track = options['track'],
        cue = this.cue = options['cue'],
        currentTime = player.currentTime();

    // Modify options for parent MenuItem class's init.
    options['label'] = cue.text;
    options['selected'] = (cue.startTime <= currentTime && currentTime < cue.endTime);
    vjs.MenuItem.call(this, player, options);

    track.on('cuechange', vjs.bind(this, this.update));
  }
});

vjs.ChaptersTrackMenuItem.prototype.onClick = function(){
  vjs.MenuItem.prototype.onClick.call(this);
  this.player_.currentTime(this.cue.startTime);
  this.update(this.cue.startTime);
};

vjs.ChaptersTrackMenuItem.prototype.update = function(){
  var cue = this.cue,
      currentTime = this.player_.currentTime();

  // vjs.log(currentTime, cue.startTime);
  this.selected(cue.startTime <= currentTime && currentTime < cue.endTime);
};

// Add Buttons to controlBar
vjs.obj.merge(vjs.ControlBar.prototype.options_['children'], {
  'subtitlesButton': {},
  'captionsButton': {},
  'chaptersButton': {}
});

// vjs.Cue = vjs.Component.extend({
//   /** @constructor */
//   init: function(player, options){
//     vjs.Component.call(this, player, options);
//   }
// });
/**
 * @fileoverview Add JSON support
 * @suppress {undefinedVars}
 * (Compiler doesn't like JSON not being declared)
 */

/**
 * Javascript JSON implementation
 * (Parse Method Only)
 * https://github.com/douglascrockford/JSON-js/blob/master/json2.js
 * Only using for parse method when parsing data-setup attribute JSON.
 * @suppress {undefinedVars}
 * @namespace
 * @private
 */
vjs.JSON;

if (typeof window.JSON !== 'undefined' && window.JSON.parse === 'function') {
  vjs.JSON = window.JSON;

} else {
  vjs.JSON = {};

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

  /**
   * parse the json
   *
   * @memberof vjs.JSON
   * @param {String} text The JSON string to parse
   * @param {Function=} [reviver] Optional function that can transform the results
   * @return {Object|Array} The parsed JSON
   */
  vjs.JSON.parse = function (text, reviver) {
      var j;

      function walk(holder, key) {
          var k, v, value = holder[key];
          if (value && typeof value === 'object') {
              for (k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = walk(value, k);
                      if (v !== undefined) {
                          value[k] = v;
                      } else {
                          delete value[k];
                      }
                  }
              }
          }
          return reviver.call(holder, key, value);
      }
      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
          text = text.replace(cx, function (a) {
              return '\\u' +
                  ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
          });
      }

      if (/^[\],:{}\s]*$/
              .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

          j = eval('(' + text + ')');

          return typeof reviver === 'function' ?
              walk({'': j}, '') : j;
      }

      throw new SyntaxError('JSON.parse(): invalid or malformed JSON data');
  };
}
/**
 * @fileoverview Functions for automatically setting up a player
 * based on the data-setup attribute of the video tag
 */

// Automatically set up any tags that have a data-setup attribute
vjs.autoSetup = function(){
  var options, vid, player,
      vids = document.getElementsByTagName('video');

  // Check if any media elements exist
  if (vids && vids.length > 0) {

    for (var i=0,j=vids.length; i<j; i++) {
      vid = vids[i];

      // Check if element exists, has getAttribute func.
      // IE seems to consider typeof el.getAttribute == 'object' instead of 'function' like expected, at least when loading the player immediately.
      if (vid && vid.getAttribute) {

        // Make sure this player hasn't already been set up.
        if (vid['player'] === undefined) {
          options = vid.getAttribute('data-setup');

          // Check if data-setup attr exists.
          // We only auto-setup if they've added the data-setup attr.
          if (options !== null) {

            // Parse options JSON
            // If empty string, make it a parsable json object.
            options = vjs.JSON.parse(options || '{}');

            // Create new video.js instance.
            player = videojs(vid, options);
          }
        }

      // If getAttribute isn't defined, we need to wait for the DOM.
      } else {
        vjs.autoSetupTimeout(1);
        break;
      }
    }

  // No videos were found, so keep looping unless page is finisehd loading.
  } else if (!vjs.windowLoaded) {
    vjs.autoSetupTimeout(1);
  }
};

// Pause to let the DOM keep processing
vjs.autoSetupTimeout = function(wait){
  setTimeout(vjs.autoSetup, wait);
};

if (document.readyState === 'complete') {
  vjs.windowLoaded = true;
} else {
  vjs.one(window, 'load', function(){
    vjs.windowLoaded = true;
  });
}

// Run Auto-load players
// You have to wait at least once in case this script is loaded after your video in the DOM (weird behavior only with minified version)
vjs.autoSetupTimeout(1);
/**
 * the method for registering a video.js plugin
 *
 * @param  {String} name The name of the plugin
 * @param  {Function} init The function that is run when the player inits
 */
vjs.plugin = function(name, init){
  vjs.Player.prototype[name] = init;
};
;/*! PHP-JS | @link https://github.com/kvz/phpjs | @copyright Kevin van Zonneveld | @license MIT and GPL */
function count (mixed_var, mode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Waldo Malqui Silva
    // +   bugfixed by: Soren Hansen
    // +      input by: merabi
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Olivier Louvignes (http://mg-crea.com/)
    // +   improved by: Obinwanne Hill on 22-03-2013 (https://about.me/obinwanne.hill)
    // +   dependencies: isArray() and isObject()
    // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
    var key, nvld = false, cnt = 0;

    switch(true)
    {
        case (mixed_var === null || typeof mixed_var === 'undefined'):
            return 0;
            break;

        case (!isArray(mixed_var) && !isObject(mixed_var)):
            nvld = true;
            break;
    }

    switch(true)
    {
        case (mixed_var.hasOwnProperty('length')):
            return mixed_var.length;
            break;
    }

    //Return 1 if !isArray && !Object && does not have .length
    switch(true)
    {
        case (nvld):
            return 1;
            break;
    }

    switch(true)
    {
        case (mode === 'COUNT_RECURSIVE'):
            mode = 1;
            break;
    }

    switch(true)
    {
        case (mode != 1):
            mode = 0;
            break;
    }

    for (key in mixed_var) {
        switch(true)
        {
            case (mixed_var.hasOwnProperty(key)):
                cnt++;
                switch(true)
                {
                    case (mode == 1 && mixed_var[key] && (isArray(mixed_var[key]) || isObject(mixed_var[key]))):
                        cnt += this.count(mixed_var[key], 1);
                        break;
                }
                break;
        }
    }

    return cnt;
}

function in_array (needle, haystack, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: vlado houba
    // +   input by: Billy
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    // *     returns 2: false
    // *     example 3: in_array(1, ['1', '2', '3']);
    // *     returns 3: true
    // *     example 3: in_array(1, ['1', '2', '3'], false);
    // *     returns 3: true
    // *     example 4: in_array(1, ['1', '2', '3'], true);
    // *     returns 4: false
    var key = '',
        strict = !! argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
}

function array_search (needle, haystack, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
    // *     returns 1: 'surname'
    // *     example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
    // *     example 2: var ordered_arr = array({3:'value'}, {2:'value'}, {'a':'value'}, {'b':'value'});
    // *     example 2: var key = array_search(/val/g, ordered_arr); // or var key = ordered_arr.search(/val/g);
    // *     returns 2: '3'

    var strict = !!argStrict,
        key = '';

    if (haystack && typeof haystack === 'object' && haystack.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return haystack.search(needle, argStrict);
    }
    if (typeof needle === 'object' && needle.exec) { // Duck-type for RegExp
        if (!strict) { // Let's consider case sensitive searches as strict
            var flags = 'i' + (needle.global ? 'g' : '') +
                (needle.multiline ? 'm' : '') +
                (needle.sticky ? 'y' : ''); // sticky is FF only
            needle = new RegExp(needle.source, flags);
        }
        for (key in haystack) {
            if (needle.test(haystack[key])) {
                return key;
            }
        }
        return false;
    }

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            return key;
        }
    }

    return false;
}

function array_keys (input, search_value, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: jd
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   input by: P
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'firstname', 1: 'surname'}

    var search = typeof search_value !== 'undefined',
        tmp_arr = [],
        strict = !!argStrict,
        include = true,
        key = '';

    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.keys(search_value, argStrict);
    }

    for (key in input) {
        if (input.hasOwnProperty(key)) {
            include = true;
            if (search) {
                if (strict && input[key] !== search_value) {
                    include = false;
                }
                else if (input[key] != search_value) {
                    include = false;
                }
            }

            if (include) {
                tmp_arr[tmp_arr.length] = key;
            }
        }
    }

    return tmp_arr;
}

function array_values (input) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}
    var tmp_arr = [],
        key = '';

    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.values();
    }

    for (key in input) {
        tmp_arr[tmp_arr.length] = input[key];
    }

    return tmp_arr;
}

function array_combine (keys, values) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_combine([0,1,2], ['kevin','van','zonneveld']);
    // *     returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}
    var new_array = {},
        keycount = keys && keys.length,
        i = 0;

    // input sanitation
    if (typeof keys !== 'object' || typeof values !== 'object' || // Only accept arrays or array-like objects
        typeof keycount !== 'number' || typeof values.length !== 'number' || !keycount) { // Require arrays to have a count
        return false;
    }

    // number of elements does not match
    if (keycount != values.length) {
        return false;
    }

    for (i = 0; i < keycount; i++) {
        new_array[keys[i]] = values[i];
    }

    return new_array;
}

function implode (glue, pieces) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // +   improved by: Itsacon (http://www.itsacon.net/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    // *     returns 2: 'Kevin van Zonneveld'
    var i = '',
        retVal = '',
        tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        for (i in pieces) {
            retVal += tGlue + pieces[i];
            tGlue = glue;
        }
        return retVal;
    }
    return pieces;
}

function explode (delimiter, string, limit) {

    if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return null;
    if ( delimiter === '' || delimiter === false || delimiter === null) return false;
    if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
        return { 0: '' };
    }
    if ( delimiter === true ) delimiter = '1';

    // Here we go...
    delimiter += '';
    string += '';

    var s = string.split( delimiter );


    if ( typeof limit === 'undefined' ) return s;

    // Support for limit
    if ( limit === 0 ) limit = 1;

    // Positive limit
    if ( limit > 0 ){
        if ( limit >= s.length ) return s;
        return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
    }

    // Negative limit
    if ( -limit >= s.length ) return [];

    s.splice( s.length + limit );
    return s;
}

function urlencode (str) {
    // http://kevin.vanzonneveld.net
    // + original by: Philip Peterson
    // + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + input by: AJ
    // + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + improved by: Brett Zamir (http://brett-zamir.me)
    // + bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + input by: travc
    // + input by: Brett Zamir (http://brett-zamir.me)
    // + bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + improved by: Lars Fischer
    // + input by: Ratheous
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + bugfixed by: Joris
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // % note 1: This reflects PHP 5.3/6.0+ behavior
    // % note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
    // % note 2: pages served as UTF-8
    // * example 1: urlencode('Kevin van Zonneveld!');
    // * returns 1: 'Kevin+van+Zonneveld%21'
    // * example 2: urlencode('http://kevin.vanzonneveld.net/');
    // * returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // * example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // * returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
    str = (str + '').toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function strrpos (haystack, needle, offset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   input by: saulius
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: strrpos('Kevin van Zonneveld', 'e');
    // *     returns 1: 16
    // *     example 2: strrpos('somepage.com', '.', false);
    // *     returns 2: 8
    // *     example 3: strrpos('baa', 'a', 3);
    // *     returns 3: false
    // *     example 4: strrpos('baa', 'a', 2);
    // *     returns 4: 2
    var i = -1;
    if (offset) {
        i = (haystack + '').slice(offset).lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
        // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
        if (i !== -1) {
            i += offset;
        }
    } else {
        i = (haystack + '').lastIndexOf(needle);
    }
    return i >= 0 ? i : false;
}

function uasort (inputArr, sorter) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // %        note 1: This function deviates from PHP in returning a copy of the array instead
    // %        note 1: of acting by reference and returning true; this was necessary because
    // %        note 1: IE does not allow deleting and re-adding of properties without caching
    // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 1: get the PHP behavior, but use this only if you are in an environment
    // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 1: property deletion is supported. Note that we intend to implement the PHP
    // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 1: is by reference in PHP anyways
    // *     example 1: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: fruits = uasort(fruits, function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;});
    // *     results 1: fruits == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    var valArr = [],
        tempKeyVal, tempValue, ret, k = '',
        i = 0,
        strictForIn = false,
        populateArr = {};

    if (typeof sorter === 'string') {
        sorter = this[sorter];
    } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
        sorter = this[sorter[0]][sorter[1]];
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;


    for (k in inputArr) { // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push([k, inputArr[k]]);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }
    valArr.sort(function (a, b) {
        return sorter(a[1], b[1]);
    });

    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        populateArr[valArr[i][0]] = valArr[i][1];
    }

    return strictForIn || populateArr;
}

function microtime (get_as_float) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // *     example 1: timeStamp = microtime(true);
    // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
    var now = new Date().getTime() / 1000;
    var s = parseInt(now, 10);

    return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
}

/*! md5.js - MD5 Message-Digest - v2.0.0 | @copyright 1999,2002 Masanao Izumo <iz@onicos.co.jp>  */
/* md5.js - MD5 Message-Digest
 * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
 * Version: 2.0.0
 * LastModified: May 13 2002
 *
 * This program is free software.  You can redistribute it and/or modify
 * it without any warranty.  This library calculates the MD5 based on RFC1321.
 * See RFC1321 for more information and algorithm.
 */

/* Interface:
 * md5_hexstr = md5(data);
 */

/* ChangeLog
 * 2013/07/20: Updated by Obinwanne Ugwuh
 * 2002/05/13: Version 2.0.0 released
 * NOTICE: API is changed.
 * 2002/04/15: Bug fix about MD5 length.
 */
(function() {
    var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391);

    var MD5_round1 = new Array(new Array(0, 7, 1), new Array(1, 12, 2), new Array(2, 17, 3), new Array(3, 22, 4), new Array(4, 7, 5), new Array(5, 12, 6), new Array(6, 17, 7), new Array(7, 22, 8), new Array(8, 7, 9), new Array(9, 12, 10), new Array(10, 17, 11), new Array(11, 22, 12), new Array(12, 7, 13), new Array(13, 12, 14), new Array(14, 17, 15), new Array(15, 22, 16));

    var MD5_round2 = new Array(new Array(1, 5, 17), new Array(6, 9, 18), new Array(11, 14, 19), new Array(0, 20, 20), new Array(5, 5, 21), new Array(10, 9, 22), new Array(15, 14, 23), new Array(4, 20, 24), new Array(9, 5, 25), new Array(14, 9, 26), new Array(3, 14, 27), new Array(8, 20, 28), new Array(13, 5, 29), new Array(2, 9, 30), new Array(7, 14, 31), new Array(12, 20, 32));

    var MD5_round3 = new Array(new Array(5, 4, 33), new Array(8, 11, 34), new Array(11, 16, 35), new Array(14, 23, 36), new Array(1, 4, 37), new Array(4, 11, 38), new Array(7, 16, 39), new Array(10, 23, 40), new Array(13, 4, 41), new Array(0, 11, 42), new Array(3, 16, 43), new Array(6, 23, 44), new Array(9, 4, 45), new Array(12, 11, 46), new Array(15, 16, 47), new Array(2, 23, 48));

    var MD5_round4 = new Array(new Array(0, 6, 49), new Array(7, 10, 50), new Array(14, 15, 51), new Array(5, 21, 52), new Array(12, 6, 53), new Array(3, 10, 54), new Array(10, 15, 55), new Array(1, 21, 56), new Array(8, 6, 57), new Array(15, 10, 58), new Array(6, 15, 59), new Array(13, 21, 60), new Array(4, 6, 61), new Array(11, 10, 62), new Array(2, 15, 63), new Array(9, 21, 64));

    function MD5_F(x, y, z) {
        return (x & y) | (~x & z);
    }

    function MD5_G(x, y, z) {
        return (x & z) | (y & ~z);
    }

    function MD5_H(x, y, z) {
        return x ^ y ^ z;
    }

    function MD5_I(x, y, z) {
        return y ^ (x | ~z);
    }

    var MD5_round = new Array(new Array(MD5_F, MD5_round1), new Array(MD5_G, MD5_round2), new Array(MD5_H, MD5_round3), new Array(MD5_I, MD5_round4));

    function MD5_pack(n32) {
        return String.fromCharCode(n32 & 0xff) + String.fromCharCode((n32 >>> 8) & 0xff) + String.fromCharCode((n32 >>> 16) & 0xff) + String.fromCharCode((n32 >>> 24) & 0xff);
    }

    function MD5_unpack(s4) {
        return s4.charCodeAt(0) | (s4.charCodeAt(1) << 8) | (s4.charCodeAt(2) << 16) | (s4.charCodeAt(3) << 24);
    }

    function MD5_number(n) {
        while (n < 0)
            n += 4294967296;
        while (n > 4294967295)
            n -= 4294967296;
        return n;
    }

    function MD5_apply_round(x, s, f, abcd, r) {
        var a, b, c, d;
        var kk, ss, ii;
        var t, u;

        a = abcd[0];
        b = abcd[1];
        c = abcd[2];
        d = abcd[3];
        kk = r[0];
        ss = r[1];
        ii = r[2];

        u = f(s[b], s[c], s[d]);
        t = s[a] + u + x[kk] + MD5_T[ii];
        t = MD5_number(t);
        t = ((t << ss) | (t >>> (32 - ss)));
        t += s[b];
        s[a] = MD5_number(t);
    }

    function utf8_encode(s)
    {
        for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
            s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
            );
        return s.join("");
    }

    function MD5_hash(data) {
        var abcd, x, state, s;
        var len, index, padLen, f, r;
        var i, j, k;
        var tmp;

        if (/[\x80-\xFF]/.test(data)) {
            data = utf8_encode(data);

        }

        state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
        len = data.length;
        index = len & 0x3f;
        padLen = (index < 56) ? (56 - index) : (120 - index);
        if (padLen > 0) {
            data += "\x80";
            for (i = 0; i < padLen - 1; i++)
                data += "\x00";
        }
        data += MD5_pack(len * 8);
        data += MD5_pack(0);
        len += padLen + 8;
        abcd = new Array(0, 1, 2, 3);
        x = new Array(16);
        s = new Array(4);

        for (k = 0; k < len; k += 64) {
            for (i = 0, j = k; i < 16; i++, j += 4) {
                x[i] = data.charCodeAt(j) | (data.charCodeAt(j + 1) << 8) | (data.charCodeAt(j + 2) << 16) | (data.charCodeAt(j + 3) << 24);
            }
            for (i = 0; i < 4; i++)
                s[i] = state[i];
            for (i = 0; i < 4; i++) {
                f = MD5_round[i][0];
                r = MD5_round[i][1];
                for (j = 0; j < 16; j++) {
                    MD5_apply_round(x, s, f, abcd, r[j]);
                    tmp = abcd[0];
                    abcd[0] = abcd[3];
                    abcd[3] = abcd[2];
                    abcd[2] = abcd[1];
                    abcd[1] = tmp;
                }
            }

            for (i = 0; i < 4; i++) {
                state[i] += s[i];
                state[i] = MD5_number(state[i]);
            }
        }

        return MD5_pack(state[0]) + MD5_pack(state[1]) + MD5_pack(state[2]) + MD5_pack(state[3]);
    }

    function MD5_hexhash(data) {
        var i, out, c;
        var bit128;

        bit128 = MD5_hash(data);
        out = "";
        for (i = 0; i < 16; i++) {
            c = bit128.charCodeAt(i);
            out += "0123456789abcdef".charAt((c >> 4) & 0xf);
            out += "0123456789abcdef".charAt(c & 0xf);
        }
        return out;
    }

    md5 = function (s) {
        return MD5_hexhash(s);
    }
})();


/*! json2.js | @link https://github.com/douglascrockford/JSON-js | @copyright Douglas Crockford <douglas@crockford.com> */

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
                Boolean.prototype.toJSON = function () {
                    return this.valueOf();
                };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

            case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                if (!value) {
                    return 'null';
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/*! AmplifyJS-Store - v1.1.0 | @link http://amplifyjs.com/api/store/ | @copyright 2012 AppendTo <http://appendto.com/contact> | @license MIT and GPL V2 */
(function( amplify, undefined ) {

    var store = amplify.store = function( key, value, options ) {
        var type = store.type;
        if ( options && options.type && options.type in store.types ) {
            type = options.type;
        }
        return store.types[ type ]( key, value, options || {} );
    };

    store.types = {};
    store.type = null;
    store.addType = function( type, storage ) {
        if ( !store.type ) {
            store.type = type;
        }

        store.types[ type ] = storage;
        store[ type ] = function( key, value, options ) {
            options = options || {};
            options.type = type;
            return store( key, value, options );
        };
    };
    store.error = function() {
        return "amplify.store quota exceeded";
    };

    var rprefix = /^__amplify__/;
    function createFromStorageInterface( storageType, storage ) {
        store.addType( storageType, function( key, value, options ) {
            var storedValue, parsed, i, remove,
                ret = value,
                now = (new Date()).getTime();

            if ( !key ) {
                ret = {};
                remove = [];
                i = 0;
                try {
                    // accessing the length property works around a localStorage bug
                    // in Firefox 4.0 where the keys don't update cross-page
                    // we assign to key just to avoid Closure Compiler from removing
                    // the access as "useless code"
                    // https://bugzilla.mozilla.org/show_bug.cgi?id=662511
                    key = storage.length;

                    while ( key = storage.key( i++ ) ) {
                        if ( rprefix.test( key ) ) {
                            parsed = JSON.parse( storage.getItem( key ) );
                            if ( parsed.expires && parsed.expires <= now ) {
                                remove.push( key );
                            } else {
                                ret[ key.replace( rprefix, "" ) ] = parsed.data;
                            }
                        }
                    }
                    while ( key = remove.pop() ) {
                        storage.removeItem( key );
                    }
                } catch ( error ) {}
                return ret;
            }

            // protect against name collisions with direct storage
            key = "__amplify__" + key;

            if ( value === undefined ) {
                storedValue = storage.getItem( key );
                parsed = storedValue ? JSON.parse( storedValue ) : { expires: -1 };
                if ( parsed.expires && parsed.expires <= now ) {
                    storage.removeItem( key );
                } else {
                    return parsed.data;
                }
            } else {
                if ( value === null ) {
                    storage.removeItem( key );
                } else {
                    parsed = JSON.stringify({
                        data: value,
                        expires: options.expires ? now + options.expires : null
                    });
                    try {
                        storage.setItem( key, parsed );
                        // quota exceeded
                    } catch( error ) {
                        // expire old data and try again
                        store[ storageType ]();
                        try {
                            storage.setItem( key, parsed );
                        } catch( error ) {
                            throw store.error();
                        }
                    }
                }
            }

            return ret;
        });
    }

// localStorage + sessionStorage
// IE 8+, Firefox 3.5+, Safari 4+, Chrome 4+, Opera 10.5+, iPhone 2+, Android 2+
    for ( var webStorageType in { localStorage: 1, sessionStorage: 1 } ) {
        // try/catch for file protocol in Firefox and Private Browsing in Safari 5
        try {
            // Safari 5 in Private Browsing mode exposes localStorage
            // but doesn't allow storing data, so we attempt to store and remove an item.
            // This will unfortunately give us a false negative if we're at the limit.
            window[ webStorageType ].setItem( "__amplify__", "x" );
            window[ webStorageType ].removeItem( "__amplify__" );
            createFromStorageInterface( webStorageType, window[ webStorageType ] );
        } catch( e ) {}
    }

// globalStorage
// non-standard: Firefox 2+
// https://developer.mozilla.org/en/dom/storage#globalStorage
    if ( !store.types.localStorage && window.globalStorage ) {
        // try/catch for file protocol in Firefox
        try {
            createFromStorageInterface( "globalStorage",
                window.globalStorage[ window.location.hostname ] );
            // Firefox 2.0 and 3.0 have sessionStorage and globalStorage
            // make sure we default to globalStorage
            // but don't default to globalStorage in 3.5+ which also has localStorage
            if ( store.type === "sessionStorage" ) {
                store.type = "globalStorage";
            }
        } catch( e ) {}
    }

// userData
// non-standard: IE 5+
// http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
    (function() {
        // IE 9 has quirks in userData that are a huge pain
        // rather than finding a way to detect these quirks
        // we just don't register userData if we have localStorage
        if ( store.types.localStorage ) {
            return;
        }

        // append to html instead of body so we can do this from the head
        var div = document.createElement( "div" ),
            attrKey = "amplify";
        div.style.display = "none";
        document.getElementsByTagName( "head" )[ 0 ].appendChild( div );

        // we can't feature detect userData support
        // so just try and see if it fails
        // surprisingly, even just adding the behavior isn't enough for a failure
        // so we need to load the data as well
        try {
            div.addBehavior( "#default#userdata" );
            div.load( attrKey );
        } catch( e ) {
            div.parentNode.removeChild( div );
            return;
        }

        store.addType( "userData", function( key, value, options ) {
            div.load( attrKey );
            var attr, parsed, prevValue, i, remove,
                ret = value,
                now = (new Date()).getTime();

            if ( !key ) {
                ret = {};
                remove = [];
                i = 0;
                while ( attr = div.XMLDocument.documentElement.attributes[ i++ ] ) {
                    parsed = JSON.parse( attr.value );
                    if ( parsed.expires && parsed.expires <= now ) {
                        remove.push( attr.name );
                    } else {
                        ret[ attr.name ] = parsed.data;
                    }
                }
                while ( key = remove.pop() ) {
                    div.removeAttribute( key );
                }
                div.save( attrKey );
                return ret;
            }

            // convert invalid characters to dashes
            // http://www.w3.org/TR/REC-xml/#NT-Name
            // simplified to assume the starting character is valid
            // also removed colon as it is invalid in HTML attribute names
            key = key.replace( /[^\-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-" );
            // adjust invalid starting character to deal with our simplified sanitization
            key = key.replace( /^-/, "_-" );

            if ( value === undefined ) {
                attr = div.getAttribute( key );
                parsed = attr ? JSON.parse( attr ) : { expires: -1 };
                if ( parsed.expires && parsed.expires <= now ) {
                    div.removeAttribute( key );
                } else {
                    return parsed.data;
                }
            } else {
                if ( value === null ) {
                    div.removeAttribute( key );
                } else {
                    // we need to get the previous value in case we need to rollback
                    prevValue = div.getAttribute( key );
                    parsed = JSON.stringify({
                        data: value,
                        expires: (options.expires ? (now + options.expires) : null)
                    });
                    div.setAttribute( key, parsed );
                }
            }

            try {
                div.save( attrKey );
                // quota exceeded
            } catch ( error ) {
                // roll the value back to the previous value
                if ( prevValue === null ) {
                    div.removeAttribute( key );
                } else {
                    div.setAttribute( key, prevValue );
                }

                // expire old data and try again
                store.userData();
                try {
                    div.setAttribute( key, parsed );
                    div.save( attrKey );
                } catch ( error ) {
                    // roll the value back to the previous value
                    if ( prevValue === null ) {
                        div.removeAttribute( key );
                    } else {
                        div.setAttribute( key, prevValue );
                    }
                    throw store.error();
                }
            }
            return ret;
        });
    }() );

// in-memory storage
// fallback for all browsers to enable the API even if we can't persist data
    (function() {
        var memory = {},
            timeout = {};

        function copy( obj ) {
            return obj === undefined ? undefined : JSON.parse( JSON.stringify( obj ) );
        }

        store.addType( "memory", function( key, value, options ) {
            if ( !key ) {
                return copy( memory );
            }

            if ( value === undefined ) {
                return copy( memory[ key ] );
            }

            if ( timeout[ key ] ) {
                clearTimeout( timeout[ key ] );
                delete timeout[ key ];
            }

            if ( value === null ) {
                delete memory[ key ];
                return null;
            }

            memory[ key ] = value;
            if ( options.expires ) {
                timeout[ key ] = setTimeout(function() {
                    delete memory[ key ];
                    delete timeout[ key ];
                }, options.expires );
            }

            return value;
        });
    }() );

}( this.amplify = this.amplify || {} ) );

/*! ios-orientationchange-fix.js | Script by @scottjehl rebound by @wilto, modified by Peter Wooster | @link https://github.com/scottjehl/iOS-Orientationchange-Fix | @copyright Scott Jehl <@scottjehl> | @license MIT / GPLV2 */
(function(w){

    // This fix addresses an Mobile Safari iOS bug, so return early if the UA claims it's something else.
    var ua = navigator.userAgent.toLowerCase();
    if( !( /iphone|ipad|ipod/.test( navigator.platform.toLowerCase() )
        && /os [1-5]_[0-9_]* like mac os x/i.test(ua)
        && ua.indexOf( "applewebkit" ) > -1
        && ua.indexOf( "crios") == -1  // chrome for iOS doesn't have the bug
        )){
        return;
    }

    var doc = w.document;

    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" );
    if( !meta ){ return; }
    var initialContent = meta && meta.getAttribute( "content" );
    var disabledZoom = initialContent + ",maximum-scale=1";
    var enabledZoom = initialContent + ",maximum-scale=10";
    var enabled = true;
    var	x, y, z, aig;
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }

    function checkTilt( e ){
        var ori = w.orientation;
        // if it's landscape we're out of here
        if(90 == Math.abs(w.orientation)) {
            if(enabled)restoreZoom();
            return;
        }

        aig = e.accelerationIncludingGravity;
        x = Math.abs( aig.x );
        y = Math.abs( aig.y );

        // If in the danger zone where x is much greater than y turn off zoom
        if(y == 0 || (x/y) > 1.2){
            if(enabled)disableZoom();
        }else if( !enabled )restoreZoom();
    }

    w.addEventListener( "orientationchange", restoreZoom, false );
    w.addEventListener( "devicemotion", checkTilt, false );

})( this );


/*! jQuery resize event - v1.1 | @link http://benalman.com/projects/jquery-resize-plugin/ | Copyright (c) 2010 "Cowboy" Ben Alman | @license MIT/GPL */
// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
//
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub       - http://github.com/cowboy/jquery-resize/
// Source       - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
//
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-resize/unit/
//
// About: Release History
//
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//       immediately after bind in some circumstances. Also changed $.fn.data
//       to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

(function($,window,undefined){
    '$:nomunge'; // Used by YUI compressor.

    // A jQuery object containing all non-window elements to which the resize
    // event is bound.
    var elems = $([]),

    // Extend $.resize if it already exists, otherwise create it.
        jq_resize = $.resizecontainer = $.extend( $.resize, {} ),

        timeout_id,

    // Reused strings.
        str_setTimeout = 'setTimeout',
        str_resize = 'resizecontainer',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';

    // Property: jQuery.resize.delay
    //
    // The numeric interval (in milliseconds) at which the resize event polling
    // loop executes. Defaults to 250.

    jq_resize[ str_delay ] = 250;

    // Property: jQuery.resize.throttleWindow
    //
    // Throttle the native window object resize event to fire no more than once
    // every <jQuery.resize.delay> milliseconds. Defaults to true.
    //
    // Because the window object has its own resize event, it doesn't need to be
    // provided by this plugin, and its execution can be left entirely up to the
    // browser. However, since certain browsers fire the resize event continuously
    // while others do not, enabling this will throttle the window resize event,
    // making event behavior consistent across all elements in all browsers.
    //
    // While setting this property to false will disable window object resize
    // event throttling, please note that this property must be changed before any
    // window object resize event callbacks are bound.

    jq_resize[ str_throttle ] = true;

    // Event: resize event
    //
    // Fired when an element's width or height changes. Because browsers only
    // provide this event for the window element, for other elements a polling
    // loop is initialized, running every <jQuery.resize.delay> milliseconds
    // to see if elements' dimensions have changed. You may bind with either
    // .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
    //
    // Usage:
    //
    // > jQuery('selector').bind( 'resize', function(e) {
    // >   // element's width or height has changed!
    // >   ...
    // > });
    //
    // Additional Notes:
    //
    // * The polling loop is not created until at least one callback is actually
    //   bound to the 'resize' event, and this single polling loop is shared
    //   across all elements.
    //
    // Double firing issue in jQuery 1.3.2:
    //
    // While this plugin works in jQuery 1.3.2, if an element's event callbacks
    // are manually triggered via .trigger( 'resize' ) or .resize() those
    // callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
    // events system. This is not an issue when using jQuery 1.4+.
    //
    // > // While this works in jQuery 1.4+
    // > $(elem).css({ width: new_w, height: new_h }).resize();
    // >
    // > // In jQuery 1.3.2, you need to do this:
    // > var elem = $(elem);
    // > elem.css({ width: new_w, height: new_h });
    // > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
    // > elem.resize();

    $.event.special[ str_resize ] = {

        // Called only when the first 'resize' event callback is bound per element.
        setup: function() {
            // Since window has its own native 'resize' event, return false so that
            // jQuery will bind the event using DOM methods. Since only 'window'
            // objects have a .setTimeout method, this should be a sufficient test.
            // Unless, of course, we're throttling the 'resize' event for window.
            if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

            var elem = $(this);

            // Add this element to the list of internal elements to monitor.
            elems = elems.add( elem );

            // Initialize data store on the element.
            $.data( this, str_data, { w: elem.width(), h: elem.height() } );

            // If this is the first element added, start the polling loop.
            if ( elems.length === 1 ) {
                loopy();
            }
        },

        // Called only when the last 'resize' event callback is unbound per element.
        teardown: function() {
            // Since window has its own native 'resize' event, return false so that
            // jQuery will unbind the event using DOM methods. Since only 'window'
            // objects have a .setTimeout method, this should be a sufficient test.
            // Unless, of course, we're throttling the 'resize' event for window.
            if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

            var elem = $(this);

            // Remove this element from the list of internal elements to monitor.
            elems = elems.not( elem );

            // Remove any data stored on the element.
            elem.removeData( str_data );

            // If this is the last element removed, stop the polling loop.
            if ( !elems.length ) {
                clearTimeout( timeout_id );
            }
        },

        // Called every time a 'resize' event callback is bound per element (new in
        // jQuery 1.4).
        add: function( handleObj ) {
            // Since window has its own native 'resize' event, return false so that
            // jQuery doesn't modify the event object. Unless, of course, we're
            // throttling the 'resize' event for window.
            if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

            var old_handler;

            // The new_handler function is executed every time the event is triggered.
            // This is used to update the internal element data store with the width
            // and height when the event is triggered manually, to avoid double-firing
            // of the event callback. See the "Double firing issue in jQuery 1.3.2"
            // comments above for more information.

            function new_handler( e, w, h ) {
                var elem = $(this),
                    data = $.data( this, str_data );

                // If called from the polling loop, w and h will be passed in as
                // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
                // those values will need to be computed.
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();

                old_handler.apply( this, arguments );
            }

            // This may seem a little complicated, but it normalizes the special event
            // .add method between jQuery 1.4/1.4.1 and 1.4.2+
            if ( $.isFunction( handleObj ) ) {
                // 1.4, 1.4.1
                old_handler = handleObj;
                return new_handler;
            } else {
                // 1.4.2+
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }

    };

    function loopy() {

        // Start the polling loop, asynchronously.
        timeout_id = window[ str_setTimeout ](function(){

            // Iterate over all elements to which the 'resize' event is bound.
            elems.each(function(){
                var elem = $(this),
                    width = elem.width(),
                    height = elem.height(),
                    data = $.data( this, str_data );

                // If element size has changed since the last time, update the element
                // data store and trigger the 'resize' event.
                if ( width !== data.w || height !== data.h ) {
                    elem.trigger( str_resize, [ data.w = width, data.h = height ] );
                }

            });

            // Loop.
            loopy();

        }, jq_resize[ str_delay ] );

    }

})(jQuery, window);

/**
 * Count the number of substring occurrences
 * @param haystack {String} the string to search in
 * @param needle {String} the substring to search for
 * @return {Number}
 */
function substr_count(haystack, needle)
{
    var needle_esc = needle.replace(/(?=[\\^$*+?.\(\)|{\}[\]])/g, "\\");
    var pattern = new RegExp(""+needle_esc+"", "g");
    var count = haystack.match(pattern);
    return count ? count.length : 0;
}

/**
 * Checks if a variable is a String
 * @param str {*} The variable to test
 * @return {Boolean}
 */
function isString(str)
{
    return typeof str == "string";
}

/**
 * Checks if a variable is a Number
 * @param num {*} The variable to test
 * @return {Boolean}
 */
function isNumber(num)
{
    return (!isNaN(parseFloat(num)) && isFinite(num));
}

/**
 * Checks if a variable is a Boolean
 * @param bool {*} The variable to test
 * @return {Boolean}
 */
function isBool(bool)
{
    return (bool === true || bool === false);
}

/**
 * Checks if the variable is an array
 * @param arr {*} The variable to test
 * @return {Boolean}
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

/**
 * Checks if a variable is an Object
 * @param obj {*} The variable to test
 * @return {Boolean}
 */
function isObject(obj)
{
    switch(true)
    {
        case (isArray(obj)):
            return false;
            break;
    }

    var is_empty_obj_bool;
    for ( var p in obj )
    {
        if (obj.hasOwnProperty(p))
        {
            is_empty_obj_bool = false;
            break;
        }
    }
    is_empty_obj_bool = (isBool(is_empty_obj_bool)) ? is_empty_obj_bool: true;

    switch(true)
    {
        case (typeof obj === "object" && is_empty_obj_bool === false):
            return true;
            break;
    }

    return false;
}

/**
 * Checks if a variable is a Function
 * @param obj {*} The variable to test
 * @return {Boolean}
 */
function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

/**
 * Converts a string array to an integer array
 * It converts all the string values of an array into their integer equivalents
 * @param str_arr {Array} The array to convert
 * @return {Array}
 */
function arrayToInteger(str_arr)
{
    var int_arr_item_int,
        array_count_int,
        keys_arr = [],
        values_arr = [],
        values_int_arr = [],
        final_int_arr = [];

    keys_arr = array_keys(str_arr);
    values_arr = array_values(str_arr);

    array_count_int = count(str_arr);
    for(var i = 0; i < array_count_int; i++)
    {
        int_arr_item_int = parseInt(values_arr[i]);
        values_int_arr.push(int_arr_item_int);
    }

    final_int_arr = array_combine(keys_arr, values_int_arr);
    return final_int_arr;
}

/**
 * Checks to see if array has duplicate values
 * @param arr {Array} the array to check
 * @return {Boolean}
 */
function arrayHasDuplicates(arr) {
    var valuesSoFar = {},
        array_count_int = count(arr);

    for (var i = 0; i < array_count_int; ++i) {
        var value = arr[i];
        if (Object.prototype.hasOwnProperty.call(valuesSoFar, value)) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

/**
 * Gets a value from an array derived after a tokenized string is exploded
 * @param str {String} the tokenized string that will be exploded to an array
 * @param delim {String} the delimiter
 * @param key {Integer} the position of the array to return
 * @return {String}
 */
function getValueAfterExplode(str, delim, key)
{
    var arr = explode(delim, str);
    return arr[key];
}

/**
 * Sorts an array in numerical order and returns an array containing the keys of the array in the new sorted order
 * @param values_arr {Array} The array to sort
 * @return {Array}
 */
function getSortedKeys(values_arr)
{
    var array_with_keys = [];
    for (var i = 0; i < values_arr.length; i++) {
        array_with_keys.push({ key: i, value: values_arr[i] });
    }

    array_with_keys.sort(function(a, b) {
        if (a.value < b.value) { return -1; }
        if (a.value > b.value) { return  1; }
        return 0;
    });

    var keys = [];
    for (var i = 0; i < array_with_keys.length; i++) {
        keys.push(array_with_keys[i].key);
    }

    return keys;
}

/**
 * Finds the nearest matching number in an array containing integers
 * It is recommended that you sort the array in order before using it with this function
 * @param haystack_arr {Array} The array containing the integer values
 * @param needle_int {Number} The reference integer which is used to find the match
 * @param return_key_only_bool {Boolean} If true, will return the key position of the nearest match. Default is false.
 * @param is_ceil_bool {Boolean} If true, will return the nearest highest number even if a lower number is technically 'closer'. Default value is true.
 * @param disable_ceil_offset_int {Number} Please see explanation below.
 * For example, let's say needle_int is 120 and the nearest matching numbers are 115 on the lower end and 140 on the higher end
 * Being the is_ceil_bool is true by default, 140 would ordinarily be the nearest number selected. However, if disable_ceil_offset is set to 5, this will set is_ceil_bool to false, and 115 will be returned as the nearest number selected because the difference between it (the true nearest matching number) and 120 (needle_int) is 5 or less, even though needle_int is higher and under normal circumstances 120 would have been returned instead
 * @return {Number}
 */
function getClosestNumberMatchArray(haystack_arr, needle_int)
{
    var myArgs = Array.prototype.slice.call(arguments),
        return_key_only_bool = (isBool(myArgs[2])) ? myArgs[2]: false,
        is_ceil_bool = (isBool(myArgs[3])) ? myArgs[3]: true,
        disable_ceil_offset_int = (isNumber(myArgs[4])) ? myArgs[4] : 0,
        value_diff_int,
        value_diff_keys_sort_arr = [],
        value_diff_values_arr = [],
        key_final_int,
        value_final_int,
        value_final_needle_diff_int
        ;

    haystack_arr = arrayToInteger(haystack_arr);
    needle_int = parseInt(needle_int);

    for(var i = 0; i < count(haystack_arr); i++)
    {
        value_diff_int = needle_int - haystack_arr[i];
        value_diff_int = Math.abs(value_diff_int);
        value_diff_values_arr.push(value_diff_int);
    }

    value_diff_keys_sort_arr = getSortedKeys(value_diff_values_arr);
    key_final_int = value_diff_keys_sort_arr[0];
    value_final_int = haystack_arr[key_final_int];

    value_final_needle_diff_int = value_final_int - needle_int;
    value_final_needle_diff_int = Math.abs(value_final_needle_diff_int);

    //Manage for when needle_int is higher than nearest matching number, and highest matching number is required
    switch(true)
    {
        case (value_final_int < needle_int):
            is_ceil_bool = (value_final_needle_diff_int <= disable_ceil_offset_int) ? false : is_ceil_bool;
            key_final_int = (is_ceil_bool) ? key_final_int + 1 : key_final_int;
            break;
    }

    //return value or key
    value_final_int = haystack_arr[key_final_int];
    return (return_key_only_bool) ? key_final_int: value_final_int;
}

/**
 * This function checks if a number is an integer decimal and if the integral part of the decimal is even
 * For example, 640.123 will be true, 641.123 will be false
 * @param number_int {Number} The Integer Decimal
 * @param allow_negative_bool {Boolean} This will allow negative numbers to be considered
 * @return {Boolean}
 */
function isEvenDecimal(number_int)
{
    var myArgs = Array.prototype.slice.call(arguments),
        allow_negative_bool = (isBool(myArgs[1])) ? myArgs[1]: false,
        number_temp_int,
        number_temp_mod_int;

    number_temp_int = (number_int < 0 && allow_negative_bool) ? number_int * -1 : number_int;
    number_temp_mod_int = number_temp_int % 1;

    //return false if Number is less than one or is not a decimal integer
    switch(true)
    {
        case (!isNumber(number_temp_int) || number_temp_int < 1 || number_temp_mod_int == 0):
            return false;
            break;
    }

    //Check if integral part is even number
    number_temp_int = Math.floor(number_temp_int);
    number_temp_mod_int = number_temp_int % 2;

    return !!((number_temp_mod_int == 0));
}

/**
 * Retrieves the current and full URL of the document
 * @param option_flag_str {String} If present, specifies a specific part of the URL to return
 * The two options flags available are:
 * 1. bp [basepath] - Will return 'http://restive.io/index.html' if current URL is 'http://restive.io/index.html?id=1234'
 * 2. bd [basedir] - Will return 'http://restive.io/test' if current URL is 'http://restive.io/test/index.html?id=4'
 * 3. q [query] - Will return 'id=1234' if current URL is 'http://restive.io/index.html?id=1234'
 * @param url_str {String} By default, this function uses document.URL to capture the URL. You may provide your own url using this parameter
 * @return {String}
 */
function getUrl()
{
    var myArgs = Array.prototype.slice.call(arguments),
        option_flag_str = (isString(myArgs[0]) && myArgs[0] != '') ? myArgs[0]: '',
        url_str = (isString(myArgs[1]) && myArgs[1] != '') ? myArgs[1] : document.URL,
        url_temp_str,
        url_temp_arr = [],
        is_url_has_q_bool = /\?+/.test(url_str),
        url_match_arr = url_str.match(/^([h|f]{1}[t]{0,1}tp[s]{0,1}\:\/\/)([^ ]+?)\?([^ ]*)/i);

    switch(true)
    {
        case (option_flag_str == 'basepath' || option_flag_str == 'bp'):
            return (is_url_has_q_bool) ? url_match_arr[1]+url_match_arr[2] : url_str;
            break;

        case (option_flag_str == 'basedir' || option_flag_str == 'bd'):
            url_temp_str = (is_url_has_q_bool) ? url_match_arr[1]+url_match_arr[2] : url_str;
            url_temp_arr = explode('/', url_temp_str);
            url_temp_arr.pop();

            return implode('/', url_temp_arr);
            break;

        case (option_flag_str == 'query' || option_flag_str == 'q'):
            return (is_url_has_q_bool) ? url_match_arr[3]: "";
            break;

        default:
            return url_str;
    }
}

(function($){

    /**
     * Determines if a given element is a child or descendant of another
     * @param {String} $elem_sel_parent_str The selector of the parent object
     * @param {String} $elem_sel_child_str The selector of the suspected child object
     * @return {Boolean}
     */
    window.elementIsChildOf = function($elem_sel_parent_str, $elem_sel_child_str){
        var result_bool = false,
            elem_parent = $(''+$elem_sel_parent_str+''),
            elem_child = $(''+$elem_sel_child_str+'');

        switch(true)
        {
            case ($(elem_child).parents().index(elem_parent) != -1):
                result_bool = true;
                break;
        }

        return result_bool;
    };

    /**
     * Retrieves the text value of a JQuery Selector
     * @param {Object} el the JQuery Object/Element
     * @return {String}
     */
    window.getSelector = function(el){
        var $el = $(el);

        var id = $el.attr("id");
        if (id) { //"should" only be one of these if theres an ID
            return "#"+ id;
        }

        var node = $el[0].nodeName.toLowerCase();
        if(node == 'html' || node == 'body'){
            return node;
        }

        var selector = $el.parents()
            .map(function() { return this.tagName; })
            .get().reverse().join(" ");

        if (selector) {
            selector += " "+ $el[0].nodeName;
        }

        var classNames = $el.attr("class");
        if (classNames) {
            selector += "." + $.trim(classNames).replace(/\s/gi, ".");
        }

        var name = $el.attr('name');
        if (name) {
            selector += "[name='" + name + "']";
        }
        if (!name){
            var index = $el.index();
            if (index) {
                index = index + 1;
                selector += ":nth-child(" + index + ")";
            }
        }
        return selector;
    };

})(jQuery);


/*! Restive.JS | @copyright 2013 Obinwanne Hill */
var Restive = (function(window, document, $) {

    //Check for Dependency
    switch(true)
    {
        case (typeof $ != 'function'):
            //exit gracefully if missing
            throw 'Restive.JS requires JQuery to run!';
            break;
    }

    //Define local vars
    var root = this,
        Restive,
        win = window,
        docElem = document.documentElement,
        $win = $(win),
        screen = win.screen,
        vSpan, vPitch, cSpan, cPitch, dSpan, dPitch, eSpan, ePitch,
        media  = win.matchMedia || win.msMatchMedia || Object
        ;

    //Create window storage
    window.rstv_store = {'main': {}};
    window.parent.rstv_store = {'main': {}};

    //Create window storage function
    window.rstv_store.storage = function(){
        var myArgs = Array.prototype.slice.call(arguments),
            key_str = myArgs[0],
            value_res = myArgs[1],
            is_value_valid_bool = !!((typeof value_res !== "undefined" && value_res !== null) && ((isString(value_res) && value_res != "") || isNumber(value_res) || (isArray(value_res) && count(value_res) > 0) || isBool(value_res) || isObject(value_res))),
            is_value_null_bool = !!((value_res === null))
            ;

        switch(true)
        {
            case (is_value_valid_bool):
                window.rstv_store.main[""+key_str+""] = value_res;
                return;
                break;

            case (is_value_null_bool):
                window.rstv_store.main[""+key_str+""] = null;
                return;
                break;

            default:
                return window.rstv_store.main[""+key_str+""];
        }
    };

    /**
     * Initialize and store some important default values.
     * Return false if initialization has already been performed in same session.
     * @return {Boolean}
     */
    var init = function () {
        //detect private browsing
        window.rstv_store.main["rstv_is_priv_browsing"] = !!((_detectPrivateBrowsing()));

        var is_init_bool = store("rstv_is_init"),
            retr;

        switch (true) {
            case (is_init_bool):
                store("rstv_timestamp_curr", microtime(true));

                store("rstv_url", getUrl('bp'));

                //load counter
                _loadCounter();

                /** FIX FOR LOCAL BROWSER-BASED EMULATORS **/
                _fixForLocalDev();

                //update the dimension and orientation info storage-wide
                _initDimensionVars();
                _updateDimensionStore();
                _updateOrientationStore();

                retr = false;
                break;

            default:
                //flag that defaults are set
                store("rstv_timestamp_curr", microtime(true));
                store("rstv_timestamp_init", store("rstv_timestamp_curr"));
                store("rstv_loaded_count", 0, '', {expires: 1500});

                store("rstv_is_init", true);

                store("rstv_url", getUrl('bp'));
                store("rstv_url_hash", md5(getUrl('bp')));

                _initDimensionVars();
                _updateDimensionStore();
                store("rstv_ort_init", getOrientation());
                store("rstv_ort_curr", getOrientation());

                //load counter
                _loadCounter();

                retr = true;
        }

        return retr;
    };

    /**
     * Reinitializes the Restive Class on Demand
     * It resets Dimension, Orientation, and Timestamp Info
     * The Restive Class is initialized as soon as Restive.JS is called via <script\> tag. In certain circumstances
     * this might bring out a slight change in Dimension and Orientation Data especially for PCs.
     * Re-initialization will usually correct any discrepancies
     * NOTE: It is advised that you use this function only once, within document.ready, and before any other Restive-related methods
     */
    function reInit()
    {
        //reset timestamps
        store("rstv_timestamp_curr", microtime(true));
        store("rstv_timestamp_init", store("rstv_timestamp_curr"));

        //update the dimension and orientation info storage-wide
        _initDimensionVars();
        _updateDimensionStore();
        store("rstv_ort_init", getOrientation());
        store("rstv_ort_curr", getOrientation());
    }

    /**
     * Initializes important dimension variables to Local storage
     * @private
     */
    function _initDimensionVars()
    {
        store("rstv_var_doc_client_w", docElem.clientWidth);
        store("rstv_var_doc_client_h", docElem.clientHeight);
        store("rstv_var_win_outer_w", window.outerWidth);
        store("rstv_var_win_outer_h", window.outerHeight);
        store("rstv_var_win_screen_w", screen.width);
        store("rstv_var_win_screen_h", screen.height);
    }

    /**
     * Keeps track of how many times Restive.JS is loaded in rapid succession in a single browser session
     * @private
     */
    function _loadCounter()
    {
        var load_count_int = parseInt(store("rstv_loaded_count"));
        switch(true)
        {
            case (!isNumber(load_count_int)):
                load_count_int = 0;
                break;
        }
        load_count_int++;
        store("rstv_loaded_count", load_count_int, '', {expires: 1500});
    }

    /**
     * This is a special function to deal with certain issues experienced when using Restive.JS in Chrome Ripple
     * and other Browser Based Mobile Device emulators that load scripts more than once in rapid succession
     * when they are being initialized
     * @private
     */
    function _fixForLocalDev()
    {
        var load_count_int = parseInt(store("rstv_loaded_count")),
            ffld_is_init_bool = store("rstv_ffld_is_init");

        switch(true)
        {
            case (load_count_int > 1):
                store("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH", null);
                store("rstv_is_ios rstv_is_android rstv_is_blackberry rstv_is_symbian rstv_is_windows rstv_is_windows_phone", null);
                store("rstv_is_android_1_ rstv_is_android_2_ rstv_is_android_3_", null);
                store("rstv_is_phone rstv_is_tablet rstv_is_tv rstv_is_pc", null);
                store("rstv_ort_curr rstv_timestamp_curr rstv_is_portrait rstv_is_landscape", null);
                store("rstv_multi_count rstv_multi_bpm_idx rstv_cache_bpm rstv_cache_bpm_lock rstv_cache_req rstv_cache_bpm_viewport_diff", null);
                store("rstv_user_agent", null);

                store("rstv_timestamp_curr", microtime(true));
                store("rstv_ort_curr", getOrientation());

                switch(true)
                {
                    case (!ffld_is_init_bool):

                        store("rstv_timestamp_init", store("rstv_timestamp_curr"));
                        store("rstv_ort_init", getOrientation());

                        //Mark that this function has been executed
                        store("rstv_ffld_is_init", true);
                        break;
                }

                break;
        }
    }

    /**
     * Detects whether private browsing is active or not
     * @return {Boolean}
     */
    function _detectPrivateBrowsing()
    {
        try {
            localStorage.setItem("__test", "data");
        }
        catch (e)
        {
            if (/QUOTA_?EXCEEDED/i.test(e.name)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Stores a value in LocalStorage [or other storage type], or retrieves previously stored value
     * Leverages AmplifyJS Store
     * @param key_str The identifier for the value being stored
     * @param value_res The value to store [optional]
     * @param type_str The type of storage format to be used
     * @param options_res A set of key/value pairs that relate to settings for storing the value
     * @return {*}
     */
    function store()
    {
        var myArgs = Array.prototype.slice.call(arguments);
        var is_priv_browsing_bool = window.rstv_store.main["rstv_is_priv_browsing"],
            key_str = myArgs[0],
            value_res = myArgs[1],
            type_str = ((typeof myArgs[2] !== "undefined" && myArgs[2] !== null) && (isString(myArgs[2]) && myArgs[2] != "")) ? myArgs[2] : 'ss',
            options_res = myArgs[3],
            store_func_name,
            store_func,
            list_del_key_arr = [],
            is_getall_bool = (isString(key_str) && key_str != "") ? false: true,
            is_value_valid_bool = !!((typeof value_res !== "undefined" && value_res !== null) && ((isString(value_res) && value_res != "") || isNumber(value_res) || (isArray(value_res) && count(value_res) > 0) || isBool(value_res) || isObject(value_res))),
            is_value_null_bool = !!((value_res === null));

        try
        {
            switch(true)
            {
                case (is_priv_browsing_bool):
                    //Private Browsing Detected, Use Windows Store
                    store_func_name = 'storage';
                    store_func = window.rstv_store[store_func_name];
                    break;

                default:
                    //Use AmplifyJS Store
                    switch(true)
                    {
                        case (type_str == 'ls'):
                            store_func_name = 'localStorage';
                            break;

                        default:
                            store_func_name = 'sessionStorage';
                    }
                    store_func = amplify.store[store_func_name];

                    //if sessionStorage is not supported, default to amplifyJS
                    switch(true)
                    {
                        case (!window.sessionStorage || !window.localStorage):
                            store_func = amplify.store;
                            break;
                    }

                    //return all values if no key is provided
                    switch(true)
                    {
                        case (is_getall_bool):
                            return store_func();
                            break;
                    }
            }

            //return stored value if empty value argument and value is not null
            switch(true)
            {
                case (!is_value_valid_bool && !is_value_null_bool):
                    return store_func(key_str);
                    break;
            }

            //delete object if value is null
            switch(true)
            {
                case (is_value_null_bool):
                    //delete stored object(s)
                    list_del_key_arr = explode(" ", key_str);
                    for (var i = 0; i < count(list_del_key_arr); i++)
                    {
                        store_func(list_del_key_arr[i], null);
                    }
                    return null;
                    break;
            }

            //store value
            store_func(key_str, null);
            store_func(key_str, value_res, options_res);
        }
        catch(e){
            alert(e);

        }
    }

    /**
     * This function is used to track specific String values in a storage system
     * The two possible storage options are (1) Cookies, and (2) Local Storage
     * It will store individual values as a tokenized string.
     * For example, if you call this function on two strings 'trial' and 'error', the stored value will be 'trial|error'
     *
     * @param key_str {String} The identifier of the value being stored
     * @param value_str {String} The individual value to store and track
     * @param store_type_str {String} The storage type of the container that will hold the stored value. 'ck' represents 'Cookie', and 'ls' represents 'LocalStorage'
     * @param unique_bool {Boolean} The setting that determines if the individual values should be unique. If this is true, no two string values will be identical
     * @param expires_ck_int|expires_ls_int {Number} Expiry setting
     * @param reverse_order_bool {Boolean} This affects the order with which data is stored. If true, data will be stored in a LIFO (Last In - First Out) format. If false, data will be store in a FIFO (First In - First Out) format
     * @param delim_str {String} The character that will be used to delimit the stored string
     * @param data_count_int {Number} The number of individual
     * @return {Boolean}
     */
    function storeVarTracker(key_str, value_str)
    {
        /**
         * This function saves the current Restive.JS settings tracking code to history
         */
        var myArgs = Array.prototype.slice.call(arguments),
            store_type_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2] : 'ck',
            unique_bool = (isBool(myArgs[3])) ? myArgs[3]: false,
            expires_ls_int = (isNumber(myArgs[4]) || isString(myArgs[4])) ? parseInt(myArgs[4]): '',
            expires_ck_int = (isNumber(myArgs[4]) || isString(myArgs[4])) ? parseInt(myArgs[4]): 30,
            reverse_order_bool = (isBool(myArgs[5])) ? myArgs[5]: true,
            delim_str = (isString(myArgs[6]) && myArgs[6] != "") ? myArgs[6]: '-!',
            data_count_int = (isNumber(myArgs[7]) || isString(myArgs[7])) ? parseInt(myArgs[7]): 60,
            history_tok_str,
            history_upd_tok_str,
            history_arr = [],
            history_upd_arr = []
            ;

        //check if this tracking code exists
        history_tok_str = (store_type_str == 'ls') ? store(key_str) : $.cookie(key_str);
        switch(true)
        {
            case (history_tok_str === null || typeof history_tok_str === "undefined"):
                (store_type_str == 'ls') ? store(key_str, value_str,
                    '', {expires: expires_ls_int}) : $.cookie(key_str, value_str, { expires: expires_ck_int, path: '/' });

                return true;
                break;

            case (typeof history_tok_str !== "undefined" && history_tok_str !== null && history_tok_str != ""):
                //get cookie info and check if tracking cookie exists
                history_arr = explode(delim_str, history_tok_str);
                switch(true)
                {
                    case (in_array(value_str, history_arr) && unique_bool):
                        return false;
                        break;

                    default:
                        //generate the current tracking code
                        switch(true)
                        {
                            case (reverse_order_bool):
                                history_arr.unshift(value_str);
                                history_upd_arr = history_arr.slice(0, data_count_int);

                                history_upd_tok_str = implode(delim_str, history_upd_arr);
                                break;

                            default:
                                history_arr.push(value_str);
                                history_upd_tok_str = implode(delim_str, history_arr);
                        }

                        //store the tracking code
                        (store_type_str == 'ls') ? store(key_str, history_upd_tok_str, '', {expires: expires_ls_int}) : $.cookie(key_str, history_upd_tok_str, { expires: expires_ck_int, path: '/' });

                        return true;
                }
                break;
        }
    }

    /**
     * This function is used to validate a string value against the tokenized string stored via storeVarTracker()
     * It checks to see if the string value is one of the tokenized item. If yes, it returns true; if no, it returns false
     * For example if needle = 'trial', and the var_key_str identifies a stored string with value = 'trial|error', then validation will be successful
     * @param value_needle_str {String} The string value that will be validated against the stored value
     * @param key_str {String} The identifier of the value that was stored via storeVarTracker()
     * @param store_type_str {String} The storage type of the container holding the stored value. 'ck' represents 'Cookie', and 'ls' represents 'LocalStorage'
     * @param delim_str {String} The character that will be used to delimit the stored string
     * @return {Boolean}
     */
    function storeVarValidator(value_needle_str, key_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            store_type_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2] : 'ck',
            delim_str = (isString(myArgs[3]) && myArgs[3] != "") ? myArgs[3] : '-!',
            value_str = (store_type_str == 'ls') ? store(key_str) : $.cookie(key_str);

        switch(true)
        {
            case (typeof value_str !== "undefined" && value_str !== null && value_str != ""):
                var value_arr = [];
                value_arr = explode(delim_str, value_str);

                switch(true)
                {
                    case (in_array(value_needle_str, value_arr)):
                        //tracking code is in history
                        return true;
                        break;

                    default:
                        return false;
                }
                break;

            default:
                return false;
        }
    }

    /**
     * Checks if a value stored in LocalStorage exists and contains a value
     * Also stores a value if provided if the value did not previously exist or was invalid
     * @param key_str {String} The identifier for the value that was stored
     * @param value_store_res {*} The value to store [optional]
     * @return {Boolean}
     */
    function isStorageValueSet(key_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            value_store_res = myArgs[1],
            value_retr_res = store(''+key_str+''),
            is_value_valid_bool = !!((typeof value_store_res !== "undefined" && value_store_res !== null)),
            is_store_value_set_bool = false
            ;

        //Determine if store value exists and is valid
        switch(true)
        {
            case (isBool(value_retr_res) || (value_retr_res !== null && typeof value_retr_res !== "undefined" && value_retr_res != "")):
                is_store_value_set_bool = true;
                break;
        }

        //Return result of check immediately if no value is provided
        switch(true)
        {
            case (!is_value_valid_bool):
                return is_store_value_set_bool;
                break;
        }

        //Store value if it does not exist and/or is invalid.
        switch(true)
        {
            case (!is_store_value_set_bool):
                store(key_str, value_store_res);
                break;
        }
    }

    /**
     * Increment (or Decrement) a stored variable
     * @param key_str {String} The identifier of the value that was stored
     * @param increment_value_int {Number} The size of the increment operation. Default is 1
     * @param is_decrement_bool {Boolean} If set to true, will decrement instead of increment
     * @return {Number|Boolean}
     */
    function incrementStorageValue(key_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            increment_value_int = (isNumber(myArgs[1])) ? myArgs[1]: 1,
            is_decrement_bool = (isBool(myArgs[2])) ? myArgs[2]: false,
            value_int;

        value_int = parseInt(store(key_str));
        switch(true)
        {
            case (!isNumber(value_int)):
                return false;
                break;
        }

        value_int = (is_decrement_bool) ? value_int - increment_value_int: value_int + increment_value_int;
        store(key_str, value_int);

        return value_int;
    }

    /**
     * Returns a list of standard resolution dimensions
     * @param class_str {String} the class of dimensions to return. It could be 'w' = widths, or 'h' = heights
     * @return {Array}
     * @private
     */
    function _getResolutionDimensionList(class_str)
    {
        var std_w_arr = [120, 128, 160, 200, 240, 272, 300, 320, 352, 360, 480, 540, 576, 600, 640, 720, 768, 800, 864, 900, 1024, 1050, 1080, 1152, 1200, 1440, 1536, 1600, 1800, 2048, 2160, 2400, 3072, 3200, 4096, 4320, 4800],
            std_h_arr = [160, 240, 260, 320, 400, 432, 480, 640, 720, 800, 854, 960, 1024, 1136, 1152, 1280, 1360, 1366, 1400, 1440, 1600, 1680, 1920, 2048, 2560, 2880, 3200, 3840, 4096, 5120, 6400, 7680]
            ;

        switch(true)
        {
            case (class_str == 'w'):
                return std_w_arr;
                break;

            case (class_str == 'h'):
                return std_h_arr;
                break;
        }
    }

    /**
     * Get the Viewport or Screen Dimensions of the Device
     * @param type_str {String} The type of operation to execute
     * vW = viewport width, vH = viewport height, sW = screen width, sH = screen height
     * @param adj_screen_size_bool {Boolean} This determines if the screen size result should be adjusted to return the nearest standard resolution. For example if actual screen height is 1184, 1280 will be returned as it is the nearest standard resolution height. Default is true
     * @return {*}
     * @private
     */
    function _getDimension(type_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            adj_screen_size_bool = (isBool(myArgs[1])) ? myArgs[1]: true,
            dim_res,
            dim_res_adj,
            adj_dim_res_bool = false,
            is_pc_or_tv_bool = !!((isPC() || isTV())),
            pixel_ratio_device_int = getPixelRatio(),
            pixel_ratio_virtual_int,
            win_outer_w_int = store("rstv_var_win_outer_w"),
            win_outer_h_int = store("rstv_var_win_outer_h"),
            doc_client_w_int = store("rstv_var_doc_client_w"),
            doc_client_h_int = store("rstv_var_doc_client_h"),
            win_screen_w_int = store("rstv_var_win_screen_w"),
            win_screen_h_int = store("rstv_var_win_screen_h")
            ;

        /**
         * Return dimensions quickly if device is PC
         */
        switch(true)
        {
            case (is_pc_or_tv_bool):
                switch(true)
                {
                    case (type_str == 'vW'):
                        dim_res = doc_client_w_int;
                        break;

                    case (type_str == 'vH'):
                        dim_res = doc_client_h_int;
                        break;

                    case (type_str == 'sW'):
                        dim_res = win_screen_w_int;
                        break;

                    case (type_str == 'sH'):
                        dim_res = win_screen_h_int;
                        break;
                }

                switch(true)
                {
                    case (type_str == 'vW' || type_str == 'vH'):
                        dim_res = (pixel_ratio_device_int >= 1.5) ? dim_res * pixel_ratio_device_int : dim_res;
                        break;
                }

                dim_res = Math.floor(dim_res);
                return dim_res;

                break;
        }

        /**
         * If not PC, continue processing
         */

        var device_user_agent_str = getUserAgent(),
            is_opera_browser_bool = /opera.+(mini|mobi)/i.test(device_user_agent_str),
            is_ios_bool = !!((isIOS())),
            is_symbian_bool = !!((isSymbian())),
            is_windows_bool = !!((isWindows())),
            is_android_bool = !!((isAndroid())),
            is_android_1_bool = !!((isAndroid('1.'))),
            is_android_2_bool = !!((isAndroid('2.'))),
            is_special_needs_bool = !!(((is_android_1_bool || is_android_2_bool) || is_symbian_bool || is_windows_bool)),
            viewport_w_int,
            viewport_h_int,
            screen_w_int = win_screen_w_int,
            screen_h_int = win_screen_h_int,
            screen_w_fix_int = screen_w_int,
            ort_w_int,
            ort_h_int,
            viewport_w_to_screen_w_ratio_int,
            screen_w_to_viewport_w_diff_int,
            screen_w_to_h_ratio_int,
            fixed_screen_dim_bool,
            std_w_arr = _getResolutionDimensionList('w'),
            std_h_arr = _getResolutionDimensionList('h'),
            std_w_temp_arr = std_w_arr,
            std_h_temp_arr = std_h_arr,
            is_landscape_v_bool,                    //viewport
            is_landscape_s_bool,                    //screen
            is_landscape_v_extended_verify_bool
            ;

        /**
         * Get the viewport dimensions
         */
        switch(true)
        {
            case (is_special_needs_bool):
                viewport_w_int = (win_outer_w_int <= 0) ? doc_client_w_int : win_outer_w_int;
                viewport_h_int = (win_outer_h_int <= 0) ? doc_client_h_int : win_outer_h_int;
                ort_w_int = viewport_w_int;
                ort_h_int = viewport_h_int;
                break;

            default:
                viewport_w_int = doc_client_w_int;
                viewport_h_int = doc_client_h_int;
                ort_w_int = doc_client_w_int;
                ort_h_int = doc_client_h_int;
        }

        /**
         * Modify Screen Dimensions if Android 2 or Symbian Platform
         */
        switch(true)
        {
            case ((is_android_2_bool || is_symbian_bool) && !is_opera_browser_bool):
                screen_w_int = (win_outer_w_int <= 0) ? screen_w_int : win_outer_w_int;
                screen_h_int = (win_outer_h_int <= 0) ? screen_h_int : win_outer_h_int;
                break;
        }

        //Determine orientation
        screen_w_to_h_ratio_int = screen_w_int/screen_h_int;
        screen_w_to_viewport_w_diff_int = screen_w_int - viewport_w_int;
        screen_w_to_viewport_w_diff_int = Math.abs(screen_w_to_viewport_w_diff_int);

        is_landscape_v_extended_verify_bool = (is_opera_browser_bool && viewport_w_int < 260) ? ((screen_w_to_viewport_w_diff_int <= 4) && (screen_w_to_h_ratio_int >= 1) ? true : false) : true;
        is_landscape_v_bool = !!((ort_h_int <= ort_w_int) && is_landscape_v_extended_verify_bool);
        is_landscape_s_bool = !!((screen_h_int <= screen_w_int));

        /**
         * Reduce resolution dimension list size if iOS
         * This improves the accuracy for first-generation iOS devices
         */
        switch(true)
        {
            case (is_ios_bool):
                std_w_temp_arr = std_w_temp_arr.slice(7);
                std_h_temp_arr = std_h_temp_arr.slice(6);
                break;

            case (is_android_bool):
                std_w_temp_arr = std_w_temp_arr.slice(4);
                std_h_temp_arr = std_h_temp_arr.slice(3);
                break;

            case (is_symbian_bool):
                std_w_temp_arr = std_w_temp_arr.slice(4);
                break;
        }

        /**
         * Reverse resolution dimension list when orientation changes
         */
        switch(true)
        {
            case (is_landscape_v_bool):
                std_w_arr = std_h_temp_arr;
                std_h_arr = std_w_temp_arr;
                break;

            default:
                std_w_arr = std_w_temp_arr;
                std_h_arr = std_h_temp_arr;
        }

        /**
         * Get Dimensions
         */
        switch(true)
        {
            case (type_str == 'vW'):
                dim_res = viewport_w_int;
                break;

            case (type_str == 'vH'):
                dim_res = viewport_h_int;
                break;

            case (type_str == 'sW'):
                /**
                 * This aims to correct any screen dimension discrepancies that usually occur when the
                 * raw viewport dimensions say the orientation is in one mode, but the raw screen dimensions
                 * say it is in another mode. Certain devices e.g. iPad will not change screen dimensions as the
                 * orientation changes. When this happens, we reverse values for screen_w and screen_h to compensate
                 */
                fixed_screen_dim_bool = !!((is_landscape_v_bool === true && is_landscape_s_bool === false) || (is_landscape_v_bool === false && is_landscape_s_bool === true));

                dim_res = (fixed_screen_dim_bool) ? screen_h_int : screen_w_int ;

                //get the fixed screen width
                screen_w_fix_int = (fixed_screen_dim_bool) ? screen_h_int : screen_w_int ;

                dim_res_adj = dim_res * pixel_ratio_device_int;
                adj_dim_res_bool = adj_screen_size_bool ? ((in_array(dim_res, std_w_arr) || in_array(dim_res_adj, std_w_arr)) ? false: true) : false;
                break;

            case (type_str == 'sH'):
                /**
                 * This aims to correct any screen dimension discrepancies that usually occur when the
                 * raw viewport dimensions say the orientation is in one mode, but the raw screen dimensions
                 * say it is in another mode. Certain devices e.g. iPad will not change screen dimensions as the
                 * orientation changes. When this happens, we reverse values for screen_w and screen_h to compensate
                 */
                fixed_screen_dim_bool = !!((is_landscape_v_bool === true && is_landscape_s_bool === false) || (is_landscape_v_bool === false && is_landscape_s_bool === true));

                dim_res = (fixed_screen_dim_bool) ? screen_w_int : screen_h_int ;

                //get the fixed screen width
                screen_w_fix_int = (fixed_screen_dim_bool) ? screen_h_int : screen_w_int ;

                dim_res_adj = dim_res * pixel_ratio_device_int;
                adj_dim_res_bool = adj_screen_size_bool ? ((in_array(dim_res, std_h_arr) || in_array(dim_res_adj, std_h_arr)) ? false: true) : false;
                break;
        }

        /**
         * Get the virtual pixel ratio i.e. screen vs viewport dimensions
         */
        pixel_ratio_virtual_int = screen_w_fix_int/viewport_w_int;

        /**
         * Return if Device Pixel Ratio is 1 or less and Virtual Pixel Ratio is less than 1.1
         */
        switch(true)
        {
            case (pixel_ratio_device_int <= 1 && pixel_ratio_virtual_int <= 1.1):
                switch(true)
                {
                    case (type_str == 'sW' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_w_arr, dim_res, '', '', 8);
                        break;

                    case (type_str == 'sH' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_h_arr, dim_res, '', '', 8);
                        break;
                }
                return dim_res;
                break;
        }

        /**
         * Continue if Pixel Ratio is greater than 1
         */
        switch(true)
        {
            case (is_ios_bool):
                dim_res = dim_res * pixel_ratio_device_int;
                break;

            default:
                switch(true)
                {
                    case (!is_android_2_bool):
                        /**
                         * Case 1: Device Pixel Ratio is 1 or less, and Virtual Pixel Ratio is greater than 1.1
                         * Update Viewport Dimensions only. Do not update Screen Dimensions
                         * Case 2. Device Pixel Ratio is more than 1, and Virtual Pixel Ratio is less than or equal to 1.1
                         * Update both Viewport and Screen Dimensions
                         * Case 3. Device Pixel Ratio is more than 1, and Virtual Pixel Ratio is greater than 1.1
                         * Update Viewport Dimensions only. Do not update Screen Dimensions
                         */
                        switch(true)
                        {
                            //1
                            case (pixel_ratio_device_int <= 1 && pixel_ratio_virtual_int > 1.1):
                                dim_res = (in_array(type_str, ['vW', 'vH'])) ? dim_res * pixel_ratio_virtual_int : dim_res;
                                break;
                            //2
                            case (pixel_ratio_device_int > 1 && pixel_ratio_virtual_int <= 1.1):
                                switch(true)
                                {
                                    case (pixel_ratio_device_int <= 1.1):
                                        //Special Operation for some devices that report device pixel ratio slightly above one
                                        switch(true)
                                        {
                                            case (in_array(type_str, ['vW', 'vH'])):
                                                dim_res = dim_res * pixel_ratio_device_int;
                                                dim_res = (isEvenDecimal(dim_res)) ? Math.floor(dim_res) : dim_res;
                                                break;
                                        }
                                        break;

                                    default:
                                        dim_res = dim_res * pixel_ratio_device_int;
                                }
                                break;
                            //3
                            case (pixel_ratio_device_int > 1 && pixel_ratio_virtual_int > 1.1):
                                switch(true)
                                {
                                    case (in_array(type_str, ['vW', 'vH'])):
                                        dim_res = dim_res * pixel_ratio_device_int;
                                        dim_res = (isEvenDecimal(dim_res)) ? Math.floor(dim_res) : Math.ceil(dim_res);
                                        break;
                                }
                                break;
                        }
                        break;
                }

                /**
                 * Get the nearest standard screen widths or heights
                 */
                switch(true)
                {
                    case (type_str == 'sW' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_w_arr, dim_res, '', '', 8);
                        break;

                    case (type_str == 'sH' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_h_arr, dim_res, '', '', 8);
                        break;
                }
        }

        dim_res = Math.floor(dim_res);
        return dim_res;
    }

    /**
     * Get the Viewport dimensions in Device-Independent Pixels
     * @param type_str {String} The type of operation. Either 'w' for width, or 'h' for height
     * @return {Number}
     * @private
     */
    function _getViewportDimensionDIP(type_str)
    {
        var dim_res,
            is_width_bool = !!((type_str == 'w')),
            is_pc_or_tv_bool = !!((isPC() || isTV())),
            pixel_ratio_int = getPixelRatio()
            ;

        switch(true)
        {
            case (is_pc_or_tv_bool):
                //If pc or tv, moderate use of pixel ratio
                pixel_ratio_int = (pixel_ratio_int <= 1.5) ? 1 : pixel_ratio_int;
                break;
        }
        dim_res = (is_width_bool) ? viewportW()/pixel_ratio_int : viewportH()/pixel_ratio_int;
        return Math.round(dim_res);
    }

    /**
     * Get the dimension of a DOM Element.
     * It uses the JQuery dimension functions e.g. width(), innerHeight(), etc.
     * @param el_obj {String} The JQuery element object
     * @param type_str {String} The type of operation. w = width, h = height
     * @param format_str {String} The dimension retrieval method to use. There are three as follows
     * 1: d = default = el_obj.width() or el_obj.height()
     * 2: i = inner = el_obj.innerWidth() or el_obj.innerHeight()
     * 3: o = outer = el_obj.outerWidth() or el_obj.outerHeight()
     * @param force_dip_bool {Boolean} Determines whether to consider the element dimensions in device-independent pixel format or not. true = do not use DIP, false [default] = use DIP
     * @return {Number|Boolean}
     * @private
     */
    function _getElementDimension(el_obj, type_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            format_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2]: 'd',
            force_dip_bool = (isBool(myArgs[3])) ? myArgs[3]: false,
            dim_final_int
            ;
        type_str = type_str.toLowerCase();

        switch(true)
        {
            case (type_str == 'w'):
                switch(true)
                {
                    case (format_str == 'i'):
                        dim_final_int = el_obj.innerWidth();
                        break;

                    case (format_str == 'o'):
                        dim_final_int = el_obj.outerWidth();
                        break;

                    default:
                        dim_final_int = el_obj.width();
                }
                break;

            case (type_str == 'h'):
                switch(true)
                {
                    case (format_str == 'i'):
                        dim_final_int = el_obj.innerHeight();
                        break;

                    case (format_str == 'o'):
                        dim_final_int = el_obj.outerHeight();
                        break;

                    default:
                        dim_final_int = el_obj.height();
                }
                break;

            default:
                dim_final_int = false;
        }

        switch(true)
        {
            case (force_dip_bool === false):
                //Convert to Device Pixels
                dim_final_int = dim_final_int * getPixelRatio();
                break;
        }

        return dim_final_int;
    }

    /**
     * Get the width of a DOM element
     * @param el_obj {Object} The JQuery Element Object
     * @param dim_format_str {String} The dimension retrieval method to use.
     * @param force_dip_bool {Boolean} Flag for forced Device-Independent Pixel consideration
     * @return {Number|Boolean}
     * @private
     */
    function _elementW(el_obj){
        var myArgs = Array.prototype.slice.call(arguments),
            dim_format_str = myArgs[1],
            force_dip_bool = myArgs[2]
            ;
        return _getElementDimension(el_obj, 'w', dim_format_str, force_dip_bool);
    }

    /**
     * Get the height of a DOM element
     * @param el_obj {Object} The JQuery Element Object
     * @param dim_format_str {String} The dimension retrieval method to use.
     * @param force_dip_bool {Boolean} Flag for forced Device-Independent Pixel consideration
     * @return {Number|Boolean}
     * @private
     */
    function _elementH(el_obj){
        var myArgs = Array.prototype.slice.call(arguments),
            dim_format_str = myArgs[1],
            force_dip_bool = myArgs[2]
            ;
        return _getElementDimension(el_obj, 'h', dim_format_str, force_dip_bool);
    }

    /**
     * Get the width of the viewport
     * @return {*|Number}
     */
    function viewportW(){
        return (isStorageValueSet("rstv_viewportW")) ? store("rstv_viewportW"): _getDimension('vW', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the height of the viewport
     * @return {*|Number}
     */
    function viewportH(){
        return (isStorageValueSet("rstv_viewportH")) ? store("rstv_viewportH"): _getDimension('vH', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the width of the screen i.e. device width
     * @return {*|Number}
     */
    function screenW(){
        return (isStorageValueSet("rstv_screenW")) ? store("rstv_screenW"): _getDimension('sW', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the height of the screen i.e. device height
     * @return {*|Number}
     */
    function screenH(){
        return (isStorageValueSet("rstv_screenH")) ? store("rstv_screenH"): _getDimension('sH', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the Device-Independent Pixel width of the viewport
     */
    function pixelW()
    {
        return (isStorageValueSet("rstv_viewportW_dip")) ? store("rstv_viewportW_dip"): _getViewportDimensionDIP('w');
    }

    /**
     * Get the Device-Independent Pixel height of the viewport
     */
    function pixelH()
    {
        return (isStorageValueSet("rstv_viewportH_dip")) ? store("rstv_viewportH_dip"): _getViewportDimensionDIP('h');
    }

    /**
     * Resets/Updates the cached values (localStorage) of Viewport and Screen Dimension Info
     * @private
     */
    function _updateDimensionStore()
    {
        //reset
        store("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH", null);

        //reload
        store("rstv_viewportW", viewportW());
        store("rstv_viewportH", viewportH());
        store("rstv_screenW", screenW());
        store("rstv_screenH", screenH());
        store("rstv_viewportW_dip", pixelW());
        store("rstv_viewportH_dip", pixelH());
    }

    /**
     * Get the Device Pixel Ratio
     * @param decimal {Number} An optional number (integer or float) to check against actual pixel ratio
     * @return {Number|Boolean}
     */
    function getPixelRatio(decimal)
    {
        //check if pixel ratio check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_pixel_ratio")):
                return store("rstv_pixel_ratio");
                break;
        }

        var device_user_agent_str = getUserAgent(),
            is_opera_browser_bool = /opera.+(mini|mobi)/i.test(device_user_agent_str),
            doc_client_w = store("rstv_var_doc_client_w"),
            win_outer_w = store("rstv_var_win_outer_w"),
            win_screen_w = store("rstv_var_win_screen_w"),
            is_symbian_bool = !!(isSymbian()),
            is_windows_bool = !!(isWindows()),
            is_android_1_bool = !!((isAndroid('1.'))),
            is_android_2_bool = !!((isAndroid('2.'))),
            is_special_needs_bool = !!(((is_android_1_bool || is_android_2_bool) || is_symbian_bool || is_windows_bool)),
            is_windows_or_symbian_bool = !!(is_windows_bool || is_symbian_bool),
            viewport_w = (is_special_needs_bool) ? ((win_outer_w <= 0) ? doc_client_w : win_outer_w) : doc_client_w,
            screen_w = ((is_android_2_bool || is_symbian_bool) && !is_opera_browser_bool) ? ((win_outer_w <= 0) ? win_screen_w : win_outer_w) : win_screen_w,
            dPR,
            dPR_temp,
            dPR_virtual,
            dPR_retr
            ;

        /**
         * Get the Pixel Ratio
         * Make Adjustments for when window.devicePixelRatio is 0
         */
        dPR_temp = win.devicePixelRatio;
        switch(true)
        {
            case (dPR_temp <= 0 || typeof dPR_temp === 'undefined' || dPR_temp === null):
                dPR_virtual = screen_w/viewport_w;
                dPR = dPR_virtual;
                switch(true)
                {
                    case (is_windows_or_symbian_bool):
                        switch(true)
                        {
                            case (dPR > 0.5 && dPR < 1.2):
                                dPR = 1;
                                break;

                            case (dPR >= 1.2 && dPR < 2):
                                dPR = 1.5;
                                break;

                            case (dPR >= 2 && dPR < 3):
                                dPR = 2;
                                break;

                            case (dPR >= 3):
                                dPR = 3;
                                break;

                            default:
                                dPR = 1;
                        }
                        break;
                }
                store("rstv_pixel_ratio_virtual", dPR_virtual);
                break;

            default:
                dPR = dPR_temp;
        }

        //Return Pixel Ratio variations
        switch(true)
        {
            case (!isNumber(decimal)):
                dPR_retr = dPR || (getPixelRatio(3) ? 3 : getPixelRatio(2) ? 2 : getPixelRatio(1.5) ? 1.5 : getPixelRatio(1) ? 1 : 0);
                store("rstv_pixel_ratio", dPR_retr);
                return dPR_retr;
                break;
        }

        //Return false if not finite
        switch(true)
        {
            case (!isFinite(decimal)):
                return false;
                break;
        }

        switch(true)
        {
            case (dPR && dPR > 0):
                return dPR >= decimal;
                break;
        }

        //Revert to .matchMedia/.msMatchMedia for Gecko (FF6+) support
        decimal = 'only all and (min--moz-device-pixel-ratio:' + decimal + ')';
        switch(true)
        {
            case (media(decimal).matches):
                return true;
                break;
        }

        return !!media(decimal.replace('-moz-', '')).matches;
    }

    /**
     * Checks if the device is a Retina-device i.e. it has a Pixel Ratio of 2 or greater
     * @return {Boolean}
     */
    function isRetina()
    {
        var pixel_ratio_int = getPixelRatio();
        switch(true)
        {
            case (pixel_ratio_int >= 2):
                return true;
                break;
        }

        return false;
    }

    /**
     * A comparison function for checking if a number is within a range of two other numbers
     * @param {Function} fn
     * @return {Function}
     */
    function rangeCompare(fn) {
        return function(min, max) {
            var myArgs = Array.prototype.slice.call(arguments),
                bool,
                el = myArgs[2],
                el_valid_bool = !!((isObject(el) && (typeof el !== "undefined" && el !== null))),
                wf = myArgs[3],
                f_dip = myArgs[4],
                curr = (el_valid_bool) ? fn(el, wf, f_dip) : fn()
                ;

            bool = curr >= (min || 0);
            return !max ? bool : bool && curr <= max;
        };
    }

    //Range Comparison Booleans for Viewport and Screen
    vSpan = rangeCompare(viewportW);
    vPitch = rangeCompare(viewportH);
    dSpan = rangeCompare(screenW);
    dPitch = rangeCompare(screenH);
    cSpan = rangeCompare(pixelW);
    cPitch = rangeCompare(pixelH);

    //Range Comparison Booleans for DOM Element Containers
    eSpan = rangeCompare(_elementW);
    ePitch = rangeCompare(_elementH);

    /**
     * Gets the user agent of the Device
     * This function makes provision for proxy-based browsers that employ X11 forwarding
     * @return {String}
     */
    function getUserAgent()
    {
        //check if user agent check has been done and is in storage. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_user_agent")):
                return store("rstv_user_agent");
                break;
        }

        var ua = navigator.userAgent.toLowerCase(),
            is_proxy_bool;

        //Check if device user agent is being updated by proxy-based browser
        is_proxy_bool = /mozilla.+x11/i.test(ua);

        switch(true)
        {
            case (is_proxy_bool):
                $.ajax({
                    type: "GET",
                    async: false,
                    crossDomain: true,
                    url: "http://www.restive.io/ping/ua.php",
                    headers: {
                        "Cache-Control":"no-cache",
                        "Pragma":"no-cache"
                    },
                    success: function(response) {
                        ua = response;
                    },
                    error: function(xhr, status, error_msg){
                        console.log('error');/*RemoveLogging:skip*/
                    }
                });
                break;
        }

        store("rstv_user_agent", ua);
        return ua;
    }

    /**
     * Gets the Operating System Platform of the Device
     * There are six possible platforms available
     * (1) ios, (2) android, (3) Symbian, (4) Blackberry, (5) Windows, (6) Other
     * @return {String}
     */
    function getPlatform()
    {
        switch(true)
        {
            case (_checkOS("ios")):
                return "ios";
                break;

            case (_checkOS("android")):
                return "android";
                break;

            case (_checkOS("symbian")):
                return "symbian";
                break;

            case (_checkOS("blackberry")):
                return "blackberry";
                break;

            case (_checkOS("windows")):
                return "windows";
                break;

            default:
                return "other";
        }
    }

    /**
     * Detects the Operating System [Platform] of the Device
     * @param os_str {String} The name of the OS
     * @param version_str An optional version number [Only valid for Android]
     * @return {Boolean}
     * @private
     */
    function _checkOS(os_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            is_version_valid_bool = !!((isString(myArgs[1]) && myArgs[1] != "")),
            version_str = '',
            version_regex_suffix_str = '',
            version_store_suffix_str = ''
            ;

        //manage version string if provided
        switch(true)
        {
            case (is_version_valid_bool):
                version_str = myArgs[1];
                version_str = version_str.replace(/^\s+|\s+$/g, "");
                version_regex_suffix_str = ' '+version_str;
                version_store_suffix_str = '_'+version_str.replace(".", "_");
                break;
        }

        //Check if value is stored. Return if true
        switch(true)
        {
            case (isStorageValueSet("rstv_is_"+os_str+version_store_suffix_str)):
                return store("rstv_is_"+os_str+version_store_suffix_str);
                break;
        }

        var nav = getUserAgent(),
            is_os_bool = false;

        switch(true)
        {
            case (os_str == "ios"):
                is_os_bool = /\bipad|\biphone|\bipod/i.test(nav);
                break;

            case (os_str == "android"):
                var pattern = new RegExp("\\bandroid"+version_regex_suffix_str, "i");
                is_os_bool = pattern.test(nav);
                break;

            case (os_str == "symbian"):
                is_os_bool = /series(4|6)0|symbian|symbos|syb-[0-9]+|\bs60\b/i.test(nav);
                break;

            case (os_str == "blackberry"):
                is_os_bool = /bb[0-9]+|blackberry|playbook|rim +tablet/i.test(nav);
                break;

            case (os_str == "windows"):
                is_os_bool = /window mobile|windows +(ce|phone)|windows +nt.+arm|windows +nt.+touch|xblwp7|zunewp7/i.test(nav);
                break;

            case (os_str == "windows_phone"):
                is_os_bool = /windows +phone|xblwp7|zunewp7/i.test(nav);
                break;

            default:
                return false;
        }

        //persist to local storage and return
        store("rstv_is_"+os_str+version_store_suffix_str, is_os_bool);
        return !!((is_os_bool));
    }

    /**
     * Checks if the Device is based on Apple's iOS Platform
     * @return {Boolean}
     */
    function isIOS()
    {
        return _checkOS("ios");
    }

    /**
     * Checks if the Device is based on Apple's iOS Platform
     * @return {Boolean}
     */
    function isApple()
    {
        return _checkOS("ios");
    }

    /**
     * Checks if the Device is based on Android Platform
     * @return {Boolean}
     */
    function isAndroid()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            version_str = myArgs[0];
        return _checkOS("android", version_str);
    }

    /**
     * Checks if the Device is based on Symbian Platform
     * @return {Boolean}
     */
    function isSymbian()
    {
        return _checkOS("symbian");
    }

    /**
     * Checks if the Device is based on Blackberry Platform
     * @return {Boolean}
     */
    function isBlackberry()
    {
        return _checkOS("blackberry");
    }

    /**
     * Checks if the Device is based on a Windows Platform
     * @return {Boolean}
     */
    function isWindows()
    {
        return _checkOS("windows");
    }

    /**
     * Checks if the Device is based on Windows Phone Platform
     * @return {Boolean}
     */
    function isWindowsPhone()
    {
        return _checkOS("windows_phone");
    }

    /**
     * Mobile Browser Detection Regex
     * @param ua {String} User Agent String
     * @return {Boolean}
     * @private
     */
    function _mobileDetect(ua)
    {
        return /android|android.+mobile|avantgo|bada\/|\bbb[0-9]+|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|\bip(hone|od|ad)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|motorola|mobile.+firefox|netfront|nokia|nintendo +3ds|opera m(ob|in)i|palm|palm( os)?|phone|p(ixi|re)\/|playbook|rim +tablet|playstation.+vita|plucker|pocket|psp|samsung|(gt\-|bgt\-|sgh\-|sph\-|sch\-)[a-z][0-9]+|series(4|6)0|symbian|symbos|\bs60\b|treo|up\.(browser|link)|vertu|vodafone|wap|windows (ce|phone)|windows +nt.+arm|windows +nt.+touch|xda|xiino|xblwp7|zunewp7/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb|b\-[0-9]+)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
    }

    /**
     * Gets the Form Factor of the device
     * There are only three form factors available
     * (1) Phone, (2) Tablet, (3) TV, (4) PC
     * @return {String}
     */
    function getFormFactor()
    {
        var form_factor_str = "";

        switch(true)
        {
            case (isTablet()):
                form_factor_str = "tablet";
                break;

            case (isTV()):
                form_factor_str = "tv";
                break;

            default:
                switch(true)
                {
                    case (isPhone()):
                        form_factor_str = "phone";
                        break;

                    default:
                        form_factor_str = "pc";
                }
        }

        return form_factor_str;
    }

    /**
     * Check if the Device is a Phone
     * @return {Boolean}
     */
    function isPhone()
    {
        //check if phone check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_phone")):
                return store("rstv_is_phone");
                break;
        }

        //Check if Device is a Tablet
        switch(true)
        {
            case (isTablet(true) || isTV()):
                //is not phone
                store("rstv_is_phone", false);
                return false;
                break;
        }

        //Check if it is a phone
        switch(true)
        {
            case (_mobileDetect(getUserAgent() || navigator.vendor.toLowerCase() || window.opera)):
                store("rstv_is_phone", true);
                return true;
                break;
        }

        store("rstv_is_phone", false);
        return false;
    }

    /**
     * Check if the Device is a Tablet
     * @param bypass_storage_bool {Boolean} Prevent this method from caching its result in local storage
     * @return {Boolean}
     */
    function isTablet()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            bypass_storage_bool = isBool(myArgs[0]) ? myArgs[0] : false
            ;

        //check if tablet check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_tablet")):
                return store("rstv_is_tablet");
                break;
        }

        var regex_raw_str,
            regex,
            is_tablet_bool,
            nav = getUserAgent();

        //if iPad or Blackberry Playbook, return true
        regex = new RegExp("ipad|playbook|rim +tablet", "i");
        is_tablet_bool = regex.test(nav);
        switch(true)
        {
            case (is_tablet_bool):
                if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                return true;
                break;
        }

        //if Windows Surface, return true
        regex = new RegExp("windows +nt.+arm|windows +nt.+touch", "i");
        is_tablet_bool = regex.test(nav);
        switch(true)
        {
            case (is_tablet_bool):
                if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                return true;
                break;
        }

        /**
         * Check Other Known Tablets
         *
         * 1. Amazon Kindle: android.+kindle|kindle +fire|android.+silk|silk.*accelerated
         * 2. Google Nexus Tablet: android.+nexus +(7|10)
         * 3. Samsung Tablet: samsung.*tablet|galaxy.*tab|sc-01c|gt-p1000|gt-p1003|gt-p1010|gt-p3105|gt-p6210|gt-p6800|gt-p6810|gt-p7100|gt-p7300|gt-p7310|gt-p7500|gt-p7510|sch-i800|sch-i815|sch-i905|sgh-i957|sgh-i987|sgh-t849|sgh-t859|sgh-t869|sph-p100|gt-p3100|gt-p3108|gt-p3110|gt-p5100|gt-p5110|gt-p6200|gt-p7320|gt-p7511|gt-n8000|gt-p8510|sgh-i497|sph-p500|sgh-t779|sch-i705|sch-i915|gt-n8013|gt-p3113|gt-p5113|gt-p8110|gt-n8010|gt-n8005|gt-n8020|gt-p1013|gt-p6201|gt-p7501|gt-n5100|gt-n5110|shv-e140k|shv-e140l|shv-e140s|shv-e150s|shv-e230k|shv-e230l|shv-e230s|shw-m180k|shw-m180l|shw-m180s|shw-m180w|shw-m300w|shw-m305w|shw-m380k|shw-m380s|shw-m380w|shw-m430w|shw-m480k|shw-m480s|shw-m480w|shw-m485w|shw-m486w|shw-m500w|gt-i9228|sch-p739|sch-i925|gt-i9200|gt-i9205|gt-p5200|gt-p5210|sm-t311|sm-t310|sm-t210|sm-t210r|sm-t211|sm-p600|sm-p601|sm-p605|sm-p900|sm-t217|sm-t217a|sm-t217s|sm-p6000|sm-t3100|sgh-i467|xe500
         * 4. HTC Tablet: htc flyer|htc jetstream|htc-p715a|htc evo view 4g|pg41200
         * 5. Motorola Tablet: xoom|sholest|mz615|mz605|mz505|mz601|mz602|mz603|mz604|mz606|mz607|mz608|mz609|mz615|mz616|mz617
         * 6. Asus Tablet: transformer|^.*padfone((?!mobile).)*$|tf101|tf201|tf300|tf700|tf701|tf810|me171|me301t|me302c|me371mg|me370t|me372mg|me172v|me173x|me400c|slider *sl101
         * 7. Nook Tablet: android.+nook|nookcolor|nook browser|bnrv200|bnrv200a|bntv250|bntv250a|bntv400|bntv600|logicpd zoom2
         * 8. Acer Tablet: android.*\b(a100|a101|a110|a200|a210|a211|a500|a501|a510|a511|a700|a701|w500|w500p|w501|w501p|w510|w511|w700|g100|g100w|b1-a71|b1-710|b1-711|a1-810)\b|w3-810
         * 9. Toshiba Tablet: android.*(at100|at105|at200|at205|at270|at275|at300|at305|at1s5|at500|at570|at700|at830)|toshiba.*folio
         * 10. LG Tablet: \bl-06c|lg-v900|lg-v905|lg-v909
         * 11. Yarvik Tablet: android.+(xenta.+tab|tab210|tab211|tab224|tab250|tab260|tab264|tab310|tab360|tab364|tab410|tab411|tab420|tab424|tab450|tab460|tab461|tab464|tab465|tab467|tab468|tab469)
         * 12. Medion Tablet: android.+\boyo\b|life.*(p9212|p9514|p9516|s9512)|lifetab
         * 13. Arnova Tablet: an10g2|an7bg3|an7fg3|an8g3|an8cg3|an7g3|an9g3|an7dg3|an7dg3st|an7dg3childpad|an10bg3|an10bg3dt
         * 14. Archos Tablet: android.+archos|\b(101g9|80g9|a101it)\b|qilive 97r|
         * 15. Ainol Tablet: novo7|novo7aurora|novo7basic|novo7paladin|novo8|novo9|novo10
         * 16. Sony Tablet: sony tablet|sony tablet s|sgpt12|sgpt121|sgpt122|sgpt123|sgpt111|sgpt112|sgpt113|sgpt211|sgpt213|ebrd1101|ebrd1102|ebrd1201|sgpt311|sgpt312|sonyso-03e
         * 17. Cube Tablet: android.*(k8gt|u9gt|u10gt|u16gt|u17gt|u18gt|u19gt|u20gt|u23gt|u30gt)|cube u8gt
         * 18. Coby Tablet: mid1042|mid1045|mid1125|mid1126|mid7012|mid7014|mid7034|mid7035|mid7036|mid7042|mid7048|mid7127|mid8042|mid8048|mid8127|mid9042|mid9740|mid9742|mid7022|mid7010
         * 19. SMiTTablet: android.*(\bmid\b|mid-560|mtv-t1200|mtv-pnd531|mtv-p1101|mtv-pnd530)
         * 20. RockchipTablet: android.*(rk2818|rk2808a|rk2918|rk3066)|rk2738|rk2808a
         * 21. TelstraTablet: t-hub2
         * 22. FlyTablet: iq310|fly vision
         * 23. bqTablet: bq.*(elcano|curie|edison|maxwell|kepler|pascal|tesla|hypatia|platon|newton|livingstone|cervantes|avant)
         * 24. HuaweiTablet: mediapad|ideos s7|s7-201c|s7-202u|s7-101|s7-103|s7-104|s7-105|s7-106|s7-201|s7-slim
         * 25. NecTablet: \bn-06d|\bn-08d
         * 26. Pantech: pantech.*p4100
         * 27. BronchoTablet: broncho.*(n701|n708|n802|a710)
         * 28. VersusTablet: touchpad.*[78910]|\btouchtab\b
         * 29. Zynctablet: z1000|z99 2g|z99|z930|z999|z990|z909|z919|z900
         * 30. Positivo: tb07sta|tb10sta|tb07fta|tb10fta
         * 31. NabiTablet: android.*\bnabi
         * 32. Playstation: playstation.*(portable|vita)
         * 33. Dell: dell.*streak
         * 34. Milagrow: milagrow +tab.*top
         * 35. Lenovo: android.+(ideapad|ideatab|lenovo +a1|s2110|s6000|k3011|a3000|a1000|a2107|a2109|a1107)
         * 37. UPad: android.+f8-sup
         * 38. Kobo: android.+(k080|arc|vox)
         * 39. MSI: android.*(msi.+enjoy|enjoy +7|enjoy +10)
         * 40. Agasio: dropad.+a8
         * 41. Acho: android.+c906
         * 42. Iberry: android.+iberry.+auxus
         * 43. Aigo: android.+aigopad
         * 44. Airpad: android.*(airpad|liquid metal)
         * 45. HCL: android.+hcl.+tablet|connect-3g-2.0|connect-2g-2.0|me tablet u1|me tablet u2|me tablet g1|me tablet x1|me tablet y2|me tablet sync
         * 46. Karbonn: android.*(a39|a37|a34|st8|st10|st7|smarttab|smart +tab)
         * 47. Micromax: android.*(micromax.+funbook|funbook|p250|p275|p300|p350|p362|p500|p600)|micromax.*(p250|p275|p350|p362|p500|p600)|funbook
         * 48. Penta: android.+penta
         * 49. Celkon: android.*(celkon.+ct|ct-[0-9])
         * 50. Intex: android.+i-buddy
         * 51. Viewsonic: android.*(viewbook|viewpad)
         * 52: ZTE: android.*(v9|zte.+v8110|light tab|light pro|beeline|base.*tab)
         * 53. Pegatron: chagall
         * 54. Advan: android.*(vandroid|t3i)
         * 55. Creative: android.*(ziio7|ziio10)
         * 56. OlivePad: android.*(v-t100|v-tw100|v-tr200|v-t300)
         * 57. Vizio: android.+vtab1008
         * 58. Bookeen: bookeen|cybook
         * 59. Medion: android.*lifetab_(s9512|p9514|p9516)
         * 60. IRU Tablet: m702pro
         * 61. IRULU: irulu-al101
         * 62. Prestigio: pmp3170b|pmp3270b|pmp3470b|pmp7170b|pmp3370b|pmp3570c|pmp5870c|pmp3670b|pmp5570c|pmp5770d|pmp3970b|pmp3870c|pmp5580c|pmp5880d|pmp5780d|pmp5588c|pmp7280c|pmp7280|pmp7880d|pmp5597d|pmp5597|pmp7100d|per3464|per3274|per3574|per3884|per5274|per5474|pmp5097cpro|pmp5097|pmp7380d|pmp5297c|pmp5297c_quad
         * 63. AllView: allview.*(viva|alldro|city|speed|all tv|frenzy|quasar|shine|tx1|ax1|ax2)
         * 64: Megafon: megafon v9
         * 65: Lava: android.+(z7c|z7h|z7s)
         * 66: iBall: android.+iball.+slide.+(3g *7271|3g *7334|3g *7307|3g *7316|i7119|i7011)|android.+iball.+i6012
         * 67. Tabulet: android.+(tabulet|troy +duos)
         * 68. Texet Tablet: navipad|tb-772a|tm-7045|tm-7055|tm-9750|tm-7016|tm-7024|tm-7026|tm-7041|tm-7043|tm-7047|tm-8041|tm-9741|tm-9747|tm-9748|tm-9751|tm-7022|tm-7021|tm-7020|tm-7011|tm-7010|tm-7023|tm-7025|tm-7037w|tm-7038w|tm-7027w|tm-9720|tm-9725|tm-9737w|tm-1020|tm-9738w|tm-9740|tm-9743w|tb-807a|tb-771a|tb-727a|tb-725a|tb-719a|tb-823a|tb-805a|tb-723a|tb-715a|tb-707a|tb-705a|tb-709a|tb-711a|tb-890hd|tb-880hd|tb-790hd|tb-780hd|tb-770hd|tb-721hd|tb-710hd|tb-434hd|tb-860hd|tb-840hd|tb-760hd|tb-750hd|tb-740hd|tb-730hd|tb-722hd|tb-720hd|tb-700hd|tb-500hd|tb-470hd|tb-431hd|tb-430hd|tb-506|tb-504|tb-446|tb-436|tb-416|tb-146se|tb-126se
         * 69. GalapadTablet: android.*\bg1\b
         * 70. GUTablet: tx-a1301|tx-m9002|q702
         * 71. GT-Pad: ly-f528
         * 72. Danew: android.+dslide.*\b(700|701r|702|703r|704|802|970|971|972|973|974|1010|1012)\b
         * 73. MIDTablet: m9701|m9000|m9100|m806|m1052|m806|t703|mid701|mid713|mid710|mid727|mid760|mid830|mid728|mid933|mid125|mid810|mid732|mid120|mid930|mid800|mid731|mid900|mid100|mid820|mid735|mid980|mid130|mid833|mid737|mid960|mid135|mid860|mid736|mid140|mid930|mid835|mid733
         * 74. Fujitsu: android.*\b(f-01d|f-05e|f-10d|m532|q572)\b
         * 75. GPad: android.+casiatab8
         * 76. Tesco Hudl: android.+hudl
         * 77. Polaroid: android.*(polaroid.*tablet|pmid1000|pmid10c|pmid800|pmid700|pmid4311|pmid701c|pmid701i|pmid705|pmid706|pmid70dc|pmid70c|pmid720|pmid80c|pmid901|ptab7200|ptab4300|ptab750|midc010|midc407|midc409|midc410|midc497|midc700|midc800|midc801|midc802|midc901)
         * 78. Eboda: e-boda.+(supreme|impresspeed|izzycomm|essential)
         * 79. HP Tablet: hp slate 7|hp elitepad 900|hp-tablet|elitebook.*touch
         * 80. AllFineTablet: fine7 genius|fine7 shine|fine7 air|fine8 style|fine9 more|fine10 joy|fine11 wide
         * 81. Sanei: android.*\b(n10|n10-4core|n78|n79|n83|n90 ii)\b
         * 82: ProScan Tablet: \b(pem63|plt1023g|plt1041|plt1044|plt1044g|plt1091|plt4311|plt4311pl|plt4315|plt7030|plt7033|plt7033d|plt7035|plt7035d|plt7044k|plt7045k|plt7045kb|plt7071kg|plt7072|plt7223g|plt7225g|plt7777g|plt7810k|plt7849g|plt7851g|plt7852g|plt8015|plt8031|plt8034|plt8036|plt8080k|plt8082|plt8088|plt8223g|plt8234g|plt8235g|plt8816k|plt9011|plt9045k|plt9233g|plt9735|plt9760g|plt9770g)\b
         * 83: YonesTablet : bq1078|bc1003|bc1077|rk9702|bc9730|bc9001|it9001|bc7008|bc7010|bc708|bc728|bc7012|bc7030|bc7027|bc7026
         * 84: ChangJiaTablet: tpc7102|tpc7103|tpc7105|tpc7106|tpc7107|tpc7201|tpc7203|tpc7205|tpc7210|tpc7708|tpc7709|tpc7712|tpc7110|tpc8101|tpc8103|tpc8105|tpc8106|tpc8203|tpc8205|tpc8503|tpc9106|tpc9701|tpc97101|tpc97103|tpc97105|tpc97106|tpc97111|tpc97113|tpc97203|tpc97603|tpc97809|tpc97205|tpc10101|tpc10103|tpc10106|tpc10111|tpc10203|tpc10205|tpc10503
         * 85: RoverPad: android.*(roverpad|rp3wg70)
         * 86. PointofView Tablet: tab-p506|tab-navi-7-3g-m|tab-p517|tab-p-527|tab-p701|tab-p703|tab-p721|tab-p731n|tab-p741|tab-p825|tab-p905|tab-p925|tab-pr945|tab-pl1015|tab-p1025|tab-pi1045|tab-p1325|tab-protab[0-9]+|tab-protab25|tab-protab26|tab-protab27|tab-protab26xl|tab-protab2-ips9|tab-protab30-ips9|tab-protab25xxl|tab-protab26-ips10|tab-protab30-ips10
         * 87: Overmax: android.*ov-(steelcore|newbase|basecore|baseone|exellen|quattor|edutab|solution|action|basictab|teddytab|magictab|stream|tb-08|tb-09)
         * 88: DPS Tablet: dps dream 9|dps dual 7
         * 89: Visture Tablet: v97 hd|i75 3g|visture v4( hd)?|visture v5( hd)?|visture v10
         * 90: Cresta Tablet: ctp(-)?810|ctp(-)?818|ctp(-)?828|ctp(-)?838|ctp(-)?888|ctp(-)?978|ctp(-)?980|ctp(-)?987|ctp(-)?988|ctp(-)?989
         * 200. Generic Tablet: android.*\b97d\b|tablet(?!.*pc)|viewpad7|lg-v909|mid7015|bntv250a|logicpd zoom2|\ba7eb\b|catnova8|a1_07|ct704|ct1002|\bm721\b|rk30sdk|\bevotab\b|smarttabii10|smarttab10
         */
        regex_raw_str = ""+
            "android.+kindle|kindle +fire|android.+silk|silk.*accelerated|"+
            "android.+nexus +(7|10)|"+
            "samsung.*tablet|galaxy.*tab|sc-01c|gt-p1000|gt-p1003|gt-p1010|gt-p3105|gt-p6210|gt-p6800|gt-p6810|gt-p7100|gt-p7300|gt-p7310|gt-p7500|gt-p7510|sch-i800|sch-i815|sch-i905|sgh-i957|sgh-i987|sgh-t849|sgh-t859|sgh-t869|sph-p100|gt-p3100|gt-p3108|gt-p3110|gt-p5100|gt-p5110|gt-p6200|gt-p7320|gt-p7511|gt-n8000|gt-p8510|sgh-i497|sph-p500|sgh-t779|sch-i705|sch-i915|gt-n8013|gt-p3113|gt-p5113|gt-p8110|gt-n8010|gt-n8005|gt-n8020|gt-p1013|gt-p6201|gt-p7501|gt-n5100|gt-n5110|shv-e140k|shv-e140l|shv-e140s|shv-e150s|shv-e230k|shv-e230l|shv-e230s|shw-m180k|shw-m180l|shw-m180s|shw-m180w|shw-m300w|shw-m305w|shw-m380k|shw-m380s|shw-m380w|shw-m430w|shw-m480k|shw-m480s|shw-m480w|shw-m485w|shw-m486w|shw-m500w|gt-i9228|sch-p739|sch-i925|gt-i9200|gt-i9205|gt-p5200|gt-p5210|sm-t311|sm-t310|sm-t210|sm-t210r|sm-t211|sm-p600|sm-p601|sm-p605|sm-p900|sm-t217|sm-t217a|sm-t217s|sm-p6000|sm-t3100|sgh-i467|xe500|"+
            "htc flyer|htc jetstream|htc-p715a|htc evo view 4g|pg41200|"+
            "xoom|sholest|mz615|mz605|mz505|mz601|mz602|mz603|mz604|mz606|mz607|mz608|mz609|mz615|mz616|mz617|"+
            "transformer|^.*padfone((?!mobile).)*$|tf101|tf201|tf300|tf700|tf701|tf810|me171|me301t|me302c|me371mg|me370t|me372mg|me172v|me173x|me400c|slider *sl101|"+
            "android.+nook|nookcolor|nook browser|bnrv200|bnrv200a|bntv250|bntv250a|bntv400|bntv600|logicpd zoom2|"+
            "android.*\\b(a100|a101|a110|a200|a210|a211|a500|a501|a510|a511|a700|a701|w500|w500p|w501|w501p|w510|w511|w700|g100|g100w|b1-a71|b1-710|b1-711|a1-810)\\b|w3-810|"+
            "android.*(at100|at105|at200|at205|at270|at275|at300|at305|at1s5|at500|at570|at700|at830)|toshiba.*folio|"+
            "\\bl-06c|lg-v900|lg-v905|lg-v909|"+
            "android.+(xenta.+tab|tab210|tab211|tab224|tab250|tab260|tab264|tab310|tab360|tab364|tab410|tab411|tab420|tab424|tab450|tab460|tab461|tab464|tab465|tab467|tab468|tab469)|"+
            "android.+\\boyo\\b|life.*(p9212|p9514|p9516|s9512)|lifetab|"+
            "an10g2|an7bg3|an7fg3|an8g3|an8cg3|an7g3|an9g3|an7dg3|an7dg3st|an7dg3childpad|an10bg3|an10bg3dt|"+
            "android.+archos|\\b(101g9|80g9|a101it)\\b|qilive 97r|"+
            "novo7|novo7aurora|novo7basic|novo7paladin|novo8|novo9|novo10|"+
            "sony tablet|sony tablet s|sgpt12|sgpt121|sgpt122|sgpt123|sgpt111|sgpt112|sgpt113|sgpt211|sgpt213|ebrd1101|ebrd1102|ebrd1201|sgpt311|sgpt312|sonyso-03e|"+
            "android.*(k8gt|u9gt|u10gt|u16gt|u17gt|u18gt|u19gt|u20gt|u23gt|u30gt)|cube u8gt|"+
            "mid1042|mid1045|mid1125|mid1126|mid7012|mid7014|mid7034|mid7035|mid7036|mid7042|mid7048|mid7127|mid8042|mid8048|mid8127|mid9042|mid9740|mid9742|mid7022|mid7010|"+
            "android.*(\\bmid\\b|mid-560|mtv-t1200|mtv-pnd531|mtv-p1101|mtv-pnd530)|"+
            "android.*(rk2818|rk2808a|rk2918|rk3066)|rk2738|rk2808a|"+
            "t-hub2|"+
            "iq310|fly vision|"+
            "bq.*(elcano|curie|edison|maxwell|kepler|pascal|tesla|hypatia|platon|newton|livingstone|cervantes|avant)|"+
            "mediapad|ideos s7|s7-201c|s7-202u|s7-101|s7-103|s7-104|s7-105|s7-106|s7-201|s7-slim|"+
            "\\bn-06d|\\bn-08d|"+
            "pantech.*p4100|"+
            "broncho.*(n701|n708|n802|a710)|"+
            "touchpad.*[78910]|\\btouchtab\\b|"+
            "z1000|z99 2g|z99|z930|z999|z990|z909|z919|z900|"+
            "tb07sta|tb10sta|tb07fta|tb10fta|"+
            "android.*\\bnabi|"+
            "playstation.*(portable|vita)|"+
            "dell.*streak|"+
            "milagrow +tab.*top|"+
            "android.+(ideapad|ideatab|lenovo +a1|s2110|s6000|k3011|a3000|a1000|a2107|a2109|a1107)|"+
            "android.+f8-sup|"+
            "android.*(k080|arc|vox)|"+
            "android.*(msi.+enjoy|enjoy +7|enjoy +10)|"+
            "dropad.+a8|"+
            "android.+c906|"+
            "android.+iberry.+auxus|"+
            "android.+aigopad|"+
            "android.*(airpad|liquid metal)|"+
            "android.+hcl.+tablet|connect-3g-2.0|connect-2g-2.0|me tablet u1|me tablet u2|me tablet g1|me tablet x1|me tablet y2|me tablet sync|"+
            "android.*(a39|a37|a34|st8|st10|st7|smarttab|smart +tab)|"+
            "android.*(micromax.+funbook|funbook|p250|p275|p300|p350|p362|p500|p600)|micromax.*(p250|p275|p350|p362|p500|p600)|funbook|"+
            "android.+penta|"+
            "android.*(celkon.+ct|ct-[0-9])|"+
            "android.+i-buddy|"+
            "android.*(viewbook|viewpad)|"+
            "android.*(v9|zte.+v8110|light tab|light pro|beeline|base.*tab)|"+
            "chagall|"+
            "android.*(vandroid|t3i)|"+
            "android.*(ziio7|ziio10)|"+
            "android.*(v-t100|v-tw100|v-tr200|v-t300)|"+
            "android.+vtab1008|"+
            "bookeen|cybook|"+
            "android.*lifetab_(s9512|p9514|p9516)|"+
            "m702pro|"+
            "irulu-al101|"+
            "pmp3170b|pmp3270b|pmp3470b|pmp7170b|pmp3370b|pmp3570c|pmp5870c|pmp3670b|pmp5570c|pmp5770d|pmp3970b|pmp3870c|pmp5580c|pmp5880d|pmp5780d|pmp5588c|pmp7280c|pmp7280|pmp7880d|pmp5597d|pmp5597|pmp7100d|per3464|per3274|per3574|per3884|per5274|per5474|pmp5097cpro|pmp5097|pmp7380d|pmp5297c|pmp5297c_quad|"+
            "allview.*(viva|alldro|city|speed|all tv|frenzy|quasar|shine|tx1|ax1|ax2)|"+
            "megafon +v9|"+
            "android.+(z7c|z7h|z7s)|"+
            "android.+iball.+slide.+(3g *7271|3g *7334|3g *7307|3g *7316|i7119|i7011)|android.+iball.+i6012|"+
            "navipad|tb-772a|tm-7045|tm-7055|tm-9750|tm-7016|tm-7024|tm-7026|tm-7041|tm-7043|tm-7047|tm-8041|tm-9741|tm-9747|tm-9748|tm-9751|tm-7022|tm-7021|tm-7020|tm-7011|tm-7010|tm-7023|tm-7025|tm-7037w|tm-7038w|tm-7027w|tm-9720|tm-9725|tm-9737w|tm-1020|tm-9738w|tm-9740|tm-9743w|tb-807a|tb-771a|tb-727a|tb-725a|tb-719a|tb-823a|tb-805a|tb-723a|tb-715a|tb-707a|tb-705a|tb-709a|tb-711a|tb-890hd|tb-880hd|tb-790hd|tb-780hd|tb-770hd|tb-721hd|tb-710hd|tb-434hd|tb-860hd|tb-840hd|tb-760hd|tb-750hd|tb-740hd|tb-730hd|tb-722hd|tb-720hd|tb-700hd|tb-500hd|tb-470hd|tb-431hd|tb-430hd|tb-506|tb-504|tb-446|tb-436|tb-416|tb-146se|tb-126se|"+
            "android.*\\bg1\\b|"+
            "tx-a1301|tx-m9002|q702|"+
            "ly-f528|"+
            "android.+dslide.*\\b(700|701r|702|703r|704|802|970|971|972|973|974|1010|1012)\\b|"+
            "m9701|m9000|m9100|m806|m1052|m806|t703|mid701|mid713|mid710|mid727|mid760|mid830|mid728|mid933|mid125|mid810|mid732|mid120|mid930|mid800|mid731|mid900|mid100|mid820|mid735|mid980|mid130|mid833|mid737|mid960|mid135|mid860|mid736|mid140|mid930|mid835|mid733|"+
            "android.*\\b(f-01d|f-05e|f-10d|m532|q572)\\b|"+
            "android.+casiatab8|"+
            "android.+hudl|"+
            "android.*(polaroid.*tablet|pmid1000|pmid10c|pmid800|pmid700|pmid4311|pmid701c|pmid701i|pmid705|pmid706|pmid70dc|pmid70c|pmid720|pmid80c|pmid901|ptab7200|ptab4300|ptab750|midc010|midc407|midc409|midc410|midc497|midc700|midc800|midc801|midc802|midc901)|"+
            "e-boda.+(supreme|impresspeed|izzycomm|essential)|"+
            "hp slate 7|hp elitepad 900|hp-tablet|elitebook.*touch|"+
            "fine7 genius|fine7 shine|fine7 air|fine8 style|fine9 more|fine10 joy|fine11 wide|"+
            "android.*\\b(n10|n10-4core|n78|n79|n83|n90 ii)\\b|"+
            "\\b(pem63|plt1023g|plt1041|plt1044|plt1044g|plt1091|plt4311|plt4311pl|plt4315|plt7030|plt7033|plt7033d|plt7035|plt7035d|plt7044k|plt7045k|plt7045kb|plt7071kg|plt7072|plt7223g|plt7225g|plt7777g|plt7810k|plt7849g|plt7851g|plt7852g|plt8015|plt8031|plt8034|plt8036|plt8080k|plt8082|plt8088|plt8223g|plt8234g|plt8235g|plt8816k|plt9011|plt9045k|plt9233g|plt9735|plt9760g|plt9770g)\\b|"+
            "bq1078|bc1003|bc1077|rk9702|bc9730|bc9001|it9001|bc7008|bc7010|bc708|bc728|bc7012|bc7030|bc7027|bc7026|"+
            "tpc7102|tpc7103|tpc7105|tpc7106|tpc7107|tpc7201|tpc7203|tpc7205|tpc7210|tpc7708|tpc7709|tpc7712|tpc7110|tpc8101|tpc8103|tpc8105|tpc8106|tpc8203|tpc8205|tpc8503|tpc9106|tpc9701|tpc97101|tpc97103|tpc97105|tpc97106|tpc97111|tpc97113|tpc97203|tpc97603|tpc97809|tpc97205|tpc10101|tpc10103|tpc10106|tpc10111|tpc10203|tpc10205|tpc10503|"+
            "android.*(roverpad|rp3wg70)|"+
            "tab-p506|tab-navi-7-3g-m|tab-p517|tab-p-527|tab-p701|tab-p703|tab-p721|tab-p731n|tab-p741|tab-p825|tab-p905|tab-p925|tab-pr945|tab-pl1015|tab-p1025|tab-pi1045|tab-p1325|tab-protab[0-9]+|tab-protab25|tab-protab26|tab-protab27|tab-protab26xl|tab-protab2-ips9|tab-protab30-ips9|tab-protab25xxl|tab-protab26-ips10|tab-protab30-ips10|"+
            "android.*ov-(steelcore|newbase|basecore|baseone|exellen|quattor|edutab|solution|action|basictab|teddytab|magictab|stream|tb-08|tb-09)|"+
            "dps dream 9|dps dual 7|"+
            "v97 hd|i75 3g|visture v4( hd)?|visture v5( hd)?|visture v10|"+
            "ctp(-)?810|ctp(-)?818|ctp(-)?828|ctp(-)?838|ctp(-)?888|ctp(-)?978|ctp(-)?980|ctp(-)?987|ctp(-)?988|ctp(-)?989|"+
            "android.*\\b97d\\b|tablet(?!.*pc)|viewpad7|lg-v909|mid7015|bntv250a|logicpd zoom2|\\ba7eb\\b|catnova8|a1_07|ct704|ct1002|\\bm721\\b|rk30sdk|\\bevotab\\b|smarttabii10|smarttab10"+
            "";

        //Check Main Tablet
        regex = new RegExp(regex_raw_str, "i");
        is_tablet_bool = regex.test(nav);
        switch(true)
        {
            case (is_tablet_bool):
                if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                return true;
                break;
        }

        //Check Android Tablet
        var regex_1_bool = /android/i.test(nav),
            regex_2_bool = !/mobile/i.test(nav),
            pixel_w_int = parseInt(store("rstv_viewportW_dip")),
            pixel_h_int = parseInt(store("rstv_viewportH_dip")),
            pixel_dim_int = (store("rstv_is_portrait")) ? pixel_w_int : pixel_h_int
            ;

        switch(true)
        {
            case (regex_1_bool):
                /**
                 * if tablet has either:
                 * 1. Device independent viewport width between 520px and 800px when in portrait
                 * 2. Device independent viewport height between 520px and 800px when in landscape
                 */
                switch(true)
                {
                    case (isNumber(pixel_dim_int) && (pixel_dim_int >= 520 && pixel_dim_int <= 800)):
                        if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                        return true;
                        break;
                }

                //if user agent is Android but 'mobile' keyword is absent
                switch(true)
                {
                    case (regex_2_bool):
                        if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                        return true;
                        break;
                }

                break;
        }

        //Return false if otherwise
        if(!bypass_storage_bool){ store("rstv_is_tablet", false); }
        return false;
    }

    /**
     * Check if the device is a TV
     * @return {Boolean}
     */
    function isTV()
    {
        //check if TV check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_tv")):
                return store("rstv_is_tv");
                break;
        }

        //get the user agent
        var nav = getUserAgent();

        /**
         * Check for known TVs
         */
        var is_tv_bool = /googletv|smart\-tv|smarttv|internet +tv|netcast|nettv|appletv|boxee|kylo|roku|vizio|dlnadoc|ce\-html|ouya|xbox|playstation *(3|4)|wii/i.test(nav);

        switch(true)
        {
            case (is_tv_bool):
                store("rstv_is_tv", true);
                return true;
                break;
        }

        store("rstv_is_tv", false);
        return false;
    }

    /**
     * Checks if the device is a Personal Computer
     * @return {Boolean}
     */
    function isPC()
    {
        //check if PC check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_pc")):
                return store("rstv_is_pc");
                break;
        }

        switch(true)
        {
            case (isMobile() === false && isTV() === false):
                store("rstv_is_pc", true);
                return true;
                break;
        }

        store("rstv_is_pc", false);
        return false;
    }

    /**
     * Checks if the device is a mobile device
     * @return {Boolean}
     */
    function isMobile()
    {
        //check if device is phone or tablet
        switch(true)
        {
            case (isPhone() || isTablet(true)):
                return true;
                break;

            default:
                return false;
        }
    }

    /**
     * Checks if the device is a non-mobile device
     * @return {Boolean}
     */
    function isNonMobile()
    {
        //check if device is not phone or mobile
        switch(true)
        {
            case (!isMobile()):
                return true;
                break;

            default:
                return false;
        }
    }

    /**
     * Gets the orientation of the device
     * @param bypass_cache_bool {Boolean} Determines if the stored value for current orientation should be retrieved or not. True will ignore the value stored and will re-test the orientation
     * @return {String}
     */
    function getOrientation()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            bypass_cache_bool = isBool(myArgs[0]) ? myArgs[0] : false,
            ort_final_str;

        //check if current orientation value is stored and bypass_cache_bool is false. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_ort_curr") && !bypass_cache_bool):
                return store("rstv_ort_curr");
                break;
        }

        //Reset Viewport Dimensions if bypass_cache_bool is true
        switch(true)
        {
            case (bypass_cache_bool):
                store("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH", null);
                break;
        }

        //Get the Viewport Dimensions
        var device_user_agent_str = getUserAgent(),
            is_opera_mini_bool = /opera.+(mini|mobi)/i.test(device_user_agent_str),
            viewport_w_int = viewportW(),
            viewport_h_int = viewportH(),
            screen_w_int = screenW(),
            screen_h_int = screenH(),
            screen_w_to_h_ratio_int = screen_w_int/screen_h_int,
            screen_w_to_viewport_w_diff_int = screen_w_int - viewport_w_int,
            is_landscape_extended_verify_bool,
            is_landscape_bool;

        screen_w_to_viewport_w_diff_int = Math.abs(screen_w_to_viewport_w_diff_int);
        is_landscape_extended_verify_bool = (is_opera_mini_bool && viewport_w_int < 260) ? ((screen_w_to_viewport_w_diff_int <= 4) && (screen_w_to_h_ratio_int >= 1) ? true : false) : true;
        is_landscape_bool = !!((viewport_h_int <= viewport_w_int) && is_landscape_extended_verify_bool);

        switch(true)
        {
            case (is_landscape_bool):
                //landscape
                ort_final_str = 'landscape';

                //do not alter cached orientation variables if bypass_cache_bool is true
                switch(true)
                {
                    case (!bypass_cache_bool):
                        store("rstv_is_portrait", false);
                        store("rstv_is_landscape", true);
                        break;
                }

                break;

            default:
                //portrait
                ort_final_str = 'portrait';

                //do not alter cached orientation variables if bypass_cache_bool is true
                switch(true)
                {
                    case (!bypass_cache_bool):
                        store("rstv_is_portrait", true);
                        store("rstv_is_landscape", false);
                        break;
                }
        }

        return ort_final_str;
    }

    /**
     * Resets/Updates the cached values (localStorage) of Orientation Info
     * @private
     */
    function _updateOrientationStore()
    {
        //reset
        store("rstv_ort_curr rstv_is_portrait rstv_is_landscape", null);

        //reload
        store("rstv_ort_curr", getOrientation());
    }

    /**
     * Checks if the device is currently in Portrait mode
     * @return {Boolean}
     */
    function isPortrait()
    {
        //check if portrait orientation value is stored. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_portrait")):
                return store("rstv_is_portrait");
                break;
        }
        return !!((getOrientation() == 'portrait'));
    }

    /**
     * Checks if the device is currently in Landscape mode
     * @return {Boolean}
     */
    function isLandscape()
    {
        //check if landscape orientation value is stored. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_landscape")):
                return store("rstv_is_landscape");
                break;
        }
        return !!((getOrientation() == 'landscape'));
    }

    /**
     * Gets the Standard Display Resolution of the given device
     * @return {String}
     */
    function getResolution()
    {
        var is_landscape_bool = isLandscape(),
            screen_w = screenW(),
            screen_h = screenH(),
            std_w_arr = (is_landscape_bool) ? _getResolutionDimensionList('h') :_getResolutionDimensionList('w'),
            std_h_arr = (is_landscape_bool) ? _getResolutionDimensionList('w'): _getResolutionDimensionList('h'),
            screen_w_std = getClosestNumberMatchArray(std_w_arr, screen_w),
            screen_h_std = getClosestNumberMatchArray(std_h_arr, screen_h),
            screen_res_str,
            screen_res_matrix_arr = _getResolutionMatrix(),
            screen_res_name_str
            ;

        switch(true)
        {
            case (screen_w_std >= screen_h_std):
                screen_res_str = screen_h_std+'_'+screen_w_std;
                break;

            default:
                screen_res_str = screen_w_std+'_'+screen_h_std;
        }

        screen_res_name_str = array_search(screen_res_str, screen_res_matrix_arr);

        return screen_res_name_str;
    }

    /**
     * Composes and Saves a List of Standard Graphic Resolutions
     * @return {Array}
     * @private
     */
    function _getResolutionList()
    {
        //Check if Resolution List is Stored
        switch(true)
        {
            case (isStorageValueSet("rstv_is_cache_res_list")):
                return store("rstv_cache_res_list");
                break;
        }

        var $res_arr = [
            'qqvga', 'qqvgax1', 'hqvga', 'hqvgax1', 'hqvgax2', 'hvgax1', 'qvga', 'wqvga', 'wqvga1', 'hvga',
            'hvga1', 'hvga2', 'hvga3', 'hvgax1', 'hvgax2', 'vga', 'wvga', 'wvgax1', 'fwvga', 'svga',
            'dvga', 'dvgax1', 'wsvga', 'wsvga1', 'xga', 'wxga', 'wxga1', 'wxga2', 'wxga3', 'wxga4', 'wxga5',
            'xga+', 'wxga+', 'sxga', 'sxga+', 'wsxga+', 'uxga', 'wuxga', 'qwxga', 'qxga', 'wqxga',
            'qsxga', 'wqsxga', 'quxga', 'wquxga', 'hxga', 'whxga', 'hsxga', 'whsxga', 'huxga', 'whuxga',
            'nhd', 'nhdx1', 'qhd', 'hd', '720p', 'fhd', '1080p', '1080i', 'wqhd', 'mbprhd', '4kuhd', '8kuhd'
        ];

        store("rstv_is_cache_res_list", true);
        store("rstv_cache_res_list", $res_arr);
        return $res_arr;
    }

    /**
     * Composes and Saves a Resolution Matrix (Resolution to Dimensions)
     * @return {Array|Object}
     * @private
     */
    function _getResolutionMatrix()
    {
        //Check if Resolution Matrix is Stored
        switch(true)
        {
            case (isStorageValueSet("rstv_is_cache_res_matrix")):
                return store("rstv_cache_res_matrix");
                break;
        }

        var $res_matrix_arr = {
            'qqvga': '120_160', 'qqvgax1': '128_160', 'hqvga': '160_240', 'hqvgax1': '240_240', 'hqvgax2': '240_260',
            'qvga': '240_320', 'wqvga': '240_400', 'wqvga1': '240_432', 'hvga': '320_480',
            'hvga1': '360_480', 'hvga2': '272_480', 'hvga3': '240_640', 'hvgax1': '200_640', 'hvgax2': '300_640',
            'hvgax3': '360_400',
            'vga': '480_640', 'wvga': '480_800', 'wvgax1': '352_800', 'fwvga': '480_854', 'svga': '600_800',
            'dvga': '640_960', 'dvgax1': '640_1136', 'wsvga': '576_1024', 'wsvga1': '600_1024', 'xga': '768_1024',
            'wxga': '768_1280', 'wxga1': '720_1280', 'wxga2': '800_1280', 'wxga3': '768_1360', 'wxga4': '768_1366',
            'wxga5': '720_720',
            'xga+': '864_1152', 'wxga+': '900_1440', 'sxga': '1024_1280', 'sxga+': '1050_1400', 'wsxga+': '1050_1680',
            'uxga': '1200_1600', 'wuxga': '1200_1920', 'qwxga': '1152_2048', 'qxga': '1536_2048', 'wqxga': '1600_2560',
            'wqxga+': '1800_3200',
            'qsxga': '2048_2560', 'wqsxga': '2048_3200', 'quxga': '2400_3200', 'wquxga': '2400_3840', 'hxga': '3072_4096',
            'whxga': '3200_5120', 'hsxga': '4096_5120', 'whsxga': '4096_6400', 'huxga': '4800_6400', 'whuxga': '4800_7680',
            'nhd': '360_640', 'nhdx1': '320_640', 'qhd': '540_960', 'hd': '720_1280', '720p': '720_1280', 'fhd': '1080_1920',
            '1080p': '1080_1920', '1080i': '1080_1920', 'wqhd': '1440_2560', 'mbprhd': '1800_2880', '4kuhd': '2160_3840',
            '8kuhd': '4320_7680'
        };

        store("rstv_is_cache_res_matrix", true);
        store("rstv_cache_res_matrix", $res_matrix_arr);
        return $res_matrix_arr;
    }

    /**
     * Converts various types of breakpoints into pixel breakpoints
     * It converts 'Device' and 'Resolution' breakpoints
     * @param bp_arr {Array} The breakpoints you define
     * @param bp_class_arr {Array} The names of CSS classes paired with breakpoints
     * @return {Array}
     * @private
     */
    function _toViewportBreakpoints(bp_arr, bp_class_arr)
    {
        try{
            //Create local variables
            var bp_attrib_arr = [],
                list_dev_arr,
                list_res_arr,
                matrix_dev_arr,
                matrix_res_arr,
                ort_marker_str = '',
                ort_marker_key_str = '',
                error_marker_str = '',
                bp_temp_w_arr = [],
                bp_item_w_temp_int = '',
                bp_temp_h_arr = [],
                bp_item_h_temp_int = '',
                bp_temp_type_arr = [],
                bp_ort_marker_temp_arr = [],
                bp_final_arr = [],
                bp_item_temp_str,
                bp_item_res_temp_str,
                bp_item_final_str,
                bp_item_v_temp_str,
                bp_item_v_temp_arr = [],
                is_class_def_bool = false,
                is_attrib_def_bool = false;

            //Create variables for counter functionality
            var counter_int = 0,
                counter_alpha_str = '',
                counter_alpha_arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
                    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai',
                    'aj', 'ak', 'al', 'am', 'an', 'ao', 'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax'
                ],
                counter_alpha_pre_arr = [],
                counter_alpha_post_arr = [],
                bp_arr_count_int = count(bp_arr),
                bp_class_arr_count_int = count(bp_class_arr),
                bp_attrib_arr_count_int = count(bp_attrib_arr),
                bp_item_w_temp_final_int,
                bp_item_h_temp_final_int;

            //check that value in argument is array and is not empty
            switch(true)
            {
                case (!isArray(bp_arr)):
                    throw new Error ("The first argument must be an array!");
                    break;

                case (isArray(bp_arr) && bp_arr_count_int == 0):
                    throw new Error ("The first argument must not be empty!");
                    break;
            }

            //Check that only either classes or attributes are defined
            switch(true)
            {
                case ((bp_class_arr_count_int > 0) && (bp_attrib_arr_count_int > 0)):
                    throw new Error("You can only define either 'Classes' or 'Attributes' settings!");
                    break;
            }

            //If classes are defined, ensure they correspond with the number of breakpoints defined
            switch(true)
            {
                case (bp_class_arr_count_int > 0):
                    //classes are defined
                    is_class_def_bool = true;
                    switch(true)
                    {
                        case (bp_class_arr_count_int !== bp_arr_count_int):
                            throw new Error ("The number items for 'Breakpoints' and 'Classes' settings must match");
                            break;
                    }
                    break;
            }

            //If attributes are defined, ensure they correspond with the number of breakpoints defined
            switch(true)
            {
                case (bp_attrib_arr_count_int > 0):
                    //attributes are defined
                    is_attrib_def_bool = true;
                    switch(true)
                    {
                        case (bp_attrib_arr_count_int !== bp_arr_count_int):
                            throw new Error ("The number items for 'Breakpoints' and 'Attributes' settings must match");
                            break;
                    }
                    break;
            }

            //Get Breakpoint Reference Data
            list_res_arr = _getResolutionList();
            matrix_res_arr = _getResolutionMatrix();

            //iterate over the breakpoints provided
            for(var i = 0; i < bp_arr_count_int; i++)
            {
                bp_item_temp_str = bp_arr[i];

                counter_alpha_str = counter_alpha_arr[i];

                //ensure that the orientation markers are valid i.e. only -p and -l if any
                switch(true)
                {
                    case (/-+/i.test(bp_item_temp_str) && !/^[^-]*-[^-]*$/i.test(bp_item_temp_str)):
                        //error in the way orientation markers are defined
                        error_marker_str += '2';
                        break;
                }

                //find out if there are any resolution markers e.g. -l or -p
                ort_marker_str = '';
                ort_marker_key_str = '';
                switch(true)
                {
                    case (substr_count(bp_item_temp_str, '-p') > 0):
                        ort_marker_str = 'p';
                        ort_marker_key_str = '-p';

                        bp_ort_marker_temp_arr.push('p');
                        break;

                    case (substr_count(bp_item_temp_str, '-l') > 0):
                        ort_marker_str = 'l';
                        ort_marker_key_str = '-l';

                        bp_ort_marker_temp_arr.push('l');
                        break;

                    default:
                        bp_ort_marker_temp_arr.push('x');
                }

                //reset the breakpoint i.e. remove any resolution markers
                bp_item_final_str = bp_item_temp_str.replace(''+ort_marker_key_str+'', '');

                //find out which class of breakpoint i.e. viewport, device, or resolution
                switch(true)
                {
                    case (in_array(bp_item_final_str, list_res_arr)):
                        //is resolution breakpoint. Get viewport dimensions
                        bp_item_v_temp_str = matrix_res_arr[''+bp_item_final_str+''];

                        bp_item_v_temp_arr = arrayToInteger(explode('_', bp_item_v_temp_str));

                        bp_item_w_temp_int = parseInt(bp_item_v_temp_arr[0]);
                        bp_item_h_temp_int = parseInt(bp_item_v_temp_arr[1]);

                        //consider landscape orientation markers
                        bp_item_w_temp_final_int = bp_item_w_temp_int;
                        bp_item_h_temp_final_int = bp_item_h_temp_int;
                        switch(true)
                        {
                            case (ort_marker_str == 'l'):
                                bp_item_w_temp_final_int = bp_item_h_temp_int;
                                bp_item_h_temp_final_int = bp_item_w_temp_int;
                                break;
                        }

                        bp_temp_w_arr[counter_alpha_str] = bp_item_w_temp_final_int;
                        bp_temp_h_arr[counter_alpha_str] = bp_item_h_temp_final_int;

                        //set breakpoint type as resolution
                        bp_temp_type_arr.push('r');

                        break;

                    case (/[0-9]+/i.test(bp_item_final_str)):
                        //is viewport breakpoint
                        bp_temp_w_arr[counter_alpha_str] = parseInt(bp_item_final_str);
                        bp_temp_h_arr[counter_alpha_str] = parseInt(bp_item_final_str);

                        //set breakpoint type as viewport
                        bp_temp_type_arr.push('v');
                        break;

                    default:
                        //mark error
                        error_marker_str += '1';
                }

                counter_alpha_pre_arr.push(counter_alpha_str);

                counter_int++;
            }

            //check if there are any errors. If yes, throw error
            switch(true)
            {
                case (/[1]+/i.test(error_marker_str)):
                    throw new Error("There are errors in your 'Breakpoints' settings!");
                    break;

                case (/[2]+/i.test(error_marker_str)):
                    throw new Error("There are errors in your 'Breakpoints' settings with regard to the way you have defined orientation markers e.g. -p or -l!");
                    break;
            }

            //compose breakpoints
            var cmp = function ($a, $b) {
                if ($a == $b) {
                    return 0;
                }
                return ($a < $b) ? -1 : 1;
            };

            var bp_temp_w_sort_arr = [],
                bp_temp_h_sort_arr = [],
                bp_temp_w_sort_int,
                bp_temp_w_sort_juxta_key_int,
                bp_type_arr = [],
                bp_temp_ort_sort_arr = [],
                bp_temp_class_arr = [],
                bp_temp_pre_attrib_arr = [],
                bp_temp_attrib_arr = [];

            //reformat attribute array
            bp_temp_pre_attrib_arr = bp_attrib_arr;

            //sort viewport width breakpoints
            bp_temp_w_sort_arr = uasort(bp_temp_w_arr, cmp);

            //sort other arrays in an identical fashion to viewport width breakpoints
            counter_alpha_post_arr = array_keys(bp_temp_w_sort_arr);

            var bp_temp_w_sort_arr_size_int = count(bp_temp_w_sort_arr);
            for(var i = 0; i < bp_temp_w_sort_arr_size_int; i++)
            {
                bp_temp_w_sort_int = counter_alpha_post_arr[i];
                bp_temp_w_sort_juxta_key_int = array_search(bp_temp_w_sort_int, counter_alpha_pre_arr);

                //sort breakpoint heights array
                bp_temp_h_sort_arr[bp_temp_w_sort_int] = bp_temp_h_arr[bp_temp_w_sort_int];

                //sort breakpoint type array
                bp_type_arr[i] = bp_temp_type_arr[bp_temp_w_sort_juxta_key_int];

                //sort the orientation marker array
                bp_temp_ort_sort_arr[i] = bp_ort_marker_temp_arr[bp_temp_w_sort_juxta_key_int];

                //sort the classes array
                bp_temp_class_arr[i] = bp_class_arr[bp_temp_w_sort_juxta_key_int];

                //sort the attributes array
                bp_temp_attrib_arr[i] = bp_temp_pre_attrib_arr[bp_temp_w_sort_juxta_key_int];
            }

            //Save Primary Results Data to Array
            bp_final_arr["bp_w"] = implode('|', bp_temp_w_sort_arr);                //width
            bp_final_arr["bp_h"] = implode('|', bp_temp_h_sort_arr);                //height
            bp_final_arr["bp_o"] = implode('|', bp_temp_ort_sort_arr);              //orientation
            bp_final_arr["bp_t"] = implode('|', bp_type_arr);                       //type

            //add data for classes if defined
            switch(true)
            {
                case (is_class_def_bool):
                    var c_str = implode('|', bp_temp_class_arr);
                    bp_final_arr["bp_c"] = c_str;                   //classes
                    break;
            }

            //add data for attributes if defined
            switch(true)
            {
                case (is_attrib_def_bool):
                    var a_str = implode('|', bp_temp_attrib_arr);
                    bp_final_arr["bp_a"] = a_str;                   //attributes
                    break;
            }

            return bp_final_arr;
        }
        catch(e){
            var e_msg_str = "There was an error: "+ e.message;
            alert(e_msg_str);
        }
    }

    /**
     * Wrapper class for _toViewportBreakpoints
     * @param bp_arr {Array} The list of breakpoints
     * @param bp_class_arr {Array} The corresponding list of classes
     * @return {Array}
     */
    function getBreakpoints(bp_arr, bp_class_arr)
    {
        var data_arr = [];
        data_arr = _toViewportBreakpoints(bp_arr, bp_class_arr);

        return data_arr;
    }

    /**
     * Monitors the viewport for size and orientation changes
     */
    function viewportMonitor()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            trigger_suffix_str = (isNumber(myArgs[0])) ? "_"+myArgs[0]: "";

        var viewport_monit_fn = function(){

            //get viewport info before they are reset in storage
            var viewport_w_prev_int = store("rstv_viewportW"),
                viewport_h_prev_int = store("rstv_viewportH");

            //re-initialize dimension variables
            _initDimensionVars();

            //get current and active and define local variables
            var is_mobile_bool = isMobile(),
                ort_active_str = getOrientation(true),
                ort_curr_str = store("rstv_ort_curr"),
                viewport_w_curr_int,
                viewport_h_curr_int,
                viewport_w_diff_int,
                viewport_w_diff_abs_int,
                viewport_w_diff_pc_int,
                viewport_h_diff_int,
                viewport_h_diff_abs_int,
                viewport_h_diff_pc_int,
                is_softkey_bool = false;

            //Update stored values for dimensions
            _updateDimensionStore();

            /**
             * Perform soft keyboard check
             * This manages for mobile devices that resize the viewport when the soft keyboard is initialized
             * This scenario will sometimes result in a pseudo-orientation change which is unwanted
             */
            switch(true)
            {
                case (is_mobile_bool):
                    viewport_w_curr_int = store("rstv_viewportW");
                    viewport_h_curr_int = store("rstv_viewportH");
                    viewport_w_diff_int = viewport_w_curr_int-viewport_w_prev_int;
                    viewport_h_diff_int = viewport_h_curr_int-viewport_h_prev_int;
                    viewport_w_diff_abs_int = Math.abs(viewport_w_diff_int);
                    viewport_h_diff_abs_int = Math.abs(viewport_h_diff_int);

                    //get the percentage changes in viewport width and height
                    viewport_w_diff_pc_int = (viewport_w_diff_abs_int/viewport_w_prev_int)*100;
                    viewport_h_diff_pc_int = (viewport_h_diff_abs_int/viewport_h_prev_int)*100;

                    switch(true)
                    {
                        case (viewport_w_diff_pc_int < 1):
                            switch(true)
                            {
                                case (viewport_h_diff_pc_int > 35 && viewport_h_diff_int < 0):
                                    //soft keyboard is opening
                                    is_softkey_bool = true;
                                    break;

                                case (viewport_h_diff_pc_int > 35 && viewport_h_diff_int > 0):
                                    //Soft keyboard closing - start
                                    is_softkey_bool = true;
                                    break;

                                case (viewport_h_diff_pc_int > 12 && viewport_h_diff_pc_int <= 35 && viewport_h_diff_int > 0):
                                    //Soft keyboard closing - end
                                    is_softkey_bool = true;
                                    break;

                                case (viewport_h_diff_pc_int == 0):
                                    //No movement - possible Soft keyboard action
                                    is_softkey_bool = true;
                                    break;
                            }
                            break;
                    }
                    break;
            }

            /**
             * Trigger events only if soft keyboard action is not detected
             */
            switch(true)
            {
                case (!is_softkey_bool):
                    switch(true)
                    {
                        case ((ort_curr_str !== ort_active_str)):
                            //orientation has changed. Update stored values for dimensions and orientation
                            _updateOrientationStore();

                            $(window).trigger("change_orientation"+trigger_suffix_str);
                            break;

                        default:
                            /**
                             * Fire resize only for devices that are non-mobile
                             * This eliminates resize callback functionality for mobile devices
                             */
                            switch(true)
                            {
                                case (!is_mobile_bool):
                                    $(window).trigger("resize_viewport"+trigger_suffix_str);
                                    break;
                            }
                    }
                    break;
            }
        };
        resize(viewport_monit_fn);
    }

    /**
     * Monitors a DOM element/container for size changes
     */
    function containerMonitor(elem)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            trigger_suffix_str = (isNumber(myArgs[1])) ? "_"+myArgs[1]: ""
            ;

        var container_monit_fn = function(){
            $(window).trigger("resize_container"+trigger_suffix_str);
        };
        resizeContainer(elem, container_monit_fn);
    }

    /**
     * Attach an event handler for the resize event
     * @param {Function} fn The function to execute
     * @return object
     */
    function resize(fn)
    {
        $win.on('resize', fn);
        return Restive;
    }

    /**
     * Attach an event handler for the resizecontainer event
     * @param {Function} fn The function to execute
     * @return object
     */
    function resizeContainer(el, fn)
    {
        el.on('resizecontainer', fn);
        return Restive;
    }

    //Define Restive Object
    Restive = {
        init: init(),
        reInit: reInit,
        getUserAgent: getUserAgent,
        isStorageValueSet: isStorageValueSet,
        store: store,
        storeVarTracker: storeVarTracker,
        storeVarValidator: storeVarValidator,
        incrementStorageValue: incrementStorageValue,
        getBreakpoints: getBreakpoints,
        viewportW: viewportW,
        viewportH: viewportH,
        screenW: screenW,
        screenH: screenH,
        pixelW: pixelW,
        pixelH: pixelH,
        vSpan: vSpan,
        vPitch: vPitch,
        dSpan: dSpan,
        dPitch: dPitch,
        cSpan: cSpan,
        cPitch: cPitch,
        eSpan: eSpan,
        ePitch: ePitch,
        isRetina: isRetina,
        getPixelRatio: getPixelRatio,
        getPlatform: getPlatform,
        getFormFactor: getFormFactor,
        getOrientation: getOrientation,
        getResolution: getResolution,
        isPortrait: isPortrait,
        isLandscape: isLandscape,
        viewportMonitor: viewportMonitor,
        containerMonitor: containerMonitor,
        isMobile: isMobile,
        isNonMobile: isNonMobile,
        isPhone: isPhone,
        isTablet: isTablet,
        isPC: isPC,
        isTV: isTV,
        isIOS: isIOS,
        isApple: isApple,
        isAndroid: isAndroid,
        isSymbian: isSymbian,
        isBlackberry: isBlackberry,
        isWindows: isWindows,
        isWindowsPhone: isWindowsPhone,
        resize: resize,
        resizeContainer: resizeContainer
    };
    return Restive;

})(window, document, jQuery);

/*
 * Restive.JS Plugin v1.3.0
 * http://restivejs.com
 *
 * Copyright 2013 Obinwanne Hill <https://about.me/obinwanne.hill>
 * Released under MIT License
 */
(function (window, document, $, undefined) {
    //Gets the content of a function
    Function.prototype.getFuncBody = function()
    {
        // Get content between first { and last }
        var m = this.toString().match(/\{([\s\S]*)\}/m)[1];
        // Strip comments
        return m.replace(/^\s*\/\/.*$/mg,'');
    };

    var methods = {
		init : function(options){

			try{

                //Multiple Constructor Manager
                methods._multiConstructorCounter();
                methods._multiConstructorManager();

                //Create plugin variables
                var $options = options,
                    $valid_platform_arr = ['all', 'ios', 'android', 'symbian', 'blackberry', 'windows'],
                    $valid_formfactor_arr = ['all', 'pc', 'tv', 'tablet', 'phone'],
                    $platform_init_str = options.platform,
                    $formfactor_init_str = options.formfactor,
                    responsive_basis_str,
                    is_resp_basis_container_bool,
                    is_multi_start_bool = Restive.store("rstv_multi_start"),
                    rstv_store_multi_counter_int = Restive.store("rstv_multi_count"),
                    is_multi_abort_2_bool = Restive.store("rstv_multi_abort_2");

                //Ensure Platform Values are within range
				switch(true)
				{
					case(in_array($platform_init_str, $valid_platform_arr) === false):
						methods._error('rstv_error_001', '"'+$platform_init_str+'" is not a valid Platform option!');
                        return false;
					    break;
				}

                //Ensure Form Factor Values are within range
                switch(true)
                {
                    case(in_array($formfactor_init_str, $valid_formfactor_arr) === false):
                        methods._error('rstv_error_002', '"'+$formfactor_init_str+'" is not a valid Form Factor option!');
                        return false;
                        break;
                }

                //Abort if endMulti() is not called after startMulti() with multiple constructors
                switch(true)
                {
                    case (is_multi_abort_2_bool):
                        methods._error('rstv_error_003', 'If you are calling the Restive.JS Constructor more than once, you must call $.restive.endMulti() at the end!');
                        return false;
                        break;
                }

                //Get Initial Breakpoints
				var $breakpoints_arr = [],
                    $breakpoints_init_arr = [],
                    $classes_init_arr = [];

                $breakpoints_init_arr = options.breakpoints;
                $classes_init_arr = options.classes;

                $breakpoints_arr = methods.getBreakpoints($breakpoints_init_arr, $classes_init_arr);

                /**
                 * Generate Restive Core Information
                 */
                var $rstv_core_info_arr = [];

                //A1. Get the Device Platform e.g. iOS, Android, etc.
                $rstv_core_info_arr["platform"] = methods.getPlatform();

                //A2. Get the Device Form Factor
                $rstv_core_info_arr["formfactor"] = methods.getFormFactor();

                //A3. Check if Device is a mobile device
                $rstv_core_info_arr["is_mobile"] = methods.isMobile();

                //A4. Get the Device Pixel Ratio
                $rstv_core_info_arr["pixelratio"] = methods.getPixelRatio();

                //A5. Get the Orientation and Set Orientation Marker
                $rstv_core_info_arr["orientation"] = methods.getOrientation();

                //A6. Get the Selector of the Element
                $rstv_core_info_arr["selector"] = getSelector(this);

                //A7. Get the Tag Name of the Element
                $rstv_core_info_arr["tagname"] = this.prop("tagName").toLowerCase();

                //Get the Basis for Responsiveness
                responsive_basis_str = methods._responsiveBasis($options, $rstv_core_info_arr);
                is_resp_basis_container_bool = !!((responsive_basis_str == 'c'));

                //Add Responsive Basis Indicator to Device Core Info
                $rstv_core_info_arr["is_resp_basis_container"] = is_resp_basis_container_bool;

                //Set Event Handlers and Callbacks according to Responsive Basis
                switch(true)
                {
                    case (is_resp_basis_container_bool):
                        methods._containerMonitor($breakpoints_arr, this, $options, $rstv_core_info_arr);
                        break;

                    default:
                        switch(true)
                        {
                            case (!is_multi_start_bool):
                                methods._viewportMonitor($breakpoints_arr, this, $options, $rstv_core_info_arr);
                                methods._callbackManager($options, ['ready', 'init']);
                                break;

                            default:
                                //Store some variables required for later use
                                window.parent.rstv_store.main["rstv_breakpoints_"+rstv_store_multi_counter_int] = $breakpoints_arr;
                                window.parent.rstv_store.main["rstv_this_"+rstv_store_multi_counter_int] = this;
                                window.parent.rstv_store.main["rstv_options_"+rstv_store_multi_counter_int] = $options;
                                window.parent.rstv_store.main["rstv_core_info_"+rstv_store_multi_counter_int] = $rstv_core_info_arr;

                                window.rstv_store.main = window.parent.rstv_store.main;
                        }
                }

                //reset turbo_classes_reflow sessionStorage variable
                Restive.store("rstv_turbo_classes_reflow_status_in", null);

                /**
                 * Manage Breakpoints
                 */
                return this.each(function(){
					var $this = $(this);
                    methods.setBreakpoints($breakpoints_arr, $this, $options, $rstv_core_info_arr);
				});
			}
			catch(e){
				alert(e);
			    console.log(e)/*RemoveLogging:skip*/;
			}
		},
        _error: function(code, message){
            var error_msg_is_init_bool = !!((String(Restive.store(code+"_init")).toLowerCase() === "true"));
            switch(true)
            {
                case (!error_msg_is_init_bool):
                    Restive.store(code+"_init", true);
                    throw new Error(message);
                    break;
            }
        },
        _callbackManager: function(){

            var myArgs = Array.prototype.slice.call(arguments),
                options = myArgs[0],
                callback_type_arr = myArgs[1],
                $on_func,
                $on_func_body_count
                ;

            //Execute onReady
            switch(true)
            {
                case (in_array('ready', callback_type_arr)):
                    var $on_ready = options.onReady,
                        $on_ready_body_count = options.onReady.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_ready) && ($on_ready_body_count > 0)):
                            //Execute Callback
                            $on_ready();
                            break;
                    }
                break;
            }

            //Resize Callbacks
            switch(true)
            {
                case (in_array('resize', callback_type_arr)):
                    var $on_resize = options.onResize,
                        $on_resize_body_count = options.onResize.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_resize) && ($on_resize_body_count > 0)):
                            //Execute Callback
                            $on_resize();
                            break;
                    }
                    break;
            }

            //PC Force Reflow Callbacks
            switch(true)
            {
                case (in_array('turboclassesreflow', callback_type_arr)):
                    var $reflow_direction_str = callback_type_arr[1],
                        $on_reflow = options.onTurboClassReflow,
                        $on_reflow_body_count = options.onTurboClassReflow.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_reflow) && ($on_reflow_body_count > 0)):
                            //Execute Callback
                            $on_reflow();
                            break;
                    }

                    var $on_reflow_in = options.onTurboClassReflowIn,
                        $on_reflow_in_body_count = options.onTurboClassReflowIn.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_reflow_in) && ($on_reflow_in_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case ($reflow_direction_str == 'in'):
                                    $on_reflow_in();
                                    break;
                            }
                            break;
                    }

                    var $on_reflow_out = options.onTurboClassReflowOut,
                        $on_reflow_out_body_count = options.onTurboClassReflowOut.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_reflow_out) && ($on_reflow_out_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case ($reflow_direction_str == 'out'):
                                    $on_reflow_out();
                                    break;
                            }
                            break;
                    }

                    break;
            }

            //Rotate/Orientation Callbacks
            switch(true)
            {
                case (in_array('rotate', callback_type_arr)):
                    var ort_curr_str = Restive.getOrientation(),
                        $on_rotate = options.onRotate,
                        $on_rotate_body_count = options.onRotate.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_rotate) && ($on_rotate_body_count > 0)):
                            //Execute Callback
                            $on_rotate();
                            break;
                    }

                    //Execute onRotateToP
                    var $on_rotate_to_p = options.onRotateToP,
                        $on_rotate_to_p_body_count = options.onRotateToP.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_rotate_to_p) && ($on_rotate_to_p_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case (ort_curr_str == 'portrait'):
                                    $on_rotate_to_p();
                                    break;
                            }
                            break;
                    }

                    //Execute onRotateToL
                    var $on_rotate_to_l = options.onRotateToL,
                        $on_rotate_to_l_body_count = options.onRotateToL.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_rotate_to_l) && ($on_rotate_to_l_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case (ort_curr_str == 'landscape'):
                                    $on_rotate_to_l();
                                    break;
                            }
                            break;
                    }
                    break;
            }

            //Add/Remove Class Callbacks
            switch(true)
            {
                case (in_array('addclass', callback_type_arr) || in_array('removeclass', callback_type_arr)):
                    var $callback_type_str = callback_type_arr[0],
                        $callback_type_args = callback_type_arr[1],
                        $callback_data_arr = {'addclass': 'onAddClass', 'removeclass': 'onRemoveClass'}
                        ;
                    $on_func = options[$callback_data_arr[''+$callback_type_str+'']];
                    $on_func_body_count = $on_func.getFuncBody().length;

                    switch(true)
                    {
                        case ($.isFunction($on_func) && ($on_func_body_count > 0)):
                            //Execute Callback
                            $on_func($callback_type_args);
                            break;
                    }
                    break;
            }

            //Initialization Callbacks
            switch(true)
            {
                case (in_array('init', callback_type_arr)):
                    switch(true)
                    {
                        case (in_array('init', callback_type_arr)):
                            var callback_name_arr = [
                                'onPortrait', 'onLandscape', 'onRetina', 'onPhone', 'onTablet', 'onPC', 'onTV', 'onIOS', 'onAndroid', 'onSymbian', 'onBlackberry', 'onWindows', 'onWindowsPhone', 'onMobile', 'onNonMobile'
                            ],
                                func_name_arr = [
                                'isPortrait', 'isLandscape', 'isRetina', 'isPhone', 'isTablet', 'isPC', 'isTV', 'isIOS', 'isAndroid', 'isSymbian', 'isBlackberry', 'isWindows', 'isWindowsPhone', 'isMobile', 'isNonMobile'
                            ];

                            for(var i = 0; i < count(func_name_arr); i++)
                            {
                                $on_func = options[callback_name_arr[i]];
                                $on_func_body_count = $on_func.getFuncBody().length;

                                switch(true)
                                {
                                    case ($.isFunction($on_func) && ($on_func_body_count > 0)):
                                        var $on_func_res = methods[func_name_arr[i]],
                                            $on_func_bool = $on_func_res();
                                        switch(true)
                                        {
                                            case ($on_func_bool):
                                                $on_func();
                                                break;
                                        }
                                        break;
                                }
                            }
                            break;
                    }
                    break;
            }
        },
        _URLMonitor: function(){
            //monitor changes from URL to URL
            var $rstv_url_str = Restive.store("rstv_url"),
                $rstv_url_hash_prev_str = Restive.store("rstv_url_hash"),
                $rstv_url_hash_curr_str = md5($rstv_url_str);

            switch(true)
            {
                case ($rstv_url_hash_curr_str != $rstv_url_hash_prev_str):
                    //page has changed
                    Restive.store("rstv_multi_bpm_idx rstv_cache_bpm rstv_cache_bpm_lock rstv_cache_req rstv_cache_bpm_viewport_diff", null);

                    Restive.store("rstv_url_hash", $rstv_url_hash_curr_str);
                    break;
            }
        },
        _responsiveBasis: function($options, $rstv_core_info){
            /**
             * This determines the basis for responsive i.e. viewport or container
             * 1. If anchor option is 'element' and Restive.JS selector is under the body tag, basis is 'container' or 'c'
             * 2. If not 1, basis is 'viewport' or 'v'
             */
            var resp_basis_str,
                selector_name_str = $rstv_core_info["selector"],
                elem_is_id_selector_bool = /^#[^\s]+$/i.test(selector_name_str),
                elem_is_child_of_body_bool = elementIsChildOf('body', selector_name_str),
                anchor_str = $options.anchor
                ;

            try
            {
                switch(true)
                {
                    case (elem_is_child_of_body_bool && (anchor_str == 'element' || anchor_str == 'e')):
                        switch(true)
                        {
                            case (!elem_is_id_selector_bool):
                                throw new Error("You must use only the JQuery ID selector when the 'anchor' option is set to 'e' or 'element'!");
                                break;
                        }
                        resp_basis_str = 'c';
                        break;

                    default:
                        resp_basis_str = 'v';
                        /**
                         * This indicates that at least one Restive.JS constructor has a Responsive Basis of 'viewport'
                         * NOTE: It is ultimately used to prevent the viewport and callback manager from being activated if all Restive.JS constructors are determined to have a 'container' responsiveness basis
                         */
                        Restive.store("rstv_resp_basis_viewport_init", true);
                }

                return resp_basis_str;
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        _viewportMonitor: function($bp_arr, $this, $options, $rstv_core_info){
            //set event handler for resize
            var event_name_resize_str = "resize_viewport",
                event_name_ort_str = "change_orientation";

            //set event handler for viewport resize
            $(window).on(event_name_resize_str, function(){
                methods._onResizeViewport($bp_arr, $this, $options, $rstv_core_info);
            });

            //set event handler for orientation change
            $(window).on(event_name_ort_str, function(){
                methods._onChangeOrientation($bp_arr, $this, $options, $rstv_core_info);
            });

            //activate Viewport Monitor
            Restive.viewportMonitor();
        },
        _containerMonitor: function($bp_arr, $this, $options, $rstv_core_info){
            var event_name_resize_container_str = "resizecontainer"
                ;

            //set event handler for container resize
            $this.on(event_name_resize_container_str, function(){
                methods._onResizeContainer($bp_arr, $this, $options, $rstv_core_info);
            });
        },
        _onResizeViewport: function($bp_arr, $this, $options, $rstv_core_info){
            try{
                return $this.each(function(){
                    var $_this = $(this)
                        ;
                    methods.setBreakpoints($bp_arr, $_this, $options, $rstv_core_info, 'rv');

                    //call resize callbacks
                    methods._callbackManager($options, ['resize']);
                });
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        _onResizeContainer: function($bp_arr, $this, $options, $rstv_core_info){
            try{
                return $this.each(function(){
                    var $_this = $(this)
                        ;
                    methods.setBreakpoints($bp_arr, $_this, $options, $rstv_core_info, 'rc');
                });
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        _onChangeOrientation: function($bp_arr, $this, $options, $rstv_core_info){
            try{
                return $this.each(function(){
                    var $_this = $(this);
                    methods.setBreakpoints($bp_arr, $_this, $options, $rstv_core_info, 'co');

                    //call orientation callbacks
                    methods._callbackManager($options, ['rotate']);
                });
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        getBreakpoints: function(bp_arr, bp_class_arr){
            return Restive.getBreakpoints(bp_arr, bp_class_arr);
        },
        setBreakpoints: function(){

            var myArgs = Array.prototype.slice.call(arguments);
            var bp_arr = myArgs[0],
                elem = myArgs[1],
                rstv_options = myArgs[2],
                rstv_core_info = myArgs[3],
                rstv_event_info = myArgs[4],
                is_ort_change_bool = false,
                is_resize_viewport_bool = false,
                is_resize_container_bool = false,
                is_resp_basis_container_bool = rstv_core_info["is_resp_basis_container"],
                is_multi_abort_1_bool = Restive.store("rstv_multi_abort_1")
            ;

            //Capture orientation change
            switch(true)
            {
                case (rstv_event_info == 'co'):
                    //there has been a change in orientation. manage accordingly
                    is_ort_change_bool = true;
                    break;
            }

            //Capture resize
            switch(true)
            {
                case (rstv_event_info == 'rv'):
                    //the viewport has been resized. manage accordingly
                    is_resize_viewport_bool = true;
                    break;
            }

            //Capture resize container
            switch(true)
            {
                case (rstv_event_info == 'rc'):
                    //the selected container has been resized. manage accordingly
                    is_resize_container_bool = true;
                    break;
            }

            //Abort Restive.JS if multiple constructor anomalies occur
            switch(true)
            {
                case (is_multi_abort_1_bool):
                    methods._error('rstv_error_004', 'If you are calling the Restive.JS Constructor more than once, you must call $.restive.startMulti() before calling these constructors!');
                    return false;
                    break;
            }

            /**
             * When multiple Restive.JS Constructors are used, and a match is found, that match is saved
             * On successive attempts, the breakpoint conditions that previously failed are prevented from being executed further to improve overall performace
             * The following code manages this process
             * NOTE: If the Responsive Basis is 'container', this functionality is ignored
             */
            var rstv_store_is_multi_bool = Restive.store("rstv_multi_start"),
                rstv_store_multi_count_int = parseInt(Restive.store("rstv_multi_count")),
                rstv_store_bpm_idx_int = parseInt(Restive.store("rstv_multi_bpm_idx")),
                rstv_store_bpm_lock_bool = Restive.store("rstv_cache_bpm_lock")
                ;

            switch(true)
            {
                case (!is_resp_basis_container_bool):
                    /**
                     * Do only if Responsive Basis is Viewport
                     */
                    switch(true)
                    {
                        case (rstv_store_is_multi_bool && !is_ort_change_bool && rstv_store_bpm_lock_bool):
                            switch(true)
                            {
                                case (isNumber(rstv_store_multi_count_int) && isNumber(rstv_store_bpm_idx_int) && rstv_store_multi_count_int != rstv_store_bpm_idx_int):
                                    return false;
                                    break;
                            }
                            break;
                    }
                    break;
            }

            //get Device and Orientation Options and Information
            var restive_user_agent_str = Restive.getUserAgent(),
                options_platform_str = rstv_options.platform,
                options_formfactor_str = rstv_options.formfactor,
                options_force_dip_str = rstv_options.force_dip,
                restive_platform_str = rstv_core_info["platform"],
                restive_formfactor_str = rstv_core_info["formfactor"],
                restive_pixelratio_str = rstv_core_info["pixelratio"],
                restive_is_mobile_str = (rstv_core_info["is_mobile"] == true) ? "true": "false",
                ort_init_str = Restive.store("rstv_ort_init"),
                ort_curr_str = Restive.store("rstv_ort_curr"),
                is_portrait_bool = Restive.isPortrait(),
                is_landscape_bool = (is_portrait_bool === true) ? false : true;


            var dim_arr = [],
                viewport_w_int,
                viewport_h_int,
                screen_w_int,
                screen_h_int,
                pixel_w_int,
                pixel_h_int,
                viewport_w_active_int,
                bp_set_arr = [],
                bp_class_arr = [],
                is_class_def_bool = false,
                bp_width_tok_str = bp_arr["bp_w"],
                bp_height_tok_str = bp_arr["bp_h"],
                bp_ort_tok_str = bp_arr["bp_o"],
                bp_type_tok_str = bp_arr["bp_t"],
                bp_class_tok_str = bp_arr["bp_c"],
                bp_width_arr = [],
                bp_height_arr = [],
                bp_ort_arr = [],
                bp_type_arr = [];

            viewport_w_int = Restive.viewportW();
            viewport_w_active_int = viewport_w_int;
            viewport_h_int = Restive.viewportH();
            screen_w_int = Restive.screenW();
            screen_h_int = Restive.screenH();
            pixel_w_int = Restive.pixelW();
            pixel_h_int = Restive.pixelH();

            switch(true)
            {
                case (options_force_dip_str == true):
                    viewport_w_active_int = Restive.pixelW();
                    break;
            }

            //Extract Data to Array
            bp_width_arr = arrayToInteger(explode("|", bp_width_tok_str));
            bp_height_arr = arrayToInteger(explode("|", bp_height_tok_str));
            bp_ort_arr = explode("|", bp_ort_tok_str);
            bp_type_arr = explode("|", bp_type_tok_str);

            //Manage Classes Data
            switch(true)
            {
                case (typeof bp_class_tok_str !== "undefined" || bp_class_tok_str != null):
                    is_class_def_bool = true;
                    bp_class_arr = explode("|", bp_class_tok_str);
                    break;
            }

            var bp_width_arr_has_dupl_bool,
                bp_width_tok_no_dupl_str = '',
                bp_break_on_match_bool,
                bp_width_int,
                bp_width_prev_int,
                bp_width_prev_ort_marker_int,
                is_curr_bp_in_ort_range_bool = true,
                is_prev_bp_in_ort_range_bool = true,
                is_ort_marker_set_init_bool = false,        //this indicates whether orientation markers have been used at least once
                bp_width_start_int,
                bp_width_min_int,
                bp_width_max_int,
                bp_height_int,
                bp_width_diff_r_int,                        //the difference between current viewport width and bp_width_max_int
                bp_width_diff_r_abs_int,                    //the absolute difference between current viewport width and bp_width_max_int
                bp_width_diff_l_int,                        //the difference between current viewport width and bp_width_min_int
                bp_width_diff_r_comp_int,
                bp_type_str,
                bp_ort_str,
                bp_class_str,
                bp_class_last_sel_str,
                span_range_bool,
                ort_range_bool,
                is_breakpoint_match_bool = false,
                is_breakpoint_match_hit_bool = false,
                is_breakpoint_match_os_bool = true,
                is_breakpoint_match_ff_bool = true,
                ba_usage_log_status_str = '',
                ba_usage_log_status_code_str = '',
                elem_set_data_str
                ;

            var bp_width_arr_count_int = count(bp_width_arr);

            //check if there are duplicate width values
            bp_width_arr_has_dupl_bool = arrayHasDuplicates(bp_width_arr);
            bp_break_on_match_bool = (bp_width_arr_has_dupl_bool) ? false : true;

            /**
             * Iterate over individual breakpoints
             */
            for(var i = 0; i < bp_width_arr_count_int; i++)
            {
                /**
                 * Filter for:
                 * 1. platform
                 * 2. form factor
                 * If provided in the options
                 * Break out of for loop
                 */
                //1
                switch(true)
                {
                    case (rstv_options.platform != 'all' && rstv_options.platform != restive_platform_str):
                        is_breakpoint_match_os_bool = false;
                        break;
                }

                //2
                switch(true)
                {
                    case (rstv_options.formfactor != 'all' && rstv_options.formfactor != restive_formfactor_str):
                        is_breakpoint_match_ff_bool = false;
                        break;
                }

                //break out of for loop if match is not found
                if(!is_breakpoint_match_os_bool || !is_breakpoint_match_ff_bool) break;

                var i_prev = i - 1;
                bp_width_int = bp_width_arr[i];

                //manage previous breakpoint widths
                switch(true)
                {
                    case (i > 0):
                        bp_width_prev_int = bp_width_arr[i_prev];
                        break;

                    default:
                        bp_width_prev_int = 0;
                        bp_width_prev_ort_marker_int = 0;
                }

                bp_height_int = bp_height_arr[i];

                bp_type_str = bp_type_arr[i];
                bp_ort_str = bp_ort_arr[i];

                //Consider orientation markers
                is_prev_bp_in_ort_range_bool = is_curr_bp_in_ort_range_bool;
                switch(true)
                {
                    case (bp_ort_str == "p"):
                        ort_range_bool = (is_portrait_bool) ? true : false;
                        is_ort_marker_set_init_bool = true;

                        is_curr_bp_in_ort_range_bool = ort_range_bool;
                        bp_width_tok_no_dupl_str = (is_prev_bp_in_ort_range_bool === false) ? bp_width_prev_ort_marker_int: bp_width_tok_no_dupl_str;
                        break;

                    case (bp_ort_str == "l"):
                        ort_range_bool = (is_landscape_bool) ? true : false;
                        is_ort_marker_set_init_bool = true;

                        is_curr_bp_in_ort_range_bool = ort_range_bool;
                        bp_width_tok_no_dupl_str = (is_prev_bp_in_ort_range_bool === false) ? bp_width_prev_ort_marker_int: bp_width_tok_no_dupl_str;
                        break;

                    default:
                        /**
                         * If is_prev_bp_in_ort_range_bool is false, it means that the previous breakpoint
                         * had an orientation marker ('-p' or '-l') that did not match the current
                         * orientation of the viewport.
                         * And if is_ort_marker_set_init_bool is true, then there has been a transition from a
                         * breakpoint with an orientation marker to one without one.
                         */
                        bp_width_tok_no_dupl_str = (is_ort_marker_set_init_bool === true && is_prev_bp_in_ort_range_bool === false) ? bp_width_prev_ort_marker_int: bp_width_tok_no_dupl_str;

                        bp_width_prev_ort_marker_int = (i > 0) ? bp_width_int: 0;
                        ort_range_bool = true;
                        is_curr_bp_in_ort_range_bool = ort_range_bool;
                }

                //Manage duplicate entries
                switch(true)
                {
                    case (i == 0):
                        bp_width_start_int = 0;
                        bp_width_tok_no_dupl_str = bp_width_int;
                        break;

                    case (i >= 1):

                        switch(true)
                        {
                            case (bp_width_int !== bp_width_prev_int):
                                bp_width_tok_no_dupl_str = bp_width_int+'-!'+bp_width_tok_no_dupl_str;
                                break;
                        }

                        bp_width_start_int = parseInt(getValueAfterExplode(bp_width_tok_no_dupl_str, '-!', 1));

                        break;
                }

                //Define classes
                bp_class_str = bp_class_arr[i];

                //set ranges for widths
                switch(true)
                {
                    case (i == 0):
                        bp_width_min_int = bp_width_start_int;
                        bp_width_max_int = bp_width_int;

                        break;

                    default:
                        bp_width_min_int = (bp_width_start_int == 0) ? bp_width_start_int : bp_width_start_int + 1;
                        bp_width_max_int = bp_width_int;
                }

                /**
                 * Check for Matching Breakpoints
                 * 1. Do for Container Basis
                 * 2. Do for Viewport Basis. Make sure to consider force_dip option
                 */
                switch(true)
                {
                    case (is_resp_basis_container_bool):
                        //1
                        span_range_bool = Restive.eSpan(bp_width_min_int, bp_width_max_int, elem, rstv_options.anchor_e_df, rstv_options.force_dip);
                        break;

                    default:
                        //2
                        span_range_bool = (options_force_dip_str == true) ? Restive.cSpan(bp_width_min_int, bp_width_max_int): Restive.vSpan(bp_width_min_int, bp_width_max_int);
                }

                /**
                 * Set Breakpoints
                 * A. For Container Basis
                 *
                 * B. For Viewport Basis
                 * Status codes as follows:
                 * 1: Viewport matched breakpoint with clean hit on initialization i.e. viewport is virtually identical to breakpoint
                 * 2: Viewport matched breakpoint with clean hit after orientation change
                 * 3: Viewport matched breakpoint but not with a clean hit i.e. margin between viewport width and upper limit of matched breakpoint range is significant
                 * 4: Viewport matched breakpoint after orientation change but not with a clean hit i.e. margin between viewport width and upper limit of matched breakpoint range is significant
                 */
                switch(true)
                {
                    case (span_range_bool && ort_range_bool):

                        switch(true)
                        {
                            case (is_resp_basis_container_bool):
                                //A
                                is_breakpoint_match_bool = true;
                                break;

                            default:
                                //B
                                bp_width_diff_r_int = bp_width_max_int - viewport_w_active_int;
                                bp_width_diff_r_abs_int = Math.abs(bp_width_diff_r_int);
                                bp_width_diff_l_int = viewport_w_active_int - bp_width_min_int;

                                bp_width_diff_r_comp_int = bp_width_max_int*0.1;
                                bp_width_diff_r_comp_int = Math.round(bp_width_diff_r_comp_int);

                                switch(true)
                                {
                                    case (is_ort_change_bool):
                                        //capture some key metrics
                                        switch(true)
                                        {
                                            case (bp_width_diff_r_int > bp_width_diff_r_comp_int):
                                                ba_usage_log_status_code_str = "4";
                                                break;

                                            default:
                                                ba_usage_log_status_code_str = "2";
                                        }
                                        break;

                                    default:
                                        //capture some key metrics
                                        switch(true)
                                        {
                                            case (bp_width_diff_r_int > bp_width_diff_r_comp_int):
                                                ba_usage_log_status_code_str = "3";
                                                break;

                                            default:
                                                ba_usage_log_status_code_str = "1";
                                        }
                                }

                                is_breakpoint_match_bool = true;

                                //Capture class values of last hit
                                switch(true)
                                {
                                    case (is_breakpoint_match_bool):
                                        is_breakpoint_match_hit_bool = true;

                                        bp_class_last_sel_str = bp_class_str;

                                        switch(true)
                                        {
                                            case (bp_ort_str != "x"):
                                                bp_break_on_match_bool = true;
                                                break;
                                        }
                                        break;
                                }
                        }

                        break;

                    default:
                        is_breakpoint_match_bool = false;
                }

                //break out of for loop if match is found
                if(is_breakpoint_match_bool && bp_break_on_match_bool) break;
            }

            //Perform adjustment of breakpoint match value to compensate for if bp_break_on_match_bool is false
            switch(true)
            {
                case (is_breakpoint_match_hit_bool):
                    is_breakpoint_match_bool = true;
                    bp_class_str = bp_class_last_sel_str;
                    break;
            }

            //Some Breakpoint Advisory Information
            switch(true)
            {
                case (!is_breakpoint_match_bool):

                    //Do for Container Basis
                    switch(true)
                    {
                        case (is_resp_basis_container_bool):
                            methods.unsetElementDOM(elem, rstv_options);
                            return;
                            break;
                    }

                    //Do for Viewport Basis
                    bp_width_min_int = 0;
                    bp_width_max_int = 0;

                    switch(true)
                    {
                        case (!Restive.store("rstv_multi_start") || is_ort_change_bool):
                            methods.unsetElementDOM(elem, rstv_options);
                            break;
                    }

                    switch(true)
                    {
                        case (!is_breakpoint_match_os_bool && is_breakpoint_match_ff_bool):
                            ba_usage_log_status_code_str = "7";
                            break;

                        case (!is_breakpoint_match_ff_bool && is_breakpoint_match_os_bool):
                            ba_usage_log_status_code_str = "8";
                            break;

                        case (!is_breakpoint_match_ff_bool && !is_breakpoint_match_os_bool):
                            ba_usage_log_status_code_str = "9";
                            break;

                        default:
                            switch(true)
                            {
                                case (is_ort_change_bool):
                                    ba_usage_log_status_code_str = "6";
                                    break;

                                default:
                                    ba_usage_log_status_code_str = "5";
                            }
                    }

                    //Add Turbo Classes if any
                    elem_set_data_str = methods._addTurboClasses('', rstv_options.turbo_classes);

                    //This if for turbo_classes_reflow option
                    elem_set_data_str = methods._addTurboClassesReflow(elem_set_data_str, rstv_options);

                    methods.setElementDOM(elem, elem_set_data_str, rstv_options);

                    //persist
                    Restive.store("rstv_breakpoint_match_curr", false);

                    break;

                case (is_breakpoint_match_bool):
                    elem_set_data_str = methods._addTurboClasses(bp_class_str, rstv_options.turbo_classes);

                    //This if for turbo_classes_reflow option
                    elem_set_data_str = methods._addTurboClassesReflow(elem_set_data_str, rstv_options);

                    /**
                     * Set class
                     */
                    //Do for Container Basis
                    switch(true)
                    {
                        case (is_resp_basis_container_bool):
                            methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                            return;
                            break;
                    }

                    //Do for Viewport Basis
                    switch(true)
                    {
                        case (Restive.store("rstv_multi_start")):
                            var bpm_h_counter_int = parseInt(Restive.store("rstv_bpm_h_counter"));
                            switch(true)
                            {
                                case (is_ort_change_bool):
                                    //change in orientation
                                    methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                                    break;

                                default:
                                    //initialization
                                    switch(true)
                                    {
                                        case (bpm_h_counter_int > 1):
                                            //check if the current viewport offers a better match
                                            var ss_bp_width_diff_r_abs_int = parseInt(Restive.store("rstv_cache_bpm_viewport_diff"));

                                            switch(true)
                                            {
                                                case (bp_width_diff_r_abs_int < ss_bp_width_diff_r_abs_int):
                                                    //this is a better viewport match
                                                    methods.setElementDOM(elem, elem_set_data_str, rstv_options);

                                                    switch(true)
                                                    {
                                                        case(!rstv_store_bpm_lock_bool):
                                                            Restive.store("rstv_multi_bpm_idx", rstv_store_multi_count_int);
                                                            break;
                                                    }

                                                    Restive.store("rstv_cache_bpm_viewport_diff", bp_width_diff_r_abs_int);
                                                    break;
                                            }

                                            break;

                                        default:
                                            methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                                            switch(true)
                                            {
                                                case(!rstv_store_bpm_lock_bool):
                                                    Restive.store("rstv_multi_bpm_idx", rstv_store_multi_count_int);
                                                    break;
                                            }

                                            Restive.store("rstv_cache_bpm_viewport_diff", bp_width_diff_r_abs_int);
                                    }

                                    bpm_h_counter_int++;
                                    Restive.store("rstv_bpm_h_counter", bpm_h_counter_int, '', {expires: 1000});
                            }

                            break;

                        default:
                            //Set the element class immediately
                            methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                    }

                    //persist
                    Restive.store("rstv_breakpoint_match_curr", true);
                    break;
            }

            /**
             * Track Breakpoint Hits and Misses in Storage
             * Do this incrementally when:
             * 1. Multi-Constructor Mode is active
             * 2. There has not been a change in orientation
             * 3. Breakpoint Match Cache Lock is not set
             * NOTE: For Multi-constructor Operations only
             */
            var rstv_cache_bpm_lock_bool = Restive.store("rstv_cache_bpm_lock");
            switch(true)
            {
                case (rstv_store_is_multi_bool && !is_ort_change_bool && !((isString(rstv_cache_bpm_lock_bool) && rstv_cache_bpm_lock_bool != "") || isBool(rstv_cache_bpm_lock_bool))):
                    (Restive.store("rstv_breakpoint_match_curr")) ? methods._extVarTracker("rstv_cache_bpm", "h", "ls", false, '', false): methods._extVarTracker("rstv_cache_bpm", "m", "ls", false, '', false);
                    break;
            }

            //Exit for Matched Breakpoint
            switch(true)
            {
                case (is_breakpoint_match_bool):
                    return true;
                    break;
            }

            return false;
		},
        _addTurboClassesReflow: function(class_data_str, options){
            switch(true)
            {
                case (methods.isPC()):
                    //only do for Personal Computer environments

                    switch(true)
                    {
                        case (options.turbo_classes_reflow && isString(options.turbo_classes) && options.turbo_classes != ''):
                            //only do if turbo_classes_reflow option is true and turbo_classes are populated

                            var opt_isset_is_mobile_bool,
                                fpr_span_range_tomobile_bool,
                                fpr_span_range_tophone_bool,
                                fpr_span_range_totablet_bool,
                                fpr_limits_tablet_int,
                                fpr_limits_phone_int,
                                fpr_limits_bp_btw_phone_and_tablet_int,
                                fpr_test_key_str,
                                fpr_test_value_str,
                                fpr_limits_arr = [],
                                turbo_classes_arr = [],
                                fpr_final_data_str = class_data_str,
                                is_turbo_classes_reflow_match_bool = false,
                                is_turbo_classes_reflow_status_bool = Restive.store('rstv_turbo_classes_reflow_status_in')
                                ;

                            //get the turbo_classes_reflow_limits values
                            fpr_limits_arr = explode(',', options.turbo_classes_reflow_limits);
                            fpr_limits_phone_int = parseInt(fpr_limits_arr[0]);
                            fpr_limits_tablet_int = parseInt(fpr_limits_arr[1]);

                            //ensure is_mobile turbo_classes parameter
                            opt_isset_is_mobile_bool = /is_mobile=/i.test(options.turbo_classes);
                            switch(true)
                            {
                                case (opt_isset_is_mobile_bool):
                                    //iterate over all provided turbo_classes
                                    turbo_classes_arr = explode(',', options.turbo_classes);
                                    for(var j = 0; j < count(turbo_classes_arr); j++)
                                    {
                                        fpr_test_key_str = getValueAfterExplode(turbo_classes_arr[j], "=", 0);
                                        fpr_test_value_str = getValueAfterExplode(turbo_classes_arr[j], "=", 1);

                                        switch(true)
                                        {
                                            case (fpr_test_key_str == 'is_mobile'):
                                                fpr_span_range_tomobile_bool = (options.force_dip == true) ? Restive.cSpan(0, fpr_limits_tablet_int): Restive.vSpan(0, fpr_limits_tablet_int);

                                                switch(true)
                                                {
                                                    case (fpr_span_range_tomobile_bool):

                                                        fpr_final_data_str += ' '+fpr_test_value_str;
                                                        is_turbo_classes_reflow_match_bool = true;
                                                        switch(true)
                                                        {
                                                            case (!is_turbo_classes_reflow_status_bool && is_turbo_classes_reflow_match_bool):
                                                                Restive.store('rstv_turbo_classes_reflow_status_in', true);

                                                                //add callback
                                                                methods._callbackManager(options, ['turboclassesreflow', 'in']);

                                                                break;
                                                        }

                                                        break;

                                                    default:
                                                        is_turbo_classes_reflow_match_bool = false;
                                                        switch(true)
                                                        {
                                                            case (is_turbo_classes_reflow_status_bool && !is_turbo_classes_reflow_match_bool):
                                                                Restive.store('rstv_turbo_classes_reflow_status_in', false);

                                                                //add callback
                                                                methods._callbackManager(options, ['turboclassesreflow', 'out']);

                                                                break;
                                                        }
                                                }

                                                break;
                                        }

                                        switch(true)
                                        {
                                            case (fpr_test_key_str == 'is_phone'):
                                                fpr_span_range_tophone_bool = (options.force_dip == true) ? Restive.cSpan(0, fpr_limits_phone_int): Restive.vSpan(0, fpr_limits_phone_int);

                                                fpr_final_data_str = (fpr_span_range_tophone_bool) ? fpr_final_data_str + ' ' + fpr_test_value_str: fpr_final_data_str;
                                                break;
                                        }

                                        switch(true)
                                        {
                                            case (fpr_test_key_str == 'is_tablet'):
                                                fpr_limits_bp_btw_phone_and_tablet_int = fpr_limits_phone_int + 1;
                                                fpr_span_range_totablet_bool = (options.force_dip == true) ? Restive.cSpan(fpr_limits_bp_btw_phone_and_tablet_int, fpr_limits_tablet_int): Restive.vSpan(fpr_limits_bp_btw_phone_and_tablet_int, fpr_limits_tablet_int);
                                                fpr_final_data_str = (fpr_span_range_totablet_bool) ? fpr_final_data_str + ' ' + fpr_test_value_str: fpr_final_data_str;

                                                break;
                                        }

                                    }

                                    return fpr_final_data_str;
                                    break;
                            }
                            break;
                    }
                    break;
            }

            //Restive.store('rstv_turbo_classes_reflow_status_in', false);
            return class_data_str;
        },
        _addTurboClasses: function(class_data_str, opt_turbo_classes){
            //return class name only if power classes info is invalid or empty
            switch(true)
            {
                case (!isString(opt_turbo_classes) || opt_turbo_classes == ''):
                    return class_data_str;
                    break;
            }

            //Define variables
            var opt_pc_arr = [],
                pc_key_str,
                pc_value_str,
                pc_temp_arr = [],
                pc_temp_str = '',
                pc_final_str = '',
                pc_func_arr = {'is_mobile': 'isMobile', 'is_non_mobile': 'isNonMobile', 'is_retina': 'isRetina', 'is_phone': 'isPhone', 'is_tablet': 'isTablet', 'is_tv': 'isTV', 'is_pc': 'isPC', 'is_portrait': 'isPortrait', 'is_landscape': 'isLandscape'},
                pc_func_name_str,
                pc_func_res
                ;

            opt_pc_arr = explode(',', opt_turbo_classes);
            for(var i = 0; i < count(opt_pc_arr); i++)
            {
                pc_key_str = getValueAfterExplode(opt_pc_arr[i], "=", 0);
                pc_value_str = getValueAfterExplode(opt_pc_arr[i], "=", 1);

                pc_func_name_str = pc_func_arr[pc_key_str];
                switch(true)
                {
                    case (isString(pc_func_name_str) && pc_func_name_str != ''):
                        pc_func_res = methods[pc_func_name_str];
                        switch(true)
                        {
                            case (pc_func_res()):
                                pc_temp_arr.push(pc_value_str);
                                break;
                        }
                        break;
                }
            }

            pc_temp_str = implode(' ', pc_temp_arr);
            pc_final_str = (pc_temp_str != '') ? pc_temp_str+' '+class_data_str : class_data_str;
            return pc_final_str;
        },
        setElementDOM: function(elem, elem_set_str, options){
            var data_key_str = md5(getSelector(elem)),
                ds_elem_set_class_name_str = "rstv_bpm_class_"+data_key_str,
                ds_elem_set_str;

            ds_elem_set_str = (isString(Restive.store(ds_elem_set_class_name_str)) && Restive.store(ds_elem_set_class_name_str) != '') ? Restive.store(ds_elem_set_class_name_str): '';
            switch(true)
            {
                case (ds_elem_set_str != ''):
                    elem.removeClass(ds_elem_set_str).addClass(elem_set_str);
                    switch(true)
                    {
                        case (ds_elem_set_str != elem_set_str):
                            methods._callbackManager(options, ['removeclass', ''+ds_elem_set_str+'']);
                            break;
                    }
                    break;

                default:
                    elem.addClass(elem_set_str);
            }
            Restive.store(ds_elem_set_class_name_str, elem_set_str);
            methods._callbackManager(options, ['addclass', ''+elem_set_str+'']);
        },
        unsetElementDOM: function(elem, options){
            var data_key_str = md5(getSelector(elem)),
                ds_elem_set_class_name_str = "rstv_bpm_class_"+data_key_str,
                ds_elem_set_str;

            ds_elem_set_str = (isString(Restive.store(ds_elem_set_class_name_str)) && Restive.store(ds_elem_set_class_name_str) != '') ? Restive.store(ds_elem_set_class_name_str): '';
            elem.removeClass(ds_elem_set_str);

            methods._callbackManager(options, ['removeclass', ''+ds_elem_set_str+'']);
        },
        _extVarTracker: function($track_name_str, $track_value_str)
        {
            var myArgs = Array.prototype.slice.call(arguments);
            var store_type_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2] : 'ck';
            var unique_bool = (isBool(myArgs[3])) ? myArgs[3]: false;
            var expires = (isNumber(myArgs[4]) || isString(myArgs[4])) ? parseInt(myArgs[4]): '';
            var reverse_order_bool = (isBool(myArgs[5])) ? myArgs[5]: true;
            var delim_str = (isString(myArgs[6]) && myArgs[6] != "") ? myArgs[6]: '-!';
            var data_count_int = (isNumber(myArgs[7]) || isString(myArgs[7])) ? parseInt(myArgs[7]): 80;

            return Restive.storeVarTracker($track_name_str, $track_value_str, store_type_str, unique_bool, expires, reverse_order_bool, delim_str, data_count_int);
        },
        _multiConstructorSelectPos: function(){
            var bpm_val_str = Restive.store("rstv_cache_bpm"),
                bpm_val_arr = explode("-!", bpm_val_str),
                bpm_val_temp_str,
                bpm_idx_int = parseInt(Restive.store("rstv_multi_bpm_idx"))
                ;

            bpm_val_temp_str = implode("", bpm_val_arr);

            /**
             * 1. If only one hit is recorded, get it's position
             * 2. If all misses, get the last position i.e. length of string
             * 3. If more than one hit, get the value for the best match previously calculated
             */
            var sel_constructor_pos,
                sel_constructor_pos_1,
                pattern_1 = new RegExp("^[^h]*h[^h]*$", "gi"),
                pattern_2 = new RegExp("^m+$", "gi");

            switch(true)
            {
                case (pattern_1.test(bpm_val_temp_str)):
                    //1
                    sel_constructor_pos = strrpos(bpm_val_temp_str, 'h');
                    break;

                case (pattern_2.test(bpm_val_temp_str)):
                    //2
                    Restive.store("rstv_cache_bpm_all_miss", true, '', {expires: 2000});
                    sel_constructor_pos = strrpos(bpm_val_temp_str, 'm');
                    break;

                case(substr_count(bpm_val_temp_str, "h") > 1):
                    //3
                    sel_constructor_pos = bpm_idx_int - 1;
                    break;
            }
            sel_constructor_pos_1 = sel_constructor_pos + 1;
            Restive.store("rstv_multi_bpm_idx", sel_constructor_pos_1);

            return sel_constructor_pos;
        },
        _multiConstructorManageEvents: function(sel_constructor_pos){
            //Remove any events previously attached
            $(window).off('resize');

            //Manage Viewport Monitoring and Callbacks
            var $sel_pos_final_int = parseInt(sel_constructor_pos) + 1,
                $breakpoints_arr = window.parent.rstv_store.main["rstv_breakpoints_"+$sel_pos_final_int],
                $this = window.parent.rstv_store.main["rstv_this_"+$sel_pos_final_int],
                $options = window.parent.rstv_store.main["rstv_options_"+$sel_pos_final_int],
                $rstv_core_info_arr = window.parent.rstv_store.main["rstv_core_info_"+$sel_pos_final_int]
                ;

            switch(true)
            {
                case (Restive.store("rstv_resp_basis_viewport_init")):
                    methods._viewportMonitor($breakpoints_arr, $this, $options, $rstv_core_info_arr);
                    methods._callbackManager($options, ['ready', 'init']);
                    break;
            }
        },
        _multiConstructorFinalize: function(){

            var sel_constructor_pos = methods._multiConstructorSelectPos();

            //Redo event handlers
            methods._multiConstructorManageEvents(sel_constructor_pos);

            /**
             * Set Breakpoint Match Cache Lock
             * This marks that a Breakpoint Match has been determined (i.e. hit or miss) and as such this result should be stored and reused
             * NOTE: Only used in Multi-Constructor Operations
             */
            Restive.store("rstv_cache_bpm_lock", true);

            //Reset some local storage variables
            Restive.store("rstv_cache_req", null);
            Restive.store("rstv_multi_count", null);
        },
        _multiConstructorStart: function(){
            Restive.store("rstv_multi_count", 0);                 //counts the number of multi-constructor operations
            Restive.store("rstv_multi_start", true);
            Restive.store("rstv_multi_abort_1", false);
            Restive.store("rstv_multi_abort_2", false);

            //set some expiring counters
            Restive.store("rstv_bpm_h_counter", 1, '', {expires: 1000});
            Restive.store("rstv_bpm_m_counter", 1, '', {expires: 1000});

            //set some persistent counters
            switch(true)
            {
                case (!Restive.isStorageValueSet("rstv_multi_start_count")):
                    Restive.store("rstv_multi_start_count", 1);
                    Restive.store("rstv_multi_end", false);
                    break;

                default:
                    Restive.incrementStorageValue("rstv_multi_start_count");
            }
        },
        _multiConstructorManager: function(){
            var is_multi_start_bool = Restive.store("rstv_multi_start"),
                is_multi_end_bool = Restive.store("rstv_multi_end"),
                rstv_count_int = parseInt(Restive.store("rstv_multi_count")),
                rstv_multi_start_count_int = parseInt(Restive.store("rstv_multi_start_count"))
            ;

            /**
             * Check if Restive.JS Constructor has been called multiple times
             */
            switch(true)
            {
                case (rstv_count_int > 1):
                    //Signal abort if startMulti() method call not used
                    switch(true)
                    {
                        case (is_multi_start_bool === false):
                            Restive.store("rstv_multi_abort_1", true);
                            break;
                    }
                    break;
            }

            /**
             * Check if Restive.JS Constructor has been called multiple times and has not been finalized properly with endMulti() method
             */
            switch(true)
            {
                case (rstv_multi_start_count_int > 1 && is_multi_end_bool === false):
                    Restive.store("rstv_multi_abort_2", true);
                    break;
            }
            methods._URLMonitor();
        },
        _multiConstructorCounter: function(){
            Restive.incrementStorageValue("rstv_multi_count");
        },
        _multiConstructorEnd: function(){
            //reset stored variables
            Restive.store("rstv_multi_start_count", 0);
            Restive.store("rstv_multi_end", true);

            //finalize multi constructor operations
            methods._multiConstructorFinalize();
        },
        getUserAgent: function (){
            return Restive.getUserAgent();
        },
        getPlatform: function (){
            return Restive.getPlatform();
        },
        getFormFactor: function(){
            return Restive.getFormFactor();
        },
        getOrientation: function(){
            return Restive.getOrientation();
        },
        getResolution: function(){
            return Restive.getResolution();
        },
        getPixelRatio: function(pxl_ratio){
            return Restive.getPixelRatio(pxl_ratio);
        },
        getViewportW: function(){
            return Restive.viewportW();
        },
        getViewportH: function(){
            return Restive.viewportH();
        },
        getScreenW: function(){
            return Restive.screenW();
        },
        getScreenH: function(){
            return Restive.screenH();
        },
        getPixelW: function(){
            return Restive.pixelW();
        },
        getPixelH: function(){
            return Restive.pixelH();
        },
        isRetina: function(){
            return Restive.isRetina();
        },
        isMobile: function(){
            return Restive.isMobile();
        },
        isNonMobile: function(){
            return Restive.isNonMobile();
        },
        isPhone: function(){
            return Restive.isPhone();
        },
        isTablet: function(){
            return Restive.isTablet();
        },
        isTV: function(){
            return Restive.isTV();
        },
        isPC: function(){
            return Restive.isPC();
        },
        isIOS: function(){
            return Restive.isIOS();
        },
        isApple: function(){
            return Restive.isApple();
        },
        isAndroid: function(){
            return Restive.isAndroid();
        },
        isSymbian: function(){
            return Restive.isSymbian();
        },
        isBlackberry: function(){
            return Restive.isBlackberry();
        },
        isWindows: function(){
            return Restive.isWindows();
        },
        isWindowsPhone: function(){
            return Restive.isWindowsPhone();
        },
        isPortrait: function(){
            return Restive.isPortrait();
        },
        isLandscape: function(){
            return Restive.isLandscape();
        }
	};

    /**
     * Plugin Initialize
     */
    $.fn.restive = function(args){

		if ( methods[args] )
		{
			//execute JQuery Plugin Method
		   	return methods[ args ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof args === 'object' || ! args )
		{
			//Process JQuery Plugin Options
			var opts = $.extend({}, $.fn.restive.defaults, args);
			var new_args = new Array(opts);
			return methods.init.apply( this, new_args );
		}
		else
		{
		   	$.error( 'Method ' +  args + ' does not exist on Restive.JS' );
		}
	};

	/**
	 * Plugin Defaults
	 */
	$.fn.restive.defaults = {
        breakpoints: [],                                //the breakpoints
		classes: [],                                    //the corresponding classes
        anchor: 'window',                               //the basis for responsiveness
        anchor_e_df: 'w',                               //the dimension format for element-value anchor operations
        platform: 'all',						        //all, ios, android, symbian, blackberry, windows
        formfactor: 'all',                              //all, pc, tv, tablet, phone
        turbo_classes: '',                              //special class-based functionality
        turbo_classes_reflow: false,                    //this will apply specific turbo_classes based on limit settings
        turbo_classes_reflow_limits: '480,960',         //defines thresholds for turbo_classes_reflow option
        force_dip: false,                               //force breakpoints to use device-independent pixels
        onReady: 		    function(){},
		onResize: 		    function(){},
		onRotate:		    function(){},
		onRotateToP:	    function(){},
		onRotateToL:	    function(){},
        onPortrait:         function(){},
        onLandscape:        function(){},
        onRetina:           function(){},
        onPhone:            function(){},
        onTablet:           function(){},
        onPC:               function(){},
        onTV:               function(){},
        onIOS:              function(){},
        onAndroid:          function(){},
        onSymbian:          function(){},
        onBlackberry:       function(){},
        onWindows:          function(){},
        onWindowsPhone:     function(){},
        onMobile:           function(){},
        onNonMobile:        function(){},
        onTurboClassReflow:         function(){},
        onTurboClassReflowIn:       function(){},
        onTurboClassReflowOut:      function(){},
        onAddClass:         function(){},
        onRemoveClass:      function(){}
	};

    /**
     * Plugin Methods
     */
    var D = $.restive = function(){};
    $.extend(D, {
        getUserAgent: function(){
            return methods.getUserAgent();
        },
        getPlatform: function(){
            return methods.getPlatform();
        },
        getFormFactor: function(){
            return methods.getFormFactor();
        },
        getOrientation: function(){
            return methods.getOrientation();
        },
        getResolution: function(){
            return methods.getResolution();
        },
        getPixelRatio: function(pxl_ratio){
            return methods.getPixelRatio(pxl_ratio);
        },
        getViewportW: function(){
            return methods.getViewportW();
        },
        getViewportH: function(){
            return methods.getViewportH();
        },
        getScreenW: function(){
            return methods.getScreenW();
        },
        getScreenH: function(){
            return methods.getScreenH();
        },
        getPixelW: function(){
            return methods.getPixelW();
        },
        getPixelH: function(){
            return methods.getPixelH();
        },
        isRetina: function(){
            return methods.isRetina();
        },
        isMobile: function(){
            return methods.isMobile();
        },
        isNonMobile: function(){
            return methods.isNonMobile();
        },
        isPhone: function(){
            return methods.isPhone();
        },
        isTablet: function(){
            return methods.isTablet();
        },
        isTV: function(){
            return methods.isTV();
        },
        isPC: function(){
            return methods.isPC();
        },
        isIOS: function(){
            return methods.isIOS();
        },
        isApple: function(){
            return methods.isIOS();
        },
        isAndroid: function(){
            return methods.isAndroid();
        },
        isSymbian: function(){
            return methods.isSymbian();
        },
        isBlackberry: function(){
            return methods.isBlackberry();
        },
        isWindows: function(){
            return methods.isWindows();
        },
        isWindowsPhone: function(){
            return methods.isWindowsPhone();
        },
        isPortrait: function(){
            return methods.isPortrait();
        },
        isLandscape: function(){
            return methods.isLandscape();
        },
        startMulti: function(){
            methods._multiConstructorStart();
        },
        endMulti: function(){
            methods._multiConstructorEnd();
        }
    });

}(window, document, jQuery));
;// Baseline setup
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

  accordion  : '.uw-accordion',
  dropdowns  : '#dawgdrops',
  mobilemenu : '.uw-mobile-menu-toggle',
  radio      : ':radio',
  search     : '.uw-search',
  select     : '.uw-select',
  quicklinks : '.uw-quicklinks',
  slideshow  : '.uw-slideshow',
  social     : '.uw-social',
  vimeo      : '.uw-vimeo',
  youtube    : '.uw-youtube'

}

UW.baseUrl = Backbone.history.location.origin +
             Backbone.history.location.pathname

UW.sources = {
  quicklinks : UW.baseUrl + 'wp-admin/admin-ajax.php?action=quicklinks',
  search     : UW.baseUrl + 'wp-admin/admin-ajax.php'
}

// List the responsive and adaptive breakpoints for targeted browsers and devices
UW.restive = {
  breakpoints   : [ '768', '992', '10000' ],
  classes       : [ 'uw-small', 'uw-medium', 'uw-large' ],
  turbo_classes : 'is_portrait=portrait,is_landscape=landscape'
}

// Initialize all components when the DOM is ready
UW.initialize = function( $ )
{
  // Cache common elements that each javascript module calls
  UW.$body       = $('body');

  // UW Utilities
  UW.dropdowns  = _.map( $( UW.elements.dropdowns ),     function( element ) { return new UW.Dropdowns({ el : element }) } )
  UW.mobilemenu = _.map( $( UW.elements.mobilemenu ),     function( element ) { return new UW.MobileMenu({ el : element }) } )
  UW.quicklinks = _.map( $( UW.elements.quicklinks ),    function( element ) { return new UW.QuickLinks( { el : element, url : UW.sources.quicklinks }) } )
  UW.search     = _.map( $( UW.elements.search ),    function( element ) { return new UW.Search( { el : element, model : new UW.Search.DirectoryModel( {url: UW.sources.search}) }) } )

  // UW Modules
  UW.slideshows = _.map( $( UW.elements.slideshow ), function( element ) { return new UW.Slideshow( { el : element }) } )
  UW.social     = _.map( $( UW.elements.social ),    function( element ) { return new UW.Social({ el : element }) } )
  UW.vimeo      = _.map( $( UW.elements.vimeo ),     function( element ) { return new UW.Vimeo({ el : element }) } )
  UW.youtube    = _.map( $( UW.elements.youtube ),   function( element ) { return new UW.YouTube.Collection({ el: element})})


  // UW Components - These need to render after all other javascript elements are rendered on page
  UW.accordion  = _.map( $( UW.elements.accordion ), function( element ) { return new UW.Accordion( { el : element }) } )
  UW.radio      = _.map( $( UW.elements.radio ),     function( element ) { return new UW.Radio({ el : element }) } )
  UW.select     = _.map( $( UW.elements.select ),    function( element ) { return new UW.Select({ el : element }) } )

  UW.$body.restive( UW.restive )
}

jQuery(document).ready( UW.initialize )


// Basic UW Components
// --------------
;// ### UW Search

// This function creates a UW Search
// For usage please refer to the [UW Web Components Search](http://uw.edu/brand/web/#search)

UW.Search = Backbone.View.extend({

  // This property caches the current value in the search field so the same search doesn't execute multiple times.
  value : '',

  // These are the three search options: the UW, the current site and the directory
  searchFeatures : {
    uw        : 'uw',
    site      : 'site',
    directory : 'directory'
  },

  // This is the HTML for the search bar that is preprended to the body tag.
  searchbar : '<div id="uwsearcharea" class="uw-search-bar-container">'+
               '<div class="container">'+
                  '<div class="center-block uw-search-wrapper">'+
                    '<form class="uw-search" action="<%= Backbone.history.location.pathname %>">'+
                      '<input id="uw-search-bar" type="search" name="s" value="" autocomplete="off" />'+
                    '</form>'+

                    '<select id="mobile-search-select" class="visible-xs">' +
                      '<option value="uw">All the UW</option>' +
                      '<option value="site">Current Site</option>' +
                      '<option value="directory" selected>People Directory</option>' +
                    '</select>' +

                    '<a href="#" value="" class="search" />'+

                    '<div class="labels hidden-xs">'+
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

  // The HTML template for a single search result. Only the information that is available will be shown.
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

  // Default values. The `limit` refers to the minimum number characters needed before an ajax search is performed.
  defaults :
  {
    limit : 2
  },

  // List of events
  // A keydown on the input field will trigger an ajax search if more than two characters are present.
  // Clicking on a result's more icon or name unveil more information
  // Toggling the radio buttons changes the function of the search bar from searhing the UW, searching the current site and searching the directory.
  events :
  {
    'keyup input'               : 'searchDirectory',
    'click .result .more'       : 'showPersonInformation',
    'click .result .commonname' : 'showPersonInformation',
    'click input:radio'         : 'toggleSearchFeature',
    'change select'             : 'toggleSearchFeature',
    'submit form'               : 'submitSearch'
  },

  // Initialize the view and bind events to to the DirectoryModel `results` attribute.
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

  // Render the search bar above the `body` element and set the view element to the search bar HTML
  // since most events take place within that view.
  render : function()
  {
    UW.$body.prepend( this.$searchbar )

    this.$toggle = this.$el;
    this.$toggle.bind( 'click', this.toggleSearchBar )

    this.setElement( this.$searchbar )
  },

  // This shows and hides the search
  toggleSearchBar: function()
  {
    this.empty()
    this.$searchbar.toggleClass('open')
      .find('#uw-search-bar').focus()
    return false;
  },

  // Set a property to the current radio button indicating which function the search bar is providing.
  toggleSearchFeature : function( e )
  {
    console.log( e.currentTarget.value )
    this.empty()
    this.searchFeature = e.currentTarget.value
    // this.mirrorSelectAndRadioElements()
  },

  mirrorSelectAndRadioElements : function()
  {
  },

  // If the search bar is not searching the directiory behave like a normal search function and don't cancel
  // the submit event.
  submitSearch : function()
  {
    return this.searchFeature !== this.searchFeatures.directory
  },


  // Check if a new search is in the searchbar, enough characters are in the searchbar and that there it
  // a term to search for. If all three of these checks pass, cache the search term and perform the search.
  // Note: this functino is debounced by 200ms to limit the number of searches triggered within that time period to one.
  searchDirectory : _.debounce( function( e ) {

    if ( this.value === e.target.value ) return
    if ( e.target.value.length < this.settings.limit ) return this.empty()
    if ( ! e.target.value.length ) return this.empty()

    this.value = e.target.value

    this.model.search( this.value )

  }, 200 ),

  // Empty the search results.
  empty : function()
  {
    this.$results.empty()
  },

  // Parse the search results. The LDAP response from the server is first parsed by custom PHP and then
  // the new JSON feed is rendered here in the view.
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

  // Reveal or hide the directory more information.
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

  initialize : function (options) {
    this.url = options.url;
  },

  search : function ( value ) {
    this.settings.search = value
    this.fetch( { data : this.settings })
  },

  parse : function( response ) {
    if ( response )
        this.set( 'results', response )
  }

})
;// This section builds and populates the quicklinks section (off-canvas right)

UW.QuickLink = Backbone.Model.extend({
    defaults: {
        has_icon: false,
        classes: ''
    },
    
    initialize: function () {
        //hacktacular.  Need to stop the collection making a model with url = collection.url somehow
        if (this.get('link_url') !== undefined){
            this.create_view();
        }
    },

    create_view: function () {
        this.view = new UW.QuickLinkView({model: this});
    }
});

UW.QuickLinkView = Backbone.View.extend({
    menu_template : '<li><% if (classes) { %><span class="<%= classes %>"></span><% } %><a href="<%= link_url %>" tabindex="-1"><%= title %></a></li>',

    initialize: function () {
        this.create_menu_item();
    },

    create_menu_item : function ()
    {
        item = this.model.toJSON();
        this.$menu_item = $(_.template( this.menu_template, item ));
    }
});


UW.QuickLinks = Backbone.Collection.extend({

    model: UW.QuickLink,

    initialize: function (args) {
        this.el = args.el;
        this.url = args.url;
        _.bindAll(this, 'parse', 'make_view');
        this.create_models();
        this.make_view();
        //refusal to execute the ajax request isn't handled here.  Looks like it should be, but it isn't
        this.fetch({success: this.view.build});
    },

    //pull this out of the collection?
    default_links: [
        {title: 'Maps', url: 'http://uw.edu/maps', classes: ['icon-maps']},
        {title: 'Directories', url: 'http://uw.edu/directory', classes: ['icon-directories']},
        {title: 'Calendar', url: 'http://uw.edu/calendar', classes: ['icon-calendar']},
        {title: 'Libraries', url: 'http://uw.edu/libraries', classes: ['icon-libraries']},
        {title: 'MyUW', url: 'http://myuw.washington.edu', classes: ['icon-myuw']},
        {title: 'UW Today', url: 'http://uw.edu/news', classes: ['icon-uwtoday']},
       ],

    create_models: function () {
        for (var i = 0; i < this.default_links.length; i++){
            this.add(this.normalize_data(this.default_links[i]));
        }
    },
    
    normalize_data: function (holder) {
        holder.link_url = holder.url;
        delete holder.url;
        if (holder.classes !== 'undefined'){
            holder.classes = holder.classes.join(' ');
            if (holder.classes !== '') {
                holder.has_icon = true;
            }   
        }
        return holder;
    },

    parse: function (response) {
        if (Object.keys(response).length !== 0){
            this.view.reset();
            var model_data = [];
            for (var key in response) {
                model_data.push(this.normalize_data(response[key]));
            }
            return model_data;
        }
    },

    make_view: function () {
        this.view = new UW.QuickLinksView({el: this.el, collection: this});
    }
});


UW.QuickLinksView = Backbone.View.extend({

    container: 'div#uw-container',
    $little_list_header: $('<h3>Helpful Links</h3>'),
    $drawer: $("<nav id='quicklinks' role='navigation' aria-label='quick links'></nav>"),
    $big_list: $('<ul id="big_links"></ul>'),
    $little_list: $('<ul id="little_list"></ul>'),


    events: {
       'mouseover': 'animate',
       'touchstart': 'animate',
       'keyup': 'keyup'
    },

    initialize: function () {
        _.bindAll( this, 'append_menu_item', 'build', 'close_quicklinks', 'focused', 'blurred', 'button_blur', 'keyup' );
        this.is_focused = false;
        this.make_drawer();
        this.build();
        this.$button = this.$el.find('button');
        this.$button.blur(this.button_blur);
    },

    build: function () {
        this.add_links();
        this.add_lists();
    },

    make_drawer: function () {
        this.$container = $(this.container);
        if (this.$container.length === 0) {
            var $adminbar = $('#wpadminbar');
            UW.$body.children().not('#wpadminbar').not('script').wrapAll('<div id="uw-container"><div id="uw-container-inner"></div></div>');
            this.$container = $(this.container);
        }
    },

    close_quicklinks: function (event) {
        if (event.type == 'keyup'){
            if (event.keyCode == 27) {
                this.$button.focus();
                this.blurred();
                this.animate(event);
            }
        }
        else if (this.$container.hasClass('open') && (event.target.parentElement != this.el) && (!this.is_focused)) {
            this.animate(event);
        }
    },

    add_links: function () {
        _.each( this.collection.models, this.append_menu_item )
    },

    append_menu_item: function (model) {
        if (model.get('has_icon')) {
            this.$big_list.append(model.view.$menu_item);
        }
        else {
            this.$little_list.append(model.view.$menu_item);
        }
    },

    add_lists : function () {
        if (this.$big_list.find('li').length > 0) {
            this.$drawer.append(this.$big_list);
        }
        if (this.$little_list.find('li').length > 0) {
            this.$drawer.append(this.$little_list_header);
            this.$drawer.append(this.$little_list);
        }
        this.$links = this.$drawer.find('li a');
        this.add_events();
        this.$container.prepend(this.$drawer);
    },

    add_events: function () {
        $('#uw-container-inner').on( {
            'mouseover': this.close_quicklinks,
            'touchstart': this.close_quicklinks
        });
        this.$links.on( {'keyup': this.close_quicklinks});
        var self = this;
        this.$links.last().blur(function () {
            self.$button.focus();
        });
    },

    reset: function () {
        this.clear_lists();
        this.clear_drawer();
    },

    clear_lists: function () {
        this.$little_list.html('');
        this.$big_list.html('');
    },

    clear_drawer: function () {
        this.$drawer.html('');
    },

    animate: function (event) {
        if(!this.is_focused){
            event.preventDefault();
            this.$container.toggleClass('open');
            this.$drawer.toggleClass('open');
        }
    },

    keyup: function (event) {
        if (event.keyCode == 13) {
            if (this.is_focused) {
                this.blurred();
            }
            else {
                _.delay(this.focused, 300);
            }
            this.animate(event);
        }
    },

    focused: function () {
        this.is_focused = true;
        this.$links.attr('tabindex', 0);
        this.$links.first().focus();
    },

    blurred: function (event) {
        this.is_focused = false;
        this.$links.attr('tabindex', -1);
    },

    button_blur: function (event) {
        if(this.is_focused){
            this.$links.first().focus();
        }
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
    '<a href="#" class="<%= classname %> next"></a>' +
    '<a href="#" class="<%= classname %> previous"></a>'
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
;UW.YouTube = {};

UW.YouTube.Collection = Backbone.Collection.extend({

    initialize: function (options) {
        _(this).bindAll('parse');
        this.el = options.el;
        this.$el = $(this.el);
        this.youtube_id = this.$el.data('uw-youtube');
        this.setup_for_type();
        this.make_view();
        //this.extend(window.onYouTubeIframeAPIReady);  // not so easy as just that, but that's the idea
        this.fetch({success: this.view.onDataReady});
    },

    setup_for_type : function (youtube_id) {
        this.type = this.$el.data('uw-youtube-type');
        if (this.type == 'playlist'){
            this.max_results = 20;
            var max_results_temp = parseInt(this.$el.data('max-results'), 10);
            if (max_results_temp > 0) {
                this.max_results = max_results_temp;
            }
            this.model = UW.YouTube.PlaylistItem;
            this.url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + this.youtube_id + '&key=AIzaSyApmhFr5oa8bmKPcpN7bm-h0mekjkUVypU&maxResults=' + this.max_results;
        }
        else if (this.type == 'single') {
            this.model = UW.YouTube.Video;
            this.url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + this.youtube_id + '&key=AIzaSyApmhFr5oa8bmKPcpN7bm-h0mekjkUVypU';
        }
    },

    parse: function (response) {
        var type = this.type, youtube_id = this.youtube_id;
        return _(response.items).map(function (item) {
            if (type == 'single'){
                item.snippet.resourceId = {videoId: youtube_id};
            }
            return item.snippet;
        });
    },
    
    make_view: function (type) {
        this.view = new UW.YouTube.CollectionView({collection: this});
    },

});

UW.YouTube.CollectionView = Backbone.View.extend({
    
    template : "<div class='nc-video-player'><div class='tube-wrapper'></div></div>",
    playlist_section : "<div class='vidSmall'><div class='scrollbar'><div class='track'><div class='thumb'><div class='end'></div></div></div></div><div class='viewport'><div class='vidContent overview'><ul></ul></div></div></div>",

    events: {
        'click a': 'preview_clicked'
    },

    initialize: function () {
        _(this).bindAll('onReady', 'onDataReady', 'onStateChange', 'preview_clicked');
        this.player_ready = false;
        this.data_ready = false;
        this.wrap();
        this.add_iFrame_api();
        if (this.collection.type == 'playlist'){
            this.add_playlist_section();
        }
    },

    wrap: function () {
        this.collection.$el.wrap($(this.template));
        this.$el = this.collection.$el.parents('.nc-video-player');  //unattached jquery object won't wrap right if we add possible playlist section first
        this.el = this.$el[0];
    },

    add_iFrame_api: function () {
        if (UW.$body.find('script#iFrame').length === 0){
            UW.$body.append('<script id="iFrame" src="//www.youtube.com/player_api" type="text/javascript"></script>');
            this.add_iFrame_function();
        }
    },

    add_iFrame_function: function () {
        window.onYouTubeIframeAPIReady = function() {
            for (var i = 0, length = UW.youtube.length; i < length; i++){
                var collection = UW.youtube[i];
                //attach the YT.player to the relevant view, each view gets one
                collection.view.uwplayer = new YT.Player(collection.$el.attr('id'), {
                    videoId: '',
                    events: {
                        //these events will call functions in the relevant view
                        'onReady': collection.view.onReady,
                        'onStateChange': collection.view.onStateChange
                    }
                });
            }
        };
    },

    add_playlist_section : function () {
        this.$el.append(this.playlist_section);
        this.$vidSmall = this.$el.find('.vidSmall');
        this.$vidContent = this.$el.find('.vidContent');
    },

    onReady: function () {
        this.player_ready = true;
        this.check_all_ready();
    },

    onDataReady: function () {
        this.data_ready = true;
        if (this.collection.type == 'playlist'){
            this.$vidSmall.find('.scrollbar').show();
            this.$vidContent.width(this.collection.models.length * 135 + 'px');
            this.$vidSmall.tinyscrollbar({axis: 'x'});
        }
        this.check_all_ready();
    },

    //this function checks the state of data/player to prevent a race case. Both the data and the player must be ready to go.  Then we play the correct video
    check_all_ready: function() {
        if (this.data_ready && this.player_ready){
            this.play(this.collection.models[0].get('resourceId').videoId);
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
        if (this.collection.type == 'playlist') {
            var $small = $('#' + id);
            var leftpos = $small.position().left, $viewport = this.$vidSmall.find('.viewport');
            this.$el.find('a.vid-active').removeClass('vid-active');
            if (this.$vidContent.width() - leftpos < $viewport.width()){
                leftpos = this.$vidContent.width() - $viewport.width();
            }
            this.$vidContent.animate({left: -leftpos}, 500);
            this.$vidSmall.data('plugin_tinyscrollbar').update(leftpos);
            $small.addClass('vid-active');
        }
    },

    preview_clicked: function (event) {
        this.play(event.currentTarget.id, true);
    }
});

UW.YouTube.Video = Backbone.Model.extend({
    initialize: function () {
        if (this.get('resourceId')){
            this.view = new UW.YouTube.VideoView({model: this});
        }
    }
});

UW.YouTube.VideoView = Backbone.View.extend({
    //template: underscore + html string here,
    
    initialize: function () {
        this.render();
    },

    render: function () {
        var item = this.model.toJSON();
        //var small_vid = _.template(this.template, item);
        //this.model.collection.view.$vidSmall.append(small_vid);
    }
});

UW.YouTube.PlaylistItem = Backbone.Model.extend({
    initialize: function () {
        if (this.get('resourceId')){
            this.view = new UW.YouTube.PlaylistItemView({model:this});
        }
    },
});

UW.YouTube.PlaylistItemView = Backbone.View.extend({
    template: "<li><a id='<%= resourceId.videoId %>' class='video'><img src='<%= thumbnails.default.url %>'/><div class='text'><p class='title'><%= title %></p></div></a></li>",

    initialize: function () {
        this.$el = this.model.collection.view.$vidContent.find('ul');
        this.render();
    },


    render: function () {
        var item = this.model.toJSON();
        var small_vid = _.template(this.template, item);
        this.$el.append(small_vid);
    },
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
    'click input' : 'toggle'
  },

  template: '<span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span>',

  initialize : function( options )
  {
    _.bindAll( this, 'toggle', 'getGroup', 'toggleCheckBox' )

    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )

    this.$el.before( this.template )

    this.$input = this.$el

    this.name   = this.$el.attr( 'name' )

    this.setElement( this.$el.closest('label') )

    this.setState()
  },

  setState: function()
  {
    if ( this.$input.prop( this.states.disabled ) ) this.$el.addClass( this.states.disabled )
    if ( this.$input.prop( this.states.checked ) ) this.$el.addClass( this.states.checked )
  },

  getGroup : function()
  {
    return _.where( UW.radio, { name : this.name })
  },

  toggle : function(e )
  {
      _.each( this.getGroup() , this.toggleCheckBox )
  },

  toggleCheckBox : function( view )
  {
    var checked  = view.$input.prop( this.states.checked )
      , disabled = view.$input.prop( this.states.disabled )

    if ( ! disabled &&
          view.$el.removeClass( this.states.checked ) )
        view.$el.removeAttr( this.states.checked ).trigger( 'change' )

    if ( ! disabled )
    {

      if ( checked && view.$el.addClass( this.states.checked ) )
        view.$el.trigger( $.Event('toggle') )

      if ( checked !== view.$el.prop( this.states.checked ) )
        view.$el.trigger( 'change' )

    }

  }

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
    'keydown .dawgdrops-item > a' : 'toggleSubMenu',
    'mouseenter .dawgdrops-item' : 'positionSubmenu'
  },


  initialize : function(options)
  {
    _.bindAll( this, 'toggleSubMenu' )
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$topLevelNav = this.$el.find( this.elements.toplevel )
  },

  render : function()
  {
    // _.map( this.$topLevelNav, this.positionSubmenu )
  },

  positionSubmenu : function( el )
  {
    var $el = $(el.currentTarget)
      , position = $el.position()
    $el.find('ul').css( { top : position.top + 58, left: position.left } )
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
;// ### UW Dropdowns

// This function creates the UW mobile menu toggle

UW.MobileMenu = Backbone.View.extend({

  events: {
    'click' : 'toggle'
  },

  initialize : function( options )
  {
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$mobilemenu = $('.uw-mobile-menu > li')
  },

  toggle: function()
  {
    this.$mobilemenu.toggle()
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
;// ### UW HTML5 Player

// This function creates a UW HTML5 player
// For usage please refer to the [UW Web Components Player](http://uw.edu/brand/web/#player)

UW.Player = Backbone.View.extend({

  defaults : {

  },

  initialize: function( options )
  {

    // _.bindAll( this )

    // this.settings = _.extend( {}, this.defaults , this.$el.data() , options )

    // console.log(videojs);


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
