<?php
/*
 * Common code for page templates
 */
?>

<div class="container uw-body">
  <div class="row">
	<div class="col-md-8 uw-content" role='main'>
      <h2 class='uw-site-title'><?php bloginfo(); ?></h2>
					
      <?php uw_breadcrumbs() ?>
      <?php uw_mobile_menu() ?>

      <div class="uw-body-copy">

        <?php
          // Start the Loop.
          while ( have_posts() ) : the_post();

            /*
             * Include the post format-specific template for the content. If you want to
             * use this in a child theme, then include a file called called content-___.php
             * (where ___ is the post format) and that will be used instead.
             */
            get_template_part( 'content', 'page' );

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
