/*
 * Primary file for the API
 *
 */

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

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

	// Get the payload, if any
	var decoder = new StringDecoder('utf-8');
	var buffer = '';

	request.on('data', function(data){
		buffer += decoder.write(data);
	});

	request.on('end', function(){
		buffer += decoder.end();

		// Send the response
		response.end('Hello World\n');

		// Log the payload
		console.log('Payload received: ', buffer);
	});

	// Send the response
	response.end('Hello World\n');
});

// Start the server and have it listen on the port 3000
server.listen(3000, function(){
	console.log('Server started listening on port 3000');
});
