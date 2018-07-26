/*
 * File to specify the routes application is going to handle
 *
 */

// Dependencies
var user = require('./handlers/user');
var ping = require('./handlers/ping');

var routes = {
  'ping': ping.service,
};

// Export the routes
module.exports = routes;
