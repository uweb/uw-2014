<?php

/**
 * Creates iframe options page under settings menu
 * Entered domains are added to whitelist in /setup/class.uw-iframes.php
 */
class UW_Iframes_Settings
{
    private $options;

    function __construct() {
        add_action( 'admin_menu', array($this, 'iframe_add_admin_menu'));
        add_action( 'admin_init', array($this, 'iframe_settings_init'));
    }

    function iframes_add_admin_menu(  ) { 
        add_options_page( 'iFrame Settings', 'iFrames', 'manage_options', 'iframes', array($this, 'iframes_options_page');
    }
    
    function iframes_settings_init() { 
        $this->setup_sections();
        $this->setup_options();
    }
    
    function setup_sections() {
        $this->add_settings_sections();
    }
    
    function setup_options() { 
        register_settings();
        add_settings_fields();  
    }
    
    function add_settings_sections() {
        add_settings_section(
            'iframes_iframe_settings_page_section', 
            __('', 'wordpress'), 
            array($this, 'iframes_settings_section_callback'), 
            'iframe_settings_page'
        );
    }
    
    function register_settings() {
        register_setting('iframe_settings_page', 'iframes_settings');
    }
    
    function add_settings_fields() {
        add_settings_field( 
            'iframes_textarea_field_0', 
            __('iFrame Whitelist', 'wordpress'), 
            array($this, 'iframes_textarea_field_0_render'), 
            'iframe_settings_page', 
            'iframes_iframe_settings_page_section' 
        );
    }
    
    function iframes_textarea_field_0_render() { 
        $this->$options = get_option('iframes_settings');
        ?>
        <p style="margin: .25em 0 .5em!important; display: inline-block;">
            <label for="iframes_settings[iframes_textarea_field_0]">
            Iframes are only allowed from authorized domains. Enter domains 
            below to add them to the whitelist of authorized domains. One domain per line.</label>
        </p>
        <p>
        <textarea cols='145' rows='8' name='iframes_settings[iframes_textarea_field_0]'><?php echo $options['iframes_textarea_field_0'];?></textarea>
        </p>
        <?php
        add_option('iframes_settings', '$options');
    }
    
    function iframes_settings_section_callback() { 
        echo __('', 'wordpress');
    }
    
    function iframes_options_page() { 
        ?>
        <div class="wrap">
        <form action='options.php' method='post'>
            <h1>iFrame Settings</h1>
            <?php
            settings_fields('iframe_settings_page');
            do_settings_sections('iframe_settings_page');
            submit_button();
            ?>
        </form>
        </div>
        <?php
    }
}
