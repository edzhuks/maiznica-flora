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
    d3: Number,
  },
  weight: Number,
  price: Number,
  discount: {
    discountPrice: Number,
    startDate: Date,
    endDate: Date,
  },
  EAN: String,
  image: String,
  bio: Boolean,
  spoonRed: Boolean,
  spoonGreen: Boolean,
  expiration: {
    number: Number,
    word: String,
    afterOpeneing: { number: Number, word: String },
  },
  badges: [{ type: String }],
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
