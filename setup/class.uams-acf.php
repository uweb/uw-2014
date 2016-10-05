<?php

/*
 *  ACF Pro Fields for UAMS-2016
 */


/* Home Slider */

function my_acf_add_local_field_groups() {

	acf_add_local_field_group(array (
		'key' => 'hs_options',
		'title' => 'Slide Options',
		'fields' => array (
			array (
				'key' => 'field_hs_content',
				'label' => 'Slide Content',
				'name' => 'hs_content',
				'type' => 'wysiwyg',
				'instructions' => 'Please limit to ~ 180 characters',
				'required' => 1,
				'conditional_logic' => 0,
				'wrapper' => array (
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'tabs' => 'all',
				'toolbar' => 'basic',
				'media_upload' => 0,
			),
			array (
				'key' => 'field_hs_text_color',
				'label' => 'Text Color',
				'name' => 'hs_text_color',
				'type' => 'select',
				'instructions' => 'Choose text color based on image color (ex. Dark text over a bright image)',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array (
					'width' => '50',
					'class' => '',
					'id' => '',
				),
				'choices' => array (
					'lighttext' => 'Light Text',
					'darktext' => 'Dark Text',
				),
				'default_value' => array (
				),
				'allow_null' => 0,
				'multiple' => 0,
				'ui' => 0,
				'ajax' => 0,
				'return_format' => 'value',
				'placeholder' => '',
			),
			array (
				'key' => 'field_hs_order',
				'label' => 'Order',
				'name' => 'hs_order',
				'type' => 'number',
				'instructions' => 'Higher numbers appear first (ex. 50, 20, 10)',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array (
					'width' => '50',
					'class' => '',
					'id' => '',
				),
				'default_value' => 0,
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'min' => 0,
				'max' => 100,
				'step' => 1,
			),
			array (
				'key' => 'field_hs_button_url',
				'label' => 'Link / URL',
				'name' => 'hs_button_url',
				'type' => 'url',
				'instructions' => '',
				'required' => 1,
				'conditional_logic' => 0,
				'wrapper' => array (
					'width' => '50',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => 'URL to page or article (Enter http://)',
			),
			array (
				'key' => 'field_hs_featured_image',
				'label' => 'Desktop Image',
				'name' => '_thumbnail_id',
				'type' => 'image',
				'instructions' => '',
				'required' => 1,
				'conditional_logic' => 0,
				'wrapper' => array (
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'return_format' => 'id',
				'preview_size' => 'sidebar',
				'library' => 'all',
				'min_width' => '',
				'min_height' => '',
				'min_size' => '',
				'max_width' => '',
				'max_height' => '',
				'max_size' => '',
				'mime_types' => '',
			),
			array (
				'key' => 'field_hs_mobile_image',
				'label' => 'Mobile Image',
				'name' => 'hs_mobile_image',
				'type' => 'image',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array (
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'return_format' => 'array',
				'preview_size' => 'medium',
				'library' => 'all',
				'min_width' => '',
				'min_height' => '',
				'min_size' => '',
				'max_width' => '',
				'max_height' => '',
				'max_size' => '',
				'mime_types' => '',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'home_slider',
				),
			),
		),
		'menu_order' => 0,
		'position' => 'normal',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => array (
			0 => 'the_content',
			1 => 'author',
			2 => 'featured_image',
		),
		'active' => 1,
		'description' => '',
	));

}

add_action('acf/init', 'my_acf_add_local_field_groups');