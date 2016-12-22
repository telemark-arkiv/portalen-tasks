'use strict'
// A very ugly hack due to Compilo's setup
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const Wreck = require('wreck')
const querystring = require('querystring')
const config = require('../../../config')
const tag = config.TASKS_COMPILO_TAG
const logger = require('../../logger')

module.exports = (user, callback) => {
  const userQuery = {
    x1: config.TASKS_COMPILO_X1,
    x2: config.TASKS_COMPILO_X2,
    x3: user
  }
  const feedUrl = config.TASKS_COMPILO_URL + '/?' + querystring.stringify(userQuery)

  const options = {
    timeout: 2000
  }

  logger([tag, 'collecting tasks', user])

  Wreck.get(feedUrl, options, (error, response, payload) => {
    if (error) {
      callback(error)
    } else {
      callback(null, payload)
    }
  })
}
