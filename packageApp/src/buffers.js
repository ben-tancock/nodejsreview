// Creating buffers: 3 ways

// old way of doing it will throw an error
//var buff1 = new Buffer(256); // sizeinBytes
//var buff2 = new Buffer([0x6f, 0x63, 0x74, 0x65, 0x74, 0x73]);
//var buff3 = new Buffer("Some .Utf8 text \u00b6 \u30c6 \u20ac", 'utf8');

// new way of doing it (cool)
var buff1 = Buffer.alloc(256);
const buff2 = Buffer.from([0x6f, 0x63, 0x74, 0x65, 0x74, 0x73]);				
//var buff3 = Buffer.alloc("Some .Utf8 text \u00b6 \u30c6 \u20ac", 'utf8');		


// Writing to buffers -------------------------

buff1.fill(0); // writes the value to every byte in the buffer starting at the offset index

// buffer.write(string, <offset>, <length>, <encoding>)
// writes <length> number of bytes from the string starting at the <offset> index inside the buffer using the <encoding>
buff1.write("add some text");
//buff2.write("more text", 9, 9);
//buff3.write();

console.log(buff1.toString());
console.log(buff2.toString());

console.log(buff2.readInt8(0)); // decimal of 0x6f is 111
// there are like a gorillian other ways to read this stuff in node.js too

// note: buffer.from is not the same as buffer.write
var buf = Buffer.from("abc");
console.log(buf);



// READING FROM BUFFERS: -------------------------------------

//0x6f = 'o', etc.
console.log(buff2.toString('utf8'))


var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('base64');
console.log(decoder.write(buff2));

// DETERMINING BUFFER LENGTH -------------------------

// the length of a buffer can be determined by calling the .length property
console.log(buff1.length);

// To determine the byte length taht a string takes up in a buffer you cannot use the .length property.
// Instead you need to use the buffer.byteLength(string, [encoding])
// note that there is a difference between the string length and byte length of a buffer
console.log("UTF8 text \u00b6".length);
console.log(Buffer.byteLength("UTF8 text \u00b6", 'utf8'));
console.log(Buffer.from("UTF8 text \u00b6").length);

// the same string evaluates to 11 chars
// but because it contains a double-byte character the byteLength is 12. Also the Buffer.from length 
// evaluates to 12 because .length on a buffer returns the byte length

// COPYING BUFFERS ---------------------------------------------
// to copy string data from one buffer to the next, make sure that both buffers use the same encoding
// node.js provides the copy(targetBuffer, [targetStart], [sourceStart], [sourceIndex] method on buffer objects

var alphabet = Buffer.from("abcdefghijklmnopqrstuvwxyz");
var blank = Buffer.alloc(26);
blank.fill();
alphabet.copy(blank);
console.log(blank.toString());

// you can also index them directly (this only copies elements at index obvi)
var srcBuff = Buffer.alloc(128)
var destBuff = Buffer.alloc(128);
srcBuff.write("i am srcBuff");
destBuff[0] = srcBuff[0];
console.log(destBuff.toString());

// SLICING BUFFERS ------------------------------------------
var numbers = Buffer.from("123456789");
var slice = numbers.slice(3, 6);
console.log(slice);

// NOTE that when the slice is altered, the original buffer is also altered
slice[0] = '#'.charCodeAt(0);
slice[slice.length-1] = '#'.charCodeAt(0);
console.log(slice.toString());
console.log(numbers.toString());