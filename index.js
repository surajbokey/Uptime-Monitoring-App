/*
 * Primary file for the API
 *
 */

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var routes = require('./routes');
var handlers = require('./handlers');

// Server should respond to all the requests with a string
var server = http.createServer(function(request, response) {

  // Get the url and parse it
  var parsedUrl = url.parse(request.url, true);

  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string parameter
  var queryString = parsedUrl.query;

  // Get the http method
  var httpMethod = request.method.toLowerCase();

  // Get the header as an object
  var headers = request.headers;

  // Get the payload, if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';

  request.on('data', function(data) {
    buffer += decoder.write(data);
  });

  request.on('end', function() {
    buffer += decoder.end();

    // Choose the handle this request should go to
    var chosenHandler = typeof(routes[trimmedPath]) !== 'undefined' ?
      routes[trimmedPath] :
      handlers.notFound;

    // Construct the data object to send to the handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryString': queryString,
      'httpMethod': httpMethod,
      'headers': headers,
      'payload': buffer
    }

    // Route the request to the chosen handler from the routs
    chosenHandler(data, function(statusCode, payload) {
      // Sanitize the statusCode
      statusCode = typeof(statusCode) == 'number' ?
        statusCode :
        200;

      // Sanitize the payload
      payload = typeof(payload) == 'object' ?
        payload : {};

      // Convert the payload to the String
      var payloadString = JSON.stringify(payload);

      // Send the response
      response.setHeader('Content-Type', 'application/json');
      response.writeHead(statusCode);
      response.end(payloadString);

      console.log('Response returened: ', statusCode, payloadString);
    });
  });
});

// Start the server and have it listen on the port 3000
server.listen(3000, function() {
  console.log('Server started listening on port 3000');
});
