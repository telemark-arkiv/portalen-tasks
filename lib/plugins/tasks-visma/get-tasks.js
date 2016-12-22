'use strict'

const Wreck = require('wreck')
const config = require('../../../config')
const logger = require('../../logger')
const tag = config.TASKS_VISMA_TAG

function createLink (options) {
  var url = 'http://' + options.username + ':' + options.password + '@' + options.host + ':' + options.port + options.path + options.user
  return url
}

module.exports = (options, callback) => {
  const url = createLink(options)
  const user = options.user
  const wreckOptions = {
    timeout: 2000
  }

  logger([tag, 'collecting tasks', user])

  Wreck.get(url, wreckOptions, (error, response, payload) => {
    if (error) {
      logger([tag, 'collecting tasks', 'error', user, JSON.stringify(error)])
      return callback(null, payload)
    } else {
      logger([tag, 'collecting tasks', 'finished', user])
      return callback(null, payload)
    }
  })
}
