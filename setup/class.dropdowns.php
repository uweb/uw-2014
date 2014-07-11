<?php

/**
 * UW Dropdowns
 * This installs the default dropdowns for the UW Theme
 */

class Dropdowns
{

    const NAME         = 'White Bar';
    const LOCATION     = 'white-bar';
    const DISPLAY_NAME = 'Dropdowns';

    public static $menu_items;

    function __construct()
    {
        $this->instantiate_menu_list();
        $this->add_hooks();
    }

    private function instantiate_menu_list()
    {

        $discover           = new MenuItem ('Discover', 'http://uw.edu/discover/', array(
                                                                            new MenuItem('Vision and Values', 'http://uw.edu/discover/visionvalues'),
                                                                            new MenuItem('Mission Statement', 'http://uw.edu/admin/rules/policies/BRG/RP5.html'),
                                                                        ));

        $current_students   = new MenuItem('Current Students', 'http://uw.edu/students/');

        $future_students    = new MenuItem('Future Students', 'http://uw.edu/discover/admissions/');

        $faculty_staff      = new MenuItem('Faculty & Staff', 'http://uw.edu/facultystaff/');

        $alumni             = new MenuItem('Alumni', 'http://uw.edu/alumni/');

        $nw_neighbors       = new MenuItem('NW Neighbors', 'http://uw.edu/nwneighbors/');

        $this->menu_items = array($discover, $current_students, $future_students, $faculty_staff, $alumni, $nw_neighbors);
    }

    function add_hooks()
    {
        add_action( 'after_setup_theme', array( $this, 'register_white_bar_menu') );
        add_action( 'after_setup_theme', array( $this, 'install_default_white_bar_menu') );
    }

    function register_white_bar_menu()
    {
	    register_nav_menu( self::LOCATION, __( self::NAME ) );
    }

    function install_default_white_bar_menu()
    {
        $this->MENU_ID = wp_create_nav_menu( self::DISPLAY_NAME );

        // wp_create_nav_menu returns a WP_Error if the menu already exists;
        if ( is_wp_error( $this->MENU_ID ) ) return;


        //      Each site in the network will have a different menu item ID for each thing.  Make the first menu and save its id
        //      then set that ID as the menu-item-parent-id for each child.  Then save each child.
        //      We can add another layer of depth for grandchildren
        foreach ( $this->menu_items as $menu_item ) {
            $nav_item_id = wp_update_nav_menu_item( $this->MENU_ID, $menu_item_db_id=0, $menu_item->args );
            if (!empty($menu_item->child_items)) {
                foreach ( $menu_item->child_items as $child_item ){
                    $child_item->setParentItemID($nav_item_id);
                    wp_update_nav_menu_item($this->MENU_ID, $menu_item_db_id=0, $child_item->args);
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
}
