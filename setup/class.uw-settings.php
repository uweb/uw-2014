<?php
// these are UW settings.

class UW_Settings
{

    function __construct(){
        add_action('admin_menu', array($this, 'setup_sections'));
        add_action('admin_init', array($this, 'setup_options'));
    }
    
    function setup_sections() {
        $this->make_setting_pages();
        $this->add_setting_sections();
    
    }

    function setup_options() {
        $this->register_settings();
        $this->add_settings_fields();
    }

    function make_setting_pages(){
        //no pages atm
    }

    function add_setting_sections() {
        //no sections atm
    }

    function register_settings() {
        register_setting('general', 'overly_long_title');
        register_setting('reading', 'show_byline_on_posts');
        register_setting('general', 'use_main_menu_on_mobile');
    }

    function add_settings_fields() {
        add_settings_field('overly_long_title', 'Does your site title take two lines on desktop?', array($this, 'overly_long_title_callback'), 'general');
        add_settings_field('show_byline_on_posts', 'Show bylines on single posts and archives?', array($this, 'show_byline_on_posts_callback'), 'reading');
        add_settings_field('use_main_menu_on_mobile', 'Use the main menu on mobile as default?', array($this, 'use_main_menu_on_mobile_callback'), 'general');
    }

    function overly_long_title_callback() {
        echo "<input name='overly_long_title' type='checkbox' value='1'" . checked( 1, get_option('overly_long_title'), false) . "/>(yes if checked)";
    }

    function show_byline_on_posts_callback() {
        echo "<input name='show_byline_on_posts' type='checkbox' value='1'" . checked( 1, get_option('show_byline_on_posts'), false) . "/>(yes if checked)";
    }

    function use_main_menu_on_mobile_callback() {
        echo "<input name='use_main_menu_on_mobile' type='checkbox' value='1'" . checked( 1, get_option('use_main_menu_on_mobile'), false) . "/>(yes if checked)";
    }
}
