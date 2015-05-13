<?php

/*
 *  Button shortcode allows for styled buttons to be added to content
 *  [button color='gold' type='type' url='link url' small='true']Button Text[/button]
 *  optional small attribute makes the button small.  Assume large if not present
 */

class UW_SubpageList
{

    function __construct()
    {
        add_shortcode('subpage-list', array($this, 'list_subpages'));
    }

    function list_subpages($atts)
    {
        $attributes = (object) shortcode_atts( array(
            'link'    => 'Read more',
            'tilebox' => false
        ), $atts );
      
        global $post;
        
        $subpages = get_pages(array('parent' => get_the_ID()));

        if (!empty($subpages)){
          $output = '';
          foreach ($subpages as $page){
            
            $permalink = get_post_permalink($page->ID);
            
            if (!$attributes->tilebox){
              $output = $output . sprintf("<h2><a href='%s'>%s</a></h2>", $permalink, $page->post_title);
              if (get_option('show_byline_on_posts')){
                $output = $output . sprintf("<div class='author-info'><p class='author-desc'><small>%s</small></p></div>", get_the_author_meta('display_name', $page->post_author));
              }
              $output = $output . sprintf('<p>%s</p>', $page->post_excerpt);
              if (!empty($attributes->link)){
                $output = $output . sprintf("<a class='uw-btn btn-sm' href='%s'>%s</a>", $permalink, $attributes->link);
              }
            }
            else {
            
            }
          }
        }

        return $output;
    }
}
