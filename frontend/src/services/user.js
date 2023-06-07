import axios from 'axios'
import makeConfig from './token'

const create = (newUser) => {
  const request = axios.post('http://localhost:3001/api/users', newUser)
  return request.then((response) => response.data)
}

const addAddress = (newAddress) => {
  const config = makeConfig()
  const request = axios.post(
    'http://localhost:3001/api/users/address',
    newAddress,
    config
  )
  return request.then((response) => response.data)
}

const login = (username, password) => {
  const request = axios.post('http://localhost:3001/api/login', {
    username,
    password,
  })
  return request.then((response) => response.data)
}

export default {
  create,
  login,
  addAddress,
}
