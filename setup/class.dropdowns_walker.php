<?php

  /**
   * From the Walker class.
   *  This removes the classnames and adds accessibility tags
   */

class UAMS_Dropdowns_Walker_Menu extends Walker_Nav_Menu
{

  private $CURRENT = '';

  function __construct()
  {
    //add_filter('wp_nav_menu', array($this, 'add_role_menubar'));
    //add_filter('wp_nav_menu', array($this, 'add_aria_expanded'));
	}

//  function add_role_menubar($html)
//  {
//    return str_replace('class="reddiedrops-nav"', 'class="reddiedrops-nav" role="menubar"', $html);
//  }

  function start_lvl( &$output, $depth = 0, $args = array() )
  {
	$indent = str_repeat( "\t", $depth );
	if ($depth > 0) {
		$output .= "\n$indent<ul class=\"sub-menu\">";
	} else {
		$output .= "\n$indent<ul role=\"group\" id=\"menu-{$this->CURRENT}\" aria-labelledby='{$this->CURRENT}' aria-expanded=\"false\" class=\"reddiedrops-menu\">";
	}
/*
	if( $depth == 0 ) {
			$output .= "\n$indent<div class=\"col\">";
		}
*/
	$output .= "\n";
   }

  function end_lvl( &$output, $depth = 0, $args = array() )
  {
    //if ( $depth > 0 )
    //  return;
    $indent = str_repeat("\t", $depth);

/*
    if( $depth == 0 ) {
		$output .= "$indent</div>\n$indent<div class=\"clear\"></div>";
	}
*/


		$output .= "$indent</ul>\n";
	}

  function display_element ($element, &$children_elements, $max_depth, $depth, $args, &$output)
		{
	      	$element->has_children = isset($children_elements[$element->ID]) && !empty($children_elements[$element->ID]);
		  	return parent::display_element($element, $children_elements, $max_depth, $depth, $args, $output);
	  	}

  function start_el(&$output, $item, $depth = 0, $args = array() , $id=0)
  {

    $this->CURRENT = $item->post_name;
    $title = ! empty( $item->title ) ? $item->title : $item->post_title;

    $controls = $depth == 0 && $item->has_children ? 'aria-controls="menu-'.$item->post_name.'" aria-expanded="false" aria-haspopup="true"' : '';

		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

		$class_names = $value = '';

		$classes     = $depth == 0 ? array( 'reddiedrops-item', $item->classes[0] ) : array();
		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );

    $li_classnames = ! empty($classes) ? 'class="'. $class_names .'"' : '';
    $li_attributes = $depth == 0 ? ' ' : '';

		$output .= $indent . '<li ' . $li_attributes . $li_classnames .'>';

		$attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

		$attributes .= $depth == 0 && $item->has_children ? ' class="dropdown-toggle"' : '';

		$attributes .= $depth > 0                ? ' tabindex="-1" '                                : '';
		$attributes .= ' title="'. $title .'" ';
        $attributes .= $controls;

        $attributes .= ' id="' . $this->CURRENT . '"';

		$item_output = $args->before;
		$item_output .= '<a'. $attributes .'>';
		$item_output .= $args->link_before . apply_filters( 'the_title', $title, $item->ID ) . $args->link_after;
		$item_output .= '</a>';
		$item_output .= $args->after;

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}


}
