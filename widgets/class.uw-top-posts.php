<?php

//       Name: UW Top Posts
//       Description: A widget that shows top posts and most recent posts on your blog

if ( ! class_exists( 'UW_Top_Posts' ) ) :

class UW_Top_Posts extends WP_Widget
{

  // Define constants for the widget id, title, description, number of items to fetch, maximum number of items to show.
  const ID    = 'uw-top-posts';
  const TITLE = 'UW Top Posts';
  const DESC  = 'A widget that shows top posts on your blog';
  const ITEMS = 5;
  const FETCH = 20;
  const DAYS  = 14;

  // Register the widget
  function __construct()
  {
    parent::__construct(
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

    if ( $this->jetpackInstalled() )
      $popular = $this->filterResults( stats_get_csv( 'postviews', array( 'days' => self::DAYS, 'limit' => self::FETCH ) ) );
    else
      echo '<!--';

    // For development purposes, if there aren't any top posts then default to the latest posts.
    //if ( ! $popular || sizeof( $popular ) < $items  )
    //  $popular =  wp_get_recent_posts( array( 'numberposts' => $items, 'post_status' => 'publish' ) , OBJECT );

    $title = apply_filters( 'widget_title', $title );

    ?>

    <?php echo $before_widget; ?>

    <h2><?php echo $title; ?>

      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="24.02px" height="16.794px" viewBox="0 0 24.02 16.794" enable-background="new 0 0 24.02 16.794" xml:space="preserve">
      <path fill="none" d="M1076.826-836c0,0.736,0.598,1.334,1.334,1.334c0.737,0,1.335-0.598,1.335-1.334v-6.666
        c0-0.088-0.009-0.176-0.026-0.262c-0.008-0.039-0.023-0.077-0.034-0.115c-0.013-0.045-0.023-0.09-0.041-0.133
        c-0.02-0.046-0.046-0.088-0.069-0.131c-0.018-0.033-0.032-0.067-0.053-0.099c-0.099-0.146-0.225-0.272-0.371-0.37
        c-0.031-0.021-0.066-0.036-0.1-0.054c-0.043-0.023-0.084-0.05-0.13-0.069c-0.044-0.018-0.089-0.027-0.134-0.041
        c-0.038-0.011-0.075-0.025-0.115-0.034c-0.086-0.017-0.174-0.026-0.262-0.026h-6.672c-0.737,0-1.334,0.597-1.334,1.334
        c0,0.736,0.597,1.333,1.334,1.333h3.451l-8.789,8.781l-3.06-3.058c-0.521-0.521-1.366-0.521-1.888,0l-5.338,5.333
        c-0.521,0.521-0.521,1.365,0,1.885c0.261,0.261,0.603,0.391,0.944,0.391c0.341,0,0.683-0.13,0.943-0.391l4.394-4.391l3.061,3.058
        c0.521,0.521,1.365,0.521,1.887,0l9.732-9.724V-836z"/>
      <path fill="#F58433" d="M21.351,8c0,0.736,0.598,1.334,1.334,1.334c0.737,0,1.335-0.598,1.335-1.334V1.334
        c0-0.088-0.009-0.176-0.026-0.262c-0.008-0.039-0.023-0.077-0.034-0.115c-0.013-0.045-0.023-0.09-0.041-0.133
        c-0.02-0.046-0.046-0.088-0.069-0.131c-0.018-0.033-0.032-0.067-0.053-0.099c-0.099-0.146-0.225-0.272-0.371-0.37
        c-0.031-0.021-0.066-0.036-0.1-0.054c-0.043-0.023-0.084-0.05-0.13-0.069c-0.044-0.018-0.089-0.027-0.134-0.041
        c-0.038-0.011-0.075-0.025-0.115-0.034C22.861,0.009,22.773,0,22.685,0h-6.672c-0.737,0-1.334,0.597-1.334,1.334
        c0,0.736,0.597,1.333,1.334,1.333h3.451l-8.789,8.781l-3.06-3.058c-0.521-0.521-1.366-0.521-1.888,0L0.39,13.724
        c-0.521,0.521-0.521,1.365,0,1.885C0.651,15.87,0.993,16,1.334,16c0.341,0,0.683-0.13,0.943-0.391l4.394-4.391l3.061,3.058
        c0.521,0.521,1.365,0.521,1.887,0l9.732-9.724V8z"/>
      </svg>

    </h2>

    <ul  class="popular-posts">

    <?php if (is_array($popular)){ 
    foreach ( $popular as $index => $post ) : if ( $index >= $instance['items'] ) break; ?>

          <?php //print_r($post);
          $post_permalink = get_permalink($post->ID);
          ?>
          <li>
            <a class="widget-thumbnail" href="<?php echo $post_permalink ?>" title="<?php echo esc_attr( $post->post_title ) ?>">

            <?php if ( has_post_thumbnail( $post->ID ) ) : ?>

              <?php echo get_the_post_thumbnail( $post->ID, 'thumbnail' ); ?>

            <?php endif; ?>

            <a class="widget-link" href="<?php echo $post_permalink ?>" title="<?php echo esc_attr( $post->post_title ) ?>">
              <?php echo $post->post_title; ?>
              <p><small><?php echo $this->convertViews( $post->views ) ?></small></p>
            </a>



          </li>

    <?php endforeach; }?>

    </ul>

    <?php echo $after_widget;
    if (!$this->jetpackInstalled()){
      echo '-->';
    }
    ?>

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
      if ( 'post' === get_post_type( $post['post_id'] ) && $post['post_id'] > 0 )
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

  // Check to see if Jetpack is installed by seeing if the `stats_get_csv` function exists.
  // The `stats_get_csv` function is provided by the Jetpack Stats plugin.
  function jetpackInstalled()
  {
    return function_exists('stats_get_csv');
  }

}

// Instantiate the plugin
register_widget( 'UW_Top_Posts' );

endif;
