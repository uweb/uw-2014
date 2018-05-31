<?php
    /*
     *  
    UW Cards Shortcode 
     Button shortcode allows for styled buttons to be added to content
     *  [button color='gold' type='type' url='link url' small='true']Button Text[/button]
     *  optional small attribute makes the button small.  Assume large if not present
     */

    class UW_Cards
    {
        function __construct()
        { 
          add_shortcode('img', array($this, 'img_handler'));
          add_shortcode('card', array($this, 'card_handler'));
        }



       function img_handler($atts)
    {
        $atts = shortcode_atts(
            [
            'src' => '',
            'option' => ' ',
            ], $atts, 'img'
        );

        $return = '';

        $return = '<div class="card-image" style="background-image:url(' . $atts['src'] . ')" >
         </div>';
         
        return $return;
    }





        function card_handler($atts, $content)
        {
          $atts = shortcode_atts( array(
              'title' => '',
              'src' => '',
              'option' => ' ',
            ), $atts, 'img');

            $output = do_shortcode($content);
 
            return sprintf('<div class="cards-shortcode">
                <div class="' . $atts['option'] . '-card">
                <h3>%s</h3>
                <span class="udub-slant"><span></span></span>
                <div>%s </div>
                </div></div>', $atts['title'], $output );
        }
        
    }






