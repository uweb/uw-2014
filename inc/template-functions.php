<?php

//
// UW Dropdown Menus
//

if ( ! function_exists('uw_content_class') ) :
  function uw_content_class( $class = '' )
  {
    echo 'class="' . join( ' ', get_uw_content_class( $class ) ) . '"';
  }
endif;

if ( ! function_exists('get_uw_content_class') ) :
  function get_uw_content_class( $class = '' )
  {
    $classes = array( 'uw-content' );
    if ( uw_has_sidebar() )
      $classes[] = 'col-md-8';
    else
      $classes[] = 'col-md-12';

    $classes = array_map( 'esc_attr', $classes );

    return apply_filters( 'uw_content_class', $classes, $class );
  }
endif;

if ( ! function_exists( 'uw_has_sidebar' ) ) :
  function uw_has_sidebar()
  {
    global $post;

    if ( is_404() ) return false;

    return get_post_format( $post->ID ) != 'gallery' || is_archive() || is_search() || is_404();
  }
endif;

if ( ! function_exists( 'uw_dropdowns') ) :
  function uw_dropdowns()
  {

    echo '<nav id="dawgdrops" aria-label="Main menu" role="navigation"><div class="dawgdrops-inner container" role="application">';
          
    echo  wp_nav_menu( array(
            'theme_location'  => UW_Dropdowns::LOCATION,
            'container'       => false,
            //'container_class' => 'dawgdrops-inner container',
            'menu_class'      => 'dawgdrops-nav',
            'fallback_cb'     => '',
            'walker'          => new UW_Dropdowns_Walker_Menu()
          ) );

    echo '</div></nav>';
  }
endif;

if ( ! function_exists('uw_sidebar_menu') ) :

  function uw_sidebar_menu()
  {
    echo sprintf( '<nav id="desktop-relative" role="navigation" aria-label="relative">%s</nav>', uw_list_pages() ) ;
  }

endif;

if ( ! function_exists( 'uw_mobile_menu' ) ) :

  function uw_mobile_menu()
  {
    echo sprintf( '<nav id="mobile-relative" role="navigation" aria-label="relative">%s</nav>', uw_list_mobile_pages() ) ;
  }

endif;

if ( ! function_exists( 'uw_mobile_front_page_menu' ) ) :

  function uw_mobile_front_page_menu($class='')
  {
    $spacer = '';
    if (!empty($class)){
        $class = ' ' . $class;
        $spacer = '<div id="spacer"></div>';

    }
    echo sprintf( '<nav id="mobile-relative" class="frontpage%s" role="navigation" aria-label="relative">%s%s</nav>', $class, $spacer, uw_list_front_page_menu_items() ) ;
  }

endif;

if ( ! function_exists( 'uw_list_pages') ) :

  function uw_list_pages( $mobile = false )
  {
    global $UW;
    global $post;

    $parent = get_post( $post->post_parent );

    if ( ! $mobile && ! get_children( array('post_parent' => $post->ID, 'post_status' => 'publish' ) ) && $parent->ID == $post->ID ) return;

    $toggle = $mobile ? '<button class="uw-mobile-menu-toggle">Menu</button>' : '';
    $class  = $mobile ? 'uw-mobile-menu' : 'uw-sidebar-menu';

    $siblings = get_pages( array (
      'parent'    => $parent->post_parent,
      'post_type' => 'page',
      'exclude'   => $parent->ID
    ) );

    $ids = !is_front_page() ? array_map( function($sibling) { return $sibling->ID; }, $siblings ) : array();

    $pages = wp_list_pages(array(
      'title_li'     => '<a href="'.get_bloginfo('url').'" title="Home" class="homelink">Home</a>',
      'child_of'     => $parent->post_parent,
      'exclude_tree' => $ids,
      'depth'        => 3,
      'echo'         => 0,
      'walker'       => $UW->SidebarMenuWalker
    ));

    $bool = strpos($pages , 'child-page-existance-tester');

    return  $bool && !is_search() ? sprintf( '%s<ul class="%s first-level">%s</ul>', $toggle, $class, $pages ) : '';

  }

endif;

