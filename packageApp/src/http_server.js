var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html";
var projectPath = "D:/Eclipse Projects/testPackage/packageApp";
http.createServer(function (req, res){
	var urlObj = url.parse(req.url, true, false);

	/*fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
		if(err){
			res.writeHead(404);
			res.write("shieeeeet \n");
			res.write("the url you are trying to access is: ");
			console.log("ERROR: the url you are trying to access is: " + ROOT_DIR + urlObj.pathname);
			res.write(urlObj.pathname + "\n");
			res.end(JSON.stringify(err));
			return;
		}
		console.log("the url you are trying to access is: " + ROOT_DIR + urlObj.pathname);
		res.writeHead(200);
		res.end(data);
	});*/

	// every file your server serves will have an extension
	// .html, .png, .mp4, etc.
	// perhaps parsing the pathname first, and then changing the ROOT_DIR
	// before calling fs.readfile would be appropriate?

	// the default pathway is:
	// D:\Eclipse Projects\testPackage\packageApp\src
	console.log("this is the urlObj.pathname: " + urlObj.pathname);
	var mimetype = urlObj.pathname.split('.')[1];
	console.log("mimetype: " + mimetype);





	if(urlObj.pathname == "" || urlObj.pathname == " " || urlObj.pathname == "/"){
		urlObj.pathname = "../index.html";
	}
	else if(mimetype == "css"){
		urlObj.pathname = "../css/styling.css";
	}

	fs.readFile(urlObj.pathname, function (err, data) {
		if(err){
			res.writeHead(404);
			res.write("shieeeeet \n");
			res.write("the url you are trying to access is: ");
			console.log("ERROR: the url you are trying to access is: " + projectPath + urlObj.pathname);
			res.write(urlObj.pathname + "\n");
			res.end(JSON.stringify(err));
			return;
		}
		console.log("the url you are trying to access is: " + ROOT_DIR + urlObj.pathname);
		res.writeHead(200);
		res.end(data);

	});

}).listen(8080);
console.log('Server started');