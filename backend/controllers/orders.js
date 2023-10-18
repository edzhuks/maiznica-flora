const express = require('express')
const Cart = require('../models/cart')
const Order = require('../models/order')
const {
  userExtractor,
  adminRequired,
  verificationRequired,
} = require('../util/middleware')
const Address = require('../models/address')
const router = express.Router()

router.post('/', userExtractor, verificationRequired, async (req, res) => {
  const address = await Address.findById(req.body.id)
  if (!address) {
    return res.status(400).json({ error: 'Address is required' })
  }
  let cart = await Cart.findOne({ user: req.user.id })
  if (!cart) {
    return res.status(400).json({ error: 'User does not have a cart' })
  }
  if (cart.content.length < 1) {
    return res.status(400).json({ error: 'Cannot order an empty cart' })
  }
  const order = new Order({
    user: cart.user,
    content: cart.content,
    address,
    status: { status: 'placed' },
    datePlaced: Date.now(),
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

router.put('/:id', userExtractor, adminRequired, async (req, res) => {
  let newOrder = req.body
  if (
    ![
      'placed',
      'accepted',
      'refused',
      'packing',
      'waitingForDelivery',
      'delivering',
      'completed',
    ].find((s) => s === newOrder.status.status)
  ) {
    return res.status(400).json({ error: 'Invalid order status' })
  }
  newOrder.status.lastModifiedBy = req.user.id
  newOrder.status.lastModified = new Date()
  newOrder.address = newOrder.address.id
  await Order.updateOne({ _id: req.params.id }, newOrder)
  const order = await Order.findById(req.params.id).populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'status', populate: { path: 'lastModifiedBy' } },
  ])
  res.send(order)
})

router.get('/', userExtractor, adminRequired, async (req, res) => {
  const orders = await Order.find().populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'status', populate: { path: 'lastModifiedBy' } },
  ])
  res.send(orders)
})

module.exports = router
