<?php
/**
 * Template Name: Small Hero
 */
?>

<?php get_header(); 
      $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
      if(!$url){
        $url = get_site_url() . "/wp-content/themes/uw-2014/assets/headers/suzzallo.jpg";
      }
      $sidebar = get_post_meta($post->ID, "sidebar");   ?>


<div class="uw-hero-image hero-height2" style="background-image: url(<?php echo $url ?>);">
      <div class="container">
        <h1 class="uw-site-title2"><?php the_title(); ?></h1>
        <span class="udub-slant"><span></span></span>      
      </div>

</div>
<div class="container uw-body">
  <?php if (!is_front_page()) { get_template_part( 'breadcrumbs' ); }?>
  <div class="row">

    <div class="hero-content col-md-<?php echo (($sidebar[0]!="on") ? "8" : "12" ) ?> uw-content" role='main'>


      <div id='main_content' class="uw-body-copy" tabindex="-1">

        <?php
          while ( have_posts() ) : the_post(); 

              the_content();

            // If comments are open or we have at least one comment, load up the comment template.
            if ( comments_open() || get_comments_number() ) {
              comments_template();
            }

          endwhile;
          
        ?>

      </div>

    </div>

    <div id="sidebar"><?php 
      if($sidebar[0]!="on"){
        get_sidebar();
      }
    ?></div>

  </div>

</div>

<?php get_footer(); ?>
