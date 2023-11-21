import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'
import useToast from '../util/promiseToast'
const useSettingsService = () => {
  const baseURL = `${apiURL}/settings`

  const updateContactFormEmails = (emails) => {
    const config = makeConfig()
    const request = axios.post(`${baseURL}/contact_form_emails`, emails, config)
    return request
  }
  const getContactFormEmails = () => {
    const config = makeConfig()
    const request = axios.get(`${baseURL}/contact_form_emails`, config)
    return request
  }

  return {
    updateContactFormEmails,
    getContactFormEmails,
  }
}
export default useSettingsService
