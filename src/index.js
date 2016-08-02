'use strict';

const fs  = require('fs'),
    glob  = require('glob'),
    cjson = require('cjson');

function getConfigFile(options) {
  let configFilePath = options.path || process.env.CONFIG_PATH || './config.json';
  try {
    return cjson.load(configFilePath);
  }
  catch (ex) {
    throw new Error('config invalid or doesnt exist');
  }
}

exports.validate = (options) => {
    if (!options.schema || typeof options.schema.match !== 'function') {
      throw new Error('Invalid Strummer Matcher');
    }
    let  errors = options.schema.match(options.config);
    if (errors.length) {
      let err = new Error('Invalid Config <' + options.path + '>');
      err.errors = errors;
      throw err;
    }
}

exports.load = (options) => {
  options     = options || {};
  let config  = getConfigFile(options);
  if (options.schema) exports.validate({config:config, schema: options.schema});
  config.__path = options.path;
  return config;
}
