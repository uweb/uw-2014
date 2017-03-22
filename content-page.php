<?php
	function text_cut($text, $length = 27, $dots = true) {   
		global $post;
		$parent = get_post($post->post_parent);
		$text = $parent->post_title;
		$text = trim(preg_replace('#[\s\n\r\t]{2,}#', ' ', $text));    
		$text_temp = $text;    
		while (substr($text, $length, 1) != " ") {
			$length--; 
			if ($length > strlen($text)) { break; }
		}     
		$text = substr($text, 0, $length);     
		return $text . ( ( $dots == true && $text != '' && strlen($text_temp) > $length ) ? '...' : ''); 
	}
?>

<h1><?php the_title(); ?></h1>
<!-- REMOVED SIDEBAR FOR WP 4.7 RELEASE -->
<!-- <?php //if(uw_list_pages()){ ?>
	<div id="mobile-sidebar">
		<button id="mobile-sidebar-menu" class="visible-xs" aria-hidden="true" tabindex="1"> 
	    	<div aria-hidden="true" id="ham"> 
		    	<span></span> 
				<span></span> 
				<span></span> 
				<span></span>        
			</div>
	   		<div id="mobile-sidebar-title" class="page_item">
				<?php //echo text_cut(); ?>
	  		</div>
		</button>
		<div id="mobile-sidebar-links" aria-hidden="true">  <?php //uw_sidebar_menu(); ?></div>
	</div>
<?php //} ?> -->

<?php the_content(); ?>

