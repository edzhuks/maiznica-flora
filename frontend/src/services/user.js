import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'

const baseURL = `${apiURL}/users`

const create = (newUser) => {
  const request = axios.post(baseURL, newUser)
  return request.then((response) => response.data)
}

const addAddress = (newAddress) => {
  const config = makeConfig()
  const request = axios.post(`${baseURL}/address`, newAddress, config)
  return request.then((response) => response.data)
}

const login = (username, password) => {
  const request = axios.post(`${apiURL}/login`, {
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
