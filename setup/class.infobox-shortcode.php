<?php

Class UW_InfoboxShortcode {

    function __construct()
    {
        add_shortcode( 'infobox', array($this, 'infobox_shortcode' ));
        add_filter('mce_external_plugins', array($this, 'infobox_register_tinymce_plugin')); 
        add_filter('mce_buttons', array($this, 'infobox_add_tinymce_button'));
        // Register the infobox js script
        wp_register_script( 'get_template_directory', get_template_directory_uri() . '/js/uw.infobox.js' );

        // Localize the infobox script with new data
        $template_url_array = array(
            'url' => get_template_directory_uri()
        );
        wp_localize_script( 'get_template_directory', 'templateDirectory', $template_url_array );

        // Enqueue infobox script with localized data.
        wp_enqueue_script( 'get_template_directory' );
    }

    // Add infobox shortcode.
    function infobox_shortcode($atts, $content = null) 
    {
        $infobox_atts = shortcode_atts( array(
            'color' => '',
            'alignment' => '',
        ), $atts );

        $output = '';
  
        $output .= '<div class="info-box';

        if ($infobox_atts['alignment'] != '') {
            if ($infobox_atts['alignment'] == 'left') {
                $output .= ' info-left';
            } else if ($infobox_atts['alignment'] == 'right') {
                $output .= ' info-right';
            } else if ($infobox_atts['alignment'] == 'full-width') {
                $output .= ' info-full';
            }
        }

        $output .= '" ';

        if ($infobox_atts['color'] != '') {
            $output .= 'style="border-top-color:' . esc_html__($infobox_atts['color']) . '"';
        }

        $output .= '>';

        if (!is_null($content)) {
            $output .= apply_filters('the_content', $content);
        }

        $output .= '</div>';
    
        return $output;
    }

    // Register the plugin
    function infobox_register_tinymce_plugin($plugin_array) 
    {
       $plugin_array['infobox_button'] = get_stylesheet_directory_uri() .'/js/uw.infobox.js';
       return $plugin_array;
    }
    
    // Add button to the toolbar.
    function infobox_add_tinymce_button($buttons) 
    {
       $buttons[] = "infobox_button";
       return $buttons;
    }
}