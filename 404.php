<?php get_header(); ?>

<?php get_template_part( 'header', 'image' ); ?>

<div class="container uw-body">

  <div class="row">

    <div <?php uw_content_class(); ?> role="main">

      <?php get_template_part( 'breadcrumbs' ); ?>

        <div class="row show-grid">
          <div class="col-md-12">

            <div class="woof" style="background: url( <?php echo get_template_directory_uri() . '/assets/images/404.jpg' ?>) center center no-repeat"></div>

            <div class="row show-grid">

              <div class="col-md-6">
                <?php get_search_form(); ?>
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
            </div>

          </div>
        </div>

      </div>

  </div>

</div>

<?php get_footer(); ?>
