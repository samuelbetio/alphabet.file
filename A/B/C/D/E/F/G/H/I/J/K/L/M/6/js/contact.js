$(document).ready(function(){

$('#map_addresses').gMap({
	address: "Estadio San Martin de Porres",
	zoom: 15,
	arrowStyle: 2,
	controls: {
       panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: true,
        overviewMapControl: false
    },

		markers:[
		{
			address: "Estadio San Martin de Porres",
			popup: false
		}
		]
	});
	});