const express = require('express')
const Cart = require('../models/cart')
const { userExtractor, verificationRequired } = require('../util/middleware')
const {
  isInteger,
  makeOrderID,
  getDeliveryCost,
  getSubtotal,
} = require('../util/functions')
const Address = require('../models/address')
const { BACKEND_URL, FRONTEND_URL } = require('../util/config')
const router = express.Router()
const Order = require('../models/order')
const { sendReceiptEmail } = require('../util/emails')
const { getPrice } = require('../util/functions')
const {
  TEST_MODE,
  BANK_API_USERNAME,
  BANK_API_PASSWORD,
  BANK_API_URL,
} = require('../util/config')
const axios = require('axios')
const crypto = require('crypto')
const Settings = require('../models/settings')

const getPaymentData = async ({ cart, selectedLang }) => {
  const response = await axios.post(
    `${BANK_API_URL}/oneoff`,
    {
      timestamp: new Date(),
      api_username: BANK_API_USERNAME,
      nonce: crypto.randomBytes(16).toString('base64'),
      account_name: 'EUR3D1',
      amount: (cart.total / 100).toFixed(2),
      customer_url: `${FRONTEND_URL}/order_process/check_status`,
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

const prepareForOrder = async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'courrierAddress' },
  ])
  if (!cart) {
    return res.status(400).json({
      error: { en: 'User does not have a cart', lv: 'Grozs netika atrasts' },
    })
  }
  if (cart.content.length < 1) {
    return res.status(400).json({
      error: {
        en: 'Cannot order an empty cart',
        lv: 'Nevar pasūtīt tukšu grozu',
      },
    })
  }
  if (!cart.deliveryMethod) {
    return res.status(400).json({
      error: {
        en: 'Delivery method is required',
        lv: 'Nav izvēlēta piegādes metode',
      },
    })
  }
  if (cart.deliveryMethod === 'courrier' && !cart.courrierAddress) {
    return res.status(400).json({
      error: {
        en: 'Delivery address is required',
        lv: 'Nav norādīta piegādes adrese',
      },
    })
  }
  if (
    cart.deliveryMethod === 'pickupPoint' &&
    (!cart.pickupPointData ||
      !cart.pickupPointData.id ||
      !cart.pickupPointData.name ||
      !cart.pickupPointData.surname ||
      !cart.pickupPointData.phone)
  ) {
    return res.status(400).json({
      error: {
        en: 'Pickup point delivery data is missing',
        lv: 'Trūkst piegādes infromāciajas',
      },
    })
  }

  const subtotal = getSubtotal(cart.content)
  const deliveryCost = getDeliveryCost(subtotal, cart.deliveryMethod)
  const total = subtotal + deliveryCost
  cart.total = total
  cart = await cart.save()
  req.cart = cart
  next()
}

router.post(
  '/pay',
  userExtractor,
  verificationRequired,
  prepareForOrder,
  async (req, res) => {
    let cart = req.cart
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
        paymentReference: paymentData.payment_reference,
        orderId: cart._id,
      })
    } catch (error) {
      console.log(error)
      if (error.response.data.error.code === 4024) {
        await cart.deleteOne()
        const newCart = new Cart({
          content: [],
          user: req.user.id,
          courrierAddress: cart.courrierAddress,
          pickupPointData: cart.pickupPointData,
          deliveryPhone: cart.deliveryPhone,
          businessComments: cart.businessComments,
          generalComments: cart.generalComments,
          deliveryComments: cart.deliveryComments,
        })
        await newCart.save()
        res.status(400).send({
          error: {
            en: 'Order is already paid',
            lv: 'Pasūtījums jau ir apmaksāts',
          },
        })
      }
      console.log(error.response.data.error)
    }
  }
)

