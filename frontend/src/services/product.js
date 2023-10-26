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

  const makeDiscount = (productId, discount) => {
    const config = makeConfig()
    const request = axios.put(
      `${baseURL}/discount/${productId}`,
      { discount },
      config
    )
    return request
  }
  const removeDiscount = (productId, discount) => {
    const config = makeConfig()
    const request = axios.delete(`${baseURL}/discount/${productId}`, config)
    return request
  }

  const hideProduct = (productId) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/hide/${productId}`, {}, config)
    return request
  }
  const showProduct = (productId) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/show/${productId}`, {}, config)
    return request
  }
  const inStock = (productId) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/inStock/${productId}`, {}, config)
    return request
  }
  const outOfStock = (productId) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/outOfStock/${productId}`, {}, config)
    return request
  }
  return {
    create,
    getAll,
    getById,
    deleteProduct,
    update,
    makeDiscount,
    removeDiscount,
    hideProduct,
    showProduct,
    inStock,
    outOfStock,
  }
}
export default useProductService
