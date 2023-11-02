import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'

const useDPDservice = () => {
  const { showErrorToast } = useToast()
  const baseURL = `${apiURL}/dpd`

  const getPickupPoints = () => {
    const request = axios.get(`${baseURL}/pickup_points`)
    return request.then((response) => response.data)
  }
  return { getPickupPoints }
}

export default useDPDservice
