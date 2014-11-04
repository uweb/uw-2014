<h1>
  <a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_title() ?></a>
</h1>
<!--
this is for the author section on single posts. We need an option to show (or to hide) author names on posts
<div class="author-info">
    <?php //the_author(); ?>
    <p class="author-desc"> <small><?php //the_author_meta(); ?></small></p>
</div>
-->

<?php

  if ( ! is_home() && ! is_search() && ! is_archive() ) :
    uw_mobile_menu();
  endif;

?>

<?php

  if ( is_archive() || is_home() )
    the_excerpt();
  else
    the_content();

 ?>
