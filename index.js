/*
 * Primary file for the API
 *
 */

// Dependencies
var http = require('http');

// Server should respond to all the requests with a string
var server = http.createServer(function(request, response){
	response.end('Hello World\n');
});

// Start the server and have it listen on the port 3000
server.listen(3000, function(){
	console.log('Server started listening on port 3000');
});