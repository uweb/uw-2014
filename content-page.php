<h1><?php the_title() ?></h1>

<div id="mobile-sidebar">

	<button id="mobile-sidebar-menu" class="visible-xs" aria-hidden="true" tabindex="1"> 

	    <div aria-hidden="true" id="ham"> 
		    <span></span> 
			<span></span> 
			<span></span> 
			<span></span>        
		</div>
	   <div id="mobile-sidebar-title" class="page_item">

<?php 
        echo text_cut();

		function text_cut($text, $length = 27, $dots = true) {   
		$text =get_the_title(); 
		$text = trim(preg_replace('#[\s\n\r\t]{2,}#', ' ', $text));    
		$text_temp = $text;    
		   while (substr($text, $length, 1) != " ") 
		    { $length--; 
		  	if ($length > strlen($text)) { break; } }     
		    $text = substr($text, 0, $length);     
		    return $text . ( ( $dots == true && $text != '' && strlen($text_temp) > $length ) ? '...' : ''); 
		   }
?>

	  </div>
	</button>
	<div id="mobile-sidebar-links" aria-hidden="true">  <?php uw_sidebar_menu(); ?></div>
</div>


<?php the_content(); ?>
