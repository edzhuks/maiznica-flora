const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ email }).populate('addresses')
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: {
        en: 'invalid username or password',
        lv: 'Nepareizs lietotājvārds vai parole',
      },
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({
    token,
    email: user.email,
    admin: user.admin,
    maintainer: user.maintainer,
    addresses: user.addresses,
  })
})

module.exports = router
