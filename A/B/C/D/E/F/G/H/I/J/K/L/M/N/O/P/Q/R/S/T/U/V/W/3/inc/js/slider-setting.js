/**
 * Slider Setting
 * Contains all the slider settings for the featured post/page slider.
 * Dinozoom.com
 */
jQuery(window).load(function() {
jQuery('.slider-cycle').cycle({ 
	fx:            		dinozoom.effect,
	pager:  			'#controllers',
	activePagerClass: 	'active',
	next:				'#next-slide',
	prev:				'#prev-slide',
	timeout:       		dinozoom.timeout,
	speed:         		dinozoom.speed,
	pause:         		1,
	pauseOnPagerHover: 	1,
	width: 				'100%',
	containerResize: 	0,
	fit:           		1,
	after: 				function ()	{
									jQuery(this).parent().css("height", jQuery(this).height());
								},
   cleartypeNoBg: 		true

});
});