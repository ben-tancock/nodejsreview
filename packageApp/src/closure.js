
function logCar(logMsg, callback){
	process.nextTick(function(){
		callback(logMsg);
	});
}

var cars = ["Ferrari", "Porsche", "Bugatti"];

for (var idx in cars){
	var message = "Saw a " + cars[idx];
	logCar(message, function(){
		console.log("normal callback: " + message);
	});
}


/* 
 * adding a closure wrapper function allows the 
 * asynchronous callback to access necessary variables
 * the loop below implements a wrapper function that is passed message as the msg
 * parameter and that msg values sticks with the callback.
 * Thus the closure displays the correct message 
*/
for (var idx in cars){
	var message = "Saw a " + cars[idx];
	(function(msg){
		logCar(msg, function(){
			console.log("closure callback: " + msg);
		});
	}) (message);
}

