<?php
/**
 * Register custom mime-types that Wordpress doesn't allow by default
 *
 */

class UW_Mimes
{

  public $MIMES = array(
    // 'psd' => 'image/photoshop',
    'ai|eps' => 'application/postscript',
    'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'ppt' => 'application/vnd.ms-powerpoint'

  );

  function __construct()
  {
    add_filter('upload_mimes', array( $this, 'uw_add_custom_upload_mimes'), 10, 2);
  }

  function uw_add_custom_upload_mimes( $existing_mimes )
  {
    //echo '<script type="text/javascript">console.log("' . implode( '\n', $existing_mimes) . '")</script>';
    return array_merge( $existing_mimes, $this->MIMES );
  }


}
