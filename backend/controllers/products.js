const express = require('express')
const Product = require('../models/product')
const Category = require('../models/category')
const Cart = require('../models/cart')
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
  if (!req.body.discount) {
    return res.status(400).json({
      error: 'No discount in request body',
    })
  }
  if (!isPositiveInteger(req.body.discount.discountPrice)) {
    return res.status(400).json({
      error: 'Discounted price must be a positive integer amount in cents',
    })
  }
  if (product.price < req.body.discount.discountPrice) {
    return res
      .status(400)
      .json({ error: 'Discounted price must be smaller than base price' })
  }
  const discount = {
    discountPrice: req.body.discount.discountPrice,
    startDate: new Date(req.body.discount.startDate),
    endDate: new Date(req.body.discount.endDate),
  }
  console.log(discount)
  discount.startDate.setHours(0)
  discount.endDate.setHours(23, 59, 59, 999)
  console.log(discount)

  if (discount.endDate < discount.startDate) {
    return res.status(400).json({
      error: 'End date can not be earlier than start date',
    })
  }
  const newProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      discount: discount,
    },
    { new: 'true' }
  )
  res.status(200).send(newProduct)
})

router.delete(
  '/discount/:id',
  userExtractor,
  adminRequired,
  async (req, res) => {
    const product = await Product.findById(req.params.id)
    product.discount = undefined
    await product.save()
    res.status(200).send(product)
  }
)

router.get('/', async (req, res) => {
  const products = await Product.find({ invisible: { $ne: true } }).populate(
    'relatedProducts'
  )
  res.send(products)
})

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    invisible: { $ne: true },
  }).populate('relatedProducts')
  if (!product) {
    return res.status(404).json({ error: 'The product does not exist' })
  }
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

router.put('/hide/:id', userExtractor, adminRequired, async (req, res) => {
  const product = await Product.findById(req.params.id)
  product.invisible = true
  await product.save()
  const carts = await Cart.find()
  for (const c of carts) {
    c.content.pull({ product: req.params.id })
    await c.save()
  }
  res.status(201).send(product)
})
router.put('/show/:id', userExtractor, adminRequired, async (req, res) => {
  const product = await Product.findById(req.params.id)
  product.invisible = false
  await product.save()
  res.status(201).send(product)
})
router.put('/inStock/:id', userExtractor, adminRequired, async (req, res) => {
  const product = await Product.findById(req.params.id)
  product.outOfStock = false
  await product.save()
  res.status(201).send(product)
})
router.put(
  '/outOfStock/:id',
  userExtractor,
  adminRequired,
  async (req, res) => {
    const product = await Product.findById(req.params.id)
    product.outOfStock = true
    await product.save()
    const carts = await Cart.find()
    for (const c of carts) {
      c.content.pull({ product: req.params.id })
      await c.save()
    }
    res.status(201).send(product)
  }
)

router.put(
  '/:id',
  userExtractor,
  adminRequired,
  productChecker,
  async (req, res) => {
    await Product.updateOne({ _id: req.params.id }, req.body.product)
    const products = await Product.find()
    for (const p of products) {
      console.log(p.relatedProducts)
      if (
        req.body.product.relatedProducts.find((r) => r === p.id) &&
        !p.relatedProducts.find((r) => r.equals(req.params.id))
      ) {
        p.relatedProducts.push(req.params.id)
        await p.save()
      } else if (
        !req.body.product.relatedProducts.find((r) => r === p.id) &&
        p.relatedProducts.find((r) => r.equals(req.params.id))
      ) {
        console.log(p.relatedProducts)
        p.relatedProducts.pull(req.params.id)
        console.log(p.relatedProducts)
        await p.save()
      }
    }
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
