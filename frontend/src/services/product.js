import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'
const useProductService = () => {
  const { showErrorToast } = useToast()
  const baseURL = `${apiURL}/products`

  const create = (newProduct) => {
    const config = makeConfig()
    const request = axios.post(baseURL, newProduct, config)
    return request
  }

  const getAll = () => {
    const request = axios.get(baseURL)
    return request.then((response) => response.data)
  }

  const getById = (productId) => {
    const request = axios.get(`${baseURL}/${productId}`)
    return request.then((response) => response.data)
  }

  const deleteProduct = (productId) => {
    const config = makeConfig()
    const request = axios.delete(`${baseURL}/${productId}`, config)
    showErrorToast(request)
    return request.then((response) => response.data)
  }
  const update = (productId, product) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/${productId}`, { product }, config)
    return request.then((response) => response.data)
  }

  return {
    create,
    getAll,
    getById,
    deleteProduct,
    update,
  }
}
export default useProductService
