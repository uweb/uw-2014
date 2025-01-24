<?php
/**
 * Adds a media credit to images in the media library
 */

class UW_Media_Credit
{
    public function __construct()
    {
        add_filter('mce_external_plugins', array($this, 'add_media_credit_shortcode_to_tinymce'));
        add_filter('image_send_to_editor', array($this, 'mediacredit_tinymce_html'), 10, 7);
        add_shortcode('mediacredit', array($this, 'mediacredit_html'));
        add_filter('attachment_fields_to_edit', array($this, 'image_attachment_fields_to_edit'), 100, 2);
        add_filter('attachment_fields_to_save', array($this, 'custom_image_attachment_fields_to_save'), 10, 2);
    }

    public function add_media_credit_shortcode_to_tinymce($plugins)
    {
        $plugins['mediacredit'] = get_template_directory_uri() . '/assets/admin/js/media-credit.js';
        return $plugins;
    }

    /**
     * Override the editor html to include media credit even if the photo caption is empty
     */
    public function mediacredit_tinymce_html($html, $id, $caption, $title, $align, $url, $size)
    {
        if ($caption) {
            return $html;
        }

        $credit = get_post_meta($id, '_media_credit', true);
        $img = wp_get_attachment_image_src($id, $size);
        $width = $img[1];
        $height = $img[2];

        return $credit ?
            '[caption id="attachment_' . $id . '" align="' . $align . '" width="' . $width . '" credit="' . $credit . '"]<a href="' . $img[0] . '"><img src="' . $img[0] . '" alt="' . $caption . '" width="' . $width . '" height="' . $height . '" class="size-full wp-image-' . $id . '" /></a> ' . $caption . '[/caption]' : $html;
    }

    public function mediacredit_html($empty, $attrs, $content)
    {
        $attrs = shortcode_atts(array(
            'id' => '',
            'align' => '',
            'size' => '',
            'credit' => '',
        ), $attrs);

        $img = wp_get_attachment_image_src($attrs['id'], $attrs['size']);
        $width = $img[1];

        if (1 > (int)$attrs['id']) {
            return '';
        }

        return '<div class="wp-caption ' . esc_attr($attrs['align']) . '" style="width:' . (10 + (int)$width) . 'px">' .
            do_shortcode($content) . '<p class="wp-media-credit">' . $attrs['credit'] . '</p>' . '</div>';
    }

    /**
     * Adding the custom fields to the $form_fields array
     */
    public function image_attachment_fields_to_edit($form_fields, $post)
    {
        if (!in_array('custom-header', get_post_meta($post->ID, "_wp_attachment_context")) && wp_attachment_is_image($post->ID)) {
            $form_fields["media_credit"] = array(
                "label" => __("Image Credit"),
                "input" => "text",
                "value" => get_post_meta($post->ID, "_media_credit", true)
            );

            $form_fields["source_url"] = array(
                "label" => __("Credit URL"),
                "input" => "text",
                "value" => get_post_meta($post->ID, '_source_url', true),
            );

            $form_fields["media_credit"]["label"] = __("Image Credit");
            $form_fields["media_credit"]["input"] = "text";
            $form_fields["media_credit"]["value"] = get_post_meta($post->ID, "_media_credit", true);

            $form_fields["source_url"]["label"] = __("Credit URL");
            $form_fields["source_url"]["input"] = "text";
            $form_fields["source_url"]["value"] = get_post_meta($post->ID, "_source_url", true);
        }

        return $form_fields;
    }

    /**
     * Save the media credit
     */
    public function custom_image_attachment_fields_to_save($post, $attachment)
    {
        if (isset($attachment['media_credit'])) {
            update_post_meta($post['ID'], '_media_credit', $attachment['media_credit']);
        }

        if (isset($attachment['source_url'])) {
            update_post_meta($post['ID'], '_source_url', esc_url($attachment['source_url']));
        }

        return $post;
    }
}

new UW_Media_Credit();