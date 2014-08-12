<?php get_header(); ?>

        <div class="uw-hero-image">

        </div>
        <div role='main' class='container uw-body'>
			
						
			<div class="row show-grid">
				<div class="col-md-8 uw-content">
								
                <?php while ( have_posts() ) : the_post();?>

				
			        <article id="post-<?php the_id() ?>" <?php post_class(); ?>>
				        <header class="entry-header">
                            <h2 class="entry-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <span class="post-info">
                                <p><?php the_time('F j, Y'); ?></p>
                                <p class="author-info">By <?php the_author(); ?></p>
                            </span>
				        </header><!-- .entry-header -->
			
                        <div class="entry-content">
                            <?php
                            the_post_thumbnail(array(200,200), array('class' => 'alignleft'));
                            the_excerpt();
                            ?>
				        </div><!-- .entry-content -->
				        <hr>
                    </article><!-- #post-<?php the_id(); ?> -->

			    <?php endwhile; // end of the loop. ?>

                <?php //uw_prev_next_links(); not yet defined ?>

				</div><!-- uw-content -->
				<div class="col-md-4 uw-sidebar" role="complementary">
                    <?php uw_sidebar(); ?>
                </div><!-- uw-sidebar -->
				</div>
			</div><!-- row -->
		</div><!-- uw-body -->

<?php get_footer(); ?>
