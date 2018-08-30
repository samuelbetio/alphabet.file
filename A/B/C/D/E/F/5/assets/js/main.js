"use strict";
jQuery( document ).ready( function ( $ ) {

//for Preloader

    $( window ).load( function () {
        $( "#loading" ).fadeOut( 500 );
    } );


    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $( '#navbar-menu' ).find( 'a[href*=#]:not([href=#])' ).click( function () {
        if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
            var target = $( this.hash );
            target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
            if ( target.length ) {
                $( 'html,body' ).animate( {
                    scrollTop: ( target.offset().top - 80 )
                }, 1000 );
                if ( $( '.navbar-toggle' ).css( 'display' ) != 'none' ) {
                    $( this ).parents( '.container' ).find( ".navbar-toggle" ).trigger( "click" );
                }
                return false;
            }
        }
    } );



    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW( {
        mobile: false // trigger animations on mobile devices (default is true)
    } );
    wow.init();

// magnificPopup

    $( '.popup-img' ).magnificPopup( {
        type: 'image',
        gallery: {
            enabled: true
        }
    } );

    $( '.video-link' ).magnificPopup( {
        type: 'iframe'
    } );



// slick slider active Home Page Tow
    $( ".service_slid_item" ).slick( {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: "<i class='icon icon-chevron-left nextprevleft'></i>",
        nextArrow: "<i class='icon icon-chevron-right nextprevright'></i>",
        autoplay: true,
        autoplaySpeed: 2000
    } );


// slick slider active Home Page Tow
    $( ".choose_slide" ).slick( {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: "<i class='icon icon-chevron-left nextprevleft'></i>",
        nextArrow: "<i class='icon icon-chevron-right nextprevright'></i>",
        autoplay: true,
        autoplaySpeed: 2000
    } );




//---------------------------------------------
// Counter 
//---------------------------------------------

    $( '.statistic-counter' ).counterUp( {
        delay: 10,
        time: 2000
    } );

//---------------------------------------------
// Scroll Up 
//---------------------------------------------

    $( '.scrollup' ).click( function () {
        $( "html, body" ).animate( { scrollTop: 0 }, 1000 );
        return false;
    } );



//Team Skillbar active js

    jQuery( '.teamskillbar' ).each( function () {
        jQuery( this ).find( '.teamskillbar-bar' ).animate( {
            width: jQuery( this ).attr( 'data-percent' )
        }, 6000 );
    } );


// scrool Down

//$('.scrooldown a').bind('click', function () {
//    $('html , body').stop().animate({
//        scrollTop: $($(this).attr('href')).offset().top - 160
//    }, 1500, 'easeInOutExpo');
//    event.preventDefault();
//});

    //End

} );





$( function () {
    // Initialize Isotope
    var $notes = $( ".grid" ).isotope( {
        itemSelector: ".grid-item"
    } );

    // On filter button click
    $( ".filters-button-group .btn" ).on( "click", function ( e ) {
        var $this = $( this );

        // Prevent default behaviour
        e.preventDefault();

        // Toggle the active class on the correct button
        $( ".filters-button-group .btn" ).removeClass( "is-checked" );
        $this.addClass( "is-checked" );

        // Get the filter data attribute from the button
        $notes.isotope( {
            filter: $this.attr( "data-filter" )
        } );

    } );


    $( '.mouse-scroll' ).bind( 'click', function () {
        $( 'html , body' ).stop().animate( {
            scrollTop: $( $( this ).attr( 'href' ) ).offset().top - 60
        }, 1500, 'easeInOutExpo' );
        event.preventDefault();
    } );



} );



