import axios from 'axios'

const create = (newUser) => {
  const request = axios.post('http://localhost:3001/api/users', newUser)
  return request.then((response) => response.data)
}

const login = (username, password) => {
  const request = axios.post('http://localhost:3001/api/login', {
    username,
    password,
  })
  return request.then((response) => response.data)
}

export default {
  create,
  login,
}
