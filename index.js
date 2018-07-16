/*
 * Primary file for the API
 *
 */

// Dependencies
var http = require('http');
var url = require('url');

// Server should respond to all the requests with a string
var server = http.createServer(function(request, response){

	// Get the url and parse it
	var parsedUrl = url.parse(request.url, true);

	// Get the path
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');

	// Get the query string parameter
	var queryString = parsedUrl.query;

	// Get the http method
	var httpMethod = request.method;

	// Get the header as an object
	var headers = request.headers;

	// Send the response
	response.end('Hello World\n');

	// Log the request
	console.log('Path: ', path);
	console.log('Trimmed path: ', trimmedPath);
	console.log('Query string: ', queryString);
	console.log('Http method: ', httpMethod);
	console.log('Headers: ', headers);
});

// Start the server and have it listen on the port 3000
server.listen(3000, function(){
	console.log('Server started listening on port 3000');
});
