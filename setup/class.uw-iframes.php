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

      $iframeSrc = html_entity_decode($params['src']);
      $iframeQueryString = parse_url($iframeSrc, PHP_URL_QUERY);	  
      $parentQueryString = http_build_query($_GET);      
    	 
      if($iframeQueryString != '' && $parentQueryString != '')
      {
        $iframeQuery = parse_str($iframeQueryString, $iframeQueryParams);
        $parentQuery = parse_str($parentQueryString, $parentQueryParams);
        $query_merged = array_merge($iframeQueryParams, $parentQueryParams);
        $iframeSrc = str_replace($iframeQueryString, http_build_query($query_merged), $iframeSrc);
      } 
      else if ($parentQueryString != '')
      {
        $iframeSrc .= "?" . $parentQueryString;
      }
    
      $iframeSrc = esc_url($iframeSrc, array('http', 'https'));

      return "<iframe src=\"$iframeSrc\" width=\"{$params['width']}\" height=\"{$params['height']}\" style=\"border:0\"></iframe>";
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
      'drive.google.com',
      'youtube.com',
      'excition.com',
      'uwregents.wufoo.com',
      'www.uw.edu',
      'catalyst.uw.edu',
      'www.washington.edu',
      'depts.washington.edu',
      'online.gifts.washington.edu',
      'secure.gifts.washington.edu',
      'payroll.gifts.washington.edu',
      'helperapps.gifts.washington.edu',
      'uwfoundation.org',
      'support.gifts.washington.edu',
      'www.uwfoundation.org',
      'www.surveygizmo.com',
      'www.google.com',
      'www.excition.com',
      'www.youtube.com',
      'pgcalc.com',
      'www.pgcalc.com',
      'matchinggifts.com',
      'www.matchinggifts.com',
      'embed.pac-12.com',
      'storify.com',
      'w.soundcloud.com',
      'api.soundcloud.com',
      'flickr.com',
      'vimeo.com',
      'player.vimeo.com',
      'www.facebook.com',
      'form.jotform.com',
      'oga-dev.s.uw.edu', //testing
      'bitools.uw.edu', //testing
      'tableau.washington.edu',
      'www.iqmediacorp.com',
      'fusiontables.google.com',
      'myuwgiving.gifts.washington.edu',
      'cdn.knightlab.com',
      'uploads.knightlab.com',
    );
  }


}
