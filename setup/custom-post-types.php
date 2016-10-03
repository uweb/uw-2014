<?php

	include( 'cuztom/cuztom.php' );

/*
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
*/

$homeSlider = new Cuztom_Post_Type(
    'home_slider',
	array(
            'public' => false,
            'publicly_queryable' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'query_var' => false,
            'capability_type' => 'post',
            'has_archive' => false,
            'hierarchical' => true,
            'menu_position' => 5,
            'menu_icon' => 'dashicons-images-alt',
            'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'page-attributes' )
    ),
    array(
	    'menu_name' => 'Home Slider',
	    'name' => 'Slides',
	    'all_items' => 'All Slides'
    )

);

$box = new Cuztom_Meta_Box(
    'data',
    __('Slide Options', 'cuztom'),
    'home_slider',
    array(
         array(
	        'id'            => '_data_mobileimage',
	        'type'          => 'image',
	        'label'         => 'Mobile Image',
		),
        array(
            'id'                => '_data_linkurl',
            'label'             => 'Link',
            'type'              => 'text',
        )
    )
);
