<?php if ( uams_has_sidebar() ) :  ?>

  <div class="col-md-4 uams-sidebar">
    <?php uams_sidebar_menu(); ?>
    <?php dynamic_sidebar( UAMS_Sidebar::ID ); ?>
  </div>

<?php endif; ?>
