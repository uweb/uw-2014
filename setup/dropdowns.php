<?php

/**
 * UW Dropdowns
 * This installs the default dropdowns for the UW Theme
 */

class UW_Dropdowns
{

  const NAME         = 'White Bar';
  const LOCATION     = 'white-bar';
  const DISPLAY_NAME = 'Dropdowns';

  function UW_Dropdowns()
  {
    add_action( 'after_setup_theme', array( $this, 'register_white_bar_menu') );
    add_action( 'after_setup_theme', array( $this, 'install_default_white_bar_menu') );
  }

  function register_white_bar_menu()
  {
	  register_nav_menu( self::LOCATION, __( self::NAME ) );
  }

  function install_default_white_bar_menu()
  {

    $menu_items = $this->menu_list();
    $this->MENU_ID = wp_create_nav_menu( self::DISPLAY_NAME );

    // wp_create_nav_menu returns a WP_Error if the menu already exists;
    if ( is_wp_error( $this->MENU_ID ) ) return;

    foreach ( $menu_items as $menu_name => $menu_attributes )
    {
      wp_update_nav_menu_item( $this->MENU_ID, $menu_item_db_id=0, $menu_attributes );
    }

    $this->set_uw_menu_location();
  }

  function set_uw_menu_location()
  {
    $locations = (ARRAY) get_theme_mod( 'nav_menu_locations' );
    $locations[ 'white-bar' ] = $this->MENU_ID;
    set_theme_mod( 'nav_menu_locations', $locations );
  }

  function menu_list()
  {

    return array(

      'Discover' => array(
        'menu-item-title'  => __('Discover'),
        'menu-item-url'    => 'http://uw.edu/discover/',
        'menu-item-status' => 'publish',
      ),

      'Current Students' => array(
        'menu-item-title'  => __('Current Students'),
        'menu-item-url'    => 'http://uw.edu/students/',
        'menu-item-status' => 'publish',
      ),

      'Future Students' => array(
        'menu-item-title'  => __('Future Students'),
        'menu-item-url'    => 'http://uw.edu/discover/admissions/',
        'menu-item-status' => 'publish',
      ),

      'Faculty & Staff' => array(
        'menu-item-title'  => __('Faculty & Staff'),
        'menu-item-url'    => 'http://uw.edu/facultystaff/',
        'menu-item-status' => 'publish',
      ),

      'Alumni' => array(
        'menu-item-title'  => __('Alumni'),
        'menu-item-url'    => 'http://uw.edu/alumni/',
        'menu-item-status' => 'publish',
      ),

      'NW Neighbors' => array(
        'menu-item-title'  => __('NW Neighbors'),
        'menu-item-url'    => 'http://uw.edu/nwneighbors/',
        'menu-item-status' => 'publish',
      )

    );
  }

}

new UW_Dropdowns();
