<div class="uw-image-content">

  <?php echo wp_get_attachment_image($post->ID, 'full', false, $attr=array('class' =>'attachment-full center-block')); ?>

  <h1 class="entry-title"><?php the_title(); ?></h1>

  <?php echo get_the_excerpt(); ?>
  <?php 
  	$credit = get_post_meta( $post->ID, '_media_credit', true);
  	if ($credit) echo "<br> Photo Credit: " . $credit; 
  ?>

  <div>
    <a href="<?php echo wp_get_attachment_url(get_the_ID());?>" title="<?php the_title(); ?>" target="_blank" download="<?php the_title() ?>">Download</a>
  </div>

</div>
