<?php

/*

Shortcode for using the Links list found in the dashboard

Example: 
[bookmark category_name=pfw categorize="0" title_li=""]
[row]
    [col class='col-md-12']Text[/col]
[/row]

 */



class UW_GridShortcode
{
    
    function __construct()
    {
        add_shortcode('row', array( &$this, 'bs_row'));  
        add_shortcode('col', array( &$this, 'bs_span'));       
    }


    function bs_row( $params, $content=null ) {
        extract( shortcode_atts( array(
            'class' => 'row'
        ), $params ) );
        $content = preg_replace( '/<br class="nc".\/>/', '', $content );
        $result = '<div class="' . $class . '">';
        $result .= do_shortcode( $content );
        $result .= '</div>';
        return force_balance_tags( $result );
    }
    
    
    function bs_span( $params, $content=null ) {
        extract( shortcode_atts( array(
            'class' => 'col-sm-1'
            ), $params ) );
    
        $result = '<div class="' . $class . '">';
        $result .= do_shortcode( $content );
        $result .= '</div>';
        return force_balance_tags( $result );
    }

    

}

