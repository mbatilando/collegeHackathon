var x = 'foo';
$(document).ready(function() {
	$('#main').fadeIn(600);
	$("#alert").hide();
	$("#follow").click(function() {
		$("#alert").show();
	});
	});



///////////////////////////////////
////  LOGIN FUNCTIONS////
/////////////////////////////////
	




$("#modalConfirm").click(function() {
	url = "http://bkbdtimesheet-backend.herokuapp.com/submit";
	jsonSubmit(url);
	return false;
});

function jsonLogin(url, username, password) {
	$.ajax({
		type: 'POST',
		url: url,
		crossDomain: true,
		data: {username: username, password: password},
		contentType: "application/json",
		dataType: "jsonp",
		success: function(data) {return successLogin();},
		error: function(err) { alert('error occurred on request');}
	});
}
	
function successLogin() {
	$('#timesheet').hide().load('timesheet.html').fadeIn(600);
	$('#loginContainer').remove();
	$('#replace').hide().load('profile.html').fadeIn(600);
}

///////////////////////////////////
////  SUBMIT FUNCTIONS////
/////////////////////////////////

function jsonSubmit(url) {
	myHash = {};
	days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	for (var i=0; i < days.length; i++){
		var dayTimeIn = days[i].concat("TimeIn"); 
		myHash[dayTimeIn] = $('#'.concat(dayTimeIn)).val();
		var dayLunchIn = days[i].concat("LunchIn");
		myHash[dayLunchIn] = $('#'.concat(dayLunchIn)).val();
		var dayLunchOut = days[i].concat("LunchOut");
		myHash[dayLunchOut] = $('#'.concat(dayLunchOut)).val();
		var dayTimeOut = days[i].concat("TimeOut");
		myHash[dayTimeOut] = $('#'.concat(dayTimeOut)).val();
	}
	
	myHash['manager'] = $('#manager').val();
	myHash['weekof'] = $('#datepicker').val();
	myHash['intern_name'] = $('#intern_name').val();
	myHash['cc'] = $('#cc').val();
	email = $('#cc').val();
	//error-checking
	if (!(validEmail(email))) {
		alert('Error: '+email +' is an invalid e-mail address.'+ + '\nPlease try again.');
	} 
	else if  (document.getElementById('totWeek').textContent == '') {
		alert('Error: worked zero hours this week.'+ '\nPlease try again.');
	} 
	else if (document.getElementById('totWeek').textContent == 'Error') {
		alert('Error: invalid lunch or work time.'+ '\nPlease try again.');
	}
	else {
		$.ajax({
			type: 'GET',
			url: url,
			crossDomain: true,
			data: myHash,
			contentType: "application/json",
			dataType: "jsonp",
			success: function(data) {return successSubmit();},
			error: function(err) { alert('error occurred on request');}
		});
	}
}

function successSubmit() {
	$('#replace').fadeOut().hide().load('submit.html').fadeIn(600);
	$('#loginContainer').remove();
	$('#timesheet').fadeOut().hide();
}

/*
$('form').submit(function() {
	if (document.getElementById('totWeek').textContent != 'Error' && document.getElementById('totWeek').textContent != ''&& validEmail(document.getElementById('cc').textContent)) {
		var currentForm = this;
		bootbox.confirm("Are you sure?", function(result) {
		if (result) {
			currentForm.submit();
			}
		});
	}
});
*/

////////////////////////////////
// TIMESHEET FUNCTIONS//
///////////////////////////////
var myHash = new Object();
myHash['Monday'];
myHash['Tuesday'];
myHash['Wednesday'];
myHash['Thursday'];
myHash['Friday'];
myHash['Saturday'];
myHash['Sunday'];

function calcHour(day) {
	var timeOut = parseFloat(document.getElementById(day.concat("TimeOut")).value);
	var timeIn = parseFloat(document.getElementById(day.concat("TimeIn")).value);
	var lunchOut = parseFloat(document.getElementById(day.concat("LunchOut")).value);
	var lunchIn = parseFloat(document.getElementById(day.concat("LunchIn")).value);
	var workTime = parseFloat(timeOut - timeIn);
	var lunchTime = parseFloat(lunchOut - lunchIn);


	if (workTime < 0 || lunchTime < 0 || workTime-lunchTime < 0 || lunchOut > timeOut || (lunchTime > 0 && lunchOut > timeOut + 2 )) {
		myHash[day] = "Error";
	}
	else if (lunchIn<0 && lunchOut<0) { //No lunch is selected
		myHash[day] = workTime;		
	}	
	else if (lunchIn<0 || lunchOut<0) { //lunchIn or lunchOut is set to noLunch but not both
		myHash[day] = "Error";
	} 

	else {
		myHash[day] = workTime - lunchTime;
	}
}

function calcTotal() {
	var total = 0;
	for (var day in myHash) {
		if (typeof myHash[day] === "number") {
			total += myHash[day];
		}
		else {
		 total = "Error";
		 break;
		}
	}
	return total;
}

function updateHash(day) {
	var totDay = "tot".concat(day);
	calcHour(day);
	document.getElementById(totDay).value=myHash[day];
	document.getElementById('totWeek').value=calcTotal();
}

function validEmail(email) {
	var valid= /[^@]+@[^@]+\.[^@]+/; //something@something.something
	return valid.test(email);
}
