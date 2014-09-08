<?php
// UW Filters
//
// These are filters the UW 2014 theme adds and globally uses.

class UW_Filters
{

  function __construct()
  {

    // Custom UW Filters
    add_filter( 'italics', array( $this, 'italicize') );
    add_filter( 'abbreviation', array( $this, 'abbreviate') );

    // Global filters
    // allow shortcodes in text widgets
    add_filter( 'widget_text', 'do_shortcode' );
    add_filter( 'body_class', array( $this, 'uw_custom_body_classes' ) );

  }

  function uw_custom_body_classes( $classes )
  {

    if ( is_multisite() )
        $classes[] = 'site-'. sanitize_html_class( str_replace( 'cms', '', get_blog_details( get_current_blog_id() )->path ) );

    return $classes;

  }

  /**
   * Filter that returns the same content but with words from the
   *  Italicized words setting in italics.
   */
  function italicize( $content )
  {

    $words = explode(' ', get_option('italicized_words') );

    if ( 1 == sizeof( $words ) )
    {
      echo $content;
      return;
    }

    $words = array_filter(array_map('trim', $words));

    $regex = '/\b(' . implode("|", $words) . ')\b/i';

    $new_content = preg_replace($regex, "<em>$1</em>", $content);

    if ( in_array('&', $words) )
      $new_content = str_replace( array( ' &#038; ', ' & ', ' &amp; ' ) , ' <em>&</em> ', $new_content);

    echo $new_content;

  }


  /**
   * Returns the abbreviated title if it exists, otherwise the site title
   */
  function abbreviate( $title )
  {
     $abbr = get_option('abbreviation');

     if (! $abbr )
       return $title;

     return $abbr;
  }


}
