<?php

/**
 * UW Dropdowns
 * This installs the default dropdowns for the UW Theme
 */

class UW_Dropdowns
{

    const NAME              = 'White Bar';
    const LOCATION          = 'white-bar';
    const DISPLAY_NAME      = 'Dropdowns';
    const DEFAULT_STATUS    = 'publish';

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
        $this->add_menu_item( 'About', 'https://www.washington.edu/about/' );
        $this->add_menu_item( 'About the UW', 'https://www.washington.edu/about/', $parent = 'About' );
        $this->add_menu_item( 'Diversity', 'https://www.washington.edu/diversity/', $parent = 'About' );
        $this->add_menu_item( 'Global Impact', 'https://www.washington.edu/global/', $parent = 'About' );
        $this->add_menu_item( 'Innovation', 'https://www.washington.edu/innovation/', $parent = 'About' );
        $this->add_menu_item( 'Leadership', 'https://www.washington.edu/leadership/', $parent = 'About' );
        $this->add_menu_item( 'Maps', 'https://www.washington.edu/maps/', $parent = 'About' );
        $this->add_menu_item( 'Population Health', 'https://www.washington.edu/populationhealth/', $parent = 'About' );
        $this->add_menu_item( 'Sustainability', 'https://sustainability.uw.edu/', $parent = 'About' );
        $this->add_menu_item( 'Visit', 'https://www.washington.edu/visit/', $parent = 'About' );

        // The default Academics dropdown.
        $this->add_menu_item( 'Academics', 'https://www.washington.edu/about/academics/' );
        $this->add_menu_item( 'Academic calendar', 'https://www.washington.edu/calendar/academic/', $parent = 'Academics' );
        $this->add_menu_item( 'Academic departments', 'https://www.washington.edu/about/academics/departments/', $parent = 'Academics' );
        $this->add_menu_item( 'Colleges and schools', 'https://www.washington.edu/about/academics/', $parent = 'Academics' );
        $this->add_menu_item( 'Course descriptions', 'https://www.washington.edu/students/crscat/', $parent = 'Academics' );
        $this->add_menu_item( 'Registration', 'https://registrar.washington.edu/registration/', $parent = 'Academics' );
        $this->add_menu_item( 'Student guide', 'https://www.washington.edu/students/', $parent = 'Academics' );
        $this->add_menu_item( 'Time schedule', 'https://www.washington.edu/students/timeschd/', $parent = 'Academics');

        // the default Admissions dropdown.
        $this->add_menu_item( 'Apply', 'https://www.washington.edu/admissions/' );
        $this->add_menu_item( 'Admissions', 'https://www.washington.edu/admissions/', $parent = 'Apply' );
        $this->add_menu_item( 'Financial Aid', 'https://www.washington.edu/financialaid/', $parent = 'Apply' );
        $this->add_menu_item( 'Continuing education', 'https://www.pce.uw.edu/', $parent = 'Apply' );
        $this->add_menu_item( 'Majors', 'https://www.washington.edu/uaa/advising/degree-overview/majors/list-of-undergraduate-majors/', $parent = 'Apply' );
        $this->add_menu_item( 'Student housing', 'https://www.washington.edu/about/housing/', $parent = 'Apply' );
        $this->add_menu_item( 'Transfer students', 'https://admit.washington.edu/apply/transfer/', $parent = 'Apply' );
        $this->add_menu_item( 'Tuition and fees', 'https://finance.uw.edu/sfs/tuition', $parent = 'Apply' );
        $this->add_menu_item( 'Undocumented students', 'https://www.washington.edu/admissions/undocumented/', $parent = 'Apply' );
        $this->add_menu_item( 'UW Online', 'https://www.pce.uw.edu/online', $parent = 'Apply' );

        // The default News dropdown.
        $this->add_menu_item( 'News & Events', 'https://www.washington.edu/news/' );
        $this->add_menu_item( 'UW News', 'https://www.washington.edu/news/', $parent = 'News & Events' );
        $this->add_menu_item( 'Featured stories', 'https://www.washington.edu/boundless/', $parent = 'News & Events' );
        $this->add_menu_item( 'Arts UW', 'https://arts.washington.edu/', $parent = 'News & Events' );
        $this->add_menu_item( 'Calendar', 'https://www.washington.edu/calendar/', $parent = 'News & Events' );
        $this->add_menu_item( 'UW Magazine', 'https://magazine.washington.edu/', $parent = 'News & Events' );
        $this->add_menu_item( 'Husky sports', 'https://gohuskies.com/', $parent = 'News & Events' );
        $this->add_menu_item( 'Newsletter', 'https://www.washington.edu/newsletter/', $parent = 'News & Events' );

        // The default Research the UW dropdown.
		$this->add_menu_item( 'Research', 'https://research.washington.edu' );
		$this->add_menu_item( 'Research at the UW', 'https://research.washington.edu', $parent = 'Research' );
		$this->add_menu_item( 'Office of Research', 'https://www.washington.edu/research/', $parent = 'Research' );
		$this->add_menu_item( 'Research Lifecycle', 'https://www.washington.edu/research/myresearch-lifecycle/', $parent = 'Research' );
		$this->add_menu_item( 'Centers and Institutes', 'https://research.washington.edu/uw-centers-and-institutes/', $parent = 'Research' );
		$this->add_menu_item( 'Stats and rankings', 'https://research.washington.edu/research-impact/', $parent = 'Research' );

        // The default Campuses the UW dropdown.
        $this->add_menu_item( 'Campuses', 'https://www.washington.edu/about/' );
        $this->add_menu_item( 'Bothell', 'https://www.uwb.edu/', $parent = 'Campuses' );
        $this->add_menu_item( 'Seattle', 'https://www.washington.edu/about/', $parent = 'Campuses' );
        $this->add_menu_item( 'Tacoma', 'https://www.tacoma.uw.edu/', $parent = 'Campuses' );

        // The default Support the UW dropdown.
        $this->add_menu_item( 'Give', 'https://www.washington.edu/giving/' );
        $this->add_menu_item( 'Give now', 'https://www.washington.edu/giving/make-a-gift/', $parent = 'Give' );
        $this->add_menu_item( 'Ways to give', 'https://www.washington.edu/giving/how-to-give/', $parent = 'Give' );
        $this->add_menu_item( 'My UW Giving', 'https://myuwgiving.gifts.washington.edu/', $parent = 'Give' );



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