
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

jQuery(document).ready(function($) {
  $('body').addClass("js");
  if ($(".ads").length > 0) {
    
    if ($(".flatline-icon .ads").length < 1) {
      //$("<a href='http://www.thepetedesign.com/flatline_icons' class='promo'><img src='../images/promo.jpg' alt='Free Flat Line Icon Webfont'></div>").prependTo(".ads");
      $("<a href='http://www.thepetedesign.com/flatui-startup' class='promo'><img src='../images/promo2.jpg' alt='Flat UI Startup Theme For Bootstrap 3'></div>").prependTo(".ads");
    }
    
    
    $(".ads").prepend("<div class='ad-header'><a href='#' class='close'>x</a></div>")
    $(".ads .ad-header .close").click(function(){
      $(this).closest(".ads").slideUp("slow", function() {
        $(this).remove();
        return false;
      });
    });
  }
  
  if (getUrlParameter('complete') == "true") {
    $(".flatline-icon p.credit").append("<div class='success-message message'>Thank you for buying my icons webfont. If you need any assistant, please don't hesitate to <a href='http://www.twitter.com/peachananr' target='_blank'>tweet me</a> any time.</div>");
  }
  
  if (getUrlParameter('complete') == "false") {
    $(".flatline-icon p.credit").append("<div class='error-message message'>You have canceled your purchase. If you wish to buy the icons, please try clicking the buy button again.</div>");
  }
  
});
