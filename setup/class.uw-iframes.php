<?php

/**
 * This shortcode allows iFrames for editors.
 * Only certain domains are allowed, listed in /inc/helper-functions.php
 */
class UW_Iframes
{

  function __construct()
  {
    if ( is_multisite() ) {
      
      add_action( 'wpmu_options', array( $this, 'network_iframe_setting_init' ) );
      add_action( 'update_wpmu_options', array( $this, 'network_iframe_setting_update' ) );
      
    } else {
      
      add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
      add_action( 'admin_init', array( $this, 'settings_init' ) );
      
    }
    
    add_shortcode( 'iframe', array( $this, 'add_iframe' ) );
  }

  function add_iframe($atts)
  {

      $params = shortcode_atts( array(
        'src' => '',
        'height' => get_option('embed_size_h'),
        'width' => get_option('embed_size_w')
      ), $atts );

      $params['src'] = esc_url($params['src'], array('http','https'));
      if ( $params['src'] == '' )
        return '';

      $parsed = parse_url($params['src']);
      if ( array_key_exists('host', $parsed) && !in_array( $parsed['host'], $this->get_iframe_domains() ) )
        return '';

      $iframeSrc = html_entity_decode($params['src']);
      $iframeQueryString = parse_url($iframeSrc, PHP_URL_QUERY);
      $parentQueryString = http_build_query($_GET);

      if($iframeQueryString != '' && $parentQueryString != '')
      {
        $iframeQuery = parse_str($iframeQueryString, $iframeQueryParams);
        $parentQuery = parse_str($parentQueryString, $parentQueryParams);
        $query_merged = array_merge($iframeQueryParams, $parentQueryParams);
        $iframeSrc = str_replace($iframeQueryString, http_build_query($query_merged), $iframeSrc);
      }
      else if ($parentQueryString != '')
      {
        $iframeSrc .= "?" . $parentQueryString;
      }

      $iframeSrc = esc_url($iframeSrc, array('http', 'https'));

      return "<iframe src=\"$iframeSrc\" width=\"{$params['width']}\" height=\"{$params['height']}\" style=\"border:0\"></iframe>";
  }

  function get_iframe_domains()
  {
    $iframe_domains = array(
      'uw.edu',
      'washington.edu',
      'uwtv.org',
      'tvw.org',
      'www.uwtv.org',
      'google.com',
      'docs.google.com',
      'drive.google.com',
      'youtube.com',
      'excition.com',
      'uwregents.wufoo.com',
      'www.uw.edu',
      'catalyst.uw.edu',
      'www.washington.edu',
      'depts.washington.edu',
      'online.gifts.washington.edu',
      'secure.gifts.washington.edu',
      'payroll.gifts.washington.edu',
      'helperapps.gifts.washington.edu',
      'uwfoundation.org',
      'support.gifts.washington.edu',
      'www.uwfoundation.org',
      'www.surveygizmo.com',
      'www.google.com',
      'www.excition.com',
      'www.youtube.com',
      'pgcalc.com',
      'www.pgcalc.com',
      'matchinggifts.com',
      'www.matchinggifts.com',
      'embed.pac-12.com',
      'storify.com',
      'w.soundcloud.com',
      'api.soundcloud.com',
      'flickr.com',
      'vimeo.com',
      'player.vimeo.com',
      'www.facebook.com',
      'form.jotform.com',
      'oga-dev.s.uw.edu', //testing
      'bitools.uw.edu', //testing
      'tableau.washington.edu',
      'www.iqmediacorp.com',
      'fusiontables.google.com',
      'myuwgiving.gifts.washington.edu',
      'cdn.knightlab.com',
      'uploads.knightlab.com',
      'yeatmanlab.github.io',
      'livestream.com',
      'uwphotos.smugmug.com',
      'www.smugmug.com',
      'smugmug.com',
      'universityphotography.smugmug.com',
      'modelo.io',
      'app.modelo.io',
    );
    $iframes_settings = get_site_option( 'iframes_settings', false );
    $user_domains = isset( $iframes_settings[ 'iframes_textarea_field_0' ] ) ? $iframes_settings[ 'iframes_textarea_field_0' ] : array();
    $user_domains = $user_domains ? preg_split('/\s+/', $user_domains) : array();
    $iframe_domains = array_merge($iframe_domains, $user_domains);
    return $iframe_domains;
  }

  function add_admin_menu() { 
    add_options_page('iFrame Settings', 'iFrames', 'manage_options', 'iframes', array($this, 'iframes_options_page'));
  }

  function settings_init() { 
      $this->setup_sections();
      $this->setup_options();
  }

  function setup_sections() {
      $this->add_settings_sections();
  }

  function setup_options() { 
      register_setting('iframe_settings_page', 'iframes_settings');
      add_settings_field( 
          'iframes_textarea_field_0', 
          __('iFrame Whitelist', 'wordpress'), 
          array($this, 'iframes_textarea_field_0_render'), 
          'iframe_settings_page', 
          'iframes_iframe_settings_page_section' 
      );
  }

  function add_settings_sections() {
    
      add_settings_section(
          'iframes_iframe_settings_page_section', 
          __('', 'wordpress'), 
          array($this, 'iframes_settings_section_callback'), 
          'iframe_settings_page'
      );
      
  }

  function iframes_textarea_field_0_render() { 
      $options = get_site_option('iframes_settings');
      ?>
      <p class='iframes-textarea-label'>
          <label for='iframes_settings[iframes_textarea_field_0]'>
          Iframes are only allowed from authorized domains. Enter domains 
          below to add them to the whitelist of authorized domains. One domain per line.</label>
      </p>
      <p>
          <textarea cols='145' rows='8' name='iframes_settings[iframes_textarea_field_0]' class='large-text code'><?php if( isset( $options['iframes_textarea_field_0'] ) ) { echo $options['iframes_textarea_field_0']; }?></textarea>
      </p>
      <?php
      add_option( 'iframes_settings', $options );
  }

  function iframes_settings_section_callback() { 
      echo __( '', 'wordpress' );
  }

  function iframes_options_page() { 
      ?>
      <div class='wrap'>
      <form action='options.php' method='post'>
          <h1>iFrame domain allow list</h1>
          <?php
          settings_fields( 'iframe_settings_page' );
          do_settings_sections( 'iframe_settings_page' );
          submit_button();
          ?>
      </form>
      </div>
      <?php
  }
  
  function network_iframe_setting_init() {
      if ( !get_site_option( 'iframes_settings' ) ) {
          add_site_option( 'iframes_settings', '' );
      }
      $network_key = get_site_option( 'iframes_settings' );
      ?>
          <h2>iFrame domain allow list</h2>
          <p>Iframes are only allowed from authorized domains. Enter domains below to add them to the whitelist of authorized domains. One domain per line.</p>
          <table class="form-table">
              <tbody>
                  <tr><th scope="row">iFrame domains</th>
                      <td><textarea cols='145' rows='8' name='iframes_settings[iframes_textarea_field_0]' class='large-text code'><?php echo esc_attr($network_key['iframes_textarea_field_0']); ?></textarea></td>
                  </tr>
              </tbody>
          </table>
      <?php
  }

  function network_iframe_setting_update() {
      if (isset($_POST['iframes_settings'])) {
          $site_option = $_POST['iframes_settings'];
          update_site_option( 'iframes_settings', $site_option );
      }
  }


}
