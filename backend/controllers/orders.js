const express = require('express')
const Cart = require('../models/cart')
const Order = require('../models/order')
const {
  userExtractor,
  adminRequired,
  verificationRequired,
} = require('../util/middleware')
const Address = require('../models/address')
const { sendReceiptEmail } = require('../util/emails')
const { getPrice } = require('../util/functions')
const {
  TEST_MODE,
  BANK_API_USERNAME,
  BANK_API_PASSWORD,
} = require('../util/config')
const router = express.Router()
const axios = require('axios')
const crypto = require('crypto')
const { log } = require('console')

router.put('/:id', userExtractor, adminRequired, async (req, res) => {
  let newOrder = { status: req.body.status }
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
  await Order.updateOne({ _id: req.params.id }, newOrder)
  const order = await Order.findById(req.params.id).populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'status', populate: { path: 'lastModifiedBy' } },
  ])
  res.send(order)
})

router.get('/resend_email', userExtractor, async (req, res) => {
  const order = await Order.findById(req.query.id).populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'user' },
  ])
  console.log(order.user._id)
  console.log(req.user._id)
  if (order.user._id.equals(req.user._id)) {
    sendReceiptEmail(order.user.email, order)
    return res.send()
  }
  return res.status(401).send({ error: 'This is not your order' })
})

router.get('/', userExtractor, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate([
    { path: 'content', populate: { path: 'product' } },
  ])
  res.send(orders)
})
router.get('/all', userExtractor, adminRequired, async (req, res) => {
  const orders = await Order.find().populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'status', populate: { path: 'lastModifiedBy' } },
  ])
  res.send(orders)
})

module.exports = router
