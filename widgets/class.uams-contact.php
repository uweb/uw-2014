<?php

/**
 *
 * Contact Card widget
 *
 * List of contacts
 */

class UAMS_Widget_Contact extends WP_Widget
{

  const DEFAULT_LINK_TEXT = 'More';

  function UAMS_Widget_Contact()
  {
		parent::WP_Widget( $id = 'uams-contact-list', $name = 'Contact list', $options = array( 'description' => 'Display important contact information', 'classname' => 'contact-widget' ) );

    if ( is_admin() )
      add_action('admin_enqueue_scripts', array( __CLASS__, 'scripts') );
  }

  public static function scripts()
  {
    wp_enqueue_script( 'contact-card',  get_bloginfo('template_directory') . '/assets/admin/js/widgets/uams.contact-widget.js' );
    wp_enqueue_script( 'jquery-ui-autocomplete' );
    wp_enqueue_media();
  }

/*
  function form( $instance )
  {

    $title = isset($instance['title']) ? esc_attr($instance['title']) : 'Contact us';
    //$person_name = isset($instance['person_name']) ? esc_attr($instance['person_name']) : 'Name';
    //$person_title = isset($instance['person_title']) ? esc_attr($instance['person_title']) : 'Title';
    //$person_phone = isset($instance['person_phone']) ? esc_attr($instance['person_phone']) : 'Telephone number';
    //$person_email = isset($instance['person_email']) ? esc_attr($instance['person_email']) : 'Email';


    ?>

    <div id="contact-group">
      <p>
        <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?>  <small><b>(Search and autofill by typing a title)</b></small></label>
        <input data-posttype="post" class="widefat wp-get-posts" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
      </p>

  </div>


  <!--||||||||||||||| Build out form from array |||||||||||||||-->


  <div id="the-people">

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
            echo '<p class=\'person-email\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_email' ) . '[]' . '" type="text" value="' . $email . '"/></p><a class=\'remove button\'>Remove</a></div>';

        }

      } else {
            $name = $instance['person_name'];
            $title = $instance['person_title'];
            $phone = $instance['person_phone'];
            $email = $instance['person_email'];

            echo '<div class=\'peep\'><p class=\'person-name\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_name' ) . '[]' . '" type="text" value="' . $name . '"/></p>';
            echo '<p class=\'person-title\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_title' ) . '[]' . '" type="text" value="' . $title . '"/></p>';
            echo '<p class=\'person-phone\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_phone' ) . '[]' . '" type="text" value="' . $phone . '"/></p>';
            echo '<p class=\'person-email\'><input data-posttype="post" class="widefat wp-get-posts" id="" name="' . $this->get_field_name( 'person_email' ) . '[]' . '" type="text" value="' . $email . '"/></p><a class=\'remove button\'>Remove</a></div>';

      }
    }


    ?>

  </div>

    <a class="button button-primary" href="#" id="person-button">Add person</a>


    <!--||||||||||||||| Underscore template |||||||||||||||-->

    <script type="text/template" id="redirect-template">
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
*/

  public function widget( $args, $instance ) {
		extract($args);
		$title = apply_filters('widget_title', empty($instance['title']) ? __('List') : $instance['title']);
		$amount = empty($instance['amount']) ? 1 : $instance['amount'];

		for ($i = 1; $i <= $amount; $i++) {
			$person_names[$i-1] = $instance['person_name'.$i];
			$person_titles[$i-1] = $instance['person_title'.$i];
			$person_phones[$i-1] = $instance['person_phone'.$i];
			$person_emails[$i-1] = $instance['person_email'.$i];
		}

		echo $before_widget ?>

		<div class="contact-widget-inner">
      		<span>

      		<?php if ( ! empty( $title) ) : ?>
      		<h2 class="widgettitle"><?php echo $title; ?></h2>
      		<?php endif; ?>

      		</span>


	<?php
		foreach ($person_names as $num => $person_name) :
			if (!empty($person_name)) :
					echo ("<h3 class=\'person-name\'>" . $person_name . "</h3>");
            		echo (!empty($person_titles[$num]) ? '<p class=\'person-title\'>' . $person_titles[$num] . '</p>' : '');
            		echo (!empty($person_phones[$num]) ? '<p><a href=\'tel:' . $person_phones[$num] . '\'class=\'person-phone\'>' . $person_phones[$num] . '</a></p>' : '');
            		echo (!empty($person_emails[$num]) ? '<a href=\'mailto:' . $person_emails[$num] . '\'class=\'person-email\'>' . $person_emails[$num] . '</a>' : '');
			endif;
		endforeach;

		echo $after_widget;
	}

