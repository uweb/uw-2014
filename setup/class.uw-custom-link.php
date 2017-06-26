<?php

/*
 * custom_link shortcode:
 * This shortcode simply takes in the url and parameter text(link text) you desire...
 * [custom-link url="...the url you want..."] Link text [/custom-link]
 * and generates a hyperlink for you with the url and the link text in it...
 * <a class="uw-custom-link" href="url you entered previously"> Link text </a>
 */

class UW_CustomLinks
{
    function __construct()
    {
        add_shortcode('customlink', array($this,'link_handler'));
    }

    function link_handler($atts,$content)
    {
        if (isset($atts) == true)
        {
            $url = $atts['url'];
        }
        else {
            return 'required attribute "url" missing';
        }

        if (isset($content) == false)
        {
            return 'required "content text" is missing';
        }
        return sprintf('<a class="uw-custom-link" href="%s"> %s </a>', $url, $content);
    }

}
