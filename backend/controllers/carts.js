const express = require('express')
const Cart = require('../models/cart')
const { userExtractor, verificationRequired } = require('../util/middleware')
const { isInteger } = require('../util/functions')
const Address = require('../models/address')
const { BACKEND_URL } = require('../util/config')
const router = express.Router()
const Order = require('../models/order')
const { sendReceiptEmail } = require('../util/emails')
const { getPrice } = require('../util/functions')
const {
  TEST_MODE,
  BANK_API_USERNAME,
  BANK_API_PASSWORD,
} = require('../util/config')
const axios = require('axios')
const crypto = require('crypto')
const { log } = require('console')

const getPaymentData = async ({ cart, selectedLang }) => {
  const response = await axios.post(
    'https://igw-demo.every-pay.com/api/v4/payments/oneoff',
    {
      timestamp: new Date(),
      api_username: BANK_API_USERNAME,
      nonce: crypto.randomBytes(16).toString('base64'),
      account_name: 'EUR3D1',
      amount: (cart.total / 100).toFixed(2),
      customer_url: `http://new.maiznica.com/api/cart/payment_landing`,
      order_reference: cart._id.toString(),
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

  return response.data
}

router.post('/pay', userExtractor, verificationRequired, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate([
    { path: 'content', populate: { path: 'product' } },
  ])
  if (!cart) {
    return res.status(400).json({ error: 'User does not have a cart' })
  }
  if (cart.content.length < 1) {
    return res.status(400).json({ error: 'Cannot order an empty cart' })
  }
  if (!cart.deliveryMethod) {
    return res.status(400).json({ error: 'Delivery method is required' })
  }
  let courrierAddress
  if (cart.deliveryMethod === 'courrier') {
    if (!cart.courrierAddress) {
      return res.status(400).json({ error: 'Delivery address is required' })
    }
    courrierAddress = await Address.findById(cart.courrierAddress)
    if (!courrierAddress) {
      return res.status(400).json({ error: 'Delivery address is required' })
    }
  }
  if (
    cart.deliveryMethod === 'pickupPoint' &&
    (!cart.pickupPointData ||
      !cart.pickupPointData.id ||
      !cart.pickupPointData.name ||
      !cart.pickupPointData.surname ||
      !cart.pickupPointData.phone)
  ) {
    return res
      .status(400)
      .json({ error: 'Pickup point delivery data is missing' })
  }

  const subtotal = cart.content
    .map((i) => getPrice(i) * i.quantity)
    .reduce((acc, cur) => acc + cur, 0)
  const deliveryCost =
    subtotal >= 6000
      ? 0
      : cart.deliveryMethod === 'courrier'
      ? 599
      : cart.deliveryMethod === 'bakery'
      ? 0
      : 399
  const total = subtotal + deliveryCost
  cart.total = total
  cart = await cart.save()
  try {
    const paymentData = await getPaymentData({
      cart: cart,
      selectedLang: req.body.selectedLang,
    })
    cart.paymentStatus = paymentData.payment_state
    cart.paymentReference = paymentData.payment_reference
    cart = await cart.save()
    return res.send({
      paymentLink: paymentData.payment_link,
      orderId: cart._id,
    })
  } catch (error) {
    if (error.response.data.error.code === 4024) {
      await cart.deleteOne()
      const newCart = new Cart({
        content: [],
        user: req.user.id,
        courrierAddress: cart.courrierAddress,
        pickupPointData: cart.pickupPointData,
        deliveryPhone: cart.deliveryPhone,
      })
      await newCart.save()
      res.status(400).send({ error: 'already paid' })
    }
    console.log(error)
    console.log(error.response.data.error)
  }
})

router.get(
  '/pay/:id',
  userExtractor,
  verificationRequired,
  async (req, res) => {
    const cart = await Cart.findById(req.params.id)

    const paymentData = await getPaymentData({
      cart,
      selectedLang: req.query.selectedLang,
    })
    cart.paymentStatus = paymentData.payment_state
    cart.paymentReference = paymentData.payment_reference
    await cart.save()
    res.send({
      paymentLink: paymentData.payment_link,
    })
  }
)

const updatePaymentStatus = async (paymentReference) => {
  const cart = await Cart.findOne({
    paymentReference,
  })
  try {
    const response = await axios.get(
      `https://igw-demo.every-pay.com/api/v4/payments/${cart.paymentReference}?api_username=${BANK_API_USERNAME}`,

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
    if (
      response.data.payment_state === 'settled' &&
      cart.paymentStatus !== 'settled'
    ) {
      if (!TEST_MODE) {
        await cart.populate([
          { path: 'content', populate: { path: 'product' } },
          { path: 'user' },
        ])
        sendReceiptEmail(cart.user.email, order)
      }
      const order = new Order({
        user: cart.user,
        content: cart.content,
        deliveryMethod: cart.deliveryMethod,
        courrierAddress: courrierAddress,
        pickupPointData: cart.pickupPointData,
        deliveryPhone: cart.deliveryPhone,
        deliveryCost: deliveryCost,
        status: { status: 'placed' },
        datePlaced: Date.now(),
        subtotal,
        deliveryCost,
        total,
        vat: total * 0.21,
        paymentReference: cart.paymentReference,
        paymentStatus: cart.paymentStatus,
      })

      await cart.deleteOne()
      const newCart = new Cart({
        content: [],
        user: req.user.id,
        courrierAddress: cart.courrierAddress,
        pickupPointData: cart.pickupPointData,
        deliveryPhone: cart.deliveryPhone,
      })
      await newCart.save()
    }
    if (
      response.data.payment_state === 'abandoned' ||
      response.data.payment_state === 'failed' ||
      response.data.payment_state === 'voided'
    ) {
      order.paymentStatus = 'failed'
    } else {
      order.paymentStatus = response.data.payment_state
    }
    await order.save()
  } catch (error) {
    console.log(error)
  }
}

router.get('/payment_status_callback', async (req, res) => {
  console.log('callback')
  console.log(req.query)
  updatePaymentStatus(req.query.payment_reference)
  return res.status(200).send()
})

router.get('/payment_landing', async (req, res) => {
  updatePaymentStatus(req.query.payment_reference)
  res.status(200).send(`<html><head><style>.container{
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #45941e;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #45941e transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style></head><body><div class="container"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></body></html>`)
})

router.get('/payment_status/:id', async (req, res) => {
  const cart = await Cart.findById(req.params.id)
  return res.status(200).send(cart)
})

router.get('/', userExtractor, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'content.product',
  })
  res.send(cart)
})

