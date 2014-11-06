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



    add_action( 'wp_ajax_directory', array( $this, 'search_uw_directory_ajax') );
    add_action( 'wp_ajax_nopriv_directory', array( $this, 'search_uw_directory_ajax') );
  }

  function search_uw_directory( $search = false )
  {

    if ( $search ) $this->SEARCH = $search;

    $ds = ldap_connect( self::HOST );
    if ( $ds )
    {
        $r      = ldap_bind( $ds );
        foreach ( $this->search_filters() as $filter => $ldap_filter )
        {
          $result = @ldap_search( $ds, self::SEARCH_BASE, $ldap_filter, $attributes=array(), $attrsonly=0, $sizelimit=$this->get_limit() );
          if ( is_resource($result) )
          {
            $info   = ldap_get_entries( $ds, $result );
            if ( is_array( $info ) && $info['count'] > 0 )
              $results[ $filter ] = $this->format( $info );
          }
        }
    }
    return json_decode( json_encode($results));
  }

  function search_uw_directory_ajax()
  {
    $results = $this->search_uw_directory();
    wp_send_json( $results );
  }

  function search_filters()
  {

      if ( ! $this->SEARCH )
      {
        $args = wp_parse_args( $_GET );
        $this->SEARCH = stripslashes( trim( $args['search'] ) );
      }

      $this->parse();

      if ( $this->LAST_NAME != $this->FIRST_NAME )
        $search = "(|(&(sn=$this->LAST_NAME*)(givenname=$this->FIRST_NAME*))(sn=$this->SEARCH)(cn=$this->SEARCH))";
      else
        $search = "(|(cn=$this->SEARCH)(cn=$this->SEARCH*)(cn=*$this->SEARCH))";

      return (array(
                            "Students"   => "(&(ou:dn:=Students)$search)",
                            "Faculty & Staff"   => "(&(ou:dn:=Faculty and Staff)$search)",
                            // "Email" => "(mail=$this->SEARCH*)",
                            // "Department" => "(title=*$this->SEARCH*)",
                            // "Box number"           => "(mailstop=*$this->SEARCH*)",
                            // "Telephone number"  => "(telephonenumber=*$this->SEARCH*)"
      ));
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

    if ( ! $people ) return;

    // This has been replaced by the custom LDAP searches which perform the same basic filtering

    // Checks for an exact matches and returns them separately
    // foreach ($people as $index => $person )
    // {
    //   if ( $this->LAST_NAME !== $this->FIRST_NAME &&
    //        strpos( strtolower( $person['givenname'] ), strtolower( $this->FIRST_NAME ) ) === 0 &&
    //        strpos( strtolower( $person['sn'] ), strtolower( $this->LAST_NAME ) ) !== false ||
    //         $this->LAST_NAME !== $this->FIRST_NAME &&
    //         $person['commonname'] === $this->SEARCH )
    //   {
    //     unset( $people[$index] );
    //     $people['best'][] = $person;
    //   }
    // }

    // Return only the best matches if there are any
    // if (isset( $people['best'])) return $people['best'];

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
