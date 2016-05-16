<?php $url = is_multisite() ? get_site_url(1, '/') : site_url('/'); ?>
<form role="search" method="get" id="searchform" class="searchform" action="<?php echo set_url_scheme(  ) ?>">
	<div>
		<label class="screen-reader-text" for="s">Search for:</label>
		<input type="text" value="" name="s" id="s" placeholder="Search for:" autocomplete="off">
		<input type="submit" id="searchsubmit" value="Search">
	</div>
</form>
