/*
 * ACCESSING THE FILE SYSTEM IN NODE.JS -------------------------
 * 
 * for all file system calls (in this chapter), you need to have loaded the fs module:
 */

var fs = require('fs');

// SYNCHRONOUS VS ASYNCHRONOUS FILE SYSTEM CALLS
/* the fs module in node.js makes almost all functionality available in two forms: synchronous or asynchronous
 *  e.g. there is asynchronous write() and synchronous writeSync()
 *  Synchronous file system calls block until the call compoletes and then control is released back to the thread
 *  This can cause severe performance issues in node.js if synchronous calls block the main event thread or there are
 *  too many of the background thread pool threads. Therefore, synchronous file system calls should be limited when possible.
 *  
 *  Asynchronous calls are placed on the event queue to be run later. This allows the calls
 *  to fit inot the node.js event model; however, this can be tricky when executing your code because the calling thread
 *  continues to run before the asynchronous call gets picked up by the event loop.
 *  
 *  The functionality of sync vs async file system calls is the same, except async calls require a parameter at the end, the callback function.
 *  
 *  Async calls require a callback function as an extra parameter. The callback is executed when the fs request completes, and typically
 *  contains an error as its first parameter.
 *  
 *  Exceptions are automatically handled by the asynchronous calls, and an error objects is passed as the first parameter if an exception occurs.
 *  Exceptions in synchronous calls must be handled by your own  try/catch block of code.
 *  
 *  Synchronous calls are run immediately, and execution does not return to the current thread until they are complete. 
*/

// OPENING AND CLOSING FILES
/*
 * Node provides sync and async methods for opening files. Once a file is opened you can read or write data to/from it.
 * To open files in node.js use the following statements for async or sync:
 */

// fs.open(path, flags, [mode], callback);
// notice the err and fd parameter in the callback. the fd is the file descriptor that you can use to read or write to the file.
fs.open('../openthis.txt', 'w', function(err, fd){ // the [mode] parameter is optional
	if(!err){
		fs.close(fd, function(err){
			console.log("closing openthis.txt :^)))");
		});
	}
	console.log("testing open");
});
// the above code will create a file called 'openthis.txt' in the folder above the src folder if it isn't there.
// once the file is created, running this code again will throw an error... sometimes. we'll figure out why later I guess.

// fs.openSync(path, flags, [mode]);

// the path is the path of the file
// the flags param specifies what mode to open the file in (read, write, append, etc.)
// the mode parameter sets the file access mode and defaults to 0666, which is readable and writable

// WRITING FILES
/* the fs module provides 4 different ways to write to files
 * 
 * write data to a file in a single call 
 * write chunks using synchronous writes
 * " using asynchronous writes
 * stream writes through a writable stream
 * 
 * The simplest method is to use one of the writeFile() methods
 */

var config = {
		maxFiles: 20,
		maxConnections: 15,
		rootPath: "/webroot"
};

var configTxt = JSON.stringify(config);
var options = {encoding: 'utf8', flag: 'w'};
fs.writeFile('config.txt', configTxt, options, function(err){
	if(err){
		console.log("config write failed");
	}
	else{
		console.log("config saved");
	}
});

// SYNHCRONOUS FILE WRITING ----------------------------------------

var veggieTray = ['carrots', 'celery', 'olives'];
fd = fs.openSync('veggie.txt', 'w');
while(veggieTray.length){
	veggie = veggieTray.pop() + " ";
	var bytes = fs.writeSync(fd, veggie, null, null);
	console.log("Wrote %s %d bytes", veggie, bytes);
}

fs.closeSync(fd);


// ASYNCHRONOUS FILE WRITING ---------------------------------------
/* you need to be careful when performing multiple asynchronous write requests on the same file, since you cannot guarantee 
 * what order they will be executed in unless you wait for the first write callback before executing the next. */

//var fs = require('fs');
var fruitBowl = ['apple', 'orange', 'banana', 'grapes'];

