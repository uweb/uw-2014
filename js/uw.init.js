// List out the classes that each component searches for
UW.elements = {

  search    : '.uw-search',
  slideshow : '.uw-slideshow',
  social    : '.uw-social',
  vimeo     : '.uw-vimeo',
  select    : '.uw-select'

}
// Initialize all components when the DOM is ready
UW.initialize = function( $ )
{
  UW.search     = _.map( $( UW.elements.search ),    function( element ) { return new UW.Search( { el : element }) } )
  UW.slideshows = _.map( $( UW.elements.slideshow ), function( element ) { return new UW.Slideshow( { el : element }) } )
  UW.social     = _.map( $( UW.elements.social ),    function( element ) { return new UW.Social({ el : element }) } )
  UW.vimeo      = _.map( $( UW.elements.vimeo ),     function( element ) { return new UW.Vimeo({ el : element }) } )
  UW.select     = _.map( $( UW.elements.select ),    function( element ) { return new UW.Select({ el : element }) } )
  // UW.players    = new UW.PlayerCollection()
}

jQuery(document).ready( UW.initialize )


// Basic UW Components
// --------------
