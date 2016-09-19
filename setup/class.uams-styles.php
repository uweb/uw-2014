<?php

/**
 * Install stylesheets
 *    - bloginfo('template_directory')  gives you the url to the parent theme
 *    - bloginfo('stylesheet_directory')  gives you the url to the child theme
 */

class UAMS_Styles
{

  public $STYLES;

  function __construct()
  {
    $this->STYLES = array(

      'google-font-open' => array(
          'id'      => 'google-font-open',
          'url'     => 'https://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700',
          'deps'    => array(),
          'version' => '3.6',
          'admin'   => true
      ),

      'uams-master' => array (
        'id'      => 'uams-master',
        'url'     => get_bloginfo( 'template_url' ) . '/style' . $this->dev_stylesheet() . '.css',
        'deps'    => array(),
        'version' => '3.6'
      ),

      'uams-style' => array (
          'id'      => 'uams-style',
          'url'     => get_bloginfo('stylesheet_url'),
          'deps'    => array('uams-master'),
          'version' => '3.6',
          'child'   => true
      ),

    );

    add_action( 'wp_enqueue_scripts', array( $this, 'uams_register_default_styles' ) );
    add_action( 'wp_enqueue_scripts', array( $this, 'uams_enqueue_default_styles' ) );
    add_action( 'admin_head', array( $this, 'uams_enqueue_admin_styles' ) );

  }

  function uams_register_default_styles()
  {
      foreach ( $this->STYLES as $style )
      {
        $style = (object) $style;

        wp_register_style(
          $style->id,
          $style->url,
          $style->deps,
          $style->version
        );

      }

  }

  function uams_enqueue_default_styles()
  {
      wp_enqueue_style( 'uams-master' );
      foreach ( $this->STYLES as $style )
      {
        $style = (object) $style;

        if ( array_key_exists( 'child', $style )
              && $style->child && ! $this->is_child_theme() )
          continue;

        wp_enqueue_style( $style->id );

      }

  }

  function uams_enqueue_admin_styles()
  {
    if ( ! is_admin() )
      return;

    foreach ( $this->STYLES as $style )
    {

      $style = (object) $style;

      if ( array_key_exists( 'admin', $style)
            && $style->admin )
      {
        wp_register_style(
          $style->id,
          $style->url,
          $style->deps,
          $style->version
        );

        wp_enqueue_style( $style->id );
      }

    }

  }

  function is_child_theme()
  {
    return get_bloginfo( 'template_directory' ) != get_bloginfo( 'stylesheet_directory' );
  }

  function dev_stylesheet()
  {
    return is_user_logged_in() ? '.dev' : '';
  }

}
