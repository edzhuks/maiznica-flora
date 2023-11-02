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
const router = express.Router()

router.post('/', userExtractor, verificationRequired, async (req, res) => {
  if (!req.body.deliveryMethod.method) {
    return res.status(400).json({ error: 'Delivery method is required' })
  }
  let cart = await Cart.findOne({ user: req.user.id }).populate([
    { path: 'content', populate: { path: 'product' } },
  ])
  if (!cart) {
    return res.status(400).json({ error: 'User does not have a cart' })
  }
  if (cart.content.length < 1) {
    return res.status(400).json({ error: 'Cannot order an empty cart' })
  }
  const subtotal = cart.content
    .map((i) => getPrice(i) * i.quantity)
    .reduce((acc, cur) => acc + cur, 0)
  const deliveryCost = subtotal >= 5000 ? 0 : req.body.deliveryMethod.cost
  const total = subtotal + deliveryCost
  console.log(subtotal)
  console.log(deliveryCost)
  console.log(total)
  const order = new Order({
    user: cart.user,
    content: cart.content,
    deliveryMethod: req.body.deliveryMethod,
    status: { status: 'placed' },
    datePlaced: Date.now(),
    subtotal,
    deliveryCost,
    total,
    vat: total * 0.23,
  })
  await order.save()
  await order.populate([{ path: 'content', populate: { path: 'product' } }])
  await cart.deleteOne()
  const newCart = new Cart({
    content: [],
    user: req.user.id,
  })
  await newCart.save()
  sendReceiptEmail(req.user.email, order)
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
