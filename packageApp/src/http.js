// PROCESSING URLs
 /* URL = uniform resource locator
  * to create a url object from a url string, pass the url string as the first parameter to the following method:
  * url.parse(urlStr, [parseQueryString], [slashedDenoteHost])
  * the url.parse method takes the URL string as the first parameter. 
  * the parseQueryString parameter is a boolean that when true also parses the query string portion of the url into an object literal. the default is false.
  * the slashesDenoteHost is also a boolean that when true parses a url with the format //host/path to {host: 'host', pathname: '/path'} instead of {pathname: '//host/path'}
  * 
  * You can also convert a url object into a string form using:
  * url.format(urlObj)
  */

var url = require('url');
var urlStr = 'http://user:pass@host.com:80/resource/path?query=string#hash';
var urlObj = url.parse(urlStr, true, false);
urlString = url.format(urlObj);

// Resolving URL components
/*
 * another useful feature of url is the ability to resolve url componenets in the same manner as a browser would.
 * this allows you to manipulate the url strings on the server side to make adjustments in the url.
 * for example, you might want to change the url location before processing the request because a resource has moved or changed parameters.
 * 
 * this is how you resolve a url:
 * 
 * url.resolve(from, to)
 * the from parameter specifies the original BASE url string
 * the to parameter specifies the new location where you want the url to resolve
 */

var originalUrl = 'http://user:pass@host.com:80/resource/path?query=string#hash';
var newResource = '/another/path?querynew';
console.log(url.resolve(originalUrl, newResource));


// PROCESSING QUERY STRINGS AND FORM PARAMETERS
/*
 * http requests often include query strings in the URL or parameter data in the body for form submissions
 * the query string can be obtained from the url object defined in the previous section
 * the parameter data sent by a form request can be read out of the body of the client request as described later
 * 
 * the query string and form parameters are just basic key-value pairs.
 * to actually consume these values in your node.js webserver you need to convert the string into a javascript object using the parse() method 
 * from the querystring module
 */

// querystring.parse(str, [sep], [eq], [options]
// the str parameter is the query or parameter string
// the sep parameter allows you to specify the separator character used
// the eq parameter allows you to specify the assignment character to use when parsing
// the options parameter is an object with the property maxKeys that allows you to limit the number of keys the resulting object can contain. (default is 1000)
// 	if you specify 0 there is no limit

var qstring = require('querystring');
var params = qstring.parse("name=Brad&color=red&color=blue");
// the params object created would be:
// {name: 'Brad', color: ['red', 'blue']}

// you can also go back the other direciton and convert an object to a query string using the stringify() function:
// querystring.stringify(obj, [sep], [eq])

// UNDERSTANDING REQUEST, RESPONSE, AND SERVER OBJECTS

// The http.ClientRequest Object
/*
 * Created internally when you call http.request() when building the http client.
 * The object represents the request while it is in progress to the server.
 * You use the clientrequest object to initiate, monitor, and handle the response from the server.
 * 
 * The ClientRequest impelements a writable stream, so it provides the functionality of a writable stream object
 * To implement a ClientRequest object, use:
 * 
 * http.request(options, callback)
 */


var http = require('http');
var options = {hostname: 'www.myserver.com', path: '/', port: '8080', method: 'POST'};

var req = http.request(options, function(response){
	var str = '';
	response.on('data', function(chunk){
		str += chunk;
	});
	
	response.on('end', function(){
		console.log(str);
	});
});

req.end();




// THE http.ServerResponse OBJECT ----------------------
/*
 * The ServerResponse object is created by the HTTP server internally when a request event is received. It is passed to the request event handler as the second argument.
 * You use the ServerRequest object to formulate and send a response to the client.
 * 
 * Like the ServerRequest object, ServerResponse implements a writable stream.
 */


// The http.IncomingMessage OBJECT, http.Server object
// ...






