<h1><?php the_title() ?></h1>

<?php if (!is_front_page()) { get_template_part( 'menu', 'mobile' ); }?>

<?php the_content(); ?>
