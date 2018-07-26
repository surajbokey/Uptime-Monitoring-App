/*
 * File contains helper methods
 *
 */

// Dependencies
var crypto = require('crypto');
var config = require('../config');

var helpers = {};

helpers.hash = function(str) {
  if (typeof(str) == 'string' && str.length > 0) {
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }

};


// Parse a JSON string to object
helpers.parseJsonToObject = function(str) {
  try {
    return JSON.parse(str);
  } catch (err) {
    return {};
  }
}

// Export
module.exports = helpers;