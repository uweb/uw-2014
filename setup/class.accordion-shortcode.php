<?php

/*
 * Shortcode for embedding accordion style module
 * [accordion name='web name']
 * [section title='section title'] content [/section]
 * [section title='section title'] content [/section]
 * [section title='section title'] content [/section]
 * [/accordion]
 */

class UW_AccordionShortcode
{
    const PRIORITY = 12;
    
    function __construct()
    {
        remove_filter( 'the_content', 'wpautop' );
        add_filter( 'the_content', 'wpautop' , self::PRIORITY );

        remove_filter( 'the_excerpt', 'wpautop' );
        add_filter( 'the_excerpt', 'wpautop' , self::PRIORITY );

        add_shortcode('accordion', array($this, 'accordion_handler'));
        add_shortcode('section', array($this, 'section_handler'));
        add_shortcode('subsection', array($this, 'subsection_handler'));      
    }

    function accordion_handler( $atts, $content )
    {
        $accordion_atts = shortcode_atts( array(
          'name' => '',
        ), $atts);

        if ( empty( $content ) )
            return 'No content inside the accordion element. Make sure your close your accordion element. Required stucture: [accordion][section]content[/section][/accordion]';

        $output = do_shortcode( $content );
        return sprintf( '<script src="' . get_template_directory_uri() . '/js/uw.accordionmodule.js" type="text/javascript"></script><div id="uw-accordion-shortcode"><h3>%s</h3><div class="js-accordion" data-accordion-prefix-classes="uw-accordion-shortcode">%s</div></div>', $accordion_atts['name'], $output );
    }

    function section_handler( $atts, $content )
    {
        $section_atts = shortcode_atts( array(
          'title' => '',
          'active' => false,
        ), $atts);
        $class = '';
        if ( empty( $content ) ){
          $content = 'No content for this tile.  Make sure you wrap your content like this: [tile]Content here[/tile]';
        }
        if ($section_atts['active']) {
            $class = 'data-accordion-opened="true"';
        }
        $output = do_shortcode( $content );
        return sprintf( '<h2 class="js-accordion__header">%s</h2><div class="js-accordion__panel" %s>%s</div>', $section_atts['title'], $class, apply_filters( 'the_content', $output ) );
    }

    function subsection_handler( $atts, $content )
    {
        $section_atts = shortcode_atts( array(
          'title' => '',
          'active' => false,
        ), $atts);
        $class = '';
        if ( empty( $content ) ){
          $content = 'No content for this tile.  Make sure you wrap your content like this: [tile]Content here[/tile]';
        }
        if ($section_atts['active']) {
            $class = 'data-accordion-opened="true"';
        }
        $output = do_shortcode( $content );
        return sprintf( '<h3 class="js-accordion__header uw-accordion-subheader">%s</h3><div class="js-accordion__panel" %s>%s</div>', $section_atts['title'], $class, apply_filters( 'the_content', $output ) );
    }
}
