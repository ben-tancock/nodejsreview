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
util.inherits(MyWritableStream, stream.Writable);

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
	
}







