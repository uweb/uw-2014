<?php

/**
 * UW Quicklinks
 * This will register the UW Quicklinks navigation and provide a json feed for the current quicklinks menu
 */
class UW_QuickLinks {

  const NAME         = 'Quick Links';
	const LOCATION     = 'quick-links';
	const ALLOWED_BLOG = 1;

	function __construct() {
		$this->MULTISITE = is_multisite();

		if ( ! $this->MULTISITE || $this->MULTISITE && get_current_blog_id() === self::ALLOWED_BLOG ) {
			add_action( 'after_setup_theme', array( $this, 'register_quick_links_menu' ) );
		}
	}

	function register_quick_links_menu() {
		register_nav_menu( self::LOCATION, __( self::NAME ) );
	}
	
	public static function template_menu() {
		if ( is_multisite() ) switch_to_blog( self::ALLOWED_BLOG );

		$locations = get_nav_menu_locations();
		if ( ( isset( $locations[ self::LOCATION ] ) ) ) {
			$items = wp_get_nav_menu_items( $locations[ self::LOCATION ] );
		} elseif ( $location = wp_get_nav_menu_object( self::LOCATION ) ) {
			$items = wp_get_nav_menu_items( $location->term_id );
		}

		if ( is_multisite() ) restore_current_blog();
		
		$biglinks = '';
		$littlelinks = '';
		if ( isset( $items ) && ( is_array( $items ) || is_object($items) ) ) {
			foreach ( $items as $index => $item ) {
				// Only keep the necessary keys of the $item.
				if ( ! empty( $item->classes[0] ) ) {
					$biglinks .= '<li><span class="' . $item->classes[0] . '"></span><a href="' . $item->url . '" tabindex="-1">' . $item->title . '</a></li>';
				} else {
					$littlelinks .= '<li><a href="' . $item->url . '" tabindex="-1">' . $item->title . '</a></li>';
					
				}
			}
			$quicklinks = '<ul id="big-links">' . $biglinks . '</ul>';
			$quicklinks .= '<h3>Helpful Links</h3> <ul id="little-links">' . $littlelinks . '</ul>';
			
			return $quicklinks;
		} else {
			return null;
		}
	}
}
