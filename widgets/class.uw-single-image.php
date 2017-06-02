<?php

/**
 *
 * Single image widget
 *
 * Text paragraph and a single image are displayed
 */

class UW_Widget_Single_Image extends WP_Widget
{

  const DEFAULT_LINK_TEXT = 'More';

  function UW_Widget_Single_Image()
  {
		parent::__construct( $id = 'pic-text', $name = 'Single Image', $options = array( 'description' => 'Display an image with some featured text.', 'classname' => 'pic-text-widget' ) );

    if ( is_admin() )
      add_action('admin_enqueue_scripts', array( __CLASS__, 'scripts') );
  }

  public static function scripts()
  {
    wp_enqueue_script( 'single-image',  get_bloginfo('template_directory') . '/assets/admin/js/widgets/uw.single-image-widget.js' );
    wp_enqueue_script( 'jquery-ui-autocomplete' );
    wp_enqueue_media();
  }

  function form( $instance )
  {

    $title = isset($instance['title']) ? esc_attr($instance['title']) : 'Image Widget';
    $text  = isset($instance['text'])  ? esc_attr($instance['text'])  : '';
    $image = isset($instance['image']) ? esc_attr($instance['image']) : '';
    $src   = isset($instance['src']) ? esc_attr($instance['src']) : '';
    $link  = isset($instance['link']) ? esc_attr($instance['link']) : '';
    $linktext  = isset($instance['link-text']) ? esc_attr($instance['link-text']) : 'Read more';

    ?>

		<p>
		<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?>  <small><b>(Search and autofill by typing a title)</b></small></label>
		<input data-posttype="post" class="widefat wp-get-posts" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
		</p>

    <p>
      <div class="image-preview wp-get-posts-image-preview" style="width:33%; display:block;">
        <img src="<?php echo wp_get_attachment_url( $image ); ?>" width="100%" class="wp-get-posts-image" />
      </div>

      <a class="select-an-image button" href="#">Select an Image</a>
      <input id="<?php echo $this->get_field_id( 'image' ); ?>" class="wp-get-posts-imageID" name="<?php echo $this->get_field_name( 'image' ); ?>" type="hidden" value="<?php echo esc_attr( $image ); ?>"/>
      <input id="<?php echo $this->get_field_id( 'src' ); ?>" class="wp-get-posts-image site-panels-image-fix" name="<?php echo $this->get_field_name( 'src' ); ?>" type="hidden" value="<?php echo esc_attr( $src ); ?>"/>
    </p>

		<p>
		<label for="<?php echo $this->get_field_id( 'text' ); ?>"><?php _e( 'Featured text:' ); ?></label>
		<textarea class="widefat wp-get-posts-excerpt" style="resize:vertical" rows="5" cols="20" id="<?php echo $this->get_field_id('text'); ?>" name="<?php echo $this->get_field_name('text'); ?>"><?php echo esc_textarea( empty($instance['text']) ? '' : $instance['text'] ); ?></textarea>
		</p>

    <p>
    <label for="<?php echo $this->get_field_id('link'); ?>"><?php _e('Link:'); ?></label>
    <input id="single-image-link-<?php echo $this->id ?>" class="widefat  wp-get-posts-url" id="<?php echo $this->get_field_id('link'); ?>" name="<?php echo $this->get_field_name('link'); ?>" type="text" value="<?php echo $link; ?>" />
    </p>

    <p>
    <label for="<?php echo $this->get_field_id('link-text'); ?>"><?php _e('Link text:'); ?></label>
    <input id="single-image-link-text-<?php echo $this->id ?>" class="widefat" id="<?php echo $this->get_field_id('link-text'); ?>" name="<?php echo $this->get_field_name('link-text'); ?>" type="text" value="<?php echo $linktext; ?>" />
    </p>

  <?php

  }

  function update($new_instance, $old_instance)
  {
		$instance['title'] = strip_tags( $new_instance['title'] );
		$instance['text']  = strip_tags( $new_instance['text'] );
		$instance['image'] = (Int) $new_instance['image'];
		$instance['src']   = strip_tags( $new_instance['src'] );
		$instance['link']  = strip_tags( $new_instance['link'] );
		$instance['link-text']  = strip_tags( $new_instance['link-text'] );
    return $instance;
  }

  function widget($args, $instance)
  {

	extract( $args );
	$title = $instance['title'];
    $text  = $instance['text'];
    $image = $instance['image'];
    $link  = $instance['link'];
    $linktext  = isset($instance['link-text']) ? $instance['link-text'] : self::DEFAULT_LINK_TEXT;
    ?>

    <?php  echo $before_widget; ?>

      <?php echo wp_get_attachment_image( $image, 'single-image-widget', false, array('alt' => $title)); ?>

      <span>

      <?php if ( ! empty( $link) ) : ?>
      <h3><a href="<?php echo $link; ?>" class="pic-title">
      <?php endif; ?>

          <?php echo $title; ?>

      <?php if ( ! empty( $link) ) : ?>
        </a></h3>
      <?php endif; ?>

      <?php echo wpautop($text); ?>

      <?php if ( ! empty( $link) ) : ?>
        <a href="<?php echo $link; ?>" class="pic-text-more"><?php echo $linktext; ?></a>
      <?php else: ?>
        <br/>
      <?php endif; ?>
      </span>
    <?php echo $after_widget;

  }
}

register_widget( 'UW_Widget_Single_Image' );
