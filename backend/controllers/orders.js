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

const getPaymentData = async ({ order, selectedLang }) => {
  try {
    const response = await axios.post(
      'https://igw-demo.every-pay.com/api/v4/payments/oneoff',
      {
        timestamp: new Date(),
        api_username: BANK_API_USERNAME,
        nonce: crypto.randomBytes(16).toString('base64'),
        account_name: 'EUR3D1',
        amount: (order.total / 100).toFixed(2),
        customer_url: `http://new.maiznica.com/api/order/paymentStatus/${order._id}`,
        order_reference: order._id.toString(),
        locale: selectedLang,
      },
      {
        auth: {
          username: BANK_API_USERNAME,
          password: BANK_API_PASSWORD,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    console.log(error.response.data)
    res.status(400).send()
  }
}

router.post('/', userExtractor, verificationRequired, async (req, res) => {
  if (!req.body.deliveryMethod) {
    return res.status(400).json({ error: 'Delivery method is required' })
  }
  if (!req.body.deliveryMethod.method) {
    return res.status(400).json({ error: 'Delivery method is required' })
  }
  if (!req.body.deliveryMethod.address) {
    return res.status(400).json({ error: 'Delivery address is required' })
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
  const deliveryCost =
    subtotal >= 5000
      ? 0
      : req.body.deliveryMethod.method === 'courrier'
      ? 599
      : req.body.deliveryMethod.method === 'bakery'
      ? 0
      : 399
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
    total: 3300,
    vat: total * 0.23,
  })
  const savedOrder = await order.save()
  await savedOrder.populate([
    { path: 'content', populate: { path: 'product' } },
  ])
  await cart.deleteOne()
  const newCart = new Cart({
    content: [],
    user: req.user.id,
  })
  await newCart.save()
  const paymentData = await getPaymentData({
    order: savedOrder,
    selectedLang: req.body.selectedLang,
  })
  savedOrder.paymentStatus = paymentData.payment_state
  savedOrder.paymentReference = paymentData.payment_reference
  await savedOrder.save()
  res.send({
    paymentLink: paymentData.payment_link,
    orderId: savedOrder._id,
  })
  // if (!TEST_MODE) {
  //   sendReceiptEmail(req.user.email, order)
  // }
  // res.send(order)
})

router.get(
  '/pay/:id',
  userExtractor,
  verificationRequired,
  async (req, res) => {
    const order = await Order.findById(req.params.id)

    res.send({
      paymentLink: await getPaymentData({
        order: order,
        selectedLang: req.query.selectedLang,
      }),
    })
  }
)

router.post('/paymentStatus/:id', async (req, res) => {
  console.log(req)
})

router.get('/paymentStatus/:id', async (req, res) => {
  const order = await Order.findById(req.params.id)
  try {
    const response = await axios.get(
      `https://igw-demo.every-pay.com/api/v4/payments/${order.paymentReference}?api_username=${BANK_API_USERNAME}`,

      {
        auth: {
          username: BANK_API_USERNAME,
          password: BANK_API_PASSWORD,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    console.log(response.data)
    order.paymentStatus = response.data.payment_state
    await order.save()
    // return response.data
  } catch (error) {
    console.log(error)
    console.log(error.response.data)
    return res.status(400).send()
  }
  res.send(order)
})

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

router.get('/pay', async (req, res) => {
  axios
    .post(
      'https://igw-demo.every-pay.com/api/v4/payments/oneoff',
      {
        timestamp: new Date(),
        api_username: '993bbc1f9f94fa86',
        nonce: crypto.randomBytes(16).toString('base64'),
        account_name: 'EUR3D1',
        amount: 0.01,
        customer_url: 'http://new.maiznica.com',
        order_reference: 1,
      },
      {
        auth: {
          username: '993bbc1f9f94fa86',
          password: 'd568a98bc44e7a8c8308373e010a1084',
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    .then((response) => {
      res.redirect(response.data.payment_link)
    })
    .catch((e) => console.log(e.response.data))
  // axios
  //   .get(
  //     'https://igw-demo.every-pay.com/api/v4/processing_accounts/EUR3D1?api_username:993bbc1f9f94fa86',

  //     {
  //       auth: {
  //         username: '993bbc1f9f94fa86',
  //         password: 'd568a98bc44e7a8c8308373e010a1084',
  //       },
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     // res.redirect(response.data.payment_link)
  //     console.log(response.data)
  //   })
  //   .catch((e) => console.log(e.response.data))
  // res.status(200).send()
})

module.exports = router
