<?php

// allows child them overwriting of either whole UW object or just parts
if (!function_exists('setup_uw_object')){
    function setup_uw_object() {
        require( get_template_directory() . '/setup/class.uw.php' );
        $UW = new UW();
        do_action('extend_uw_object', $UW);
        return $UW;
    }
}

$UW = setup_uw_object();

require( get_template_directory() . '/inc/template-functions.php' );

require( get_template_directory() . '/setup/class.uw-page-attributes-meta-box.php');

require( get_template_directory() . '/docs/class.uw-documentation.php');

foreach (glob( get_template_directory() . "/widgets/*.php") as $filename)
{
    include $filename;
}
