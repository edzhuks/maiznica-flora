const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: String,
  nutrition: {
    energy: Number,
    fat: Number,
    saturatedFat: Number,
    carbs: Number,
    sugar: Number,
    fiber: Number,
    protein: Number,
    salt: Number,
  },
  weight: Number,
  price: Number,
  discountPrice: Number,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  rating: Number,
  EAN: String,
  image: String,
  bio: Boolean,
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    // delete returnedObject.__v
  },
})

module.exports = mongoose.model('Product', productSchema)
