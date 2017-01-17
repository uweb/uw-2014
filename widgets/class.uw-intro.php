<?php

//   #UW Horizontal Rule Widget
//   This widget styles custom intro text.

class UW_Intro_Text extends WP_Widget
{

  const ID = 'uw-intro-text';
  const TITLE = 'UW Intro Text';
  const DESCRIPTION = 'Italicized block of intro text.';

  private static $SHORTCODE_DEFAULTS = array();

  function __construct()
  {

    add_shortcode( 'intro', array( $this, 'intro_shortcode' ) );

    parent::__construct(
      $id = self::ID,
      $name = self::TITLE,
      $options = array(
        'description' => __( self::DESCRIPTION ),
        'classname'   => self::ID
      ) );
  }

  function widget($args, $instance)
  {

    extract( $args );

    extract( $instance );

    $content = '<p class="intro">'. $introContent . '</p>';

    echo $content;
  }

  function update( $new_instance, $old_instance )
  {
    $instance = array();
    $instance['introContent'] = strip_tags( $new_instance['introContent'] );
    return $instance;
  }

  function form($instance)
  {

    $introContent = isset( $instance['introContent'] ) ? esc_attr( $instance['introContent'] ) : '';
?>

    <p><label for="<?php echo $this->get_field_id('introContent'); ?>"><?php _e('Intro text:'); ?></label>
    <input class="widefat" id="<?php echo $this->get_field_id('introContent'); ?>" name="<?php echo $this->get_field_name('introContent'); ?>" type="text" value="<?php echo $introContent; ?>" /></p>

<?php
  }

  function intro_shortcode( $atts, $content )
  {
    extract( shortcode_atts( self::$SHORTCODE_DEFAULTS, $atts ) );

    return $content ? sprintf( '<p class="intro">%s</p>', $content ) : '';
  }


}

new UW_Intro_Text;