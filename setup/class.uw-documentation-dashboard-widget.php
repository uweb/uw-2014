<?php
// Create the function to output the contents of our Dashboard Widget
class UW_Documentation_Dashboard_Widget
{

    function __construct()
    {
        add_action('wp_dashboard_setup', array($this, 'uw_add_documentation_dashboard_widget'));
    }


    function uw_add_documentation_dashboard_widget() {

        global $wp_meta_boxes;

        wp_add_dashboard_widget('uw-documentation-dashboard-widget', 'Documentation and FAQs', array($this, 'uw_documentation_html'));

        $wp_meta_boxes['dashboard']['side']['core']['uw-documentation'] =
        $wp_meta_boxes['dashboard']['normal']['core']['uw-documentation'];
        unset($wp_meta_boxes['dashboard']['normal']['core']['uw-documentation']);

        remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_secondary', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );

    }


    function uw_documentation_html()
    {
      ?>

        <div class="wrap">

        <p>
          <h2>Top Tutorials</h2>
          <ul class="shortcode-blogroll">
            <li>  <a target="_blank" href="https://www.washington.edu/marketing/2013/04/10/wordpress-image-galleries/">Create image galleries</a>
            <li>  <a target="_blank" href="http://www.washington.edu/marketing/2013/04/08/embed-video/">Embed video</a>
            <li>  <a target="_blank" href="http://www.washington.edu/marketing/2013/01/02/embed-the-campus-map/">Embed the Campus Map</a>
            <li>  <a target="_blank" href="http://www.washington.edu/marketing/2012/12/19/pagelets/">Create and use Pagelets</a>
            <li>  <a target="_blank" href="http://www.washington.edu/marketing/2013/04/10/same-document-url">Update documents and keep the same URL</a>
          </ul>
          Looking for something else? Browse all Web Team <a href="http://www.washington.edu/marketing/web-design/wordpress-theme/documentation/">WordPress documentation</a>.
        </p>

        <p>
          <?php  echo do_shortcode('[rss url="http://www.washington.edu/marketing/topic/wp-documentation/feed/" number=3 title="Latest Tutorials" heading="h2" show_image="false" show_date="false" show_more="false"]'); ?>
        </p>

        <p>
          <?php  echo do_shortcode('[rss url="http://www.washington.edu/marketing/topic/wordpress/feed" number=3 title="Web Team Updates" heading="h2" show_image="false" show_date="false"]'); ?>
        </p>

        <p>
          <h2>Stuck?</h2>
          If you are hosted by the Marketing Web Team and need guidance on something not found in our <a href="http://www.washington.edu/marketing/web-design/wordpress-theme/documentation/">documentation</a> or the <a href="http://codex.wordpress.org/Main_Page">WordPress Codex</a>, please contact <a href="mailto:uweb@uw.edu">uweb@uw.edu</a>.
        </p>

        </div>

    <?php
    }
}
