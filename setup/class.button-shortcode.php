<?php

/*
 *  Button shortcode allows for styled buttons to be added to content
 *  [button color='gold' type='type' url='link url' small='true']Button Text[/button]
 *  optional small attribute makes the button small.  Assume large if not present
 */

class UW_Button
{
    private static $types = array('plus', 'go', 'external', 'play');

    function __construct()
    {
        //remove_shortcode('button');
        add_shortcode('button', array($this, 'button_handler'));
    }

    function button_handler($atts, $content)
    {
        $attributes = (object) $atts;

        $classes = 'uw-btn';

        $btnColors = shortcode_atts( array(
            'color' => 'none',
        ), $atts );


        $color = 'btn-' . $btnColors['color'];

        if(empty($content)){
            echo 'No text in this button';
            return;
        }

        if (isset($attributes->type)){
            $type = strtolower($attributes->type);
            if (in_array($type, $this::$types)){
                $classes .= ' btn-' . $type;
            }
        }

        $url = '#';
        if (isset($attributes->url)){
            $url = $attributes->url;
        }

        if (property_exists($attributes, 'small')){
            $classes .= ' btn-sm';
        }

        $class_string = $classes;

        return sprintf('<a class="%s %s" href="%s">%s</a>', $class_string, $color, $url, $content);
    }
}
