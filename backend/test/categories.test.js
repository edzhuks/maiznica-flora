const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const Product = require('../models/product')
const Category = require('../models/category')

const notAdmin = {
  username: 'notadmin',
  password: 'password11!!',
  email: 'email@email.email',
}

const admin = {
  username: 'admin',
  password: 'password11!!',
  email: 'email2@email.email',
  admin: true,
}

const goodProduct = {
  name: 'Lielās šķēles Sējas rudzu maize ar briedinātiem rudzu graudiem',
  description:
    'Bez pievienota rauga un E vielām.\n\nDaudz šķiedrvielu.\n\nAr zemu piesātināto tauku saturu.\n\nAr plaucējumu gatavota, dabīgi raudzēta maize.\n\nRoku darbs.',
  ingredients:
    'Sastāvdaļas: rudzu milti 34%, ūdens, briedināti rudzu graudi 20%, kviešu milti, linsēklas, rafinētais sīrups, rudzu iesals, cukurs, ķimeņu sēklas, pārtikas  sāls, miežu iesala ekstrakts, kviešu klijas.',
  nutrition: {
    energy: 251,
    fat: 3.4,
    saturatedFat: 0.2,
    carbs: 43,
    sugar: 5.8,
    fiber: 8.4,
    protein: 8.3,
    salt: 0.7,
  },
  weight: 280,
  price: 201,
  reviews: [],
  EAN: '4750271102922',
  image:
    'https://www.maiznica.lv/wp-content/uploads/2019/04/sejas_rudzu_skeles-1.jpg',
  bio: false,
}

const goodCategory = {
  id: 'maize',
  displayName: 'Maize',
  image:
    'https://www.maiznica.lv/wp-content/uploads/2019/04/sejas_rudzu_skeles-1.jpg',
  categories: [],
  products: [],
}
let token
let adminToken
beforeAll(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(notAdmin)
  await api.post('/api/users').send(admin)
  const response = await api.post('/api/login').send(notAdmin)
  token = response.body.token
  const response2 = await api.post('/api/login').send(admin)
  adminToken = response2.body.token
})

beforeEach(async () => {
  await Product.deleteMany({})
  await Category.deleteMany({})
  await api
    .post('/api/categories/init')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({})
})

describe('a non-admin user cannot', () => {
  test('crete a category', async () => {
    await api
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ newCategory: goodCategory, parentCategory: 'all' })
      .expect(403)
  })

  test('modify a category', async () => {
    const response = await api
      .post('/api/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ newCategory: goodCategory, parentCategory: 'all' })
    const category = response.body
    await api
      .put(`/api/categories`)
      .set('Authorization', `Bearer ${token}`)
      .send({ parentCategory: 'all', categoriesToAdd: [category.id] })
      .expect(403)
    const response2 = await api
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ product: goodProduct })
    await api
      .put(`/api/categories/products`)
      .set('Authorization', `Bearer ${token}`)
      .send({ parentCategory: 'all', categoriesToAdd: [response2.body.id] })
      .expect(403)
  })
})

describe('an admin user can', () => {
  describe('crete a category', () => {
    test('with correct fields', async () => {
      await api
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ newCategory: goodCategory, parentCategory: 'all' })
        .expect(201)
      const response = await api.get('/api/categories/all')
      expect(response.body.categories[0]).toStrictEqual({
        ...goodCategory,
      })
    })
    test('or without categories or products', async () => {
      const badCategory = { ...goodCategory }
      delete badCategory.products
      delete badCategory.categories
      await api
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ newCategory: badCategory, parentCategory: 'all' })
        .expect(201)
      const response = await api.get('/api/categories/all')
      expect(response.body.categories[0]).toStrictEqual({
        ...goodCategory,
      })
    })
    describe('but it needs to have', () => {
      test('a parent category', async () => {
        await api
          .post('/api/categories')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ newCategory: goodCategory })
          .expect(400)
      })
      test('an id', async () => {
        const badCategory = { ...goodCategory }
        delete badCategory.id
        await api
          .post('/api/categories')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ newCategory: badCategory, parentCategory: 'all' })
          .expect(400)
      })
      test('a display name', async () => {
        const badCategory = { ...goodCategory }
        delete badCategory.displayName
        await api
          .post('/api/categories')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ newCategory: badCategory, parentCategory: 'all' })
          .expect(400)
      })
      test('an image', async () => {
        const badCategory = { ...goodCategory }
        delete badCategory.image
        await api
          .post('/api/categories')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ newCategory: badCategory, parentCategory: 'all' })
          .expect(400)
      })
    })
  })
  describe('modify a category', () => {
    test('by adding more categories', async () => {
      const response = await api
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ newCategory: goodCategory, parentCategory: 'all' })
      const category = response.body
      await api
        .put(`/api/categories`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ parentCategory: 'new', categoriesToAdd: [category.id] })
        .expect(200)
      const response2 = await api.get('/api/categories/new')
      expect(response2.body.categories).toContainEqual(goodCategory)
    })
    test('by adding more products', async () => {
      const response2 = await api
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product: goodProduct })
      await api
        .put(`/api/categories/products`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ parentCategory: 'all', productsToAdd: [response2.body.id] })
        .expect(200)
    })
  })
  describe('delete a category', () => {
    let category
    beforeEach(async () => {
      const response = await api
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ newCategory: goodCategory, parentCategory: 'all' })
      category = response.body
    })
    test('and it is removed from categories', async () => {
      const response1 = await api.get(`/api/categories/all`)
      expect(response1.body.categories.length).toBe(1)
      const response = await api
        .delete(`/api/categories/${category.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(204)
      const response2 = await api.get(`/api/categories/all`)
      expect(response2.body.categories.length).toBe(0)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