if ( ! function_exists( 'uw_list_mobile_pages' ) ) :

  function uw_list_mobile_pages()
  {
    if ( ! is_front_page() ) {
      $isMenuEmpty = uw_list_pages( $mobile = true );
      $alwaysMobile = get_option('use_main_menu_on_mobile');
      if(empty($isMenuEmpty) && $alwaysMobile){
        return uw_list_front_page_menu_items();
      }
      return $isMenuEmpty;
    }

    $locations = get_nav_menu_locations();

    $menu      = wp_get_nav_menu_object( $locations[ UW_Dropdowns::LOCATION ] );

    if ( ! $menu ) return;

    $items     = wp_get_nav_menu_items( $menu->term_id );

    $toggle    = '<button class="uw-mobile-menu-toggle">Menu</button>';


    foreach( $items as $item )
    {
      if ( $item->menu_item_parent != 0 ) continue;
      $ids[] = $item->object_id;
    }

    $pages = wp_list_pages(array(
      'title_li'     => '<a href="'.get_bloginfo('url').'" title="Home" class="homelink">Home</a>',
      'include'      => implode( ',', $ids ),
      'sort_order'   => 'menu_order',
      'depth'        => 1,
      'echo'         => 0,
      'walker'       => $UW->SidebarMenuWalker
    ));

    return $pages ? sprintf( '%s<ul class="uw-mobile-menu first-level">%s</ul>', $toggle, $pages ) : '';

  }

endif;

if ( ! function_exists( 'uw_list_front_page_menu_items' ) ) :

function uw_list_front_page_menu_items()
{
      $toggle = '<button class="uw-mobile-menu-toggle">Menu</button>';
      $items = wp_nav_menu( array(
              'title_li'     => '<a href="'.get_bloginfo('url').'" title="Home" class="homelink">Home</a>',
              'theme_location'  => UW_Dropdowns::LOCATION,
              'depth' => 1,
              'container_class' => '',
              'menu_class'      => '',
              'fallback_cb'     => '',
              'echo' => false,
              // 'walker'          => new UW_Dropdowns_Walker_Menu()
      ) );

      return $items ? sprintf( '%s<ul class="uw-mobile-menu first-level">%s</ul>', $toggle, $items ) : '';


}

