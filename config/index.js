'use strict'

module.exports = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  TASKS_USER_TAG: process.env.TASKS_USER_TAG || 'tasks-user',
  TASKS_COMPILO_TAG: process.env.TASKS_COMPILO_TAG || 'tasks-compilo',
  TASKS_COMPILO_URL: process.env.TASKS_COMPILO_URL || 'https://feed.compilo.no',
  TASKS_COMPILO_X1: process.env.TASKS_COMPILO_X1 || 'x1Value',
  TASKS_COMPILO_X2: process.env.TASKS_COMPILO_X2 || 'x2Value',
  TASKS_VISMA_TAG: process.env.TASKS_VISMA_TAG || 'tasks-visma',
  TASKS_VISMA_USERNAME: process.env.TASKS_VISMA_USERNAME || 'user',
  TASKS_VISMA_PASSWORD: process.env.TASKS_VISMA_PASSWORD || 'password',
  TASKS_VISMA_HOST: process.env.TASKS_VISMA_HOST || 'hostname',
  TASKS_VISMA_PORT: process.env.TASKS_VISMA_PORT || '8290',
  TASKS_VISMA_PATH: process.env.TASKS_VISMA_PATH || '/hrm_ws/secure/tasks/username/',
  TASKS_EXCHANGE_TAG: process.env.TASKS_EXCHANGE_TAG || 'tasks-exchange',
  TASKS_EXCHANGE_URL: process.env.TASKS_EXCHANGE_URL || 'https://epost.vfk.no/ews/Exchange.asmx',
  TASKS_EXCHANGE_USERNAME: process.env.TASKS_EXCHANGE_USERNAME || 'domain\\username', // Must have double slash between domain and user
  TASKS_EXCHANGE_PASSWORD: process.env.TASKS_EXCHANGE_PASSWORD || 'password',
  TASKS_EXCHANGE_DOMAIN: process.env.TASKS_EXCHANGE_DOMAIN || 'skole.t-fk.no',
  TASKS_EXHANGE_OWA_URL: process.env.TASKS_EXHANGE_OWA_URL || 'https://epost.vfk.no/owa/#path=/tasks',
  TASKS_EXCHANGE_LIMIT: parseInt(process.env.TASKS_EXCHANGE_LIMIT) || 20, // number of uncompleted tasks to get,
  TASKS_MAIL_TAG: process.env.TASKS_MAIL_TAG || 'tasks-mail',
  TASKS_MAIL_URL: process.env.TASKS_MAIL_URL || 'https://epost.vfk.no/ews/Exchange.asmx',
  TASKS_MAIL_USERNAME: process.env.TASKS_MAIL_USERNAME || 'domain\\username', // Must have double slash between domain and user
  TASKS_MAIL_PASSWORD: process.env.TASKS_MAIL_PASSWORD || 'password',
  TASKS_MAIL_DOMAIN: process.env.TASKS_MAIL_DOMAIN || 'skole.t-fk.no',
  TASKS_MAIL_OWA_URL: process.env.TASKS_MAIL_OWA_URL || 'https://epost.vfk.no/owa/#path=/inbox',
  TASKS_MAIL_LIMIT: parseInt(process.env.TASKS_MAIL_LIMIT) || 20 // number of uncompleted tasks to get
}
