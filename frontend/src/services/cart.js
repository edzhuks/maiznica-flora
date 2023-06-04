import axios from 'axios'
import user from './user'
import withToken from './token'
import makeConfig from './token'

const addToCart = (newProduct) => {
  const config = makeConfig()
  const request = axios.post(
    'http://localhost:3001/api/cart',
    newProduct,
    config
  )
  return request.then((response) => response.data)
}

const removeFromCart = (product) => {
  const config = makeConfig()
  const request = axios.delete(
    `http://localhost:3001/api/cart/${product.id}`,
    config
  )
  return request.then((response) => response.data)
}

const changeQuantity = (newProduct) => {
  const config = makeConfig()

  const request = axios.put(
    'http://localhost:3001/api/cart',
    newProduct,
    config
  )
  return request.then((response) => response.data)
}

const getCart = () => {
  const config = makeConfig()

  const request = axios.get('http://localhost:3001/api/cart', config)
  return request.then((response) => response.data)
}

export default {
  addToCart,
  getCart,
  changeQuantity,
  removeFromCart,
}
