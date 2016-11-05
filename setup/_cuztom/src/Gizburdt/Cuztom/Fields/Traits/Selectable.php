<?php

namespace Gizburdt\Cuztom\Fields\Traits;

use Gizburdt\Cuztom\Cuztom;
use Gizburdt\Cuztom\Support\Guard;

Guard::directAccess();

trait Selectable
{
    /**
     * Show option none?
     *
     * @return string
     * @since  3.0
     */
    public function maybe_show_option_none()
    {
        if (! Cuztom::isEmpty(@$this->args['show_option_none'])) {
            return '<option value="-1" '.(Cuztom::isEmpty($this->value) ? 'selected="selected"' : '').'>'.$this->args['show_option_none'].'</option>';
        }
    }
}
