'use strict'

const config = require('../../../config')
const tag = config.TASKS_MAIL_TAG
const ews = require('ews-javascript-api')
const ntlmXHR = require('./ntlm-xhr-api')
const ntlmXHRApi = new ntlmXHR.NtlmXHRApi(config.TASKS_MAIL_USERNAME, config.TASKS_MAIL_PASSWORD)
const logger = require('../../logger')

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
      logger([tag, username, 'get-mail-exchange', 'mail collected', countEmails])
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
      logger([tag, username, 'get-mail-exchange', 'error', JSON.stringify(error)])
      return callback(null, [])
    }
    )
}
