<?php
/*
Template Name: Big Hero
 */

if(!is_front_page()){
    load_template(get_template_directory() . '/page.php');
    return;
}

get_header();
?>

        <div class="uw-hero-image large">

        </div>
		
		<?php include(get_stylesheet_directory() . '/page-common.php'); ?>
