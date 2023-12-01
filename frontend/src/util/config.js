const apiURL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.104:3001/api'
    : 'https://www.maiznica.lv/api'

const backendURL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.104:3001'
    : 'https://www.maiznica.lv'

export { apiURL, backendURL }
