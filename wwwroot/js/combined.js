

// array to keep track of machines which have calls
var machineCalls = {};	
let a; 
let count = 1;

/*svg documents are refernced by a variable nameed a,b,c, etc
a = letter_flats
b = apbs_spss
c = 
*/
let svgObject;
window.onload = () => {
	console.log("Document is loaded");
    // Get the Object by ID
	if (document.querySelector("#east_plant")) {	
		svgObject = document.querySelector("#east_plant");
		console.log("The svg is ", svgObject);
	}
	if (document.querySelector("#west_plant")) {	
		svgObject = document.querySelector("#west_plant");
		console.log("The svg is ", svgObject);
	}
}


function fillItemRed(id){ // Red Alert
	
	if (svgObject.getElementById(id)) {	
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#ff0000; stroke:#fff; stroke-width:.02em;");
		svgItem.setAttribute("class", "blink");
	}
}
	
function fillItemDBCS(id){ //normal DB color
	
	if (svgObject.getElementById(id)) {	
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#d4aa00");
		svgItem.setAttribute("class", "normal-dbcs");
	}
}

function fillItemAFSM(id){ //Normal AFSM color (clear)
	if (svgObject.getElementById(id)) {	
		// get the inner element by id
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#cd87de31; stroke:#fffdfd; stroke-width:0.3px;");
		svgItem.setAttribute("class", "normal-afsm");
	}
}

function fillItemAPBS(id){ //Normal AFSM color (clear)
	if (svgObject.getElementById(id)) {	
		// get the inner element by id
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#cd87de31; stroke:#fffdfd; stroke-width:0.3px;");
		svgItem.setAttribute("class", "normal-apbs");
	}
}

function fillItemHSTS(id){ //Normal AFSM color (clear)
	if (svgObject.getElementById(id)) {	
		// get the inner element by id
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#cd87de31; stroke:#fffdfd; stroke-width:0.3px;");
		svgItem.setAttribute("class", "normal-hsts");
	}
}

function fillItemHOPS(id){ //Normal AFSM color (clear)
	if (svgObject.getElementById(id)) {	
		// get the inner element by id
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#cd87de31; stroke:#fffdfd; stroke-width:0.3px;");
		svgItem.setAttribute("class", "normal-hops");
	}
}

function fillItemSPSS(id){ //Normal AFSM color (clear)
	if (svgObject.getElementById(id)) {	
		// get the inner element by id
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#cd87de31; stroke:#fffdfd; stroke-width:0.3px;");
		svgItem.setAttribute("class", "normal-spss");
	}
}

function fillItemUSS(id){ //Normal AFSM color (clear)
	if (svgObject.getElementById(id)) {	
		// get the inner element by id
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#cd87de31; stroke:#fffdfd; stroke-width:0.3px;");
		svgItem.setAttribute("class", "normal-uss");
	}
}

function fillItemAFCS(id){ //Normal AFSM color (clear)
	if (svgObject.getElementById(id)) {	
		// get the inner element by id
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#cd87de31; stroke:#fffdfd; stroke-width:0.3px;");
		svgItem.setAttribute("class", "normal-afcs");
	}
}

function fillItemDIOSS(id){ //Normal AFSM color (clear)
	if (svgObject.getElementById(id)) {	
		// get the inner element by id
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#cd87de31; stroke:#fffdfd; stroke-width:0.3px;");
		svgItem.setAttribute("class", "normal-dioss");
	}
}

function fillItemCIOSS(id){ //Normal AFSM color (clear)
	if (svgObject.getElementById(id)) {	
		// get the inner element by id
		svgItem = svgObject.getElementById(id);
		//svgItem.setAttribute("style", "fill:#cd87de31; stroke:#fffdfd; stroke-width:0.3px;");
		svgItem.setAttribute("class", "normal-cioss");
	}
}

$(document).ready(function(){
	setInterval(getTime,10000);
	});

$(document).ready(function(){
	setInterval(getDBCalls,2000);
	});
   
function getTime() { // get posted time from python server
	$.ajax({
	type: 'GET',
	url: 'http://56.85.210.217:5250/time',
	dataType: 'text',
	success: function(data,status) {
		response = data;
		//console.log(status);
		// console.log(response);
		if (document.getElementById("clock-east")) {
			document.getElementById("clock-east").innerText = response;
			console.log("Wrote the East Time");
		}
		if (document.getElementById("clock-west")) {
			document.getElementById("clock-west").innerText = response;
		}
		
		}
	});
}

// function getDBCalls(){ //get call and maint state from url
// 	$.getJSON('/mqtt/callstatus', (data) => {
// 		console.log(data);
// 	  });
function getDBCalls(){ //get call and maint state from url	
	$.ajax({
	type: 'GET',
	url: 'http://56.85.210.217:5250/mqtt/callstatus',
	dataType: 'json', 
	
	success: function(data) {
		$.each(data, function(mach, state){
			console.log(data);
			// check call variable for state, send to function to color element
			if (state === 1) { //call				
				fillItemRed(mach);							
			} else {
				(state === 0) // off
				whichTypeMachine(mach);			
			}

			})
		}
						
	});
}
	// fun to determine what kind of machine in order to reset to proper color after call or maint
	function whichTypeMachine(mach) {
		count = 0;
		substrDB = 'DBCS';
		substrAFCS = 'AFCS';
		substrDIOSS = 'DIOSS';
		substrHOPS = 'HOPS';
		substrSPSS = 'SPSS';
		substrAPBS = 'APBS';
		substrHSTS = 'HSTS';
		substrUSS = 'USS';
		substrAFSM = 'AFSM';
		substrCIOSS = 'CIOSS';
		//console.log("The machine string is  " + mach);
		if (mach.includes(substrDB)) {
			//console.log("Calling function fillItemDBCS on value ", mach );
			fillItemDBCS(mach);
		} else if (mach.includes(substrAFSM)) {
			//console.log("Calling function fillItemAFSM on value ", mach );
			fillItemAFSM(mach);
		} else if (mach.includes(substrAPBS)) {
			//console.log("Calling function fillItemAPBS on value ", mach );
			fillItemAPBS(mach);
		} else if (mach.includes(substrHSTS)) {
			//console.log("Calling function fillItemHSTS on value ", mach );
			fillItemHSTS(mach);
		} else if (mach.includes(substrHOPS)) {
			//console.log("Calling function fillItemHOPS on value ", mach );
			fillItemHOPS(mach);
		} else if (mach.includes(substrSPSS)) {
			//console.log("Calling function fillItemSPSS on value ", mach );
			fillItemSPSS(mach);
		} else if (mach.includes(substrUSS)) {
			//console.log("Calling function fillItemUSS on value ", mach );
			fillItemUSS(mach);
		}
		  else if (mach.includes(substrDIOSS)) {
			//console.log("Calling function fillItemUSS on value ", mach );
			fillItemDIOSS(mach);
		}
		  else if (mach.includes(substrCIOSS)) {
			//console.log("Calling function fillItemUSS on value ", mach );
			fillItemCIOSS(mach);
		}
		  else if (mach.includes(substrAFCS)) {
			//console.log("Calling function fillItemUSS on value ", mach );
			fillItemAFCS(mach);
		}
} 
