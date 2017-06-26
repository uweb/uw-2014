// List out the classes that each component searches for
UW.elements = {

  alert         : '.uw-thinstrip',
  accordion     : '.uw-accordion',
  dropdowns     : '#dawgdrops',
  images        : 'a > img',
  mobilemenu    : '#mobile-relative',
  togglemobile  : '#mobile-sidebar',
  radio         : ':radio',
  checkbox      : ':checkbox',
  search        : '#uwsearcharea',
  select        : '.uw-select',
  quicklinks    : '.uw-quicklinks',
  slideshow     : '.uw-slideshow',
  social        : '.uw-social',
  vimeo         : '.uw-vimeo',
  youtube       : '.uw-youtube',
//  customlink    : '.uw-custom-link'

}

UW.getBaseUrl = function() {
  var site = _.first( _.compact( Backbone.history.location.pathname.split('/') ) )
  var url = ''

  if (!Backbone.history.location.origin) {
    Backbone.history.location.origin = Backbone.history.location.protocol + "//" + Backbone.history.location.hostname + (Backbone.history.location.port ? ':' + Backbone.history.location.port: '');
  }

  if (Backbone.history.location.origin.indexOf('www.washington.edu') != -1) {
    url = Backbone.history.location.origin + ( site ? '/' + site : '' ) + '/';
  } else if (Backbone.history.location.origin.indexOf('depts.washington.edu') != -1) {
    url = Backbone.history.location.origin + ( site ? '/' + site : '' ) + '/';
  } else {
    url = Backbone.history.location.origin + '/';
  }
  return url
}

UW.wpinstance = function(){
  return Backbone.history.location.pathname ? Backbone.history.location.pathname : "";
}

UW.sources = {
  // Note: style_dir is a variable created by the Wordpress' wp_localize_script in class.uw-scripts.php
  quicklinks : typeof(style_dir) !== 'undefined' ? style_dir + '/wp-admin/admin-ajax.php?action=quicklinks' : UW.getBaseUrl() + 'wp-admin/admin-ajax.php?action=quicklinks',
  search     : UW.getBaseUrl() + 'wp-admin/admin-ajax.php'
}

// Initialize all components when the DOM is ready
UW.initialize = function( $ )
{
  // Cache common elements that each javascript module calls
  UW.$body      = $('body');
  UW.$window    = $( window );
  UW.baseUrl    = UW.getBaseUrl()

  // UW Utilities
  UW.dropdowns  = _.map( $( UW.elements.dropdowns ),     function( element ) { return new UW.Dropdowns({ el : element }) } )
  UW.mobilemenu = _.map( $( UW.elements.mobilemenu ),     function( element ) { return new UW.MobileMenu({ el : element }) } )
  UW.quicklinks = _.map( $( UW.elements.quicklinks ),    function( element ) { return new UW.QuickLinks( { el : element, url : UW.sources.quicklinks }) } )
  UW.search     = _.map( $( UW.elements.search ),    function( element ) { return new UW.Search( { el : element } ) } )
  UW.images     = _.map( $( UW.elements.images ),    function( element ) { return new UW.Image({ el : element }) } )

  UW.togglemobile = _.map( $( UW.elements.togglemobile ),     function( element ) { return new UW.ToggleSidebarMenu({ el : element }) } )
  //UW.customlink = _.map( $( UW.elements.customlink ),     function( element ) { return new UW.CustomLink({ el: elemnt }) } )

  // UW Modules
  UW.slideshows = _.map( $( UW.elements.slideshow ), function( element ) { return new UW.Slideshow( { el : element }) } )
  UW.social     = _.map( $( UW.elements.social ),    function( element ) { return new UW.Social({ el : element }) } )
  UW.vimeo      = _.map( $( UW.elements.vimeo ),     function( element ) { return new UW.Vimeo({ el : element }) } )
  UW.youtube    = _.map( $( UW.elements.youtube ),   function( element ) { return new UW.YouTube.Collection({ el: element})})


  // UW Components - These need to render after all other javascript elements are rendered on page
  UW.accordion  = _.map( $( UW.elements.accordion ), function( element ) { return new UW.Accordion( { el : element }) } )
  UW.radio      = _.map( $( UW.elements.radio ),     function( element ) { return new UW.Radio({ el : element }) } )
  UW.checkbox   = _.map( $( UW.elements.checkbox ),     function( element ) { return new UW.Radio({ el : element }) } )
  UW.select     = _.map( $( UW.elements.select ),    function( element ) { return new UW.Select({ el : element }) } )

  UW.alert = new UW.Alert({ after: UW.elements.alert, model: new UW.Alert.Model() });

  // todo: add to separate file
  $('table').addClass('table table-striped').attr( "border", 1 )

  $('pre').addClass('prettyprint')

  if ( window.prettyPrint ) prettyPrint()

}

jQuery(document).ready(function(){
  // switching to anonymous function so UW.initialize can be extended before running
  UW.initialize(jQuery);
})


// Basic UW Components
// --------------
