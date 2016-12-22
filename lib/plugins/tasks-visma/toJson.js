'use strict'

const parseString = require('xml2js').parseString

module.exports = (data, callback) => {
  parseString(data, (err, tasks) => {
    if (err) {
      return callback(err)
    }
    if (tasks.tasks.length < 1 || typeof tasks.tasks.task === 'undefined') {
      console.log(`task-collector-visma: no tasks found`)
      return callback(null, [])
    }
    return callback(null, tasks.tasks.task)
  })
}
