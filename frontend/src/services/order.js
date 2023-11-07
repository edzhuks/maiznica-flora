import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'

const useOrderService = () => {
  const { showErrorToast } = useToast()
  const baseURL = `${apiURL}/order`

  const placeOrder = (deliveryMethod) => {
    const config = makeConfig()
    const request = axios.post(baseURL, { deliveryMethod }, config)
    return request
  }

  const updateOrder = (newOrder) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/${newOrder.id}`, newOrder, config)
    showErrorToast(request)

    return request.then((response) => response.data)
  }

  const getAll = () => {
    const config = makeConfig()
    const request = axios.get(`${baseURL}/all`, config)
    return request.then((response) => response.data)
  }
  const get = () => {
    const config = makeConfig()
    const request = axios.get(baseURL, config)
    return request.then((response) => response.data)
  }
  return { placeOrder, updateOrder, getAll, get }
}

export default useOrderService