router.post(
  '/invoice',
  userExtractor,
  verificationRequired,
  prepareForOrder,
  async (req, res) => {
    const cart = req.cart
    const subtotal = getSubtotal(cart.content)
    const deliveryCost = getDeliveryCost(subtotal, cart.deliveryMethod)
    const total = subtotal + deliveryCost
    let order = new Order({
      user: cart.user,
      content: cart.content,
      deliveryMethod: cart.deliveryMethod,
      courrierAddress: cart.courrierAddress,
      pickupPointData: cart.pickupPointData,
      deliveryPhone: cart.deliveryPhone,
      deliveryCost: cart.deliveryCost,
      datePlaced: Date.now(),
      subtotal: subtotal,
      deliveryCost: deliveryCost,
      total: total,
      vat: total * 0.21,
      businessComments: cart.businessComments,
      generalComments: cart.generalComments,
      deliveryComments: cart.deliveryComments,
      latestStatus: 'invoiced',
      statusHistory: [{ status: 'invoiced', time: Date.now() }],
      prettyID: makeOrderID(),
    })
    order = await order.save()
    if (!TEST_MODE) {
      await order.populate([
        { path: 'content', populate: { path: 'product' } },
        { path: 'user' },
      ])
      const settings = await Settings.findOne({})
      try {
        await sendReceiptEmail(
          [...settings.orderNotificationEmails.map((e) => e.email)],
          order,
          `${FRONTEND_URL}/orders/${order._id}`
        )
        await sendReceiptEmail(
          [order.user.email],
          order,
          `${FRONTEND_URL}/account/previous_orders/${order._id}`
        )
      } catch (error) {
        console.error(error)
      }
    }

    await cart.deleteOne()
    const newCart = new Cart({
      content: [],
      user: order.user.id,
      courrierAddress: cart.courrierAddress,
      pickupPointData: cart.pickupPointData,
      deliveryPhone: cart.deliveryPhone,
      businessComments: cart.businessComments,
      generalComments: cart.generalComments,
      deliveryComments: cart.deliveryComments,
    })
    await newCart.save()

    return res.status(200).send()
  }
)

const updatePaymentStatus = async (paymentReference) => {
  const cart = await Cart.findOne({
    paymentReference,
  }).populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'courrierAddress' },
  ])
  if (cart) {
    try {
      const response = await axios.get(
        `${BANK_API_URL}/${cart.paymentReference}?api_username=${BANK_API_USERNAME}`,

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
      if (response.data.payment_state === 'settled') {
        if (cart.paymentStatus !== 'settled') {
          const subtotal = getSubtotal(cart.content)
          const deliveryCost = getDeliveryCost(subtotal, cart.deliveryMethod)
          const total = subtotal + deliveryCost
          let order = new Order({
            user: cart.user,
            content: cart.content,
            deliveryMethod: cart.deliveryMethod,
            courrierAddress: cart.courrierAddress,
            pickupPointData: cart.pickupPointData,
            deliveryPhone: cart.deliveryPhone,
            deliveryCost: cart.deliveryCost,
            datePlaced: Date.now(),
            subtotal: subtotal,
            deliveryCost: deliveryCost,
            total: total,
            vat: total * 0.21,
            paymentReference: cart.paymentReference,
            paymentStatus: 'settled',
            businessComments: cart.businessComments,
            generalComments: cart.generalComments,
            deliveryComments: cart.deliveryComments,
            latestStatus: 'placed',
            statusHistory: [{ status: 'placed', time: Date.now() }],
            prettyID: makeOrderID(),
          })
          order = await order.save()
          if (order.total !== cart.total) {
            order.paymentStatus = 'price_mismatch'
            order = await order.save()
          }
          if (!TEST_MODE) {
            await order.populate([
              { path: 'content', populate: { path: 'product' } },
              { path: 'user' },
            ])
            const settings = await Settings.findOne({})
            try {
              await sendReceiptEmail(
                [...settings.orderNotificationEmails.map((e) => e.email)],
                order,
                `${FRONTEND_URL}/orders/${order._id}`
              )
              await sendReceiptEmail(
                [order.user.email],
                order,
                `${FRONTEND_URL}/account/previous_orders/${order._id}`
              )
            } catch (error) {
              console.error(error)
            }
          }

          await cart.deleteOne()
          const newCart = new Cart({
            content: [],
            user: order.user.id,
            courrierAddress: cart.courrierAddress,
            pickupPointData: cart.pickupPointData,
            deliveryPhone: cart.deliveryPhone,
            businessComments: cart.businessComments,
            generalComments: cart.generalComments,
            deliveryComments: cart.deliveryComments,
          })
          await newCart.save()
        }
        return
      } else if (
        response.data.payment_state === 'abandoned' ||
        response.data.payment_state === 'failed' ||
        response.data.payment_state === 'voided'
      ) {
        cart.paymentStatus = 'failed'
      } else {
        cart.paymentStatus = response.data.payment_state
      }
      await cart.save()
    } catch (error) {
      console.log(error)
    }
  }
}

