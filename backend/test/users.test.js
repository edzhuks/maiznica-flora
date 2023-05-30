const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const dummyUsers = [
  {
    username: 'root',
    password: 'password11!!',
    email: 'email@email.email',
  },
  {
    username: 'admin',
    password: 'password11!!',
    email: 'email2@email.email',
    admin: true,
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(dummyUsers[0])
  await api.post('/api/users').send(dummyUsers[1])
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

  test('the users have usernames root and admin', async () => {
    const response = await api.get('/api/users')
    expect(response.body.map((u) => u.username)).toContain('root')
    expect(response.body.map((u) => u.username)).toContain('admin')
  })
})

describe('user creation validation', () => {
  test('user with correct data can be added', async () => {
    const newUser = {
      username: 'tester',
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

    expect(response.body.map((u) => u.username)).toContain('tester')
    expect(response.body.map((u) => u.email)).toContain('user@site.com')
  })

  test('user with missing email cannot be added', async () => {
    const newUser = { username: 'tester', password: 'secret222!!!' }

    await api.post('/api/users').send(newUser).expect(400)
  })

  test('user with missing username cannot be added', async () => {
    const newUser = { password: 'secret222!!!', email: 'user@site.com' }

    await api.post('/api/users').send(newUser).expect(400)
  })

  test('user with missing password cannot be added', async () => {
    const newUser = { username: 'secret222!!!', email: 'user@site.com' }

    await api.post('/api/users').send(newUser).expect(400)
  })

  test('user with existing email cannot be added', async () => {
    const newUser = {
      username: 'tester',
      password: 'secret222!!!',
      email: 'email@email.email',
    }

    await api.post('/api/users').send(newUser).expect(400)
  })

  test('user with existing username cannot be added', async () => {
    const newUser = {
      username: 'root',
      password: 'secret222!!!',
      email: 'eeeemail@email.email',
    }

    await api.post('/api/users').send(newUser).expect(400)
  })

  test('user with weak password cannot be added', async () => {
    const newUser = {
      username: 'tester',
      password: 'secret',
      email: 'eeeemail@email.email',
    }

    await api.post('/api/users').send(newUser).expect(400)
  })
})

describe('user creation roles', () => {
  test('user has no special roles by default', async () => {
    const newUser = {
      username: 'tester',
      password: 'secret222!!!',
      email: 'user@site.com',
    }

    await api.post('/api/users').send(newUser)

    const response = await api.get('/api/users')
    console.log(response.body)
    expect(
      response.body.find((u) => u.username === newUser.username).admin
    ).toBe(false)
    expect(
      response.body.find((u) => u.username === newUser.username).maintainer
    ).toBe(false)
  })

  test('user can be admin', async () => {
    const newUser = {
      username: 'tester',
      password: 'secret222!!!',
      email: 'user@site.com',
      admin: true,
    }

    await api.post('/api/users').send(newUser)

    const response = await api.get('/api/users')
    expect(
      response.body.find((u) => u.username === newUser.username).admin
    ).toBe(true)
    expect(
      response.body.find((u) => u.username === newUser.username).maintainer
    ).toBe(false)
  })

  test('user can be maintainer', async () => {
    const newUser = {
      username: 'tester',
      password: 'secret222!!!',
      email: 'user@site.com',
      maintainer: true,
    }

    await api.post('/api/users').send(newUser)

    const response = await api.get('/api/users')
    expect(
      response.body.find((u) => u.username === newUser.username).admin
    ).toBe(false)
    expect(
      response.body.find((u) => u.username === newUser.username).maintainer
    ).toBe(true)
  })
})

describe('login', () => {
  test('user can log in with username and password', async () => {
    const response = await api
      .post('/api/login')
      .send(dummyUsers[0])
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
