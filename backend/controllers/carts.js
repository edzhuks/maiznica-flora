const express = require('express')
const Cart = require('../models/cart')
const { userExtractor } = require('../util/middleware')
const router = express.Router()

router.get('/', async (req, res) => {
  const carts = await Cart.find()
  res.send(carts)
})

router.get('/:id', async (req, res) => {
  const carts = await Cart.findById(req.params.id)
  res.send(carts)
})

router.post('/', userExtractor, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id })
  if (!cart) {
    cart = await new Cart({
      content: [],
      user: req.user.id,
    })
  }
  if (
    (item = cart.content.find((p) => p.product.equals(req.body.product.id)))
  ) {
    item.quantity += Number(req.body.quantity)
  } else {
    cart.content = cart.content.concat({
      product: req.body.product.id,
      quantity: req.body.quantity,
    })
  }
  await cart.save()
  res.send(cart)
})

module.exports = router
