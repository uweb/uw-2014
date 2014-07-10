<?php

/**
 *  UW_MenuItem is an object used by UW_Dropdowns to create a default menu
 */
class UW_MenuItem {
    public $args;
    public $child_items;

    function __construct()
    {
        $args = func_get_args();
        $num_args = func_num_args();
        if ($num_args == 2){
            $this->constructBase($args);
        }
        else {
            $this->constructChildren($args);
        }
    }

    private function constructBase($args)   //$args[0] is name, $args[1] is url
    {
        $this->args = array(
            'menu-item-title'  => __($args[0]),
            'menu-item-url'    => $args[1],
            'menu-item-status' => 'publish',
        );
    }

    private function constructChildren($args) //$args[2] is array of children
    {
        $this->child_items = array_pop($args);
        $this->constructBase($args);
    }

    public function setParentItemID($id)
    {
        $this->args['menu-item-parent-id'] = $id;
    }
}
