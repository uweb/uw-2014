<?php if ( is_search() || is_archive() ): ?>
  <?php //uw_mobile_front_page_menu() ?>
<?php endif; ?>

<?php if ( ! is_front_page() ) :uw_mobile_menu(); else : uw_mobile_front_page_menu(); endif; ?>
