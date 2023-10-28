const bcrypt = require('bcrypt')
const express = require('express')
const { userExtractor } = require('../util/middleware')
const router = express.Router()
const User = require('../models/user')
const Address = require('../models/address')
const Cart = require('../models/cart')
const { TEST_MODE, EMAIL_PASS, FRONTEND_URL } = require('../util/config')
const crypto = require('crypto')
const { sendVerificationEmail, sendResetEmail } = require('../util/emails')

router.get('/', async (req, res) => {
  if (TEST_MODE) {
    const users = await User.find()
    return res.send(users)
  }
  return res.status(404)
})

router.post('/', async (request, response) => {
  const { password, email, admin, maintainer, emailVerified } = request.body

  if (!password) {
    return response.status(400).json({ error: 'password is required' })
  }
  if (!email) {
    return response.status(400).json({ error: 'email is required' })
  }

  let user = await User.findOne({ email })
  if (user) {
    return response.status(400).json({ error: 'This email is already used.' })
  }

  if (
    password.length < 8 ||
    !/\d/.test(password) ||
    !/[!@#$%^&* ]/.test(password) ||
    !/[a-zA-Z]/.test(password)
  ) {
    return response.status(400).json({
      error:
        'Password too weak. Letter, Number and one of !@#$%^&*  is required.',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const emailToken = crypto.randomBytes(128).toString('base64url')
  user = new User({
    passwordHash,
    email,
    admin: admin && TEST_MODE ? true : false,
    maintainer: maintainer && TEST_MODE ? true : false,
    addresses: [],
    emailVerified: emailVerified && TEST_MODE ? true : false,
    emailVerificationToken: emailToken,
  })

  await user.save()

  const newCart = new Cart({
    content: [],
    user: user.id,
  })
  await newCart.save()
  if (!TEST_MODE) {
    sendVerificationEmail(email, emailToken)
  }
  response.status(201).json({
    email: user.email,
    admin: user.admin,
    maintainer: user.maintainer,
    addresses: user.addresses,
    id: user.id,
  })
})

router.get('/verifyEmail/:token', async (req, res) => {
  const token = req.params.token
  const user = await User.findOne({ emailVerificationToken: token })
  if (user) {
    user.emailVerified = true
    await user.save()
    return res.redirect(`${FRONTEND_URL}/email_verified`)
  }
  return res.status(404).send()
})

router.post('/address', userExtractor, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.surname ||
    !req.body.phone ||
    !req.body.city ||
    !req.body.street
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  let user = await User.findById(req.user.id)
  const address = new Address(req.body)
  await address.save()
  user.addresses = user.addresses.concat(address)
  await user.save()
  res.status(201).send(address)
})

router.put('/address', userExtractor, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.surname ||
    !req.body.phone ||
    !req.body.city ||
    !req.body.street ||
    !req.body.id
  ) {
    return res.status(400).json({ error: 'Missing required fields or id' })
  }
  await Address.updateOne({ _id: req.body.id }, req.body)
  const address = await Address.findById(req.body.id)
  res.status(201).send(address)
})
router.delete('/address/:id', userExtractor, async (req, res) => {
  const address = await Address.findByIdAndDelete(req.params.id)
  res.status(201).send(address)
})

router.post('/initiate_reset_password', async (request, response) => {
  const { email } = request.body

  if (!email) {
    return response.status(400).json({ error: 'email is required' })
  }

  let user = await User.findOne({ email })
  if (!user) {
    return response.status(404).json({ error: 'This email is not registered.' })
  }

  const resetToken = crypto.randomBytes(128).toString('base64url')
  user.resetToken = resetToken
  user.resetTokenCreatedAt = Date.now()
  await user.save()

  if (!TEST_MODE) {
    sendResetEmail(email, resetToken)
  }
  response.status(200).json({
    message: 'Verification email sent',
  })
})

router.post('/reset_password', async (request, response) => {
  const { token, password } = request.body

  if (!token) {
    return response.status(400).json({ error: 'token is required' })
  }

  let user = await User.findOne({ resetToken: token })
  if (!user) {
    return response
      .status(404)
      .json({ error: 'Cannot find a user with that token.' })
  }
  user.resetToken = undefined
  if (Date.now() - user.resetTokenCreatedAt < 1000 * 60 * 60) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    user.passwordHash = passwordHash
    await user.save()
    return response.status(200).send()
  }
  return response.status(400).json({ error: 'The token has expired' })
})

router.post('/change_password', userExtractor, async (request, response) => {
  const { oldPassword, newPassword } = request.body

  if (!oldPassword) {
    return response.status(400).json({ error: 'Previous password is required' })
  }
  if (!newPassword) {
    return response.status(400).json({ error: 'New password is required' })
  }
  let user = await User.findById(request.user.id)
  if (!user) {
    return response
      .status(404)
      .json({ error: 'Cannot find a user with that token.' })
  }
  const passwordCorrect = await bcrypt.compare(oldPassword, user.passwordHash)

  if (passwordCorrect) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newPassword, saltRounds)
    user.passwordHash = passwordHash
    await user.save()
    return response.status(200).send()
  }
  return response.status(400).json({ error: 'Previous password incorrect.' })
})

module.exports = router
