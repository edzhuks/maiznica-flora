const express = require('express')
const path = require('path')
const config = require('./util/config')
const cors = require('cors')
const productRouter = require('./controllers/products')
const uploadRouter = require('./controllers/uploads')
const loginRouter = require('./controllers/login')
const cartRouter = require('./controllers/carts')
const { categoryRouter } = require('./controllers/categories')
const bannerRouter = require('./controllers/banners')
const contactRouter = require('./controllers/contact')
const settingsRouter = require('./controllers/settings')
const orderRouter = require('./controllers/orders')
const reviewRouter = require('./controllers/reviews')
const userRouter = require('./controllers/users')
const dpdRouter = require('./controllers/dpd')
const scriptRouter = require('./controllers/scripts')
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
app.use(express.static('build', { maxAge: 1000 * 60 * 60 }))
app.use(tokenExtractor)
app.use('/api/products', productRouter)
app.use('/api/uploads', uploadRouter)
app.use('/api/login', loginRouter)
app.use('/api/cart', cartRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/banners', bannerRouter)
app.use('/api/contact', contactRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/order', orderRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/users', userRouter)
app.use('/api/dpd', dpdRouter)
app.use('/api/scripts', scriptRouter)
app.use('/images', express.static('images'))
app.get('/api/version', (request, response) => {
  response.send('1')
})
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

module.exports = app
