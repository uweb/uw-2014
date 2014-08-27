<?php
get_header();
$has_sidebar = get_option('front_page_has_sidebar');
?>

<div class="uw-hero-image"></div>

<div class="container uw-body">

  <div class="row">

    <?php if ($has_sidebar) { ?>
    <div class="col-md-8 uw-content" role='main'>
    <?php } else { ?>
    <div class="col-md-12 uw-content" role='main'>
    <?php } ?>

      <h2 class="uw-site-title"><?php bloginfo(); ?></h2>

      <?php get_template_part( 'breadcrumbs' ); ?>

      <div class="uw-body-copy">

        <?php
          // Start the Loop.
          while ( have_posts() ) : the_post();

            /*
             * Include the post format-specific template for the content. If you want to
             * use this in a child theme, then include a file called called content-___.php
             * (where ___ is the post format) and that will be used instead.
             */
            get_template_part( 'content', get_post_format() );

            // If comments are open or we have at least one comment, load up the comment template.
            if ( comments_open() || get_comments_number() ) {
              comments_template();
            }

          endwhile;
        ?>

      </div>

    </div>

    <?php
    if ($has_sidebar){
      get_sidebar();
    }
    ?>

  </div>

</div>

<?php get_footer(); ?>
