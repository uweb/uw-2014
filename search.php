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
                ?>

                <article id="post-<?php the_id(); ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <h2 class="entry-title">
                            <a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_title() ?></a>
                        </h2>
                    </header><!-- .entry-header -->
            
                    <div class="entry-content">
                        <?php the_excerpt(); ?>
                    </div><!-- .entry-content -->
                </article><!-- #post-<?php the_id(); ?> -->

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
