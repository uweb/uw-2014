<?php

/*
 * Simple shortcode for embedding a Trumba spud
 * [trumba name='web name' type='spud type' base='teaser base url']
 */

class UW_Trumba
{

    function __construct()
    {
        $this->TrumbaAdded = false;
        add_shortcode('trumba', array($this, 'trumba_handler'));        
    }

    function trumba_handler($atts)
    {
        $attributes = (object) $atts;
        $rand = rand(0,100);
        if (isset($attributes->name)){
            $name = strtolower($attributes->name);
        }
        else {
            return 'missing required webName to identify the spud';
        }

        if ($this->TrumbaAdded){
            $return = '';
        }
        else {
            $return = '<script type="text/javascript" src="//www.trumba.com/scripts/spuds.js"></script>';
            $this->TrumbaAdded = true;
        }

        $type = 'upcoming';
        if (isset($attributes->type)){
            $type = $attributes->type;
        }
        
        if (isset($attributes->base)){
            $teaser = $attributes->base;
        }
        $trumba .= sprintf('$Trumba.addSpud({webName:"%s",spudType:"%s",BorderColor:"#FFFFFF",marginTop:0', $name, $type);
        if (isset($teaser)){
            $trumba .= sprintf(',teaserBase:"%s"', $teaser);
        }
        $trumba .= '});';

        $return .= sprintf('<script type="text/javascript" id="trumba%d">%s</script>', $rand, $trumba);
        return $return;
    }
}
