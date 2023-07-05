const express = require('express')
const Category = require('../models/category')
const { userExtractor } = require('../util/middleware')
const router = express.Router()

router.get('/:category', async (req, res) => {
  let categories = await Category.findById(req.params.category)
    .populate('products')
    .populate('categories')
  res.send(categories)
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const product = new Category(req.body)
  await product.save()
  res.send(product)
})

module.exports = router
