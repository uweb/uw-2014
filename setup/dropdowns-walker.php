<?php

  /**
   * From the Walker class.
   *  This removes the classnames and adds accessibility tags
   */

class UW_Dropdowns_Walker_Menu extends Walker_Nav_Menu
{

  private $CURRENT = '';

  function UW_Dropdowns_Walker_Menu()
  {
    // $menuLocations = get_nav_menu_locations();

    // if ( ! wp_get_nav_menu_object( $menuLocations['white-bar']))
      // $this->initial_dropdowns();

    add_filter('wp_nav_menu', array($this, 'add_role_menubar'));
	}

  function add_role_menubar($html)
  {
    return str_replace('class="dawgdrops-nav"', 'class="dawgdrops-nav" role="menubar"', $html);
  }

  function start_lvl( &$output, $depth, $args )
  {
    if ( $depth > 0 ) return;
		$output .= "<ul role=\"menu\" id=\"menu-{$this->CURRENT}\" aria-expanded=\"false\" class=\"dawgdrops-menu\">\n";
	}

  function end_lvl( &$output, $depth = 0, $args = array() )
  {
    if ( $depth > 0 )
      return;

		$indent = str_repeat("\t", $depth);
		$output .= "$indent</ul>\n";
	}

  function display_element ($element, &$children_elements, $max_depth, $depth = 0, $args, &$output)
  {
      $element->has_children = isset($children_elements[$element->ID]) && !empty($children_elements[$element->ID]);
      return parent::display_element($element, $children_elements, $max_depth, $depth, $args, $output);
  }

  function start_el(&$output, $item, $depth, $args)
  {
    if ( $depth > 1 )
      return;

    $this->CURRENT = $item->post_name;
    $title = ! empty( $item->title ) ? $item->title : $item->post_title;

    $caret  = $depth == 0 && $item->has_children ? '<b class="caret"></b>' : '';
    $controls = $depth == 0 && $item->has_children ? 'aria-controls="menu-'.$item->post_name.'"' : '';

		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

		$classes     = $depth == 0 ? array( 'dawgdrops-item', $item->classes[0] ) : array();
		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );

    $li_classnames = ! empty($classes) ? 'class="'. $class_names .'"' : '';
    $li_attributes = $depth == 0 ? ' role="presentation" ' : '';

		$output .= $indent . '<li' . $li_attributes . $li_classnames .'>';

		$attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';
		$attributes .=   $depth == 0                ? ' class="dropdown-toggle"' : '';
		$attributes .=   $depth == 1                ? ' tabindex="-1" '                                : '';
		$attributes .=  ' title="'. $title .'" ';
    $attributes .= $controls;

		$item_output = $args->before;
		$item_output .= '<a'. $attributes .'>';
		$item_output .= $args->link_before . apply_filters( 'the_title', $title, $item->ID ) . $args->link_after;
		$item_output .= $caret;
		$item_output .= '</a>';
		$item_output .= $args->after;

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}


  // function initial_dropdowns()
  // {
  //
  //   $pages = get_pages('number=1');
  //   $page = $pages[0];
  //
  //   echo
  //     '<div id="dawgdrops" aria-label="Main menu" role="navigation">
  //      <h3 class="assistive-text">Main menu</h3>
  //      <div class="dawgdrops-inner container">
  //       <ul id="menu-dropdowns" class="dawgdrops-nav" role="menubar">
  //         <li role="presentation" class="dawgdrops-item">
  //         <a href="'. get_permalink( $page->ID ) .'" class="dropdown-toggle" title="'. $page->post_title .'">' . $page->post_title . '</a>
  //         </li>
  //       </ul>
  //      </div>
  //     </div>';
  //
  // }
}
