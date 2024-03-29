import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'
import { useSelector } from 'react-redux'

const useCartService = () => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
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
      { productId: product.id, quantity: -999999999999 },
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
  const changeDeliveryMethod = (method) => {
    const config = makeConfig()
    const request = axios.put(baseURL, { deliveryMethod: method }, config)
    return request
  }
  const changeCourrierAddress = (address) => {
    console.log(address)
    console.log({ courrierAddress: address })
    const config = makeConfig()
    const request = axios.put(baseURL, { courrierAddress: address }, config)
    return request
  }
  const changePickupPointData = (data) => {
    const config = makeConfig()
    const request = axios.put(baseURL, { pickupPointData: data }, config)
    return request
  }
  const changeDeliveryPhone = (phone) => {
    const config = makeConfig()
    const request = axios.put(baseURL, { deliveryPhone: phone }, config)
    return request
  }
  const changeBusinessComments = (comments) => {
    const config = makeConfig()
    const request = axios.put(baseURL, { businessComments: comments }, config)
    return request
  }
  const changeGeneralComments = (comments) => {
    const config = makeConfig()
    const request = axios.put(baseURL, { generalComments: comments }, config)
    return request
  }
  const changeDeliveryComments = (comments) => {
    const config = makeConfig()
    const request = axios.put(baseURL, { deliveryComments: comments }, config)
    return request
  }
  const changeUsingLoyaltyMoney = (usingLoyaltyMoney) => {
    const config = makeConfig()
    const request = axios.put(baseURL, { usingLoyaltyMoney }, config)
    return request
  }
  const placeOrder = () => {
    const config = makeConfig()
    const request = axios.post(`${baseURL}/pay/`, { selectedLang }, config)
    showErrorToast(request)
    return request
  }
  const invoice = () => {
    const config = makeConfig()
    const request = axios.post(`${baseURL}/invoice/`, { selectedLang }, config)
    showErrorToast(request)
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
  return {
    addToCart,
    getCart,
    changeQuantity,
    removeFromCart,
    changeCourrierAddress,
    changeDeliveryPhone,
    changePickupPointData,
    changeDeliveryMethod,
    placeOrder,
    getPaymentStatus,
    changeBusinessComments,
    changeDeliveryComments,
    changeGeneralComments,
    changeUsingLoyaltyMoney,
    invoice,
  }
}
export default useCartService
