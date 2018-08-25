include("js/jquery.color.js");
include("js/jquery.backgroundpos.js");
include("js/jquery.easing.js");
include("js/googleMap.js");
include("js/superfish.js");
include("js/switcher.js");
include("js/forms.js");
include("js/MathUtils.js");
include("js/tms-0.4.1.js");

function include(url) {
    document.write('<script src="' + url + '"></script>');
}
var MSIE = false,
    content, defColor;

function addAllListeners() {
    var val1 = $('.readMore2').css('color');
    var val2 = $('.readMore2').css('backgroundColor');
    var val3 = $('.readMore2').css('textShadow');
    $('.readMore2').hover(
        function(){
        	$(this).css({'textShadow':'none'}).stop().animate({'color':val2,'backgroundColor':val1},350,'easeOutExpo');  
        },
        function(){
            $(this).css({'textShadow':val3}).stop().animate({'color':val1,'backgroundColor':val2},600,'easeOutCubic');  
        }
    );  
     var val4 = $('.readMore').css('color');
    $('.readMore').hover(
        function(){
        	$(this).stop().animate({'color':'#e1110a'},350,'easeOutExpo')
                    .children('span').stop().animate({'backgroundPosition':'left center'},350,'easeOutExpo');  
        },
        function(){
            $(this).stop().animate({'color':val4},600,'easeOutCubic')
                    .children('span').stop().animate({'backgroundPosition':'right center'},600,'easeOutCubic'); 
        }
    );
    $('.list3>li>a').prepend('<strong></strong>');
    if (!MSIE){
        var val5 = parseInt($('.list3>li>a>strong').css('width'));
        var val6 = parseInt($('.list3>li>a>strong').css('height'));
        $('.list3>li>a>strong').css({'width':0,'height':0,'left':val5*.5,'top':val6*.5,'opacity':0});
    } else {
        $('.list3>li>a>strong').css('display','none');
    }   
    $('.list3>li>a').hover(
        function(){
            if (!MSIE) {
                $(this).children('strong').stop().animate({'width':'164px','height':'100px','left':0,'top':0,'opacity':'1'},350,'easeOutExpo');  
            } else {
                $(this).children('strong').css('display','block');
            }
        },
        function(){
            if (!MSIE){
                $(this).children('strong').stop().animate({'width':'0','height':'0','left':val5*.5,'top':val6*.5,'opacity':'0'},600,'easeOutCubic'); 
            } else {
                $(this).children('strong').css('display','none');
            }
        }
    );
    $('.search').hover(
        function(){
        	$(this).stop().animate({'backgroundPosition':'right bottom'},250,'easeOutExpo');  
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'right top'},500,'easeOutCubic'); 
        }
    );  
}

$(document).ready(ON_READY);
function ON_READY() {
    /*SUPERFISH MENU*/   
    $('.menu #menu').superfish({
	   delay: 800,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
}

function ON_LOAD(){
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    $('.spinner').fadeOut();
    
    $('.slider')._TMS({
		show:0,
		pauseOnHover:false,
		duration:800,
		preset:'fadeFromCenter',
        easing: 'easeOutExpo',
		pagination: $('.pagin'),
		pagNums: false,
		slideshow: 8000,
		numStatus:false,
		banners:false,
		overflow:'hidden',
		waitBannerAnimation:false,
		progressBar:'<div class="progbar"></div>'
	});
    
    //content switch
    content = $('#content');
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'visibility':'hidden'});		
        },
        actFu:function(_){            
            if(_.curr){
                _.curr
                    .css({'top':'2000px','visibility':'visible'}).stop(true).show().animate({'top':'0px'},{duration:1000,easing:'easeInOutExpo'});
            }   
    		if(_.prev){
  		        _.prev
                    .show().stop(true).animate({'top':'-2000px'},{duration:600,easing:'easeInOutExpo',complete:function(){
                            if (_.prev){
                                _.prev.css({'visibility':'hidden'});
                            }
                        }
		              });
            }            
  		}
    });
    defColor = $('#menu>li>a').eq(0).css('color'); 
    var nav = $('.menu');
    nav.navs({
		useHash:true,
        defHash: '#!/page_home',
        hoverIn:function(li){
            $('>a', li).stop().animate({color: '#fff'},350,'easeOutExpo');
            $('>strong',li).stop().animate({'top':'0px'},400,'easeOutExpo');
            $('>span',li).stop().animate({'backgroundPosition':'center top'},400,'easeOutExpo');
        },
        hoverOut:function(li){
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('> a', li).stop().animate({color: defColor},500,'easeOutCubic');
                $('>strong',li).stop().animate({'top':'-100px'},700,'easeOutCubic');
                $('>span',li).stop().animate({'backgroundPosition':'center bottom'},400,'easeOutCubic');
            }
        }
    })
    .navs(function(n){	
   	    $('#content').tabs(n);
   	});
    
    setTimeout(function(){  $('body').css({'overflow':'visible'}); },300);    
    addAllListeners();
    
    $(window).trigger('resize');
}

$(window).resize(function (){
    if (content) content.stop().animate({'top':(windowH()-content.height()-25)*.5},500,'easeOutCubic');
});

function listen(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
        var r = elem.attachEvent("on"+evnt, func);
    return r;
    }
}
listen("load", window, ON_LOAD);