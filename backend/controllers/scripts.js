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
const Cart = require('../models/cart')
const Order = require('../models/order')
const router = express.Router()

// router.get('/rename_images', async (req, res) => {
//   const categories = await Product.find()
//   for (const c of categories) {
//     if (c.image) {
//       const parts = c.image.split('/')
//       c.image = parts[parts.length - 1]
//       await c.save()
//     }
//   }
//   res.status(200).end()
// })

// router.get('/rename_category_images', async (req, res) => {
//   const categories = await Category.find()
//   for (const c of categories) {
//     if (c.image) {
//       const parts = c.image.split('.')
//       const extension = parts[parts.length - 1]
//       c.image = `sadala_${c.id}.jpg`
//       await c.save()
//     }
//   }
//   res.status(200).end()
// })

// router.get('/give_flora_money', async (req, res) => {
//   const totals = await Order.aggregate([
//     { $group: { _id: '$user', sum: { $sum: '$subtotal' } } },
//   ])

//   for (const t of totals) {
//     console.log(t)
//     const cart = await Cart.findOne({ user: t._id })
//     cart.availableLoyaltyMoney = t.sum * 0.01
//     await cart.save()
//   }
//   res.status(200).end()
// })

module.exports = router
