<?php
// Basic Wrapper for a custom post type. Allows child themes to easily make a custom post type
// and extend it if necessary also very easily
class UW_Custom_Post {

    //accepts args as required, which contains args and name. allows users to pass in labels
    //separately if they'd like. Builds the proper structure and registers
    //the new post type at the right time. Allows for custom taxonomy if present
    //structure for $args:
    //    array(
    //        'name'     => string,
    //        'args'     => array( args for custom post type as defined by codex ),
    //        'labels'   => array( labels array in args above ), *OPTIONAL*
    //        'taxonomy' => array( *OPTIONAL*
    //             'name'   => string,
    //             'args'   => array( args for custom taxonomy )
    //             'labels' => array( labels array in args above ), *OPTIONAL*
    //        )
    //    )
    //
    //    Allows for addition of an existing custom taxonomy to the custom post type
    
    public $post_label = 'Post';
    
    function __construct($args){
        if (empty($args['name'])){
            return;
        }
        $this->name = $args['name'];
        $this->args = $args['args'];
        if (isset($args['labels'])){
            $this->args['labels'] = $args['labels'];
        }
        else if (!isset($this->args['labels'])){
            if (isset($args['post_label'])){
                $this->post_label = $args['post_label'];
            }
            $this->args['labels'] = $this->label_gen();
        }
        add_action('init', array($this, 'register_post'));
        if (isset($args['taxonomy'])){
            $this->taxonomy = $args['taxonomy'];
            add_action('init', array($this, 'add_custom_taxonomy'));
        }
    }

    function label_gen(){
        return array(
            'name' => __( $this->post_label . 's' ),
            'singular_name' => __( $this->post_label ),
            'all_items' => __( $this->post_label . 's'),
            'menu_name' => __( $this->post_label . 's'),
            'add_new' => _x('Add New', $this->post_label ),
            'add_new_item' => __('Add New ' . $this->post_label ),
            'edit_item' => __('Edit ' . $this->post_label ),
            'new_item' => __('New ' . $this->post_label ),
            'view_item' => __('View ' . $this->post_label ),
            'search_items' => __('Search ' . $this->post_label . 's' ),
            'not_found' =>  __('No '. $this->post_label . 's found'),
            'not_found_in_trash' => __('No '. $this->post_label . 's found in Trash'),
        );
    }

    function register_post() {
        if (!post_type_exists($this->name)){
            register_post_type($this->name, $this->args);
        }
    }
    
    function add_custom_taxonomy() {
        if (!taxonomy_exists($this->taxonomy['name'])){
            if (isset($this->taxonomy['labels'])){
                $this->taxonomy['args']['labels'] = $this->taxonomy['labels'];
            }
            register_taxonomy($this->taxonomy['name'], array($this->name), $this->taxonomy['args']);
        }
        else if (!in_array($this->taxonomy['name'], get_object_taxonomies($this->name))){
            register_taxonomy_for_object_type($this->taxonomy['name'], $this->name);
        }
    }
}
