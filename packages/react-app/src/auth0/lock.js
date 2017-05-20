const {
  setup
} = require('@graphcool/gc-auth0-apollo')
const config = require('../config')
module.exports = setup(config)