<?php

namespace Gizburdt\Cuztom\Fields;

use Gizburdt\Cuztom\Cuztom;
use Gizburdt\Cuztom\Support\Guard;

Guard::directAccess();

class TermSelect extends Field
{
    /**
     * Row CSS class.
     * @var string
     */
    public $row_css_class = 'cuztom-field-term-select';

    /**
     * Construct field.
     *
     * @param array $field
     * @since 0.3.3
     */
    public function __construct($args, $values = null)
    {
        parent::__construct($args, $values);

        $this->args = array_merge(
            array(
                'taxonomy' => 'category'
            ),
            $this->args
        );
    }

    /**
     * Output input.
     *
     * @param  string|array $value
     * @return string
     * @since  2.4
     */
    public function _output_input($value = null, $view = null)
    {
        @$this->args['class']   .= ' cuztom-input-select cuztom-input-term-select';
        @$this->args['echo']     = 0;
        @$this->args['name']     = $this->get_name();
        @$this->args['id']       = $this->get_id();
        @$this->args['selected'] = (! Cuztom::isEmpty($value) ? $value : $this->default_value);

        return wp_dropdown_categories($this->args);
    }
}
