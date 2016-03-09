<?php

class UW_Page_Attributes_Meta_Box
{

  const ID = 'pageparentdiv';
  const TITLE = 'Page Attributes';
  const POSTTYPE = 'page';
  const POSITION = 'side';
  const PRIORITY = 'core';

  function __construct()
  {
    $this->HIDDEN = array( 'No Sidebar' );
    add_action( 'add_meta_boxes', array( $this, 'replace_meta_box' ) );
    add_action( 'save_post', array( $this, 'save_postdata' ) );
    add_action( 'admin_head', array( $this, 'custom_style' ) );

  }

  function replace_meta_box()
  {
      remove_meta_box( 'pageparentdiv', 'page', 'side');
	    add_meta_box( 'uwpageparentdiv', 'Page Attributes', array( $this, 'page_attributes_meta_box' ), 'page', 'side', 'core' );
  }

  function page_attributes_meta_box( $post )
  {

    $post_type_object = get_post_type_object( $post->post_type );

    if ( $post_type_object->hierarchical )
    {
      $dropdown_args = array(
        'post_type'        => $post->post_type,
        'exclude_tree'     => $post->ID,
        'selected'         => $post->post_parent,
        'name'             => 'parent_id',
        'show_option_none' => __('(no parent)'),
        'sort_column'      => 'menu_order, post_title, sidebar, parent',
        'echo'             => 0,
      );

          /**
           * Filter the arguments used to generate a Pages drop-down element.
           *
           * @since 3.3.0
           *
           * @see wp_dropdown_pages()
           *
           * @param array   $dropdown_args Array of arguments used to generate the pages drop-down.
           * @param WP_Post $post          The current WP_Post object.
           */
          $dropdown_args = apply_filters( 'page_attributes_dropdown_pages_args', $dropdown_args, $post );

          $pages = wp_dropdown_pages( $dropdown_args );

          if ( ! empty( $pages ) )
          { ?>

            <p><strong><?php _e('Parent') ?></strong></p>
            <label class="screen-reader-text" for="parent_id"><?php _e('Parent') ?></label>

            <?php echo $pages; 
                  $parent = get_post_meta($post->ID, "parent", true);
                  wp_nonce_field( 'parent_nonce' , 'parent_name' );
            ?>

            <p><input type="checkbox" id="parent_id" name="parentcheck" value="on" <?php if( !empty($parent) ) { ?>checked="checked"<?php } ?> /><?php _e('Hide from menu') ?></p>

            <?php
          } // end empty pages check
    } // end hierarchical check.

    if ( 'page' == $post->post_type && 0 != count( get_page_templates( $post ) ) ) {
      $template = !empty($post->page_template) ? $post->page_template : 'default';
      ?>


    <p><strong><?php _e('Template') ?></strong></p>

    <label class="screen-reader-text" for="page_template"><?php _e('Page Template') ?></label>

    <?php $this->page_template_dropdown($template , $post); ?>

    <?php }
    $sidebar = get_post_meta($post->ID, "sidebar", true);
    wp_nonce_field( 'sidebar_nonce' , 'sidebar_name' );
    ?>

    <p><strong><?php _e('Sidebar') ?></strong></p>

    <label class="screen-reader-text" for="sidebar"><?php _e('Sidebar') ?></label>

    <p><input type="checkbox" id="sidebar_id" name="sidebarcheck" value="on" <?php if( !empty($sidebar) ) { ?>checked="checked"<?php } ?> /><?php _e('No Sidebar') ?></p>

    <p><strong><?php _e('Order') ?></strong></p>

    <p><label class="screen-reader-text" for="menu_order"><?php _e('Order') ?></label><input name="menu_order" type="text" size="4" id="menu_order" value="<?php echo esc_attr($post->menu_order) ?>" /></p>

    <p><?php if ( 'page' == $post->post_type ) _e( 'Need help? Use the Help tab in the upper right of your screen.' ); ?></p>

    <?php
  }

