

$('.portfolio').masonry({
  // options
  itemSelector: '.col-md-4',
  percentPosition: true
});


$(window).load(function () {
	$(".loaded").fadeOut();
	$(".preloader").delay(1000).fadeOut("slow");
});
