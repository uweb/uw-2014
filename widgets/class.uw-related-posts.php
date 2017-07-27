<?php

//       Name: UW Related Posts
//       Description: A widget that shows related posts

if ( ! class_exists( 'UW_Widget_Related_Posts') ) :

class UW_Widget_Related_Posts extends WP_Widget
{

  // Define constants for the widget's id, title, description and number of related posts to show.
  const ID    = 'uw-widget-related-posts';
  const TITLE = 'UW Related Posts';
  const DESC  = 'A widget that shows posts related posts';
  const ITEMS = 5;

  // Instantiate the widget and the Jetpack_RelatedPosts class to use for gathering related posts.
  function UW_Widget_Related_Posts()
  {
      // Possible paramters to pass to the the `get_for_post_id` function: `size`, `post_type`, `has_terms`, `date_range` and `exclude_post_ids`.
      // - By default related posts go back one year
      /* [todo] make these widget options */
      $this->RelatedPostsOptions = array(
        'date_range' => array( 'from' => strtotime('last year') , 'to' => time() )
      );

      // Instantiate the Jetpack_RelatedPosts class
      $this->RelatedPosts = Jetpack_RelatedPosts::init(); //get_current_blog_id() , Jetpack_Options::get_option( 'id' ) );

      parent::__construct(
        $id      = self::ID,
        $name    = self::TITLE,
        $options = array(
          'description' => self::DESC,
          'classname'   => self::ID
        )
      );

  }

  function widget( $args, $instance )
  {
    extract( $args );
    extract( $instance );

    $title = apply_filters( 'widget_title', $title );
    $posts = $this->RelatedPosts->get_for_post_id( get_the_ID(), $this->RelatedPostsOptions );
    $posts = $this->convertToObject( $posts );

    echo $before_widget;

    ?>

    <?php if ( ! empty( $title ) ) echo $before_title . $title . $after_title; ?>

    <ul class="related-posts">

    <?php foreach ( $posts as $post ) : ?>

          <li>

            <a class="widget-thumbnail" href="<?php echo get_the_permalink( $post->id ) ?>" title="<?php echo esc_attr( get_the_title( $post->id ) ) ?>">

            <?php if ( has_post_thumbnail( $post->id ) ) : ?>

              <?php echo get_the_post_thumbnail( $post->id, 'thumbnail' ); ?>

            <?php endif; ?>

            <a class="widget-link" href="<?php echo get_the_permalink( $post->id ) ?>" title="<?php echo esc_attr( get_the_title( $post->id ) ) ?>">
              <?php echo get_the_title( $post->id ) ?>
            </a>

            <small><?php echo get_the_time( get_option( 'date_format' ), $post->id ) ?></small>

          </li>

    <?php endforeach; ?>

    </ul>

    <?php

    echo $after_widget;
  }

  // Save updated settings for the widget.
  // There is only one setting for now: `title`
  function update( $new_instance, $old_instance )
  {
    $instance['title'] = (String) $new_instance['title'];
    return $instance;
  }

  // The form for submitting changes to the widget.
  // Only one field exists `title`
  function form( $instance )
  {
    extract( $instance );
    $title = $title ? $title : self::TITLE;
    ?>

    <p>

      <label for="<?php echo $this->get_field_name( 'title' ) ?>"> <?php _e( 'Title:' )  ?> </label>

      <input name="<?php echo $this->get_field_name( 'title' ) ?>" id="<?php echo $this->get_field_id( 'title' ) ?>" type="text" value="<?php echo $title ?>"/>

    </p>

  <?php

	}



  // A custom function that converts a multidimensional array to an array of objects for cleaner notation.
  function convertToObject( $array )
  {
    return json_decode( json_encode( $array ) );
  }

}

// A class that will instantiate the widget only if Jetpack is installed and the function `get_for_post_id` exists.
class UW_Related_Posts
{

  // The priority needed to remove the actions Jetpack_RelatedPosts adds.
  const PRIORITY = 100;

  function UW_Related_Posts()
  {
    // Register the widget.
    add_action( 'widgets_init', array( $this, 'register' ) );

    // Remove the actions Jetpack_RelatedPosts adds.
    // The priority of `100` is necessary to ensure that Jetpack_RelatedPosts has already added its actions.
    add_action( 'plugins_loaded', array( $this, 'remove_related_posts_from_content'), self::PRIORITY );

  }

  // Only register the widget if Jetpack is installed.
  function register()
  {
    if ( $this->jetpackInstalled() )
      register_widget( 'UW_Widget_Related_Posts' );
  }

  // Remove the related posts javscript, css and html from the content.
  // This takes advantage of the PHP singleton pattern in `Jetpack_RelatedPosts::init()`.
  // Calling it doesn't reinstantiate the class but rather returns the already instantiated instance
  // which we use to remove it's actions and filters.
  function remove_related_posts_from_content()
  {
    if ( $this->jetpackInstalled() )
    {
      $jprp = Jetpack_RelatedPosts::init();
      remove_action( 'wp', array( $jprp, 'action_frontend_init' ), 10 );
      remove_filter( 'the_content', array( $jprp, 'filter_add_target_to_dom' ), 40 );
    }
  }

  // Check to see if Jetpack is installed by seeing if the class `Jetpack_RelatedPosts` exists.
  // The `get_for_post_id` function is provided by the Jetpack_RelatedPosts class and is used to gather related post
  function jetpackInstalled()
  {
    return class_exists('Jetpack_RelatedPosts');
  }

}

// Instantiate the plugin
new UW_Related_Posts;

endif;