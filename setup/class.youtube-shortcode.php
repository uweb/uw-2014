<?php

/*
 *  Button shortcode allows for styled buttons to be added to content
 *  [button button-type='type' url='link url' small='true']Button Text[/button]
 *  optional small attribute makes the button small.  Assume large if not present
 */

class UW_YouTube
{

    public static $types = array('playlist', 'single');

    function __construct()
    {
        add_shortcode('youtube', array($this, 'youtube_handler'));        
    }

    function youtube_handler($atts)
    {
        $attributes = (object) $atts;

        $classes = array('uw-btn');
            
        if (isset($attributes->type)){
            $type = strtolower($attributes->type);
            if (!in_array($type, $this::$types)){
                return sprintf('youtube type "%s" not supported', $type);
            }
        }
        else {
            return 'required attribute "type" missing';
        }

        if (isset($attributes->id)){
            $id = $attributes->id;
        }
        else {
            return 'required attribute "id" missing';
        }

        $el_id = 'uw-youtube-' . rand(0,100);

        return sprintf('<div id="%s" class="uw-youtube" data-uw-youtube-type="%s" data-uw-youtube="%s"></div>', $el_id, $type, $id);
    }
}
