<?php
/**
 * Template Name: No title/image
 */
?>

<?php get_header(); 
    $sidebar = get_post_meta($post->ID, "sidebar");  ?>

<div class="uw-hero-image hero-blank no-title">
  <h1 class="container uw-site-title-blank"><?php the_title(); ?></h1>
</div>

<div class="container uw-body">

  <div class="row">

    <div class="col-md-<?php echo (($sidebar[0]!="on") ? "8" : "12" ) ?> uw-content" role='main'>

      <?php uw_site_title(); ?>
      <?php get_template_part( 'menu', 'mobile' ); ?>
      <?php get_template_part( 'breadcrumbs' ); ?>

      <div id='main_content' class="uw-body-copy" tabindex="-1">


        <?php
          // Start the Loop.
          while ( have_posts() ) : the_post();

            //the_content();
            get_template_part( 'content', 'page-noheader' );

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
