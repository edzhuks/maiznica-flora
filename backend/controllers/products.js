const express = require('express')
const Product = require('../models/product')
const Category = require('../models/category')
const Cart = require('../models/cart')
const { getCatalogue } = require('./categories')
const {
  userExtractor,
  productChecker,
  adminRequired,
  optionalUser,
} = require('../util/middleware')
const { isPositiveInteger } = require('../util/functions')
const category = require('../models/category')
const user = require('../models/user')
const router = express.Router()

router.put('/discount/:id', userExtractor, adminRequired, async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!req.body.discount) {
    return res.status(400).json({
      error: { en: 'No discount in request body', lv: 'Trūkst atlaide' },
    })
  }
  if (!isPositiveInteger(req.body.discount.discountPrice)) {
    return res.status(400).json({
      error: {
        en: 'Discounted price must be a positive integer amount in cents',
        lv: 'Cenai jābūt veselam pozitīvam skaitlim centos',
      },
    })
  }
  if (product.price < req.body.discount.discountPrice) {
    return res.status(400).json({
      error: {
        en: 'Discounted price must be smaller than base price',
        lv: 'Cenai ar atlaidi jābūt mazaākai par pamata cenu',
      },
    })
  }
  const discount = {
    discountPrice: req.body.discount.discountPrice,
    startDate: new Date(req.body.discount.startDate),
    endDate: new Date(req.body.discount.endDate),
  }
  discount.startDate.setHours(0)
  discount.endDate.setHours(23, 59, 59, 999)

  if (discount.endDate < discount.startDate) {
    return res.status(400).json({
      error: {
        en: 'End date can not be earlier than start date',
        lv: 'Beigu datums nevar būt pirms sākuma datuma',
      },
    })
  }
  const newProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      discount: discount,
    },
    { new: 'true' }
  ).populate('relatedProducts')
  res.status(200).send(newProduct)
})

router.delete(
  '/discount/:id',
  userExtractor,
  adminRequired,
  async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      'relatedProducts'
    )
    product.discount = undefined
    await product.save()
    res.status(200).send(product)
  }
)

router.get('/', optionalUser, async (req, res) => {
  let products = await Product.find().populate('relatedProducts')
  if (req.user && req.user.admin) {
    return res.send(products)
  }
  products = products.filter((p) => !p.invisible)
  res.send(products)
})

router.get('/:id', optionalUser, async (req, res) => {
  let product
  try {
    product = await Product.findOne({
      _id: req.params.id,
    }).populate('relatedProducts')
  } catch (error) {
    return res.status(404).json({
      error: { en: 'The product does not exist', lv: 'Produkts neeksistē' },
    })
  }
  if (!product) {
    return res.status(404).json({
      error: { en: 'The product does not exist', lv: 'Produkts neeksistē' },
    })
  }
  if (req.user && req.user.admin) {
    return res.send(product)
  }
  if (!product.invisible) {
    return res.send(product)
  }
  return res.status(404).json({
    error: { en: 'The product does not exist', lv: 'Produkts neeksistē' },
  })
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
        p.relatedProducts.pull(req.params.id)
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
    createdProduct.invisible = true
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
