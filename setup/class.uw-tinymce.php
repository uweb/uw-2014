<?php
/**
 * Adjusts settings for tinymce 
 *  - add the buttongroup and button name in the $remove array and it'll be filtred out by the `button` function
 */

class UW_TinyMCE
{

  private $remove = array(
    'theme_advanced_buttons2' => array( 'justifyfull' )
  );
  
  function UW_TinyMCE()
  {
    add_filter('tiny_mce_before_init', array( $this, 'buttons' ) );   
  }

  function buttons( $settings )
  {
    foreach ( $this->remove as $buttongroup=>$buttonlist )
    {
      if(array_key_exists($buttongroup, $settings)){
        $buttons = explode( ',' , $settings[ $buttongroup ] ); 
        $newBtns = array_diff( $buttons, $buttonlist );
        $settings[ $buttongroup ] = join( ',', $newBtns );
      }
    }
    return $settings;
  }
}
