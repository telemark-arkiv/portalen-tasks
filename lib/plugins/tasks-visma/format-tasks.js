'use strict'

const config = require('../../../config')
const logger = require('../../logger')
const tag = config.TASKS_VISMA_TAG

module.exports = (data, callback) => {
  var list = []
  var i = 0
  if (Array.isArray(data) && data.length > i) {
    logger([tag, 'repacking data', `length: ${data.length}`])
    data.forEach((task) => {
      if (task['$'] !== 'undefined') {
        var item = {}
        item.systemid = 'visma'
        item.title = task['$'].text
        item.url = task['$'].link
        item.number = task['$'].number
        item.timestamp = new Date().getTime()
        list.push(item)
        i++
      }
      if (data.length === i) {
        logger([tag, 'repacking data', 'finished'])
        return callback(list)
      }
    })
  } else {
    logger([tag, 'no data to repack'])
    return callback(data)
  }
}
