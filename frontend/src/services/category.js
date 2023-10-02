import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'

const baseUrl = `${apiURL}/categories`

const addNew = ({ newCategory, parentCategory }) => {
  const config = makeConfig()
  const request = axios.post(
    `${baseUrl}`,
    { newCategory, parentCategory },
    config
  )
  return request.then((response) => response.data)
}

const addExisting = ({ categoriesToAdd, parentCategory }) => {
  const config = makeConfig()
  const request = axios.put(
    `${baseUrl}`,
    { categoriesToAdd, parentCategory },
    config
  )
  return request.then((response) => response.data)
}

const addProducts = ({ productsToAdd, parentCategory }) => {
  const config = makeConfig()
  const request = axios.put(
    `${baseUrl}/products`,
    { productsToAdd, parentCategory },
    config
  )
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

export default {
  getTopCategory,
  getFullCatalogue,
  getAllIds,
  addNew,
  addExisting,
  addProducts,
  getNewProducts,
  getDiscountedProducts,
  getCategory,
}
