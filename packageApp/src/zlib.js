/*
 * When working with large systems or moving large amounts of data around, it is helpful to be able to compress and decompress data.
 * Node.js zlib model is there to help us with exactly that.
 * The compression methods supported by Zlib are:
 * 		- gzip/gunzip: standard gzip compression
 * 		- deflate/inflate: standard deflate compression algorithm based on huffman coding
 * 		- deflateRaw/inflateRaw:  deflate compression algorithm on raw buffer
 */

// COMPRESSING AND DECOMPRESSING BUFFERS
/*
 * all helper functions use same basic format: function(buffer, callback)
 * where function is the compression/decompression function, buffer is the target buffer to be compressed/decompressed,
 * and callback is the function executed after the compression/decompression occurs
 */

var zlib = require('zlib');
var input = '...............text...............';

zlib.deflate(input, function(err, buffer){
	if(!err){
		console.log("deflate %s: ", buffer.length, buffer.toString('base64'));
		zlib.inflate(buffer, function(err, buffer){
			if(!err){
				console.log("inflate (%s): ", buffer.length, buffer.toString());
			}
		});
		zlib.unzip(buffer, function(err, buffer){
			if(!err){
				console.log("unzip deflate (%s): ", buffer.length, buffer.toString());
			}
		});
	}
});

zlib.deflateRaw(input, function(err, buffer){
	if(!err){
		console.log("deflateRaw (%s): ", buffer.length, buffer.toString('base64'));
		zlib.inflateRaw(buffer, function(err, buffer){
			if(!err){
				console.log("inflateRaw (%s): ", buffer.length, buffer.toString());
			}
		});
	}
});

zlib.gzip(input, function(err, buffer){
	if(!err){
		console.log("gzip (%s): ", buffer.length, buffer.toString('base64'));
		
		zlib.gunzip(buffer, function(err, buffer){
			if(!err){
				console.log("gunzip (%s): ", buffer.length, buffer.toString());
			}
		});
		
		zlib.unzip(buffer, function(err, buffer){
			if(!err){
				console.log("unzip gzip (%s): ", buffer.length, buffer.toString());
			}
		});
	}
})


// COMPRESSING / DECOMPRESSING STREAMS:
/*
 * this is slightly different than with buffers
 * instead, we use the pipe() function to pipe data from one stream through the compression/decompression
 * object into another stream. This can apply to compressing any Readable streams into Writable streams. 
 * 
 * A good example of doing this is compressing the contents of a file using fs.ReadStream and fs.WriteStream.
 */

/*var zlib = require('zlib');
var gzip = zlib.createGzip();
var fs = require('fs');
var inFile = fs.createReadStream('zlib_file.js');
var outFile = fs.createWriteStream('zlib_file.gz');
inFile.pipe(gzip).pipe(outFile);
gzip.flush();
outFile.close();
var gunzip = zlib.createGunzip();
var inFile = fs.createReadStream('zlib_file.gz');
var outFile = fs.createWriteStream('zlib_file.unzipped');
inFile.pipe(gunzip).pipe(outFile);*/
