const express = require('express')
const Cart = require('../models/cart')
const { userExtractor } = require('../util/middleware')
const router = express.Router()

router.get('/', userExtractor, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'content.product',
  })
  res.send(cart)
})

router.post('/', userExtractor, async (req, res) => {
  if (req.body.quantity < 1) {
    return res.status(400).json({ error: 'Cannot add less than 1 item' })
  }
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

router.put('/', userExtractor, async (req, res) => {
  if (req.body.quantity < 0) {
    return res
      .status(400)
      .json({ error: 'Cannot have a negative amount of item' })
  }
  let cart = await Cart.findOne({ user: req.user.id })
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
    item = { product: req.body.product, quantity: 0 }
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
  res.send(item)
})

router.delete('/:id', userExtractor, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id })
  if (!cart) {
    cart = await new Cart({
      content: [],
      user: req.user.id,
    })
  }
  cart.content = cart.content.filter(
    (item) => !item.product.equals(req.params.id)
  )
  await cart.save()
  res.send(cart)
})

module.exports = router
