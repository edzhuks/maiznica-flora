const express = require('express')
const Category = require('../models/category')
const Product = require('../models/product')
const { userExtractor } = require('../util/middleware')
const categoryRouter = express.Router()

categoryRouter.get('/ids', async (req, res) => {
  let allIds = await Category.find({})
  res.send(allIds)
})

const getCatalogue = async () => {
  let catalogue = await Category.findById('all').populate([
    {
      path: 'categories',
      populate: [
        {
          path: 'categories',
          populate: [
            {
              path: 'categories',
              populate: [
                {
                  path: 'categories',
                  populate: [
                    {
                      path: 'categories',
                      populate: [
                        {
                          path: 'categories',
                          populate: { path: 'categories' },
                        },
                        { path: 'products' },
                      ],
                    },
                    { path: 'products' },
                  ],
                },
                { path: 'products' },
              ],
            },
            { path: 'products' },
          ],
        },
        { path: 'products' },
      ],
    },
    { path: 'products' },
  ])

  return catalogue
}

categoryRouter.get('/discount', async (req, res) => {
  const products = await Product.find({ discountPrice: { $exists: true } })
  res.send({ products })
})

categoryRouter.get('/complete', async (req, res) => {
  let catalogue = await getCatalogue()
  res.send(catalogue)
})

categoryRouter.get('/:category', async (req, res) => {
  let categories = await Category.findById(req.params.category)
    .populate('products')
    .populate('categories')
  res.send(categories)
})

categoryRouter.post('/', async (req, res) => {
  console.log(req.body)
  const newCategory = new Category(req.body.newCategory)
  await newCategory.save()
  const parentCategory = await Category.findById(req.body.parentCategory)
  parentCategory.categories.push(newCategory)
  await parentCategory.save()
  let catalogue = await getCatalogue()
  res.send(catalogue)
})

categoryRouter.put('/products', async (req, res) => {
  console.log(req.body)
  const parentCategory = await Category.findById(req.body.parentCategory)
  parentCategory.products.push(...req.body.productsToAdd)
  await parentCategory.save()
  let catalogue = await getCatalogue()
  res.send(catalogue)
})

categoryRouter.put('/', async (req, res) => {
  console.log(req.body)
  const parentCategory = await Category.findById(req.body.parentCategory)
  parentCategory.categories.push(...req.body.categoriesToAdd)
  await parentCategory.save()
  let catalogue = await getCatalogue()
  res.send(catalogue)
})

module.exports = { categoryRouter, getCatalogue }
