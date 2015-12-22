<?php

/**
 * UW Quicklinks
 * This will register the UW Quicklinks navigation and provide a json feed for the current quicklinks menu
 */
class UW_QuickLinks
{

  const NAME         = 'Quick Links';
  const LOCATION     = 'quick-links';
  const ALLOWED_BLOG = 1;

  function __construct()
  {
    $this->MULTISITE = is_multisite();

    if ( ! $this->MULTISITE || $this->MULTISITE && get_current_blog_id() === self::ALLOWED_BLOG )
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
    if ( $this->MULTISITE ) switch_to_blog( self::ALLOWED_BLOG );

    $locations = get_nav_menu_locations();
    if ( ( isset( $locations[ self::LOCATION ]) ) )
    {
      $this->items = wp_get_nav_menu_items( $locations[ self::LOCATION ] );
    }
      else if ( $location = wp_get_nav_menu_object( self::LOCATION ) )
    {
      $this->items = wp_get_nav_menu_items( $location->term_id );
    }


    if ( $this->MULTISITE ) restore_current_blog();

    wp_send_json( $this->parse_menu() ) ;
  }

  function parse_menu()
  {
    if ( isset($this->items) )
      foreach( $this->items as $index=>$item )
      {
        // Only keep the necessary keys of the $item
        $item = array_intersect_key( (array) $item , array_fill_keys( array('ID', 'title', 'url', 'classes', 'menu_item_parent'), null ) );

        if ( ! $item['classes'][0] ) $item['classes'] = false;

        $menu[] = $item;

      }

    return isset($menu) ? $menu : array();
  }

}
