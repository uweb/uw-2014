<?php get_header(); ?>

        <div class="uw-hero-image">

        </div>
        <div role='main' class='container uw-body'>
			
						
			<div class="row show-grid">
				<div class="col-md-8 uw-content">
								
                <?php while ( have_posts() ) :
                    the_post();
                    $post_id = get_the_ID();
                    $title = get_the_title();
                    $author = get_the_author();
                    $permalink = get_the_permalink();
                    $time = get_the_time('F j, Y');
                    $excerpt = get_the_excerpt();
                    $thumbnail = get_the_post_thumbnail($post_id, array(200,200), array('class' => 'alignleft'));
                ?>

				
			        <article id="post-<?= $post_id ?>" <?php post_class(); ?>>
				        <header class="entry-header">
                        <?php if (!empty($title)): ?>
                            <h2 class="entry-title">
                                <a href="<?= $permalink ?>"><?= $title ?></a>
                            </h2>
                        <?php endif; ?>
                            <span class="post-info">
                                <p><?= $time ?></p>
                                <p class="author-info">By <?= $author ?></p>
                            </span>
				        </header><!-- .entry-header -->
			
                        <div class="entry-content">
                            <?= $thumbnail ?>
                            <?= $excerpt ?>
				        </div><!-- .entry-content -->
				        <hr>
			        </article><!-- #post-<?= $post_id ?> -->

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
