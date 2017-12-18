<?php

/**
 * UW Campus Map Widget
 */

class UW_Campus_Map extends WP_Widget
{

  const URL = '//www.washington.edu/maps/embed/?code=';

  function __construct()
  {
		parent::__construct( 'uw-campus-map', __('UW Campus Map'), array(
      'description' => __('Show your building on the UW campus map.'),
      'classname'   => 'uw-widget-campus-map'
    ) );
  }

  function widget( $args, $instance )
  {
    extract( $args );
    extract( $instance );

		$title = apply_filters( 'widget_title', $instance['title'] );
    $buildingCode = apply_filters( 'uw_campus_map_buildingcode', $instance['buildingCode'] );

    if ( !empty( $title ) )
       $content .= "<h3 class=\"widget-title\"> $before_title $title $after_title </h3>";

    $content .= '<div class="uw-campus-map-widget">
                  <iframe width="100%" height="305" src="'.self::URL.$buildingCode.'" style="border:0"></iframe>
                  <a href="http://www.washington.edu/maps/#!/'.$buildingCode.'" target="_blank">View larger</a>
                </div>';

    echo $before_widget . $content . $after_widget;
	}

  function update( $new_instance, $old_instance )
  {
		$instance = array();
		$instance['title'] = strip_tags( $new_instance['title'] );
		$instance['buildingCode'] = strip_tags( $new_instance['buildingCode'] );
		return $instance;
	}

  function form($instance)
  {

		$title        = isset($instance['title']) ? esc_attr($instance['title']) : '';
		$buildingCode = isset($instance['buildingCode']) ? esc_attr($instance['buildingCode']) : '';
?>
		<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" /></p>

		<p><label for="<?php echo $this->get_field_id('buildingCode'); ?>"><?php _e('Building Code:'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('buildingCode'); ?>" name="<?php echo $this->get_field_name('buildingCode'); ?>" type="text" value="<?php echo $buildingCode; ?>" /></p>

<?php
	}
}


register_widget( 'UW_Campus_Map' );
