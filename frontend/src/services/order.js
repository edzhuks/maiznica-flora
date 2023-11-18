import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'
import { useSelector } from 'react-redux'

const useOrderService = () => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const { showErrorToast } = useToast()
  const baseURL = `${apiURL}/cart`

  const placeOrder = () => {
    const config = makeConfig()
    const request = axios.post(`${baseURL}/pay/`, { selectedLang }, config)
    showErrorToast(request)
    return request
  }

  const startOver = (orderId) => {
    const config = makeConfig()
    const request = axios.get(
      `${baseURL}/pay/${orderId}?selectedLang=${selectedLang}`,
      config
    )
    return request
  }
  const getPaymentStatus = (paymentReference) => {
    const config = makeConfig()
    const request = axios.get(
      `${baseURL}/payment_status?paymentReference=${paymentReference}`,
      config
    )
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
  return { placeOrder, updateOrder, getAll, get, startOver, getPaymentStatus }
}

export default useOrderService
