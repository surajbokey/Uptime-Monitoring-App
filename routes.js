/*
 * File to specify the routes application is going to handle
 *
 */

// Dependencies
var handlers = require('./handlers');

var routes = {
  'ping': handlers.ping
};

// Export the routes
module.exports = routes;
