<?php

//       Name: UW Top Posts
//       Description: A widget that shows top posts and most recent posts on your blog

class UW_Widget_Top_Posts extends WP_Widget
{

  // Define constants for the widget id, title, description, number of items to fetch, maximum number of items to show.
  const ID    = 'uw-widget-top-posts';
  const TITLE = 'UW Top Posts';
  const DESC  = 'A widget that shows top posts on your blog';
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

    // The function `stats_get_csv` is provided by the Jetpack plugin.
    // This widget is not enabled if this function does not exist.
    // - Note the `stats_get_csv` function caches its results for `300` seconds based on its input parameters
    // The `stats_get_csv` functions also fetches pages, so we have to accommodate for them and remove them from the results

    $popular = $this->filterResults( stats_get_csv( 'postviews', array( 'days' => self::DAYS, 'limit' => self::FETCH ) ) );

    // For development purposes, if there aren't any top posts then default to the latest posts.
    if ( ! $popular || sizeof( $popular ) < $items  )
      $popular =  wp_get_recent_posts( array( 'numberposts' => $items, 'post_status' => 'publish' ) , OBJECT );

    $title = apply_filters( 'widget_title', $title );

    ?>

    <?php echo $before_widget; ?>

    <h1><?php echo $title; ?></h1>

    <ul  class="popular-posts">

    <?php foreach ( $popular as $index => $post ) : if ( $index >= $instance['items'] ) break; ?>

          <li>
            <a class="widget-thumbnail" href="<?php echo $post->post_permalink ?>" title="<?php echo esc_attr( $post->post_title ) ?>">

            <?php if ( has_post_thumbnail( $post->post_id ) ) : ?>

              <?php echo get_the_post_thumbnail( $post->post_id, 'thumbnail' ); ?>

            <?php endif; ?>

            <a class="widget-link" href="<?php echo $post->post_permalink ?>" title="<?php echo esc_attr( $post->post_title ) ?>">
              <?php echo $post->post_title; ?>
            </a>

            <p><small><?php echo $this->convertViews( $post->views ) ?></small></p>

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
    $instance['title']   = $new_instance['title'];
    $instance['items'] = (int) $new_instance['items'];
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

  // This function filters the 20 results fetched by `stats_get_csv` and removes pages from the results
  function filterResults( $results )
  {
    foreach ( $results as $post )
    {
      if ( 'post' === get_post_type( $post['post_id'] ) )
        $popular[] = $post;
    }
    return $this->convertToObject( $popular );
  }

  // A custom function that converts the numeric value of views to a shorthand version.
  // This function rounds down to the nearest thousand and replaces the last three zeros with a K.
  // Example: `543092 becomes 543K`.
  function convertViews( $views )
  {

    if ( ! $views )
      $views = rand( 0, 5000 );

    $numberOfViews =  $views >= 1000 ? floor( $views / 1000 ) . 'K' : $views ;
    return $numberOfViews . ' ' . _n( 'view', 'views', $views );
  }

  // A custom function that converts a multidimensional array to an array of objects for cleaner notation.
  function convertToObject( $stats )
  {
    return json_decode( json_encode( $stats ) );
  }

  // A custom function that replaces the post's timestamp with a the time since it was posted.
  function humanTime( $post_id )
  {
    return human_time_diff( get_the_time( 'U' , $post_id ), current_time('timestamp'));
  }

}

// A class that will instantiate the widget only if Jetpack is installed and the function `stats_get_csv` exists.
class UW_Top_Posts
{

  // Try to register the widget.
  function __construct()
  {
    add_action( 'widgets_init', array( $this, 'register' ) );
  }

  // Only register the widget if Jetpack is installed.
  function register()
  {
    if ( $this->jetpackInstalled() )
      register_widget( 'UW_Widget_Top_Posts' );
  }

  // Check to see if Jetpack is installed by seeing if the `stats_get_csv` function exists.
  // The `stats_get_csv` function is provided by the Jetpack Stats plugin.
  function jetpackInstalled()
  {
    return function_exists('stats_get_csv');
  }

}

// Instantiate the plugin
new UW_Top_Posts;
