// USING THE STREAM MODULE TO STREAM DATA
// the purpose of streams is to provide a common mechanism to transfer data from one location to another. 
// they also expose events, such as when data is available to read, when an error occurs, etc.

// READABLE STREAMS --------------------
// readable streams provide a mechanism to easily read data coming into your application from another source (e.g. http responses/requests, fs read streams, tcp socekts, child processes stdout and stderr)
// readable streams provide the read([size]) method to read data where size specifies the number of bytes to read from the stream. read() can return a String, buffer , or null


// to implement your own custom readable stream object, you need to first inherit the functionality of Readable streams. The simplest way to do that is to use the util module's inherits() method
var stream = require('stream');
var util = require('util');

util.inherits(MyReadableStream, stream.Readable);

// then you create an instance of the object call:
//stream.Readable.call(this, opt);

// you also need to implement a _read() method that calls push() to output the data from the readable object.
// the push() call should push either a String, Buffer, or null

function MyReadableStream(opt) {
	stream.Readable.call(this, opt);
	this.quotes = ["yes", "no", "maybe"];
	this._index = 0;
}

MyReadableStream.prototype._read = function() {
	if(this._index > this.quotes.length){
		this.push(null);
	}
	else{
		this.push(this.quotes[this._index]);
		this._index+=1;
	}
};

var r = new MyReadableStream();
console.log("Direct read: " + r.read().toString());
r.on('data', function(data){
	console.log("Callback read: " + data.toString());
});

r.on('end', function(data){
	console.log("no more answers");
});

// WRITABLE STREAMS ------------------------------------------------
// writable streams are designed to provide a mechanism to write data into a form that can be easily consumed in another area of code. 
// some common examples are:
/* 
 * http requests
 * http responses
 * fs write streams
 * tcp sockets
 * child process stdin
*/

// writaable streams provide the write(chunk, [encoding]) method to write data into the stream, where chunk contains the data to write, encoding specifies the string encoding if necessary
/* writaable streams also expose the foloowing events:
 * drain: after a write() call returns false, the drain event is emitted to notify listener when it is okay to begin writing more data
 * finish: emitted when end() is called on the writable object; all data is flushed and no more data will be accepted
 * pipe: emitted when the pipe() method is called on a readable stream to add this writable as a destination
 * unpipe: emitted when the unpipe() 
 * 
 * To implement your own custom writable stream object, you have to inherit the functionality of writable streams.
 */

//var util = require('util');
util.inherits(Writer, stream.Writable);

function Writer(opt){
	stream.Writable.call(this, opt);
	this.data = new Array();
}

Writer.prototype._write = function(data, encoding, callback){
	this.data.push(data.toString('utf8'));
	console.log("Adding: " + data);
	callback();
};

var w = new Writer();
for (var i=1; i <= 5; i++){
	w.write("Item" + i, 'utf8');
}

w.end("ItemLast");
console.log(w.data);


//DUPLEX STREAMS -----------------------------------
/* A duplex stream combines readable and writable funcitonality
	A good example is a TCP socket connection. You can read and write from the socket conneciton once it has been created.
	To implement a duplex stream, like all the other streams, you must inherit its functionality.
*/

//var util = require('util');
//util.inherits(MyDuplexStream, stream.Duplex);

// then you create an instance of this object call:
//stream.Duplex.call(this, opt);

// the opt parameter when creating duplex streams accepts an object with the property 
// allowHalfOpen set to ttrue or false. If this option is true, then the readable side 
// stays open even after the writable side has ended and vice versa. If the option is set
// to false, ending the writable side also ends the readable side and vice versa

//when you implement a duplex stream, you need to implement both a _read(size) and a _write(data, encoding, callback)
//method when prototyping your duplex class

var stream = require('stream');
var util = require('util');
util.inherits(Duplexer, stream.Duplex);

function Duplexer(opt){
	stream.Duplex.call(this, opt);
	this.data = [];
}

Duplexer.prototype._read = function readItem(size) {
	var chunk = this.data.shift(); // get the first item in the array
	if (chunk == "stop"){
		this.push(null);
	}
	else{
		if(chunk){
			this.push(chunk);
		}
		else{
			setTimeout(readItem.bind(this), 500, size);
		}
	}
};



Duplexer.prototype._write = function(data, encoding, callback){
	this.data.push(data);
	
	// apparently you don't need a callback function anymore? uncommenting this line throws an error, which makes sense
	// I think it was throwing an error because the function wasn't always being called with a callback function.
	// So I made callback optional...
	if(callback){
		callback();
	}
};





var d = new Duplexer();
d.on('data', function(chunk){
	console.log('read: ', chunk.toString());
});

d.on('end', function(){
	console.log('Message Complete.');	
});

d._write("I think, ");
d._write("therefore ");
d._write("I am.");
d._write("Rene Descartes");
d._write("stop");


// TRANSFORM STREAMS -----------------------------
/*
	A Transform stream extends the Duplex stream but modifies the data between the Writable stream and the Readable stream.
	This can be useful when you need to modify data from one system to another. Some examples of transform streams can be:
	- zlib streams
	- crypto streams
	
	A major difference between duplex and transform streams is that you do not need to create _read and _write prototype methods. 
	These are provided as pass-through functions. Instead, you implement the _transform(chunk, encoding, callback) and _flush(callback)
	methods. The transform() method should accept the data from write() requests, modify it, and then push() out the modified data.
	
	The following transform stream accepts JSON strings, converts them to objects, and then emits a custom event named object that
	sends the object to any listeners. The _transform() function also modifies the object to include a handled property and then sends 
	a string form on.
*/

var stream = require('stream');
var util = require('util');
util.inherits(JSONObjectStream, stream.Transform);

function JSONObjectStream (opt) {
	stream.Transform.call(this, opt);
};

// just do this without the callback functions... we can figure this out later
JSONObjectStream.prototype._transform = function (data, encoding){
	object = data ? JSON.parse(data.toString()) : "";
	this.emit("object", object);
	object.handled = true;
	this.push(JSON.stringify(object));
};

JSONObjectStream.prototype._flush = function(cb){
	console.log("test flush");
	cb();
};

var tc = new JSONObjectStream();
tc.on("object", function(object){
	console.log("Name: %s", object.name);
	console.log("Color: %s", object.color);
});

tc.on("data", function(data){
	console.log("Data: %s", data.toString());
});

tc._write('{"name":"Carolinus", "color":"Green"}');
/*tc._write('{"name":"Solarius", "color":"Blue"}');
tc._write('{"name":"Lo Tae Zhao", "color":"Gold"}');
tc._write('{"name":"Ommadon", "color":"Red"}');*/








