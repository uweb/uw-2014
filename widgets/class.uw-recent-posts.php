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

    $recent  =  wp_get_recent_posts( array( 'numberposts' => $items, 'post_status' => 'publish' ) , OBJECT );
    $title = apply_filters( 'widget_title', $title );
     if ( empty( $recent ) ) return '';

    ?>

    <?php echo $before_widget; ?>

    <h2><?php  echo $title; ?>

      <?php if ( $feed )  : ?>
        <a class="feed" id="rssfeed" href="<?php echo bloginfo('rss2_url'); ?>" alt=”subscribe via rss” style="float:right; font-size:14px; text-align:center; color:#4b2e83; margin-top:-7px">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="22.564px" height="22.948px" viewBox="0 0 22.564 22.948" enable-background="new 0 0 22.564 22.948" xml:space="preserve">
          <g>
            <path fill="none" stroke="#4C2F83" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M2.239,12.029
              c4.428,0.041,8.05,3.663,8.091,8.09"/>
            <path fill="none" stroke="#4C2F83" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M2.194,7.197
              c7.095,0.067,12.9,5.873,12.968,12.968"/>
            <path fill="none" stroke="#4C2F83" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M2.145,2.036
              c9.946,0.094,18.084,8.231,18.177,18.177"/>
          </g>
          <circle fill="#4C2F83" cx="3.16" cy="19.198" r="2.015"/>
          </svg>
          </br>
          Subscribe
        </a>
        <p class="hide feed">
          Copy & paste URL into e-reader
          <input type="text" name="textbox" value="<?php echo bloginfo('rss2_url'); ?>" style="width:100%;" /> <!-- //onclick="this.select()" --> 
        </p>
      <?php else: ?>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           width="25.526px" height="24.609px" viewBox="0 0 25.526 24.609" enable-background="new 0 0 25.526 24.609" xml:space="preserve">
        <g>
          <g>
            <path fill="#20A2ED" d="M12.763,0c-6.617,0-12,5.383-12,12c0,6.617,5.383,12,12,12s12-5.383,12-12C24.763,5.383,19.38,0,12.763,0z
               M12.763,21.818c-5.414,0-9.818-4.405-9.818-9.818s4.404-9.818,9.818-9.818S22.582,6.586,22.582,12S18.177,21.818,12.763,21.818z
               M13.854,7.638h-2.182v6.545h2.182v-0.001h3.272V12h-3.272V7.638z"/>
          </g>
        </g>
        </svg>
      <?php endif; ?>

    </h2>

      

    <ul class="recent-posts">
    <?php foreach ( $recent as $post ) : ?>

          <li>
            <a class="widget-thumbnail" href="<?php echo get_the_permalink( $post->ID ) ?>" title="<?php echo esc_attr( get_the_title( $post->ID ) ) ?>">

            <?php if ( has_post_thumbnail( $post->ID ) ) : ?>

              <?php echo get_the_post_thumbnail( $post->ID , 'thumbnail' ); ?>

            <?php endif; ?>

            <a class="widget-link" href="<?php echo get_the_permalink( $post->ID ) ?>" title="<?php echo esc_attr( get_the_title( $post->ID ) ) ?>">
              <?php echo get_the_title( $post->ID ) ?>
              <p><small><?php echo $this->humanTime( $post->ID ) ?> ago</small></p>
            </a>

          </li>

    <?php endforeach; ?>

    </ul>

    <?php if ( get_option( 'page_for_posts' ) && $more )  : ?>
      <a class="more" href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>">More</a>
    <?php endif; ?>

    <script>
    $("a.feed").unbind('click').on("click" , function(event){
      event.preventDefault();
      $("p.feed").toggleClass("hide");
      $("p.feed > input").select();
    });

    </script>

    <?php echo $after_widget; ?>


  <?php
  }

  // Save updated settings for the widget.
  // There is only one settings `items` which indicates how many items to display in the widget.
  function update( $new_instance, $old_instance )
  {
    $instance[ 'title' ]   = $new_instance['title'];
    $instance[ 'items' ] = (int) $new_instance['items'];
    $instance[ 'more' ] = (bool) $new_instance['more'];
    $instance[ 'feed' ] = (bool) $new_instance['feed'];
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

    <p>

      <input type="checkbox" id="<?php echo $this->get_field_id( 'more' ); ?>" name="<?php echo $this->get_field_name( 'more' ); ?>" <?php checked(  $more , true, true )  ?> />
      <label for="<?php echo $this->get_field_id( 'more' ); ?>"><?php _e( 'Display more link' ); ?></label>


    </p>
     <p>

      <input type="checkbox" id="<?php echo $this->get_field_id( 'feed' ); ?>" name="<?php echo $this->get_field_name( 'feed' ); ?>" <?php checked(  $feed , true, true )  ?> />
      <label for="<?php echo $this->get_field_id( 'feed' ); ?>"><?php _e( 'Display rss feed link' ); ?></label>
      <!-- <input class="widefat" id="<?php echo $this->get_field_id( 'feed' ); ?>" name="<?php echo $this->get_field_name( 'feed' ); ?>" type="text" value="<?php echo esc_attr( $feed ) ?>" /> -->


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
