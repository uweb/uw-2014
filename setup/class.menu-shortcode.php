<?php

/*
 * Shortcode for embedding a menu on page
 * [custommenu menu=Menu-name-here class=class-name]
 */

class UW_MenuShortcode
{
    
    function __construct()
    {
        add_shortcode( "custommenu", array($this, 'vo_custom_menu_shortcode' ));   
    }

    function vo_custom_menu_shortcode( $atts, $content = null ) {
        extract( shortcode_atts( 
            array(  
                'menu'            => '', 
                'container'       => 'div', 
                'container_class' => 'icon-menu', 
                'container_id'    => '', 
                'menu_class'      => 'menu', 
                'menu_id'         => '',
                'echo'            => true,
                'fallback_cb'     => 'wp_page_menu',
                'before'          => '',
                'after'           => '',
                'link_before'     => '',
                'link_after'      => '',
                'depth'           => 0,
                'walker'          => '',
                'theme_location'  => ''
            ), $atts )
        ); 
     
        return wp_nav_menu( 
            array( 
                'menu'            => $menu, 
                'container'       => $container, 
                'container_class' => $container_class, 
                'container_id'    => $container_id, 
                'menu_class'      => $menu_class, 
                'menu_id'         => $menu_id,
                'echo'            => false,
                'fallback_cb'     => $fallback_cb,
                'before'          => $before,
                'after'           => $after,
                'link_before'     => $link_before,
                'link_after'      => $link_after,
                'depth'           => $depth,
                'walker'          => $walker,
                'theme_location'  => $theme_location
            ) 
        );
    }
}
