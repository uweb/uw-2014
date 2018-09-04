<?php

/**
 * UW thin strip menu
 * This installs the default dropdowns for the UW thin strip
 */

class UW_Thin_Strip_Menu
{

    const NAME           = 'Thin Strip Menu';
    const LOCATION       = 'thin-strip';
    const DISPLAY_NAME   = 'Thin Strip Menu';
    const DEFAULT_STATUS = 'publish';

    function __construct()
    {
        $this->menu_items = array();
        add_action( 'after_setup_theme', array( $this, 'register_thin_strip_menu') );
        add_action( 'after_setup_theme', array( $this, 'install_default_thin_strip_menu') );
        add_action( 'wp_update_nav_menu', array( $this, 'save_thin_strip') );
    }

    function register_thin_strip_menu()
    {
        register_nav_menu( self::LOCATION, __( self::NAME ) );
    }

    function install_default_thin_strip_menu()
    {

        $this->generate_menu_list();
        $this->MENU_ID = wp_create_nav_menu( self::DISPLAY_NAME );

        // wp_create_nav_menu returns a WP_Error if the menu already exists;
        if ( is_wp_error( $this->MENU_ID ) ) return;


        //      Each site in the network will have a different menu item ID for each thing.  Make the first menu and save its id
        //      then set that ID as the menu-item-parent-id for each child.  Then save each child.
        foreach ( $this->menu_items as $menu_name => $menu_attributes ) {

            // $children = $menu_attributes['children'];

            unset( $menu_attributes['children'] );


            $parent_id = wp_update_nav_menu_item( $this->MENU_ID, $menu_item_db_id=0, $menu_attributes );

            // if ( $children )
            // {
            //     foreach ( $children as $submenu){
            //         $submenu['menu-item-parent-id'] = $parent_id;
            //         wp_update_nav_menu_item($this->MENU_ID, $menu_item_db_id=0, $submenu);
            //     }
            // }
        }

        $this->set_uw_menu_location();
    }

    function set_uw_menu_location()
    {
        $locations = (ARRAY) get_theme_mod( 'nav_menu_locations' );
        $locations[ 'thin-strip' ] = $this->MENU_ID;
        set_theme_mod( 'nav_menu_locations', $locations );
    }

     function generate_menu_list()
     {

        // The default About dropdown.
        $this->add_menu_item( 'Students', 'http://uw.edu/studentlife' );


        // The default Academics dropdown.
        $this->add_menu_item( 'Parents', 'http://uw.edu/parents' );


        // the default Admissions dropdown.
        $this->add_menu_item( 'Faculty & Staff', 'http://uw.edu/facultystaff' );


        // The default News dropdown.
        $this->add_menu_item( 'Alumni', 'http://uw.edu/alumni' );


    }

    function add_menu_item( $name, $url, $parent=null )
    {
        $item['menu-item-title']    = $name;
        $item['menu-item-url']      = $url;
        $item['menu-item-status']   = self::DEFAULT_STATUS;


        if ( $parent )
            $this->menu_items[ $parent ]['children'][$name] = $item;
        else
            $this->menu_items[$name] = $item;

    }

    function save_thin_strip($menu_id){
        $menu_object = wp_get_nav_menu_object( $menu_id );
        if($menu_object->slug === 'thin-strip'){
            if (!current_user_can('Super Admin')){
                wp_die('Insufficient permission: can not edit the default dropdowns menu.');
            }
        }
    }

}
