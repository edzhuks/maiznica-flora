import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'

const useCartService = () => {
  const { showErrorToast } = useToast()
  const baseURL = `${apiURL}/cart`

  const addToCart = (newProduct) => {
    const config = makeConfig()
    const request = axios.post(baseURL, newProduct, config)
    showErrorToast(request)
    return request
  }

  const removeFromCart = (product) => {
    const config = makeConfig()
    const request = axios.post(
      baseURL,
      { product, quantity: -999999999999 },
      config
    )
    showErrorToast(request)
    return request
  }

  const changeQuantity = (newProduct) => {
    const config = makeConfig()
    const request = axios.post(baseURL, newProduct, config)
    showErrorToast(request)
    return request
  }

  const getCart = () => {
    const config = makeConfig()

    const request = axios.get(baseURL, config)
    return request
  }

  return {
    addToCart,
    getCart,
    changeQuantity,
    removeFromCart,
  }
}
export default useCartService
