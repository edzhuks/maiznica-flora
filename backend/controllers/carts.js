const express = require('express')
const Cart = require('../models/cart')
const router = express.Router()

router.get('/', async (req, res) => {
  const carts = await Cart.find()
  res.send(carts)
})

router.get('/:id', async (req, res) => {
  const carts = await Cart.findById(req.params.id)
  res.send(carts)
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const cart = new Cart(req.body)
  await cart.save()
  res.send(cart)
})

module.exports = router
