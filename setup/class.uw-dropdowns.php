<?php

/**
 * UW Dropdowns
 * This installs the default dropdowns for the UW Theme
 */

class UW_Dropdowns
{

    const NAME              = 'White Bar';
    const LOCATION       = 'white-bar';
    const DISPLAY_NAME = 'Dropdowns';
    const DEFAULT_STATUS = 'publish';

    function __construct()
    {
        $this->menu_items = array();
        add_action( 'after_setup_theme', array( $this, 'register_white_bar_menu') );
        add_action( 'after_setup_theme', array( $this, 'install_default_white_bar_menu') );
    }

    function register_white_bar_menu()
    {
        register_nav_menu( self::LOCATION, __( self::NAME ) );
    }

    function install_default_white_bar_menu()
    {

        $this->generate_menu_list();
        $this->MENU_ID = wp_create_nav_menu( self::DISPLAY_NAME );

        // wp_create_nav_menu returns a WP_Error if the menu already exists;
        if ( is_wp_error( $this->MENU_ID ) ) return;


        //      Each site in the network will have a different menu item ID for each thing.  Make the first menu and save its id
        //      then set that ID as the menu-item-parent-id for each child.  Then save each child.
        foreach ( $this->menu_items as $menu_name => $menu_attributes ) {

            $children = $menu_attributes['children'];

            unset( $menu_attributes['children'] );


            $parent_id = wp_update_nav_menu_item( $this->MENU_ID, $menu_item_db_id=0, $menu_attributes );

            if ( $children )
            {
                foreach ( $children as $submenu){
                    $submenu['menu-item-parent-id'] = $parent_id;
                    wp_update_nav_menu_item($this->MENU_ID, $menu_item_db_id=0, $submenu);
                }
            }
        }

        $this->set_uw_menu_location();
    }

    function set_uw_menu_location()
    {
        $locations = (ARRAY) get_theme_mod( 'nav_menu_locations' );
        $locations[ 'white-bar' ] = $this->MENU_ID;
        set_theme_mod( 'nav_menu_locations', $locations );
    }

     function generate_menu_list()
     {

        // The default About dropdown.
        $this->add_menu_item( 'About', 'http://uw.edu/discover/about/' );
        $this->add_menu_item( 'Campuses', '#', $parent = 'About' );
        $this->add_menu_item( 'Leadership', '#', $parent = 'About' );
        $this->add_menu_item( 'Visit', '#', $parent = 'About' );

        // The default Academics dropdown.
        $this->add_menu_item( 'Academics', '#' );
        $this->add_menu_item( 'College & Schools', '#', $parent = 'Academics' );
        $this->add_menu_item( 'Programs', '#', $parent = 'Academics' );
        $this->add_menu_item( 'LIbraries', '#', $parent = 'Academics' );
        $this->add_menu_item( 'Research', '#', $parent = 'Academics' );

        // the default Admissions dropdown.
        $this->add_menu_item( 'Admissions', 'http://uw.edu/admissions/' );
        $this->add_menu_item( 'Undergraduate', '#', $parent = 'Admissions' );
        $this->add_menu_item( 'Graduate', '#', $parent = 'Admissions' );
        $this->add_menu_item( 'Tuition & Fees', '#', $parent = 'Admissions' );
        $this->add_menu_item( 'Continuing Education', '#', $parent = 'Admissions' );

        // The default Campus Life dropdown.
        $this->add_menu_item( 'Campus Life', 'http://uw.edu/admissions/' );
        $this->add_menu_item( 'Diversity', '#', $parent = 'Campus Life' );
        $this->add_menu_item( 'Houseing & Dining', '#', $parent = 'Campus Life' );
        $this->add_menu_item( 'Student Organizations', '#', $parent = 'Campus Life' );
        $this->add_menu_item( 'Recreational Sports', '#', $parent = 'Campus Life' );
        $this->add_menu_item( 'Safety', '#', $parent = 'Campus Life' );
        $this->add_menu_item( 'Student Life', '#', $parent = 'Campus Life' );
        $this->add_menu_item( 'Transportaion & Parking', '#', $parent = 'Campus Life' );

        // The default News dropdown.
        $this->add_menu_item( 'News', 'http://uw.edu/news/' );

        // The default Support the UW dropdown.
        $this->add_menu_item( 'Support the UW', 'http://uw.edu/news/' );
        $this->add_menu_item( 'Donate', '#', $parent = 'Support the UW' );
        $this->add_menu_item( 'Volunteer', '#', $parent = 'Support the UW' );

    }

    function add_menu_item( $name, $url, $parent=null )
    {
        $item['menu-item-title']    = $name;
        $item['menu-item-url']      = $url;
        $item['menu-item-status'] = self::DEFAULT_STATUS;


        if ( $parent )
            $this->menu_items[ $parent ]['children'][$name] = $item;
        else
            $this->menu_items[$name] = $item;

    }

}
