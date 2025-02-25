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

    $post_format = isset( $post->ID ) ? get_post_format( $post->ID ) : false;

    return $post_format != 'gallery' || is_archive() || is_search() || is_404();
  }
endif;

if ( ! function_exists( 'uw_dropdowns') ) :
  function uw_dropdowns()
  {

    echo '<nav id="dawgdrops" aria-label="Main menu"><div class="dawgdrops-inner container">';

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
    echo sprintf( '<nav id="desktop-relative" aria-label="mobile menu that is not visible in the desktop version">%s</nav>', uw_list_pages() ) ;
  }

endif;

if ( ! function_exists( 'uw_mobile_menu' ) ) :

  function uw_mobile_menu()
  {
    echo sprintf( '<nav id="mobile-relative" aria-label="mobile menu">%s</nav>', uw_list_mobile_pages() ) ;
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
    echo sprintf( '<nav id="mobile-relative" class="frontpage%s" aria-label="mobile menu">%s%s</nav>', $class, $spacer, uw_list_front_page_menu_items() ) ;
  }

endif;

if ( ! function_exists( 'uw_list_pages') ) :

  function uw_list_pages( $mobile = false )
  {
    global $UW;
    global $post;

    if ( !isset( $post ) ) return;

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
              'depth' => 2,
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
    $ancestors = array_reverse( get_post_ancestors( $post ) );
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

    return "<nav class='uw-breadcrumbs' aria-label='breadcrumbs'><ul>$html</ul></nav>";
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

if ( !function_exists('text_cut') ):
  // used in content-page-noheader.php and was also found in content-page.php
    function text_cut($text = '', $length = 27, $dots = true) {
      global $post;
      $parent = get_post($post->post_parent);
      $text = $parent->post_title;
      $text = trim(preg_replace('#[\s\n\r\t]{2,}#', ' ', $text));
      $text_temp = $text;
      while (substr($text, $length, 1) != " ") {
        $length--;
        if ($length > strlen($text)) { break; }
      }
      $text = substr($text, 0, $length);
      return $text . ( ( $dots == true && $text != '' && strlen($text_temp) > $length ) ? '...' : '');
    }

endif;

/**
 * Truncates the given string at the specified length.
 *
 * @param string $str The input string.
 * @param int $width The number of chars at which the string will be truncated.
 * @return string
 */
if ( !function_exists('uw_social_truncate') ):
  function uw_social_truncate($str, $width) {
      return strtok(wordwrap($str, $width, "...\n"), "\n");
  }
endif;

if ( !function_exists('uw_meta_tags') ):
  function uw_meta_tags() {
    global $post;
    // Get the current site's URL
    $url = network_site_url();
    $site_url = home_url();
    $has_post_thumbnail = isset( $post->ID ) ? has_post_thumbnail( $post->ID ) : false;
    if($url = "http://localhost/cms/" || $url = "http://cms.local/" || $url = "http://cmsdev.uw.edu/" || $url = "https://www.washington.edu/cms/"){
      if ($site_url === "https://www.washington.edu/cms/uwclimatesurvey") {
        $og_img = "https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/164/2019/10/16193323/Campus-Climate-Survey-Social-Facebook-1200x630.jpg";

        echo '<meta property="og:image" content="' . $og_img . '" />' . PHP_EOL;
      }
      else if( !$has_post_thumbnail ) { //the post does not have featured image, use a default image
          $default_image = "http://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/10/2019/06/21094817/Univ-of-Washington_Memorial-Way.jpg"; //replace this with a default image on your server or an image in your media library
          echo '<meta property="og:image" content="' . $default_image . '" />' . PHP_EOL;
      }
      else{
        $thumbnail_src = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'large' );
        echo '<meta property="og:image" content="' . esc_attr( $thumbnail_src[0] ) . '" />' . PHP_EOL;
      }

      echo '<meta name="twitter:card" content="summary" />' . PHP_EOL;
      echo '<meta name="twitter:site" content="@uw" />' . PHP_EOL;
      echo '<meta name="twitter:creator" content="@uw" />' . PHP_EOL;
      echo '<meta name="twitter:card" content="summary_large_image" />' . PHP_EOL;
      echo '<meta property="og:title" content="' . html_entity_decode(get_the_title()) . '" />' . PHP_EOL;
      // echo '<meta property="og:type" content="article"/>' . PHP_EOL;
      $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
      echo '<meta property="og:url" content="' . $actual_link . '" />' . PHP_EOL;
      echo '<meta property="og:site_name" content="' . get_bloginfo( 'name' ) . '" />' . PHP_EOL;

      if ( !is_singular()) //if it is not a post or a page
        return;

      if ( trim($post->post_excerpt) != '' ) {
      //If there's an excerpt that's what we'll use
        $fb_desc = trim($post->post_excerpt);
      } else {
      //If not we grab it from the content
        $fb_desc = trim($post->post_content);
      }
      //Trim description
      $fb_desc = trim( str_replace('&nbsp;', ' ', $fb_desc) ); //Non-breaking spaces are usefull on a meta description. We'll just convert them to normal spaces to really trim it
      $fb_desc = trim(wp_strip_all_tags( strip_shortcodes( stripslashes( $fb_desc ), true ) ) );
      $fb_desc = uw_social_truncate($fb_desc, 200);

      echo '<meta property="og:description" content="' . $fb_desc . '" />' . PHP_EOL;
      if (isset($post->type_meta) && $post->type_meta == 'article' && isset($post->author_meta) && $post->author_meta != '') { '<meta property="article:author" content="' . $post->author_meta . '" />' . PHP_EOL; }
      echo "
      " . PHP_EOL;
    }
  }
  add_action( 'wp_head', 'uw_meta_tags', 5 );
endif;