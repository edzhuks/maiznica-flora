const express = require('express')
const Review = require('../models/review')
const router = express.Router()

router.get('/', async (req, res) => {
  const reviews = await Review.find()
  res.send(reviews)
})

router.get('/:id', async (req, res) => {
  const reviews = await Review.findById(req.params.id)
  res.send(reviews)
})

router.post('/', async (req, res) => {
  const review = new Review(req.body)
  await review.save()
  res.send(review)
})

module.exports = router
