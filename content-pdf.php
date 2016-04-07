
<h1 class="entry-title"><?php the_title(); ?></h1>

<div style="margin-top: 30px">
  <a class="uw-btn btn-sm btn-plus" href="<?php echo wp_get_attachment_url(get_the_ID());?>" title="<?php the_title(); ?>" target="_blank">Download</a>
</div>

<?php the_excerpt(); ?>

<iframe class="uw-pdf-view" style="<?php echo( is_pdf() ? 'width:100%;height:900px;' : 'width:0px;height:0px;'); ?>" src="<?php echo wp_get_attachment_url(get_the_ID()); ?>?<?php echo time() ?>"></iframe>
