<?php

class UAMS_SquishBugs
{

  function __construct()
  {
    // http://core.trac.wordpress.org/ticket/11330
    add_filter('pre_get_posts', array( $this, 'uams_search_query_filter') );

  }

  function uams_search_query_filter($query)
  {
    if ( isset($_GET['s']) && empty($_GET['s']) && $query->is_main_query() )
    {
        $query->is_search = true;
        $query->is_home = false;
    }

    return $query;
  }
}
