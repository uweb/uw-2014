<?php
// Basic helper and template functions.  TODO: Maybe look at MVC-izing the template functions
//require( get_template_directory() . '/inc/helper-functions.php' );
require( get_template_directory() . '/inc/template-functions.php' );

if (!isset($UW)){
    require( get_template_directory() . '/setup/class.uw.php' );
    $UW = new UW();
}

// require( get_template_directory() . '/inc/override_page_attributes_meta.php');

// Custom shivs to help Wordpress and some plugins with our server architecture
// require( get_template_directory() . '/shivs/remove-http-cms.php' );
//require( get_template_directory() . '/shivs/plugin-hooks.php' );

// Adds a media credit to the media library items
//require( get_template_directory() . '/inc/replace-media.php' ); // [TODO] could be plugin

// All of the UW Widgets TODO: make a dubspack jetpack style thing
//require( get_template_directory() . '/inc/custom-widgets.php' );

//require( get_template_directory() . '/inc/custom-gallery.php' );
//require( get_template_directory() . '/inc/custom-settings.php' ); // [TODO] rename/move?

// All of the UW Shortcodes
//require( get_template_directory() . '/inc/custom-shortcodes.php' );

// [TODO] check to see if this is still necessary
//require( get_template_directory() . '/inc/custom-embeds.php' );

// Main dropdown menu walker
//require( get_template_directory() . '/inc/dropdown-walker.php' );

// Custom Ajax actions
//require( get_template_directory() . '/inc/custom-ajax-actions.php' );

// Adds functioning enclosure to rss2
//require( get_template_directory() . '/inc/prep-uw-rss2.php' );

require( get_template_directory() . '/inc/template-functions.php' );


// temporary for widgets
foreach (glob( get_template_directory() . "/widgets/*.php") as $filename)
{
    include $filename;
}
