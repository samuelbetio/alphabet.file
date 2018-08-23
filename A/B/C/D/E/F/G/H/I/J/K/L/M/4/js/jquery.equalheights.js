$(function(){
	$(".minheight1").each(function(){
		$(this).contents().wrapAll("<div class='box_inner'></div>");
	})
})
$(window).bind("resize",height_handler).bind("load",height_handler)
function height_handler(){
	//if (window.matchMedia("screen and (min-width: 768px)").matches) {

	if( $(window).width()>=752 ){
		$(".minheight1").equalHeights()
	}else{
		$(".minheight1").css({'height':'auto'});
	}


}
(function($){
	$.fn.equalHeights=function(minHeight,maxHeight){
		tallest=(minHeight)?minHeight:0;this.each(function(){
			if($(">.box_inner",this).outerHeight()>=tallest){
				tallest=$(">.box_inner",this).outerHeight();
			}
			});
			if((maxHeight)&&tallest>maxHeight)tallest=maxHeight;
			return this.each(function(){
				$(this).height(tallest);
			}
		)}
	}
)(jQuery)