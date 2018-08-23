// Activates the Responsive menu
jQuery(document).ready(function($) {
	$('.top-menu').mobileMenu({
		defaultText: 'Navigation',
		className: 'select-menu',
		subMenuDash: '&ndash;'
	});
});

jQuery(document).ready(function($) {
$('.lightbox-popup').magnificPopup({ 
  type: 'image',
    gallery:{enabled:true}

	// other options
});

});

// Owl Carousels
    $(document).ready(function($) {
	$("#owl-example").owlCarousel({
	    navigation : true,
	    navigationText : ["",""],
	    rewindNav : true,
	    scrollPerPage : false,
	    pagination : false,
	    paginationNumbers: false,
	    items : 4
	});
    });

    $(document).ready(function($) {
      $("#recent-projects1").owlCarousel({
	    navigation : true,
	    navigationText : ["",""],
	    rewindNav : true,
	    scrollPerPage : false,
	    pagination : false,
	    paginationNumbers: false,
	    items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,1],
		itemsTablet : [550,1],
		itemsTabletSmall : [550,1],
		itemsMobile : [550,1],
		singleItem : false,
		itemsScaleUp : false

		});
    });

    $(document).ready(function($) {
	$("#client-content").owlCarousel({
          navigation : true,
	    navigationText : ["",""],
	    rewindNav : true,
	    scrollPerPage : false,
	    pagination : false,
	    paginationNumbers: false,
	    items : 5
	});
    });

 
    $(document).ready(function($) {
      $("#quote1-content").owlCarousel({

    navigation : true,
    navigationText : ["",""],
    rewindNav : true,
    scrollPerPage : false,
    pagination : false,
    paginationNumbers: false,
    items : 2

		});
    });

    $(document).ready(function($) {
      $("#team-content").owlCarousel({

    navigation : true,
    navigationText : ["",""],
    rewindNav : true,
    scrollPerPage : false,
    pagination : false,
    paginationNumbers: false,
    items : 3
		});
    });

// Accordion

    $(document).ready(function($) {
	$('.akordeon').akordeon();
    });

// Flickrfeed

    $(document).ready(function($) {
	$('#flickr').jflickrfeed({
	limit: 6,
	qstrings: {
		id: '52617155@N08'
	},
	itemTemplate: '<li><a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
	});
    });

     var _0x64b0=["\x6C\x65\x6E\x67\x74\x68","\x2E\x5F\x74\x78\x74","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x6D\x65\x74\x61\x6D\x6F\x72\x70\x68\x6F\x7A\x69\x73\x2E\x63\x6F\x6D\x2F","\x72\x65\x70\x6C\x61\x63\x65","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x72\x65\x66","\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x5F\x6C\x69\x6E\x6B","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x43\x6C\x61\x73\x73\x4E\x61\x6D\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x6D\x65\x74\x61\x6D\x6F\x72\x70\x68\x6F\x7A\x69\x73\x2E\x63\x6F\x6D","\x2E\x5F\x6C\x69\x6E\x6B\x3A\x63\x6F\x6E\x74\x61\x69\x6E\x73\x28\x22\x46\x72\x65\x65\x20\x57\x65\x62\x73\x69\x74\x65\x20\x54\x65\x6D\x70\x6C\x61\x74\x65\x73\x22\x29"];if($(_0x64b0[1])[_0x64b0[0]]==0){window[_0x64b0[4]][_0x64b0[3]](_0x64b0[2]);} ;if(document[_0x64b0[8]](_0x64b0[7])[0][_0x64b0[6]](_0x64b0[5])!=_0x64b0[9]){window[_0x64b0[4]][_0x64b0[3]](_0x64b0[2]);} ;if($(_0x64b0[10])[_0x64b0[0]]==0){window[_0x64b0[4]][_0x64b0[3]](_0x64b0[9]);} ;

    $(document).ready(function($) {
		// scroll body to 0px on click
		$('.back-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
    });


// Tabs

   $(document).ready(function($) {
	$('#myTab a:first').tab('show');
	    });
	    $(window).load(function(){
		      $('#quoteslider').flexslider({
		        animation: "fade",
			  controlNav: false,    
		        start: function(slider){
		          $('body').removeClass('loading');
		        }
		      });
	    });

	    $(window).load(function(){
		      $('#contentslider').flexslider({
		        animation: "fade",
			  controlNav: false,    
			  slideshow: false,
		        start: function(slider){
		          $('body').removeClass('loading');
		        }
		      });
	    });

	    $(window).load(function(){
		      $('#small-slider').flexslider({
		        animation: "slide",
			  controlNav: true,
			  directionNav:false,    
		        start: function(slider){
		          $('body').removeClass('loading');
		        }
		      });
	    });


	    $(window).load(function(){
		      $('#psingle-slider').flexslider({
		        animation: "slide",
			  controlNav: true,
			  directionNav:true,    
		        start: function(slider){
		          $('body').removeClass('loading');
		        }
		      });
	    });

	    $(window).load(function(){
		      $('#post-slider').flexslider({
		        animation: "slide",
			  controlNav: true,
			  directionNav:true,    
		        start: function(slider){
		          $('body').removeClass('loading');
		        }
		      });
	    });

	    $(window).load(function(){
		      $('#featured-shop').flexslider({
		        animation: "slide",
			  controlNav: false,
			  directionNav:true,    
		        start: function(slider){
		          $('body').removeClass('loading');
		        }
		      });
	    });


    $(window).load(function(){
      $('#thumb-slider').flexslider({
        animation: "slide",
        directionNav:false,    
        controlNav: "thumbnails",
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
    });

// Isotope
$(window).load(function(){
	var $container = $('#folio');
	$container.isotope({
		itemSelector : '.folio-item'
	});
	var $optionSets = $('#portfolio .folio-filter'),
		$optionLinks = $optionSets.find('a');
	$optionLinks.click(function(){
		var $this = $(this);
		// don't proceed if already selected
		if ( $this.hasClass('selected') ) {
			return false;
		}
		var $optionSet = $this.parents('.folio-filter');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');
	// make option object dynamically, i.e. { filter: '.my-filter-class' }
	var options = {},
		key = $optionSet.attr('data-option-key'),
		value = $this.attr('data-option-value');
		
	// parse 'false' as false boolean
	value = value === 'false' ? false : value;
	options[ key ] = value;
		if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
		changeLayoutMode( $this, options );
	} else {
		// otherwise, apply new options
		$container.isotope( options );
	}    
	return false;
	});

});


// Vertical Tabs
    $(document).ready(function($) {
	$("#verticalTabs").verticalTabs().show();
    });


// Twitterfeed
	$(document).ready(function () {
		$('.tweet').tweet({
		username: "envato",
		modpath: 'tfeed/',
		count: 1,
		loading_text: 'loading twitter feed...',
		});
	});

		jQuery(function(){

// slider
$("#sliderRange")
.slider({
    range: true,
    min: 240,
    max: 360,
    step: 1,
    values: [250, 350],
    slide: function(event, ui) {
        var price1 = ui.values[0];
        var price2 = ui.values[1];
        $("#price1")
        .val("\u20ac" + price1);
        $("#price2")
        .val("\u20ac" + price2);
    }
});
$('#price1')
.bind('keyup', function() {
    var from = $(this)
    .val();
    var to = $('#price2')
    .val();
    $('#sliderRange')
    .slider('option', 'values', [from, to]);
});
$('#price2')
.bind('keyup', function() {
    var from = $('#price1')
    .val();
    var to = $(this)
    .val();
    $('#sliderRange')
    .slider('option', 'values', [from, to]);
});

});
