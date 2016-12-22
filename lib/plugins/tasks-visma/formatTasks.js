'use strict'

module.exports = (data, callback) => {
  var list = []
  var i = 0
  if (Array.isArray(data) && data.length > i) {
    console.log(`task-collector-visma: repacking data - length: ${data.length}`)
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
        console.log(`task-collector-visma: finished repacking data`)
        return callback(list)
      }
    })
  } else {
    console.log(`task-collector-visma: no data to repack`)
    return callback(data)
  }
}
