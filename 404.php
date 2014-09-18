<?php get_header(); ?>

<style type="text/css">
    .error404 .container {
        
    }
    .error404 #searchform {
        margin: 80px 0;
    }
</style>

        <?php $header_image = get_header_image();?>
        <div class="uw-hero-image"<?php if (!empty($header_image)){ ?> style="background-image:url('<?= $header_image ?>');"<?php } ?>></div>

        </div>
        <div role='main' class='container uw-body'>
            <div class="row show-grid">
                <div class="col-md-8 col-md-offset-2">

            <!-- TODO: finalize the 404 look for the new theme.  This is the old theme
            <div id="parallax" class="parallax-viewport">
                <div class="parallax-layer" style="width:942px;">
                    <img alt="Clouds" src="//cdn.washington.edu/wp-content/themes/uw-2013/img/404/sky.jpg" />
                </div>          
                <div class="parallax-layer" style="width:900px;">
                    <img alt="Woof" src="//cdn.washington.edu/wp-content/themes/uw-2013/img/404/woof.png" />
                </div>
                <div class="parallax-layer">
                    <img alt="Dog house" src="//cdn.washington.edu/wp-content/themes/uw-2013/img/404/dawghouse.png" />
                </div>
                <div class="parallax-layer">
                    <img alt="Dubs" src="//cdn.washington.edu/wp-content/themes/uw-2013/img/404/dubbs.png" />
                </div>
            </div>
            -->

            <div class='text-center'>
                <?php get_search_form(); ?>
            </div>
            <div class="row show-grid">
                <div class="col-md-6">
                   <h3>Not what you were expecting?</h3>
                   <p>Dubs tells us this page might not be what you had in mind when you set out on your journey through the UW Web.  Don&#146;t worry, you&#146;re not in the Dawg House! Here are some of Dubs&#146; favorite pages if you feel like exploring: </p>

                </div>

                <div class="col-md-5 col-md-offset-1">
                    <ul>
                        <li><a href="//www.washington.edu">UW home page</a></li>
                        <li><a href="//www.washington.edu/discover/">Discover the UW</a></li>
                        <li><a href="//www.washington.edu/maps/">Maps</a></li>
                        <li><a href="//www.washington.edu/news/">UW Today</a></li>
                        <li><a href="http://www.gohuskies.com/">Husky Sports</a></li>
                        <li><a href="//www.washington.edu/discover/visit/">Visitor and Information Center</a></li>
                    </ul>
                </div>
            </div><!-- four-oh-four -->

            </div></div>

		</div><!-- uw-body -->

<?php get_footer(); ?>
