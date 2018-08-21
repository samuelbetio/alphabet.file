// <![CDATA[
$(function() {

  // Slider
  $('#coin-slider').coinslider({width:960,height:360,opacity:1});

  // Radius Box
  //$('a.com, a.rm, img.fl, .menu_nav ul, .menu_nav ul li a').css({"border-radius":"6px", "-moz-border-radius":"6px", "-webkit-border-radius":"6px"});
  $('div.img a.com').css({"border-bottom-left-radius":"6px", "border-bottom-right-radius":"6px", "-moz-border-radius-bottomleft":"6px", "-moz-border-radius-bottomright":"6px", "-webkit-border-bottom-left-radius":"6px", "-webkit-border-bottom-right-radius":"6px"});
  $('div.img img.fl').css({"border-top-left-radius":"6px", "border-top-right-radius":"6px", "-moz-border-radius-topleft":"6px", "-moz-border-radius-topright":"6px", "-webkit-border-top-left-radius":"6px", "-webkit-border-top-right-radius":"6px"});

});	

// Cufon
Cufon.replace('h1, h2, h3, h4, h5, h6, div.img a.com', { hover: true });

// ]]>