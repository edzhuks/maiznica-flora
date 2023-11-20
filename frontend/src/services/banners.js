import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'
const useBannerService = () => {
  const baseURL = `${apiURL}/banners`

  const update = (banners) => {
    const config = makeConfig()
    const request = axios.post(`${baseURL}`, banners, config)
    return request
  }
  const get = () => {
    const request = axios.get(`${baseURL}`)
    return request
  }

  return {
    update,
    get,
  }
}
export default useBannerService
