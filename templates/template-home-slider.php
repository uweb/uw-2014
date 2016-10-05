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
<style>
	.uams-homepage-slider-container {
		position: relative;
		height: calc(100vh - 45px); }
	@media (min-width: 992px) {
		.uams-homepage-slider-container {
			height: 430px; }
	}
	.uams-homepage-slider-container .slideshow-controls {
		position: absolute;
		bottom: 0;
		height: 112px;
		width: 250px;
		line-height: 17px;
		text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
		cursor: pointer;
		padding: 14px 14px 0 14px;
		z-index: 11;
		background-color: rgba(0,0,0,0.25) }
	@media (min-width: 768px) {
		.uams-homepage-slider-container .slideshow-controls {
			left: 48px; }
	}
	@media (min-width: 992px) {
		.uams-homepage-slider-container .slideshow-controls {
			left: 60%; }
	}
	.uams-homepage-slider-container .slideshow-controls:hover {
		text-shadow: 0px 3px 4px black; }
/*
	.uams-homepage-slider-container .slideshow-controls::after {
		background: url("/wp-content/themes/uams-2016/assets/svg/uams-sprite.svg") no-repeat -730px 0;
		content: "";
		position: absolute;
		bottom: 0;
		width: 38px;
		height: 112px;
		margin-right: 279px;
		left: -38px;
		text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5); }
*/
	.uams-homepage-slider-container .slideshow-controls .uwn-slideshow-next-text {
		color: white;
		font-weight: bold;
		font-style: italic;
		font-size: 13px; }
	.uams-homepage-slider-container .slideshow-controls .uwn-slideshow-next-text::after {
		content: "\A";
		white-space: pre; }
	.uams-homepage-slider-container .slideshow-controls .uwn-slideshow-next-title {
		color: white;
		font-weight: bold;
		cursor: pointer; }
	.uams-homepage-slider-container .uams-homepage-slider {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 1;
		transition: opacity 1s;
		pointer-events: none; }
	.uams-homepage-slider-container .uams-homepage-slider.activeslide {
		opacity: 1;
		pointer-events: auto; }
	.uams-homepage-slider-container .uams-homepage-slider div {
		padding: 24px; }
	.uams-homepage-slider.lighttext div h3, .uams-homepage-slider.lighttext div p {
		color: #fff;
		text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
	}
	.uams-homepage-slider.darktext div h3, .uams-homepage-slider.darktext div p {
		color: #212121;
		text-shadow: 1px 1px 1px rgba(225, 225, 225, 0.3);
	}
	@media (min-width: 992px) {
		.uams-homepage-slider-container .uams-homepage-slider div {
			margin: 45px auto;
			width: 970px; }
	}
	@media (min-width: 1200px) {
		.uams-homepage-slider-container .uams-homepage-slider div {
			margin: 45px auto;
			width: 1170px; }
	}
	.uams-homepage-slider-container .uams-homepage-slider div h3.slide-title {
		font-size: 48px;
		line-height: 52px;
		text-transform: uppercase;
		}
	.uams-homepage-slider-container .uams-homepage-slider div p {
		font-size: 18px;
		line-height: 28px;
		font-weight: 400;
		}
	@media (min-width: 1200px) {
		.uams-homepage-slider-container .uams-homepage-slider div p {
			width: 44%; }
	}
	@media only screen and (max-width: 767px) {
		.uams-hero-image {
			display: block !important; }
	}

</style>
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


<?php wp_enqueue_script( 'script', get_template_directory_uri() . '/js/home-slider.js', array ( 'jquery' ), 1.1, true); ?>

<?php get_footer(); ?>
