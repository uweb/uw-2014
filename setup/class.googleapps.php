<?php

class UW_GoogleApps
{

  ## todo: does the iframe to shortcode need to exist or is the iframe list of domains enough
  function __construct()
  {
    ## Turns an iframe into a shortcode for parsing
    add_filter( 'pre_kses', array( $this, 'uw_google_calendar_embed_to_shortcode' ) );
    ## GoogleApps shortcode
    add_shortcode( 'googleapps', array( $this, 'uw_google_calendar_shortcode' ) );
  }

  function uw_google_calendar_shortcode( $atts )
  {

      $params = shortcode_atts( array(
        'query'   => '',
        'dir'     => '',
        'domain'  => 'www',
        'width'   => 620,
        'height'  => 500,
      ), $atts );
      extract($params);

      if ( $dir == 'calendar/embed' )
  	    return '<div class="googleapps-'. $app .'"><iframe width="' . $width . '" height="' . $height . '" style="border:0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/calendar/embed?' . $query . '"></iframe></div>';

      return '';
  }

  function uw_google_calendar_embed_to_shortcode( $content )
  {
    if ( false === strpos( $content, '<iframe ' ) && false === strpos( $content, 'google.com/calendar' ) )
      return $content;


	  $content = preg_replace_callback( '#&lt;iframe\s[^&]*?(?:&(?!gt;)[^&]*?)*?src="https?://.*?\.google\.(.*?)/(.*?)\?(.+?)"[^&]*?(?:&(?!gt;)[^&]*?)*?&gt;\s*&lt;/iframe&gt;\s*(?:&lt;br\s*/?&gt;)?\s*#i', array( $this, 'uw_google_calendar_embed_to_shortcode_callback'), $content );

	  $content = preg_replace_callback( '!\<iframe\s[^>]*?src="https?://.*?\.google\.(.*?)/(.*?)\?(.+?)"[^>]*?\>\s*\</iframe\>\s*!i', array( $this, 'uw_google_calendar_embed_to_shortcode_callback'), $content );

    return $content;
  }

  function uw_google_calendar_embed_to_shortcode_callback ( $match )
  {
  	if ( preg_match( '/\bwidth=[\'"](\d+)/', $match[0], $width ) ) {
  		$width = min( array( (int) $width[1] , 630 ) );
  	} else {
  		$width = 630;
  	}

  	if ( preg_match( '/\bheight=[\'"](\d+)/', $match[0], $height ) ) {
  		$height = (int) $height[1];
  	} else {
  		$height = 500;
  	}
    $url = $match[3];

    return "[googleapps domain=\"www\" dir=\"calendar/embed\" query=\"$url\" width=\"$width\" height=\"$height\"]";
  }

}
