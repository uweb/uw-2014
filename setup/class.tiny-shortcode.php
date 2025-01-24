<?php

/*
 * Shortcode for making Bootstrap grids
 */


class UW_TinyShortcode
{
    
    public $shortcodes = array(
        'grid',
        'button',
        'tilebox'
    );


    function __construct() {
        add_action( 'init', array( &$this, 'init' ) );
    }

    function init() {
        if( !is_admin() ) {
            return;
        } else {
            wp_enqueue_style( 'bs_admin_style', get_template_directory_uri() . '/assets/admin/css/bootstrap-shortcode-admin.css'  );
        }
        if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) ) {
            return;
        }
        if ( get_user_option( 'rich_editing' ) == 'true' ) {
            add_filter( 'mce_external_plugins', array( &$this, 'regplugins' ) );
            add_filter( 'mce_buttons_3', array( &$this, 'regbtns' ) );
        }
    }

    function regbtns( $buttons ) {
        foreach ( $this->shortcodes as &$shortcode ) {
                array_push( $buttons, 'bs_' . $shortcode );
        }
        return $buttons;
    }

    function regplugins( $plgs) {
        foreach ( $this->shortcodes as &$shortcode ) {
            $plgs[ 'bs_' . $shortcode ] = get_template_directory_uri() . '/js/plugins/' . $shortcode . '.js' ;
        }
        return $plgs;
    }



}?>