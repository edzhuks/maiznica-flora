const bcrypt = require('bcrypt')
const express = require('express')
const { userExtractor } = require('../util/middleware')
const router = express.Router()
const User = require('../models/user')
const Address = require('../models/address')
const Cart = require('../models/cart')

router.get('/', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

router.post('/', async (request, response) => {
  const { username, password, email, admin, maintainer } = request.body
  if (!username) {
    return response.status(400).json({ error: 'username is required' })
  }
  if (!password) {
    return response.status(400).json({ error: 'password is required' })
  }
  if (!email) {
    return response.status(400).json({ error: 'email is required' })
  }

  let user = await User.findOne({ username })
  if (user) {
    return response.status(400).json({ error: 'Username already taken.' })
  }

  user = await User.findOne({ email })
  if (user) {
    return response.status(400).send('This email is already used.')
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

  user = new User({
    username,
    passwordHash,
    email,
    admin: admin ?? false,
    maintainer: maintainer ?? false,
    addresses: [],
  })

  const savedUser = await user.save()

  const newCart = new Cart({
    content: [],
    user: savedUser.id,
  })
  await newCart.save()

  response.status(201).json(savedUser)
})

router.post('/address', userExtractor, async (req, res) => {
  let user = await User.findById(req.user.id)
  const address = new Address(req.body)
  await address.save()
  user.addresses = user.addresses.concat(address)
  await user.save()
  res.send(address)
})

module.exports = router
