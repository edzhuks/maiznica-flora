const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const Product = require('../models/product')
const Category = require('../models/category')
const Cart = require('../models/cart')

const notAdmin = {
  password: 'password11!!',
  email: 'email@email.email',
  emailVerified: true,
}

const admin = {
  password: 'password11!!',
  email: 'email2@email.email',
  admin: true,
  emailVerified: true,
}

const product1 = {
  name: {
    lv: 'Lielās šķēles Sējas rudzu maize ar briedinātiem rudzu graudiem',
  },
  description: {
    lv: 'Bez pievienota rauga un E vielām.\n\nDaudz šķiedrvielu.\n\nAr zemu piesātināto tauku saturu.\n\nAr plaucējumu gatavota, dabīgi raudzēta maize.\n\nRoku darbs.',
  },
  ingredients: {
    lv: 'Sastāvdaļas: rudzu milti 34%, ūdens, briedināti rudzu graudi 20%, kviešu milti, linsēklas, rafinētais sīrups, rudzu iesals, cukurs, ķimeņu sēklas, pārtikas  sāls, miežu iesala ekstrakts, kviešu klijas.',
  },
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
  EAN: '4750271102922',
  image:
    'https://www.maiznica.lv/wp-content/uploads/2019/04/sejas_rudzu_skeles-1.jpg',
  bio: false,
  badges: [],
}

const product2 = {
  name: { lv: 'Sējas rudzu maize ar briedinātiem rudzu graudiem' },
  description: { lv: 'Ņamma' },
  ingredients: {
    lv: 'Sastāvdaļas: rudzu milti 34%, ūdens, briedināti rudzu graudi 20%, kviešu milti, linsēklas, rafinētais sīrups, rudzu iesals, cukurs, ķimeņu sēklas, pārtikas sāls, miežu iesala ekstrakts, kviešu klijas.',
  },
  weight: 300,
  price: 234,
  EAN: '4750271102755',
  image:
    'https://www.maiznica.lv/wp-content/uploads/2019/04/sejas-ar-briedinatiem_rudzu_300.jpg',
  bio: false,
  badges: [],
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
  await api
    .post('/api/categories/init')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({})
  const response3 = await api
    .post('/api/products')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ product: product1 })
  product1.id = response3.body.id
  const response4 = await api
    .post('/api/products')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ product: product2 })
  product2.id = response4.body.id
})

beforeEach(async () => {
  await Cart.deleteMany({})
})

test('unatuhenticated users do not have a cart', async () => {
  await api.get('/api/cart').expect(401)
})

describe('an user can', () => {
  test('add a product to their cart', async () => {
    expect(
      (await api.get('/api/cart').set('Authorization', `Bearer ${token}`)).body
        .content
    ).toBeUndefined()
    console.log(product1)
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product1, quantity: 10 })
      .expect(201)
    const response = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.content.length).toBe(1)
    delete response.body.content[0]._id
    expect(response.body.content[0]).toStrictEqual({
      product: product1,
      quantity: 10,
    })
  })
  test('add another product to their cart', async () => {
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product1, quantity: 10 })
      .expect(201)
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product2, quantity: 9 })
      .expect(201)
    const response = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.content.length).toBe(2)
    delete response.body.content[0]._id
    expect(response.body.content[0]).toStrictEqual({
      product: product1,
      quantity: 10,
    })
    delete response.body.content[1]._id
    expect(response.body.content[1]).toStrictEqual({
      product: product2,
      quantity: 9,
    })
  })
  test('add more of a product to their cart, but the quantity is replaced, not added', async () => {
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product1, quantity: 10 })
      .expect(201)
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product1, quantity: 9 })
      .expect(201)
    const response = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.content.length).toBe(1)
    delete response.body.content[0]._id
    expect(response.body.content[0]).toStrictEqual({
      product: product1,
      quantity: 9,
    })
  })
  test('delete an item by ordering 0 of it', async () => {
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product1, quantity: 10 })
      .expect(201)
    const response = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.content.length).toBe(1)
    delete response.body.content[0]._id
    expect(response.body.content[0]).toStrictEqual({
      product: product1,
      quantity: 10,
    })
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product1, quantity: 0 })
      .expect(201)
    const response2 = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response2.body.content.length).toBe(0)
  })
})
describe('an user cannot', () => {
  test('add a product with negative quantity to their cart', async () => {
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product1, quantity: -10 })
      .expect(400)
    const response = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.content).toBeUndefined()
  })

  test('add a product with fractional quantity to their cart', async () => {
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product1, quantity: 0.15 })
      .expect(400)
    const response = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.content).toBeUndefined()
  })
  test('add a product with non-numeric quantity to their cart', async () => {
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product1, quantity: 'some' })
      .expect(400)
    const response = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.content).toBeUndefined()
  })
  test('add a product with missing id to their cart', async () => {
    const badProduct = { ...product1 }
    delete badProduct.id
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: badProduct, quantity: 10 })
      .expect(400)
    const response = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.content).toBeUndefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
