/*
 * Create and export configuration variables
 *
 */

// Container for all environments
var environments = {};

// Staging {default} environment
environments.staging = {
  'port': 3000,
  'envName': 'staging'
};

// Production environment
environments.production = {
  'port': 5000,
  'envName': 'production'
};

// Determine which environment has been passed from command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if current environment is one of the environments above if not, default to the staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export to module
module.exports = environmentToExport;
