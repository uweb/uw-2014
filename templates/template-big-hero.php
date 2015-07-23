<?php
/**
  * Template Name: Big Hero
  */
?>

<?php get_header(); 
      $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
      $sidebar = get_post_meta($post->ID, "sidebar");   ?>


<div class="uw-hero-image hero-height" style="background-image: url(<?php echo $url ?>);">
    <div id="hero-bg">
      <div id="hero-container" class="container">
        <h1 class="uw-site-title"><?php the_title(); ?></h1>
        <span class="udub-slant"><span></span></span>
        <?php //echo "tag line goes here"; //or add optional tag line? ?> 
      </div>
    </div>
</div>
<div class="container uw-body">
  <?php if (!is_front_page()) { get_template_part( 'breadcrumbs' ); }?>
  <div class="row">

    <div class="hero-content col-md-<?php echo (($sidebar[0]!="on") ? "8" : "12" ) ?> uw-content" role='main'>

      <div id='main_content' class="uw-body-copy" tabindex="-1">

        <?php
          // Start the Loop.
          while ( have_posts() ) : the_post(); 

            /*
             * Include the post format-specific template for the content. If you want to
             * use this in a child theme, then include a file called called content-___.php
             * (where ___ is the post format) and that will be used instead.
             */

              the_content();

            // If comments are open or we have at least one comment, load up the comment template.
            if ( comments_open() || get_comments_number() ) {
              comments_template();
            }

          endwhile;
          
        ?>

      </div>

    </div>

    <?php 
    if($sidebar[0]!="on"){ ?>
      <div id="sidebar">
      <?php get_sidebar(); ?>
      </div> <?php 
    } ?> 

  </div>

</div>

<?php get_footer(); ?>
