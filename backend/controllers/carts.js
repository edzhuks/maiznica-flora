const express = require('express')
const Cart = require('../models/cart')
const { userExtractor, verificationRequired } = require('../util/middleware')
const { isPositiveInteger } = require('../util/functions')
const router = express.Router()

router.get('/', userExtractor, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'content.product',
  })
  res.send(cart)
})

router.post('/', userExtractor, verificationRequired, async (req, res) => {
  if (!isPositiveInteger(req.body.quantity)) {
    return res.status(400).send('Cannot add less than 1 item')
  }
  if (!req.body.product) {
    return res.status(400).send('Product missing')
  }
  if (!req.body.product.id) {
    return res.status(400).send('Product id missing')
  }
  let cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'content.product',
  })
  if (!cart) {
    cart = await new Cart({
      content: [],
      user: req.user.id,
    })
  }
  if (req.body.quantity === 0) {
    cart.content = cart.content.filter(
      (item) => !item.product.equals(req.body.product.id)
    )
  } else {
    if (
      (item = cart.content.find((p) => p.product.equals(req.body.product.id)))
    ) {
      item.quantity = Number(req.body.quantity)
    } else {
      cart.content = cart.content.concat({
        product: req.body.product.id,
        quantity: req.body.quantity,
      })
    }
  }
  await cart.save()
  await cart.populate({
    path: 'content.product',
  })
  res.status(201).send(cart)
})

module.exports = router
