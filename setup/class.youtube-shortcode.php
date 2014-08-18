<?php

/*
 *  YouTube shortcode allows for youtube video and/or playlist to be added to content
 *  [youtube type='type' id='video or playlist id' max-results='integer that defines max results']
 *  max_results is optional, and if not given allows the UW javascript object to define max_results
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

        $el_id = 'uw-youtube-' . rand(0,100); //needs unique id.  Could set this in shortcode instead of generating
        $max_results = intval($attributes->max_results);
        if ($max_results > 0){
            $return = sprintf('<div id="%s" class="uw-youtube" data-uw-youtube-type="%s" data-uw-youtube="%s" data-max-results="%d"></div>', $el_id, $type, $id, $max_results);        
        }
        else {
            $return = sprintf('<div id="%s" class="uw-youtube" data-uw-youtube-type="%s" data-uw-youtube="%s"></div>', $el_id, $type, $id);
        }

        return $return;
    }
}
