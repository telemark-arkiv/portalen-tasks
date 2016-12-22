'use strict'

const getTasks = require('./getTasks')
const toJson = require('./toJson')
const formatTasks = require('./formatTasks')

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
