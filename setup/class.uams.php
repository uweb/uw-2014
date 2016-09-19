<?php

/*
 *  This is the UAMS object that contains all the classes for our back-end functionality
 *  All classes should be accessible by UAMS::ClassName
 */

class UAMS
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
        require_once($parent . 'class.uams-scripts.php');
        require_once($parent . 'class.uams-styles.php');
        require_once($parent . 'class.uams-dropdowns.php');
        require_once($parent . 'class.images.php');
        require_once($parent . 'class.squish_bugs.php');
        require_once($parent . 'class.filters.php');
        require_once($parent . 'class.uams-oembeds.php');
        require_once($parent . 'class.googleapps.php');
        require_once($parent . 'class.mimes.php');
        require_once($parent . 'class.users.php');
        require_once($parent . 'class.dropdowns_walker.php');  // no initialization needed because it extends a WP class
        require_once($parent . 'class.uams-basic-custom-post.php');  // no initialization needed unless a child theme makes one
        require_once($parent . 'class.uams-sidebar-menu-walker.php');  // sidebar menu will initialize for us
        require_once($parent . 'class.uams-quicklinks.php' );
        require_once($parent . 'class.uams-iframes.php');
        require_once($parent . 'class.uams-shortcodes.php' );
        require_once($parent . 'class.uams-media-credit.php' );
        require_once($parent . 'class.uams-media-caption.php' );
        require_once($parent . 'class.uams-replace-media.php' );
        require_once($parent . 'class.uams-tinymce.php' );
        // require_once($parent . 'class.uams-documentation-dashboard-widget.php' );
        require_once($parent . 'class.uams-enclosure.php' );
        require_once($parent . 'class.uams-carousel.php' );
        require_once($parent . 'class.uams-settings.php' );
        require_once($parent . 'class.uams-page-attributes-meta-box.php' );

        require_once(get_template_directory() . '/inc/template-functions.php' );
        require_once(get_template_directory() . '/docs/class.uams-documentation.php' );

        foreach (glob( get_template_directory() . "/widgets/*.php") as $filename)
        {
            include $filename;
        }
    }

    private function initialize()
    {
        $this->Install           = new UAMS_Install_Theme;
        $this->Scripts           = new UAMS_Scripts;
        $this->Styles            = new UAMS_Styles;
        $this->Images            = new UAMS_Images;
        $this->SquishBugs        = new UAMS_SquishBugs;
        $this->Filters           = new UAMS_Filters;
        $this->OEmbeds           = new UAMS_OEmbeds;
        $this->Mimes             = new UAMS_Mimes;
        $this->Users             = new UAMS_Users;
        $this->SidebarMenuWalker = new UAMS_Sidebar_Menu_Walker;
        $this->Dropdowns         = new UAMS_Dropdowns;
        $this->Quicklinks        = new UAMS_QuickLinks;
        $this->Shortcodes        = new UAMS_Shortcodes;
        $this->MediaCredit       = new UAMS_Media_Credit;
        $this->MediaCaption      = new UAMS_Media_Caption;
        $this->ReplaceMedia      = new UAMS_Replace_Media;
        $this->TinyMCE           = new UAMS_TinyMCE;
        // $this->Documentation     = new UAMS_Documentation_Dashboard_Widget;
        $this->IFrames           = new UAMS_Iframes;
        $this->GoogleApps        = new UAMS_GoogleApps;
        $this->Enclosure         = new UAMS_Enclosure;
        $this->Carousel          = new UAMS_Carousel;
        $this->Settings          = new UAMS_Settings;
    }
}
