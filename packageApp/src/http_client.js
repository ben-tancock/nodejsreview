var http = require('http');
var options = {
	hostname: "localhost",
	port: "8080",
	path: "index.html"
};

function handleResponse(response){
	var serverData = '';
	response.on('data', function (chunk){
		serverData += chunk;
	});
}

http.request(options, function(response){
	console.log("client handling response");
	handleResponse(response);
}).end();