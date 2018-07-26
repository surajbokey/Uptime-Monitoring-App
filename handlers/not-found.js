/*
 * File to handle 404
 *
 */

var notFound = {};

notFound.service = function(data, callback) {
  callback(404);
};

// Export the module
module.exports = notFound;