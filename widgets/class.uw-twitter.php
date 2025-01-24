<?php

//
//  Twitter widget
//
//  Uses the Twitter 1.1 API requiring oAuth authentication just
//  to read tweets. Because of the new Twitter request limit this
//  widget caches a user's latest tweets for a minute.
//

class UW_Widget_Twitter extends WP_Widget
{

  const ID             = 'uw-twitter-feed';
  const SHORTCODE      = 'twitter';
  const NAME           = 'UW Twitter Feed';
  const DESCRIPTION    = 'Display your latest tweets';
  const CLASSNAME      = 'twitter-feed-widget';

  const COUNT          = 5;
  const ACCOUNT        = 'uw';

  function __construct()
  {
    parent::__construct(
      $id = self::ID,
      $name = self::NAME,
      $options = array(
          'description' => self::DESCRIPTION,
          'classname' => self::CLASSNAME
    ) );

    add_shortcode( self::SHORTCODE , array( $this, 'shortcode' ) );

  }

  function form($instance)
  {
    $name  = isset($instance['name']) ? esc_attr($instance['name']) : self::ACCOUNT;
    $count = isset($instance['count']) ? esc_attr($instance['count']) : self::COUNT;
?>
    <p>
    <label for="<?php echo $this->get_field_id( 'name' ); ?>"><?php _e( 'Twitter screen name:' ); ?></label>
    <input class="widefat" id="<?php echo $this->get_field_id( 'name' ); ?>" name="<?php echo $this->get_field_name( 'name' ); ?>" type="text" value="<?php echo esc_attr( $name ); ?>" />
    </p>

    <p>
    <label for="<?php echo $this->get_field_id( 'count' ); ?>"><?php _e( 'Number of tweets to show:' ); ?></label>
    <input class="widefat" id="<?php echo $this->get_field_id( 'count' ); ?>" name="<?php echo $this->get_field_name( 'count' ); ?>" type="text" value="<?php echo esc_attr( $count ); ?>" />
    </p>
<?php
  }

  function update( $new_instance, $old_instance )
  {
    $instance = array();
    $instance['title'] = strip_tags( $new_instance['title'] );
    $instance['name']  = strip_tags( $new_instance['name'] );
    $instance['count'] = intval( $new_instance['count'] );
    return $instance;
  }

  function shortcode( $atts )
  {
    extract( $atts );

    $count = $count == 0 || empty($count) ? 'undefined' : $count;

    $output = '<a class="twitter-timeline"
    			data-dnt="true"
    			data-tweet-limit=' . $count . '
    			href="https://twitter.com/' . $name . '?ref_src=twsrc%5Etfw">Tweets by' . $name . '</a>
    			<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';

    return $output;
  }

  function widget($args, $instance)
  {
    extract($instance);
    echo do_shortcode(sprintf("[twitter count=%s name=%s]", $count, $name));
  }

}

register_widget( 'UW_Widget_Twitter' );
