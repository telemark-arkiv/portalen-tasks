'use strict'

const logger = require('../lib/logger')

module.exports.getUsersTasks = (request, reply) => {
  const user = request.params.userid
  const pattern = {role: 'tasks', type: 'user', user: user}
  const payload = {}

  logger([`request tasks for ${user}`])

  request.seneca.act(pattern, payload, (error, data) => {
    if (error) {
      logger([`request tasks for ${user}`, 'error', `${JSON.stringify(error)}`])
      return reply({user: user, data: []})
    } else {
      logger([`request tasks for ${user}`, 'returns data', `found ${data.data.length}`])
      return reply(data)
    }
  })
}
