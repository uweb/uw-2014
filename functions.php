<?php
// Basic helper and template functions.  TODO: Maybe look at MVC-izing the template functions
//require( get_template_directory() . '/inc/helper-functions.php' );
require( get_template_directory() . '/inc/template-functions.php' );

if (!isset($UW)){
    require( get_template_directory() . '/setup/class.uw.php' );
    $UW = new UW();
}

require( get_template_directory() . '/setup/class.uw-page-attributes-meta-box.php');

// All of the UW Widgets TODO: make a dubspack jetpack style thing
// require( get_template_directory() . '/inc/custom-widgets.php' );

//require( get_template_directory() . '/inc/custom-gallery.php' );
//require( get_template_directory() . '/inc/custom-settings.php' ); // [TODO] rename/move?

// All of the UW Shortcodes
//require( get_template_directory() . '/inc/custom-shortcodes.php' );

// temporary for widgets
foreach (glob( get_template_directory() . "/widgets/*.php") as $filename)
{
    include $filename;
}
