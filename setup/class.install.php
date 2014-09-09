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

  public $DEFAULT_HEADERS = array(
      'blossoms' => array(
        'url'           => '%s/assets/headers/ima.jpg',
        'thumbnail_url' => '%s/assets/headers/ima-thumbnail.jpg',
        'description'   => 'IMA'
      )
  );

  function __construct()
  {
    add_action( 'after_setup_theme', array( $this, 'uw_setup' ) );
  }

  function uw_setup()
  {

    $defaultImage = reset( $this->DEFAULT_HEADERS );

	  add_theme_support( 'automatic-feed-links' );

	  add_theme_support( 'post-thumbnails' );

    add_theme_support( 'custom-header', array(
      'default-image'  => $defaultImage['url'],
      'random-default' => false,
      'header-text'    => false,
      'width'          => 1600,
      'height'         => 343,
      'header-text'    => false,
      'uploads'        => false
    ) );

    register_default_headers( $this->DEFAULT_HEADERS );

  }

}
