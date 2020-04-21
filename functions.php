<?php

// suppresses Wordpress update notices to non-super admin
if ( !function_exists('suppress_updates') ){
    function suppress_updates() {
      if( (!is_super_admin()) && is_multisite() ) {
        remove_action('admin_notices', 'update_nag', 3);
        remove_action('admin_notices', 'maintenance_nag', 10);
        remove_action('network_admin_notices', 'update_nag', 3);
        remove_action('network_admin_notices', 'maintenance_nag', 10);
      }
    }
}

add_action('admin_head', 'suppress_updates', 1);

// allows child them overwriting of either whole UW object or just parts
if (!function_exists('setup_uw_object')){
    function setup_uw_object() {
        require( get_template_directory() . '/setup/class.uw.php' );
        $UW = new UW();
        do_action('extend_uw_object', $UW);
        return $UW;
    }
}

$UW = setup_uw_object();

/**
 * Get nav menu items by location
 *
 * @param $location The menu location id
 */
function get_nav_menu_items_by_location( $location, $args = [] ) {

    // Get all locations
    $locations = get_nav_menu_locations();

    // Get object id by location
    $object = wp_get_nav_menu_object( $locations[$location] );

    // Get menu items by menu name
    $menu_items = wp_get_nav_menu_items( $object->name, $args );

    // Return menu post objects
    return $menu_items;
}

function uw_get_quicklinks_menu() {
    # Change 'menu' to your own navigation slug.
    return get_nav_menu_items_by_location('quick-links');
}

add_action( 'rest_api_init', function () {
        register_rest_route( 'uw-2014', '/quicklinks', array(
        'methods' => 'GET',
        'callback' => 'uw_get_quicklinks_menu',
    ) );
} );