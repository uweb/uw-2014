<?php

/*
 * This is the EnqueueObject class that defines what scripts/styles to load
 * each script has an id, a url, a version, an array of dependencies,
 * an a boolean specifying whether or not it's for the backend
 */

class EnqueueObject
{
    public $id;
    public $url;
    public $deps = array();
    public $version;
    public $admin = false;

    function __construct()
    {
        $args = func_get_args();
        foreach($args[0] as $property => $value){   //only one argument should be present, the associative array
            $this->$property = $value;
        }
    }

}
