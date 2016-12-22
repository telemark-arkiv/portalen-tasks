'use strict'

const getTasks = require('./get-tasks')
const toJson = require('./to-json')
const formatTasks = require('./format-tasks')

module.exports = (options, callback) => {
  getTasks(options, (err, tasks) => {
    if (err) {
      return callback(err)
    }
    toJson(tasks, (err, data) => {
      if (err) {
        return callback(err)
      }
      formatTasks(data, (res) => {
        return callback(null, res)
      })
    })
  })
}
