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
    return response.status(401).json({ error: 'token not provided' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  request.user = await User.findById(decodedToken.id)
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
    return response.status(403).json({ error: 'Only admins can do that' })
  }
  next()
}

const verificationRequired = async (request, response, next) => {
  if (!request.user.emailVerified) {
    return response.status(403).json({ error: 'Email not verified' })
  }
  next()
}

const productChecker = async (req, res, next) => {
  const product = req.body.product
  if (!product) {
    return res.status(400).json({ error: 'Product missing' })
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
    return res
      .status(400)
      .json({ error: 'Missing name, weight, price, ingredients, or image' })
  }
  if (!isPositiveInteger(product.weight)) {
    return res
      .status(400)
      .json({ error: 'Weight must be a positive integer amount in grams' })
  }
  if (!isPositiveInteger(product.price)) {
    return res
      .status(400)
      .json({ error: 'Price must be a positive integer amount in cents' })
  }
  if (
    product.nutrition &&
    (product.nutrition.energy === undefined ||
      product.nutrition.fat === undefined ||
      product.nutrition.saturatedFat === undefined ||
      product.nutrition.carbs === undefined ||
      product.nutrition.sugar === undefined ||
      product.nutrition.protein === undefined ||
      product.nutrition.salt === undefined ||
      product.nutrition.fiber === undefined)
  ) {
    return res
      .status(400)
      .json({ error: 'Nutrition information must be complete' })
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
