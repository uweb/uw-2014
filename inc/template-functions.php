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
