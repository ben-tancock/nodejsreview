/*
INTERACTING WITH EXTERNAL SOURCES:

- the following example interacts with an external source to display weather information on an html page
- to keep the example simple, the raw output from openweathermap.org is pushed into the broswer. In practice,
    you would massage this information.

- this implementation accepts both GET and POST requests 
- for the GET request, a simple webpage with a form is returned that allows the user to post a city name.
- for the POST request, the city name is accessed, and the node.js web client starts up and connect remotely to openweathermap.org to retrieve the info
    the info is then returned to the server along with the original web form.
*/

// there are issues with the API key (I think) but I get the idea...

var http = require('http');
var url = require('url');
var qstring = require('querystring');
var APIKEY = "123321"; // I just chose whatever for this...

function sendResponse(weatherData, res){
    var page = '<html><head><title>External Example</title></head>' + 
    '<body>' + 
    '<form method="post">' + 
    'City: <input name="city"><br>' +
    '<input type="submit" value="Get Weather">' +
    '</form>';

    if(weatherData){
        page+= '<h1>Weather Info</h1><p>' + weatherData + '</p>';
    }
    page += '</body></html>';
    res.end(page);
}

function parseWeather (weatherResponse, res){
    var weatherData = '';
    weatherResponse.on('data', function(chunk){
        weatherData += chunk;
    });
    weatherResponse.on('end', function(){
        sendResponse(weatherData, res);
    });
}

function getWeather(city, res){
    city = city.replace(' ', '-');
    console.log(city);
    var options = {
        host: 'openweathermap.org',
        path: '/data/2.5/weather?q=' + city + '&APPID=' + APIKEY
    };
}

http.createServer(function(req, res){
    console.log(req.method);
    if(req.method == "POST"){
        var reqData = '';
        req.on('data', function(chunk){
            reqData += chunk;
        });

        req.on('end', function(){
            var postParams = qstring.parse(reqData);
            getWeather(postParams.city, res);
        });
    } else{
        sendResponse(null, res);
    }
}).listen(8080);
