const apiURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api'
    : 'https://maiznica-flora.onrender.com/api'

export { apiURL }
