'use strict'

const config = require('../../../config')
const tag = config.TASKS_EXCHANGE_TAG
const pkg = require('../../../package.json')
const getTasks = require('./get-tasks-exchange')
const logger = require('../../logger')

module.exports = function (options) {
  const seneca = this
  seneca.add('role: tasks-exchange, cmd: collect-tasks, type: user', getTasksFromExchange)
  return tag
}

function getTasksFromExchange (args, callback) {
  const seneca = this
  const user = args.user

  logger([tag, 'collecting tasks', user])

  getTasks(user, (error, data) => {
    if (error) {
      logger([tag, 'collecting tasks', user, 'error', JSON.stringify(error)])
      const result = {
        system: tag,
        version: pkg.version,
        user: args.user,
        data: []
      }
      callback(null, {ok: false})
      seneca.act({info: 'tasks', type: 'user', data: result})
    } else {
      logger([tag, 'collecting tasks', user, 'finished'])
      const result = {
        system: tag,
        version: pkg.version,
        user: args.user,
        data: data
      }
      callback(null, {ok: true})
      seneca.act({info: 'tasks', type: 'user', data: result})
    }
  })
}
