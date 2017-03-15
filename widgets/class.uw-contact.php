<?php

/**
 *
 * Contact Card widget
 *
 * List of contacts
 */

class UW_Widget_Contact extends WP_Widget
{

  const DEFAULT_LINK_TEXT = 'More';

  function UW_Widget_Contact()
  {
		parent::__construct( $id = 'contact-list', $name = 'Contact list', $options = array( 'description' => 'Display important contact information', 'classname' => 'contact-widget' ) );

    if ( is_admin() )
      add_action('admin_enqueue_scripts', array( __CLASS__, 'scripts') );
  }

  public static function scripts()
  {
    wp_enqueue_script( 'contact-card',  get_bloginfo('template_directory') . '/assets/admin/js/widgets/uw.contact-widget.js' );
    wp_enqueue_script( 'jquery-ui-autocomplete' );
    wp_enqueue_media();
  }

  function form( $instance )
  {

    $title = isset($instance['title']) ? esc_attr($instance['title']) : 'Contact us';
    //$person_name = isset($instance['person_name']) ? esc_attr($instance['person_name']) : 'Name';
    //$person_title = isset($instance['person_title']) ? esc_attr($instance['person_title']) : 'Title';
    //$person_phone = isset($instance['person_phone']) ? esc_attr($instance['person_phone']) : 'Telephone number';
    //$person_email = isset($instance['person_email']) ? esc_attr($instance['person_email']) : 'Email';
    

    ?>

    <div id="contact-group" class="uw-contact-card-contact-group">
      <p>
        <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?>  <small><b>(Search and autofill by typing a title)</b></small></label>
        <input data-posttype="post" class="widefat wp-get-posts" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
      </p>

  </div>


  <!--||||||||||||||| Build out form from array |||||||||||||||-->


  <div id="the-people" class="uw-contact-card-the-people">
  
    <?php

    if (isset($instance['person_name'])) {

      $remake_form_person =  $instance['person_name'];

      if(is_array($remake_form_person)){

        foreach ($remake_form_person as $key => $values) {       

            $name = $instance['person_name'][$key];
            $title = $instance['person_title'][$key];
            $phone = $instance['person_phone'][$key];
            $email = $instance['person_email'][$key];

            echo '<div class=\'peep\'><p class=\'person-name\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_name' ) . '[]' . '" type="text" value="' . $name . '"/></p>';
            echo '<p class=\'person-title\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_title' ) . '[]' . '" type="text" value="' . $title . '"/></p>';
            echo '<p class=\'person-phone\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_phone' ) . '[]' . '" type="text" value="' . $phone . '"/></p>';
            echo '<p class=\'person-email\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_email' ) . '[]' . '" type="text" value="' . $email . '"/></p><a class=\'remove uw-contact-card-remove button\'>Remove</a></div>';

        }

      } else {
            $name = $instance['person_name'];
            $title = $instance['person_title'];
            $phone = $instance['person_phone'];
            $email = $instance['person_email'];

            echo '<div class=\'peep\'><p class=\'person-name\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_name' ) . '[]' . '" type="text" value="' . $name . '"/></p>';
            echo '<p class=\'person-title\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_title' ) . '[]' . '" type="text" value="' . $title . '"/></p>';
            echo '<p class=\'person-phone\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_phone' ) . '[]' . '" type="text" value="' . $phone . '"/></p>';
            echo '<p class=\'person-email\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_email' ) . '[]' . '" type="text" value="' . $email . '"/></p><a class=\'remove uw-contact-card-remove button\'>Remove</a></div>';

      }
     } 

    ?>

  </div>

    <a class="button button-primary uw-contact-card-add-person-button" href="#" id="person-button">Add person</a>

    
    <!--||||||||||||||| Underscore template |||||||||||||||-->

    <script type="text/template" id="redirect-template" class="uw-contact-card-redirect-template">
        <?php 
          $this->number = '<%- number %>'; 
        ?>
        <div class='peep'>
          <p><input class="widefat wp-get-posts" data-posttype="post" name="<?php echo $this->get_field_name( 'person_name][' ); ?>" type="text"  placeholder="Name"/></p>
          <p><input class="widefat wp-get-posts" data-posttype="post" name="<?php echo $this->get_field_name( 'person_title][' ); ?>" type="text"  placeholder="Title"/></p>          
          <p><input class="widefat wp-get-posts" data-posttype="post" name="<?php echo $this->get_field_name( 'person_phone][' ); ?>" type="text"  placeholder="Phone number"/></p>
          <p><input class="widefat wp-get-posts" data-posttype="post" name="<?php echo $this->get_field_name( 'person_email][' ); ?>" type="text"  placeholder="Email"/></p>
        </div>
    </script>


  <?php

  }

  function update($new_instance, $old_instance)
  {
    $instance['title'] = strip_tags( $new_instance['title'] );
    $instance['person_name'] = $new_instance['person_name'];
    $instance['person_title'] = $new_instance['person_title'];
    $instance['person_phone'] = $new_instance['person_phone'];
		$instance['person_email'] = $new_instance['person_email'];
    return $instance;
  
  }

  function widget($args, $instance)
  {

	extract( $args );
     $title = $instance['title'];
     $person_name = $instance['person_name'];
     $person_title = $instance['person_title'];
     $person_phone = $instance['person_phone'];
	   $person_email = $instance['person_email'];
    ?>

    <?php  echo $before_widget; ?>
    
    <div class="contact-widget-inner">
      <span>

      <?php if ( ! empty( $title) ) : ?>
      <h2 class="widgettitle"><?php echo $title; ?></h2>
      <?php endif; ?>

      </span>

   <?php 

    if (isset($instance['person_name'])) {

      $remake_form_person = $instance['person_name'];

      if(is_array($remake_form_person)){

        foreach ($remake_form_person as $key => $values) {   

            echo '<h3 class=\'person-name\'>' . $instance['person_name'][$key] . '</h3>';
            echo '<p class=\'person-title\'>' . $instance['person_title'][$key] . '</p>';
            echo '<p class=\'person-phone\'>' . $instance['person_phone'][$key] . '</p>';
            echo '<a href=\'mailto:' . $instance['person_email'][$key] . '\'class=\'person-email\'>' . $instance['person_email'][$key] . '</a>';

        }

      } else {
        echo '<h3 class=\'person-name\'>' . $instance['person_name'] . '</h3>';
        echo '<p class=\'person-title\'>' . $instance['person_title'] . '</p>';
        echo '<p class=\'person-phone\'>' . $instance['person_phone'] . '</p>';
        echo '<a href=\'mailto:' . $instance['person_email'] . '\'class=\'person-email\'>' . $instance['person_email'] . '</a>';
      }
    }

  ?>
  </div>
    <?php echo $after_widget;

  }
}

register_widget( 'UW_Widget_Contact' );
