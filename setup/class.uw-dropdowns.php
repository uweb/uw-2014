<?php

/**
 * UW Dropdowns
 * This installs the default dropdowns for the UW Theme
 */

class UW_Dropdowns
{

    const NAME         = 'White Bar';
    const LOCATION     = 'white-bar';
    const DISPLAY_NAME = 'Dropdowns';

    // public static $menu_items;

    function __construct()
    {
        $this->instantiate_menu_list();
        $this->add_hooks();
    }

    private function instantiate_menu_list()
    {

        $about              = new MenuItem ('About', 'http://uw.edu/', array(
                                                                            new MenuItem('Campuses', 'http://uw.edu/'),
                                                                            new MenuItem('Leadership', 'http://uw.edu/'),
                                                                            new MenuItem('Visit', 'http://uw.edu/'),
                                                                        ));

        $academics          = new MenuItem ('Academics', 'http://uw.edu/', array(
                                                                            new MenuItem('Colleges & Schools', 'http://uw.edu/'),
                                                                            new MenuItem('Programs', 'http://uw.edu/'),
                                                                            new MenuItem('Libraries', 'http://uw.edu/'),
                                                                            new MenuItem('Research', 'http://uw.edu/'),
                                                                        ));

        $admissions         = new MenuItem ('Admissions', 'http://uw.edu/', array(
                                                                            new MenuItem('Undergraduate', 'http://uw.edu/'),
                                                                            new MenuItem('Graduate', 'http://uw.edu/'),
                                                                            new MenuItem('Tuition & Fees', 'http://uw.edu/'),
                                                                            new MenuItem('Continuing Education', 'http://uw.edu/'),
                                                                        ));

        $campus_life        = new MenuItem ('Campus Life', 'http://uw.edu/', array(
                                                                            new MenuItem('Diversity', 'http://uw.edu/'),
                                                                            new MenuItem('Housing & Dining', 'http://uw.edu/'),
                                                                            new MenuItem('Student Organizations', 'http://uw.edu/'),
                                                                            new MenuItem('Recreational Sports', 'http://uw.edu/'),
                                                                            new MenuItem('Safety', 'http://uw.edu/'),
                                                                            new MenuItem('Student Life', 'http://uw.edu/'),
                                                                            new MenuItem('Transportation & Parking', 'http://uw.edu/'),
                                                                        ));

        $news               = new MenuItem('News', 'http://uw.edu/nwneighbors/');


        $support_the_uw     = new MenuItem ('Support the UW', 'http://uw.edu/', array(
                                                                            new MenuItem('Donate', 'http://uw.edu/'),
                                                                            new MenuItem('Volunteer', 'http://uw.edu/'),
                                                                        ));


        $this->menu_items = array($about, $academics, $admissions, $campus_life, $news, $support_the_uw);
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
