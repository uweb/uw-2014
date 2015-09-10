<?php

/**
 * This shortcode allows iFrames for editors.
 * Only certain domains are allowed, listed in /inc/helper-functions.php
 */
class UW_Iframes
{

  function __construct()
  {
    $this->ALLOWED_IFRAMES = $this->get_iframe_domains();
    add_shortcode( 'iframe', array( $this, 'add_iframe' ) );
  }

  function add_iframe($atts)
  {

      $params = shortcode_atts( array(
        'src' => '',
        'height' => get_option('embed_size_h'),
        'width' => get_option('embed_size_w')
      ), $atts );

      $params['src'] = esc_url($params['src'], array('http','https'));
      if ( $params['src'] == '' )
        return '';

      $parsed = parse_url($params['src']);
      if ( array_key_exists('host', $parsed) && !in_array($parsed['host'], $this->ALLOWED_IFRAMES ) )
        return '';

      $query = http_build_query($_GET);

      $query =  $query  ? "?$query" : '';

      return "<iframe src=\"{$params['src']}$query\" width=\"{$params['width']}\" height=\"{$params['height']}\" frameborder=\"0\"></iframe>";

  }

  function get_iframe_domains()
  {
    return array(
      'uw.edu',
      'washington.edu',
      'uwtv.org',
      'tvw.org',
      'www.uwtv.org',
      'google.com',
      'docs.google.com',
      'youtube.com',
      'excition.com',
      'uwregents.wufoo.com',
      'www.uw.edu',
      'www.washington.edu',
      'depts.washington.edu',
      'online.gifts.washington.edu',
      'secure.gifts.washington.edu',
      'payroll.gifts.washington.edu',
      'helperapps.gifts.washington.edu',
      'uwfoundation.org',
      'www.uwfoundation.org',
      'www.surveygizmo.com',
      'www.google.com',
      'www.excition.com',
      'www.youtube.com',
      'pgcalc.com',
      'www.pgcalc.com',
      'matchinggifts.com',
      'www.matchinggifts.com',
      'embed.pac-12.com'
    );
  }


}
