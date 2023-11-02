const apiURL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.106:3001/api'
    : 'https://maiznica-flora.onrender.com/api'

export { apiURL }
