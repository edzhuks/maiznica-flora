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

router.put('/:id', userExtractor, async (req, res) => {
  let newOrder = req.body
  newOrder.status.lastModifiedBy = req.user.id
  newOrder.status.lastModified = new Date()
  console.log(newOrder)
  const orderr = await Order.findById(req.params.id)
  console.log(req.params.id)
  await Order.updateOne({ _id: req.params.id }, newOrder)
  const order = await Order.findById(req.params.id).populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'status', populate: { path: 'lastModifiedBy' } },
  ])

  res.send(order)
})

router.get('/', async (req, res) => {
  const orders = await Order.find().populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'status', populate: { path: 'lastModifiedBy' } },
  ])
  res.send(orders)
})

module.exports = router
