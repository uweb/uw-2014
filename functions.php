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

// adds css for admin pages
if (!function_exists('admin_style')) { 
    function admin_style() {
      wp_enqueue_style('admin-styles', get_template_directory_uri().'/less/admin.less');
    }
}

add_action('admin_enqueue_scripts', 'admin_style');

// creates iframe options page under settings menu
if (!function_exists('setup_options_page')) {
  function setup_options_page() {
      require_once __DIR__.'/setup/class.uw-iframes-settings.php';
      $iframe_options = new UW_Iframes_Settings();
  }
}

setup_options_page();
