import axios from 'axios'
import makeConfig from './token'

const placeOrder = (address) => {
  const config = makeConfig()
  const request = axios.post('http://localhost:3001/api/order', address, config)
  return request.then((response) => response.data)
}

export default {
  placeOrder,
}
