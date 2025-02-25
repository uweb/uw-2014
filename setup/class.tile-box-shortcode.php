<?php

/* box shortcode:
 * meant for front page (maybe disable on not front page?)
 * boxes contain tiles.  Boxes support only tiles inside and only between 1 and 4 tiles.
 * 
 * structure: [box alignment="centered" shadow="none" padding="none"][tile][/tile][tile][/tile][/box]
 */


Class TileBox
{
    const MAXTILES = 12;
    const PRIORITY = 11;
    private $count = 0;
    private $NumbersArray = array('zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'); //arrays can't be constants in PHP.  Privates at least can't be changed

    function __construct()
    {
        remove_filter( 'the_content', 'wpautop' );
        add_filter( 'the_content', 'wpautop' , self::PRIORITY );

        remove_filter( 'the_excerpt', 'wpautop' );
        add_filter( 'the_excerpt', 'wpautop' , self::PRIORITY );

        add_shortcode( 'box', array( $this, 'box_handler' ) );
        add_shortcode( 'tile', array( $this, 'tile_handler' ) );
    }

    function box_handler( $atts, $content ){

        $boxCenter = shortcode_atts( array(
            'alignment' => 'none',
            'color' => '',
            'padding' => '',
            'shadow' => '',
            'custom' => ''
        ), $atts );
 
        $color = '';
        if (!empty($boxCenter['color'])){
          $color = ' box-' . $boxCenter['color'];
        }; 

        $padding = '';
        if (!empty($boxCenter['padding'])){
          $padding = ' nopad';
        }; 

        $shadow = '';
        if (!empty($boxCenter['shadow'])){
          $shadow = ' noshadow';
        }; 

        $custom = '';
        if (!empty($boxCenter['custom'])){
          $custom = $boxCenter['custom'];
        };

        $center = 'box-' . $boxCenter['alignment'];        

        $this->count = 0;

        if ( empty( $content ) )
            return 'No content inside the box element. Make sure your close your box element. Required stucture: [box][tile]content[/tile][/box]';

        $output = do_shortcode( $content );
        return sprintf( '<div class="box-outer"><div class="box %s %s%s%s%s%s">%s</div></div>', $this->NumbersArray[$this->count], $center, $color, $padding, $shadow, $custom, $output);
    }

    function tile_handler( $atts, $content ) {
        $this->count++;
        $tile_atts = shortcode_atts( array(
          'empty' => 'false',
        ), $atts);

        $classes = 'tile';

        if ( $this->count > self::MAXTILES) {
          $content = 'Too many [tile]s.  Only up 12 are supported)';
        }

        if (filter_var($tile_atts['empty'], FILTER_VALIDATE_BOOLEAN)){
          $classes = $classes . ' empty';
        }
        else if ( empty( $content ) ){
          $content = 'No content for this tile.  Make sure you wrap your content like this: [tile]Content here[/tile]';
        }

        return sprintf( '<div class="%s">%s</div>', $classes, apply_filters( 'the_content', $content ) );
    }

}
