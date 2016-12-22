'use strict'

const handlers = require('../handlers/api')

module.exports = [
  {
    method: 'GET',
    path: '/user/{userid}',
    handler: handlers.getUsersTasks,
    config: {
      description: 'Get all tasks for a user'
    }
  }
]
