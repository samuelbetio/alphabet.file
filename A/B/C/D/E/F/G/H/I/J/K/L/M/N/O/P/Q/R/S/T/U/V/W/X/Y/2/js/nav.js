var $imgStg = $("#img-stg"),
	$nav = $("#nav-item");

function creatNavDom (){
	var $li = $("<li></li>"),
	$box = $('<div><div>');
	$li.append("<span>");

	$li.addClass("nav-item");

	$box.empty();
	for(var i=0;i<$imgStg.length;i++){
		$li.attr("name",i);
		console.log(i);
		$box.append($li.clone());
	}
	//console.log($box.children());
	$nav.append($box.children());
};

creatNavDom ();