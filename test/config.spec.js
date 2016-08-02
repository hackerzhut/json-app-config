'use strict'

var path  = require('path'),
  should  = require('should'),
  s       = require('strummer'),
  jconfig = require(SRC + '/index');

describe('config.json Loading', () => {

  it('should throw error if no default config.json exists', () => {
    try {
      jconfig.load()
    }
    catch (ex) {
      ex.should.match(/config invalid or doesn't exist/)
    }
  })

  it('should load and return config json along with the path', () => {
    let configJSON  = 'test/fixtures/config-valid.json';
    let config      = jconfig.load({path: configJSON})
    config.host.should.eql('localhost')
    config.__path.should.eql(configJSON)
  })

})

// TO-DO
describe.skip('config.json format', () => {
  // DELETE ENV VARIABLE before each test
  beforeEach(() => { delete process.env['ENV_VAR'] })

  it('can use built-in functions to get values from the environment', function () {
    process.env['ENV_VAR'] = 8080
    var config = jconfig.load({path: 'test/fixtures/config-env.json'})
    config.port.should.eql(8080)
  })
})

describe('config validation', () => {

  let schema = s({ host: 'string', port: 'number' })

  it('should throw an error if the validation fails', () => {
    try {
      jconfig.load({path: 'test/fixtures/config-invalid.json', schema: schema})
      should.fail('invalid config')
    }
    catch (ex) {
      ex.message.should.match(/^(Invalid config)*/)
    }
  })

  it('should return the config json along with path if the validation passes', () => {
    let configJSON  = 'test/fixtures/config-valid.json';
    let config      = jconfig.load({path: configJSON, schema: schema})
    config.__path.should.eql(configJSON)
  })

  it('should run the validation separately', () => {
    try {
      let config = './fixtures/config-invalid.json'
      jconfig.validate({config: config, schema: schema})
      should.fail('invalid config')
    }
    catch (ex) {
      ex.should.match(/^(Invalid config)*/)
    }
  })
})
