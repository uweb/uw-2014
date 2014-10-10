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
        $this->add_menu_item( 'About', 'http://uw.edu/about/' );
        $this->add_menu_item( 'Diversity', 'http://uw.edu/diversity/', $parent = 'About' );
        $this->add_menu_item( 'Leadership', 'http://uw.edu/leadership/', $parent = 'About' );
        $this->add_menu_item( 'Maps', 'http://uw.edu/maps/', $parent = 'About' );
        $this->add_menu_item( 'Sustainability', 'http://green.uw.edu/', $parent = 'About' );
        $this->add_menu_item( 'Visit', 'http://uw.edu/visit/', $parent = 'About' );

        // The default Academics dropdown.
        $this->add_menu_item( 'Academics', 'http://uw.edu/discover/academics/' );
        $this->add_menu_item( 'Academic Calendar', 'http://www.washington.edu/students/reg/calendar.html', $parent = 'Academics' );
        $this->add_menu_item( 'Academic Departments', 'http://uw.edu/discover/academics/departments/', $parent = 'Academics' );
        $this->add_menu_item( 'College & Schools', 'http://uw.edu/discover/academics/', $parent = 'Academics' );
        $this->add_menu_item( 'Libraries', 'http://lib.washington.edu', $parent = 'Academics' );
        $this->add_menu_item( 'Research', 'http://uw.edu/research/', $parent = 'Academics');
        $this->add_menu_item( 'Time Schedule', 'http://uw.edu/students/timeschd/', $parent = 'Academics');

        // the default Admissions dropdown.
        $this->add_menu_item( 'Apply', 'http://uw.edu/admissions/' );
        $this->add_menu_item( 'Course Descriptions', 'http://www.washington.edu/students/crscat/', $parent = 'Apply' );
        $this->add_menu_item( 'Majors', 'http://www.washington.edu/uaa/advising/majors-and-minors/list-of-undergraduate-majors/', $parent = 'Apply' );
        $this->add_menu_item( 'Transfer Credit Policies', 'http://admit.washington.edu/Requirements/Transfer/Plan/CreditPolicies', $parent = 'Apply' );
        $this->add_menu_item( 'Tuition & Fees', 'http://f2.washington.edu/fm/sfs/tuition', $parent = 'Apply' );

        // The default Campus Life dropdown.
        $this->add_menu_item( 'Student Life', 'http://studentlife.washington.edu/' );
        $this->add_menu_item( 'Housing and Dining', 'http://www.hfs.washington.edu/', $parent = 'Student Life' );
        $this->add_menu_item( 'Student Organizations', 'http://depts.washington.edu/sao/', $parent = 'Student Life' );
        $this->add_menu_item( 'Recreational Sports', 'http://uw.edu/ima', $parent = 'Student Life' );
        $this->add_menu_item( 'Safety', 'http://uw.edu/safety', $parent = 'Student Life' );
        $this->add_menu_item( 'Transportation', 'http://www.washington.edu/facilities/transportation/', $parent = 'Student Life' );

        // The default News dropdown.
        $this->add_menu_item( 'News', 'http://uw.edu/news/' );
        $this->add_menu_item( 'Campus Events', 'http://uw.edu/calendar', $parent = 'News' );
        $this->add_menu_item( 'Arts UW', 'http://artsuw.org', $parent = 'News' );
        $this->add_menu_item( 'Husky Sports', 'http://gohuskies.com', $parent = 'News' );

        // The default Support the UW dropdown.
        $this->add_menu_item( 'Support the UW', 'http:/uw.edu/giving' );
        $this->add_menu_item( 'Donate', 'https://www.washington.edu/giving/make-a-gift/', $parent = 'Support the UW' );
        $this->add_menu_item( 'Volunteer', 'http://www.washington.edu/alumni/act/volunteer.html', $parent = 'Support the UW' );

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
