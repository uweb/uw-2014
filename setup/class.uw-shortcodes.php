<?php

/*
 * This is the object that holds all the UW shortcodes
 * Shortcodes are how we get functionality in content for power users
 */

class UW_Shortcodes
{
    function __construct()
    {
        $this->includes();
        $this->initialize();
    }

    private function includes()
    {
        require_once('class.tile-box-shortcode.php');
        require_once('class.button-shortcode.php');
        require_once('class.youtube-shortcode.php');
        require_once('class.trumba-shortcode.php');
        require_once('class.trumba-rss-shortcode.php');
        require_once('class.subpage-list-shortcode.php');
        require_once('class.accordion-shortcode.php');
    }

    private function initialize()
    {
        $this->tile_box       = new TileBox();
        $this->button         = new UW_Button();
        $this->youtube        = new UW_YouTube();
        $this->trumba         = new UW_Trumba();
        $this->trumba_rss     = new UW_TrumbaRSS();
        $this->subpage_list   = new UW_SubpageList();
        $this->accordion      = new UW_AccordionShortcode();
    }
}
