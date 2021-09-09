<?php
/**
 * This is where all the JS files are registered
 *    - bloginfo('template_directory')  gives you the url to the parent theme
 *    - bloginfo('stylesheet_directory')  gives you the url to the child theme
 */

class UW_Scripts
{

  public $SCRIPTS;


  function __construct()
  {

    $multi = is_multisite();

    $parent = get_template();
    $parent_version = wp_get_theme($parent)->get('Version');

    $this->SCRIPTS = array_merge( array(

      'site'   => array (
        'id'        => 'site',
        'url'       => get_bloginfo('template_directory') . '/js/site' . $this->dev_script() . '.js',
        'deps'      => array( 'backbone', 'jquery' ),
        'version'   => $parent_version,
        'admin'     => false,
        'style_dir' => site_url()
        // 'variables' => array( 'is_multisite' =>  $multi ),
      ),

      'admin' => array (
        'id'      => 'wp.admin',
        'url'     => get_bloginfo('template_directory') . '/assets/admin/js/admin.js',
        'deps'    => array( 'jquery' ),
        'version' => $parent_version,
        'admin'   => true
      ),

    ), $this->get_child_theme_scripts() );

    add_action( 'wp_enqueue_scripts', array( $this, 'uw_register_default_scripts' ) );
    add_action( 'wp_enqueue_scripts', array( $this, 'uw_localize_default_scripts' ) );
    add_action( 'wp_enqueue_scripts', array( $this, 'uw_enqueue_default_scripts' ) );
    add_action( 'wp_enqueue_scripts', array( $this, 'uw_script_noconlfict_override' ) );
    add_action( 'admin_enqueue_scripts', array( $this, 'uw_enqueue_admin_scripts' ) );
    add_action( 'customize_controls_init', array( $this, 'uw_customizer_preview' ) );

  }

  function uw_customizer_preview()
  {
    wp_enqueue_script( 'uw-themecustomize', get_bloginfo('template_directory') .'/js/uw.themecustomizer.js', array( 'jquery', 'customize-controls' ), false, true );
  }

  function uw_register_default_scripts()
  {

      foreach ( $this->SCRIPTS as $script )
      {
        $script = (object) $script;

        wp_register_script(
          $script->id,
          $script->url,
          $script->deps,
          $script->version
        );

      }

  }

  function uw_localize_default_scripts()
  {
    $uw_localization = array();
    foreach ($this->SCRIPTS as $script )
    {
      $script = (object) $script;
      if (isset($script->style_dir)){
        wp_localize_script($script->id, 'style_dir', $script->style_dir); //error line
      }
    }
  }

  function uw_enqueue_default_scripts()
  {
      foreach ( $this->SCRIPTS as $script )
      {
        $script = (object) $script;

        if ( ! $script->admin )
          wp_enqueue_script( $script->id );
      }
  }

  function uw_enqueue_admin_scripts()
  {
      if ( ! is_admin() )
        return;

      foreach ( $this->SCRIPTS as $script )
      {
        $script = (object) $script;

        if ( $script->admin )
        {

          wp_register_script(
            $script->id,
            $script->url,
            $script->deps,
            $script->version
          );

          wp_enqueue_script( $script->id );

        }
      }

  }

  private function get_child_theme_scripts()
  {
    return is_array( $this->SCRIPTS) ? $this->SCRIPTS : array();
  }

  public function dev_script()
  {
    return is_user_logged_in() ? '.dev' : '';
  }
  
  /**
   * Add a line of javascript to override WordPress loading jQuery in
   * No Conflict mode. This is to help with legacy jQuery usage.
   */
  function uw_script_noconlfict_override() {
    wp_add_inline_script( 'jquery-core', '$ = jQuery;' );
  }

}
