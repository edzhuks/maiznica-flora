const express = require('express')
const Product = require('../models/product')
const Category = require('../models/category')
const { getCatalogue } = require('./categories')
const router = express.Router()

router.put('/discount/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  product.discountPrice = req.body.discountPrice
  await product.save()
  res.send(product)
})

router.delete('/discount/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  product.discountPrice = undefined
  await product.save()
  res.send(product)
})

router.get('/', async (req, res) => {
  const products = await Product.find()
  res.send(products)
})

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.send(product)
})

router.delete('/:id', async (req, res) => {
  await Product.deleteOne({ _id: req.params.id })
  res.status(204)
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const product = new Product(req.body)
  await product.save()
  const topCategory = await Category.findById('all')
  topCategory.products.push(product._id)
  await topCategory.save()
  const newsCategory = await Category.findById('new')
  newsCategory.products.push(product._id)
  await newsCategory.save()
  let catalogue = await getCatalogue()
  res.send(catalogue)
})

module.exports = router
