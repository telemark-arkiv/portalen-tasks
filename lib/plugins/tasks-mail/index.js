'use strict'

const config = require('../../../config')
const tag = config.TASKS_MAIL_TAG
const pkg = require('../../../package.json')
const getMail = require('./get-mail-exchange')
const logger = require('../../logger')

module.exports = function (options) {
  const seneca = this
  seneca.add('role: tasks-mail, cmd: collect-tasks, type: user', getMailFromExchange)
  return tag
}

function getMailFromExchange (args, callback) {
  const seneca = this
  const user = args.user
  logger([tag, user, 'collecting mail'])
  getMail(user, (error, data) => {
    if (error) {
      logger([tag, user, 'collecting mail', 'error', JSON.stringify(error)])
      const result = {
        system: tag,
        version: pkg.version,
        user: args.user,
        data: []
      }
      callback(null, {ok: false})
      seneca.act({info: 'tasks', type: 'user', data: result})
    } else {
      logger([tag, user, 'collecting mail', 'finished'])
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
