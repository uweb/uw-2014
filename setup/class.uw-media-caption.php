<?php

//
// Adds a media caption to images in the media library
//

class UW_Media_Caption
{
    public function __construct()
    {
        add_filter('img_caption_shortcode', array($this, 'add_media_credit_to_caption_shortcode_filter'), 10, 3);
    }

    //
    // Override the caption html - original in wp-includes/media.php
    //

    public function add_media_credit_to_caption_shortcode_filter($val, $attr, $content)
    {
        $attr = shortcode_atts(array(
            'id' => '',
            'align' => '',
            'width' => '',
            'caption' => '',
            'credit' => '',
            'source_url' => ''
        ), $attr);

        if (1 > (int)$attr['width']) {
            return $content;
        }

        $id = $attr['id'] ? 'id="' . esc_attr($attr['id']) . '" ' : '';
        preg_match('/([\d]+)/', $id, $match);

        if (!empty($match[0])) {
            $credit = get_post_meta($match[0], '_media_credit', true);
            $source_url = get_post_meta($match[0], '_source_url', true);
        }

        if (!empty($credit)) {
            $credit = '<span class="wp-media-credit">' . $credit . '</span>';
        }

        if (!empty($source_url)) {
            $credit = '<a href="' . esc_url($source_url) . '">' . $credit . '</a>';
        } else {
            $credit = esc_url($source_url) . $credit;
        }

        return '<div ' . $id . 'class="wp-caption ' . esc_attr($attr['align']) . '" style="width: ' . (10 + (int)$attr['width']) . 'px">'
            . do_shortcode($content) . '<p class="wp-caption-text">' . $attr['caption'] . $credit . '</span>' . '</p></div>';
    }
}

new UW_Media_Caption();