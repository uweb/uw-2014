<?php

// Wordpress oEmbed max-width
if ( ! isset( $content_width ) )
  $content_width = 750;

/**
 * Custom UAMS oEmbeds
 */
class UAMS_OEmbeds
{

  function __construct()
  {
    add_action( 'init', array( $this, 'campus_map' ) );
  }

  function campus_map()
  {
    wp_oembed_add_provider('http://uw.edu/maps/*', '//www.washington.edu/maps/api/oembed/place/');
    wp_oembed_add_provider('http://www.washington.edu/maps/*', '//www.washington.edu/maps/api/oembed/place/');
  }

}