router.post('/', userExtractor, verificationRequired, async (req, res) => {
  if (!isInteger(req.body.quantity)) {
    return res.status(400).json({ error: 'Quantity must be a whole number' })
  }
  if (!req.body.product) {
    return res.status(400).json({ error: 'Product missing' })
  }
  if (!req.body.product.id) {
    return res.status(400).json({ error: 'Product id missing' })
  }
  let cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'content.product',
  })

  if (!cart || cart.paymentStatus === 'settled') {
    cart = await new Cart({
      content: [],
      user: req.user.id,
    })
  }

  if (
    (item = cart.content.find((p) => p.product.equals(req.body.product.id)))
  ) {
    item.quantity += Number(req.body.quantity)
    if (item.quantity <= 0) {
      cart.content = cart.content.filter(
        (item) => !item.product.equals(req.body.product.id)
      )
    }
  } else {
    if (Number(req.body.quantity) <= 0) {
      return res.status(400).json({ error: 'Cannot add less than 1 item' })
    }
    cart.content = cart.content.concat({
      product: req.body.product.id,
      quantity: Number(req.body.quantity),
    })
  }

  await cart.save()
  await cart.populate({
    path: 'content.product',
  })
  res.status(201).send({ content: cart.content })
})

router.put('/', userExtractor, verificationRequired, async (req, res) => {
  if (
    !req.body.courrierAddress &&
    !req.body.pickupPointData &&
    !req.body.deliveryPhone &&
    !req.body.deliveryMethod
  ) {
    return res.status(400).json({ error: 'Unknown fields' })
  }
  let cart = await Cart.findOne({ user: req.user.id })
  if (req.body.courrierAddress) {
    if (req.body.courrierAddress === 'unset') {
      cart.courrierAddress = undefined
    } else {
      cart.courrierAddress = req.body.courrierAddress
    }
    await cart.save()
    return res.status(201).send({ courrierAddress: cart.courrierAddress })
  }
  if (req.body.pickupPointData) {
    cart.pickupPointData = { ...req.body.pickupPointData }
    await cart.save()
    return res.status(201).send({ pickupPointData: cart.pickupPointData })
  }
  if (req.body.deliveryPhone) {
    cart.deliveryPhone = req.body.deliveryPhone
    await cart.save()
    return res.status(201).send({ deliveryPhone: cart.deliveryPhone })
  }
  cart.deliveryMethod = req.body.deliveryMethod
  await cart.save()
  return res.status(201).send({ deliveryMethod: cart.deliveryMethod })
})

module.exports = router
