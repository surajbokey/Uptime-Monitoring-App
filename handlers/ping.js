/*
 * File to have all methods for ping handler
 *
 */

var ping = {};

ping.service = function(data, callback) {
  callback(200);
};

// Export the module
module.exports = ping;