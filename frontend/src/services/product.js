import axios from 'axios'

const baseURL = 'http://localhost:3001/api/products'

const create = (newProduct) => {
  const request = axios.post(baseURL, newProduct)
  return request.then((response) => response.data)
}

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then((response) => response.data)
}

const getById = (productId) => {
  const request = axios.get(`${baseURL}/${productId}`)
  return request.then((response) => response.data)
}

export default {
  create,
  getAll,
  getById,
}
