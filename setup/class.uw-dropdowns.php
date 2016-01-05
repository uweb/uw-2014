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
        add_action( 'wp_update_nav_menu', array( $this, 'save_white_bar') );
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
        $this->add_menu_item( 'About the UW', 'http://uw.edu/about/', $parent = 'About' );
        $this->add_menu_item( 'Diversity', 'http://uw.edu/diversity/', $parent = 'About' );
        $this->add_menu_item( 'Leadership', 'http://uw.edu/leadership/', $parent = 'About' );
        $this->add_menu_item( 'Maps', 'http://uw.edu/maps/', $parent = 'About' );
        $this->add_menu_item( 'Sustainability', 'http://green.uw.edu/', $parent = 'About' );
        $this->add_menu_item( 'Visit', 'http://uw.edu/visit/', $parent = 'About' );

        // The default Academics dropdown.
        $this->add_menu_item( 'Academics', 'http://uw.edu/about/academics/' );
        $this->add_menu_item( 'Academic Calendar', 'http://www.washington.edu/students/reg/calendar.html', $parent = 'Academics' );
        $this->add_menu_item( 'Academic Departments', 'http://uw.edu/about/academics/departments/', $parent = 'Academics' );
        $this->add_menu_item( 'Colleges & Schools', 'http://uw.edu/about/academics/', $parent = 'Academics' );
        $this->add_menu_item( 'Course Descriptions', 'http://www.washington.edu/students/crscat/', $parent = 'Academics' );
        $this->add_menu_item( 'Registration', 'http://helpcenter.uw.edu/registration-resources/', $parent = 'Academics' );
        $this->add_menu_item( 'Student Guide', 'http://www.washington.edu/students/', $parent = 'Academics' );
        $this->add_menu_item( 'Time Schedule', 'http://uw.edu/students/timeschd/', $parent = 'Academics');

        // the default Admissions dropdown.
        $this->add_menu_item( 'Apply', 'http://uw.edu/admissions/' );
        $this->add_menu_item( 'Admissions', 'http://uw.edu/admissions/', $parent = 'Apply' );
        $this->add_menu_item( 'Continuing Education', 'http://www.pce.uw.edu/', $parent = 'Apply' );
        $this->add_menu_item( 'Financial Aid', 'http://www.washington.edu/students/osfa/', $parent = 'Apply' );
        $this->add_menu_item( 'Majors', 'http://www.washington.edu/uaa/advising/majors-and-minors/list-of-undergraduate-majors/', $parent = 'Apply' );
        $this->add_menu_item( 'Student Housing', 'http://uw.edu/about/housing', $parent = 'Apply' );
        $this->add_menu_item( 'Summer Quarter', 'http://www.summer.washington.edu/', $parent = 'Apply' );
        $this->add_menu_item( 'Transfer Credit Policies', 'http://admit.washington.edu/Requirements/Transfer/Plan/CreditPolicies', $parent = 'Apply' );
        $this->add_menu_item( 'Tuition & Fees', 'http://f2.washington.edu/fm/sfs/tuition', $parent = 'Apply' );
        $this->add_menu_item( 'Undocumented students', 'http://www.washington.edu/admissions/undocumented/', $parent = 'Apply' );
        $this->add_menu_item( 'UW Online', 'http://www.pce.uw.edu/online/', $parent = 'Apply' );

        // The default News dropdown.
        $this->add_menu_item( 'News & Events', 'http://uw.edu/news/' );
        $this->add_menu_item( 'UW Today', 'http://uw.edu/news/', $parent = 'News & Events' );
        $this->add_menu_item( 'Arts UW', 'http://artsuw.org', $parent = 'News & Events' );
        $this->add_menu_item( 'Calendar', 'http://uw.edu/calendar/', $parent = 'News & Events' );
        $this->add_menu_item( 'Husky Sports', 'http://gohuskies.com', $parent = 'News & Events' );

        // The default Research the UW dropdown.
        $this->add_menu_item( 'Research', 'http://uw.edu/research/' );
        $this->add_menu_item( 'Researcher resources', 'http://www.washington.edu/research/', $parent = 'Research' );
        $this->add_menu_item( 'Collaboration', 'http://depts.washington.edu/research/fostering-collaboration/', $parent = 'Research' );
        $this->add_menu_item( 'Funding opportunities', 'http://www.washington.edu/research/funding/opportunities/', $parent = 'Research' );
        $this->add_menu_item( 'Stats and rankings', 'http://www.washington.edu/research/spotlight/ranking/', $parent = 'Research' );
        $this->add_menu_item( 'Undergraduate research', 'http://www.washington.edu/research/urp/', $parent = 'Research' );

        // The default Campuses the UW dropdown.
        $this->add_menu_item( 'Campuses', 'http://uw.edu/about' );
        $this->add_menu_item( 'Bothell', 'http://www.bothell.washington.edu/', $parent = 'Campuses' );
        $this->add_menu_item( 'Seattle', 'http://uw.edu/about', $parent = 'Campuses' );
        $this->add_menu_item( 'Tacoma', 'http://www.tacoma.uw.edu/', $parent = 'Campuses' );

        // The default Support the UW dropdown.
        $this->add_menu_item( 'Support the UW', 'http://uw.edu/giving' );
        $this->add_menu_item( 'Give to the UW', 'https://www.washington.edu/giving/make-a-gift/', $parent = 'Support the UW' );
        // $this->add_menu_item( 'Volunteer', 'http://www.washington.edu/alumni/act/volunteer.html', $parent = 'Support the UW' );
        


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

    function save_white_bar($menu_id){
        $menu_object = wp_get_nav_menu_object( $menu_id );
        if($menu_object->slug === 'dropdowns'){
            if (!current_user_can('Super Admin')){
                wp_die('Insufficient permission: can not edit the default dropdowns menu.');
            } 
        } 
    }

}
