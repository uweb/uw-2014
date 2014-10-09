<?php

/**
 * UW LDAP directories ajax and parsing
 */

class UW_Directory
{

  const HOST        = 'directory.washington.edu';
  const SEARCH_BASE = 'o=University of Washington, c=US';
  const LIMIT = 10;

  function __construct()
  {
    add_action( 'wp_ajax_directory', array( $this, 'search_uw_directory') );
    add_action( 'wp_ajax_nopriv_directory', array( $this, 'search_uw_directory') );
  }

  function search_uw_directory()
  {
    $ds = ldap_connect( self::HOST );
    if ( $ds )
    {
        $r      = ldap_bind( $ds );
        $result = @ldap_search( $ds, self::SEARCH_BASE, $this->search_filter(), $attributes=array(), $attrsonly=0, $sizelimit=$this->get_limit() );
        if ( is_resource($result) )
        {
          $info   = ldap_get_entries($ds, $result);
          if ( is_array( $info ) )
            echo json_encode( $this->parse( $info ) );
        }
    }
    wp_die();
  }

  function search_filter()
  {
    $args = wp_parse_args($_GET);
    $search = $args['search'];
    return "(|(mail=*{$search}*)(sn=*{$search}*)(givenname=*{$search}*)(cn=*{$search}*)(telephonenumber=*{$search}*))";
  }

  function get_limit()
  {
    $args = wp_parse_args( $_GET );
    return isset( $args['limit'] ) ? $args['limit'] : self::LIMIT;
  }

  function parse( $info )
  {
    array_shift( $info );
    foreach ( $info as $index => $person )
    {

        $people[$index]['commonname'] = $person['cn'][0];

        $people[$index]['title'] = $person['title'][0];

        $people[$index]['postaladdress'] = $person['postaladdress'][0];

        $people[$index]['mail'] = str_replace( 'u.washington.edu', 'uw.edu', $person['mail'][0] );

        $people[$index]['telephonenumber'] = $person['telephonenumber'][0];
    }
    return $people;
  }

}

new UW_Directory;