  function page_template_dropdown( $default = '' , $post) {

    $previews = array('Big Hero' => '/assets/images/template-big-hero.jpg', 'Small Hero' => '/assets/images/template-small-hero.jpg', 'No image' => '/assets/images/template-no-image.jpg', 'No title/image' => '/assets/images/template-no-title.jpg', 'Default Template' => '/assets/images/template-default.jpg');

    $templates = get_page_templates( get_post() );

    ksort( $templates );

    echo "<div class='uw-admin-template'>";
    $checked = checked( $default, 'default', false );
    echo "<p><input type='radio' name='page_template' value='default' $checked >Default Template</input> (<a id='enchanced-preview' href='#'>preview<span><img src='" . get_stylesheet_directory_uri() . $previews['Default Template'] . "' alt='' width='300px' height='' />
</span></a>)</p>";
    foreach ( array_keys( $templates ) as $template )
    {
      if( in_array($template, $this->HIDDEN ))
      {
        continue;
      }

      $checked = checked( $default, $templates[ $template ], false );
      echo "<p><input type='radio' name='page_template' value='" . $templates[ $template ] . "' $checked >$template</input> " . ( array_key_exists( $template , $previews ) ? "(<a id='enchanced-preview' href='#'>preview<span><img src='" . get_stylesheet_directory_uri() . $previews[$template] . "' alt='' width='300px' height='' />
</span></a>)" : "") . "</p>";
    }
    echo "</div>";
    if ($default === "templates/template-big-hero.php" || $default === "templates/template-small-hero.php") { 
      if (is_super_admin()) { 
        $banner = get_post_meta($post->ID, "banner", true);
        wp_nonce_field( 'banner_nonce' , 'banner_name' );

        $buttontext = get_post_meta($post->ID, "buttontext", true);
        wp_nonce_field( 'buttontext_nonce' , 'buttontext_name' );

        $buttonlink = get_post_meta($post->ID, "buttonlink", true);
        wp_nonce_field( 'buttonlink_nonce' , 'buttonlink_name' );

        $mobileimage = get_post_meta($post->ID, "mobileimage", true);
        wp_nonce_field( 'mobileimage_nonce' , 'mobileimage_name' );

        echo "<p><b>Banner</b></br><input type='text' name='bannertext' value='" . $banner . "'></p>";
        echo "<p><b>Button</b></br>Text</br><input type='text' name='buttontext' value='" . $buttontext . "'></br>Link</br><input type='text' name='buttonlink' value='" . $buttonlink . "'></p>";
        echo "<p><b>Mobile Header Image</b></br><input type='text' name='mobileimagetext' value='" . $mobileimage . "'></p>";
      }
    }
  }

  function custom_style() {
      wp_enqueue_style( 'uw-admin-template', get_template_directory_uri() . '/assets/admin/css/uw.admin.template.css' );
  }

  function save_postdata( $post_ID = 0 ){
    $post_ID = (int) $post_ID;
    $post_type = get_post_type( $post_ID );
    $post_status = get_post_status( $post_ID );
    if (!isset($post_type) || 'page' != $post_type ) {
        return $post_ID;
    }

    if ( isset( $_POST['banner_name'] ) ) { 
      if ( ! empty( $_POST ) && check_admin_referer( 'banner_nonce', 'banner_name') ) { //limit to only pages
        if ($post_type) {
          if(isset($_POST["bannertext"])) {
            update_post_meta($post_ID, "banner", $_POST["bannertext"]);
          } else {
            update_post_meta($post_ID, "banner", null); 
          }
        }
      }
    }

    if ( isset( $_POST['buttontext_name'] ) ) { 
      if ( ! empty( $_POST ) && check_admin_referer( 'buttontext_nonce', 'buttontext_name') ) { //limit to only pages
        if ($post_type) {
          if(isset($_POST["buttontext"])) {
            update_post_meta($post_ID, "buttontext", $_POST["buttontext"]);
          } else {
            update_post_meta($post_ID, "buttontext", null); 
          }
        }
      }
    }

    if ( isset( $_POST['buttonlink_name'] ) ) { 
      if ( ! empty( $_POST ) && check_admin_referer( 'buttonlink_nonce', 'buttonlink_name') ) { //limit to only pages
        if ($post_type) {
          if(isset($_POST["buttonlink"])) {
            update_post_meta($post_ID, "buttonlink", $_POST["buttonlink"]);
          } else {
            update_post_meta($post_ID, "buttonlink", null); 
          }
        }
      }
    }

    if ( isset( $_POST['mobileimage_name'] ) ) { 
      if ( ! empty( $_POST ) && check_admin_referer( 'mobileimage_nonce', 'mobileimage_name') ) { //limit to only pages
        if ($post_type) {
          if(isset($_POST["mobileimagetext"])) {
            update_post_meta($post_ID, "mobileimage", $_POST["mobileimagetext"]);
          } else {
            update_post_meta($post_ID, "mobileimage", null); 
          }
        }
      }
    }

    if ( isset( $_POST['sidebar_name'] ) ) { 
      if ( ! empty( $_POST ) && check_admin_referer( 'sidebar_nonce', 'sidebar_name') ) { //limit to only pages
        if ($post_type) {
          if(isset($_POST["sidebarcheck"])) {
            update_post_meta($post_ID, "sidebar", $_POST["sidebarcheck"]);
          } else {
            update_post_meta($post_ID, "sidebar", null); 
          }
        }
      }
    }

    if ( isset( $_POST['parent_name'] ) ) { 
      if ( ! empty( $_POST ) && check_admin_referer( 'parent_nonce', 'parent_name') ) { //limit to only pages
        if ($post_type) {
          if(isset($_POST["parentcheck"])) {
            update_post_meta($post_ID, "parent", $_POST["parentcheck"]);
          } else {
            update_post_meta($post_ID, "parent", null); 
          }
        }
      }
    }

   return $post_ID;
  }

}

new UW_Page_Attributes_Meta_Box;
