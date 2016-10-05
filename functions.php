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


// Custom Validation rule for Home Slider Content
add_filter('acf/validate_value/name=hs_content', 'hs_content_character_count', 10, 4);

function hs_content_character_count( $valid, $value, $field, $input ){

    // bail early if value is already invalid
    if( !$valid ) {

        return $valid;

    }

    if( strlen($value) > 210 ) {

        $valid = 'You can\'t enter more that ~180 characters';

    }


    // return
    return $valid;


};