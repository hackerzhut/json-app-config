# json-app-config

[![Build Status](https://travis-ci.org/hackerzhut/json-app-config.svg?branch=master)](https://travis-ci.org/hackerzhut/json-app-config)

> Loads and validates `JSON` configuration files

## Usage

```bash
npm install json-app-config --save
```

```js
var jsonConfig = require('json-app-config');
// Looks for config.json in the current directory to load if no options are provided
var config     = jsonConfig.load();
```

```js
var jsonConfig = require('json-app-config');
var config     = jsonConfig.load({
  path: './src/config.json'
});
```

The resolved config path is available in the returned config object via `__path` attribute:

```js
var config = jsonConfig.load();

//The returned Config object will look like this
{
  __path: './config.json'
  host: 'localhost'
  port: 3000
}
```

## Config file format

The config files should be of JSON format or [CJSON](https://github.com/kof/node-cjson) format.
Embedded comments and ENV variables are not supported for now. Will be added in the future versions.

```js
{
"host": "localhost",
"port": 3000,
// JSON comments
"log": "./log.txt"
}
```

## Validation with custom schema
This module uses [strummer](https://github.com/TabDigital/strummer) for config validation.

```js
var s = require('strummer');

var schema = s({
  name: 'string',
  age: 'number',
  address: {
  city: 'string',
  postcode: 'number'
  },
  nicknames: ['string']
});

// Looks for config.json in the current directory and validates against the provided schema.
var config = jsonConfig.load({
  schema: schema
});
```

An error will be thrown if the schema doesnt match the config.json. Looks for errors in the thrown
Error object to see the list of errors.

# Validate existing JSON objects

```js
jsonConfig.validate({
  config: object,
  schema: s({
    host: 'string'
    port: 'number'
    name: s.string({optional:true})
  })
})
```
