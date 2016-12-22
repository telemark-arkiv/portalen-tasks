'use strict'

const pkg = require('../../../package.json')
const config = require('../../../config')
const getFormatedTasks = require('./get-formated-tasks')
const tag = config.TASKS_VISMA_TAG
const logger = require('../../logger')

module.exports = function (options) {
  const seneca = this

  seneca.add('role: tasks-visma, cmd:collect-tasks, type:user', getTasksFromVisma)

  return tag
}

function getTasksFromVisma (args, callback) {
  const seneca = this
  const user = args.user
  const options = {
    username: config.TASKS_VISMA_USERNAME,
    password: config.TASKS_VISMA_PASSWORD,
    host: config.TASKS_VISMA_HOST,
    port: config.TASKS_VISMA_PORT,
    path: config.TASKS_VISMA_PATH,
    user: user
  }
  logger([tag, 'collecting tasks', user])
  getFormatedTasks(options, (error, data) => {
    if (error) {
      logger([tag, 'collecting tasks', 'error', user, JSON.stringify(error)])
      const result = {
        system: tag,
        version: pkg.version,
        user: user,
        data: []
      }
      callback(null, {ok: false})
      seneca.act({info: 'tasks', type: 'user', data: result})
    } else {
      logger([tag, 'collecting tasks', 'finished', user])
      const result = {
        system: tag,
        version: pkg.version,
        user: user,
        data: data
      }
      callback(null, {ok: true})
      seneca.act({info: 'tasks', type: 'user', data: result})
    }
  })
}
