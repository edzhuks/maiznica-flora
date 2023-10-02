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
  displayName: { type: String, required: true },
  _id: { type: String, required: true },
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Category', orderSchema)
