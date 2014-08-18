<?php

/* box shortcode:
 * meant for front page (maybe disable on not front page?)
 * boxes contain tiles.  Boxes support only tiles inside and only between 1 and 4 tiles.
 * structure: [box][tile][/tile][tile][/tile][/box]
 */


Class TileBox
{
    const MaxTiles = 4;
    private $NumbersArray = array('zero', 'one', 'two', 'three'); //arrays can't be constants in PHP.  Privates at least can't be changed

    function __construct()
    {
        add_shortcode('box', array($this, 'box_handler'));
    }


    function box_handler($atts, $content){
        if (empty($content)){
            echo 'No content inside the box element.  Make sure your close your box element.   Required stucture: [box][tile]content[/tile][/box]';
            return;
        }
        $pattern = sprintf('/%s(.*?)%s/ims', preg_quote('[tile]', '/'), preg_quote('[/tile]', '/'));
        if (preg_match_all($pattern, $content, $matches)){
            $tiles = $matches[1];  //first item is list of shortcodes, second item is list of content in the shortcodes.  Maybe ditch second shortcode in favor of custom function?
            $length = count($tiles);
            if ($length > self::MaxTiles){
                echo 'Too many [tile]s.  Only up to 4 are supported)';
            }
            else {
                ?>
                <div class='box <?= $this->NumbersArray[$length] ?>'>
                <?php
                for ($i = 0; $i < $length; $i++){
                    $this->tile_handler($tiles[$i]);
                }
                ?>
                </div>
                <?php
            }
        }
        else {
            echo 'No tile elements present.  Make sure you have at least one tile and that you close your tile elements.  Required stucture: [box][tile]content[/tile][/box]';
        }
    }

    function tile_handler($content) {
        $content = trim($content);
        //removed attempts to parse HTML with regex to remove empty p tags.  Use CSS instead?  .box p:empty { display:none;}?  Still doesn't handle &nbsp;
        if (empty($content)){
            $content = 'No content for this tile.  Make sure you wrap your content like this: [tile]Content here[/tile]';
        }
        ?>
        <div class='tile'>
            <?= $content ?>
        </div>
        <?php
    }
}
