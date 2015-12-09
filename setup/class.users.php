<?php
/**
 * Adds Affiliations, Office, Twitter, and Facebook to user profiles
 * Removes yim, aim and jabber from user profiles
 */
class UW_Users
{

  function __construct()
  {
    add_filter( 'user_contactmethods', array( $this, 'additional_contact_fields'), 10, 1 );
    $role = get_role('editor'); 
    $role->add_cap('edit_theme_options');
    add_action('admin_menu', array( $this,'custom_admin_menu'));

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
  
  function custom_admin_menu() {
    $user = new WP_User(get_current_user_id());     
    if (!empty( $user->roles) && is_array($user->roles)) {
        foreach ($user->roles as $role)
            $role = $role;
    }

    if(isset($role) && $role == "editor") { 
       remove_submenu_page( 'themes.php', 'themes.php' );
       remove_submenu_page( 'themes.php', 'nav-menus.php' );
       global $submenu;
        unset($submenu['themes.php'][6]);
        unset($submenu['themes.php'][15]);
    }       
  }

}



