<?php

/*
 * Simple shortcode for embedding a Trumba spud
 * [trumba name='web name' type='spud type' base='teaser base url']
 */

class UW_Trumba
{

    function __construct()
    {
        add_shortcode('trumba', array($this, 'trumba_handler'));        
    }

    function trumba_handler($atts)
    {
        $attributes = (object) $atts;
        
        if (isset($attributes->name)){
            $name = strtolower($attributes->name);
        }
        else {
            return 'missing required webName to identify the spud';
        }

        $type = 'upcoming';
        if (isset($attributes->type)){
            $type = $attributes->type;
        }
        
        if (isset($attributes->base)){
            $teaser = $attributes->base;
        }
        wp_enqueue_script('trumba', 'http://www.trumba.com/scripts/spuds.js');
        $return = '<script type="text/javascript>$(document).ready(function () {';
        $return .= sprintf('$Trumba.addSpud({webName:"%s",spudType:"%s",BorderColor:"#FFFFFF"', $name, $type);
        if (isset($teaser)){
            $return .= sprintf(',teaserBase:"%s"', $teaser);
        }
        $return .= '});});</script>';

        return $return;
    }
}
