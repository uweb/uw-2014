<?php the_date('F j, Y', '<p class="date">', '</p>'); ?>
<h2 style="font-size: 27px;">
  <a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_title() ?></a>
</h2>
<?php
if (get_option('show_byline_on_posts')) :
?>
<div class="author-info">
    <?php the_author(); ?>
    <p class="author-desc"> <small><?php the_author_meta(); ?></small></p>
</div>
<?php
endif;
  if ( ! is_home() && ! is_search() && ! is_archive() ) :
    uw_mobile_menu();
  endif;
 if ( has_post_thumbnail() ) :
 	the_post_thumbnail( 'thumbnail' , 'style=margin-bottom:5px;');
 endif;
?>
<?php the_excerpt(); ?>
<hr>
