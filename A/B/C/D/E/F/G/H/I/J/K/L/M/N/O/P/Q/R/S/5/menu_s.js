console.log("DDDDDDDDDDDDD");

var menuToggle = document.getElementById("3bars");
var showing = false;

menuToggle.addEventListener("click", function(){
	console.log("EEEEEEEEEEEEEEEEEEEEE");
	console.log(showing);
	if(showing === false){
		navcontent.style.display = "list-item";
		navbar.style.height = "205px";
		navbar.style.border = "1px solid #000";
		showing = true
	} else{
		navcontent.style.display = "none";
		navbar.style.height = "28px";
		showing = false;
	}
});