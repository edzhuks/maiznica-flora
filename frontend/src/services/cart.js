import axios from 'axios'
import user from './user'

const addToCart = (newProduct) => {
  const loggedUserJSON = window.localStorage.getItem('maiznicefloraUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    const request = axios.post(
      'http://localhost:3001/api/cart',
      newProduct,
      config
    )
    return request.then((response) => response.data)
  }
}

const getCart = () => {
  const request = axios.get('http://localhost:3001/api/cart')
  return request.then((response) => response.data)
}

export default {
  addToCart,
  getCart,
}
