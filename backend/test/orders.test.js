const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const Product = require('../models/product')
const Category = require('../models/category')
const Cart = require('../models/cart')
const Order = require('../models/order')
const Address = require('../models/address')

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
  badges: [],
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
  badges: [],
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

const goodAddress = {
  name: 'John',
  surname: 'Smith',
  phone: '123456789',
  city: 'Helsinki',
  street: 'Fabianinkatu',
  house: '34',
  apartment: '123A',
}

let token
let adminToken
beforeAll(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(notAdmin)
  const r = await api.post('/api/users').send(admin)
  admin.id = r.body.id
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
  await Order.deleteMany({})
  await Cart.deleteMany({})
  await Address.deleteMany({})
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
})

test('ordering fails without an address', async () => {
  await api
    .post('/api/order')
    .set('Authorization', `Bearer ${token}`)
    .send({})
    .expect(400)
})

test('unatuhorized can not get all orders', async () => {
  await api
    .get('/api/order')
    .set('Authorization', `Bearer ${token}`)
    .expect(403)
})

describe('ordering', () => {
  let address
  beforeEach(async () => {
    const addressResponse = await api
      .post('/api/users/address')
      .set('Authorization', `Bearer ${token}`)
      .send(goodAddress)
    address = addressResponse.body
  })
  test('succeeds with an address', async () => {
    await api
      .post('/api/order')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: address.id })
      .expect(200)
  })
  test('fails with an empty cart', async () => {
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product1, quantity: 0 })
      .expect(201)
    await api
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: product2, quantity: 0 })
      .expect(201)
    const response = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.content.length).toBe(0)
    await api
      .post('/api/order')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: address.id })
      .expect(400)
  })
  test('creates an order with status "placed"', async () => {
    const response = await api
      .post('/api/order')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: address.id })
      .expect(200)
    expect(response.body.status.status).toBe('placed')
  })
  test('creates an order with correct placement day', async () => {
    const response = await api
      .post('/api/order')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: address.id })
      .expect(200)
    expect(
      new Date(response.body.datePlaced).getTime() - new Date().getTime()
    ).toBeLessThan(10000)
  })
  test('deletes the cart', async () => {
    const response = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.content.length).toBe(2)
    await api
      .post('/api/order')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: address.id })
      .expect(200)
    const response2 = await api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
    expect(response2.body.content.length).toBe(0)
  })
})

describe('admins can', () => {
  test('get all orders', async () => {
    const addressResponse = await api
      .post('/api/users/address')
      .set('Authorization', `Bearer ${token}`)
      .send(goodAddress)
    address = addressResponse.body
    const response2 = await api
      .get('/api/order')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200)
    expect(response2.body.length).toBe(0)
    await api
      .post('/api/order')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: address.id })
      .expect(200)
    const response = await api
      .get('/api/order')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200)
    expect(response.body.length).toBe(1)
  })
  describe('manage orders', () => {
    let order
    beforeEach(async () => {
      const addressResponse = await api
        .post('/api/users/address')
        .set('Authorization', `Bearer ${token}`)
        .send(goodAddress)
      address = addressResponse.body
      const response = await api
        .post('/api/order')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: address.id })
      order = response.body
    })
    test('change status to a valid status', async () => {
      const response = await api
        .put(`/api/order/${order.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...order, status: { status: 'accepted' } })
        .expect(200)
      expect(response.body.status.status).toBe('accepted')
      expect(response.body.status.lastModifiedBy.id).toBe(admin.id)
      expect(
        new Date(response.body.status.lastModified).getTime() -
          new Date().getTime()
      ).toBeLessThan(10000)
      const response2 = await api
        .put(`/api/order/${order.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...order, status: { status: 'refused' } })
        .expect(200)
      expect(response2.body.status.status).toBe('refused')

      const response3 = await api
        .put(`/api/order/${order.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...order, status: { status: 'packing' } })
        .expect(200)
      expect(response3.body.status.status).toBe('packing')

      const response4 = await api
        .put(`/api/order/${order.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...order, status: { status: 'waitingForDelivery' } })
        .expect(200)
      expect(response4.body.status.status).toBe('waitingForDelivery')

      const response5 = await api
        .put(`/api/order/${order.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...order, status: { status: 'delivering' } })
        .expect(200)
      expect(response5.body.status.status).toBe('delivering')

      const response6 = await api
        .put(`/api/order/${order.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...order, status: { status: 'completed' } })
        .expect(200)
      expect(response6.body.status.status).toBe('completed')
    })
    test('cannot change to invalid status', async () => {
      await api
        .put(`/api/order/${order.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...order, status: { status: 'what is this' } })
        .expect(400)
      const response = await api
        .get('/api/order')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
      expect(response.body[0].status.status).toBe('placed')
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
