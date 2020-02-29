<?php

/*
 *  YouTube shortcode allows for youtube video and/or playlist to be added to content
 *  [youtube type='type' id='video or playlist id' max-results='integer that defines max results']
 *  max_results is optional, and if not given allows the UW javascript object to define max_results
 */

class UW_YouTube
{

    public static $types = array('playlist', 'single');

    function __construct()
    {
        add_action('admin_init', array($this, 'youtube_api_key_setting_init'));
        add_action('wp_enqueue_scripts', array($this, 'youtube_api_key_localize_script'));
        add_shortcode('youtube', array($this, 'youtube_handler'));
    }

    function youtube_handler($atts)
    {
        $attributes = (object) $atts;

        $classes = array('uw-btn');

        if (isset($attributes->type)){
            $type = strtolower($attributes->type);
            if (!in_array($type, $this::$types)){
                return sprintf('youtube type "%s" not supported', $type);
            }
        }
        else {
            return 'required attribute "type" missing';
        }

        if (isset($attributes->id)){
            $id = $attributes->id;
        }
        else {
            return 'required attribute "id" missing';
        }

        $el_id = 'uw-youtube-' . rand(0,100); //needs unique id.  Could set this in shortcode instead of generating
        $max_results = isset($attributes->max_results) ? intval($attributes->max_results) : 0;
        if ($max_results > 0){
            $return = sprintf('<div id="%s" class="uw-youtube" data-uw-youtube-type="%s" data-uw-youtube="%s" data-max-results="%d"></div>', $el_id, $type, $id, $max_results);
        }
        else {
            $return = sprintf('<div id="%s" class="uw-youtube" data-uw-youtube-type="%s" data-uw-youtube="%s"></div>', $el_id, $type, $id);
        }

        return $return;
    }

    function youtube_api_key_setting_init() {
        register_setting(
            'media',
            'youtube_api_key',
            array($this, 'sanitize_youtube_api_key')
        );

        add_settings_section(
            'youtube_api_key_section',
            'Youtube API Key',
            array($this, 'youtube_api_key_setting_description'),
            'media'
        );

        add_settings_field(
            'youtube_api_key_setting',
            'API Key',
            array($this, 'youtube_api_key_input'),
            'media',
            'youtube_api_key_section'
        );
    }

    function youtube_api_key_setting_description() {
        echo "<p>Upload your own YouTube API key below</p>";
    }

    function youtube_api_key_input() {
        $option = get_option('youtube_api_key');
        ?>
            <input name="youtube_api_key" type="text" class="regular-text" value="<?php echo esc_attr($option); ?>" />
        <?php
    }
    
    function sanitize_youtube_api_key($key) {
        return preg_replace('/[^a-zA-Z0-9_\-]/', '', $key);
    }

    function youtube_api_key_localize_script() {
        $api_key = array(
            'youtube' => get_option('youtube_api_key')
        );
        
        wp_localize_script('site', 'apiKey', $api_key);
    }
}