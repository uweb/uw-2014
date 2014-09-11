<?php

/* box shortcode:
 * meant for front page (maybe disable on not front page?)
 * boxes contain tiles.  Boxes support only tiles inside and only between 1 and 4 tiles.
 * structure: [box][tile][/tile][tile][/tile][/box]
 */


Class TileBox
{
    const MAXTILES = 4;
    const PRIORITY = 11;
    private $count = 0;
    private $NumbersArray = array('zero', 'one', 'two', 'three', 'four'); //arrays can't be constants in PHP.  Privates at least can't be changed

    function __construct()
    {
        remove_filter( 'the_content', 'wpautop' );
        add_filter( 'the_content', 'wpautop' , self::PRIORITY );

        add_shortcode( 'box', array( $this, 'box_handler' ) );
        add_shortcode( 'tile', array( $this, 'tile_handler' ) );
    }

    function box_handler( $atts, $content ){
      // var_dump($content);
        $this->count = 0;

        if ( empty( $content ) )
            return 'No content inside the box element. Make sure your close your box element. Required stucture: [box][tile]content[/tile][/box]';

        $output = do_shortcode( $content );
        return sprintf( '<div class="box-outer"><div class="box %s">%s</div></div>', $this->NumbersArray[$this->count], $output);
    }

    function tile_handler( $atts, $content ) {
        $this->count++;

        if ( empty( $content ) )
            $content = 'No content for this tile.  Make sure you wrap your content like this: [tile]Content here[/tile]';

        if ( $this->count > self::MAXTILES)
            $content = 'Too many [tile]s.  Only up to 4 are supported)';

        return sprintf( '<div class="tile">%s</div>', apply_filters( 'the_content', $content ) );
    }

}
