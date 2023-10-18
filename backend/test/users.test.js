const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
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

beforeEach(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(notAdmin)
  await api.post('/api/users').send(admin)
})

describe('initial user', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 2 users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(2)
  })

  test('the users have correct emails', async () => {
    const response = await api.get('/api/users')
    expect(response.body.map((u) => u.email)).toContain(notAdmin.email)
    expect(response.body.map((u) => u.email)).toContain(admin.email)
  })
})

describe('user creation validation', () => {
  test('user with correct data can be added', async () => {
    const newUser = {
      password: 'secret222!!!',
      email: 'user@site.com',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(3)

    expect(response.body.map((u) => u.email)).toContain('user@site.com')
  })

  test('user with missing email cannot be added', async () => {
    const newUser = { password: 'secret222!!!' }

    await api.post('/api/users').send(newUser).expect(400)
  })

  test('user with missing password cannot be added', async () => {
    const newUser = { email: 'user@site.com' }

    await api.post('/api/users').send(newUser).expect(400)
  })

  test('user with existing email cannot be added', async () => {
    const newUser = {
      password: 'secret222!!!',
      email: 'email@email.email',
    }

    await api.post('/api/users').send(newUser).expect(400)
  })

  test('user with weak password cannot be added', async () => {
    const newUser = {
      password: 'secret',
      email: 'eeeemail@email.email',
    }

    await api.post('/api/users').send(newUser).expect(400)
  })
})

describe('user creation roles', () => {
  test('user has no special roles by default', async () => {
    const newUser = {
      password: 'secret222!!!',
      email: 'user@site.com',
    }

    await api.post('/api/users').send(newUser)

    const response = await api.get('/api/users')
    console.log(response.body)
    expect(response.body.find((u) => u.email === newUser.email).admin).toBe(
      false
    )
    expect(
      response.body.find((u) => u.email === newUser.email).maintainer
    ).toBe(false)
  })

  test('user can be admin', async () => {
    const newUser = {
      password: 'secret222!!!',
      email: 'user@site.com',
      admin: true,
    }

    await api.post('/api/users').send(newUser)

    const response = await api.get('/api/users')
    expect(response.body.find((u) => u.email === newUser.email).admin).toBe(
      true
    )
    expect(
      response.body.find((u) => u.email === newUser.email).maintainer
    ).toBe(false)
  })

  test('user can be maintainer', async () => {
    const newUser = {
      password: 'secret222!!!',
      email: 'user@site.com',
      maintainer: true,
    }

    await api.post('/api/users').send(newUser)

    const response = await api.get('/api/users')
    expect(response.body.find((u) => u.email === newUser.email).admin).toBe(
      false
    )
    expect(
      response.body.find((u) => u.email === newUser.email).maintainer
    ).toBe(true)
  })
})

describe('login', () => {
  test('user can log in with email and password', async () => {
    const response = await api
      .post('/api/login')
      .send(notAdmin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
  })
})

describe('address', () => {
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
  beforeEach(async () => {
    const response = await api.post('/api/login').send(notAdmin)
    token = response.body.token
  })
  test('can be added to user profile', async () => {
    const addressResponse = await api
      .post('/api/users/address')
      .set('Authorization', `Bearer ${token}`)
      .send(goodAddress)
      .expect(201)
    delete addressResponse.body.id
    expect(addressResponse.body).toStrictEqual(goodAddress)
    const response2 = await api.post('/api/login').send(notAdmin)
    expect(response2.body.addresses.length).toBe(1)
  })
  test('creation fails without mandatory fields: name', async () => {
    const badAddress = { ...goodAddress }
    delete badAddress.name
    await api
      .post('/api/users/address')
      .set('Authorization', `Bearer ${token}`)
      .send(badAddress)
      .expect(400)
    const response2 = await api.post('/api/login').send(notAdmin)
    expect(response2.body.addresses.length).toBe(0)
  })
  test('creation fails without mandatory fields: surname', async () => {
    const badAddress = { ...goodAddress }
    delete badAddress.surname
    await api
      .post('/api/users/address')
      .set('Authorization', `Bearer ${token}`)
      .send(badAddress)
      .expect(400)
    const response2 = await api.post('/api/login').send(notAdmin)
    expect(response2.body.addresses.length).toBe(0)
  })
  test('creation fails without mandatory fields: phone', async () => {
    const badAddress = { ...goodAddress }
    delete badAddress.phone
    await api
      .post('/api/users/address')
      .set('Authorization', `Bearer ${token}`)
      .send(badAddress)
      .expect(400)
    const response2 = await api.post('/api/login').send(notAdmin)
    expect(response2.body.addresses.length).toBe(0)
  })
  test('creation fails without mandatory fields: city', async () => {
    const badAddress = { ...goodAddress }
    delete badAddress.city
    await api
      .post('/api/users/address')
      .set('Authorization', `Bearer ${token}`)
      .send(badAddress)
      .expect(400)
    const response2 = await api.post('/api/login').send(notAdmin)
    expect(response2.body.addresses.length).toBe(0)
  })
  test('creation fails without mandatory fields: street', async () => {
    const badAddress = { ...goodAddress }
    delete badAddress.street
    await api
      .post('/api/users/address')
      .set('Authorization', `Bearer ${token}`)
      .send(badAddress)
      .expect(400)
    const response2 = await api.post('/api/login').send(notAdmin)
    expect(response2.body.addresses.length).toBe(0)
  })
  test('creation fails without mandatory fields: house', async () => {
    const badAddress = { ...goodAddress }
    delete badAddress.house
    await api
      .post('/api/users/address')
      .set('Authorization', `Bearer ${token}`)
      .send(badAddress)
      .expect(400)
    const response2 = await api.post('/api/login').send(notAdmin)
    expect(response2.body.addresses.length).toBe(0)
  })
  test('creation fails without mandatory fields: apartment', async () => {
    const badAddress = { ...goodAddress }
    delete badAddress.apartment
    await api
      .post('/api/users/address')
      .set('Authorization', `Bearer ${token}`)
      .send(badAddress)
      .expect(400)
    const response2 = await api.post('/api/login').send(notAdmin)
    expect(response2.body.addresses.length).toBe(0)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
