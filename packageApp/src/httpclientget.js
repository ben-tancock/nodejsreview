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