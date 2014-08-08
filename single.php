<?php get_header(); ?>

        <div class="uw-hero-image">

        </div>
		<div role="main" class="container uw-body">
			
						
			<div class="row">
				<div class="col-md-8 uw-content">
                    <h2 class='uw-site-title'><?php bloginfo()?></h2>
					
                    <?php
                    while ( have_posts() ) :
                    the_post();

                    uw_breadcrumbs();
                    ?>

					<article id="post-<?php the_id(); ?>" <?php post_class(); ?>>
				        <header class="entry-header">
					        <h1 class="entry-title"><?php the_title(); ?></h1>
                            <p class="date"><?php the_date('F j, Y'); ?></p>
                            <p class="author-info">By <?php the_author(); ?></p>
				        </header><!-- .entry-header -->
                        <div class="entry-content">
                            <?php 
                            the_post_thumbnail(); //alignleft class?  How should this look?
                            the_content();
                            ?>
                        </div><!-- .entry-content -->
                        <footer class="entry-meta">
                            <?php the_tags('This article was posted under: ', ', ', '<br />'); ?> 
                            <?php edit_post_link( __( 'Edit', 'uw' ), '<span class="edit-link">', '</span>' ); ?>
                        </footer><!-- .entry-meta -->
                    </article><!-- #post-<?php the_id(); ?> -->

					<?php comments_template( '', true ); ?>

                    <?php endwhile; // end of the loop. ?>

                </div><!-- uw-content -->
				<div class="col-md-4 uw-sidebar" role="complementary">
                    <?php uw_sidebar(); ?>
                </div><!-- uw-sidebar -->
			</div><!-- row -->
 		</div><!-- uw-body -->

<?php get_footer(); ?>