	function update( $new_instance, $old_instance) {
		//$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$amount = $new_instance['amount'];
		$new_person = empty($new_instance['new_person']) ? false : strip_tags($new_instance['new_person']);

		if ( isset($new_instance['position1'])) {
			for($i=1; $i<= $new_instance['amount']; $i++){
				if($new_instance['position'.$i] != -1){
					$position[$i] = $new_instance['position'.$i];
				}else{
					$amount--;
				}
			}
			if($position){
				asort($position);
				$order = array_keys($position);
				if(strip_tags($new_instance['new_person'])){
					$amount++;
					array_push($order, $amount);
				}
			}

		}else{
			$order = explode(',',$new_instance['order']);
			foreach($order as $key => $order_str){
				$num = strrpos($order_str,'-');
				if($num !== false){
					$order[$key] = substr($order_str,$num+1);
				}
			}
		}

		if($order){
			foreach ($order as $i => $item_num) {
				$instance['person_name'.($i+1)] = empty($new_instance['person_name'.$item_num]) ? '' : strip_tags($new_instance['person_name'.$item_num]);
				$instance['person_title'.($i+1)] = empty($new_instance['person_title'.$item_num]) ? '' : strip_tags($new_instance['person_title'.$item_num]);
				$instance['person_phone'.($i+1)] = empty($new_instance['person_phone'.$item_num]) ? '' : strip_tags($new_instance['person_phone'.$item_num]);
				$instance['person_email'.($i+1)] = empty($new_instance['person_email'.$item_num]) ? '' : strip_tags($new_instance['person_email'.$item_num]);
			}
		}

		$instance['amount'] = $amount;

		return $instance;
	}

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'title' => '', 'text' => '', 'title_link' => '' ) );
		$title = strip_tags($instance['title']);
		$amount = empty($instance['amount']) ? 1 : $instance['amount'];

		for ($i = 1; $i <= $amount; $i++) {
			$person_names[$i] = empty($instance['person_name'.$i]) ? '' : $instance['person_name'.$i];
			$person_titles[$i] = empty($instance['person_title'.$i]) ? '' : $instance['person_title'.$i];
			$person_phones[$i] = empty($instance['person_phone'.$i]) ? '' : $instance['person_phone'.$i];
			$person_emails[$i] = empty($instance['person_email'.$i]) ? '' : $instance['person_email'.$i];
		}
		$title_link = $instance['title_link'];
