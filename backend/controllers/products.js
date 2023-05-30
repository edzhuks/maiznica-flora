const express = require('express')
const Product = require('../models/product')
const router = express.Router()

router.get('/', async (req, res) => {
  const products = await Product.find()
  res.send(products)
})

router.get('/:id', async (req, res) => {
  const products = await Product.findById(req.params.id)
  res.send(products)
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const product = new Product(req.body)
  await product.save()
  res.send(product)
})

module.exports = router
