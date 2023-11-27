const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  categories: [
    {
      type: String,
      ref: 'Category',
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  image: String,
  invisible: Boolean,
  displayName: {
    lv: { type: String, required: true },
    en: { type: String, required: false },
    de: { type: String, required: false },
  },
  _id: { type: String, required: true },
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  },
})

module.exports = mongoose.model('Category', orderSchema)
