<?php

/*
 *  This is the UW object that contains all the classes for our back-end functionality
 *  All classes should be accessible by UW::ClassName
 */

class UW
{

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
        require_once('class.images.php');
        require_once('class.squish_bugs.php');
        require_once('class.filters.php');
        require_once('class.uw-oembeds.php');
        require_once('class.googleapps.php');
        require_once('class.mimes.php');
        require_once('class.users.php');
        require_once('class.dropdowns_walker.php');  // no initialization needed because it extends a WP class
        require_once( 'class.uw-directory.php' );
        require_once( 'class.uw-quicklinks.php' );
        require_once('class.uw-iframes.php');
        require_once( 'class.uw-shortcodes.php' );
        require_once( 'class.uw-media-credit.php' );
        require_once( 'class.uw-media-caption.php' );
        require_once( 'class.uw-replace-media.php' );
        require_once( 'class.uw-tinymce.php' );
        require_once( 'class.uw-documentation.php' );
        require_once( 'class.uw-enclosure.php' );
    }

    private function initialize()
    {
        $this->Install           = new UW_Install_Theme;
        $this->Scripts           = new UW_Scripts;
        $this->Styles            = new UW_Styles;
        $this->Images            = new UW_Images;
        $this->SquishBugs        = new UW_SquishBugs;
        $this->Filters           = new UW_Filters;
        $this->OEmbeds           = new UW_OEmbeds;
        $this->Mimes             = new UW_Mimes;
        $this->Users             = new UW_Users;
        $this->Dropdowns         = new UW_Dropdowns;
        $this->Directory         = new UW_Directory;
        $this->Quicklinks        = new UW_QuickLinks;
        $this->Shortcodes        = new UW_Shortcodes;
        $this->Shortcodes        = new UW_Shortcodes;
        $this->MediaCredit       = new UW_Media_Credit;
        $this->MediaCaption      = new UW_Media_Caption;
        $this->ReplaceMedia      = new UW_Replace_Media;
        $this->TinyMCE           = new UW_TinyMCE;
        $this->Documentation     = new UW_Documentation;
        $this->IFrames           = new UW_Iframes;
        $this->GoogleApps        = new UW_GoogleApps;
        $this->Enclosure         = new UW_Enclosure;
    }
}
