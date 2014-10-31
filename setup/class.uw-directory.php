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

      // if the query is numeric then search telephone and box numbers
      if ( $this->NUMERIC )
        return "(&(ou:dn:=$ou)(|(telephonenumber=*{$this->SEARCH}*)(mailstop={$this->SEARCH})))";

      // if it's a name preform a efficeint search for names and broad search of titles
      if ( $this->FIRST_NAME != $this->LAST_NAME )
        return "(|(&(ou:dn:=$ou)(sn=$this->LAST_NAME*)(givenname=$this->FIRST_NAME*))(title=*$this->SEARCH*)$teleboxnumber)" ;

      // Otherwise search everything
      return "(&(ou:dn:=$ou)(|(mail=$this->SEARCH*)(sn=$this->LAST_NAME*)(givenname=$this->FIRST_NAME*)(cn=$this->SEARCH*)$teleboxnumber(title=*{$this->SEARCH}*)))";
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
    foreach ( $search as $index => $name )
    {
      if ( strlen( $name ) > 1 || $index == 0 )
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

        $people[$person['cn'][0]]['commonname'] = $person['cn'][0];

        $people[$person['cn'][0]]['givenname'] = $person['givenname'][0];

        $people[$person['cn'][0]]['sn'] = $person['sn'][0];

        $people[$person['cn'][0]]['title'] = $this->information( $person['title'] );

        $people[$person['cn'][0]]['postaladdress'] = $this->information( $person['postaladdress'] );

        $people[$person['cn'][0]]['mail'] = $this->information($person['mail']);

        $people[$person['cn'][0]]['telephonenumber'] = $this->information( $person['telephonenumber'] );

        $people[$person['cn'][0]]['homephone'] = $this->information( $person['homephone'] );

        $people[$person['cn'][0]]['mailstop'] = $this->information( $person['mailstop']) ;

        $people[$person['cn'][0]]['dn'] = $person['dn'];

        $sort[$person['cn'][0]] = $people[$index]['commonname'];

    }

    // Checks for an exact matches and returns them separately
    foreach ($people as $index => $person )
    {
      if ( strpos( strtolower( $person['givenname'] ), strtolower( $this->FIRST_NAME ) ) === 0 &&
           strpos( strtolower( $person['sn'] ), strtolower( $this->LAST_NAME ) ) !== false )
      {
        unset( $people[$index] );
        $people['best'][] = $person;
      }
    }

    // Return only the best matches if there are any
    if (isset( $people['best'])) return $people['best'];

    if ( $sort )
    {
      // Sorts the list alphabetically by commonname
      asort( $sort ) ;
      array_multisort( $sort, SORT_NUMERIC , $people );
    }

    return array_values( $people );
  }

  function information( $informations, $sep = ', ' )
  {
    if ( ! isset( $informations['count'] )) return;

    unset( $informations['count']);

    foreach ( $informations as $information )
    {
      $info[] = trim(  str_replace( 'u.washington.edu', 'uw.edu', $information ) );
    }

    return $info;
  }

}

new UW_Directory;
