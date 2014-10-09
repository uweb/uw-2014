<?php

class UW_Blogroll extends WP_Widget
{

  const NAME        = 'Blogroll';
  const ID          = 'blogroll';
  const CLASSNAME   = 'uw-blogroll';
  const DESCRIPTION = 'Pull and display your sites blog posts';
  const LIMIT       = 2;

  function __construct()
  {

    parent::WP_Widget( self::ID , __( self::NAME ), array(
      'classname' => self::CLASSNAME,
      'description' => __( self::DESCRIPTION )
    ));

    add_shortcode( self::ID , array( $this, 'shortcode' ) );

  }

  function form( $instance )
  {
    $title  = empty( $instance['title'] ) ? self::NAME : esc_attr( $instance['title'] );
    $number = empty( $instance['number'] ) ? 2 : absint( $instance['number'] );
    ?>
      <p>
        <label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e( 'Title:', 'twentyfourteen' ); ?></label>
        <input id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" class="widefat" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
      </p>

      <p>
        <label for="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>"><?php _e( 'Number of posts to show:', 'twentyfourteen' ); ?></label>
        <input id="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'number' ) ); ?>" type="text" value="<?php echo esc_attr( $number ); ?>" size="3">
      </p>

    <?php
  }

  function update( $new_instance, $instance )
  {
		$instance['title']  = strip_tags( $new_instance['title'] );
		$instance['number'] = empty( $new_instance['number'] ) ? self::LIMIT : absint( $new_instance['number'] );
		return $instance;
  }

  function widget( $args, $instance )
  {
    // todo: temporary html solution
    extract( $args );
    extract( $instance );

		$title  = apply_filters( 'widget_title', $title );

		echo $args['before_widget'];
    echo '<h2>' . $title .'</h2>';

    echo do_shortcode( "[".self::ID." number={$number}/]");

		echo $args['after_widget'];

  }

  function shortcode( $atts )
  {

    // todo: consider renaming these to match the get_post variables
		$params = shortcode_atts( array(
			'excerpt'      => 'true',
			'trim'         => 'false',
			'image'        => 'hide',
			'author'       => 'show',
      'titletag'     => 'h2',
      'post_type'    =>  'post',
			'number'       =>  5
			), $atts );

    if ( !array_key_exists('numberposts', $params ) )
      $params['numberposts'] = $params['number'];

		$posts = get_posts( $params );

    $params = (object) $params;

		foreach ( $posts as $post ) {

      $link = get_permalink( $post->ID );

      if ( $this->is_true( $params->excerpt ) )
      {

          $excerpt = has_excerpt( $post->ID ) ? $post->post_excerpt : apply_filters('widget_text', $post->post_content);

          if ( $this->is_true( $params->trim ) )
              $excerpt = wp_trim_words( $excerpt );

          //using apply_filters('the_content', $excerpt) causes an infinite loop
          $excerpt = wpautop( $excerpt );

          if ( $this->is_true( $params->image ) )
          {
              $image = get_the_post_thumbnail( $post->ID , 'thumbnail', array( 'style'=>'float:left;padding-right:10px;' ) );
              $class = 'class="pull-left"';
          }
      }

      $author = $this->is_true( $params->author ) ? '<p class="author-info">' . get_the_author_meta( 'display_name', $post->post_author ) . '</p>' : '';

      $date   = get_the_time( get_option( 'date_format' ), $post->ID );

      $html  .= "<li $class>$image<span><{$params->titletag}><a href=\"$link\">{$post->post_title}</a><p class=\"date\">{$date}</p></{$params->titletag}>{$author}{$excerpt}</span></li>";
    }

  	return "<ul class=\"shortcode-blogroll\">$html</ul>";

  }

  // consider normalizing the show/hides and true/falses
  private function is_true( $attribute )
  {
    return in_array( $attribute , array( 'show', 'true' ) );
  }

}

//new UW_Blogroll;

register_widget( 'UW_Blogroll' );
