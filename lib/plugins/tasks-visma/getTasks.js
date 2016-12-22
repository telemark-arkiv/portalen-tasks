'use strict'

const Wreck = require('wreck')

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

  console.log(`task-collector-visma: collecting tasks for ${user}`)

  Wreck.get(url, wreckOptions, (error, response, payload) => {
    if (error) {
      console.log(`task-collector-visma: finished collecting tasks for ${user}`)
      return callback(null, payload)
    } else {
      console.log(`task-collector-visma: finished collecting tasks for ${user}`)
      return callback(null, payload)
    }
  })
}
