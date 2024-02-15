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
const userRouter = require('./controllers/users')
const dpdRouter = require('./controllers/dpd')
const scriptRouter = require('./controllers/scripts')
const morgan = require('morgan')
const rfs = require('rotating-file-stream') // version 2.x
const mongoose = require('mongoose')
const { tokenExtractor } = require('./util/middleware')
const { formatDate } = require('./util/functions')

const app = express()
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

const pad = (num) => (num > 9 ? '' : '0') + num
const generator = (time, index) => {
  if (!time) return 'file.log'

  var month = time.getFullYear() + '' + pad(time.getMonth() + 1)
  var day = pad(time.getDate())
  var hour = pad(time.getHours())
  var minute = pad(time.getMinutes())

  return `${month}${day}-${hour}${minute}-${index}-file.log`
}

// create a rotating write stream
var accessLogStream = rfs.createStream(generator, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log'),
})
morgan.token('postbody', function (req) {
  return req.method === 'POST' || req.method === 'PUT'
    ? JSON.stringify(req.body)
    : ' '
})

if (config.DEV_MODE) {
  app.use(cors())
}
if (config.PROD_MODE) {
  app.all(/.*/, function (req, res, next) {
    var host = req.header('host')
    if (host.match(/\bwww.maiznica.lv\b/i)) {
      next()
    } else {
      res.redirect(301, 'https://www.maiznica.lv' + req.url)
    }
  })
}
app.use(express.json())
app.use(express.static('build', { maxAge: 1000 * 60 * 60 }))
app.use(tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/images', express.static('images'))
app.use('/shipment_labels', express.static('shipment_labels'))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postbody',
    { stream: accessLogStream }
  )
)
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postbody'
  )
)
app.use('/api/products', productRouter)
app.use('/api/uploads', uploadRouter)
app.use('/api/cart', cartRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/banners', bannerRouter)
app.use('/api/contact', contactRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/order', orderRouter)
app.use('/api/dpd', dpdRouter)
app.use('/api/scripts', scriptRouter)
app.get('/api/version', (request, response) => {
  response.send('1')
})
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

module.exports = app
