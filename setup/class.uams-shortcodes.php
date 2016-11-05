<?php

/*
 * This is the object that holds all the UAMS shortcodes
 * Shortcodes are how we get functionality in content for power users
 */

class UAMS_Shortcodes
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
      //  require_once('class.trumba-shortcode.php');
      //  require_once('class.trumba-rss-shortcode.php');
        require_once('class.subpage-list-shortcode.php');
        require_once('class.accordion-shortcode.php');
      //  require_once('class.tiny-shortcode.php');
        require_once('class.grid-shortcode.php');
        require_once('class.menu-shortcode.php');
    }

    private function initialize()
    {
        $this->tile_box       = new TileBox();
        $this->button         = new UAMS_Button();
        $this->youtube        = new UAMS_YouTube();
      //  $this->trumba         = new UAMS_Trumba();
      //  $this->trumba_rss     = new UAMS_TrumbaRSS();
        $this->subpage_list   = new UAMS_SubpageList();
        $this->accordion      = new UAMS_AccordionShortcode();
      //  $this->tiny           = new UAMS_TinyShortcode();
        $this->bootstrap      = new UAMS_GridShortcode();
        $this->custommenu     = new UAMS_MenuShortcode();
    }
}
