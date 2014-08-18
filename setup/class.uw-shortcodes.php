<?php

/*
 * This is the object that holds all the UW shortcodes
 * Shortcodes are how we get functionality in content for power users
 */

class UW_Shortcodes
{
    public static $tile_box;
    public static $button;

    function __construct()
    {
        $this->includes();
        $this->initialize();
    }

    private function includes()
    {
        require_once('class.tile-box-shortcode.php');
        require_once('class.button-shortcode.php');
    }

    private function initialize()
    {
        $this->tile_box = new TileBox();
        $this->button   = new UW_Button();
    }
}
