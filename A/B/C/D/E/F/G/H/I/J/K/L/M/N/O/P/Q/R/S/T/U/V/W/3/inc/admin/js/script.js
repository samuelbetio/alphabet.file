( function( $ ) {
	// Add Make Plus message
		/*upgrade = $('<a class="buy-pro"></a>')
			.attr('href', 'http://www.dinozoom.com/?add-to-cart=33')
			.attr('target', '_blank')
			.text(personalportfolio_upgrade.message)
		;
		$('.preview-notice').append(upgrade);
		// Remove accordion click event
		$('.buy-pro').on('click', function(e) {
			e.stopPropagation();
		});*/
$(document).ready(function($){

	//$('#accordion-section-pro .accordion-section-content').show();
	//$('#accordion-section-pro').addClass("open");
	
	// Services Section: Preview Selected Icon
    $('#accordion-section-services select').on('change', function(e){
		var optionSelected = $(this).find("option:selected").val();
	 	$(this).parent().parent().find('i.fa').hide();
		$(this).before("<i class='dinozoom fa-5x fa "+optionSelected+"'></i>");
    });
	// Social Media Section: Preview Selected Icon
    $('#accordion-section-social-media select').on('change', function(e){
		var optionSelected = $(this).find("option:selected").val();
	 	$(this).parent().parent().find('i.fa').hide();
		$(this).before("<i class='dinozoom fa-5x fa "+optionSelected+"'></i>");
    });

});


//
} )( jQuery );