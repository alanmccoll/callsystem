

function getTime() { // get posted time from python server
	$.ajax({
	type: 'GET',
	url: 'http://56.85.210.217:5000/time',
	dataType: 'text',
	success: function(data) {
		response = data;
		// console.log(response);
        document.getElementById("clock-summary").innerText = response;
		
		}
	});
}

// function get_tour_two_summary() {
//     $.ajax({
//         type: 'GET',
//         url: 'http://56.85.210.217:5000/calls_summary',
//         contentType: "application/json",
//         dataType: 'json',
//         success: function(data) {           
//             $.each(data, function(mach, start_time){
//                 let li = document.createElement("li");
//                 li.classList.add("summary-li");
//                 let d1 = document.createTextNode("Machine " + mach +  " had a call at " + start_time);
//                 li.appendChild(d1);
//                 document.getElementById('summary').appendChild(li)
//             })
// 		}
						
// 	})
// }

$(document).ready(function(){
	setInterval(getTime,1000);
	});

// $(document).ready(function(){
//     setInterval(get_tour_two_summary,5000);
//     });


