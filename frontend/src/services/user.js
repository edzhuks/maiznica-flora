import axios from 'axios'
import makeConfig from './token'
import { apiURL } from '../util/config'

const useUserService = () => {
  const baseURL = `${apiURL}/users`

  const create = (newUser) => {
    const request = axios.post(baseURL, newUser)
    return request.then((response) => response)
  }

  const addAddress = (newAddress) => {
    const config = makeConfig()
    const request = axios.post(`${baseURL}/address`, newAddress, config)
    return request
  }
  const editAddress = (newAddress) => {
    const config = makeConfig()
    const request = axios.put(`${baseURL}/address`, newAddress, config)
    return request
  }
  const deleteAddress = (id) => {
    const config = makeConfig()
    const request = axios.delete(`${baseURL}/address/${id}`, config)
    return request
  }
  const login = (email, password) => {
    const request = axios.post(`${apiURL}/login`, {
      email,
      password,
    })
    return request
  }

  const forgotPassword = (email) => {
    const request = axios.post(`${baseURL}/initiate_reset_password`, {
      email,
    })
    return request
  }

  const resetPassword = ({ token, password }) => {
    const request = axios.post(`${baseURL}/reset_password`, {
      token,
      password,
    })
    return request
  }
  const changePassword = ({ oldPassword, newPassword }) => {
    const config = makeConfig()
    const request = axios.post(
      `${baseURL}/change_password`,
      {
        oldPassword,
        newPassword,
      },
      config
    )
    return request
  }
  const deleteAccount = ({ email, password }) => {
    const config = makeConfig()
    const request = axios.delete(`${baseURL}`, {
      data: { email, password },
      headers: config.headers,
    })
    return request
  }
  return {
    create,
    login,
    addAddress,
    forgotPassword,
    resetPassword,
    changePassword,
    editAddress,
    deleteAddress,
    deleteAccount,
  }
}
export default useUserService
