const apiURL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.108:3001/api'
    : 'http://new.maiznica.com/api'

export { apiURL }
