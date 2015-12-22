<?php
if (is_single() || is_home()){
    the_date('F j, Y', '<p class="date">', '</p>');
}
?>
<h1><?php the_title() ?></h1>
<?php
if ((is_single() || is_home()) && get_option('show_byline_on_posts')) :
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

?>

<?php
  the_post_thumbnail();

  if ( is_archive() || is_home() )
    the_excerpt();
  else
    the_content();
    //comments_template(true);
 ?>
