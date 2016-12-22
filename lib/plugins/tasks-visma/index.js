'use strict'

const envs = process.env
const pkg = require('../../../package.json')
const config = require('../../../config')
const getFormatedTasks = require('./getFormatedTasks')
const logTime = require('./log-time')
const tag = envs.TASKS_VISMA_TAG || 'tasks-visma'

module.exports = function (options) {
  const seneca = this

  seneca.add('role: tasks-visma, cmd:collect-tasks, type:user', getTasksFromVisma)

  return tag
}

function getTasksFromVisma (args, callback) {
  const seneca = this
  const user = args.user
  const options = {
    username: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
    path: config.path,
    user: user
  }
  console.log(`${tag} - ${logTime()}: collecting tasks for ${user}`)
  getFormatedTasks(options, (error, data) => {
    if (error) {
      console.log(`${tag} - ${logTime()}: error collecting tasks for ${user} - ${JSON.stringify(error)}`)
      const result = {
        system: tag,
        version: pkg.version,
        user: user,
        data: []
      }
      callback(null, {ok: false})
      seneca.act({info: 'tasks', type: 'user', data: result})
    } else {
      console.log(`${tag} - ${logTime()}: finished collecting tasks for ${user}`)
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
