<?php

//
// UW Dropdown Menus
//

if ( ! function_exists( 'uw_dropdowns') )
{

  function uw_dropdowns()
  {

    // $nav = has_nav_menu(UW_Dropdowns::LOCATION);

    // if ( ( !$nav ) && ( is_multisite() ) )
    // {
    //   switch_to_blog(1);
    // }
    echo
        '<div id="dawgdrops" aria-label="Main menu" role="navigation">
          <h3 class="assistive-text">Main menu</h3>';

          wp_nav_menu( array(
            'theme_location'  => UW_Dropdowns::LOCATION,
            'container_class' => 'dawgdrops-inner container',
            'menu_class'      => 'dawgdrops-nav',
            'fallback_cb'     => '',
            'walker'          => new UW_Dropdowns_Walker_Menu()
          ) );

    echo '</div>';

    // if ( ( !$nav ) && ( is_multisite() ) )
    // {
    //   restore_current_blog();
    // }

  }

}

if ( ! function_exists('uw_sidebar') ) :

  function uw_sidebar()
  {
    global $post;


    $children = get_children(array(
      'post_parent' => $post->ID
    ) );
    $parent = get_post( $post->post_parent );

    echo '<ul class="first-level">';
    wp_list_pages(array(
      'title_li' => '<a href="'.get_bloginfo('url').'" title="Home" class="homelink">Home</a>',
      'child_of' => $parent->post_parent ? $parent->post_parent : $post->post_parent,
      // 'child_of' => $post->post_parent,
      'depth' => 2,
    ));
    echo '</ul>';
  }

endif;


if( ! function_exists('get_uw_breadcrumbs') ) :

  function get_uw_breadcrumbs()
  {

    global $post;

    $ancestors = array_reverse( get_post_ancestors( $post->ID ) );

    if ( !is_home() || ! is_front_page() )
      $ancestors[] = $post->ID;

    $html = '<li><a href="http://uw.edu" title="University of Washington">Home</a></li>';
    $html .= '<li' . ($ancestors ? '' : ' class="current"') . '><a href="' . get_bloginfo('url') . '" title="' . get_bloginfo('title') . '">' . get_bloginfo('title') . '</a><li>';

    foreach ( $ancestors as $index=>$ancestor )
    {
      $class      = $index+1 == count($ancestors) ? ' class="current" ' : '';
      $page       = get_post( $ancestor );
      $url        = get_permalink( $page->ID );
      $title_attr = esc_attr( $page->post_title );
      $html .= "<li $class><a href=\"$url\" title=\"{$title_attr}\">{$page->post_title}</a>";
    }

    return "<div class=\"uw-breadcrumbs\"><ul>$html</ul></div>";
  }

endif;

if( ! function_exists('uw_breadcrumbs') ) :

  function uw_breadcrumbs()
  {
    echo get_uw_breadcrumbs();
  }

endif;
