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

  logger([tag, user, 'collecting tasks', 'starts'])

  Wreck.get(url, wreckOptions, (error, response, payload) => {
    if (error) {
      logger([tag, user, 'collecting tasks', 'error', JSON.stringify(error)])
      return callback(null, payload)
    } else {
      logger([tag, user, 'collecting tasks', 'finished'])
      return callback(null, payload)
    }
  })
}
