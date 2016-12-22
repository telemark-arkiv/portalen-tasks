'use strict'

const envs = process.env
const tag = envs.TASKS_MAIL_TAG || 'tasks-mail'
const pkg = require('../../../package.json')
const getMail = require('./getMailExchange')
const logTime = require('./log-time')

module.exports = function (options) {
  const seneca = this

  seneca.add('role: tasks-mail, cmd: collect-tasks, type: user', getMailFromExchange)

  return tag
}

function getMailFromExchange (args, callback) {
  const seneca = this
  const user = args.user
  console.log(`${tag} - ${logTime()}: collecting mail for ${user}`)
  getMail(user, (error, data) => {
    if (error) {
      console.log(`${tag} - ${logTime()}: error collecting mail for ${user} - ${JSON.stringify(error)}`)
      const result = {
        system: tag,
        version: pkg.version,
        user: args.user,
        data: []
      }
      callback(null, {ok: false})
      seneca.act({info: 'tasks', type: 'user', data: result})
    } else {
      console.log(`${tag} - ${logTime()}: finished collecting mail for ${user}`)
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
