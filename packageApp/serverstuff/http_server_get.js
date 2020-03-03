

// IMPLEMENTING DYNAMIC GET SERVERS
/*
  More often than not you'll use node.js webservers to serve dynamic content rather than static.
  To serve a GET request dynamically, you need to implement code in the request handler that
   dynamically populates the data you want to send back to the client, writes it out to the response, 
   and then calls end() to fianlize the response and flush the writable stream.
*/

var http = require('http');
var messages = [
  'hello world',
  'from a basic node.js server',
  'take luck'];

http.createServer(function(req, res){
  console.log("connection established");
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.write('<html><head><title>Simple HTTP Server</title></head>');
  res.write('<body>');
    
  for(var idx in messages){
    res.write('\n<h1>' + messages[idx] + '</h1>');
  }
  res.end('\n</body></html>');
}).listen(8080);
