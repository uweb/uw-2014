<?php get_header(); ?>

        <div class="uw-hero-image">

        </div>
		<div role="main" class="container uw-body">
			<div class="row">
				<div class="col-md-8 uw-content">
					
                <h1>Search results for: <span><?php the_search_query(); ?></span></h1>
					
                <?php
                if (have_posts() ):
                while ( have_posts() ) :
                    the_post();
                $post_id = get_the_id();
                $title = get_the_title();
                $permalink = get_the_permalink();
                $excerpt = get_the_excerpt();
                ?>

                <article id="post-<?= $post_id ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <h2 class="entry-title"><a href="<?= $permalink ?>" title="<?php the_title_attribute(); ?>"><?= $title ?></a></h2>
                    </header><!-- .entry-header -->
            
                    <div class="entry-content">
                        <?= $excerpt ?>
                    </div><!-- .entry-content -->
                </article><!-- #post-<?= $post_id ?> -->

                <?php
                endwhile;
                else :
                ?>

                    No results found.
              
                <?php
                endif;
                ?>

			    </div><!-- uw-content -->
				<div class="col-md-4 uw-sidebar" role="complementary">
                    <?php uw_sidebar(); ?>
                </div><!-- uw-sideabr -->
			</div><!-- row -->
		</div><!-- uw-body -->

<?php get_footer(); ?>
