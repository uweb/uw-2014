<?php get_header(); ?>

<?php get_template_part( 'header', 'image' ); ?>

<div class="container uw-body">

  <div class="row">

    <div <?php uw_content_class(); ?> role='main'>

      <?php uw_site_title(); ?>

      <?php get_template_part( 'menu', 'mobile' ); ?>

      <?php get_template_part( 'breadcrumbs' ); ?>

      <div id='main_content' class="uw-body-copy" tabindex="-1">

      <h1><?php echo single_cat_title( '', false ); ?></h1><hr>

        <?php


/* ------- Jessie's function : Prioritize Sticky posts in categorize pages------------ */
          $sticky = get_option( 'sticky_posts' );
          $args_sticky = array(
              'showposts' => -1,
              'post__in' => $sticky
          );

          $args_nonsticky = array(
             'posts_per_page' => -1,
             'post__not_in' => $sticky
          );

          $the_query_sticky = new WP_Query($args_sticky);
          $the_query_nonsticky = new WP_Query($args_nonsticky);

          // reorder posts so that sticky posts comes first
          if ($sticky[0]) {
              while ($the_query_sticky -> have_posts()) : $the_query_sticky -> the_post();
                  get_template_part( 'content', 'archive' );
              endwhile;
          }

          while ($the_query_nonsticky -> have_posts()) : $the_query_nonsticky -> the_post();
              get_template_part( 'content', 'archive' );
          endwhile;
/* ------- Jessie's function Ends Here ----------------------------------------------- */


          /*
           * This is the original function
           */

          //while ( have_posts() ) : the_post();

            /*
             * Include the post format-specific template for the content. If you want to
             * use this in a child theme, then include a file called called content-___.php
             * (where ___ is the post format) and that will be used instead.
             */
            //get_template_part( 'content', 'archive' );

          //endwhile;


        ?>
        </br>
        <?php posts_nav_link(' ', 'Previous page', 'Next page'); ?>

      </div>

    </div>

    <?php get_sidebar() ?>

  </div>

</div>

<?php get_footer(); ?>