router.get('/payment_status_callback', async (req, res) => {
  updatePaymentStatus(req.query.payment_reference)
  return res.status(200).send()
})

router.get('/payment_status/', userExtractor, async (req, res) => {
  const order = await Order.findOne({
    paymentReference: req.query.paymentReference,
  })
  if (order) {
    return res.status(200).send(order)
  }
  const cart = await Cart.findOne({
    paymentReference: req.query.paymentReference,
  })
  return res.status(200).send(cart)
})

router.get('/', userExtractor, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'content.product',
  })
  if (!cart || cart.paymentStatus === 'settled') {
    cart = new Cart({
      content: [],
      user: req.user.id,
    })
    await cart.save()
  }
  res.send(cart)
})

router.post('/', userExtractor, verificationRequired, async (req, res) => {
  if (!isInteger(req.body.quantity)) {
    return res.status(400).json({
      error: {
        en: 'Quantity must be a whole number',
        lv: 'Daudzumam ir jābūt veselam skaitlim',
      },
    })
  }
  if (!req.body.productId) {
    return res.status(400).json({
      error: { en: 'Product not specified', lv: 'Produkts nav norādīts' },
    })
  }
  let cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'content.product',
  })

  if (!cart || cart.paymentStatus === 'settled') {
    cart = new Cart({
      content: [],
      user: req.user.id,
    })
    await cart.save()
  }

  if ((item = cart.content.find((p) => p.product.equals(req.body.productId)))) {
    item.quantity += Number(req.body.quantity)
    if (item.quantity <= 0) {
      cart.content = cart.content.filter(
        (item) => !item.product.equals(req.body.productId)
      )
    }
  } else {
    if (Number(req.body.quantity) <= 0) {
      return res.status(400).json({
        error: {
          en: 'Cannot add less than 1 item',
          lv: 'Nevar ielikt grozā mazāk par 1 vienību',
        },
      })
    }
    cart.content = cart.content.concat({
      product: req.body.productId,
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
    !req.body.hasOwnProperty('courrierAddress') &&
    !req.body.hasOwnProperty('pickupPointData') &&
    !req.body.hasOwnProperty('deliveryPhone') &&
    !req.body.hasOwnProperty('deliveryMethod') &&
    !req.body.hasOwnProperty('businessComments') &&
    !req.body.hasOwnProperty('generalComments') &&
    !req.body.hasOwnProperty('deliveryComments')
  ) {
    return res
      .status(400)
      .json({ error: { en: 'Unknown fields', lv: 'Nezināmi lauki' } })
  }
  let cart = await Cart.findOne({ user: req.user.id })
  if (req.body.hasOwnProperty('courrierAddress')) {
    if (req.body.courrierAddress === 'unset') {
      cart.courrierAddress = undefined
    } else {
      cart.courrierAddress = req.body.courrierAddress
    }
    await cart.save()
    return res.status(201).send({ courrierAddress: cart.courrierAddress })
  }
  if (req.body.hasOwnProperty('pickupPointData')) {
    cart.pickupPointData = { ...req.body.pickupPointData }
    await cart.save()
    return res.status(201).send({ pickupPointData: cart.pickupPointData })
  }
  if (req.body.hasOwnProperty('deliveryPhone')) {
    cart.deliveryPhone = req.body.deliveryPhone
    await cart.save()
    return res.status(201).send({ deliveryPhone: cart.deliveryPhone })
  }
  if (req.body.hasOwnProperty('businessComments')) {
    if (
      req.body.businessComments.name === '' &&
      req.body.businessComments.address === '' &&
      req.body.businessComments.regNo === ''
    ) {
      cart.businessComments = undefined
    } else {
      cart.businessComments = req.body.businessComments
    }
    await cart.save()
    return res.status(201).send({ businessComments: cart.businessComments })
  }
  if (req.body.hasOwnProperty('generalComments')) {
    cart.generalComments = req.body.generalComments
    await cart.save()
    return res.status(201).send({ generalComments: cart.generalComments })
  }
  if (req.body.hasOwnProperty('deliveryComments')) {
    cart.deliveryComments = req.body.deliveryComments
    await cart.save()
    return res.status(201).send({ deliveryComments: cart.deliveryComments })
  }
  cart.deliveryMethod = req.body.deliveryMethod
  await cart.save()
  return res.status(201).send({ deliveryMethod: cart.deliveryMethod })
})

module.exports = router
