<?php
/**
 * Adds Affiliations, Office, Twitter, and Facebook to user profiles
 * Removes yim, aim and jabber from user profiles
 */
class UW_User 
{

  function UW_User()
  {
    add_filter( 'user_contactmethods', array( $this, 'additional_contact_fields'), 10, 1 );
  }

  function additional_contact_fields( $contactmethods ) 
  {
    // Add Twitter, Facebook and Affiliation
    $contactmethods['affiliation'] = 'Affiliation';
    $contactmethods['phone'] = 'Phone Number';
    $contactmethods['office'] = 'Office';
    $contactmethods['twitter'] = 'Twitter';
    $contactmethods['facebook'] = 'Facebook';
    unset( $contactmethods['yim'] );
    unset( $contactmethods['aim'] );
    unset( $contactmethods['jabber'] );
    return $contactmethods;
  }

}

new UW_User;
