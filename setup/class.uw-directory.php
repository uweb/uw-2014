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
      $args = wp_parse_args( $_GET );

      $search = stripslashes( $args['search'] );

      if ( $_GET['method'] === 'name' )
      {
        return "(|(sn=*{$search}*)(givenname=*{$search}*)(cn=*{$search}*))";
      } else
      if ( $_GET['method'] === 'email' )
      {
        return "(|(mail=*{$search}*))";
      } else
      if ( $_GET['method'] === 'phone' )
      {
        return "(|(telephonenumber=*{$search}*))";
      } else
      if ( $_GET['method'] === 'box' )
      {
        return "(|(mailstop=*{$search}*))";
      } else
      if ( $_GET['method'] === 'dept' )
      {
        return "(|(title=*{$search}*))";
      } else {


        if ( strpos( $search, ',' ) )
        {
          $search = array_map( 'trim', explode( ',', $search ) );
          $last = $search[0];
          $first =$search[1];
          return "(&(cn=*$last*)(givenname=$first*))";
        }

        $search = str_replace( ' ','*', $search );
        return "(|(mail=*{$search}*)(sn=*{$search}*)(givenname=*{$search}*)(cn=*{$search}*)(telephonenumber=*{$search}*)(mailstop={$search})(title=*{$search}*))";
      }
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

        $people[$index]['homephone'] = $person['homephone'][0];

        $people[$index]['mailstop'] = $person['mailstop'][0];

        $people[$index]['dn'] = $person['dn'];

        $sort[$index] = $people[$index]['commonname'];

    }

    if ( $sort )
    {
      // Sorts the list alphabetically by commonname
      asort( $sort ) ;
      array_multisort( $sort, SORT_NUMERIC , $people );
    }
    return $people;
  }

}

new UW_Directory;
