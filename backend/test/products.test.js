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
  test('crete a product', async () => {
    await api
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ product: goodProduct })
      .expect(403)
  })

  test('modify a product', async () => {
    const response = await api
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ product: goodProduct })
    const product = response.body
    await api
      .put(`/api/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ product: goodProduct })
      .expect(403)
  })

  test('give a discount', async () => {
    const response = await api
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ product: goodProduct })
    const product = response.body
    await api
      .put(`/api/products/discount/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ discountPrice: 100 })
      .expect(403)
  })

  test('remove a discount', async () => {
    const response = await api
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ product: goodProduct })
    const product = response.body
    await api
      .delete(`/api/products/discount/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403)
  })

  test('delete a product', async () => {
    const response = await api
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ product: goodProduct })
    const product = response.body
    await api
      .delete(`/api/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403)
  })
})

describe('an admin user can', () => {
  describe('crete a product', () => {
    test('with correct fields', async () => {
      const productResponse = await api
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product: goodProduct })
        .expect(201)
      const response = await api.get('/api/products')
      expect(response.body[0]).toStrictEqual({
        ...goodProduct,
        id: productResponse.body.id,
      })
    })
    describe('but it needs to have', () => {
      test('a name', async () => {
        const badProduct = { ...goodProduct }
        delete badProduct.name
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('an integer weight', async () => {
        const badProduct = { ...goodProduct }
        delete badProduct.weight
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
        const badProduct2 = { ...goodProduct }
        badProduct2.weight = 1.2
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct2 })
          .expect(400)
      })
      test('an integer price in cents', async () => {
        const badProduct = { ...goodProduct }
        delete badProduct.price
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
        const badProduct2 = { ...goodProduct }
        badProduct2.price = 1.2
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct2 })
          .expect(400)
      })

      test('ingredients', async () => {
        const badProduct = { ...goodProduct }
        delete badProduct.ingredients
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })

      test('an image', async () => {
        const badProduct = { ...goodProduct }
        delete badProduct.image
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
    })

    test('without nutritional information', async () => {
      const okProduct = { ...goodProduct }
      delete okProduct.nutrition
      await api
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product: okProduct })
        .expect(201)
    })
    describe('but if nutritional infromation exists it must have', () => {
      test('energy content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.energy
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('fat content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.fat
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('saturated fat content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.saturatedFat
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('carbohydrate content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.carbs
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('sugar content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.sugar
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('fiber content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.fiber
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('protein content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.protein
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('salt content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.salt
        await api
          .post('/api/products')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
    })
    test('and add it to the top category', async () => {
      const productResponse = await api
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product: goodProduct, addToAll: true })
        .expect(201)
      const response = await api.get('/api/categories/complete')
      expect(response.body.products[0]).toStrictEqual({
        ...goodProduct,
        id: productResponse.body.id,
      })
    })
    test('and add it to the new product category', async () => {
      const productResponse = await api
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product: goodProduct, addToNew: true })
        .expect(201)
      const response = await api.get('/api/categories/new')
      expect(response.body.products[0]).toStrictEqual({
        ...goodProduct,
        id: productResponse.body.id,
      })
    })
  })
  describe('edit a product', () => {
    let product
    beforeEach(async () => {
      const response = await api
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product: goodProduct })
      product = response.body
    })
    test('with correct fields', async () => {
      const productResponse = await api
        .put(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product: goodProduct })
        .expect(200)
      const response = await api.get('/api/products')
      expect(response.body[0]).toStrictEqual({
        ...goodProduct,
        id: productResponse.body.id,
      })
    })
    describe('but it needs to have', () => {
      test('a name', async () => {
        const badProduct = { ...goodProduct }
        delete badProduct.name
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('an integer weight', async () => {
        const badProduct = { ...goodProduct }
        delete badProduct.weight
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
        const badProduct2 = { ...goodProduct }
        badProduct2.weight = 1.2
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct2 })
          .expect(400)
      })
      test('an integer price in cents', async () => {
        const badProduct = { ...goodProduct }
        delete badProduct.price
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
        const badProduct2 = { ...goodProduct }
        badProduct2.price = 1.2
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct2 })
          .expect(400)
      })

      test('ingredients', async () => {
        const badProduct = { ...goodProduct }
        delete badProduct.ingredients
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })

      test('an image', async () => {
        const badProduct = { ...goodProduct }
        delete badProduct.image
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
    })

    test('without nutritional information', async () => {
      const okProduct = { ...goodProduct }
      delete okProduct.nutrition
      await api
        .put(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product: okProduct })
        .expect(200)
    })
    describe('but if nutritional infromation exists it must have', () => {
      test('energy content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.energy
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('fat content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.fat
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('saturated fat content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.saturatedFat
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('carbohydrate content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.carbs
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('sugar content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.sugar
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('fiber content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.fiber
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('protein content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.protein
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
      test('salt content', async () => {
        const badProduct = {
          ...goodProduct,
          nutrition: { ...goodProduct.nutrition },
        }
        delete badProduct.nutrition.salt
        await api
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ product: badProduct })
          .expect(400)
      })
    })
  })
  describe('apply a discount', () => {
    let product
    beforeEach(async () => {
      const response = await api
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product: goodProduct })
      product = response.body
    })
    test('with a valid price', async () => {
      const response = await api
        .put(`/api/products/discount/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ discountPrice: 100 })
        .expect(200)
      expect(response.body.discountPrice).toBe(100)
      const response2 = await api.get(`/api/products/${product.id}`)
      expect(response2.body.discountPrice).toBe(100)
    })
    test('and remove it', async () => {
      await api
        .delete(`/api/products/discount/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(204)
      const response = await api.get(`/api/products/${product.id}`)
      expect(response.body.discountPrice).toBeUndefined()
    })
    test('but not with a bigger price', async () => {
      await api
        .put(`/api/products/discount/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ discountPrice: 1000 })
        .expect(400)
      const response2 = await api.get(`/api/products/${product.id}`)
      expect(response2.body.discountPrice).toBeUndefined()
    })
    test('and not with a wrong price', async () => {
      await api
        .put(`/api/products/discount/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ discountPrice: 1.1 })
        .expect(400)
      await api
        .put(`/api/products/discount/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ discountPrice: -11 })
        .expect(400)
      await api
        .put(`/api/products/discount/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ discountPrice: 'free' })
        .expect(400)
    })
  })
  describe('delete a product', () => {
    let product
    beforeEach(async () => {
      const response = await api
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ product: goodProduct, addToAll: true, addToNew: true })
      product = response.body
    })
    test('and it is removed from categories', async () => {
      const response1 = await api.get(`/api/categories/all`)
      expect(response1.body.products.length).toBe(1)
      const response = await api
        .delete(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(204)
      const response2 = await api.get(`/api/categories/all`)
      expect(response2.body.products.length).toBe(0)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
