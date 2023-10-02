import axios from 'axios'
import makeConfig from './token'

const baseURL = 'http://localhost:3001/api/order'

const placeOrder = (address) => {
  const config = makeConfig()
  const request = axios.post(baseURL, address, config)
  return request.then((response) => response.data)
}

const updateOrder = (newOrder) => {
  const config = makeConfig()
  const request = axios.put(`${baseURL}/${newOrder.id}`, newOrder, config)
  return request.then((response) => response.data)
}

const getAll = () => {
  const config = makeConfig()
  const request = axios.get(baseURL, config)
  return request.then((response) => response.data)
}

export default {
  placeOrder,
  getAll,
  updateOrder,
}
