import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'
import { useSelector } from 'react-redux'

const useOrderService = () => {
  const { showErrorToast } = useToast()
  const baseURL = `${apiURL}/order`

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
  const resendEmail = (id) => {
    const config = makeConfig()
    const request = axios.get(`${baseURL}/resend_email?id=${id}`, config)
    return request.then((response) => response.data)
  }
  return { updateOrder, getAll, get, resendEmail }
}

export default useOrderService
