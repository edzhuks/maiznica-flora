const express = require('express')
const Product = require('../models/product')
const Category = require('../models/category')
const { getCatalogue } = require('./categories')
const {
  userExtractor,
  productChecker,
  adminRequired,
} = require('../util/middleware')
const { isPositiveInteger } = require('../util/functions')
const category = require('../models/category')
const router = express.Router()

router.put('/discount/:id', userExtractor, adminRequired, async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!isPositiveInteger(req.body.discountPrice)) {
    return res
      .status(400)
      .json({
        error: 'Discounted price must be a positive integer amount in cents',
      })
  }
  if (product.price < req.body.discountPrice) {
    return res
      .status(400)
      .json({ error: 'Discounted price must be smaller than base price' })
  }
  product.discountPrice = req.body.discountPrice
  await product.save()
  res.send(product)
})

router.delete(
  '/discount/:id',
  userExtractor,
  adminRequired,
  async (req, res) => {
    const product = await Product.findById(req.params.id)
    product.discountPrice = undefined
    await product.save()
    res.status(204).send(product)
  }
)

router.get('/', async (req, res) => {
  const products = await Product.find()
  res.send(products)
})

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.send(product)
})

router.delete('/:id', userExtractor, adminRequired, async (req, res) => {
  await Product.deleteOne({ _id: req.params.id })
  const categories = await Category.find()
  for (const c of categories) {
    c.products.pull({ _id: req.params.id })
    await c.save()
  }
  res.status(204).end()
})

router.put(
  '/:id',
  userExtractor,
  adminRequired,
  productChecker,
  async (req, res) => {
    await Product.updateOne({ _id: req.params.id }, req.body.product)
    const product = await Product.findById(req.params.id)
    res.status(200).send(product)
  }
)

router.post(
  '/',
  userExtractor,
  adminRequired,
  productChecker,
  async (req, res) => {
    const createdProduct = new Product(req.body.product)
    await createdProduct.save()
    if (req.body.addToAll) {
      const topCategory = await Category.findById('all')
      topCategory.products.push(createdProduct._id)
      await topCategory.save()
    }
    if (req.body.addToNew) {
      const newsCategory = await Category.findById('new')
      newsCategory.products.push(createdProduct._id)
      await newsCategory.save()
    }
    if (req.body.parentCategory) {
      const parentCategory = await Category.findById(req.body.parentCategory)
      parentCategory.products.push(createdProduct._id)
      await parentCategory.save()
    }
    res.status(201).send(createdProduct)
  }
)

module.exports = router
