<?php

/**
* UAMS WordPress documentation page
*
* This class provides the documentation for all widgets and shortcodes the UAMS 2016 theme provides
*/
class UAMS_Documentation
{
  const PAGE_TITLE = 'Documentation';
  const MENU_TITLE = 'Documentation';
  const CAPABILITY= 'read';
  const SLUG = 'uams-documentation';

  function __construct()
  {
    add_action('admin_menu', array( $this, 'add_documentation_page' ));
    add_action('admin_enqueue_scripts', array( $this, 'enqueue_markdown_script' ));
  }

  function add_documentation_page() {
    add_menu_page( self::PAGE_TITLE, self::MENU_TITLE, self::CAPABILITY, self::SLUG, array( $this, 'load_documentation_template' ));
  }

  function enqueue_markdown_script()
  {
    // wp_enqueue_style('style', get_stylesheet_uri() );
    wp_enqueue_style( 'uams-documentation', get_template_directory_uri() . '/assets/admin/css/uams.documentation.css' , array( 'google-font-open') );
    wp_enqueue_script( 'showdown', 'https://cdnjs.cloudflare.com/ajax/libs/showdown/0.4.0/Showdown.min.js' );
  }

  function load_documentation_template()
  {
    get_template_part('docs/documentation');
  }
}

new UAMS_Documentation;