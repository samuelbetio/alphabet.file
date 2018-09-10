jQuery(function($){
    $('.home-testimonials ul').width( 920 - $('.home-testimonials .title').outerWidth() - 20 );
    $('.home-testimonials ul').cycle({
        fx: 'scrollHorz',
        speed: 600,
        timeout: 8000            });
});