require('dotenv').config()

const TEST_MODE = process.env.NODE_ENV === 'test'
const PORT = process.env.PORT
const SECRET = process.env.SECRET
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const EMAIL_NAME = process.env.EMAIL_NAME
const EMAIL_HOST = process.env.EMAIL_HOST
const FRONTEND_URL = process.env.FRONTEND_URL
const BACKEND_URL = process.env.BACKEND_URL
const BANK_API_USERNAME = process.env.BANK_API_USERNAME
const BANK_API_PASSWORD = process.env.BANK_API_PASSWORD
const DPD_AUTH_HEADER = {
  headers: { Authorization: `Bearer ${process.env.DPD_KEY}` },
}

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = {
  DPD_AUTH_HEADER,
  MONGODB_URI,
  PORT,
  SECRET,
  TEST_MODE,
  EMAIL_PASS,
  EMAIL_NAME,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  FRONTEND_URL,
  BACKEND_URL,
  BANK_API_PASSWORD,
  BANK_API_USERNAME,
}
