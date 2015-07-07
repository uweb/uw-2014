<?php
/**
 * Template Name: No image
 */
?>

<?php get_header(); ?>

<div class="uw-hero-image hero-blank">
	<h1 class="uw-site-title-blank"><?php the_title(); ?></h1>
</div>

<div class="container uw-body">

  <div class="row">

    <div class="col-md-8 uw-content" role='main'>

      <?php if (is_front_page()) { get_template_part( 'menu', 'mobile' ); }?>

      <?php if (!is_front_page()) { get_template_part( 'breadcrumbs' ); }?>

      <div id='main_content' class="uw-body-copy" tabindex="-1">

        <?php
          // Start the Loop.
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

