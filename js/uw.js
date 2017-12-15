//     UW.js 0.1
//     uw.edu/marketing/web/
//     A UW JavaScript library that implements various web components to any site
//     Includes hard dependencies jQuery (v2.1.1), Backbone (1.1.2), and Underscore (1.6.0)

;(function () {
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
  togglemobile  : '#mobile-sidebar',

}

UW.baseUrl = Backbone.history.location.origin +
             Backbone.history.location.pathname

UW.sources = {
  quicklinks : UW.baseUrl + 'wp-admin/admin-ajax.php?action=quicklinks',
  search     : UW.baseUrl + 'wp-admin/admin-ajax.php'
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

  UW.togglemobile = _.map( $( UW.elements.togglemobile ),     function( element ) { return new UW.ToggleSidebarMenu({ el : element }) } )

  // UW Modules
  UW.slideshows = _.map( $( UW.elements.slideshow ), function( element ) { return new UW.Slideshow( { el : element }) } )
  UW.social     = _.map( $( UW.elements.social ),    function( element ) { return new UW.Social({ el : element }) } )
  UW.vimeo      = _.map( $( UW.elements.vimeo ),     function( element ) { return new UW.Vimeo({ el : element }) } )
  UW.youtube    = _.map( $( UW.elements.youtube ),   function( element ) { return new UW.YouTube.Collection({ el: element})})


  // UW Components - These need to render after all other javascript elements are rendered on page
  UW.accordion  = _.map( $( UW.elements.accordion ), function( element ) { return new UW.Accordion( { el : element }) } )
  UW.radio      = _.map( $( UW.elements.radio ),     function( element ) { return new UW.Radio({ el : element }) } )
  UW.select     = _.map( $( UW.elements.select ),    function( element ) { return new UW.Select({ el : element }) } )

  // todo: add to separate file
  $('table').addClass('table table-striped').attr( "border", 1 )

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
                      '<input id="uw-search-bar" type="search" name="s" value="" autocomplete="off" tabindex="-1"/>'+
                    '</form>'+

                    '<select id="mobile-search-select" class="visible-xs">' +
                      '<option value="uw" selected>All the UW</option>' +
                      '<option value="site">Current Site</option>' +
                    '</select>' +

                    '<button class="search" tabindex="-1"/>'+

                    '<div class="labels hidden-xs">'+
                      '<label class="radio">'+
                        '<input type="radio" name="search" value="uw" data-toggle="radio" checked tabindex="-1">'+
                        'All the UW'+
                      '</label>'+

                      '<label class="radio">'+
                        '<input type="radio" name="search" value="site" data-toggle="radio" tabindex="-1">'+
                        'Current Site'+
                      '</label>'+

                      '<label class="radio">'+
                        '<input type="radio" name="search" value="directory" data-toggle="radio" tabindex="-1">'+
                        'People Directory'+
                      '</label>'+
                    '</div>'+

                '<div class="uw-results" style="display:none;">' +
                   '<p class="more-results">Need more results? Try the <a href="http://www.washington.edu/home/peopledir/" title="Full directory">full directory</a></p>' +
                '</div>' +

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
    'keydown'                   : 'keyDownDispatch',
    'click .result .more'       : 'showPersonInformation',
    'click .result .commonname' : 'showPersonInformation',
    'click label.radio'         : 'toggleSearchFeature',
    'click input:radio'         : 'stopProp',
    'change select'             : 'toggleSearchFeature',
    'keyup #uw-search-bar'      : 'searchDirectory',
    'click .search'             : 'submitForm',
    'submit form'               : 'submitSearch'
  },

  // Initialize the view and bind events to to the DirectoryModel `results` attribute.
  initialize :function ( options )
  {
    _.bindAll( this, 'toggleSearchBar', 'toggleBlur', 'keyDownDispatch', 'searchDirectory', 'parse' );

    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )

    this.$searchbar = $( _.template( this.searchbar )( this.settings ) )

    this.render()

    this.$results  = this.$( '.uw-results' )
    this.$more    = this.$( '.more-results' )

    this.searchFeature = this.$el.find(':radio:checked').val()

    this.model.on( 'change:results', this.parse, this )
  },

  // Render the search bar above the `body` element and set the view element to the search bar HTML
  // since most events take place within that view.
  render : function()
  {
    UW.$body.prepend( this.$searchbar )

    this.$toggle = this.$el.find('button');
    this.$toggle.bind( {
        'click': this.toggleSearchBar,
        'blur': this.toggleBlur
        } );

    this.setElement( this.$searchbar )
  },

  // This shows and hides the search
  toggleSearchBar: function()
  {
    this.hideDirectory()
    this.$searchbar.toggleClass('open')
    this.toggleBlur();
    return false;
  },

  toggleBlur: function()
  {
    if (this.$searchbar.hasClass('open')) {
        this.$searchbar.find('#uw-search-bar').focus();
    }
  },

  keyDownDispatch: function(event)
  {
    if (event.keyCode == 27){
        if (this.$searchbar.hasClass('open')){
            this.toggleSearchBar();
            this.$toggle.focus();
        }
    }
    else{
        var $target = $(event.target);
        if ($target.is(':radio')) {
            if (event.keyCode == 13){
                $target.parent('label').trigger('click');
            }
            else if (event.keyCode == 9) {
                event.preventDefault();
                this.$toggle.focus();
                $checked = this.$searchbar.find('input[value=' + this.searchFeature + ']');
                if (!$checked.parent('label').hasClass('checked')){
                    this.$searchbar.find('label').removeClass('checked');
                    $checked.parent('label').addClass('checked');
                }
            }
        }
        else if ($target.is('#uw-search-bar')){
            if (event.keyCode == 9) {
                event.preventDefault();
                if (this.$more.is(':visible')){
                    this.$more.find('a').focus();
                }
                else {
                    this.$searchbar.find('input[value=' + this.searchFeature + ']').focus();
                }
            }
        }
        else if ($target.is(this.$more.find('a')) && event.keyCode == 9){
            event.preventDefault();
            this.$searchbar.find('input[value=' + this.searchFeature + ']').focus();
        }
    }
  },

  stopProp: function(event)
  {
    event.stopPropagation();
  },

  // Set a property to the current radio button indicating which function the search bar is providing.
  toggleSearchFeature : function( e )
  {
    this.hideDirectory()
    var value = e.currentTarget.childNodes[1].value;
    this.searchFeature = value
    _.defer(function($searchbar) { $searchbar.find('#uw-search-bar').focus() }, this.$searchbar);
    if ( this.searchFeature === this.searchFeatures.directory )
      this.showDirectory()
    // this.mirrorSelectAndRadioElements()
  },

  // mirrorSelectAndRadioElements : function()
  // {
  // },

  // If the search bar is not searching the directiory behave like a normal search function and don't cancel
  // the submit event.
  submitSearch : function( e )
  {
    switch ( this.searchFeature )
    {
      case this.searchFeatures.uw :
        this.$searchbar.find('input').attr('name', 'q')
        this.$searchbar.find('form').attr('action', 'http://uw.edu/search/')
        return true;

      case this.searchFeatures.site :
        return true;

      default:
        return false;
    }
  },

  submitForm : function()
  {
    this.$searchbar.find('form').submit()
    return false;
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

  hideDirectory : function()
  {
    this.$results.hide()
  },

  showDirectory : function()
  {
    this.$results.show()
    this.$more.show()
  },

  // Empty the search results.
  empty : function()
  {
    this.$results.empty()
      .append( this.$more.hide() )
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
        var template = _.template( result )( person )
        $results.prepend( template )
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

UW.QuickLinks = Backbone.View.extend({

    // todo: the default list and these elements could be put into the php templates
    container: 'div#uw-container',
    $little_list_header: $('<h3>Helpful Links</h3>'),
    $drawer: $("<nav id='quicklinks' aria-label='quick links'></nav>"),
    $big_list: $('<ul id="big_links"></ul>'),
    $little_list: $('<ul id="little_list"></ul>'),

    template : '<li><% if (classes) { %><span class="<%= classes %>"></span><% } %><a href="<%= url %>" tabindex="-1"><%= title %></a></li>',

    events: {
       'click'       : 'animate',
       'touchstart'  : 'animate',
       'keyup'       : 'keyup'
    },

    initialize: function ( options ) {
        _.bindAll( this, 'render', 'append_menu_item', 'close_quicklinks', 'focused', 'blurred', 'button_blur', 'keyup' );
        this.links = new UW.QuickLinks.Collection( options )
        this.links.on( 'sync', this.render )
        this.$button = this.$el.find('button');
        this.$button.blur(this.button_blur);
    },

    render : function(  )
    {
        this.links.each( this.append_menu_item )
        // todo: may put the drawer directly in the theme
        this.make_drawer()
        this.add_lists()
        // this.setElement( this.$drawer )
    },

    make_drawer: function () {
        UW.$body.children().not('#wpadminbar').not('script').wrapAll('<div id="uw-container"><div id="uw-container-inner"></div></div>');
        this.$container = $(this.container);
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

    append_menu_item: function ( link ) {
        if ( link.get('classes') )
            this.$big_list.append( _.template( this.template )( link.toJSON() ) )
         else
            this.$little_list.append( _.template( this.template )( link.toJSON() ) )
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
            'click': this.close_quicklinks,
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
                this.animate(event);
            }
            else {
                _.delay(this.focused, 500);
            }
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

UW.QuickLinks.Model = Backbone.Model.extend({});

UW.QuickLinks.Collection = Backbone.Collection.extend({

    model: UW.QuickLinks.Model,

    initialize: function ( options ) {
        // _.bindAll(this, 'parse', 'make_view');
        this.url = options.url;
        //refusal to execute the ajax request isn't handled here.  Looks like it should be, but it isn't
        this.fetch()
    },

    //pull this out of the collection?
    // default_links: [
    //     {title: 'Maps', url: 'http://uw.edu/maps', classes: ['icon-maps']},
    //     {title: 'Directories', url: 'http://uw.edu/directory', classes: ['icon-directories']},
    //     {title: 'Calendar', url: 'http://uw.edu/calendar', classes: ['icon-calendar']},
    //     {title: 'Libraries', url: 'http://uw.edu/libraries', classes: ['icon-libraries']},
    //     {title: 'MyUW', url: 'http://myuw.washington.edu', classes: ['icon-myuw']},
    //     {title: 'UW Today', url: 'http://uw.edu/news', classes: ['icon-uwtoday']},
    //    ],

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
    this.controls = _.template( this.controls )( { classname: this.options.controlclasses.base } )
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
        var small_vid = _.template(this.template)( item );
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
             //  ' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
               'style="border:0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',

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
    this.player = _.template( this.templates.video )( this.options )
    this.$el.html( this.player )
  },

  // This loads the playlist template and puts it into the DOM
  playlist : function()
  {

    _.extend( this.options, { video : this.videos.first().get('id') } )
    this.player = _.template( this.templates.video )( this.options )

    this.videoList = _.template( this.templates.playlist )( { videos : this.videos.toJSON() } )

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
    return false
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
    return false
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
    this.html = _.template( this.template )( { lis : this.LIs } )
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
    this.buttons = _.template( this.template )( this.options )
    this.$el.html( this.buttons )
  },

})
;}).call(this)
