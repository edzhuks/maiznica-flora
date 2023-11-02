const express = require('express')
const path = require('path')
const config = require('./util/config')
const cors = require('cors')
const productRouter = require('./controllers/products')
const loginRouter = require('./controllers/login')
const cartRouter = require('./controllers/carts')
const { categoryRouter } = require('./controllers/categories')
const orderRouter = require('./controllers/orders')
const reviewRouter = require('./controllers/reviews')
const userRouter = require('./controllers/users')
const dpdRouter = require('./controllers/dpd')
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
app.use(express.static('build'))
app.use(tokenExtractor)
app.use('/api/products', productRouter)
app.use('/api/login', loginRouter)
app.use('/api/cart', cartRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/order', orderRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/users', userRouter)
app.use('/api/dpd', dpdRouter)

app.get('/api/version', (request, response) => {
  response.send('1')
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

module.exports = app