if ( ! function_exists('get_uw_breadcrumbs') ) :

  function get_uw_breadcrumbs()
  {

    global $post;
    $ancestors = array_reverse( get_post_ancestors( $post->ID ) );
    $html = '<li><a href="http://uw.edu" title="University of Washington">Home</a></li>';
    $html .= '<li' . (is_front_page() ? ' class="current"' : '') . '><a href="' . home_url('/') . '" title="' . get_bloginfo('title') . '">' . get_bloginfo('title') . '</a><li>';

    if ( is_404() )
    {
        $html .=  '<li class="current"><span>Woof!</span>';
    } else

    if ( is_search() )
    {
        $html .=  '<li class="current"><span>Search results for ' . get_search_query() . '</span>';
    } else

    if ( is_author() )
    {
        $author = get_queried_object();
        $html .=  '<li class="current"><span> Author: '  . $author->display_name . '</span>';
    } else

    if ( get_queried_object_id() === (Int) get_option('page_for_posts')   ) {
        $html .=  '<li class="current"><span> '. get_the_title( get_queried_object_id() ) . ' </span>';
    }

    // If the current view is a post type other than page or attachment then the breadcrumbs will be taxonomies.
    if( is_category() || is_single() || is_post_type_archive() )
    {

      if ( is_post_type_archive() )
      {
        $posttype = get_post_type_object( get_post_type() );
        //$html .=  '<li class="current"><a href="'  . get_post_type_archive_link( $posttype->query_var ) .'" title="'. $posttype->labels->menu_name .'">'. $posttype->labels->menu_name  . '</a>';
        $html .=  '<li class="current"><span>'. $posttype->labels->menu_name  . '</span>';
      }

      if ( is_category() )
      {
        $category = get_category( get_query_var( 'cat' ) );
        //$html .=  '<li class="current"><a href="'  . get_category_link( $category->term_id ) .'" title="'. get_cat_name( $category->term_id ).'">'. get_cat_name($category->term_id ) . '</a>';
        $html .=  '<li class="current"><span>'. get_cat_name($category->term_id ) . '</span>';
      }

      if ( is_single() )
      {
        if ( has_category() )
        {
          $thecat = get_the_category( $post->ID  );
          $category = array_shift( $thecat ) ;
          $html .=  '<li><a href="'  . get_category_link( $category->term_id ) .'" title="'. get_cat_name( $category->term_id ).'">'. get_cat_name($category->term_id ) . '</a>';
        }
        if ( uw_is_custom_post_type() )
        {
          $posttype = get_post_type_object( get_post_type() );
          $archive_link = get_post_type_archive_link( $posttype->query_var );
          if (!empty($archive_link)) {
            $html .=  '<li><a href="'  . $archive_link .'" title="'. $posttype->labels->menu_name .'">'. $posttype->labels->menu_name  . '</a>';
          }
          else if (!empty($posttype->rewrite['slug'])){
            $html .=  '<li><a href="'  . site_url('/' . $posttype->rewrite['slug'] . '/') .'" title="'. $posttype->labels->menu_name .'">'. $posttype->labels->menu_name  . '</a>';
          }
        }
        $html .=  '<li class="current"><span>'. get_the_title( $post->ID ) . '</span>';
      }
    }

    // If the current view is a page then the breadcrumbs will be parent pages.
    else if ( is_page() )
    {

      if ( ! is_home() || ! is_front_page() )
        $ancestors[] = $post->ID;

      if ( ! is_front_page() )
      {
        foreach ( array_filter( $ancestors ) as $index=>$ancestor )
        {
          $class      = $index+1 == count($ancestors) ? ' class="current" ' : '';
          $page       = get_post( $ancestor );
          $url        = get_permalink( $page->ID );
          $title_attr = esc_attr( $page->post_title );
          if (!empty($class)){
            $html .= "<li $class><span>{$page->post_title}</span></li>";
          }
          else {
            $html .= "<li><a href=\"$url\" title=\"{$title_attr}\">{$page->post_title}</a></li>";
          }
        }
      }

    }

    return "<nav class='uw-breadcrumbs' role='navigation' aria-label='breadcrumbs'><ul>$html</ul></nav>";
  }

endif;

if ( ! function_exists('uw_breadcrumbs') ) :

  function uw_breadcrumbs()
  {
    echo get_uw_breadcrumbs();
  }

endif;

endif;

if ( ! function_exists( 'uw_thumbnail_url' ) ) :
  function uw_thumbnail_url( $size = 'original' )
  {
    echo uw_get_thumbnail_url( $size );
  }
endif;

if ( ! function_exists( 'uw_get_thumbnail_url' ) ) :
  function uw_get_thumbnail_url( $size = 'original' )
  {
    $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id(), 'original', true);
    return $thumbnail[0];
  }
endif;

if ( ! function_exists( 'is_pdf' ) ):

  function is_pdf() {
    return get_post_mime_type() == 'application/pdf';
  }

endif;

if ( ! function_exists( 'uw_get_sticky_posts' ))  :
   function uw_get_sticky_posts( $args = null )
  {
    $stickyposts = get_option( 'sticky_posts' );

    $defaults = array( 'post__in' => $stickyposts );

    $options = wp_parse_args( $args, $defaults );

    return get_posts(  $options );
  }
endif;

if ( ! function_exists('uw_is_custom_post_type') ) :

  function uw_is_custom_post_type()
  {
    return get_post_type() ? array_key_exists(  get_post_type(),  get_post_types( array( '_builtin'=>false) ) ) : true;
  }

endif;

if ( !function_exists('uw_site_title')):

    function uw_site_title()
    {
        $classes = 'uw-site-title';
        if (get_option('overly_long_title')){
            $classes .= ' long-title';
        }
        echo '<a href="' . home_url('/') . '" title="' . esc_attr( get_bloginfo() ) . '"><div class="' . $classes . '">' . get_bloginfo() . '</div></a>';
    }

endif;
