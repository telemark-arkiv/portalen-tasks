'use strict'

const ews = require('ews-javascript-api')
const logTime = require('./log-time')
const ntlmXHR = require('./ntlmXHRApi')
const config = require('../../../config')
const envs = process.env
const tag = envs.TASKS_EXCHANGE_TAG || 'tasks-exchange'
const ntlmXHRApi = new ntlmXHR.NtlmXHRApi(config.TASKS_EXCHANGE_USERNAME, config.TASKS_EXCHANGE_PASSWORD)

// create ExchangeService object
module.exports = (username, callback) => {
  const upn = username + '@' + config.TASKS_EXCHANGE_DOMAIN
  const exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013)
  exch.XHRApi = ntlmXHRApi
  exch.Credentials = new ews.ExchangeCredentials(config.TASKS_EXCHANGE_USERNAME, config.TASKS_EXCHANGE_PASSWORD)
  exch.ImpersonatedUserId = new ews.ImpersonatedUserId(ews.ConnectingIdType.PrincipalName, upn)
  ews.EwsLogging.DebugLogEnabled = false // turn off logging
  ews.KeepAlive = false
  ews.Timeout = 3000

  // set ews endpoint url to use
  exch.Url = new ews.Uri(config.TASKS_EXCHANGE_URL) // you can also use exch.AutodiscoverUrl

  const folder = new ews.FolderId(ews.WellKnownFolderName.Tasks)
  const sf = new ews.SearchFilter.IsNotEqualTo(ews.TaskSchema.IsComplete, true)
  const view = new ews.ItemView(config.TASKS_EXCHANGE_LIMIT)

  exch.FindItems(folder, sf, view)
    .then((response) => {
      let countTasks = response.items.length
      console.log(`${tag} - ${logTime()}: collected tasks for ${username} - found ${countTasks}`)
      if (countTasks === 0) {
        return callback(null, [])
      }
      if (response.items.length === config.TASKS_EXCHANGE_LIMIT) {
        countTasks = '<' + config.tasksLimit
      }
      const item = [
        {
          systemid: 'tasks-exchange',
          timestamp: new Date().getTime(),
          title: 'Ugjorte oppgaver (' + countTasks + ')',
          url: config.TASKS_EXHANGE_OWA_URL
        }
      ]
      return callback(null, item)
    }, (err) => {
      console.log(`${tag} - ${logTime()}: error in getTasksExchange for ${username} - ${JSON.stringify(err)}`)
      return callback(null, [])
    }
    )
}
