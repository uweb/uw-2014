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

              <div class="col-md-10 col-md-offset-1">
                <h3>Not what you were expecting?</h3>
                <p>Dubs tells us this page might not be what you had in mind when you set out on your journey through the UW Web. Don&#146;t worry, you&#146;re not in the Dawg House! Here are some of Dubs&#146; favorite pages if you feel like exploring: </p>
              </div>

              <div class="col-md-3 col-md-offset-1 col-sm-6">
                <ul>
                  <li><a href="//uw.edu/?utm_source=error&utm_medium=click&utm_campaign=links&utm_term=uwhomepage">UW home page</a></li>
                  <li><a href="//uw.edu/contact/?utm_source=error&utm_medium=click&utm_campaign=links&utm_term=contactus">Contact us</a></li>
                  <li><a href="//uw.edu/about/?utm_source=error&utm_medium=click&utm_campaign=links&utm_term=abouttheuw">About the UW</a></li>
                  <li><a href="//uw.edu/admissions/?utm_source=error&utm_medium=click&utm_campaign=links&utm_term=applytotheuw">Apply to the UW</a></li>
                  <li><a href="//uw.edu/visit/?utm_source=error&utm_medium=click&utm_campaign=links&utm_term=visittheuw">Visit the UW</a></li>
                  <li><a href="//uw.edu/maps/?utm_source=error&utm_medium=click&utm_campaign=links&utm_term=maps">Maps</a></li>
                </ul>
              </div>
              <div class="col-md-8 col-sm-6">
                <ul>
                  <li><a href="http://www.uwmedicine.org/">UW Medicine</a></li>
                  <li><a href="https://www.uwb.edu/">UW Bothell</a></li>
                  <li><a href="https://www.tacoma.uw.edu">UW Tacoma</a></li>
                  <li><a href="https://gohuskies.com/">Athletics</a></li>
                  <li><a href="//uw.edu/news/?utm_source=error&utm_medium=click&utm_campaign=links&utm_term=uwnews">UW News</a></li>
                  <li><a href="http://artsuw.org/">ArtsUW</a></li>
                  <li><a href="https://my.uw.edu/">MyUW</a></li>

                </ul>
              </div>

              <div class="col-md-10 col-md-offset-1">
                <p>Or, search the UW web:</p>
                <?php get_search_form(); ?>
              </div>
            </div>



          </div>
        </div>

      </div>

  </div>

</div>

<?php get_footer(); ?>
