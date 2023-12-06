const express = require('express')
const Order = require('../models/order')
const { userExtractor, adminRequired } = require('../util/middleware')
const { sendReceiptEmail, sendReadyForPickupEmail } = require('../util/emails')
const { DPD_API_URL, DPD_AUTH_HEADER, FRONTEND_URL } = require('../util/config')
const router = express.Router()
const axios = require('axios')

const idRequired = async (request, response, next) => {
  if (!request.body.id) {
    return res.status(400).send({
      error: { en: 'ID is required', lv: 'nav norādīts pasūtījuma ID' },
    })
  }
  next()
}

const updateStatus = async (id, status) => {
  const order = await Order.findById(id).populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'user' },
  ])
  order.latestStatus = status
  order.statusHistory = [...order.statusHistory, { status, time: Date.now() }]
  await order.save()
  return order
}

router.put(
  '/ready_for_pickup',
  userExtractor,
  adminRequired,
  idRequired,
  async (req, res) => {
    const order = await updateStatus(req.body.id, 'ready_for_pickup')
    sendReadyForPickupEmail(order.user.email, req.body.message)
    return res.send(order)
  }
)
router.put(
  '/completed',
  userExtractor,
  adminRequired,
  idRequired,
  async (req, res) => {
    const order = await updateStatus(req.body.id, 'completed')
    return res.send(order)
  }
)
router.put(
  '/paid',
  userExtractor,
  adminRequired,
  idRequired,
  async (req, res) => {
    const order = await updateStatus(req.body.id, 'placed')
    return res.send(order)
  }
)
router.put(
  '/ready_for_delivery',
  userExtractor,
  adminRequired,
  idRequired,
  async (req, res) => {
    let order = await Order.findById(req.body.id).populate([
      { path: 'content', populate: { path: 'product' } },
      { path: 'user' },
    ])

    try {
      const response = await axios.post(
        `${DPD_API_URL}/shipments`,
        [
          {
            senderAddress: {
              name: 'Maiznica Flora',
              email: 'edzhuks@gmail.com',
              phone: '+37127869954',
              street: 'Vecvaltes',
              city: 'Krimuldas pagasts',
              postalCode: '2144',
              country: 'LV',
            },
            receiverAddress: {
              name: req.body.deliveryData.name,
              email: req.body.deliveryData.email,
              phone: req.body.deliveryData.phone,
              street: req.body.deliveryData.street,
              streetNo: req.body.deliveryData.streetNo,
              flatNo: req.body.deliveryData.flatNo,
              city: req.body.deliveryData.city,
              postalCode: req.body.deliveryData.postalCode,
              contactInfo: req.body.deliveryData.contactInfo,
              pudoId:
                order.deliveryMethod === 'pickupPoint'
                  ? order.pickupPointData.id
                  : undefined,
              country: 'LV',
            },
            service: {
              serviceAlias:
                order.deliveryMethod === 'courrier' ? 'DPD B2C' : 'DPD Pickup',
            },
            parcels: req.body.deliveryData.parcels,
            shipmentReferences: [order.prettyID],
          },
        ],
        DPD_AUTH_HEADER
      )
      order = await updateStatus(req.body.id, 'ready_for_delivery')
      order.shipmentID = response.data[0].id
      await order.save()
      return res.send(order)
    } catch (e) {
      console.log(e)
      console.log(e && e.response && e.response.data)
      return res
        .status(400)
        .send({ error: e && e.response && e.response.data[0].title })
    }
  }
)
router.put(
  '/waiting_for_courrier',
  userExtractor,
  adminRequired,
  idRequired,
  async (req, res) => {
    const order = await updateStatus(req.body.id, 'waiting_for_courrier')
    return res.send(order)
  }
)
router.put(
  '/delivering',
  userExtractor,
  adminRequired,
  idRequired,
  async (req, res) => {
    const order = await updateStatus(req.body.id, 'delivering')
    return res.send(order)
  }
)

router.get('/resend_email', userExtractor, async (req, res) => {
  const order = await Order.findById(req.query.id).populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'user' },
  ])
  if (order.user._id.equals(req.user._id) || req.user.admin) {
    sendReceiptEmail(
      [order.user.email],
      order,
      `${FRONTEND_URL}/account/previous_orders/${order._id}`
    )
    return res.send()
  }
  return res.status(401).send({
    error: { en: 'This is not your order', lv: 'Šis nav tavs pasūtījums' },
  })
})

router.get('/all', userExtractor, adminRequired, async (req, res) => {
  const search = req.query.search
  console.log(search)
  delete req.query.search
  console.log(search)
  const orders = await Order.find({
    latestStatus: Object.keys(req.query).filter(
      (key) => req.query[key] === 'true'
    ),
    ...(search && { $text: { $search: search } }),
  }).populate([{ path: 'content', populate: { path: 'product' } }])
  res.send(orders)
})
router.get('/:id', userExtractor, async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
  }).populate([
    { path: 'content', populate: { path: 'product' } },
    { path: 'user' },
  ])
  if (order.user.id === req.user.id || req.user.admin) {
    return res.send(order)
  }
  return res.status(401).send({
    error: { en: 'This is not your order', lv: 'Šis nav tavs pasūtījums' },
  })
})
router.get('/', userExtractor, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate([
    { path: 'content', populate: { path: 'product' } },
  ])
  res.send(orders)
})

module.exports = router
