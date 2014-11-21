<?php
/**
 * Adds a media credit to images in the media library
 */

class UW_Media_Credit
{

  function UW_Media_Credit()
  {

	add_filter( 'mce_external_plugins', array( $this, 'add_media_credit_shortcode_to_tinymce' ) );

    add_filter( 'image_send_to_editor', array( $this, 'mediacredit_tinymce_html'), 10, 7 );
    add_shortcode( 'mediacredit', array( $this, 'mediacredit_html' ) );

    add_filter( "attachment_fields_to_edit", array( $this, "image_attachment_fields_to_edit"), 100, 2);
    add_filter( "attachment_fields_to_save", array( $this, "custom_image_attachment_fields_to_save" ), null, 2);
  }

  function add_media_credit_shortcode_to_tinymce( $plugins )
  {
     $plugin_array[ 'mediacredit' ] = get_template_directory_uri() . '/assets/admin/js/media-credit.js';
     return $plugin_array;
  }

  /**
   * Override the editor html to include media credit even if the photo caption is empty
   */

  function mediacredit_tinymce_html( $html, $id, $caption, $title, $align, $url, $size )
  {
    if ( $caption )
      return $html;

    $credit = get_post_meta( $id, '_media_credit', true);
    $img    = wp_get_attachment_image_src( $id, $size );

    return $credit ?
      "<dl class='mediacredit align$align' data-credit='$credit' data-align='align$align' data-size='$size' style='width:{$img[1]}px'>
        <dt class='mediacredit-dt'>$html</dt>
        <dd class='wp-caption-dd'>$credit</dd>
      </dl>" : $html;
  }

  /**
   *
   */
  function mediacredit_html( $attrs, $content )
  {
    extract(shortcode_atts(array(
      'id'	=> '',
      'align'	=> '',
      'size'	=> '',
      'credit'	=> '',
    ), $attrs));

    $img    = wp_get_attachment_image_src( $id, $size );
    $width  = $img[1];

    if ( 1 > (int) $id )
      return '';
    return '<div class="wp-caption ' . esc_attr($align) . '" style="width:'. ( 10  + (int) $width ) .'px">' .
      do_shortcode( $content ) . '<p class="wp-media-credit">'.$credit.'</p>' . '</div>';
  }

  /**
   * Adding the custom fields to the $form_fields array
   */
  

  function image_attachment_fields_to_edit($form_fields, $post)
  {
    if ( ! in_array('custom-header', get_post_meta($post->ID, "_wp_attachment_context") ) && wp_attachment_is_image( $post->ID ) )
    {
      $form_fields["media_credit"] = array(
        "label" => __("Image Credit"),
        "input" => "text",
        "value" => get_post_meta($post->ID, "_media_credit", true)
      );

      $form_fields["media_credit"]["label"] = __( "Image Credit" );
      $form_fields["media_credit"]["input"] = "text";
      $form_fields["media_credit"]["value"] = get_post_meta( $post->ID, "_media_credit", true );
    }

    return $form_fields;
  }

  /**
   * Save the media credit
   */
  function custom_image_attachment_fields_to_save($post, $attachment) {
    if( isset( $attachment['media_credit'] ) )
    {
      update_post_meta($post['ID'], '_media_credit', $attachment['media_credit']);
    }
    return $post;
  }

}