function writeFruit(fd){
	if(fruitBowl.length){
		var fruit = fruitBowl.pop() + " ";
		fs.write(fd, fruit, null, null, function(err, bytes){
			if (err){
				console.log("File Write Failed");
				fs.close(fd);
			}
			else{
				console.log("Wrote: %s %d bytes", fruit, bytes);
				writeFruit(fd);
			}
		});
	} else{
		// fs.close requires a callback :) book didn't mention it :) I am not mad :)))
		fs.close(fd, function(){
			console.log("closing file ;^)");
		});
	}
}

fs.open('fruit.txt', 'w', function(err, fd){
	if(err){
		fs.close(fd, function(){
			console.log("closing file ;^)");
		});
	}
	writeFruit(fd);
});

// STREAMING FILE WRITING -----------------------------------------------------------
/*
 * one of the best methods to use when writing large amounts of data toa  file is the streaming method
 * 
 * this method opens the file as a writable stream. writable streams can be linked to readbale streams 
 * using the pipe() method, which makes it easy tow rite data from a  readable stream source such as an http request
 * 
 * to stream data to a file asynchronously, you first need to create a writable stream object:
 */

var options = {encoding: 'utf8', flag: 'w'};
var fileWriteStream = fs.createWriteStream("grains.txt", [options]);
var grains = ['wheat', 'rice', 'oats'];
fileWriteStream.on("close", function(){
	console.log("file closed");
});

while (grains.length){
	var data = grains.pop() + " ";
	fileWriteStream.write(data);
	console.log("Wrote: %s", data);
}

fileWriteStream.end();


// READING FILES ---------------------------------------

/* fs module provides 4 different ways to read files
 * 
 * read data in one large chunk
 * read chunks of data using synchronous writes
 * '' asynchronous writes
 * read streams through a readable stream
 */

// SIMPLE FILE READ

// fs.readFile(path, [options], callback)
// fs.readFileSync(path, [options])

var options = {encodig: 'utf8', flag: 'r'};
fs.readFile('config.txt', options, function(err, data){
	if(err){
		console.log("failed to open config file");
	}
	else{
		console.log("config loaded.");
		var config = JSON.parse(data);
		console.log("Max files: " + config.maxFiles);
		console.log("Max connections: " + config.maxConnections);
		console.log("Root path: " + config.rootPath);
	}
});


// SYNCHRONOUS FILE READING
// use readSync and openSync
// fs.readSync(fd, buffer, offset, length, position)

fd = fs.openSync('veggie.txt', 'r');
var veggies = "";
do{
	var buf = Buffer.alloc(5)
	buf.fill();
	var bytes = fs.readSync(fd, buf, null, 5);
	console.log("read %d bytes", bytes);
	veggies += buf.toString();
} while (bytes > 0);

fs.closeSync(fd);
console.log("Veg g (to get output shown) ies: " + veggies);



// ASYNCHRONOUS FILE READING --------------------------
/*
 * to read a file asynchronously, first open it using open() and then 
 * after the callback from the open request has executed, use read() to read data from the file.
 * 
 * fs.read(fd, buffer, offset, length, position, callback)
 * 		the callback argument must be a function that can accept 3 parameters: error, bytes, and buffer.
 * 		bytes specifies the number of bytes read, and buffer is the buffer with the data populated from the read.
 */

function readFruit(fd, fruits){
	var buf = Buffer.alloc(5);
	buf.fill();
	fs.read(fd, buf, 0, 5, null, function(err, bytes, data){
		if (bytes > 0){
			console.log("read %d bytes", bytes);
			fruits += data;
			readFruit(fd, fruits);
		}
		else{
			fs.close(fd, function(err){
				console.log("closing fruit.txt :^))");
			});
			console.log("Fruits: %s", fruits);
		}
	});
}

fs.open('fruit.txt', 'r', function(err, fd){
	readFruit(fd, "");
});

// STREAMING FILE READING -----------------------------------------



