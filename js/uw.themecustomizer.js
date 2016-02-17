// This file edits the Live Theme Customizer's control menu
//


jQuery( document ).ready( function($) {
	
	// HEADERS TO HTTPS
	$( "#accordion-section-header_image img" ).each(function() { 
		if (!this.src.includes("https:") && window.location.href.includes(".edu")) {
			this.src = this.src.replace( "http:" , "https:" );
		}
	});

	
} );