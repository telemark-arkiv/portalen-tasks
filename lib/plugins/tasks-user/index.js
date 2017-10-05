'use strict'

const Loki = require('lokijs')
const config = require('../../../config')
const tag = config.TASKS_USER_TAG
const logger = require('../../logger')
const db = new Loki('db/tasks.json')
const tasks = db.addCollection('tasks')

module.exports = function (options) {
  const seneca = this

  seneca.add('role:tasks, type:user', getTasksUser)
  seneca.add('info:tasks, type:user', updateTasksUser)

  return tag
}

function repackStore (data) {
  var repack = []
  const dropKeys = (item) => ['user', 'meta', '$loki'].indexOf(item) === -1
  if (data) {
    Object.keys(data).filter(dropKeys).forEach((dataKey) => {
      const items = data[dataKey] || []
      items.forEach((item) => {
        repack.push(item)
      })
    })
  }

  return repack
}

function getTasksUser (args, done) {
  const seneca = this
  const user = args.user

  logger([tag, user, 'collect tasks', 'starts'])

  const result = {
    user: user,
    data: repackStore(tasks.findOne({user: user}))
  }

  logger([tag, user, 'collect tasks', 'finished', result.data.length])

  done(null, result)

  seneca.act({role: 'tasks-compilo', cmd: 'collect-tasks', type: 'user', user: user})
  // seneca.act({role: 'tasks-visma', cmd: 'collect-tasks', type: 'user', user: user})
  // seneca.act({role: 'tasks-exchange', cmd: 'collect-tasks', type: 'user', user: user})
  // seneca.act({role: 'tasks-mail', cmd: 'collect-tasks', type: 'user', user: user})
}

function updateTasksUser (msg, done) {
  done(null, {ok: true})

  const user = msg.data.user
  const system = msg.data.system
  const data = msg.data.data
  const userTasks = tasks.findOne({user: user})

  if (!userTasks) {
    var payload = {
      user: user
    }
    payload[system] = data
    tasks.insert(payload)
  } else {
    userTasks[system] = data
    tasks.update(userTasks)
  }

  logger([tag, user, 'stored data', system])
}
