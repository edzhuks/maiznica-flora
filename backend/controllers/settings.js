const express = require('express')
const { userExtractor, adminRequired } = require('../util/middleware')
const settingRouter = express.Router()
const Settings = require('../models/settings')

settingRouter.post(
  '/contact_form_emails',
  userExtractor,
  adminRequired,
  async (req, res) => {
    let settings = await Settings.findOne({})
    if (!settings) {
      settings = new Settings()
    }
    settings.contactFormEmails = req.body
    await settings.save()
    res.send({ contactFormEmails: settings.contactFormEmails })
  }
)
settingRouter.get(
  '/contact_form_emails',
  userExtractor,
  adminRequired,
  async (req, res) => {
    let settings = await Settings.findOne({})
    if (!settings) {
      settings = new Settings()
    }
    res.send({ contactFormEmails: settings.contactFormEmails })
  }
)
settingRouter.post(
  '/order_notification_emails',
  userExtractor,
  adminRequired,
  async (req, res) => {
    let settings = await Settings.findOne({})
    if (!settings) {
      settings = new Settings()
    }
    settings.orderNotificationEmails = req.body
    await settings.save()
    res.send({ orderNotificationEmails: settings.orderNotificationEmails })
  }
)
settingRouter.get(
  '/order_notification_emails',
  userExtractor,
  adminRequired,
  async (req, res) => {
    let settings = await Settings.findOne({})
    if (!settings) {
      settings = new Settings()
    }
    res.send({ orderNotificationEmails: settings.orderNotificationEmails })
  }
)
module.exports = settingRouter
