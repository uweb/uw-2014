<?php
/**
 * Template Name: Small Hero
 */
?>

<?php get_header(); 
      $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );   ?>


<div class="uw-hero-image hero-height2" style="background-image: url(<?php echo $url ?>);"></div>
<div class="container uw-body">
  <?php if (!is_front_page()) { get_template_part( 'breadcrumbs' ); }?>
  <div class="row">

    <div class="hero-content col-md-8 uw-content" role='main'>

      <h1 class="uw-site-title2"><?php the_title(); ?></h1>

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

    <?php get_sidebar() ?>

  </div>

</div>

<?php get_footer(); ?>
