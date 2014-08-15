<?php

/**
 * UW Quicklinks
 * This will register the UW Quicklinks navigation and provide a json feed for the current quicklinks menu
 */
class UW_QuickLinks
{

  const NAME         = 'Quick Links';
  const LOCATION     = 'quick-links';
  const PREFIX       = 'QL';

  function __construct()
  {
    add_action( 'after_setup_theme', array( $this, 'register_quick_links_menu') );
    add_action( 'wp_ajax_quicklinks', array( $this, 'uw_quicklinks_feed') );
    add_action( 'wp_ajax_nopriv_quicklinks', array( $this, 'uw_quicklinks_feed') );
  }

  function register_quick_links_menu()
  {
    register_nav_menu( self::LOCATION, __( self::NAME ) );
  }

  function uw_quicklinks_feed()
  {
    $locations = get_nav_menu_locations();
    if ( ( isset( $locations[ self::LOCATION ]) ) )
    {
      $this->items = wp_get_nav_menu_items( $locations[ self::LOCATION ] );
      echo json_encode( $this->parse_menu( $info ) );
    }
    die();
  }

  function parse_menu()
  {
      foreach( $this->items as $item )
      {
        // Only keep the necessary keys of the $item
        $item = array_intersect_key( (array) $item , array_fill_keys( array('ID', 'title', 'url', 'classes', 'menu_item_parent'), null ) );
        if ( ! $menu[ self::PREFIX . $item['menu_item_parent'] ] )
          $menu[ self::PREFIX . $item['ID'] ] = $item;
        else
          $menu[ self::PREFIX . $item['menu_item_parent'] ]['children'][] = $item;
      }
      return $menu;
  }

}
