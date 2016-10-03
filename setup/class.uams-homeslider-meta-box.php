<?php

class UAMS_Home_Slider_Meta_Box
{

	/**
	 * Hook into the appropriate actions when the class is constructed.
	 */
	public function __construct() {

		add_action('add_meta_boxes', array($this, 'hs_add_meta_box'));
		add_action('save_post', array($this, 'save'));
		//add_action('the_content', array($this, 'custom_message'));
	}

	/**
	 * Adds the meta box container.
	 */
	public function hs_add_meta_box($post_type) {
		$post_types = array('home_slider');

		//limit meta box to certain post types
		if (in_array($post_type, $post_types)) {
			add_meta_box('hs-meta',
			'Home Slider Options',
			array($this, 'hs_meta_box_function'),
			$post_type,
			'side',
			'high');
		}
	}

	/**
	 * Render Meta Box content.
	 *
	 * @param WP_Post $post The post object.
	 */

	public function hs_meta_box_function($post) {

		// Add an nonce field so we can check for it later.
		wp_nonce_field( 'mobileimage_nonce' , 'mobileimage_name' );
		// Use get_post_meta to retrieve an existing value from the database.
		$mobileimage = get_post_meta($post->ID, "mobileimage", true);

		// Add an nonce field so we can check for it later.
		//wp_nonce_field( 'mslidelink_nonce' , 'slidelink_name' );
		// Use get_post_meta to retrieve an existing value from the database.
		//$slidelink = get_post_meta($post->ID, "slidelink", true);

		// Display the form, using the current value.
		echo '<div>';
		echo "<p><b>Slide Link</b></br><input type='text' class='text' name='slidelink' value='" . $slidelink . "'></p>";
		echo "<p><b>Mobile Slider Image</b></br><input type='text' class='meta-image' name='mobileimagetext' value='" . $mobileimage . "'><input type='button' class='button image-upload' value='Browse'></p>";
        echo "<div class='image-preview'><img src='" . $mobileimage ."' style='max-width: 140px;'></div>";
		echo '</div>';

		// Add Image Media Selector JS
		?>
		<script>
			jQuery(document).ready(function ($) {

			// Instantiates the variable that holds the media library frame.
			var meta_image_frame;
			// Runs when the image button is clicked.
			$('.image-upload').click(function (e) {
				e.preventDefault();
				var meta_image = $(this).parent().children('.meta-image');

				// If the frame already exists, re-open it.
				if (meta_image_frame) {
					meta_image_frame.open();
					return;
				}
				// Sets up the media library frame
				meta_image_frame = wp.media.frames.meta_image_frame = wp.media({
					title: meta_image.title,
					button: {
						text: meta_image.button
					}
				});
				// Runs when an image is selected.
				meta_image_frame.on('select', function () {
					// Grabs the attachment selection and creates a JSON representation of the model.
					var media_attachment = meta_image_frame.state().get('selection').first().toJSON();
					// Sends the attachment URL to our custom image input field.
					meta_image.val(media_attachment.url);
				});
				// Opens the media library frame.
				meta_image_frame.open();
			});
		});
		</script>
		<?php
		//End Image Media Selector JS
	}

	/**
	 * Save the meta when the post is saved.
	 *
	 * @param int $post_id The ID of the post being saved.
	 */
	public function save($post_id) {

		/*
		 * We need to verify this came from the our screen and with
		 * proper authorization,
		 * because save_post can be triggered at other times.
		 */

		// Check if our nonce is set.
		if (!isset($_POST['mobileimage_name']))
			return $post_id;

		$nonce = $_POST['mobileimage_name'];

		// Verify that the nonce is valid.
		if (!wp_verify_nonce($nonce, 'mobileimage_nonce'))
			return $post_id;

		// If this is an autosave, our form has not been submitted,
		//     so we don't want to do anything.
		if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
			return $post_id;

		// Check the user's permissions.
		if ('home_slider' == $_POST['post_type']) {

			if (!current_user_can('edit_page', $post_id))
				return $post_id;

		} else {

			if (!current_user_can('edit_post', $post_id))
				return $post_id;
		}

		/* OK, its safe for us to save the data now. */

		// Sanitize the user input.
		$data = sanitize_text_field($_POST['mobileimagetext']);

		// Update the meta field.
		update_post_meta($post_id, 'mobileimage', $data);
	}


}

/**
 * Finally, instantiate the class
 */

new UAMS_Home_Slider_Meta_Box;
