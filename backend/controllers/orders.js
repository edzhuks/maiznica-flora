const express = require('express')
const Cart = require('../models/cart')
const Order = require('../models/order')
const { userExtractor } = require('../util/middleware')
const Address = require('../models/address')
const router = express.Router()

router.post('/', userExtractor, async (req, res) => {
  const address = await Address.findById(req.body.id)
  if (!address) {
    return res.status(400).json({ error: 'Address is required' })
  }
  let cart = await Cart.findOne({ user: req.user.id })
  const order = new Order({
    user: cart.user,
    content: cart.content,
    address,
  })
  await order.save()
  await cart.deleteOne()
  const newCart = new Cart({
    content: [],
    user: req.user.id,
  })
  await newCart.save()
  res.send(order)
})

module.exports = router
