import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'
const useUploadService = () => {
  const { showErrorToast } = useToast()
  const baseURL = `${apiURL}/uploads`

  const uploadImage = (image) => {
    const config = makeConfig()
    const request = axios.post(`${baseURL}/image`, image, {
      headers: { ...config.headers, 'Content-Type': 'multipart/form-data' },
    })
    return request
  }
  const uploadBanner = (image) => {
    const config = makeConfig()
    const request = axios.post(`${baseURL}/banner`, image, {
      headers: { ...config.headers, 'Content-Type': 'multipart/form-data' },
    })
    return request
  }
  return {
    uploadImage,
    uploadBanner,
  }
}
export default useUploadService
