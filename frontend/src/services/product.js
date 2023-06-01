import axios from 'axios'

const create = (newProduct) => {
  const request = axios.post('http://localhost:3001/api/products', newProduct)
  return request.then((response) => response.data)
}

const getAll = () => {
  const request = axios.get('http://localhost:3001/api/products')
  return request.then((response) => response.data)
}

export default {
  create,
  getAll,
}
