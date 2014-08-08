<?php get_header(); ?>

        <div class="uw-hero-image">

        </div>
		<div role="main" class="container uw-body">
			
						
			<div class="row">
				<div class="col-md-8 uw-content">
                    <h2 class='uw-site-title'><?= get_bloginfo()?></h2>
					
                    <?php while ( have_posts() ) :
                    the_post();
                    $post_id = get_the_id();
                    $title = get_the_title();
                    
                    uw_breadcrumbs();
                    ?>

			        <main id="post-<?= $post_id ?>" <?php post_class(); ?>>
				        <header class="entry-header">
                            <?php
                            if (!empty($title)):
                            ?>
					        <h1 class="entry-title"><?= $title ?></h1>
					        <?php endif; ?>
				        </header><!-- .entry-header -->
				        <div class="entry-content">
                            <?= $content ?>
                        </div><!-- .entry-content -->
                        <footer class="entry-meta">
                            <?php edit_post_link( __( 'Edit', 'uw' ), '<span class="edit-link">', '</span>' ); ?>
                        </footer><!-- .entry-meta -->
                    </main><!-- #post-<?= $post_id ?> -->

					<?php comments_template( '', true ); ?>

                    <?php endwhile; // end of the loop. ?>

                </div><!-- uw-content -->
				<div class="col-md-4 uw-sidebar" role="complementary">
                    <?php uw_sidebar(); ?>
                </div><!-- uw-sideabr -->
			</div><!-- row -->
 		</div><!-- uw-body -->

<?php get_footer(); ?>
