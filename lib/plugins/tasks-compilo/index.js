'use strict'

const getFeedFromCompilo = require('./get-feed-from-compilo')
const repackFeed = require('./repack-feed')
const config = require('../../../config')
const pkg = require('../../../package.json')
const tag = config.TASKS_COMPILO_TAG
const logger = require('../../logger')

module.exports = function (options) {
  const seneca = this

  seneca.add('role: tasks-compilo, cmd:collect-tasks, type:user', getTasksFromCompilo)

  return tag
}

function getTasksFromCompilo (args, callback) {
  callback(null, {ok: true})

  const seneca = this
  const user = args.user
  var result = {
    system: tag,
    version: pkg.version,
    user: user,
    data: []
  }

  getFeedFromCompilo(user, (error, feed) => {
    if (error) {
      logger([tag, 'get-feed', 'error', user, JSON.stringify(error)])
      seneca.act({info: 'tasks', type: 'user', data: result})
    } else {
      repackFeed(feed, function (err, data) {
        logger([tag, 'repacks feed', user])
        if (err) {
          logger([tag, 'repacks feed', user, 'error', JSON.stringify(error)])
          seneca.act({info: 'tasks', type: 'user', data: result})
        } else {
          logger([tag, 'repacks feed', user, 'finished', data.length])
          result.data = data
          seneca.act({info: 'tasks', type: 'user', data: result})
        }
      })
    }
  })
}
