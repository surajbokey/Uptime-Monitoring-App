/*
 * File to have all methods for user handler
 *
 */

// Dependencies
var _data = require('../lib/data');
var helpers = require('../lib/helpers');

var user = {};

user.service = function(data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.httpMethod) > -1) {
    user[data.httpMethod](data, callback);
  } else {
    callback(405);
  }
};

// Handle POST request
// Required parms: firstName, lastName, phone, password, tosAgreement
user.post = function(data, callback) {
  // check for the required fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // Check user does not exist
    _data.read('users', phone, function(err, data) {
      if (err) {
        // Hash the password
        var hashedPassword = helpers.hash(password);

        if (hashedPassword) {
          var userObject = {
            'firstName': firstName,
            'lastName': lastName,
            'phone': phone,
            'hashedPassword': hashedPassword,
            'tosAgreement': true
          }

          // Store the user
          _data.create('users', phone, userObject, function(err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, {
                'Error': 'Could not create a new user'
              });
            }
          });
        } else {
          callback(500, {
            'Error': 'Could not hash the user\'s password'
          });
        }
      } else {
        callback(400, {
          'Error': 'User already exist'
        })
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing required field'
    });
  }
};

// Handle GET request
user.get = function(data, callback) {
  // Check that the phone number is valid
  var phone = typeof(data.queryString.phone) == 'string' && data.queryString.phone.trim().length == 10 ? data.queryString.phone.trim() : false;
  if (phone) {
    // Lookup the user
    _data.read('users', phone, function(err, data) {
      if (!err && data) {
        // Remove the password from the data
        delete data.hashedPassword;
        callback(200, data);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing required field'
    });
  }
};

// Handle PUT request
user.put = function(data, callback) {
  // Check for the required field
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for the fields to be updated
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if (phone) {
    if (firstName || lastName || password) {
      // Lookup the user
      _data.read('users', phone, function(err, data) {
        if (!err && data) {
          // Update the available fields
          if (firstName) {
            data.firstName = firstName;
          }

          if (lastName) {
            data.lastName = lastName;
          }

          if (password) {
            data.hashedPassword = helpers.hash(password);
          }

          // Store the updated user
          _data.update('users', phone, data, function(err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, {
                'Error': 'Not able to update the user data'
              });
            }
          });
        } else {
          console.log(err);
          callback(400, {
            'Error': 'Specified user does not exist'
          });
        }
      });
    } else {
      callback(400, {
        'Error': 'Missing required field'
      });
    }
  } else {
    callback(400, {
      'Error': 'Missing required field'
    });
  }

};

// Handle DELETE request
user.delete = function(data, callback) {
  // Check for the valid phone number
  var phone = typeof(data.queryString.phone) == 'string' && data.queryString.phone.trim().length == 10 ? data.queryString.phone.trim() : false;

  if (phone) {
    // Lookup the  user
    _data.read('users', phone, function(err) {
      if (!err) {
        // Remove the user
        _data.delete('users', phone, function(err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, {
              'Error': 'Could not delete the specified user'
            });
          }
        });
      } else {
        callback(400, {
          'Error': 'Specified user does not exist'
        })
      }
    });
  } else {
    callback(400, {
      'Error': 'Required field missing'
    });
  }
};

// Export the module
module.exports = user;