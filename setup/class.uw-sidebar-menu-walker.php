<?php
class UW_Sidebar_Menu_Walker extends Walker_Page {

    public function start_el( &$output, $page, $depth = 0, $args = array(), $current_page = 0 ) {
        if ( $depth ) {
            $indent = str_repeat( "\t", $depth );
        } else {
            $indent = '';
        }

        $css_class = array( 'page_item', 'page-item-' . $page->ID );

        if ( isset( $args['pages_with_children'][ $page->ID ] ) ) {
            $css_class[] = 'page_item_has_children';
        }

        $is_current = false;
        if ( ! empty( $current_page ) ) {
            $_current_page = get_post( $current_page );
            if ( in_array( $page->ID, $_current_page->ancestors ) ) {
                $css_class[] = 'current_page_ancestor';
            }
            if ( $page->ID == $current_page ) {
                $is_current = true;
                $css_class[] = 'current_page_item';
            } elseif ( $_current_page && $page->ID == $_current_page->post_parent ) {
                $css_class[] = 'current_page_parent';
            }
        } elseif ( $page->ID == get_option('page_for_posts') ) {
            $css_class[] = 'current_page_parent';
        }

        /**  
         * Filter the list of CSS classes to include with each page item in the list.
         *
         * @since 2.8.0
         *
         * @see wp_list_pages()
         *
         * @param array   $css_class    An array of CSS classes to be applied
         *                             to each list item.
         * @param WP_Post $page         Page data object.
         * @param int     $depth        Depth of page, used for padding.
         * @param array   $args         An array of arguments.
         * @param int     $current_page ID of the current page.
         */
        $css_classes = implode( ' ', apply_filters( 'page_css_class', $css_class, $page, $depth, $args, $current_page ) ); 

        if ( '' === $page->post_title ) {
            $page->post_title = sprintf( __( '#%d (no title)' ), $page->ID );
        }

        $args['link_before'] = empty( $args['link_before'] ) ? '' : $args['link_before'];
        $args['link_after'] = empty( $args['link_after'] ) ? '' : $args['link_after'];

        /** This filter is documented in wp-includes/post-template.php */

        $parent = get_post_meta($page->ID, "parent"); 
        
        if ($is_current) {
            $output .= $indent . sprintf(
                '<li class="%s"><span>%s%s%s</span>',
                $css_classes,
                $args['link_before'],
                apply_filters( 'the_title', $page->post_title, $page->ID ),
                $args['link_after']
            );   
        } else if ((isset($parent[0]) && $parent[0] === "on") && $depth != 0) { 
            //$output = '';
        } else {
              $output .= $indent . sprintf(
                '<li class="%s"><a href="%s">%s%s%s</a>',
                $css_classes . " child-page-existance-tester",
                get_permalink( $page->ID ),
                $args['link_before'],
                apply_filters( 'the_title', $page->post_title, $page->ID ),
                $args['link_after']
            );   
        }


        if ( ! empty( $args['show_date'] ) ) {
            if ( 'modified' == $args['show_date'] ) {
                $time = $page->post_modified;
            } else {
                $time = $page->post_date;
            }

            $date_format = empty( $args['date_format'] ) ? '' : $args['date_format'];
            $output .= " " . mysql2date( $date_format, $time );
        }
    }    

}
