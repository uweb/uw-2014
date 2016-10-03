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

			$mobileimage = get_post_meta($post->ID, "_data_mobileimage");
			$hasmobileimage = false;
			if( !empty($mobileimage) && $mobileimage[0] !== "") {
	        	$mobileimage = $mobileimage[0];
				$hasmobileimage = true;
	      	}
		  	$buttonlink = get_post_meta($post->ID, "_data_linkurl", true);

      ?>

    <div data-mobimg="<? echo ($hasmobileimage ? $mobileimage : the_post_thumbnail_url() ); ?>" data-dtimg="<? the_post_thumbnail_url() ?>" class="uams-hero-image uams-homepage-slider lighttext <?php echo ($first ? ' activeslide' : '' ); ?>" style="background-position: center center; background-image:url('<? the_post_thumbnail_url() ?>');">
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
<!--
	<div data-mobimg="https://nursing.uw.edu/wp-content/uploads/2016/09/web-header.jpg" data-dtimg="https://nursing.uw.edu/wp-content/uploads/2016/09/web-header.jpg" class="uams-hero-image uams-homepage-slider lighttext activeslide" style="background-position: center center; background-image:url('https://nursing.uw.edu/wp-content/uploads/2016/09/web-header.jpg');">
		<div>
			<h3 class="slide-title">2016 Soule lecture</a><span class="udub-slant"><span style="background-color: #b7a57a;"></span></span></h3>
			<p>Join us on Oct. 13 for a keynote address by Dr. Risa Lavizzo-Mourey, president and CEO of the Robert Wood Johnson Foundation.</p>
			<p><a class="uams-btn btn-sm btn-none" href="https://nursing.uw.edu/article/2016-soule-lecture-features-robert-wood-johnson-foundation-president-and-ceo/">Learn more</a></p>
		</div>
	</div>
	<div data-mobimg="https://nursing.uw.edu/wp-content/uploads/2016/08/applications-mobile.jpg" data-dtimg="https://nursing.uw.edu/wp-content/uploads/2016/08/applications-web.jpg" class="uams-hero-image uams-homepage-slider lighttext" style="background-position: center center; background-image:url('https://nursing.uw.edu/wp-content/uploads/2016/08/applications-web.jpg');">
		<div>
			<h3 class="slide-title">Applications are now open!</a><span class="udub-slant"><span style="background-color: #b7a57a;"></span></span></h3>
			<p>Apply today for ABSN, MS, DNP and Ph.D. degree programs and graduate certificates. BSN applicants, check back - your application opens Oct. 1.</p>
			<p><a class="uams-btn btn-sm btn-none" href="https://nursing.uw.edu/programs/">Learn more about degree programs</a></p>
		</div>
	</div>
	<div data-mobimg="https://nursing.uw.edu/wp-content/uploads/2016/07/sim-lab-mobile.jpg" data-dtimg="https://nursing.uw.edu/wp-content/uploads/2016/07/sim-lab-desktop.jpg" class="uams-hero-image uams-homepage-slider lighttext" style="background-position: center center; background-image:url('https://nursing.uw.edu/wp-content/uploads/2016/07/sim-lab-desktop.jpg');">
		<div>
			<h3 class="slide-title">Transforming the student experience</a><span class="udub-slant"><span style="background-color: #b7a57a;"></span></span></h3>
			<p>Washington State legislators recently provided $4 million in funding to upgrade and expand the simulation and learning lab. Work is now underway! Phase 1 of the new lab is expected to open in July 2017.  </p>
			<p><a class="uams-btn btn-sm btn-none" href="https://nursing.uw.edu/students/cene/">Learn more about the sim lab</a></p>
		</div>
	</div>
-->

<style>
	.uams-homepage-slider-container {
  position: relative;
  height: calc(100vh - 45px); }
  @media (min-width: 992px) {
    /* line 1, ../scss/components/_slider.scss */
    .uams-homepage-slider-container {
      height: 430px; } }
  /* line 14, ../scss/components/_slider.scss */
  .uams-homepage-slider-container .slideshow-controls {
    position: absolute;
    bottom: 0;
    height: 112px;
    width: 240px;
    line-height: 17px;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    padding-top: 14px;
    z-index: 11; }
    @media (min-width: 768px) {
      /* line 14, ../scss/components/_slider.scss */
      .uams-homepage-slider-container .slideshow-controls {
        left: 48px; } }
    @media (min-width: 992px) {
      /* line 14, ../scss/components/_slider.scss */
      .uams-homepage-slider-container .slideshow-controls {
        left: 60%; } }
    /* line 38, ../scss/components/_slider.scss */
    .uams-homepage-slider-container .slideshow-controls:hover {
      text-shadow: 0px 3px 4px black; }
    /* line 42, ../scss/components/_slider.scss */
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
    /* line 54, ../scss/components/_slider.scss */
    .uams-homepage-slider-container .slideshow-controls .uwn-slideshow-next-text {
      color: white;
      font-weight: bold;
      font-style: italic;
      font-size: 13px; }
      /* line 59, ../scss/components/_slider.scss */
      .uams-homepage-slider-container .slideshow-controls .uwn-slideshow-next-text::after {
        content: "\A";
        white-space: pre; }
    /* line 66, ../scss/components/_slider.scss */
    .uams-homepage-slider-container .slideshow-controls .uwn-slideshow-next-title {
      color: white;
      font-weight: bold;
      cursor: pointer; }
  /* line 74, ../scss/components/_slider.scss */
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
    /* line 85, ../scss/components/_slider.scss */
    .uams-homepage-slider-container .uams-homepage-slider.activeslide {
      opacity: 1;
      pointer-events: auto; }
    /* line 90, ../scss/components/_slider.scss */
    .uams-homepage-slider-container .uams-homepage-slider div {
      padding: 24px; }
      @media (min-width: 992px) {
        /* line 90, ../scss/components/_slider.scss */
        .uams-homepage-slider-container .uams-homepage-slider div {
          margin: 45px auto;
          width: 970px; } }
      @media (min-width: 1200px) {
        /* line 90, ../scss/components/_slider.scss */
        .uams-homepage-slider-container .uams-homepage-slider div {
          margin: 45px auto;
          width: 1170px; } }
      /* line 108, ../scss/components/_slider.scss */
      .uams-homepage-slider-container .uams-homepage-slider div h3.slide-title {
        font-size: 48px;
        line-height: 52px;
        color: white;
        text-transform: uppercase;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3); }
      /* line 116, ../scss/components/_slider.scss */
      .uams-homepage-slider-container .uams-homepage-slider div p {
        color: white;
        font-size: 19px;
        line-height: 28px;
        font-family: "Encode Sans Compressed",sans-serif;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3); }
        @media (min-width: 1200px) {
          /* line 116, ../scss/components/_slider.scss */
          .uams-homepage-slider-container .uams-homepage-slider div p {
            width: 44%; } }

@media only screen and (max-width: 767px) {
  /* line 139, ../scss/components/_slider.scss */
  .uams-hero-image {
    display: block !important; } }

</style>
<!--
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
-->
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
