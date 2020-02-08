var events = require('events');
function CarShow() {
	
	/* calls the constructor of the object you are inheriting from which allows EventEmitter
	 	code to initialize its portion of this object which is part of the inheritance process
	 	in JavaScript. 
	 	
	 	EventEmitter is the constructor of the function for the EventEmitter object.
	 	Since you need to call that constructor with the same this as your new 
	 	object, you must use either .call() or .apply() with that constructor in order
	 	to cause the correct this to be used.
	*/
	events.EventEmitter.call(this);
	this.seeCar = function(make){
		this.emit('sawCar', make);
	};
}

CarShow.prototype.__proto__ = events.EventEmitter.prototype;

var show = new CarShow();
function logCar(make){
	console.log("Saw a " + make);
}

function logColorCar(make, color){
	console.log("Saw a %s %s", color, make);
}


// A callback function is a function passed into another function as an argument, which
// is then invoked inside the outer function to complete some kind of routine or action

// normal callback function: on sawCar event, do logCar
show.on("sawCar", logCar);

// callback function where additional parameters are passed to the 
// callback function from the calling function
// on sawCar event, do logCar + more stuff / parameters
show.on("sawCar", function(make){
	var colors = ['red', 'blue', 'black'];
	var color = colors[Math.floor(Math.random()*3)];
	logColorCar(make, color);
});

// the point of this is: WE ARE CREATING ANONMYMOUS FUNCTIONS TO ADD ADDITIONAL 
// PARAMETERS NOT EMITTED BY THE EVENT

show.seeCar("Ferrari");
show.seeCar("Porsche");
show.seeCar("Bugatti");
show.seeCar("Lamborghini");
show.seeCar("Aston Martin");