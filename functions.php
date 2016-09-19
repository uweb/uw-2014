<?php

// allows child them overwriting of either whole UAMS object or just parts
if (!function_exists('setup_uams_object')){
    function setup_uams_object() {
        require( get_template_directory() . '/setup/class.uams.php' );
        $UAMS = new UAMS();
        do_action('extend_uams_object', $UAMS);
        return $UAMS;
    }
}

$UAMS = setup_uams_object();