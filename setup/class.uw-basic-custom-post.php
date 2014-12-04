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
    
    function __construct($args){
        if(!empty($args['name'])){
            $this->name = $args['name'];
            $this->args = $args['args'];
            if (isset($args['labels'])){
                $this->args['labels'] = $args['labels'];
            }
            add_action('init', array($this, 'register_post'));
        }
        if (isset($args['taxonomy'])){
            $this->taxonomy = $args['taxonomy'];
            add_action('init', array($this, 'add_custom_taxonomy'));
        }
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
