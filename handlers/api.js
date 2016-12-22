'use strict'

const logger = require('../lib/logger')

module.exports.getUsersTasks = (request, reply) => {
  const user = request.params.userid
  const pattern = {role: 'tasks', type: 'user', user: user}
  const payload = {}
  const tag = 'tasks-request'

  logger([tag, user, 'starts'])

  request.seneca.act(pattern, payload, (error, data) => {
    if (error) {
      logger([tag, user, 'error', `${JSON.stringify(error)}`])
      return reply({user: user, data: []})
    } else {
      logger([tag, user, 'finished', data.data.length])
      return reply(data)
    }
  })
}
