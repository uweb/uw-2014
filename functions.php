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

// changes standard WordPress YouTube embeds to use the UW YouTube shortcode
if ( !function_exists( 'uw_youtube_oembed_html' ) ) {
  function uw_youtube_oembed_html( $html, $url, $attr, $post_id ) {
    if ( strpos( $url, 'youtube.com' ) !== false ) {
        parse_str( parse_url( $url, PHP_URL_QUERY ), $query_var_array );
        $is_playlist = !empty( $query_var_array['list'] ) && empty( $query_var_array['v'] );
        $youtube_type = $is_playlist ? 'playlist' : 'single';
        $youtube_id = $is_playlist ? $query_var_array['list'] : $query_var_array['v'];
        $html = !empty( $youtube_id ) ? sprintf( "[youtube type='%s' id='%s']", $youtube_type, $youtube_id ) : $html;
    }
    return $html;
  }
}

add_filter( 'embed_oembed_html', 'uw_youtube_oembed_html', 99, 4 );
