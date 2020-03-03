var http = require('http');
var options = {
  hostname: 'localhost',
  port: '8080',
  method: 'GET'
};
  
function handleResponse(response){
  console.log("test handleresponse...");
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
  console.log("test request");
  handleResponse(response);
}).end()