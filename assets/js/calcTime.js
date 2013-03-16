	var myHash = new Object();
	myHash['Monday'];
	myHash['Tuesday'];
	myHash['Wednesday'];
	myHash['Thursday'];
	myHash['Friday'];
	myHash['Saturday'];
	myHash['Sunday'];

	function calcHour(day) {
		var timeOut = parseInt(document.getElementById(day.concat("TimeOut")).value);
		var timeIn = parseInt(document.getElementById(day.concat("TimeIn")).value);
		var lunchOut = parseInt(document.getElementById(day.concat("LunchOut")).value);
		var lunchIn = parseInt(document.getElementById(day.concat("LunchIn")).value);
		var workTime = parseInt(timeOut - timeIn);
		var lunchTime = parseInt(lunchOut - lunchIn);

		if (workTime < 0 || lunchTime < 0 || workTime-lunchTime < 0 || lunchOut > timeOut) {
			myHash[day] = "Poop";
		}
		else if (lunchIn<0 || lunchOut<0) { //No lunch is selected
			myHash[day] = workTime;
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