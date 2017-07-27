<?php
/**
 * Sets up the theme
 *  - basic settings
 *  - header images
 *  - post thumbnails
 *  - automatic feed links
 */

class UW_Install_Theme
{
  const WIDTH = 750;
  public $DEFAULT_HEADERS = array(
      'blossoms' => array(
        'url'           => '%s/assets/headers/suzzallo.jpg',
        'thumbnail_url' => '%s/assets/headers/suzzallo-thumbnail.jpg',
        'description'   => 'IMA'
      )
  );

  function __construct()
  {
    add_filter( 'embed_defaults', array( $this, 'uw_setup_embed_defaults' ), 1  );
    add_action( 'after_setup_theme', array( $this, 'uw_setup' ) );
    add_filter( 'redirect_canonical', array( $this, 'disable_front_page_redirect_madness' ) );
  }

  function disable_front_page_redirect_madness($redirect_url) {
    if( is_front_page() ) {
      $redirect_url = false;
    }

    return $redirect_url;
  }

  function uw_setup()
  {

    $defaultImage = reset( $this->DEFAULT_HEADERS );

    add_theme_support( 'automatic-feed-links' );

    add_theme_support( 'post-thumbnails' );

    add_theme_support( 'post-formats', array( 'gallery' ) );

    add_theme_support( 'custom-header', array(
      'default-image'  => $defaultImage['url'],
      'random-default' => false,
      'header-text'    => false,
      'width'          => 1600,
      'height'         => 343,
      'header-text'    => false,
      'uploads'        => true
    ) );

    register_default_headers( $this->DEFAULT_HEADERS );
  }

  function uw_setup_embed_defaults( $dimensions )
  {
    $dimensions['width']  = self::WIDTH;
    //based on the original wp_embed_defaults function
    $dimensions['height'] = min( ceil( self::WIDTH * 1.5 ), 1000 );
    return $dimensions;
  }

}
