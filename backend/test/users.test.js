const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const dummyUser = {
  username: 'root',
  password: 'password11!!',
  email: 'email@email.email',
}

beforeEach(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(dummyUser)
})

describe('initial user', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is one user', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
  })

  test('the user has username root', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].username).toEqual('root')
  })
})

describe('user creation', () => {
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
    expect(response.body).toHaveLength(2)

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

describe('login', () => {
  test('user can log in with username and password', async () => {
    const response = await api
      .post('/api/login')
      .send(dummyUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
