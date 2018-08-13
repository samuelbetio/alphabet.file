var timer = document.getElementById("timer");
var toggleBtn = document.getElementById("toggle");
var resetBtn = document.getElementById("reset");
var saveBtn = document.getElementById("save");
var showBtn = document.getElementById("show");
var showingS = false;

toggleBtn.addEventListener("click", function(){
	if (isOn){
		stop();
		save();
	  getTimes();
		generateScramble();
		toggle.innerHTML = "start";
	} else{
	  timer.innerHTML = "0.000";
	  time = 0;
		start();
		toggle.innerHTML = "stop";
	}
});

while(isOn){
	update();
}

showBtn.addEventListener("click", function(){
	if(showingS === false){
		scrambleOutput.style.display = "inline";
		console.log("hi" + showingS)
		showingS = true;
	} else{
		scrambleOutput.style.display = "none";
		showingS = false;
	}
	
});

/*resetBtn.addEventListener("click", function(){
	timer.innerHTML = "0.000";
	time = 0;
});*/

/*saveBtn.addEventListener("click", function(){
	save();
	getTimes();
});*/
