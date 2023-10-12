const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    lv: { type: String, required: true },
    en: { type: String, required: false },
    de: { type: String, required: false },
  },
  description: {
    lv: { type: String, required: false },
    en: { type: String, required: false },
    de: { type: String, required: false },
  },
  ingredients: {
    lv: { type: String, required: true },
    en: { type: String, required: false },
    de: { type: String, required: false },
  },
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
  EAN: String,
  image: String,
  bio: Boolean,
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString()
    }
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Product', productSchema)
