<?php
/**
  * Template Name: Home with Slider
  */
?>

<?php get_header(); ?>


<?php
	$first = true; // used to write class on first slide
	$loop = new WP_Query( array( 'post_type' => 'home_slider',
        'posts_per_page' => 3, 'orderby' => 'menu_order date', 'order'   => 'DESC' )
            );
    if ( $loop->have_posts() ) : ?>
<div class="uams-homepage-slider-container" role="region">
	<?php
        while ( $loop->have_posts() ) : $loop->the_post();

			$mobileimage = get_post_meta($post->ID, "hs_mobile_image");
			$hasmobileimage = false;
			if( !empty($mobileimage) && $mobileimage[0] !== "") {
	        	$mobileimage = $mobileimage[0];
				$hasmobileimage = true;
	      	}
		  	$buttonlink = get_post_meta($post->ID, "hs_button_url", true);
		  	$textcolor = get_post_meta($post->ID, "hs_text_color", true);

      ?>

    <div data-mobimg="<? echo ($hasmobileimage ? $mobileimage : the_post_thumbnail_url() ); ?>" data-dtimg="<? the_post_thumbnail_url() ?>" class="uams-hero-image uams-homepage-slider <?php echo ($textcolor ? $textcolor : 'lighttext' ); ?> <?php echo ($first ? 'activeslide' : '' ); ?>" style="background-position: center center; background-image:url('<? the_post_thumbnail_url() ?>');">
		<div>
			<h3 class="slide-title"><?php echo get_the_title($post->ID); ?></a><span class="udub-slant"><span style="background-color: #b7a57a;"></span></span></h3>
			<?php the_content($post->ID); ?>
			<p><a class="uams-btn btn-sm btn-none" href="<? echo $buttonlink ?>">Learn more</a></p>
		</div>
	</div>

<?php
	$first = false;
	endwhile; wp_reset_query();
	?>
	<div class="slideshow-controls">
		<span class="uwn-slideshow-next-text">NEXT</span>
		<span class="uwn-slideshow-next-title">NEXT TITLE HERE</span>
		<span class="udub-slant" style="margin-top: 10px;"><span style="background-color: #fff; height: 5px; width: 57px;"></span></span>
	</div>
</div>
	<?php
	else :

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

<?php
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


<?php// wp_enqueue_script( 'script', get_template_directory_uri() . '/js/home-slider.js', array ( 'jquery' ), 1.1, true); ?>

<?php get_footer(); ?>
