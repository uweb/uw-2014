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
		<div role="main" class="container uw-body">
			
						
			<div class="row">
				<div class="col-md-8 uw-content">
                    <h2 class='uw-site-title'><?php bloginfo(); ?></h2>
					
                    <?php 
                    while ( have_posts() ) : the_post();

                    uw_breadcrumbs();
                    ?>

			        <main id="post-<?php the_id(); ?>" <?php post_class(); ?>>
				        <header class="entry-header">
					        <h1 class="entry-title"><?php the_title(); ?></h1>
				        </header><!-- .entry-header -->
				        <div class="entry-content">
                            <?php the_content(); ?>
                        </div><!-- .entry-content -->
                        <footer class="entry-meta">
                            <?php edit_post_link( __( 'Edit', 'uw' ), '<span class="edit-link">', '</span>' ); ?>
                        </footer><!-- .entry-meta -->
                    </main><!-- #post-<?php the_id(); ?> -->

					<?php comments_template( '', true ); ?>

                    <?php endwhile; // end of the loop. ?>

                </div><!-- uw-content -->
				<div class="col-md-4 uw-sidebar" role="complementary">
                    <?php uw_sidebar(); ?>
                </div><!-- uw-sideabr -->
			</div><!-- row -->
 		</div><!-- uw-body -->

<?php get_footer(); ?>
