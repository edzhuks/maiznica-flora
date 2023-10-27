require('dotenv').config()

const TEST_MODE = process.env.NODE_ENV === 'test'
const PORT = process.env.PORT
const SECRET = process.env.SECRET
const EMAIL_PASS = process.env.EMAIL_PASS
const FRONTEND_URL = process.env.FRONTEND_URL
const BACKEND_URL = process.env.BACKEND_URL

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  TEST_MODE,
  EMAIL_PASS,
  FRONTEND_URL,
  BACKEND_URL,
}
