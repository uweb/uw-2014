<?php
/**
 * UW RSS Widget and shortcode
 *  - Only difference between this and WP one is this shows images
 */

class UW_RSS extends WP_Widget
{
  const ID          = 'uw-widget-rss';
  const NAME        = 'UW RSS';
  const DESCRIPTION = 'Similar to the Wordpress RSS widget but allows a blurb before the RSS feed is listed.';
  const ITEMS       = 10;

  private static $WIDGET_DEFAULTS  = array(
    'url'          => true,
    'title'        => true,
    'items'        => 10,
    'show_summary' => true,
    'show_author'  => true,
    'show_date'    => true,
    'show_image'   => true
  );

  private static $SHORTCODE_DEFAULTS = array(
    'url'     => null,
    'number'  => 5,
    'title'   => null,
    'heading' => 'h3',
    'span'    => 4
  );

  function __construct()
  {
    add_shortcode( 'rss', array( $this, 'uw_rss_shortcode') );

		parent::WP_Widget(
      $id      = self::ID,
      $name    = self::NAME,
      $options = array(
        'description' => self::DESCRIPTION,
        'classname'   => self::ID
      )
    );
	}

  function form( $instance )
  {
    $inputs = wp_parse_args( $instance , self::$WIDGET_DEFAULTS );

    extract( $inputs );

    $number = esc_attr( $number );
    $title  = esc_attr( $title );
    $url    = esc_url( $url );
    $items  = ( $items < 1 || 20 < $items ) ? self::ITEMS : $items;

    if ( !empty($error) )
      echo '<p class="widget-error"><strong>' . sprintf( __('RSS Error: %s'), $error) . '</strong></p>';
  ?>
		<p>
		<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Give the feed a title (optional):' ); ?></label>
    <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $instance['title']); ?>" />
		</p>

		<p>
		<label for="<?php echo $this->get_field_id( 'text' ); ?>"><?php _e( 'Featured blurb:' ); ?></label>
		<textarea class="widefat" style="resize:vertical" rows="14" cols="20" id="<?php echo $this->get_field_id('text'); ?>" name="<?php echo $this->get_field_name('text'); ?>"><?php echo esc_textarea($instance['text']); ?></textarea>
		</p>

		<p>
		<label for="<?php echo $this->get_field_id( 'url' ); ?>"><?php _e( 'Enter the RSS feed URL here:' ); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id( 'url' ); ?>" name="<?php echo $this->get_field_name( 'url' ); ?>" type="text" value="<?php echo esc_attr( $instance['url']); ?>" />
		</p>

    <p>
    <label for="<?php echo $this->get_field_id( 'items' ) ?>"><?php _e('Number of items to display:'); ?></label>
    <select id="<?php echo $this->get_field_id( 'items' ) ?>" name="<?php echo $this->get_field_name( 'items' ) ?>">
      <?php
          for ( $i = 1; $i <= 20; ++$i )
            echo "<option value='$i' " . selected( $items, $i, false ) . ">$i</option>";
      ?>
    </select>
    </p>

<?php

  }

  function update( $new_instance, $old_instance )
  {
		$instance['url']          = esc_url_raw( strip_tags( $new_instance['url'] ) );
		$instance['title']        = strip_tags( $new_instance['title'] );
		$instance['items']        = (int) ( $new_instance['items'] );
		$instance['show_image']   = (int) ( $new_instance['show_image'] );
		$instance['show_summary'] = (int) ( $new_instance['show_summary'] );
		$instance['show_author']  = (int) ( $new_instance['show_author'] );
		$instance['show_date']    = (int) ( $new_instance['show_date'] );

    // todo: this still necessary?
		if ( current_user_can('unfiltered_html') )
			$instance['text'] =  $new_instance['text'];
		else
			$instance['text'] = stripslashes( wp_filter_post_kses( addslashes( $new_instance['text']) ) );

		return $instance;
	}

  function widget( $args, $instance )
  {
    extract( $args );
    extract( $instance );

    $title = apply_filters( 'widget_title', $title );

    $content = '<span></span>';

    if ( ! empty( $title ) ) $content .= $before_title . $title . $after_title;

    $content .= "<div class=\"featured\">$text</div>";


    if ( strlen( $url ) > 0 )
    {

      $rss = fetch_feed( $url );

      if ( ! is_wp_error( $rss ) )
      {
        $url       = $rss->get_permalink();
        $maxitems  = $rss->get_item_quantity($instance['items']);

        $rss_items = $rss->get_items(0, $maxitems);

        $content  .= "<ul>";

        foreach ( $rss_items as $index=>$item )
        {
          $title = $item->get_title();
          $link  = $item->get_link();

          $enclosure = $item->get_enclosure();
          $src = $enclosure->link;

          $attr  = esc_attr(strip_tags($title));

          if ( $enclosure )
          {
            $image = "<a class='widget-thumbnail' href='$link' title='$attr'><img src='$src' title='$attr' /></a>";
          }

          $date = $item->get_date();
          $date = "<p>$date</p>";
          $title = "<a class='widget-link' href='$link' title='$attr'>$attr $date </a>";
          $content .= "<li>$image$title</li>";
        }

        $content .= '</ul>';
        $content .= "<a class=\"more\" href=\"$url\">More</a>";

      }

    }

    echo $before_widget . $content . $after_widget;
	}


  function uw_rss_shortcode( $atts )
  {
    extract( shortcode_atts( self::$SHORTCODE_DEFAULTS, $atts ) );

    if ( $url == null || is_feed() ) return '';

    $content = '';

    $feed = fetch_feed( $url );

    if ( ! is_wp_error( $feed ) )
    {
      $url = $feed->get_permalink();
      $feed_items = $feed->get_items( 0, $number );
      $feed_items = $feed->get_items( 0, $number );
      $pullleft = $span === 4 ? 'pull-left' : '';

      $title = ( $title == null ) ? $feed->get_title() : $title;

      $content = "<div class=\"row $pullleft\">";
      $content .= "<div class=\"span$span\">";
      $content .= "<div class=\"feed-in-body\"><a href=\"$url\" title=\"$title\"><$heading>$title</$heading></a></div>";
      $content .= "<ul>";

      foreach ($feed_items as $index=>$item)
      {
          $title = $item->get_title();
          $link  = $item->get_link();
          $attr  = esc_attr( strip_tags( $title ) );
          $content .= "<li><a href=\"$link\" title=\"$attr\">$title</a></li>";
      }

      $span--;
      $content .= "<a href=\"$url\" title=\"$title\" class=\"offset$span\">More</a>";
      $content .= '</ul>';
      $content .= "</div></div>";
    }
    return $content;
  }

}

register_widget( 'UW_RSS' );
