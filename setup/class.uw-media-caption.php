<?php

//
// Adds a media caption to images in the media library
//

class UW_Media_Caption
{

  function __construct()
  {
    add_filter( 'img_caption_shortcode', array( $this, 'add_media_credit_to_caption_shortcode_filter'), 10, 3 );

  }

  //
  // Override the caption html - original in wp-includes/media.php
  //

  function add_media_credit_to_caption_shortcode_filter($val, $attr, $content)
  {
    extract(shortcode_atts(array(
      'id'  => '',
      'align' => '',
      'width' => '',
      'caption' => '',
      'credit' => '',
      'source_url' => ''
    ), $attr));


    // if ( 1 > (int) $width || empty($caption) )
    if ( 1 > (int) $width )
      return $content;

    if ( $id ) $id = 'id="' . esc_attr($id) . '" ';
    preg_match('/([\d]+)/', $id, $match);

    if ( $match[0] ) $credit = get_post_meta($match[0], '_media_credit', true);
    if ( $match[0] ) $source_url = get_post_meta( $match[0], "_source_url", true );
    if ( $credit ) $credit = '<span class="wp-media-credit">'. $credit . '</span>';

  // $credit = '<a href="'. ($source_url) .'">'. $credit .'</a>';

    if ($source_url != '') {
      $credit = '<a href="'. ($source_url) .'">'. $credit .'</a>';
    }else {
      $credit = ($source_url) . $credit ;
    }

   // Extract attachment $post->ID

    return '<div ' . $id . 'class="wp-caption ' . esc_attr($align) . '" style="width: ' . (10 + (int) $width) . 'px">'
    . do_shortcode( $content ) . '<p class="wp-caption-text">' . $caption . $credit . '</span>' . '</p></div>';




  } /// end












}  //end
