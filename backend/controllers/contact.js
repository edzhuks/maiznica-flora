const express = require('express')
const { userExtractor, adminRequired } = require('../util/middleware')
const {
  sendContactFormEmail,
  sendContactFormConfirmEmail,
  sendContactFormFailedEmail,
} = require('../util/emails')
const contactRouter = express.Router()
const Settings = require('../models/settings')

contactRouter.post('/contact_form', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ error: 'Name is required' })
  }
  if (!req.body.email) {
    return res.status(400).send({ error: 'Email is required' })
  }
  if (!req.body.message) {
    return res.status(400).send({ error: 'Message is required' })
  }
  try {
    const settings = await Settings.findOne({})
    console.log(settings)
    await sendContactFormEmail(
      settings.contactFormEmails.map((e) => e.email),
      req.body.name,
      req.body.message
    )
  } catch (error) {
    try {
      await sendContactFormFailedEmail(req.body.email, req.body.message)
      return res
        .status(400)
        .send({ error: 'Failed to send form, please send an email' })
    } catch (error) {
      console.log(error)
    }
  }
  try {
    await sendContactFormConfirmEmail(
      req.body.email,
      req.body.name,
      req.body.message
    )
    return res.status(200).send()
  } catch (error) {
    return res
      .status(400)
      .send({ error: 'Failed to send form, please send an email' })
  }
})
module.exports = contactRouter
