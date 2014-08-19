<?php

/**
 * Custom UW Campus Map oembed
 */
class UW_Map_OEmbed
{

  function __construct()
  {
    add_action( 'init', array( $this, 'campus_map' ) );
  }

  function campus_map()
  {
    wp_oembed_add_provider('http://uw.edu/maps/*', 'http://www.washington.edu/maps/api/oembed/place/');
    wp_oembed_add_provider('http://www.washington.edu/maps/*', 'http://www.washington.edu/maps/api/oembed/place/');
  }

}
