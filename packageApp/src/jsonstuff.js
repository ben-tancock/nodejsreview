
// Converting JSON to javascript objects: ----------------------
// A JSON string represents the Javascript object in string form
var accountStr = '{ "name":"Jedi", "members":["Yoda", "Obi-Wan"], "number":34512, "location":"A galaxy far, far away"}';
		
var accountObj = JSON.parse(accountStr);
console.log(accountObj.name);
console.log(accountObj.location);



// Converting Javascript objects to JSON:
// Node also allows you to convert a Javascript object into a properly formatted JSON string.
var accountObj = {
		name: "Baggins",
		number: 10645,
		members: ["Frodo, Bilbo"],
		location: "Shire"
};

var accountStr = JSON.stringify(accountObj);
console.log(accountStr);
