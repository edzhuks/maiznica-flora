const express = require('express')
const Category = require('../models/category')
const Product = require('../models/product')
const { userExtractor, adminRequired } = require('../util/middleware')
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
  res.send({
    products,
    displayName: { lv: 'Atlaides', en: 'Discounts', de: 'Rabatt' },
  })
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

categoryRouter.post('/init', userExtractor, adminRequired, async (req, res) => {
  await Category.deleteMany({})
  const all = new Category({
    _id: 'all',
    categories: [],
    products: [],
    image: '',
    displayName: {
      lv: 'Visi produkti',
      en: 'All products',
      de: 'Alle produkte',
    },
  })
  await all.save()
  const news = new Category({
    _id: 'new',
    categories: [],
    products: [],
    image: '',
    displayName: {
      lv: 'Jaunie produkti',
      en: 'New products',
      de: 'Neue produkte',
    },
  })
  await news.save()
  res.status(201).end()
})

categoryRouter.delete(
  '/products',
  userExtractor,
  adminRequired,
  async (req, res) => {
    if (!req.body.parentCategory) {
      return res.status(400).json({ error: 'Parent category must be defined' })
    }
    if (!req.body.productId) {
      return res.status(400).json({ error: 'Product id must be given' })
    }
    const parentCategory = await Category.findById(req.body.parentCategory)
    parentCategory.products.pull({ _id: req.body.productId })
    await parentCategory.save()
    res.status(200).send(parentCategory)
  }
)

categoryRouter.delete(
  '/categories',
  userExtractor,
  adminRequired,
  async (req, res) => {
    if (!req.body.parentCategory) {
      return res.status(400).json({ error: 'Parent category must be defined' })
    }
    if (!req.body.categoryId) {
      return res.status(400).json({ error: 'Category id must be given' })
    }
    const parentCategory = await Category.findById(req.body.parentCategory)
    parentCategory.categories.pull({ _id: req.body.categoryId })
    await parentCategory.save()
    res.status(200).send(parentCategory)
  }
)

categoryRouter.delete(
  '/:id',
  userExtractor,
  adminRequired,
  async (req, res) => {
    await Category.deleteOne({ _id: req.params.id })
    const categories = await Category.find()
    for (const c of categories) {
      c.categories.pull({ _id: req.params.id })
      await c.save()
    }
    res.status(204).end()
  }
)

categoryRouter.post('/', userExtractor, adminRequired, async (req, res) => {
  if (!req.body.parentCategory) {
    return res.status(400).json({ error: 'Parent category msut be defined' })
  }
  if (!req.body.newCategory) {
    return res.status(400).json({ error: 'New category missing' })
  }
  if (!req.body.newCategory.id) {
    return res.status(400).json({ error: 'New category id missing' })
  }
  if (
    !req.body.newCategory.displayName ||
    !req.body.newCategory.displayName.lv
  ) {
    return res.status(400).json({ error: 'New category display name missing' })
  }
  if (!req.body.newCategory.image) {
    return res.status(400).json({ error: 'New category image missing' })
  }
  const newCategory = new Category({
    ...req.body.newCategory,
    _id: req.body.newCategory.id,
    categories: [],
    products: [],
  })
  await newCategory.save()
  const parentCategory = await Category.findById(req.body.parentCategory)
  parentCategory.categories.push(newCategory)
  await parentCategory.save()
  res.status(201).send(newCategory)
})

categoryRouter.put(
  '/products',
  userExtractor,
  adminRequired,
  async (req, res) => {
    if (req.user.admin) {
      if (!req.body.parentCategory) {
        return res
          .status(400)
          .json({ error: 'Parent category msut be defined' })
      }
      const parentCategory = await Category.findById(req.body.parentCategory)
      parentCategory.products = req.body.productsToAdd
      await parentCategory.save()
      res.status(200).send(parentCategory)
    } else {
      res.status(403).end()
    }
  }
)

categoryRouter.put('/', userExtractor, adminRequired, async (req, res) => {
  if (!req.body.parentCategory) {
    return res.status(400).json({ error: 'Parent category msut be defined' })
  }
  const parentCategory = await Category.findById(req.body.parentCategory)
  parentCategory.categories = req.body.categoriesToAdd
  await parentCategory.save()
  res.status(200).send(parentCategory)
})

module.exports = { categoryRouter, getCatalogue }
