'use strict'

module.exports = (feed, callback) => {
  const Xray = require('x-ray')
  const cleanupText = require('./cleanup-text')
  const xray = Xray()

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
