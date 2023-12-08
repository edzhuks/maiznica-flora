const backendURL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.103:3001'
    : 'https://www.maiznica.lv'

const apiURL = `${backendURL}/api`

export { apiURL, backendURL }
