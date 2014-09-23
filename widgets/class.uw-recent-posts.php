<?php

//       Name: UW Top Posts
//       Description: A widget that shows top posts and most recent posts on your blog

class UW_Recent_Posts extends WP_Widget
{

  // Define constants for the widget id, title, description, number of items to fetch, maximum number of items to show.
  const ID    = 'uw-recent';
  const TITLE = 'UW Recent Posts';
  const DESC  = 'A widget that shows recent posts on your blog';
  const ITEMS = 5;
  const FETCH = 20;
  const DAYS  = 14;

  // Register the widget
  function __construct()
  {
    parent::WP_Widget(
      $id      = self::ID,
      $name    = self::TITLE,
      $options = array(
        'description' => self::DESC,
        'classname'   => self::ID
      )
    );


  }

  // Outputs the widget HTML
  function widget( $args, $instance )
  {
    extract( $args );
    extract( $instance );

    $recent  =  wp_get_recent_posts( array( 'numberposts' => $items, 'post_status' => 'publish' ) , OBJECT );
    $title = apply_filters( 'widget_title', $title );

    ?>

    <?php echo $before_widget; ?>

    <h1><?php  echo $title; ?></h1>

    <ul class="recent-posts">

    <?php foreach ( $recent as $post ) : ?>

          <li>
            <a class="widget-thumbnail" href="<?php echo get_the_permalink( $post->ID ) ?>" title="<?php echo esc_attr( get_the_title( $post->ID ) ) ?>">

            <?php if ( has_post_thumbnail( $post->ID ) ) : ?>

              <?php echo get_the_post_thumbnail( $post->ID , 'thumbnail' ); ?>

            <?php endif; ?>

            <a class="widget-link" href="<?php echo get_the_permalink( $post->ID ) ?>" title="<?php echo esc_attr( get_the_title( $post->ID ) ) ?>">
              <?php echo get_the_title( $post->ID ) ?>
            </a>

            <p><small><?php echo $this->humanTime( $post->ID ) ?> ago</small></p>

          </li>

    <?php endforeach; ?>

    </ul>

    <?php echo $after_widget; ?>

  <?php
  }

  // Save updated settings for the widget.
  // There is only one settings `items` which indicates how many items to display in the widget.
  function update( $new_instance, $old_instance )
  {
    $instance[ 'title' ]   = $new_instance['title'];
    $instance[ 'items' ] = (int) $new_instance['items'];
    return $instance;
  }

  // The form for submitting changes to the widget.
  // Only one field exists `items` to indicate how many items will be displayed by the widget.
  function form( $instance )
  {
    extract( $instance ); ?>

    <p>

      <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title' ); ?></label>

      <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ) ?>" />

    </p>


    <p>

      <label for="<?php echo $this->get_field_name( 'items' ) ?>"> <?php _e( 'Number of items to display:' )  ?> </label>

      <select name="<?php echo $this->get_field_name( 'items' ) ?>" id="<?php echo $this->get_field_id( 'items' ) ?>">

      <?php for ( $i = 1; $i <= self::ITEMS; $i++ ) : ?>

        <option value="<?php echo $i; ?>" <?php echo selected( $items, $i, false ) ?> ><?php echo $i; ?></option>

      <?php endfor; ?>

      </select>

    </p>

  <?php

  }

  // A custom function that replaces the post's timestamp with a the time since it was posted.
  function humanTime( $post_id )
  {
    return human_time_diff( get_the_time( 'U' , $post_id ), current_time('timestamp'));
  }

}

// Register the widget
register_widget( 'UW_Recent_Posts' );
