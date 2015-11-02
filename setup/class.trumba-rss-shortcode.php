<?php

/*
 * Shortcode for embedding a RSS feed from a trumba calendar
 * [trumba-rss url='calendar rss url']
 */

class UW_TrumbaRSS
{

    function __construct()
    {
        add_shortcode('trumba-rss', array($this, 'trumba_rss_handler'));        
    }

    function trumba_rss_handler($atts)
    {
        $attributes = (object) $atts;
        if (isset($attributes->url)){
            $url = $attributes->url;
        }
        else {
            return 'missing required URL to identify the feed';
        }

        $xml=simplexml_load_file($url) or die("Error: Cannot create feed from URL.");

        $return = "";

        foreach ($xml->channel->item as $item) {
            $info = $item->description;
            $info = explode("PDT", $info);
            $description = trim($info[1]);

            $date = explode("<br/>", $info[0]);
            $date = array_pop($date);
            $date = explode(',', $date);
            $day = $date[0] . ", " . $date[1];

            $return =   $return . 
                        "<h3>" . strtoupper($day) . ": <span>" . strtoupper($item->title) . "</span></h3>" .  
                        "<p>" . strip_tags($description) . "</p>";

            // $return.=  "<div class='trumbarss'><h3><span>" . strtoupper($item->title) . "</span></h3>" . 
            //         "<p>" . $info[0] . "</p>" . 
            //         "<p>" . strip_tags($description) . "</p></div>";
        }

        return $return;

    }
}
