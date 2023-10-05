import axios from 'axios'
import user from './user'
import withToken from './token'
import makeConfig from './token'
import { apiURL } from '../util/config'

const baseURL = `${apiURL}/cart`

const addToCart = (newProduct) => {
  const config = makeConfig()
  const request = axios.post(baseURL, newProduct, config)
  return request.then((response) => response.data.content)
}

const removeFromCart = (product) => {
  const config = makeConfig()
  const request = axios.post(baseURL, { product, quantity: 0 }, config)
  return request.then((response) => response.data.content)
}

const changeQuantity = (newProduct) => {
  const config = makeConfig()

  const request = axios.post(baseURL, newProduct, config)
  return request.then((response) => response.data.content)
}

const getCart = () => {
  const config = makeConfig()

  const request = axios.get(baseURL, config)
  return request.then((response) => response.data.content)
}

export default {
  addToCart,
  getCart,
  changeQuantity,
  removeFromCart,
}
