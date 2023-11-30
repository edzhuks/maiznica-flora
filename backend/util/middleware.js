const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { isPositiveInteger } = require('./functions')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
    next()
    return
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({
      error: {
        en: 'token not provided',
        lv: 'Lietotāja marķieris nav norādīts',
      },
    })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: { en: 'token invalid', lv: 'Lietotāja marķieris nepareizs' },
    })
  }
  request.user = await User.findById(decodedToken.id)
  if (!request.user) {
    return response.status(401).json({
      error: { en: 'token invalid', lv: 'Lietotāja marķieris nepareizs' },
    })
  }
  next()
}
const optionalUser = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
  }

  next()
}

const adminRequired = async (request, response, next) => {
  if (!request.user.admin) {
    return response.status(403).json({
      error: {
        en: 'Only admins can do that',
        lv: 'Šo darbību var veikt tikai administratori',
      },
    })
  }
  next()
}

const verificationRequired = async (request, response, next) => {
  if (!request.user.emailVerified) {
    return response.status(403).json({
      error: { en: 'Email not verified', lv: 'E-pasts nav apstiprināts' },
    })
  }
  next()
}

const productChecker = async (req, res, next) => {
  const product = req.body.product
  if (!product) {
    return res
      .status(400)
      .json({ error: { en: 'Product missing', lv: 'Neatrada produktu' } })
  }
  if (
    !product.name ||
    !product.name.lv ||
    !product.weight ||
    !product.price ||
    !product.ingredients ||
    !product.ingredients.lv ||
    !product.image
  ) {
    return res.status(400).json({
      error: {
        en: 'Missing name, weight, price, ingredients, or image',
        lv: 'Nav nosaukuma, svara, cenas, sastāvdaļu vai attēla',
      },
    })
  }
  if (!isPositiveInteger(product.weight)) {
    return res.status(400).json({
      error: {
        en: 'Weight must be a positive integer amount in grams',
        lv: 'Svaram ir jābūt naturālam skaitlim gramos',
      },
    })
  }
  if (!isPositiveInteger(product.price)) {
    return res.status(400).json({
      error: {
        en: 'Price must be a positive integer amount in grams',
        lv: 'Cenai ir jābūt naturālam skaitlim gramos',
      },
    })
  }
  if (
    product.nutrition &&
    (product.nutrition.energy === undefined ||
      product.nutrition.fat === undefined ||
      product.nutrition.saturatedFat === undefined ||
      product.nutrition.carbs === undefined ||
      product.nutrition.sugar === undefined ||
      product.nutrition.protein === undefined ||
      product.nutrition.salt === undefined)
  ) {
    return res.status(400).json({
      error: {
        en: 'Nutrition information must be complete (except fiber, D3)',
        lv: 'Uzturvērtībai jābūt pilnīgai (izņemot Šķiedrvielas, D3)',
      },
    })
  }

  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
  productChecker,
  adminRequired,
  verificationRequired,
  optionalUser,
}
