<?php $url = is_404() ? 'http://www.washington.edu/' : home_url('/'); ?>
<form role="search" method="get" id="searchform" class="searchform" action="<?php echo set_url_scheme( $url ) ?>">
	<div>
		<label class="screen-reader-text" for="s">Search for:</label>
		<input type="text" value="" name="s" id="s" placeholder="Search for:" autocomplete="off">
		<input type="submit" id="searchsubmit" value="Search">
	</div>
</form>
