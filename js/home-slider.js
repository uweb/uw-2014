jQuery(document).ready(function(){

    var sliderstate = 'desktop';

    function initialize_slider () {

	var slides = jQuery('.uams-homepage-slider-container .uams-homepage-slider');
	var totalslides = slides.length;

	var next = jQuery('.slideshow-controls');

	var slidetitle = jQuery('.uams-homepage-slider-container .uams-homepage-slider .slide-title')
	var thenextslide = 1;
	var thenexttitle = slidetitle[1].innerText;
	next[0].childNodes[3].innerText = thenexttitle;

	next.click(function(){
	    slides.removeClass('activeslide');
	    console.log(slides);
	    slides[thenextslide].className = slides[thenextslide].className + ' activeslide';
	    console.log(thenextslide);
	    //Change Next color
	    if (slides[thenextslide].className.indexOf("lighttext") >=0) {
	    	next.removeClass('darktext');
	    	next.addClass('lighttext');
	    } else {
		    next.removeClass('lighttext');
	    	next.addClass('darktext');
	    }
	    thenextslide = (thenextslide == totalslides - 1) ? 0 : thenextslide + 1;
	    console.log(thenextslide);
	    thenexttitle = slidetitle[thenextslide].innerText;
	    next[0].childNodes[3].innerText = thenexttitle;
	    console.log(thenexttitle);
	});

    }

    if(jQuery('.uams-homepage-slider-container').length == 1){
	initialize_slider();
    }

    function set_background(){
	var thewidth = $( window ).width();
	var newimage;
	console.log(thewidth);
	if (thewidth < 750 && sliderstate == 'desktop'){
	    sliderstate = 'mobile';
	    $('.uams-homepage-slider-container > div').each(function(){
		newimage = $(this).attr('data-mobimg');
		if (newimage != undefined && newimage != ''){
		    $(this).css('background-image','url(\'' + newimage + '\')');
		}
	    });
	}
	else if (thewidth > 749 && sliderstate == 'mobile') {
	    sliderstate = 'desktop';
	    $('.uams-homepage-slider-container > div').each(function(){
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
