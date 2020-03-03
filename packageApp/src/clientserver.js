// IMPLEMENTING HTTP CLIENTS AND SERVERS IN NODE.JS ---------------------------
/* now that we understand the ClientRequest, ServerResponse, and IncomingMessage objects,
 * we are ready to implement
 */


// SERVING STATIC FILES
/* the most basic type of http server
 * 
 * To serve static files, you first need to start the http server and then listen on a port.
 * Then in the request handler, you open the file locally using the fs module and write the file contents to the response.
 */

/*
  var http = require('http');
http.createServer(function(req, res){ // req is an IncomingMessage object, res is a ServerResponse object
	// handle the request and response here
	
}).listen(8080); 

*/

// two other methods can be used to listen for connections:
// listen(path, [callback])
// listen(handle, [callback])

// To stop the HTTP server from listening once it has started, use the close() method:
//close([callback]);

var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";

/*http.createServer(function(req, res){
  console.log("request made...");
  var urlObj = url.parse(req.url, true, false);
  fs.readFile(ROOT_DIR + urlObj.pathname, function(err, data){
    if(err){
      console.log("error on file: " + ROOT_DIR + urlObj.pathname);
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
    //console.log("response sent in the form of: " + data);
  });
}).listen(8080);*/

/* Try to explain what this is...
  - the http.createServer() method turns your computer into an http server
  - it creates an http server object
  - it listens on ports for your computer to exectute a function (requestListener) each time a request is made
  - what the user gets depends on what the response is
*/

// IMPLEMENTING DYNAMIC GET SERVERS
/*
  More often than not you'll use node.js webservers to serve dynamic content rather than static.
  To serve a GET request dynamically, you need to implement code in the request handler that
   dynamically populates the data you want to send back to the client, writes it out to the response, 
   and then calls end() to fianlize the response and flush the writable stream.
*/

var messages = ['hello world', 'from a basic node.js server', 'take luck'];
http.createServer(function(req, res){
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.write('<html><head><title>Simple HTTP Server</title></head>');
  res.write('<body>');
  for(var idx in messages){
    res.write('\n<h1>' + messages[idx] + '</h1>');
  }
  res.end('\n</body></html>');
}).listen(8080);


// basic web client that makes a GET request to the server:
var options = {
  hostname: 'localhost',
  port: '8080'
};

function handleResponse(response){
  var serverData = '';
  response.on('data', function(chunk){
    serverData += chunk;
  });

  response.on('end', function(){
    console.log("Response Status: ", response.statusCode);
    console.log("Response headers: ", response.headers);
    console.log(serverData);
  });
}

http.request(options, function(response){
  handleResponse(response);
}).end