?>

		<p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></p>
		<ul class="uams-contact-instructions">
			<li class="hide-if-no-js"><?php echo __("Reorder the list items by clicking and dragging the name."); ?></li>
			<li class="hide-if-no-js"><?php echo __("To remove an item, simply click the 'Remove' button."); ?></li>
			<li class="hide-if-js"><?php echo __("Reorder or delete an item by using the 'Position/Action' table below."); ?></li>
			<li class="hide-if-js"><?php echo __("To add a new item, check the 'Add New Item' box and save the widget."); ?></li>
		</ul>
		<div class="the-people">
		<div class="uams-contact-list">
		<?php foreach ($person_names as $num => $person_name) :
			$person_name = esc_attr($person_name);
			$person_title = esc_attr($person_titles[$num]);
			$person_phone = esc_attr($person_phones[$num]);
			$person_email = esc_attr($person_emails[$num]);
		?>

			<div id="<?php echo $this->get_field_id($num); ?>" class="list-item">
				<h5 class="moving-handle"><span class="number"><?php echo $num; ?></span>. <span class="person-title"><?php echo $person_name; ?></span><a class="uams-contact-action hide-if-no-js"></a></h5>
				<div class="uams-contact-edit-item">
					<label for="<?php echo $this->get_field_id('person_name'.$num); ?>"><?php echo __("Name:"); ?></label>
					<input class="widefat" id="<?php echo $this->get_field_id('person_name'.$num); ?>" name="<?php echo $this->get_field_name('person_name'.$num); ?>" type="text" value="<?php echo $person_name; ?>" />
					<label for="<?php echo $this->get_field_id('person_title'.$num); ?>"><?php echo __("Title:"); ?></label>
					<input class="widefat" id="<?php echo $this->get_field_id('person_title'.$num); ?>" name="<?php echo $this->get_field_name('person_title'.$num); ?>" type="text" value="<?php echo $person_title; ?>" />
					<label for="<?php echo $this->get_field_id('person_phone'.$num); ?>"><?php echo __("Phone:"); ?></label>
					<input class="widefat" id="<?php echo $this->get_field_id('person_phone'.$num); ?>" name="<?php echo $this->get_field_name('person_phone'.$num); ?>" type="text" value="<?php echo $person_phone; ?>" />
					<label for="<?php echo $this->get_field_id('person_email'.$num); ?>"><?php echo __("Email:"); ?></label>
					<input class="widefat" id="<?php echo $this->get_field_id('person_email'.$num); ?>" name="<?php echo $this->get_field_name('person_email'.$num); ?>" type="text" value="<?php echo $person_email; ?>" />
					<a class="uams-contact-delete remove button hide-if-no-js"><?php echo __("Remove"); ?></a><br/>
				</div>
			</div>

		<?php endforeach;

		if ( isset($_GET['editwidget']) && $_GET['editwidget'] ) : ?>
			<table class='widefat'>
				<thead><tr><th><?php echo __("Item"); ?></th><th><?php echo __("Position/Action"); ?></th></tr></thead>
				<tbody>
					<?php foreach ($person_names as $num => $person_name) : ?>
					<tr>
						<td><?php echo esc_attr($person_name); ?></td>
						<td>
							<select id="<?php echo $this->get_field_id('position'.$num); ?>" name="<?php echo $this->get_field_name('position'.$num); ?>">
								<option><?php echo __('&mdash; Select &mdash;'); ?></option>
								<?php for($i=1; $i<=count($items); $i++) {
									if($i==$num){
										echo "<option value='$i' selected>$i</option>";
									}else{
										echo "<option value='$i'>$i</option>";
									}
								} ?>
								<option value="-1"><?php echo __("Delete"); ?></option>
							</select>
						</td>
					</tr>
					<?php endforeach; ?>
				</tbody>
			</table>

			<div class="uams-contact-row">
				<input type="checkbox" name="<?php echo $this->get_field_name('new_person'); ?>" id="<?php echo $this->get_field_id('new_person'); ?>" /> <label for="<?php echo $this->get_field_id('new_person'); ?>"><?php echo __("Add New Person"); ?></label>
			</div>
		<?php endif; ?>

		</div>
		<div class="uams-contact-row hide-if-no-js">
			<a class="uams-contact-add button button-primary"><?php echo __("Add Item"); ?></a>
		</div>

		<input type="hidden" id="<?php echo $this->get_field_id('amount'); ?>" class="amount" name="<?php echo $this->get_field_name('amount'); ?>" value="<?php echo $amount ?>" />
		<input type="hidden" id="<?php echo $this->get_field_id('order'); ?>" class="order" name="<?php echo $this->get_field_name('order'); ?>" value="<?php echo implode(',',range(1,$amount)); ?>" />
		</div>

<?php
	}

}

register_widget( 'UAMS_Widget_Contact' );
