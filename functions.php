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


// Add infobox shortcode.
+function infobox_shortcode($atts = array(), $content = null, $tag = '') {
+    $infobox_atts = shortcode_atts(
+                                  array(
+                                     'color' => '',
+                                  ), $atts, $tag);
+ 
+    $output = '';
+  
+    $output .= '<div class="info-box">';
+
+    if (!is_null($content)) {
+        $output .= apply_filters('the_content', $content);
+    }
+
+    $output .= '</div>';
+ 
+    return $output;
+}
+
+add_shortcode( 'infobox', 'infobox_shortcode' );
+
+
+// Add infobox shortcode button to TinyMCE editor.
+add_action('init', 'infobox_shortcode_button_init');
+function infobox_shortcode_button_init() {
+
+     // Abort early if the user will never see TinyMCE
+     if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') && get_user_option('rich_editing') == 'true') {
+          return;
+     }
+     
+     add_filter("mce_external_plugins", "infobox_register_tinymce_plugin"); 
+
+     add_filter('mce_buttons', 'infobox_add_tinymce_button');
+}
+
+
+// Register the plugin
+function infobox_register_tinymce_plugin($plugin_array) {
+   $plugin_array['infobox_button'] = get_stylesheet_directory_uri() .'/js/infobox-shortcode.js';
+   return $plugin_array;
+}
+
+// Add button to the toolbar.
+function infobox_add_tinymce_button($buttons) {
+   $buttons[] = "infobox_button";
+   return $buttons;
+}