jQuery(function($){         
    
    var twitterSlider = function(){      
        $('.tweets-list ul').addClass('slides');
        $('.tweets-list').flexslider({
            animation: "fade",
            slideshowSpeed: 5 * 1000,
            animationDuration: 700,
            directionNav: false,             
            controlNav: false,             
            keyboardNav: false
        });
    };
    
    
    $('#twitter-slider .tweets-list').tweetable({
        username: 'YIW',
        items: 3,
        time: false,
        loaded: twitterSlider
    });
    
    $( document ).ready( function() {
        var rightWidth = $( '.topbar-right' ).width() + $( '#cart' ).width();
        
        $( '#twitter-slider' ).css( {'max-width': ( 940 - 40 - rightWidth ) + 'px', 'width':'100%'} );  
    });  
});