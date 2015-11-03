<?php

/*

Shortcode for using the Links list found in the dashboard

Example: 
[bookmark category_name=pfw categorize="0" title_li=""]
See https://codex.wordpress.org/Function_Reference/wp_list_bookmarks for attributes that can be set

 */



class UW_BookmarkShortcode
{
    
    function __construct()
    {
        add_shortcode('bookmark', array($this, 'bookmarks_shortcode'));      
    }

    function bookmarks_shortcode( $atts = array() ) {
        $atts['echo'] = false;
        return wp_list_bookmarks( $atts );
    }
    

}

