'use strict'

const envs = process.env
const tag = envs.TASKS_MAIL_TAG || 'tasks-mail'
const ews = require('ews-javascript-api')
const ntlmXHR = require('./ntlmXHRApi')
const logTime = require('./log-time')
const config = require('../../../config')
const ntlmXHRApi = new ntlmXHR.NtlmXHRApi(config.TASKS_MAIL_USERNAME, config.TASKS_MAIL_PASSWORD)

// create ExchangeService object
module.exports = (username, callback) => {
  var upn = username + '@' + config.TASKS_MAIL_DOMAIN
  var exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013)
  exch.XHRApi = ntlmXHRApi
  exch.Credentials = new ews.ExchangeCredentials(config.TASKS_MAIL_USERNAME, config.TASKS_MAIL_PASSWORD)
  exch.ImpersonatedUserId = new ews.ImpersonatedUserId(ews.ConnectingIdType.PrincipalName, upn)
  ews.EwsLogging.DebugLogEnabled = false // turn off logging
  ews.KeepAlive = false
  ews.Timeout = 3000

  // set ews endpoint url to use
  exch.Url = new ews.Uri(config.TASKS_MAIL_URL) // you can also use exch.AutodiscoverUrl

  const folder = new ews.FolderId(ews.WellKnownFolderName.Inbox)
  const sf = new ews.SearchFilter.IsNotEqualTo(ews.EmailMessageSchema.IsRead, true)
  const view = new ews.ItemView(config.TASKS_MAIL_LIMIT)
  exch.FindItems(folder, sf, view)
    .then((response) => {
      var countEmails = response.items.length
      console.log(`${tag} - ${logTime()}: collected mail for ${username} found ${countEmails}`)
      if (countEmails === 0) {
        return callback(null, [])
      }
      if (response.items.length === config.TASKS_MAIL_LIMIT) {
        countEmails = '<' + config.TASKS_MAIL_LIMIT
      }
      var item = [
        {
          systemid: 'mail-exchange',
          timestamp: new Date().getTime(),
          title: 'Ulest epost (' + countEmails + ')',
          url: config.TASKS_MAIL_OWA_URL
        }
      ]
      return callback(null, item)
    }, (error) => {
      console.log(`${tag} - ${logTime()}: error in getMailExchange for ${username} - ${JSON.stringify(error)}`)
      return callback(null, [])
    }
    )
}
