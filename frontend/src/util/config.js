const apiURL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.106:3001/api'
    : 'http://192.168.0.108:3001/api'

const backendURL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.106:3001'
    : 'http://192.168.0.108:3001'

export { apiURL, backendURL }
