<?php

/*
 *  This is the UW object that contains all the classes for our back-end functionality
 *  All classes should be accessible by UW::ClassName
 */

class UW
{
    public static $Install;
    public static $Scripts;
    public static $Styles;
    public static $Images;
    public static $SquishBugs;
    public static $Filters;
    public static $Mimes;
    public static $Users;
    public static $Dropdowns;
    public static $TileBox;

    function __construct()
    {
        $this->includes();
        $this->initialize();
    }

    private function includes()
    {
        require_once('class.install.php');
        require_once('class.uw-scripts.php');
        require_once('class.uw-styles.php');
        require_once('class.uw-dropdowns.php');
        require_once('class.menu_item.php');
        require_once('class.images.php');
        require_once('class.squish_bugs.php');
        require_once('class.filters.php');
        require_once('class.mimes.php');
        require_once('class.users.php');
        require_once('class.dropdowns_walker.php');  // no initialization needed because it extends a WP class
        require_once( 'class.uw-directory.php' );
        require_once( 'class.uw-quicklinks.php' );
        require_once( 'class.tile-box-shortcode.php' );
    }

    private function initialize()
    {
        $this->Install    = new UW_Install_Theme;
        $this->Scripts    = new UW_Scripts;
        $this->Styles     = new UW_Styles;
        $this->Images     = new UW_Images;
        $this->SquishBugs = new UW_SquishBugs;
        $this->Filters    = new UW_Filters;
        $this->Mimes      = new UW_Mimes;
        $this->Users      = new UW_Users;
        $this->Dropdowns  = new UW_Dropdowns;
        $this->Directory  = new UW_Directory;
        $this->Quicklinks = new UW_QuickLinks;
        $this->TileBox    = new TileBox;
    }
}
