var stream = require('stream');
var util = require('util');
util.inherits(Reader, stream.Readable);
util.inherits(Writer, stream.Writable);

function Reader(opt) {
	stream.Readable.call(this, opt);
	this._index = 1;
}

// in a Read stream, 'this' is the thing you are reading
Reader.prototype._read = function(size) {
	var i = this._index++;
	if(i > 10){ // once you've read more than 10, push null to stop
		this.push(null);
	}
	else{ // otherwise, push the current index (probably a character)
		this.push("Item " + i.toString());
	}
};




function Writer(opt){
	stream.Writable.call(this, opt);
	this._index = 1;
}

Writer.prototype._write = function(data, encoding, callback){
	console.log( "writing: " + data.toString());
	callback();
};


var r = new Reader();
var w = new Writer();

// .on("end" ...) is built in
r.on("end", function(){
	console.log("reader: I am done reading :)");
})

r.pipe(w);
