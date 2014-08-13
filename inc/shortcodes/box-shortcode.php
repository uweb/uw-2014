<?php

/* box shortcode:
 * meant for front page (maybe disable on not front page?)
 * boxes contain tiles.  Boxes support only tiles inside and only between 1 and 4 tiles.
 * structure: [box][tile][/tile][tile][/tile][/box]
 */


Class UWTileBox
{
    const MaxTiles = 4;
    private $NumbersArray = ['zero', 'one', 'two', 'three']; //arrays can't be constants in PHP.  Privates at least can't be changed

    function __construct()
    {
        add_shortcode('box', array($this, 'box_handler'));
        add_shortcode('tile', array($this, 'tile_handler'));
    }


    function box_handler($atts, $content){
        $pattern = sprintf('/%s(.+?)%s/ims', preg_quote('[tile]', '/'), preg_quote('[/tile]', '/'));
        if (preg_match_all($pattern, $content, $matches)){
            $tiles = $matches[0];  //first item is list of shortcodes, second item is list of content in the shortcodes
            $length = count($tiles);
            if ($length > self::MaxTiles){
                echo 'too many [tile]s';
            }
            else {
                ?>
                <div class='box <?= $this->NumbersArray[$length] ?>'>
                <?php
                for ($i = 0; $i < $length; $i++){
                    do_shortcode($tiles[$i]);
                }
                ?>
                </div>
                <?php
            }
        }
        else {
            echo 'need more than 1 [tile]';
        }
    }

    function tile_handler($atts, $content) {
        ?>
        <div class='tile'>
            <?= $content ?>
        </div>
        <?php
    }
}

new UWTileBox();
