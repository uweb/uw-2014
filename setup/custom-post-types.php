<?php

//	include( 'cuztom/cuztom.php' );

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

/*
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
	        'id'            => '_data_linkurl',
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
*/

add_filter('piklist_post_types', 'uams_2016_post_types');
  function uams_2016_post_types($post_types)
  {
    $post_types['home_slider'] = array(
      'labels' => piklist('post_type_labels', 'Home Slider') // Set Defaults
      ,'labels' => array('menu_name' => 'Home Slider',  'name' => 'Slides', 'all_items' => 'All Slides') //Override some
      ,'title' => __('Enter a new Slide Title')
      ,'menu_icon'  => 'dashicons-images-alt'
      ,'supports' => array(
        'title'
        //, 'editor'
        , 'author'
        , 'page-attributes'
      )
      ,'public' => false
      ,'publicly_queryable' => false
      ,'show_ui' => true
      ,'show_in_menu' => true
      ,'query_var' => false
      ,'hierarchical' => true
      ,'menu_position' => 5
      ,'has_archive' => false
      ,'rewrite' => array(
        'slug' => 'home-slider'
      )
      ,'capability_type' => 'post'
      ,'hide_meta_box' => array(
        'author'
        ,'pageparentdiv'
      )
    );
    return $post_types;
  }
