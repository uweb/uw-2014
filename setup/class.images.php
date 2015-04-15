<?php

//
// Installs the custom image sizes
//

class UW_Images
{

  // If `$show` is true it will appear in the image dropdown menu
  public $IMAGE_SIZES = array(

    // Mug shot
    'mug-shot' => array(
      'name' 	=> 'Mug Shot',
      'width'	=> 150,
      'height'=> 250,
      'crop'	=> true,
      'show'	=> true
    ),

    // Sidebar width
    'sidebar' => array(
      'name'    => 'Sidebar',
      'width'   => 375,
      'height'  => 9999,
      'crop'    => false,
      'show'    => true
    ),

    // Same as the sidebar
    'half' => array(
      'name'    => 'Half width',
      'width'   => 375,
      'height'  => 9999,
      'crop'    => false,
      'show'    => true
    ),

    // Full content width
    'full-content' => array(
      'name'    => 'Content area',
      'width'   => 750,
      'height'  => 9999,
      'crop'    => false,
      'show'    => true
    ),

    // Full page width
    'page' => array(
      'name'    => 'Full page',
      'width'   => 1140,
      'height'  => 9999,
      'crop'    => false,
      'show'    => true
    ),

    // Used in widgets for featured images
    'thimble' => array(
      'name'    => 'Thimble',
      'width'   => 50,
      'height'  => 50,
      'crop'    => true,
      'show'    => false
    ),

    // Used in galleries
    'thumbnail-large' => array(
      'name'  => 'Thumbnail large',
      'width' => 300,
      'height'=> 300,
      'crop'  => true,
      'show'  => false
    ),

    // RSS Feed
    'rss' => array(
        'name' => 'RSS',
        'width' => 108,
        'height' => 81,
        'crop' => true,
        'show' => false,
    )

  );

  function __construct()
  {
    add_action( 'after_setup_theme', array( $this, 'add_uw_image_sizes' ) );
    add_filter( 'image_size_names_choose', array( $this, 'show_image_sizes') );
  }

  function add_uw_image_sizes()
  {

    foreach ( $this->IMAGE_SIZES as $name=>$image )
    {
      add_image_size(
        $name,
        $image['width'],
        $image['height'],
        $image['crop']
      );
    }
    add_filter( 'image_size_names_choose', array( $this, 'show_image_sizes') );
  }

  function show_image_sizes( $defaultSizes )
  {
    $imagesToShow = array_filter( $this->IMAGE_SIZES, function($image) {
      return $image['show'];
    });

    foreach ($imagesToShow as $id=>$image)
    {
      $imagesToShow[$id] = $image['name'];
    }


// print_r( $imagesToShow );
    return (array_merge( $imagesToShow , $defaultSizes ));

  }

}
