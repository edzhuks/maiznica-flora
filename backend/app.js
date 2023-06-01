const express = require('express')
const config = require('./util/config')
const cors = require('cors')
const productRouter = require('./controllers/products')
const loginRouter = require('./controllers/login')
const publihserRouter = require('./controllers/carts')
const reviewRouter = require('./controllers/reviews')
const userRouter = require('./controllers/users')
const app = express()
const mongoose = require('mongoose')
const { tokenExtractor } = require('./util/middleware')
mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/products', productRouter)
app.use('/api/login', loginRouter)
app.use('/api/cart', publihserRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/users', userRouter)

app.get('/api/version', (request, response) => {
  response.send('1')
})

module.exports = app
