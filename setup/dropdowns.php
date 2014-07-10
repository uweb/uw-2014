<?php

/**
 *  UW_MenuItem is an object used by UW_Dropdowns to create a default menu
 */
class UW_MenuItem {
    public $args;
    public $child_items;

    function __construct()
    {
        $args = func_get_args();
        $num_args = func_num_args();
        if ($num_args == 2){
            $this->constructBase($args);
        }
        else {
            $this->constructChildren($args);
        }
    }

    private function constructBase($args)   //$args[0] is name, $args[1] is url
    {
        $this->args = array(
            'menu-item-title'  => __($args[0]),
            'menu-item-url'    => $args[1],
            'menu-item-status' => 'publish',
        );
    }

    private function constructChildren($args) //$args[2] is array of children
    {
        $this->child_items = array_pop($args);
        $this->constructBase($args);
    }

    public function setParentItemID($id)
    {
        $this->args['menu-item-parent-id'] = $id;
    }
}


/**
 * UW Dropdowns
 * This installs the default dropdowns for the UW Theme
 */
class UW_Dropdowns
{

    const NAME         = 'White Bar';
    const LOCATION     = 'white-bar';
    const DISPLAY_NAME = 'Dropdowns';

    function UW_Dropdowns()
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
        $menu_items = $this->menu_list();
        $this->MENU_ID = wp_create_nav_menu( self::DISPLAY_NAME );

        // wp_create_nav_menu returns a WP_Error if the menu already exists;
        if ( is_wp_error( $this->MENU_ID ) ) return;


        //      Each site in the network will have a different menu item ID for each thing.  Make the first menu and save its id
        //      then set that ID as the menu-item-parent-id for each child.  Then save each child.
        //      We can add another layer of depth for grandchildren
        foreach ( $menu_items as $menu_item ) {
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

    function menu_list()
    {

        $discover           = new UW_MenuItem ('Discover', 'http://uw.edu/discover/', array(
                                                                            new UW_MenuItem('Vision and Values', 'http://uw.edu/discover/visionvalues'),
                                                                            new UW_MenuItem('Mission Statement', 'http://uw.edu/admin/rules/policies/BRG/RP5.html'),
                                                                        ));

        $current_students   = new UW_MenuItem('Current Students', 'http://uw.edu/students/');

        $future_students    = new UW_MenuItem('Future Students', 'http://uw.edu/discover/admissions/');

        $faculty_staff      = new UW_MenuItem('Faculty & Staff', 'http://uw.edu/facultystaff/');

        $alumni             = new UW_MenuItem('Alumni', 'http://uw.edu/alumni/');

        $nw_neighbors       = new UW_MenuItem('NW Neighbors', 'http://uw.edu/nwneighbors/');

        return array($discover, $current_students, $future_students, $faculty_staff, $alumni, $nw_neighbors);
    }

}

new UW_Dropdowns();
