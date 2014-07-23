// List out the classes that each component searches for
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

// List the responsive and adaptive breakpoints for targeted browsers and devices
UW.restive = {
  breakpoints   : [ '768', '992', '10000' ],
  classes       : [ 'uw-small', 'uw-medium', 'uw-large' ],
  turbo_classes : 'is_portrait=portrait,is_landscape=landscape'
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

  UW.$body.restive( UW.restive )

}

jQuery(document).ready( UW.initialize )


// Basic UW Components
// --------------
