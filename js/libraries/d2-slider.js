jQuery(document).ready(function(){

    var sliderstate = 'desktop';
    
    function initialize_slider () {
	
	var slides = jQuery('.uw-homepage-slider-container .uw-homepage-slider');
	var totalslides = slides.length;
	
	var next = jQuery('.slideshow-controls');
	var thenextslide = 1;
	var thenexttitle = slides[1].childNodes[0].childNodes[0].innerText;
	next[0].childNodes[3].innerText = thenexttitle;
	
	next.click(function(){
	    slides.removeClass('activeslide');
	    console.log(slides);
	    slides[thenextslide].className = slides[thenextslide].className + ' activeslide';
	    console.log(thenextslide);
	    thenextslide = (thenextslide == totalslides - 1) ? 0 : thenextslide + 1;
	    console.log(thenextslide);
	    thenexttitle = slides[thenextslide].childNodes[0].childNodes[0].innerText;
	    next[0].childNodes[3].innerText = thenexttitle;
	    console.log(thenexttitle);
	});
	
    }
    
    if(jQuery('.uw-homepage-slider-container').length == 1){
	initialize_slider();
    }

    function set_background(){
	var thewidth = $( window ).width();
	var newimage;
	console.log(thewidth);
	if (thewidth < 750 && sliderstate == 'desktop'){
	    sliderstate = 'mobile';
	    $('.uw-homepage-slider-container > div').each(function(){
		newimage = $(this).attr('data-mobimg');
		if (newimage != undefined && newimage != ''){
		    $(this).css('background-image','url(\'' + newimage + '\')');
		}
	    });
	}
	else if (thewidth > 749 && sliderstate == 'mobile') {
	    sliderstate = 'desktop';
	    $('.uw-homepage-slider-container > div').each(function(){
		newimage = $(this).attr('data-dtimg');
		if (newimage != undefined && newimage != ''){
		    $(this).css('background-image','url(\'' + newimage + '\')');
		}
	    });
	}
    }

    set_background();

    $( window ).resize(function(){
	set_background();
    });
    
});
