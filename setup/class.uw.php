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
        $parent = get_template_directory() . '/setup/';
        $child  = get_stylesheet_directory() . '/setup/';
        require_once($parent . 'class.install.php');
        require_once($parent . 'class.uw-scripts.php');
        require_once($parent . 'class.uw-styles.php');
        require_once($parent . 'class.uw-dropdowns.php');
        require_once($parent . 'class.images.php');
        require_once($parent . 'class.squish_bugs.php');
        require_once($parent . 'class.filters.php');
        require_once($parent . 'class.uw-oembeds.php');
        require_once($parent . 'class.googleapps.php');
        require_once($parent . 'class.mimes.php');
        require_once($parent . 'class.users.php');
        require_once($parent . 'class.dropdowns_walker.php');  // no initialization needed because it extends a WP class
        require_once($parent . 'class.uw-basic-custom-post.php');  // no initialization needed unless a child theme makes one
        require_once($parent . 'class.uw-sidebar-menu-walker.php');  // sidebar menu will initialize for us
        require_once($parent . 'class.uw-quicklinks.php' );
        require_once($parent . 'class.uw-iframes.php');
        require_once($parent . 'class.uw-shortcodes.php' );
        require_once($parent . 'class.uw-media-credit.php' );
        require_once($parent . 'class.uw-media-caption.php' );
        require_once($parent . 'class.uw-replace-media.php' );
        require_once($parent . 'class.uw-tinymce.php' );
        // require_once($parent . 'class.uw-documentation-dashboard-widget.php' );
        require_once($parent . 'class.uw-enclosure.php' );
        require_once($parent . 'class.uw-carousel.php' );
        require_once($parent . 'class.uw-settings.php' );
        require_once($parent . 'class.uw-page-attributes-meta-box.php' );

        require_once(get_template_directory() . '/inc/template-functions.php' );
        require_once(get_template_directory() . '/docs/class.uw-documentation.php' );

        foreach (glob( get_template_directory() . "/widgets/*.php") as $filename)
        {
            include $filename;
        }
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
        $this->SidebarMenuWalker = new UW_Sidebar_Menu_Walker;
        $this->Dropdowns         = new UW_Dropdowns;
        $this->Quicklinks        = new UW_QuickLinks;
        $this->Shortcodes        = new UW_Shortcodes;
        $this->MediaCredit       = new UW_Media_Credit;
        $this->MediaCaption      = new UW_Media_Caption;
        $this->ReplaceMedia      = new UW_Replace_Media;
        $this->TinyMCE           = new UW_TinyMCE;
        // $this->Documentation     = new UW_Documentation_Dashboard_Widget;
        $this->IFrames           = new UW_Iframes;
        $this->GoogleApps        = new UW_GoogleApps;
        $this->Enclosure         = new UW_Enclosure;
        $this->Carousel          = new UW_Carousel;
        $this->Settings          = new UW_Settings;
    }
}
 