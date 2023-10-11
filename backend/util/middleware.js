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

const productChecker = async (req, res, next) => {
  const product = req.body.product
  if (!product) {
    return res.status(400).end()
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
      .send('Missing name, weight, price, ingredients, or image')
  }
  if (!isPositiveInteger(product.weight)) {
    return res
      .status(400)
      .send('Weight must be a positive integer amount in grams')
  }
  if (!isPositiveInteger(product.price)) {
    return res
      .status(400)
      .send('Price must be a positive integer amount in cents')
  }
  if (
    product.nutrition &&
    (!product.nutrition.energy ||
      !product.nutrition.fat ||
      !product.nutrition.saturatedFat ||
      !product.nutrition.carbs ||
      !product.nutrition.sugar ||
      !product.nutrition.protein ||
      !product.nutrition.salt ||
      !product.nutrition.fiber)
  ) {
    return res.status(400).send('Nutrition information must be complete')
  }

  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
  productChecker,
}
