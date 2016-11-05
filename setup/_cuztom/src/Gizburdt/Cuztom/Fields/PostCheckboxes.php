<?php

namespace Gizburdt\Cuztom\Fields;

use Gizburdt\Cuztom\Cuztom;
use Gizburdt\Cuztom\Support\Guard;

Guard::directAccess();

class PostCheckboxes extends Checkboxes
{
    /**
     * View name.
     * @var string
     */
    public $view = 'post-checkboxes';

    /**
     * Row CSS class.
     * @var string
     */
    public $row_css_class = 'cuztom-field-post-checkboxes';

    /**
     * Construct.
     *
     * @param string $field
     * @since 0.3.3
     */
    public function __construct($args, $values = null)
    {
        parent::__construct($args, $values);

        $this->args = array_merge(
            array(
                'post_type'      => 'post',
                'posts_per_page' => -1
            ),
            $this->args
        );

        $this->default_value = (array) $this->default_value;
        $this->posts         = get_posts($this->args);
    }
}
