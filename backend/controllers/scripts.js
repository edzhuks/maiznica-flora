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

router.get('/rename_images', async (req, res) => {
  const categories = await Product.find()
  for (const c of categories) {
    if (c.image) {
      const parts = c.image.split('/')
      c.image = parts[parts.length - 1]
      await c.save()
    }
  }
  res.status(200).end()
})

module.exports = router
