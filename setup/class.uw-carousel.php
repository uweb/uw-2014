<?php

/*
Plugin Name: UW Carousel
Plugin URL: http://uw.edu
Description: Transform your standard image galleries into an immersive full-screen experience.
Version: 0.1
Author: Automattic

Released under the GPL v.2 license.

This is a fork of the Jetpack Carousel plugni

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/
class UW_Carousel {

  const COLUMNS = 5;
  const LINK         = 'none';

  var $prebuilt_widths = array( 370, 700, 1000, 1200, 1400, 2000 );

  var $first_run = true;

  function __construct()
  {
    add_action( 'init', array( $this, 'init' ) );
  }

  function init()
  {

    // Disable filter for child themes
    if ( $this->disable() )
      return;

    // If on front-end, do the Carousel thang.
    $this->prebuilt_widths = apply_filters( 'jp_carousel_widths', $this->prebuilt_widths );
    add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) ); // load later than other callbacks hooked it
    add_filter( 'gallery_style', array( $this, 'add_data_to_container' ) );
    add_filter( 'wp_get_attachment_image_attributes', array( $this, 'add_data_to_images' ), 10, 2 );
  }

  function disable()
  {
    return apply_filters( 'uw_carousel_disable', false );
  }

  function asset_version( $version ) {
    return apply_filters( 'jp_carousel_asset_version', $version );
  }

  function enqueue_assets( $output ) {

    if ( ! empty( $output ) && ! apply_filters( 'jp_carousel_force_enable', false ) )
    {
      // Bail because someone is overriding the [gallery] shortcode.
      remove_filter( 'gallery_style', array( $this, 'add_data_to_container' ) );
      remove_filter( 'wp_get_attachment_image_attributes', array( $this, 'add_data_to_images' ) );
      return $output;
    }

    do_action( 'jp_carousel_thumbnails_shown' );

    // Note: using  home_url() instead of admin_url() for ajaxurl to be sure  to get same domain on wpcom when using mapped domains (also works on self-hosted)
    // Also: not hardcoding path since there is no guarantee site is running on site root in self-hosted context.
    $is_logged_in = is_user_logged_in();
    $current_user = wp_get_current_user();
    $comment_registration = intval( get_option( 'comment_registration' ) );
    $require_name_email   = intval( get_option( 'require_name_email' ) );
    $localize_strings = array(
      'widths'               => $this->prebuilt_widths,
      'is_logged_in'         => $is_logged_in,
      'lang'                 => strtolower( substr( get_locale(), 0, 2 ) ),
      'ajaxurl'              => set_url_scheme( admin_url( 'admin-ajax.php' ) ),
      'nonce'                => wp_create_nonce( 'carousel_nonce' ),
      'display_exif'         => true,
      'display_geo'          => false,
      'background_color'     => 'white',
      'download_original'    => sprintf( __( 'View full size <span class="photo-size">%1$s<span class="photo-size-times">&times;</span>%2$s</span>', 'jetpack' ), '{0}', '{1}' ),
      'camera'               => __( 'Camera', 'jetpack' ),
      'aperture'             => __( 'Aperture', 'jetpack' ),
      'shutter_speed'        => __( 'Shutter Speed', 'jetpack' ),
      'focal_length'         => __( 'Focal Length', 'jetpack' ),
      'require_name_email'   => $require_name_email,
      'login_url'            => wp_login_url( apply_filters( 'the_permalink', get_permalink() ) ),
    );

    $localize_strings = apply_filters( 'jp_carousel_localize_strings', $localize_strings );
    wp_localize_script( 'site', 'jetpackCarouselStrings', $localize_strings );

    // global $is_IE;
    // if( $is_IE )
    // {
    //   $msie = strpos( $_SERVER['HTTP_USER_AGENT'], 'MSIE' ) + 4;
    //   $version = (float) substr( $_SERVER['HTTP_USER_AGENT'], $msie, strpos( $_SERVER['HTTP_USER_AGENT'], ';', $msie ) - $msie );
    //   if( $version < 9 )
    //     wp_enqueue_style( 'jetpack-carousel-ie8fix', plugins_url( 'jetpack-carousel-ie8fix.css', __FILE__ ), array(), $this->asset_version( '20121024' ) );
    // }

    do_action( 'jp_carousel_enqueue_assets', $this->first_run, $localize_strings );

    $this->first_run = false;

    return $output;
  }

  function add_data_to_images( $attr, $attachment = null )
  {

    if ( $this->first_run ) // not in a gallery
      return $attr;

    $attachment_id   = intval( $attachment->ID );
    $orig_file       = wp_get_attachment_image_src( $attachment_id, 'original' );
    $orig_file       = isset( $orig_file[0] ) ? $orig_file[0] : wp_get_attachment_url( $attachment_id );
    $meta            = wp_get_attachment_metadata( $attachment_id );
    $size            = isset( $meta['width'] ) ? intval( $meta['width'] ) . ',' . intval( $meta['height'] ) : '';
    $img_meta        = ( ! empty( $meta['image_meta'] ) ) ? (array) $meta['image_meta'] : array();
    $comments_opened = intval( comments_open( $attachment_id ) );

    $medium_file_info = wp_get_attachment_image_src( $attachment_id, 'medium' );
    $medium_file      = isset( $medium_file_info[0] ) ? $medium_file_info[0] : '';

    $large_file_info  = wp_get_attachment_image_src( $attachment_id, 'large' );
    $large_file       = isset( $large_file_info[0] ) ? $large_file_info[0] : '';

    $attachment       = get_post( $attachment_id );
    $attachment_title = wptexturize( $attachment->post_title );
    $attachment_desc  = wpautop( wptexturize( $attachment->post_content ) );

    // Not yet providing geo-data, need to "fuzzify" for privacy
    if ( ! empty( $img_meta ) ) {
      foreach ( $img_meta as $k => $v ) {
        if ( 'latitude' == $k || 'longitude' == $k )
          unset( $img_meta[$k] );
      }
    }

    $img_meta = json_encode( array_map( 'strval', $img_meta ) );

    $attr['data-attachment-id']     = $attachment_id;
    $attr['data-orig-file']         = esc_attr( $orig_file );
    $attr['data-orig-size']         = $size;
    $attr['data-comments-opened']   = false; //$comments_opened;
    $attr['data-image-meta']        = esc_attr( $img_meta );
    $attr['data-image-title']       = esc_attr( $attachment_title );
    $attr['data-image-description'] = esc_attr( $attachment_desc );
    $attr['data-medium-file']       = esc_attr( $medium_file );
    $attr['data-large-file']        = esc_attr( $large_file );

    return $attr;
  }

  function add_data_to_container( $html )
  {
    global $post;

    if ( isset( $post ) )
    {
      $blog_id = (int) get_current_blog_id();

      $extra_data = array(
        'data-carousel-extra' => array(
          'blog_id' => $blog_id,
          'permalink' => get_permalink( $post->ID )
          )
        );

      $extra_data = apply_filters( 'jp_carousel_add_data_to_container', $extra_data );

      foreach ( (array) $extra_data as $data_key => $data_values )
      {
        $html = str_replace( '<div ', '<div ' . esc_attr( $data_key ) . "='" . json_encode( $data_values ) . "' ", $html );
      }

    }

    return $html;
  }

}
