import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'

const useCategoryService = () => {
  const baseUrl = `${apiURL}/categories`
  const { showErrorToast } = useToast()

  const addNew = ({ newCategory, parentCategory }) => {
    const config = makeConfig()
    const request = axios.post(
      `${baseUrl}`,
      { newCategory, parentCategory },
      config
    )
    showErrorToast(request)
    return request.then((response) => response.data)
  }

  const addExisting = ({ categoriesToAdd, parentCategory }) => {
    const config = makeConfig()
    const request = axios.put(
      `${baseUrl}`,
      { categoriesToAdd, parentCategory },
      config
    )
    showErrorToast(request)
    return request.then((response) => response.data)
  }

  const addProducts = ({ productsToAdd, parentCategory }) => {
    const config = makeConfig()
    const request = axios.put(
      `${baseUrl}/products`,
      { productsToAdd, parentCategory },
      config
    )
    showErrorToast(request)
    return request.then((response) => response.data)
  }

  const removeProducts = ({ productId, parentCategory }) => {
    const config = makeConfig()
    const request = axios.delete(`${baseUrl}/products`, {
      headers: config.headers,
      data: {
        productId,
        parentCategory,
      },
    })
    showErrorToast(request)
    return request.then((response) => response.data)
  }

  const removeCategories = ({ categoryId, parentCategory }) => {
    const config = makeConfig()
    const request = axios.delete(`${baseUrl}/categories`, {
      headers: config.headers,
      data: {
        categoryId,
        parentCategory,
      },
    })
    showErrorToast(request)
    return request.then((response) => response.data)
  }

  const getNewProducts = () => {
    const request = axios.get(`${baseUrl}/new`)
    return request.then((response) => response.data)
  }

  const getDiscountedProducts = () => {
    const request = axios.get(`${baseUrl}/discount`)
    return request.then((response) => response.data)
  }

  const getAllIds = () => {
    const request = axios.get(`${baseUrl}/ids`)
    return request.then((response) => response.data)
  }

  const getAll = () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then((response) => response.data)
  }

  const getFullCatalogue = () => {
    const request = axios.get(`${baseUrl}/complete`)
    return request.then((response) => response.data)
  }

  const getTopCategory = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then((response) => response.data)
  }

  const getCategory = (category) => {
    const request = axios.get(`${baseUrl}/${category}`)
    return request.then((response) => response.data)
  }

  return {
    getTopCategory,
    getFullCatalogue,
    getAllIds,
    addNew,
    addExisting,
    addProducts,
    getNewProducts,
    getDiscountedProducts,
    getCategory,
    removeProducts,
    removeCategories,
    getAll,
  }
}
export default useCategoryService
