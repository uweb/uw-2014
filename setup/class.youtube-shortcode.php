<?php

/*
 *  YouTube shortcode
 *  This is a port of the legacy YouTube shortcode from uw 2014 converted to leverage
 *  oEmbed while not breaking previous versions.
 */

class UW_YouTube
{

    public static $types = array( 'playlist', 'single' );

    function __construct()
    {
        add_shortcode( 'youtube', array( $this, 'youtube_handler' ) );
    }

    function youtube_handler( $atts )
    {

        $attributes = shortcode_atts( array(
            'src' => '',
            'id' => '',
            'type' => 'single'
          ), $atts );

        if ( isset( $attributes['id'] ) ) {
            $id = $attributes['id'];
        }
        else {
            return 'required attribute "id" missing';
        }

        if ( 'single' == $attributes['type'] ) {
            $type = 'watch?v';
        } elseif ( 'playlist' == $attributes['type'] ) {
            $type = 'playlist?list';
        }

        $return = wp_oembed_get(  sprintf( 'https://www.youtube.com/%s=%s', $type, $id ) );

        return $return;
    }
}