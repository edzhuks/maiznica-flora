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
  const getMine = () => {
    const config = makeConfig()
    const request = axios.get(`${baseURL}`, config)
    return request.then((response) => response.data)
  }

  const getAll = ({ filters, search }) => {
    const config = makeConfig()
    const request = axios.get(`${baseURL}/all`, {
      headers: config.headers,
      params: { ...filters, search },
    })
    return request.then((response) => response.data)
  }
  const getById = (id) => {
    const config = makeConfig()
    const request = axios.get(`${baseURL}/${id}`, config)
    return request.then((response) => response.data)
  }
  const resendEmail = (id) => {
    const config = makeConfig()
    const request = axios.get(`${baseURL}/resend_email?id=${id}`, config)
    return request.then((response) => response.data)
  }

  const makeReadyForPickup = (id, { message }) => {
    const config = makeConfig()
    const request = axios.put(
      `${baseURL}/ready_for_pickup`,
      { id, message },
      config
    )
    return request.then((response) => response.data)
  }
  const makeCompleted = (id) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/completed`, { id }, config)
    return request.then((response) => response.data)
  }
  const makeReadyForDelivery = (id, deliveryData) => {
    const config = makeConfig()
    const request = axios.put(
      `${baseURL}/ready_for_delivery`,
      { id, deliveryData },
      config
    )
    showErrorToast(request)
    return request.then((response) => response.data)
  }
  const makeWaitingForCourrier = (id) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/waiting_for_courrier`, { id }, config)
    return request.then((response) => response.data)
  }
  const makeDelivering = (id) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/delivering`, { id }, config)
    showErrorToast(request)
    return request.then((response) => response.data)
  }
  const makePaid = (id) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/paid`, { id }, config)
    return request.then((response) => response.data)
  }
  const makeRefunded = (id) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/refunded`, { id }, config)
    return request.then((response) => response.data)
  }
  return {
    updateOrder,
    getAll,
    getById,
    resendEmail,
    getMine,
    makeCompleted,
    makeDelivering,
    makeReadyForDelivery,
    makeReadyForPickup,
    makeWaitingForCourrier,
    makePaid,
    makeRefunded,
  }
}

export default useOrderService
