import axios from 'axios'
import { apiURL } from '../util/config'
const useContactService = () => {
  const baseURL = `${apiURL}/contact`

  const sendContactForm = ({ name, email, message }) => {
    const request = axios.post(`${baseURL}/contact_form`, {
      name,
      email,
      message,
    })
    return request
  }

  return {
    sendContactForm,
  }
}
export default useContactService
