<?php

namespace Gizburdt\Cuztom\Meta;

use Gizburdt\Cuztom\Cuztom;
use Gizburdt\Cuztom\Support\Guard;

Guard::directAccess();

class Box extends Meta
{
    /**
     * Context.
     * @var string
     */
    public $context = 'normal';

    /**
     * Priority.
     * @var string
     */
    public $priority = 'default';

    /**
     * Post types.
     * @var string|array
     */
    public $post_types;

    /**
     * Meta type.
     * @var string
     */
    public $meta_type = 'post';

    /**
     * Fillable.
     *
     * @var array
     */
    protected $fillable = array(
        'id',
        'callback',
        'title',
        'description',
        'fields',
        'context',
        'priority',
    );

    /**
     * Constructs the meta box.
     *
     * @param string       $id
     * @param array        $data
     * @param string|array $post_type
     * @since 0.2
     */
    public function __construct($id, $post_type, $data = array())
    {
        // Build all properties
        parent::__construct($id, $data);

        // Set post types
        $this->post_types = (array) $post_type;

        // Build
        if (@$this->callback[0] == $this) {
            foreach ($this->post_types as $post_type) {
                add_filter('manage_'.$post_type.'_posts_columns', array(&$this, 'add_column'));
                add_action('manage_'.$post_type.'_posts_custom_column', array(&$this, 'add_column_content'), 10, 2);
                add_action('manage_edit-'.$post_type.'_sortable_columns', array(&$this, 'add_sortable_column'), 10, 2);
            }

            add_action('save_post', array(&$this, 'save_post'));
            add_action('post_edit_form_tag', array(&$this, 'edit_form_tag'));
        }

        // Add the meta box
        add_action('add_meta_boxes', array(&$this, 'add_meta_box'));
    }

    /**
     * Method that calls the add_meta_box function.
     *
     * @since 0.2
     */
    public function add_meta_box()
    {
        foreach ($this->post_types as $post_type) {
            add_meta_box(
                $this->id,
                $this->title,
                $this->callback,
                $post_type,
                $this->context,
                $this->priority
            );
        }
    }

    /**
     * Hooks into the save hook for the newly registered Post Type.
     *
     * @param int $post_id
     * @since 0.1
     */
    public function save_post($post_id)
    {
        // Deny the wordpress autosave function
        if (Guard::doingAutosave() || Guard::doingAjax()) {
            return;
        }

        // Verify nonce
        if (! Guard::verifyNonce('cuztom_nonce', 'cuztom_meta')) {
            return;
        }

        // Is the post from the given post type?
        if (! in_array(get_post_type($post_id), array_merge($this->post_types, array('revision')))) {
            return;
        }

        // Is the current user capable to edit this post
        if (! current_user_can(get_post_type_object(get_post_type($post_id))->cap->edit_post, $post_id)) {
            return;
        }

        $values = isset($_POST['cuztom']) ? $_POST['cuztom'] : null;

        if (! Cuztom::isEmpty($values)) {
            parent::save($post_id, $values);
        }
    }

    /**
     * Used to add a column head to the Post Type's List Table.
     *
     * @param  array $columns
     * @return array
     * @since  1.1
     */
    public function add_column($columns)
    {
        unset($columns['date']);

        foreach ($this->fields as $id => $field) {
            if ($field->show_admin_column) {
                $columns[$id] = $field->label;
            }
        }

        $columns['date'] = __('Date', 'cuztom');

        return $columns;
    }

    /**
     * Used to add the column content to the column head.
     *
     * @param string $column
     * @param int    $post_id
     * @since 1.1
     */
    public function add_column_content($column, $post_id)
    {
        $field = $this->fields[$column];

        echo $field->output_column_content($post_id);
    }

    /**
     * Used to make all columns sortable.
     *
     * @param  array $columns
     * @return array
     * @since  1.4.8
     */
    public function add_sortable_column($columns)
    {
        if ($this->fields) {
            foreach ($this->fields as $id => $field) {
                if (@$field->admin_column_sortable) {
                    $columns[$id] = $field->label;
                }
            }
        }

        return $columns;
    }

    /**
     * Get object ID.
     *
     * @return int|null
     * @since  3.0
     */
    public function determine_object()
    {
        if (isset($_GET['post'])) {
            return $_GET['post'];
        } elseif (isset($_POST['post_ID'])) {
            return $_POST['post_ID'];
        }
    }

    /**
     * Get value bases on field id.
     *
     * @return array
     * @since  3.0
     */
    public function get_meta_values()
    {
        return get_post_meta($this->object);
    }
}
