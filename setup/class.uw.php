<?php

/*
 *  This is the UW object that contains all the classes for our back-end functionality
 *  All classes should be accessible by UW::ClassName
 */

class UW
{
    public static $Dropdowns;
    public static $Images;

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
    }

    private function initialize()
    {
        $this->Dropdowns = new Dropdowns();
        $this->Images = new UW_Images();
    }
}
new UW();
