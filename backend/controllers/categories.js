const express = require('express')
const Category = require('../models/category')
const Product = require('../models/product')
const {
  userExtractor,
  adminRequired,
  optionalUser,
} = require('../util/middleware')
const categoryRouter = express.Router()

categoryRouter.get('/ids', userExtractor, adminRequired, async (req, res) => {
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
  const products = await Product.find({
    discount: { $exists: true },
  })
  res.send({
    products: products.filter(
      (p) =>
        Date.parse(p.discount.startDate) <= new Date() &&
        Date.parse(p.discount.endDate) >= new Date()
    ),
    displayName: { lv: 'Atlaides', en: 'Discounts', de: 'Rabatt' },
  })
})

categoryRouter.get(
  '/complete',
  userExtractor,
  adminRequired,
  async (req, res) => {
    let catalogue = await getCatalogue()
    res.send(catalogue)
  }
)
categoryRouter.get(
  '/unlisted',
  userExtractor,
  adminRequired,
  async (req, res) => {
    let unlistedProducts = await Product.find({ invisible: true })
    let unlistedCategories = await Category.find({ invisible: true }).populate([
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
    res.send({ products: unlistedProducts, categories: unlistedCategories })
  }
)
categoryRouter.get(
  '/unavailable',
  userExtractor,
  adminRequired,
  async (req, res) => {
    let unavailable = await Product.find({ outOfStock: true })
    res.send({ products: unavailable })
  }
)
categoryRouter.get(
  '/uncategorized',
  userExtractor,
  adminRequired,
  async (req, res) => {
    let allProducts = await Product.find()
    let allCategories = await Category.find().populate([
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
    let categorizedProducts = []
    let categorizedCategories = []
    for (const c of allCategories) {
      categorizedProducts = categorizedProducts.concat(
        c.products.map((p) => p._id)
      )
      categorizedCategories = categorizedCategories.concat(
        c.categories.map((c) => c._id)
      )
    }
    res.send({
      products: allProducts.filter(
        (p) => !categorizedProducts.find((pp) => pp.equals(p._id))
      ),
      categories: allCategories
        .filter((p) => !categorizedCategories.find((pp) => pp === p._id))
        .filter((c) => c._id !== 'all'),
    })
  }
)
categoryRouter.get('/home', async (req, res) => {
  let category = await Category.findById('home')
    .populate({ path: 'products' })
    .populate({
      path: 'categories',
      populate: [{ path: 'products' }],
    })
  res.send(category)
})
categoryRouter.get('/:category', optionalUser, async (req, res) => {
  let category = await Category.findById(req.params.category)
    .populate({ path: 'products' })
    .populate({ path: 'categories' })
  if (
    !category ||
    (category.invisible && (!req.user || (req.user && !req.user.admin)))
  ) {
    return res.status(404).send()
  }
  res.send(category)
})

// categoryRouter.post('/init', userExtractor, adminRequired, async (req, res) => {
//   await Category.deleteMany({})
//   const all = new Category({
//     _id: 'all',
//     categories: [],
//     products: [],
//     image: '',
//     displayName: {
//       lv: 'Visi produkti',
//       en: 'All products',
//       de: 'Alle produkte',
//     },
//   })
//   await all.save()
//   const news = new Category({
//     _id: 'new',
//     categories: [],
//     products: [],
//     image: '',
//     displayName: {
//       lv: 'Jaunie produkti',
//       en: 'New products',
//       de: 'Neue produkte',
//     },
//   })
//   await news.save()
//   res.status(201).end()
// })

categoryRouter.delete(
  '/products',
  userExtractor,
  adminRequired,
  async (req, res) => {
    if (!req.body.parentCategory) {
      return res.status(400).json({
        error: {
          en: 'Parent category must be defined',
          lv: 'Nav norādīta virskategorija',
        },
      })
    }
    if (!req.body.productId) {
      return res.status(400).json({
        error: {
          en: 'Product id must be given',
          lv: 'Nav norādīts produkts',
        },
      })
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
      return res.status(400).json({
        error: {
          en: 'Parent category must be defined',
          lv: 'Nav norādīta virskategorija',
        },
      })
    }
    if (!req.body.categoryId) {
      return res.status(400).json({
        error: {
          en: 'Product id must be given',
          lv: 'Nav norādīta kategorija',
        },
      })
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
  if (!req.body.newCategory) {
    return res
      .status(400)
      .json({ error: { en: 'New category missing', lv: 'Trūkst kategorijas' } })
  }
  if (!req.body.newCategory.id) {
    return res.status(400).json({
      error: {
        en: 'New category id missing',
        lv: 'Nav norādīts kategorijas identifikators',
      },
    })
  }
  if (
    !req.body.newCategory.displayName ||
    !req.body.newCategory.displayName.lv
  ) {
    return res.status(400).json({
      error: {
        en: 'New category display name missing',
        lv: 'Nav norādīts kategorijas nosaukums',
      },
    })
  }
  if (!req.body.newCategory.image) {
    return res.status(400).json({
      error: { en: 'New category image missing', lv: 'Nav norādīts attēls' },
    })
  }
  const newCategory = new Category({
    ...req.body.newCategory,
    _id: req.body.newCategory.id,
    categories: [],
    products: [],
    invisible: true,
  })
  await newCategory.save()
  res.status(201).send(newCategory)
})

categoryRouter.put(
  '/hide/:id',
  userExtractor,
  adminRequired,
  async (req, res) => {
    const category = await Category.findById(req.params.id)
    category.invisible = true
    await category.save()

    res.status(201).send(category)
  }
)
categoryRouter.put(
  '/show/:id',
  userExtractor,
  adminRequired,
  async (req, res) => {
    const category = await Category.findById(req.params.id)
    category.invisible = false
    await category.save()
    res.status(201).send(category)
  }
)

categoryRouter.put(
  '/products',
  userExtractor,
  adminRequired,
  async (req, res) => {
    if (!req.body.parentCategory) {
      return res.status(400).json({
        error: {
          en: 'Parent category must be defined',
          lv: 'Nav norādīta virskategorija',
        },
      })
    }
    const parentCategory = await Category.findById(req.body.parentCategory)
    parentCategory.products = req.body.productsToAdd
    await parentCategory.save()
    res.status(200).send(parentCategory)
  }
)

categoryRouter.put('/', userExtractor, adminRequired, async (req, res) => {
  if (!req.body.parentCategory) {
    return res.status(400).json({
      error: {
        en: 'Parent category must be defined',
        lv: 'Nav norādīta virskategorija',
      },
    })
  }
  const parentCategory = await Category.findById(req.body.parentCategory)
  parentCategory.categories = req.body.categoriesToAdd
  await parentCategory.save()
  res.status(200).send(parentCategory)
})

categoryRouter.put('/:id', userExtractor, adminRequired, async (req, res) => {
  if (!req.body.newCategory) {
    return res
      .status(400)
      .json({ error: { en: 'Category missing', lv: 'Trūkst kategorijas' } })
  }
  if (
    !req.body.newCategory.displayName ||
    !req.body.newCategory.displayName.lv
  ) {
    return res.status(400).json({
      error: {
        en: 'Category display name missing',
        lv: 'Nav norādīts kategorijas nosaukums',
      },
    })
  }
  if (!req.body.newCategory.image) {
    return res.status(400).json({
      error: { en: 'Category image missing', lv: 'Nav norādīts attēls' },
    })
  }
  const category = await Category.findById(req.params.id)
  if (!category) {
    return res.status(404).send({
      error: { en: 'Category not found', lv: 'Kategorija netika atrasta' },
    })
  }
  category.displayName = req.body.newCategory.displayName
  category.image = req.body.newCategory.image
  await category.save()

  res.status(200).send(category)
})

categoryRouter.get('/', optionalUser, async (req, res) => {
  let categories = await Category.find({})
    .populate({ path: 'products' })
    .populate('categories')
  if (req.user && req.user.admin) {
    return res.send(categories)
  } else {
    categories = categories.filter((c) => c._id !== 'all' && c._id !== 'home')
    return res.send(categories.filter((c) => !c.invisible))
  }
})

module.exports = { categoryRouter, getCatalogue }
