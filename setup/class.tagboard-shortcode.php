<?php

// Note: this feature is in progress. We don't have enough access to a tagboard account
// with the embed feature enabled so this is on hold until we know where we can find
// the slug value on a user's tagboard account


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
      'toolbar' => 'default'
    ), $atts);

    return sprintf('<div class="tagboard-embed" tgb-slug="%s" tgb-layout="%s" tgb-feed-type="%s" tgb-post-count="%s" tgb-mobile-count="%s" tgb-toolbar="%s"></div>
                    <script src="https://static.tagboard.com/public/js/embedAdvanced.js"></script>', $tagboard_atts['slug'], $tagboard_atts['layout'], $tagboard_atts['feed-type'],
                    $tagboard_atts['post-count'], $tagboard_atts['mobile-count'], $tagboard_atts['toolbar']);

  }

}

?>
