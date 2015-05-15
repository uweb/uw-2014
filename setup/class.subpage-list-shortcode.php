<?php

/*
 *  This shortcode lists out subpages, their author if show byline on posts option is set,
 *  their excerpts if excerpts are enabled (via plugin) and curated excerpts are added,
 *  and a link to the subpage.
 *
 *  [subpage-list link='link text' tilebox=boolean]
 *  optional tilebox attribute invokes tile-box layout for subpage list
 *  optional link attribute will allow you to specify link text (same for all subpages)
 *    no link if link is set to empty string or false
 *    default link text is Read More
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
        
        $subpages = get_pages(array('parent' => get_the_ID(), 'sort_column'=>'menu_order'));

        if (!empty($subpages)){
          $output = '';
          $tiles = 0;
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
              if ($tiles == 0){
                $output = $output . "<div class='box-outer'><div class='box two'>";
              }
              $output = $output . "<div class='tile'>";
              $output = $output . sprintf("<div>%s</div>", get_the_post_thumbnail($page->ID, 'half'));
              $output = $output . sprintf("<h3><a href='%s'>%s</a></h3>", $permalink, $page->post_title);
              if (get_option('show_byline_on_posts')){
                $output = $output . sprintf("<div class='author-info'><p class='author-desc'><small>%s</small></p></div>", get_the_author_meta('display_name', $page->post_author));
              }
              $output = $output . sprintf('<p>%s</p>', $page->post_excerpt);
              $output = $output . "</div>";
              $tiles = $tiles + 1;
              if ($tiles == 2){
                $output = $output . "</div></div>";
                $tiles = 0;
              }
            }
          }

          if ($tiles == 1){
            //we've been incrementing tiles, so tilebox is active, but we are missing a blank tile and closing tags
            $output = $output . "<div class='tile empty'></div></div></div>"; 
          }
        }

        return $output;
    }
}
