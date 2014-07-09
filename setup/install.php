<?php
/**
 * Sets up the theme
 *  - basic settings
 *  - header images
 *  - navigation locations
 *  - widget locations
 *  - post thumbnails
 */

class UW_Install_Theme
{

  public $DEFAULT_HEADERS = array(
      'blossoms' => array(
        'url' => '%s/img/header/cherries.jpg',
        'thumbnail_url' => '%s/img/header/cherries-thumbnail.jpg',
        'description' => 'Cherry Blossoms'
      ),
      'cherries' => array(
        'url' => '%s/img/header/cherries-II.jpg',
        'thumbnail_url' => '%s/img/header/cherries-II-thumbnail.jpg',
        'description' => 'Cherry Blossoms II'
      ),
      'fern' => array(
        'url' => '%s/img/header/fern.jpg',
        'thumbnail_url' => '%s/img/header/fern-thumbnail.jpg',
        'description' => 'Fern'
      ),
      'globe' => array(
        'url' => '%s/img/header/globe.jpg',
        'thumbnail_url' => '%s/img/header/globe-thumbnail.jpg',
        'description' => 'Globe'
      ),
      'grass' => array(
        'url' => '%s/img/header/grass.jpg',
        'thumbnail_url' => '%s/img/header/grass-thumbnail.jpg',
        'description' =>  'Grass'
      ),
      'grill' => array(
        'url' => '%s/img/header/grill.jpg',
        'thumbnail_url' => '%s/img/header/grill-thumbnail.jpg',
        'description' => 'Grill'
      ),
      'lights' => array(
        'url' => '%s/img/header/lights.jpg',
        'thumbnail_url' => '%s/img/header/lights-thumbnail.jpg',
        'description' => 'Lights'
      ),
      'reeds' => array(
        'url' => '%s/img/header/reeds.jpg',
        'thumbnail_url' => '%s/img/header/reeds-thumbnail.jpg',
        'description' => 'Reeds'
      ),
      'suzzallo' => array(
        'url' => '%s/img/header/suzzallo.jpg',
        'thumbnail_url' => '%s/img/header/suzzallo-thumbnail.jpg',
        'description' => 'Suzzallo'
      ),
  );

  function UW_Install_Theme()
  {
    add_action( 'after_setup_theme', array( $this, 'uw_setup' ) );
    add_filter( 'bloginfo_rss', array( $this, 'uw_category_rss_link'), 10, 2);
  }

  function uw_setup()
  {
    $defaultImage = reset($this->DEFAULT_HEADERS);
	  add_theme_support( 'automatic-feed-links' );
	  add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-header', array(
      'default-image'  => $defaultImage['url'],
      'random-default' => false,
      'header-text' => false,
      'width'       => 1280,
      'height'      => 193,
      'header-text' => false
    ) );

    register_default_headers( $this->DEFAULT_HEADERS );

    $this->register_navigation_menus();

  }

  function register_navigation_menus()
  {
	  // register_nav_menu( 'primary', __( 'Primary Menu', 'uw' ) );
	  // register_nav_menu( 'footer', __( 'Footer Menu', 'uw' ) );
  }

  function uw_category_rss_link($arg, $show)
  {
    if ($show == 'url' && is_feed() && is_category() )
    {
      $id = get_query_var('cat');
      return get_category_link($id);
    }

    return $arg;
  }

}

new UW_Install_Theme;
