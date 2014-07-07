<?php

/**
 * Installs the custom image sizes
 */

class UW_Images
{

  // If 'show' is true it will appear in the image dropdown menu
  public $IMAGE_SIZES = array(

    'thimble' => array(
      'name'    => 'Thimble',
      'width'   => 50,
      'height'  => 50,
      'crop'    => true,
      'show'    => false
    ),

    'mug-shot' => array(
      'name' 	=> 'Mug Shot',
      'width'	=> 100,
      'height'=> 150,
      'crop'	=> true,
      'show'	=> true
    ),

    'sidebar' => array(
      'name'    => 'Sidebar',
      'width'   => 250,
      'height'  => 9999,
      'crop'    => false,
      'show'    => true
    ),

    'thumbnail-large' => array(
      'name' 	=> 'Thumbnail large',
      'width'	=> 300,
      'height'=> 300,
      'crop'	=> true,
      'show'	=> false
    ),

    'single-image-widget' => array(
      'name' 	=> 'Single Image Widget',
      'width'	=> 620,
      'height'=> 375,
      'crop'	=> true,
      'show'	=> false
    ),

    'half' => array(
      'name'    => 'Half width',
      'width'   => 300,
      'height'  => 9999,
      'crop'    => false,
      'show'    => true
    ),

    'full' => array(
      'name'    => 'Full width',
      'width'   => 620,
      'height'  => 9999,
      'crop'    => false,
      'show'    => true
    ),

    'rss' => array(
        'name' => 'Mailchimp RSS',
        'width' => 108,
        'height' => 81,
        'crop' => true,
        'show' => false,
    )
  
  );

  function UW_Images()
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


    return (array_merge( $imagesToShow , $defaultSizes ));

  }

}

new UW_Images;
