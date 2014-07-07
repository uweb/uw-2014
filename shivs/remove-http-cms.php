<?php
/**
 * These are custom filters that help Wordpress work 
 * with our server architecture. Basically resolves complications 
 * with logged in users being behind https, UW Netids and proxying.
 *
 */

class UW_CMS_Shivs 
{

  function UW_CMS_Shivs()
  {
    // HTTPS for logged in users
    add_filter('the_content', array( $this, 'force_https_the_content') ) ;
    add_filter('the_permalink', array( $this, 'force_https_the_content') ) ;
    add_filter('post_thumbnail_html', array( $this, 'force_https_the_content') ) ;
    add_filter('option_siteurl', array( $this, 'force_https_the_content') ) ;
    add_filter('option_home', array( $this, 'force_https_the_content') ) ;
    add_filter('option_url', array( $this, 'force_https_the_content') ) ;
    add_filter('option_wpurl', array( $this, 'force_https_the_content') ) ;
    add_filter('option_stylesheet_url', array( $this, 'force_https_the_content') ) ;
    add_filter('option_template_url', array( $this, 'force_https_the_content') ) ;

    // HTTPS for admin thumbnail urls
    add_filter('wp_prepare_attachment_for_js', array( $this, 'force_https_thumbnail_url') );
    add_filter('media_send_to_editor', array( $this, 'force_https_thumbnail_url') );
  
    // Make sure Wordpress redirects point to the correct spot
    add_filter('wp_redirect', array( $this, 'remove_cms_from_admin_url') );
    
    // Add a custom filter that can be used in the theme and child themes
    add_filter('remove_cms', array( $this, 'remove_cms_from_admin_url'), 10, 2);
  }

  /**
   * For our setup, when a user is logged into WP he or she is
   * behind ssl. Imported, old content, however can still point to 
   * http, which causes some issued like images not loading (even though they 
   * are accessible through https). This function patches that issue specifically
   * for images.
   */
  function force_https_the_content( $content ) 
  {
      if ( is_ssl() )
        $content = str_replace( 'src="http://', 'src="https://', $content );

      if ( is_local() )
        $content = preg_replace( '/https?:\/\//', 'http://', $content );

      return $content;
  }

  /**
   * The new media library in Wordpress 3.5 uses ajax for thumbnails, which
   * don't pass through any of the previous filters. Need to replace all url 
   * sizes.
   */
  function force_https_thumbnail_url( $url ) 
  {
    $ssl = is_ssl();
    $http = site_url(FALSE, 'http');
    $https = site_url(FALSE, 'https');
    if ( $ssl && is_array($url) && array_key_exists('sizes', $url) ) {
      foreach ($url['sizes'] as $index=>$value) {
        $url['sizes'][$index] = str_replace($http, $https, $url['sizes'][$index] );
      }
    }
    return ( $ssl ) ? str_replace($http, $https, $url) : $url;
  }

  /**
   * Force Wordpress to know when a user is logged in or anonymous and 
   * accommodate the correct SSL and proxying. 
   */
  function remove_cms_from_admin_url( $url, $forced=false )  
  {

    global $blog_id;

    if ( ! is_local() && ! is_admin() && 
            empty( $_SERVER['REMOTE_USER'] ) && $blog_id != 1 && 
            !preg_match('/\b(wp-admin|wp-login|\/login)\b/i', $_SERVER['REQUEST_URI']) &&
            !is_user_logged_in() || $forced ) 
    {

      $url = str_replace('.edu/cms/','.edu/', $url);
      $url = str_replace('https:','http:', $url);

      // relative urls
      if ( strpos($url,'http') === false ) 
        $url = str_replace( '/cms/','/', $url );
    }

    return $url;

  }

}

new UW_CMS_Shivs;
