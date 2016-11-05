<?php
/*
Title: Slide Options
Post Type: home_slider
Order: 10
*/

  piklist('field', array(
    'type' => 'editor'
    ,'field' => 'post_content'
    ,'scope' => 'post'
    ,'label' => __('Slide text', 'homepage-slider')
    ,'description' => __('Story excerpt or abstract.', 'piklist-demo')
    ,'value' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    ,'options' => array(
      'media_buttons' => false
      ,'teeny' => true
      ,'textarea_rows' => 3
      ,'drag_drop_upload' => false
      ,'tinymce' => array(
        'resize' => false
        ,'wp_autoresize_on' => true
      )
    )
  ));

  piklist('field', array(
    'type' => 'select'
    ,'field' => 'hs_text_color'
    ,'label' => __('Select', 'piklist-demo')
    ,'description' => "Choose text color based on image color."
    ,'value' => 'lighttext'
    ,'choices' => array(
      'lighttext' => __('Light Text', 'piklist-demo')
      ,'darktext' => __('Dark Text', 'piklist-demo')
    )
  ));

  piklist('field', array(
    'type' => 'text'
    ,'field' => 'hs_button_url'
    ,'label' => __('Button Link', 'homepage-slider')
    ,'description' => "Link / URL"
    ,'attributes' => array(
      'class' => 'large-text'
      ,'placeholder' => __('URL to page or article (Enter http://).', 'homepage-slider')
    )
    ,'required' => true
    ,'validate' => array(
	  array(
	    'type' => 'url'
	  )
	)
  ));

  piklist('field', array(
    'type' => 'text'
    ,'field' => 'menu_order'
    ,'scope' => 'post'
    ,'label' => __('Slider Order', 'homepage-slider')
    ,'description' => "Higher is first (1-100)"
    ,'attributes' => array(
      'class' => 'small-text'
      ,'placeholder' => __('1', 'homepage-slider')
    )
    ,'required' => true
    ,'validate' => array(
	  array(
	    'type' => 'range'
	    ,'options' => array(
	      'min' => 1
	      ,'max' => 100
	    )
	  )
	)
  ));

  piklist('field', array(
    'type' => 'file'
    ,'field' => '_thumbnail_id' // Use this field to match WordPress featured image field name.
    ,'scope' => 'post_meta'
    ,'label' => __('Desktop Image', 'homepage-slider')
    ,'description' => __('Recommended size 1600x???px', 'homepage-slider')
    ,'required' => true
    ,'options' => array(
      'title' => __('Set desktop image', 'homepage-slider')
      ,'button' => __('Set desktop image', 'homepage-slider')
    )
    ,'validate' => array(
      array(
        'type' => 'limit'
        ,'options' => array(
          'min' => 0
          ,'max' => 1
        )
      )
    )
  ));


  piklist('field', array(
    'type' => 'file'
    ,'field' => 'hs_mobile_image'
    ,'label' => __('Mobile Image', 'homepage-slider')
    ,'description' => __('Recommended size 720x480px', 'homepage-slider')
    //,'required' => true
    ,'options' => array(
      'modal_title' => __('Mobile Image', 'homepage-slider')
      ,'button' => __('Add', 'homepage-slider')
    )
    ,'attributes' => array(
      'class' => 'large-text'
    )
    ,'validate' => array(
      array(
        'type' => 'limit'
        ,'options' => array(
          'min' => 0
          ,'max' => 1
        )
      )
    )
  ));
