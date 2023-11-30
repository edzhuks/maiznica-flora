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
    return res
      .status(400)
      .send({ error: { en: 'Name is required', lv: 'Nav norādīts vārds' } })
  }
  if (!req.body.email) {
    return res
      .status(400)
      .send({ error: { en: 'Email is required', lv: 'Nav norādīts e-pasts' } })
  }
  if (!req.body.message) {
    return res
      .status(400)
      .send({ error: { en: 'Message is required', lv: 'Nav ziņojuma' } })
  }
  try {
    const settings = await Settings.findOne({})
    await sendContactFormEmail(
      settings.contactFormEmails.map((e) => e.email),
      req.body.name,
      req.body.message,
      req.body.email
    )
  } catch (error) {
    try {
      await sendContactFormFailedEmail(req.body.email, req.body.message)
      return res.status(400).send({
        error: {
          en: 'Failed to send form, please send an email',
          lv: 'Neizdevās nosūtīt ziņojumu, lūdzu sazinieties pa e-pastu',
        },
      })
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
    return res.status(400).send({
      error: {
        en: 'Failed to send form, please send an email',
        lv: 'Neizdevās nosūtīt ziņojumu, lūdzu sazinieties pa e-pastu',
      },
    })
  }
})
module.exports = contactRouter
