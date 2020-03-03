//IMPLEMENTING POST SERVERS
/*
- very similar to implementing a GET server
- probably will end up implementing them together in the same code for simplicity's sake
- POST services are handy if you need to send data to the server to be updated, as for form submissions.
- to serve a POST request, you need to implement code in the request handler that reads the contents of the post body out and processes it
- once you have processed the data, you dynamically populate the data you want to send back to the client, write it out to the response, and then call end() to finalize the response
    and flush the writable stream.
- the output of the POST request might be a webpage, http snippet, json data, just like the GET server
*/

// THE BOOK REALLY SCREWED THE POOCH THIS CHAPTER, THE POST SERVER IS TOTALLY WRONG!!
// We'll have to make our own...

var http = require('http');

http.createServer(function(req, res){
  console.log("connection established");
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.write('{"message":"this is the message uwu", "question":"OwO whats this?"}');
  res.end();
}).listen(8080);

// works!!!