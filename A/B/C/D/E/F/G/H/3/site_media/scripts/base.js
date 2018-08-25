$(function(){
    // fix for target="_blank"
    $("a[@rel~='external']").click(function(){
	window.open($(this).attr("href"));
	return false;
    });
});

$(document).ready(function() {

    $('#submit_email').click(function(event) {
        if($('.honey').val()) {
     	    event.preventDefault();
	}
    });
});