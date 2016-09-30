<?php

$homeSlider = new UAMS_Custom_Post(
    array(
        'name' => 'home_slider',

        'args' => array (
            'public' => false,
            'publicly_queryable' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'query_var' => false,
            'capability_type' => 'post',
            'has_archive' => false,
            'hierarchical' => true,
            'menu_position' => 5,
            'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'page-attributes' )
        ),

        'post_label' => "Home Slide"
    )
);