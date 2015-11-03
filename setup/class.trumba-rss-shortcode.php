<?php

/*
 * Shortcode for embedding a RSS feed from a trumba calendar
 * [trumba-rss url='calendar rss url' category='true' description='false' ]
 */

class UW_TrumbaRSS
{

    function __construct()
    {
        add_shortcode('trumba-rss', array($this, 'trumba_rss_handler'));        
    }

    function trumba_rss_handler($atts)
    {
        $defaults = shortcode_atts( array(
          'url' => null,
          'category' => 'true',
          'description' => 'false'
        ), $atts);
        $attributes = (object) $defaults;
        if (isset($attributes->url)){
            $url = $attributes->url;
        }
        else {
            return 'missing required URL to identify the feed';
        }

        $xml=simplexml_load_file($url) or die("Error: Cannot create feed from URL.");

        $return = "";

        foreach ($xml->channel->item as $item) {

            $return .= "<h3 class='trumba-title'><span>" . $item->title . "</span></h3>" ;
            $return .= ($attributes->category == 'true') ? "<p class='trumba-category'>" . $item->category . "</p>" : '';
            $return .= ($attributes->description == 'true') ? "<p class='trumba-description'>" . $item->description . "</p>" : '';
                        
        }

        return $return;

    }
}
