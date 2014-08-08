<?php get_header(); ?>

        <div class="uw-hero-image">

        </div>
		<div role="main" class="container uw-body">
			
						
			<div class="row">
				<div class="col-md-8 uw-content">
                    <h2 class='uw-site-title'><?= get_bloginfo()?></h2>
					
                    <?php
                    while ( have_posts() ) :
                    the_post();
                    $post_id = get_the_id();
                    $title = get_the_title();
                    $date = get_the_date();
                    $author = get_the_author();
                    $content = get_the_content();
                    ?>

                    <?php uw_breadcrumbs(); ?>

					<article id="post-<?= $post_id ?>" <?php post_class(); ?>>
				        <header class="entry-header">
                            <?php
                            if (!empty($title)):
                            ?>
					        <h1 class="entry-title"><?= $title ?></h1>
                            <?php endif; ?>
                            <p class="date"><?= $date ?></p>
                            <p class="author-info">By <?= $author ?></p>
				        </header><!-- .entry-header -->
                        <div class="entry-content">
                            <?php the_post_thumbnail(); ?>
                            <?= $content ?>
                        </div><!-- .entry-content -->
                        <footer class="entry-meta">
                            <?php the_tags('This article was posted under: ', ', ', '<br />'); ?> 
                            <?php edit_post_link( __( 'Edit', 'uw' ), '<span class="edit-link">', '</span>' ); ?>
                        </footer><!-- .entry-meta -->
                    </article><!-- #post-<?= $post_id ?> -->

					<?php comments_template( '', true ); ?>

                    <?php endwhile; // end of the loop. ?>

                </div><!-- uw-content -->
				<div class="col-md-4 uw-sidebar" role="complementary">
                    <?php uw_sidebar(); ?>
                </div><!-- uw-sidebar -->
			</div><!-- row -->
 		</div><!-- uw-body -->

<?php get_footer(); ?>
