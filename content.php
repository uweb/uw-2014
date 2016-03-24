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
    <?php if ( function_exists( 'coauthors' ) ) { coauthors(); } else { the_author(); } ?>
    <p class="author-desc"> <small><?php the_author_meta(); ?></small></p>
</div>
<?php
endif;
  if ( ! is_home() && ! is_search() && ! is_archive() ) :
    uw_mobile_menu();
  endif;

?>

<?php
  

  if ( is_archive() || is_home() ) {
    the_post_thumbnail( array(130, 130), array( 'class' => 'attachment-post-thumbnail blogroll-img' ) );
    the_excerpt();
    echo "<hr>";
  } else
    the_content();
    //comments_template(true);
 ?>
