<?php
function add_uw_page_attributes() 
{
    global $post;
    $post_type = get_post_type($post);
    if ( post_type_supports($post_type, 'page-attributes') )
    {
        remove_meta_box('pageparentdiv', 'page', 'side');
	    add_meta_box('uwpageparentdiv', 'Page Attributes', 'uw_page_attributes_meta_box', 'page', 'side', 'core');
    }
}

add_action('add_meta_boxes', 'add_uw_page_attributes', 15, 2);

function uw_page_attributes_meta_box($post)
{
	$post_type_object = get_post_type_object($post->post_type);
	if ( $post_type_object->hierarchical ) {
		$dropdown_args = array(
			'post_type'        => $post->post_type,
			'exclude_tree'     => $post->ID,
			'selected'         => $post->post_parent,
			'name'             => 'parent_id',
			'show_option_none' => __('(no parent)'),
			'sort_column'      => 'menu_order, post_title',
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
		if ( ! empty($pages) ) {
?>
<p><strong><?php _e('Parent') ?></strong></p>
<label class="screen-reader-text" for="parent_id"><?php _e('Parent') ?></label>
<?php echo $pages; ?>
<?php
		} // end empty pages check
	} // end hierarchical check.
	if ( 'page' == $post->post_type && 0 != count( get_page_templates( $post ) ) ) {
		$template = !empty($post->page_template) ? $post->page_template : false;
		?>
<p><strong><?php _e('Template') ?></strong></p>
<label class="screen-reader-text" for="page_template"><?php _e('Page Template') ?></label><select name="page_template" id="page_template">
<option value='default'><?php _e('Default Template'); ?></option>
<?php
$front = uw_is_front_page($post);
uw_page_template_dropdown($front, $template);
?>
</select>
<?php
	} ?>
<p><strong><?php _e('Order') ?></strong></p>
<p><label class="screen-reader-text" for="menu_order"><?php _e('Order') ?></label><input name="menu_order" type="text" size="4" id="menu_order" value="<?php echo esc_attr($post->menu_order) ?>" /></p>
<p><?php if ( 'page' == $post->post_type ) _e( 'Need help? Use the Help tab in the upper right of your screen.' ); ?></p>
<?php
}

/**
 * Print out <option> HTML elements for the page templates drop-down.
 *
 * @since 1.5.0
 *
 * @param string $default Optional. The template file name. Default empty.
 */
function uw_page_template_dropdown( $front, $default = '' ) {
    $templates = get_page_templates( get_post() );
    if (!$front)
    {
        // CHANGE THE FOLLOWING TO CHANGE THE NAME OF THE BIG HERO TEMPLATE
        unset($templates['Big Hero']);
    }
	ksort( $templates );
	foreach ( array_keys( $templates ) as $template ) {
		$selected = selected( $default, $templates[ $template ], false );
		echo "\n\t<option value='" . $templates[ $template ] . "' $selected>$template</option>";
	}
}

function uw_is_front_page($post)
{
    if ($post->ID == get_option('page_on_front'))
    {
        return true;
    }
    else
    {
        return false;
    }
}
?>
