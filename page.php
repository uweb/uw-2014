<?php get_header(); ?>

        <div class="uw-hero-image">

        </div>
		<div role="main" class="container uw-body">
			
						
			<div class="row">
				<div class="col-md-8 uw-content">
                    <h2 class='uw-site-title'><?= get_bloginfo()?></h2>
					
			        <?php while ( have_posts() ) : the_post(); ?>

                    <?php uw_breadcrumbs(); ?>

			        <main id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				        <header class="entry-header">
                            <?php
                            $title = get_the_title();
					        if (!empty($title)): ?>
					        <h1 class="entry-title"><?php echo apply_filters('italics', $title); ?></h1>
					        <?php endif; ?>
				        </header><!-- .entry-header -->
				        <div class="entry-content">
                            <?php the_content(); ?>
                            <?php wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'uw' ) . '</span>', 'after' => '</div>' ) ); ?>
                        </div><!-- .entry-content -->
                        <footer class="entry-meta">
                            <?php edit_post_link( __( 'Edit', 'uw' ), '<span class="edit-link">', '</span>' ); ?>
                        </footer><!-- .entry-meta -->
                    </main><!-- #post-<?php the_ID(); ?> -->

					<?php comments_template( '', true ); ?>

                    <?php endwhile; // end of the loop. ?>

                </div><!-- uw-body -->
				<div class="col-md-4 uw-sidebar" role="complementary">
                    <?php uw_sidebar(); ?>
                </div><!-- secondary -->
			</div><!-- row -->
 		</div><!-- uw-body -->

<?php get_footer(); ?>
