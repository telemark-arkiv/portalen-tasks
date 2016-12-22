'use strict'

function repackFeed (feed, callback) {
  var Xray = require('x-ray')
  var cleanupText = require('./cleanup-text')
  var xray = Xray()

  xray(feed, 'li a', [{
    title: '',
    url: '@href'
  }]
  )(function (error, json) {
    if (error) {
      return callback(error)
    } else {
      var data = json.map(function (item) {
        return {
          systemid: 'compilo',
          title: cleanupText(item.title).trim(),
          url: item.url,
          timestamp: new Date().getTime()
        }
      })
      var filtered = data.filter(function (item) {
        return !/\(0\)/.test(item.title)
      })
      return callback(null, filtered)
    }
  })
}

module.exports = repackFeed
