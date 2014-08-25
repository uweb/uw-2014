<?php

/*
 *  Settings for the front page of uw sites
 */

 class UW_FrontPageSettings
 {
    function __construct()
    {
        add_action('admin_init', array($this, 'add_settings'));
    }

    function add_settings()
    {
        register_setting('general', 'front_page_has_sidebar');
        add_settings_field('front_page_has_sidebar', 'Choose a layout for the front page', array($this, 'front_page_has_sidebar_callback'), 'general'); 
    }

    function front_page_has_sidebar_callback()
    {
        $has_sidebar = (boolean) get_option('front_page_has_sidebar');
        ?>
        <input name='front_page_has_sidebar' type='radio' value=1 <?php if ($has_sidebar){ ?>checked='checked' <?php }?>>put image for sidebar template here</br>
        <input name='front_page_has_sidebar' type='radio' value=0 <?php if (!$has_sidebar){ ?>checked='checked' <?php } ?>>put image for sidebarless template here
        <?php
    }
 
 }
