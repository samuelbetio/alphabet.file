"use strict"

var time = 0;
var interval;
var offset;
var milliseconds = "000";
var seconds = "0";
var minutes = "00";
var timeArray = [];
var formattedTime;
var finalTime;


var isOn = false;


function update() {
    time += delta();
    var formattedTime = timeFormatter(time);
    timer.innerHTML = formattedTime;
}

function delta() {
    var now = Date.now();
    var timePassed = now - offset;
    offset = now;
    return timePassed;
}

function timeFormatter(timeInMilliseconds){
	let timeString = timeInMilliseconds.toString();
	if(timeString.length <= 3){
		var seconds = "0";
		var milliseconds = "000";
		var minutes = "00";
		milliseconds = timeString
	}
	
	if(timeString.length == 4){
		var seconds = "0";
		var minutes = "00";
		var timeArray = timeString.split( "" );
		milliseconds = timeArray[1] + timeArray[2] + timeArray[3];
		seconds = timeArray[0];
	}
	
	if(timeString.length == 5){
		var seconds = "0";
		var minutes = "00";
		var timeArray = timeString.split( "" );
		milliseconds = timeArray[2] + timeArray[3] + timeArray[4];
		seconds = timeArray[0] + timeArray[1];
	}
	
	if(timeString.length == 6){
		var seconds = "0";
		var minutes = "00";
		var timeArray = timeString.split( "" );
		milliseconds = timeArray[3] + timeArray[4] + timeArray[5];
		seconds = timeArray[0] + timeArray[1] + timeArray[2];
	}
	
	if(timeString.length == 7){
		var seconds = "0";
		var minutes = "00";
		var timeArray = timeString.split( "" );
		milliseconds = timeArray[4] + timeArray[5] + timeArray[6];
		seconds = timeArray[0] + timeArray[1] + timeArray[2] + timeArray[3];
	}
	
	if(timeInMilliseconds / 60000 > 1){
		minutes = "01";
	}
	
	return seconds + "." + milliseconds;
}

function stop(){
    if (isOn) {
        clearInterval(interval);
        interval = null;
        isOn = false;
	finalTime = time;
    }
}

function reset() {
}

function start() {
    if (!isOn) {
        interval = setInterval(update, 10);
        offset = Date.now();
        isOn = true;
    }
}

function deleteTime(time){
	//get bookmarks
	var timeSaves = JSON.parse(localStorage.getItem("timeSaves"));
	//loop through bookmarks
	for(var i =0;i < timeSaves.length;i++){
		if(timeSaves[i].timeToBeSaved == time){
			//remove from array
			timeSaves.splice(i, 1);
		}
	}
	localStorage.setItem("timeSaves", JSON.stringify(timeSaves));
	
	//refetch bookmarks
	getTimes();
}

function save(){
	var currentTime = finalTime;
	var timeSave = {
		timeToBeSaved: currentTime
	}
	
	//test if bookmarks is null
	if(localStorage.getItem("timeSaves") === null){
		console.log("hi");
		//Init array
		var timeSaves = [];
		//add to array
		timeSaves.push(timeSave);
		//Set to LocalStorage
		localStorage.setItem("timeSaves", JSON.stringify(timeSaves));
	} else{
		//get bookmarks from localStorage
		var timeSaves = JSON.parse(localStorage.getItem("timeSaves"));
		//add bookmark to array
		timeSaves.push(timeSave);
		//reset to local storage
		localStorage.setItem("timeSaves", JSON.stringify(timeSaves));
	}
	
}

function getTimes(){
	//set to local storage
	var timeSaves = JSON.parse(localStorage.getItem("timeSaves"));
	
	//get output id
	var timesResults = document.getElementById("timerTimes");
	
	//build output
	timesResults.innerHTML = "";
	
	for(var i = 0; i < timeSaves.length; i++){
		var timeOutput = timeSaves[i].timeToBeSaved;
		
		timesResults.innerHTML += '<div class="well well-lg">'+
								     '<h3>'+timeFormatter(timeOutput)+
		                                                     '<a onclick="deleteTime(\''+timeSaves[i].timeToBeSaved+'\')" class="btn btn-danger" href="#">delete</a>'+
		                                                     '</h3>'+
		                                                     '</div>';
	}
}