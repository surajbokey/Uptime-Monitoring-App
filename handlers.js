/*
 * File to specify the handles routs is sending the request to.
 *
 */

var handlers = {};

handlers.ping = function(data, callback) {
  callback(200, {
    'key': 'Got the request'
  });
};

handlers.notFound = function(data, callback) {
  callback(404);
};

// Export the handlers
module.exports = handlers;
