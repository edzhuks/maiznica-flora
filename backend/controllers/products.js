const express = require('express')
const Product = require('../models/product')
const Category = require('../models/category')
const { getCatalogue } = require('./categories')
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
  const topCategory = await Category.findById('all')
  topCategory.products.push(product._id)
  await topCategory.save()
  let catalogue = await getCatalogue()
  res.send(catalogue)
})

module.exports = router
