<?php


class UW_TagboardShortcode
{

  function __construct()
  {
    add_shortcode('tagboard', array($this, 'tagboard_handler'));
  }

  function tagboard_handler( $atts )
  {

    $tagboard_atts = shortcode_atts( array(
      'slug' => '',
      'layout' => 'grid',
      'feed-type' => 'default',
      'post-count' => '50',
      'mobile-count' => '50',
      'toolbar'      => 'default'
    ), $atts);

    if ($tagboard_atts['slug'] == '') {

      return '<div>Missing parameter: slug</div>';
      
    } else {

      return sprintf('<div class="tagboard-embed" tgb-slug="t/%s" tgb-layout="%s" tgb-feed-type="%s" tgb-post-count="%s" tgb-mobile-count="%s" tgb-toolbar="%s"></div>
                    <script src="https://static.tagboard.com/public/js/embedAdvanced.js"></script>', $tagboard_atts['slug'], $tagboard_atts['layout'], $tagboard_atts['feed-type'],
                    $tagboard_atts['post-count'], $tagboard_atts['mobile-count'], $tagboard_atts['toolbar']);
    }

  }

}

?>
