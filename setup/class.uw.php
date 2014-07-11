<?php

/*
 *  This is the UW object that contains all the classes for our back-end functionality
 *  All classes should be accessible by UW::ClassName
 */

class UW
{
    public static $Images;
    public static $SquishBugs;
    public static $Filters;
    public static $Dropdowns;

    function __construct()
    {
        $this->includes();
        $this->initialize();
    }

    private function includes()
    {
        require_once('class.dropdowns.php');
        require_once('class.menu_item.php');
        require_once('class.images.php');
        require_once('class.squish_bugs.php');
        require_once('class.filters.php');
    }

    private function initialize()
    {
        $this->Images = new UW_Images();
        $this->SquishBugs = new UW_SquishBugs();
        $this->filters = new UW_Filters();
        $this->Dropdowns = new Dropdowns();
    }
}
new UW();
