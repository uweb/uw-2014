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
            echo json_encode( $this->format( $info ) );
        }
    }
    wp_die();
  }

  function search_filter()
  {
      $args = wp_parse_args( $_GET );

      $this->SEARCH = stripslashes( trim( $args['search'] ) );

      $ou = ( $args['method'] == 'students' ) ? 'Students' :
                ( ( $args['method'] == 'faculty' )   ? 'Faculty and Staff' : 'People' );

      $this->parse();

      $this->NUMERIC = ( is_numeric( preg_replace("/[^A-Za-z0-9]/", '', $this->SEARCH ) ) ) ? preg_replace("/[^A-Za-z0-9 ]/", '', $this->SEARCH ) : false;

      // if the query is numeric then search telephone and box numbers as well
      $teleboxnumber =  $this->NUMERIC ? "(telephonenumber=*{$this->SEARCH}*)(mailstop={$this->SEARCH})" : '';

      return "(&(ou:dn:=$ou)(|(mail=$this->SEARCH*)(sn=$this->LAST_NAME*)(givenname=$this->FIRST_NAME*)(cn=$this->SEARCH)$teleboxnumber(title=*{$this->SEARCH}*)))";
  }

  function get_limit()
  {
    $args = wp_parse_args( $_GET );
    return isset( $args['limit'] ) ? $args['limit'] : self::LIMIT;
  }

  function parse()
  {
    if ( strpos( $this->SEARCH, ',' ) )
        $this->SEARCH = implode( array_reverse( array_map( 'trim', explode( ',', $this->SEARCH ) ) ), ' ' );

    $search = $this->SEARCH;

    // special case for people search last name first

    $search = explode( ' ', $search );
    foreach ( $search as $name )
    {
      if ( strlen( $name) > 1 )
        $names[] = $name;
    }

    if ( isset($names[0]) )
      $this->FIRST_NAME = $names[0];

    $this->LAST_NAME = array_pop( $names );

    return;
  }


  function format( $info )
  {
    array_shift( $info );
    foreach ( $info as $index => $person )
    {

        $people[$index]['commonname'] = $person['cn'][0];

        $people[$index]['givenname'] = $person['givenname'][0];

        $people[$index]['sn'] = $person['sn'][0];

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

    // Checks for an exact matches and returns them separately
    // This could be replaced by a second LDAP query looking for an exact match as well.
    // Eg: Exact matches
    //  return "(&(cn=*$this->LAST_NAME*)(givenname=$this->FIRST_NAME*))";
    // Eg: custom query for people searching Last, First name format.
    //   return "(&(cn=*$this->LAST_NAME*)(givenname=$this->FIRST_NAME*))";

    if ( isset( $this->FIRST_NAME ) && isset( $this->LAST_NAME ) && $this->FIRST_NAME != $this->LAST_NAME )
      $people['best'] = array();

// var_dump( $this->FIRST_NAME, $this->LAST_NAME );
    foreach ($people as $index => $person )
    {
      if ( strpos( strtolower( $person['givenname'] ), strtolower( $this->FIRST_NAME ) ) !== false &&
           strpos( strtolower( $person['sn'] ), strtolower( $this->LAST_NAME ) ) !== false )
      {
        unset( $people[$index] );
        $people['best'][] = $person;
      }
    }
// var_dump( $people['best'] );

    if (isset( $people['best'])) return $people['best'];

    return $people;
  }

}

new UW_Directory;
