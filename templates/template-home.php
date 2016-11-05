<?php
/**
  * Template Name: Home
  */
?>

<?php get_header();
      $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
      if(!$url){
        $url = get_site_url() . "/wp-content/themes/uams-2016/assets/headers/uams-pattern-grey.png";
      }
      $mobileimage = get_post_meta($post->ID, "mobileimage");
      $hasmobileimage = '';
      if( !empty($mobileimage) && $mobileimage[0] !== "") {
        $mobileimage = $mobileimage[0];
        $hasmobileimage = 'hero-mobile-image';
      }
      $sidebar = get_post_meta($post->ID, "sidebar");
      $banner = get_post_meta($post->ID, "banner");
      $buttontext = get_post_meta($post->ID, "buttontext");
      $buttonlink = get_post_meta($post->ID, "buttonlink");   ?>


<div class="uams-hero-image hero-height <?php echo $hasmobileimage ?>" style="background-image: url(<?php echo $url ?>);">
    <?php if( !empty($mobileimage) ) { ?>
    <div class="mobile-image" style="background-image: url(<?php echo $mobileimage ?>);"></div>
    <?php } ?>
    <div id="hero-bg">
      <div id="hero-container" class="container">
      <?php if(!empty($banner) && $banner[0]){ ?>
        <div id="hashtag"><span><span><?php echo $banner[0] ? $banner[0] : ''; ?></span></span></div>
      <?php } ?>
        <h1 class="uams-site-title"><?php echo get_bloginfo( 'description' ); ?></h1>
        <span class="udub-slant"><span></span></span>
      <?php if(!empty($buttontext) && $buttontext[0]){ ?>
        <a class="uams-btn btn-sm btn-none" href="<?php echo $buttonlink[0] ? $buttonlink[0] : ''; ?>"><?php echo $buttontext[0] ? $buttontext[0] : ''; ?></a>
      <?php } ?>
      </div>
    </div>
</div>

<?php if( have_rows('action_menu') ):  ?>
<div class="full-bar">
	<nav aria-label="popular links" class="container action-bar">
		<ul class="center-block">
<?php
		// Get count for class
		$rows = get_field('action_menu');
		$row_count = count($rows);
		// loop through the rows of data
		while ( have_rows('action_menu') ) : the_row();

		// vars
		$linktitle = get_sub_field('action_link_title');
		$icon = get_sub_field('action_link_icon');
		$external = get_sub_field( 'action_link' );
		$internalurl = get_sub_field( 'action_link_page');
		$externalurl = get_sub_field('action_link_url');

?>
			<li class="ab-1_<?php echo $row_count; ?>"><a href="<?php echo ($external ? $externalurl : $internalurl); ?>" title="<?php echo $linktitle ?>"><span class="icon <?php echo $icon ?>"></span><span><?php echo $linktitle ?></span></a></li>
<?php
		endwhile; ?>
		</ul>
	</nav>
</div>
<?
	endif;
?>

<div class="container uams-body">

  <div class="row">

    <div class="hero-content col-md-<?php echo (($sidebar[0]!="on") ? "8" : "12" ) ?> uams-content" role='main'>

      <?php //uams_page_title(); ?>
      <?php //get_template_part( 'menu', 'mobile' ); ?>
      <?php get_template_part( 'breadcrumbs' ); ?>

      <div id='main_content' class="uams-body-copy" tabindex="-1">

        <?php
          // Start the Loop.
          while ( have_posts() ) : the_post();

            /*
             * Include the post format-specific template for the content. If you want to
             * use this in a child theme, then include a file called called content-___.php
             * (where ___ is the post format) and that will be used instead.
             */

              the_content();

            // If comments are open or we have at least one comment, load up the comment template.
            if ( comments_open() || get_comments_number() ) {
              comments_template();
            }

          endwhile;

        ?>

      </div>

    </div>

    <?php
    if($sidebar[0]!="on"){ ?>
      <div id="sidebar">
      <?php get_sidebar(); ?>
      </div> <?php
    } ?>

  </div>

</div>

<?php get_footer(); ?>
